import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dash from '../components/Dash'

const Dashbord = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch orders (no token required if your API is public)
    axios
      .get(`${import.meta.env.VITE_REACT_API}/read/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));

    // Fetch users (requires token)
    const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    const token = loggedInUser?.token;

    if (token) {
      axios
        .get(`${import.meta.env.VITE_REACT_API}/read/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, []);

  // Orders stats
  const pendingOrders = orders.filter(order => !order.delivered);
  const deliveredOrders = orders.filter(order => order.delivered);

  // Users stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === "admin").length;

  return (
    <div className="flex space-x-10">
      <div>
        <Dash />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-10 py-8 w-full">
        {/* Orders */}
        <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Pending Orders</h3>
          <p className="text-3xl font-bold">{pendingOrders.length}</p>
        </div>
        <div className="p-6 bg-green-100 border-l-4 border-green-500 rounded shadow">
          <h3 className="text-lg font-semibold text-green-700">Delivered Orders</h3>
          <p className="text-3xl font-bold">{deliveredOrders.length}</p>
        </div>
        <div className="p-6 bg-blue-100 border-l-4 border-blue-500 rounded shadow">
          <h3 className="text-lg font-semibold text-blue-700">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>

        {/* Users */}
        <div className="p-6 bg-purple-100 border-l-4 border-purple-500 rounded shadow">
          <h3 className="text-lg font-semibold text-purple-700">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-6 bg-red-100 border-l-4 border-red-500 rounded shadow">
          <h3 className="text-lg font-semibold text-red-700">Total Admins</h3>
          <p className="text-3xl font-bold">{totalAdmins}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashbord
