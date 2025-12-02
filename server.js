const express = require("express");
const connectDB = require("./config/db");
const { specs, swaggerUi } = require("./swagger");

const app = express();
const port = 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// ----------- Swagger Setup ----------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
