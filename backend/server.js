const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const productRouter = require("./router/ProductRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/OrderRouter");
const postRoutes = require("./router/postRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ❌ Remove this – you're not storing images locally anymore
// app.use("/AlImages", express.static("imageDocuments"));

// Routers
app.use(productRouter);
app.use(customerRouter);
app.use(postRoutes);
app.use(orderRouter);

// Connect MongoDB
mongoose
  .connect(process.env.mongoatlasurl)
  .then(() => {
    console.log("✅ Mongoose is connected successfully by Feysal");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// PORT
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
