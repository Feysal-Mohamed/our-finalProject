import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("readData")) || []
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://som-store-bacend.onrender.com/read/product"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" ||
      item.categ.toLowerCase() === category.toLowerCase();
    const matchesStatus =
      status === "all" || item.status.toLowerCase() === status.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...new Set(products.map((item) => item.categ))];

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-20 text-gray-600">
          Loading products...
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="flex flex-col w-full px-4 sm:px-10 md:px-20 items-center justify-center">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center my-6 w-full justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full sm:w-auto"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat === "all"
                  ? "All Categories"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {/* Products */}
        <div className="flex gap-6 flex-wrap justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((items) => {
              const isInCart = cartItems.some((p) => p._id === items._id);
              return (
                <div
                  key={items._id}
                  className="mt-6 border p-4 rounded-lg shadow-md w-full sm:w-60 bg-white hover:shadow-xl transition flex flex-col cursor-pointer"
                  onClick={() =>
                    navigate(`/singleproduct/${items._id}`)
                  }
                >
                  <img
                    className="rounded-xl h-40 w-full object-cover"
                    src={
                      items.prImg
                        ? `https://som-store-bacend.onrender.com/AlImages/${items.prImg}`
                        : "/fallback.jpg"
                    }
                    alt={items.name}
                  />
                  <h1 className="mt-3 font-semibold text-gray-800">
                    {items.name}
                  </h1>
                  <h1 className="text-sm text-gray-500">
                    <span>{items.status}</span> |{" "}
                    <span>{items.quantity} pcs</span>
                  </h1>
                  <div className="mt-2">
                    <h1 className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        {items.price}$
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        344$
                      </span>
                    </h1>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent navigating when clicking Add to Cart
                        handleLocalStore(items);
                      }}
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-lg mt-10">No products found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
