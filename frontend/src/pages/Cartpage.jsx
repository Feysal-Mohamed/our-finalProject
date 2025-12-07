import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("readData")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: 1,
      maxQuantity: item.quantity, // max available stock
    }));
    setCart(updatedCart);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Increment quantity
  const handleIncrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.maxQuantity
                  ? item.quantity + 1
                  : item.maxQuantity,
            }
          : item
      )
    );
  };

  // Decrement quantity
  const handleDecrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Remove item
  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    localStorage.setItem("readData", JSON.stringify(updated));
    setCart(updated);
  };

  // Checkout / Place order
  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");

    try {
      const orderData = cart.map((item) => ({
        ProductId: item._id,
        name: item.name,
        price: item.price,
        prImg: item.prImg,
        quantity: item.quantity,
      }));

      const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser")) || {};
      const customerName = loggedInUser.Name || "Guest";
      const customerEmail = loggedInUser.Email || "";
      const customerPhone = loggedInUser.Phone || "";

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API}/create/order`,
        {
          Customers: customerName,
          customerEmail,
          customerPhone,
          product: orderData,
        }
      );

      alert("Order placed successfully!");
      localStorage.removeItem("readData");
      setCart([]);
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Main content */}
      <div className="flex-1 px-4 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <h2 className="text-xl text-center text-gray-500">
            Your cart is empty
          </h2>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-6 py-3">Product</th>
                  <th className="text-left px-6 py-3">Price</th>
                  <th className="text-left px-6 py-3">Quantity</th>
                  <th className="text-left px-6 py-3">Total</th>
                  <th className="text-left px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200">
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <img
                        src={`${import.meta.env.VITE_REACT_API}/AlImages/${item.prImg}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500 text-sm truncate w-60">
                          {item.desc}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4 -mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-2 py-1  bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      ${item.price * item.quantity}
                    </td>
                    <td className="px-6 py">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Checkout summary fixed at bottom */}
      <div className="bg-white shadow-lg p-6 w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6 fixed bottom-0 left-0 right-0">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <span className="font-semibold">Items: {cart.length}</span>
          <span className="font-semibold">Shipping: $10.00</span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Promo code"
              className="border px-2 py-1 rounded"
            />
            <button className="bg-red-500 text-white px-4 py-1 rounded">
              Apply
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-xl font-bold">
            Total: ${totalPrice + 10}
          </span>
          <button
            onClick={handleCheckout}
            className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
