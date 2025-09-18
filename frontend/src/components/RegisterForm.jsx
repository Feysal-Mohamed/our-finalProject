import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Password: "",
    role: "customer", // default role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://som-store-bacend.onrender.com/create/Customer",
        formData
      );
      setMessage(res.data.message);

      // Redirect based on role
      setTimeout(() => {
        if (formData.role === "admin") {
          navigate("/dash"); // Admin dashboard
        } else {
          navigate("/login"); // Customer login
        }
      }, 1500);
    } catch (err) {
      // Log full error in console
      console.error("Registration error:", err);

      // Show detailed message if available
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {formData.role === "admin"
            ? "Admin Registration"
            : "Customer Registration"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              name="Name"
              placeholder="Enter your name"
              value={formData.Name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              name="Phone"
              type="number"
              placeholder="Enter your phone number"
              value={formData.Phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              name="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              name="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
