import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description:
        "A comprehensive e-commerce API with user authentication, product management, and order processing",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "507f1f77bcf86cd799439011" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            createdDate: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "507f1f77bcf86cd799439011" },
            name: { type: "string", example: "Laptop" },
            description: { type: "string", example: "High-performance laptop" },
            price: { type: "number", example: 999.99 },
            category: { type: "string", example: "Electronics" },
            imageUrl: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
            stock: { type: "number", example: 50 },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "507f1f77bcf86cd799439011" },
            userId: { type: "string", example: "507f1f77bcf86cd799439012" },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    example: "507f1f77bcf86cd799439013",
                  },
                  quantity: { type: "number", example: 2 },
                },
              },
            },
            totalAmount: { type: "number", example: 1999.98 },
            orderDate: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: { type: "string", example: "Error message" },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
            message: { type: "string" },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Products",
        description: "Product management endpoints",
      },
      {
        name: "Orders",
        description: "Order management endpoints",
      },
    ],
  },
  apis: ["./routes/*.ts", "./routes/*.js"], // Path to API routes
};

export const swaggerSpec = swaggerJsdoc(options);
