import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const headerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <div className="mt-10">
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-green-700">Som-Store</h2>
            <p className="mt-4 text-gray-900 text-sm leading-relaxed">
              Discover curated furniture collections at Som-store, blending style and
              comfort to elevate your living spaces.
            </p>

            {/* Social Icons */}
         
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-gray-900">
              {headerLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="hover:text-green-600">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
       

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="mt-4 text-gray-900 text-sm">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
