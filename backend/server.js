const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRouter = require("./router/ProductRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/OrderRouter");
const postRoutes = require("./router/postRouter");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static route for serving images
app.use("/AlImages", express.static("imageDocuments"));

// Use routers
app.use(productRouter);
app.use(customerRouter);
app.use(postRoutes);
app.use(orderRouter);

// MongoDB connection
mongoose.connect(process.env.mongoatlasurl,)
  .then(() => {
    console.log("✅ Mongoose is connected successfully by Feysal");
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define a proper port (with fallback)
const PORT = process.env.PORT || 7000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
