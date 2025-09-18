import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dash from '../components/Dash';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://som-store-bacend.onrender.com/read/orders');
      setOrders(res.data);
    } catch (err) {
      console.log('Failed to fetch orders', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark as delivered
  const handleMarkDelivered = async (orderId) => {
    try {
      await axios.patch(`https://som-store-bacend.onrender.com/mark-single-delivered/order/${orderId}`);
      setOrders(prev =>
        prev.map(order => order._id === orderId ? { ...order, delivered: true } : order)
      );
    } catch (err) {
      console.log('Failed to mark as delivered', err);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`https://som-store-bacend.onrender.com/delete/order/${orderId}`);
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      console.log('Failed to delete order', err);
    }
  };

  const pendingOrders = orders.filter(order => !order.delivered);
  const deliveredOrders = orders.filter(order => order.delivered);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10"><Dash /></div>
      <div className="ml-[340px] px-5 my-4">
        <h2 className="text-xl font-bold mb-4">Orders</h2>

        {/* Pending Orders */}
        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Pending Orders</h3>
        {pendingOrders.length === 0 ? <div>No pending orders.</div> :
          pendingOrders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-white shadow mb-4">
              <h3 className="font-semibold text-lg mb-2">Customer: {order.customerName}</h3>
              <div className="mb-1 text-sm text-gray-600">Email: {order.customerEmail || 'N/A'}</div>
              <div className="mb-1 text-sm text-gray-600">Phone: {order.customerPhone || 'N/A'}</div>
              <div className="mb-2">Total Amount: <span className="font-bold">${order.TotalAmount}</span></div>
              <div className="mb-2">Total Amount: <span className="font-bold">${order.TotalAmount}</span></div>
              <div className="mb-2">
                Delivery Status: <span className="text-yellow-600 font-bold">Pending</span>
                <button
                  className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleMarkDelivered(order._id)}
                >
                  Mark as Delivered
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.Products.map((item, idx) => (
                  <div key={idx} className="border p-3 rounded flex items-center space-x-4">
                    {item.prImg && <img src={`https://som-store-bacend.onrender.com/AlImages/${item.prImg}`} alt={item.name} className="w-16 h-16 object-cover rounded" />}
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: ${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }

        {/* Delivered Orders */}
        <h3 className="text-lg font-semibold mb-2 text-green-700 mt-10">Delivered Orders</h3>
        {deliveredOrders.length === 0 ? <div>No delivered orders yet.</div> :
          deliveredOrders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-gray-50 shadow mb-4">
              <h3 className="font-semibold text-lg mb-2">Customer: {order.customerName}</h3>
              <div className="mb-1 text-sm text-gray-600">Email: {order.customerEmail || 'N/A'}</div>
              <div className="mb-1 text-sm text-gray-600">Phone: {order.customerPhone || 'N/A'}</div>
              <div className="mb-2">Total Amount: <span className="font-bold">${order.TotalAmount}</span></div>
              <div className="mb-2">
                Delivery Status: <span className="text-green-600 font-bold">Delivered</span>
                <button
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.Products.map((item, idx) => (
                  <div key={idx} className="border p-3 rounded flex items-center space-x-4">
                    {item.prImg && <img src={`https://som-store-bacend.onrender.com/AlImages/${item.prImg}`} alt={item.name} className="w-16 h-16 object-cover rounded" />}
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: ${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
