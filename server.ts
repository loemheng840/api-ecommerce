require("dotenv").config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
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
