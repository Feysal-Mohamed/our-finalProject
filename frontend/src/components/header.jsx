import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart, FaTruck } from "react-icons/fa";

const Header = () => {
  const activeClass = "text-indigo-600 border-b-2 border-indigo-600";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("LoggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    navigate("/");
  };

  const firstName = user?.Name ? user.Name.charAt(0).toUpperCase() : "";

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-16 py-4">
        {/* Left: Logo */}
        <div className="text-2xl lg:text-3xl font-extrabold text-gray-900 drop-shadow-md">
          Som-Store
        </div>

        {/* Middle: Links (desktop) */}
        <ul className="hidden md:flex space-x-8 text-gray-900 font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 hover:text-indigo-600 ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Icons & User */}
        <div className="flex items-center space-x-4">
          {/* Cart icon always visible */}
          <NavLink
            to="/cart"
            className="text-gray-900 hover:text-indigo-600 transition-colors duration-300 text-lg"
          >
            <FaShoppingCart />
          </NavLink>

          {/* Menu toggle button (mobile) */}
          <button
            className="md:hidden text-gray-900 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center space-x-3">
              {/* My Delivery */}
              <NavLink
                to="/myDelivery"
                className={({ isActive }) =>
                  `transition-colors duration-300 flex items-center ${
                    isActive
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-900 hover:text-green-400"
                  }`
                }
              >
                <FaTruck className="mr-1" /> My Delivery
              </NavLink>

              {/* User badge */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 text-white font-bold uppercase shadow">
                {firstName}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="hidden md:block">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full px-6 py-4">
          <ul className="flex flex-col space-y-4">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block transition-colors duration-300 hover:text-indigo-600 ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <NavLink
                  to="/myDelivery"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center text-gray-900 hover:text-green-400 transition-colors"
                >
                  <FaTruck className="mr-1" /> My Delivery
                </NavLink>
                <div className="flex items-center justify-between mt-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 text-white font-bold uppercase shadow">
                    {firstName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline font-medium ml-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink to="/login">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md w-full mt-2">
                  Log In
                </button>
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
