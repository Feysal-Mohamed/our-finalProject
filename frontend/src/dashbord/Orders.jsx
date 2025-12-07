import React, { useEffect, useState } from "react";
import axios from "axios";
import Dash from "../components/Dash";
import Footer from "../components/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_API}/read/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err.response?.data || err.message);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark order as delivered
  const handleMarkDelivered = async (orderId) => {
    console.log("Clicked mark delivered for:", orderId);

    // Optimistic update
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, delivered: true } : order
      )
    );

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_API}/mark-delivered/order/${orderId}`,
        { delivered: true }
      );
      alert(res.data.message || "Order marked as delivered!");
    } catch (err) {
      console.error("Failed to mark as delivered:", err.response?.data || err.message);
      alert("Failed to mark order as delivered");
      // rollback
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, delivered: false } : order
        )
      );
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    console.log("Clicked delete for:", orderId);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_API}/delete/order/${orderId}`
      );
      alert(res.data.message || "Order deleted successfully!");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err.response?.data || err.message);
      alert("Failed to delete order");
    }
  };

  // Split orders into pending and delivered
  const pendingOrders = orders.filter((order) => !order.delivered);
  const deliveredOrders = orders.filter((order) => order.delivered);

  // Reusable Order Card component
  const OrderCard = ({ order, isDelivered }) => (
    <div
      className={`border rounded-lg p-4 shadow mb-4 ${
        isDelivered ? "bg-gray-50" : "bg-white"
      }`}
    >
      <h3 className="font-semibold text-lg mb-2">
        Customer: {order.customerName}
      </h3>
      <div className="text-sm text-gray-600">
        Email: {order.customerEmail || "N/A"}
      </div>
      <div className="text-sm text-gray-600">
        Phone: {order.customerPhone || "N/A"}
      </div>
      <div className="mb-2">
        Total Amount: <span className="font-bold">${order.TotalAmount}</span>
      </div>

      {/* Action buttons */}
      <div className="mb-2">
        Delivery Status:{" "}
        <span
          className={
            isDelivered
              ? "text-green-600 font-bold"
              : "text-yellow-600 font-bold"
          }
        >
          {isDelivered ? "Delivered" : "Pending"}
        </span>

        {!isDelivered && (
          <button
            className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800 cursor-pointer transition"
            onClick={() => handleMarkDelivered(order._id)}
            disabled={order.delivered}
          >
            Mark as Delivered
          </button>
        )}

        <button
          className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer transition"
          onClick={() => handleDeleteOrder(order._id)}
        >
          Delete
        </button>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {order.Products?.map((item, idx) => (
          <div key={idx} className="border p-3 rounded flex items-center space-x-4">
            {item.prImg && (
              <img
                src={`${import.meta.env.VITE_REACT_API}/AlImages/${item.prImg}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <div className="font-bold">{item.name}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Price: ${item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Fixed Dashboard (sidebar/topbar) */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Dash />
      </div>

      {/* Orders section */}
      <div className="ml-[340px] px-5 my-4 relative z-20">
        <h2 className="text-xl font-bold mb-4">Orders</h2>

        {loading ? (
          <div>Loading orders...</div>
        ) : (
          <>
            {/* Pending Orders */}
            <h3 className="text-lg font-semibold mb-2 text-yellow-700">
              Pending Orders
            </h3>
            {pendingOrders.length === 0 ? (
              <div>No pending orders.</div>
            ) : (
              pendingOrders.map((order) => (
                <OrderCard key={order._id} order={order} isDelivered={false} />
              ))
            )}

            {/* Delivered Orders */}
            <h3 className="text-lg font-semibold mb-2 text-green-700 mt-10">
              Delivered Orders
            </h3>
            {deliveredOrders.length === 0 ? (
              <div>No delivered orders yet.</div>
            ) : (
              deliveredOrders.map((order) => (
                <OrderCard key={order._id} order={order} isDelivered={true} />
              ))
            )}
          </>
        )}
      </div>
      
    </div>
  );
};

export default Orders;
