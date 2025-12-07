const OrderModel = require("../Models/orderModel");
const ProductModel = require("../Models/productModel");

// ✅ Create new order
const createOrder = async (req, res) => {
  const { Customers, customerEmail, customerPhone, product } = req.body;

  if (!product || product.length === 0) {
    return res.status(400).json({ message: "Product is required" });
  }

  let TotalAmount = 0;
  let Order = [];

  for (let items of product) {
    const productData = await ProductModel.findById(items.ProductId);
    if (!productData) {
      return res.status(400).json({ error: "This product not found" });
    }

    if (items.quantity > productData.quantity) {
      return res.status(400).json({ message: "This product is out of stock" });
    }

    let total = productData.price * items.quantity;
    TotalAmount += total;

    productData.quantity -= items.quantity;
    await productData.save();

    Order.push({
      ProductId: productData._id,
      name: productData.name,
      price: productData.price,
      quantity: items.quantity,
      prImg: productData.prImg || null
    });
  }

  const newOrder = new OrderModel({
    customerName: Customers,
    customerEmail: customerEmail || "",
    customerPhone: customerPhone || "",
    Products: Order,
    TotalAmount
  });

  await newOrder.save();
  res.status(201).json(newOrder);
};

// ✅ Read all orders
const readOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Mark as delivered
// ✅ Update order (not just mark delivered)
const markDeliveredOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body; // 🧠 data to update (e.g., { isDelivered: true })

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { ...updates, updatedAt: Date.now() }, // add timestamp automatically
      { new: true } // returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update order" });
  }
};

// ✅ Delete order (backend version)
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await OrderModel.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete order" });
  }
};

module.exports = { createOrder, readOrders, markDeliveredOrder, deleteOrder };
