// src/pages/SingleProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("readData")) || []
  );
  const [loading, setLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://som-store-bacend.onrender.com/singleProduct/product/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add to cart
  const handleLocalStore = (data) => {
    const newData = [...cartItems];
    const existItem = newData.find((item) => item._id === data._id);

    if (existItem) {
      existItem.cartQty = (existItem.cartQty || 1) + 1;
    } else {
      newData.push({ ...data, cartQty: 1 });
    }

    localStorage.setItem("readData", JSON.stringify(newData));
    setCartItems(newData);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-20 text-gray-600">Loading product...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="text-center mt-20 text-red-500">
          Product not found ❌
        </div>
      </>
    );
  }

  const isInCart = cartItems.some((p) => p._id === product._id);

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row gap-10 px-4 sm:px-20 mt-10">
        {/* Image */}
        <div className="flex-1">
          <img
            src={
              product.prImg
                ? `https://som-store-bacend.onrender.com/AlImages/${product.prImg}`
                : "/fallback.jpg"
            }
            alt={product.name}
            className="rounded-xl w-full h-[400px] object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.desc}</p>
          <p>
            <span className="font-semibold">Status:</span> {product.status}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {product.quantity} pcs
          </p>
          <p className="text-xl font-bold text-blue-600">{product.price}$</p>

          {/* Add to Cart */}
          <button
            onClick={() => handleLocalStore(product)}
            className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold transition ${
              isInCart
                ? "bg-blue-600 text-white flex items-center justify-center gap-2"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isInCart ? (
              <>
                <FaCheck /> Added
              </>
            ) : (
              "Add To Cart"
            )}
          </button>

          {/* Back to Shop */}
          <button
            onClick={() => navigate("/shop")}
            className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
