require("dotenv").config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db";
import { swaggerSpec } from "./config/swagger";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";

const app = express();
const PORT = process.env.PORT;

// CORS configuration - allow specific frontend ports
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "E-Commerce API Documentation",
  })
);

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
