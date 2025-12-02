import { z } from "zod";
import {
  PRODUCT_CATEGORY,
  ProductCategoryValue,
} from "../utils/prodcuctCategory.enum";

export const productMiddleware = z.object({
  name: z
    .string()
    .min(6, "Name must be at least 6 characters long")
    .max(30, "Name must be at most 30 characters long")
    .nonempty()
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(300, "Description must be at most 300 characters long")
    .nonempty()
    .trim(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .min(0.01, "Price must be greater than 0"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative")
    .min(1, "Stock must be at least 1"),
  category: z
    .enum(Object.values(PRODUCT_CATEGORY) as string[])
    .refine(
      (val) =>
        Object.values(PRODUCT_CATEGORY).includes(val as ProductCategoryValue),
      {
        message: `Category must be one of: ${Object.values(
          PRODUCT_CATEGORY
        ).join(", ")}`,
      }
    ),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name cannot be empty')
    .max(100, 'Product name must be less than 100 characters')
    .trim()
    .optional(),
  
  description: z
    .string()
    .min(1, 'Description cannot be empty')
    .max(1000, 'Description must be less than 1000 characters')
    .trim()
    .optional(),
  
  price: z
    .number()
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least 0.01')
    .optional(),
  
  stock: z
    .number()
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative')
    .min(0, 'Stock must be at least 0')
    .optional(),
  
  category: z
    .enum(Object.values(PRODUCT_CATEGORY) as [string, ...string[]], {
      message: 'Invalid category',
    })
    .optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

