// schemas/user.schema.ts
import { z } from "zod";

// Register/Create User Schema
export const registerUser = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long")
    .trim(),

  email: z.email("Invalid email format").toLowerCase().trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  role: z
    .enum(["user", "admin"], {
      message: 'Role must be either "user" or "admin"',
    })
    .optional()
    .default("user"),
});

// Login Schema
export const loginUser = z.object({
  email: z.email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

// Update User Schema
export const updateUser = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long")
      .trim()
      .optional(),
    email: z.email("Invalid email format").toLowerCase().trim().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .optional(),

    role: z
      .enum(["user", "admin"], {
        message: 'Role must be either "user" or "admin"',
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Type inference
export type RegisterUserInput = z.infer<typeof registerUser>;
export type LoginUserInput = z.infer<typeof loginUser>;
export type UpdateUserInput = z.infer<typeof updateUser>;
