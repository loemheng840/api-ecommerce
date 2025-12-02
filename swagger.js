const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Product = require("./models/Product");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a1f2b8c2a3e4d5f6789012" },
            name: { type: "string", example: "koko" },
            email: { type: "string", example: "koko@example.com" },
            address: { type: "string", example: "123 Main St" },
            phone: { type: "string", example: "123-456-7890" },
            createdAt: { type: "string", example: "2025-12-01T12:00:00Z" },
          },
        },
        Product: {
          type: "object", // <-- THIS WAS MISSING
          properties: {
            _id: { type: "string", example: "64a1f2b8c2a3e4d5f6789012" },
            name: { type: "string", example: "Sample Product" },
            description: {
              type: "string",
              example: "This is a sample product.",
            },
            price: { type: "number", example: 99.99 },
            category: { type: "string", example: "Electronics" },
            stock: { type: "number", example: 50 },
            imageUrl: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
            createdAt: { type: "string", example: "2025-12-01T12:00:00Z" },
          },
        },

        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a1f2b8c2a3e4d5f6789014" },
            userId: {
              $ref: "#/components/schemas/User",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { $ref: "#/components/schemas/Product" },
                  quantity: { type: "number", example: 2 },
                  price: { type: "number", example: 99.99 },
                },
              },
            },
            totalAmount: { type: "number", example: 199.98 },
            status: {
              type: "string",
              enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ],
              example: "pending",
            },
            shippingAddress: { type: "string", example: "123 Main St" },
            createdAt: { type: "string", example: "2025-12-01T12:00:00Z" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // make sure this matches all your route files
};

const specs = swaggerJsdoc(options);
module.exports = { specs, swaggerUi };
