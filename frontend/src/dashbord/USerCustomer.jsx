import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dash from "../components/Dash";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
      const token = loggedInUser?.token;
      const role = loggedInUser?.role;

      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      // redirect non-admins
      if (role !== "admin") {
        navigate("/"); // or some "not authorized" page
        return;
      }

      const res = await axios.get(`${import.meta.env.VITE_REACT_API}/read/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };
  const handleRemoveAdmin = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("LoggedInUser"))?.token;
    await axios.put(
      `${import.meta.env.VITE_REACT_API}/removeAdmin/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  } catch (err) {
    alert(err.response?.data?.message || "Error removing admin rights");
  }
};


  const handleMakeAdmin = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("LoggedInUser"))?.token;
      await axios.put(
        `${import.meta.env.VITE_REACT_API}/makeAdmin/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error promoting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <>
    
    <div className="fixed">
      <Dash />
      </div>
    <div className="p-4 ml-[300px]">
      <h1 className="text-2xl mb-4">Users Management</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Num</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border text-center p-2">{index +1}</td>
              <td className="border p-2">{user.Name}</td>
              <td className="border p-2">{user.Phone}</td>
              <td className="border p-2">{user.Email}</td>
              <td className="border p-2">{user.role}</td>
              {/* <td className="border p-2">
                {user.role !== "admin" ? (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                    Make Admin
                  </button>
                ) : (
                  <span className="text-gray-500">Admin</span>
                )}
              </td> */}
              <td className="border p-2">
  {user.role === "admin" ? (
    <button
    onClick={() => handleRemoveAdmin(user._id)}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Remove Admin
    </button>
  ) : (
    <button
      onClick={() => handleMakeAdmin(user._id)}
      className="bg-green-500 text-white px-3 py-1 rounded"
    >
      Make Admin
    </button>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default UsersPage;
