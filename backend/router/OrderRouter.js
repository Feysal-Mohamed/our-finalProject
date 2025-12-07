const express = require("express");
const {
  createOrder,
  readOrders,
  markDeliveredOrder,
  deleteOrder
} = require("../controller/orderControler");

const router = express.Router();

// Create order
router.post("/create/order", createOrder);

// Read all orders
router.get("/read/orders", readOrders);

// Mark single order as delivered means update from false to true
router.patch("/mark-delivered/order/:id", markDeliveredOrder);

// Delete order
router.delete("/delete/order/:id", deleteOrder);

module.exports = router;
