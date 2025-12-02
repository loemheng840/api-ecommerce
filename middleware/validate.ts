import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      req.body = result.data;
      return next();
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };
};
