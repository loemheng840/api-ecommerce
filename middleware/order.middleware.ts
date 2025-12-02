import { z } from "zod";

// Create Order Schema
export const createOrderSchema = z.object({
  userId: z
    .string()
    .optional(), // Will be set from req.user.id if not provided
  
  products: z
    .array(
      z.object({
        productId: z
          .string()
          .min(1, "Product ID is required")
          .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID format"),
        
        quantity: z
          .number()
          .int("Quantity must be an integer")
          .min(1, "Quantity must be at least 1")
          .max(1000, "Quantity cannot exceed 1000"),
      })
    )
    .min(1, "At least one product is required")
    .max(100, "Cannot order more than 100 different products at once"),
});

// Get Order by ID params validation
export const getOrderByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid order ID format"),
});

// Get Orders by User ID params validation
export const getUserOrdersSchema = z.object({
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format")
    .optional(),
});

// Type inference
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type GetOrderByIdInput = z.infer<typeof getOrderByIdSchema>;
export type GetUserOrdersInput = z.infer<typeof getUserOrdersSchema>;
