import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "${import.meta.env.VITE_REACT_API}/login/Customer",
        formData
      );

      console.log("Login response:", res.data); // debug

      setMessage(res.data.message || "Login successful");

      // Save user info + role in localStorage
      const loggedInUser = {
        Name: res.data.Name,
        Email: res.data.Email,
        Phone: res.data.Phone,
        role: res.data.role, // lowercase
        token: res.data.token,
      };
      localStorage.setItem("LoggedInUser", JSON.stringify(loggedInUser));

      // Redirect based on role
      setTimeout(() => {
        if (loggedInUser.role === "admin") {
          navigate("/dash");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      console.error("Login error:", err); // debug
      setMessage(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
          <h1>
            I have Already Accounr{" "}
            <NavLink className={`text-blue-500 underline `} to="/Register">
              <a href="">Register Know</a>
            </NavLink>
          </h1>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"
              } font-medium`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
