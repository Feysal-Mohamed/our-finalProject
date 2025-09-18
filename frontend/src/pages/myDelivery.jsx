import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";

const MyDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get logged in user info
  const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser")) || {};
  const filterField = "customerEmail";
  const filterValue = loggedInUser.Email || "";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://som-store-bacend.onrender.com/read/orders");
        // Filter orders for this user by email only
        const userOrders = res.data.filter(order => order.customerEmail === filterValue);
        setOrders(userOrders);
      } catch {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filterValue]);

  if (loading) return <div>Loading your deliveries...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <div><Header /></div>
    <div className="mt-10 px-10">

      <h2 className="text-xl font-bold mb-4">My Deliveries</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
              <div className="mb-2">Total Amount: <span className="font-bold">${order.TotalAmount}</span></div>
              <div className="mb-2">
                Delivery Status: <span className={order.delivered ? "text-green-600 font-bold" : "text-yellow-600 font-bold"}>
                  {order.delivered ? "Delivered" : "Pending"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.Products.map((item, idx) => (
                  <div key={idx} className="border p-3 rounded flex items-center space-x-4">
                    {item.prImg && (
                      <img
                        src={`https://som-store-bacend.onrender.com/AlImages/${item.prImg}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-bold">{item.name || "Unknown Product"}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: ${item.price || "N/A"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyDelivery;
