import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import { FaCheck, FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("readData")) || []
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  // For showing product details in popup
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_API}/read/product`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to cart handler
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

  // Filters
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

  // Close popup
  const closeDetails = () => setSelectedProduct(null);

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

      <div className="flex flex-col w-full px-4 sm:px-10 md:px-20  ">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4  my-6 w-full">
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
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        {/* Product List */}
        <div className="flex gap-6 flex-wrap">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((items) => {
              const isInCart = cartItems.some((p) => p._id === items._id);
              return (
                <div
                  key={items._id}
                  className="mt-6 border p-4 rounded-lg shadow-md w-full sm:w-60 bg-white hover:shadow-xl transition flex flex-col cursor-pointer"
                  onClick={() => setSelectedProduct(items)}
                >
                  <img
                    className="rounded-xl h-40 w-full object-cover"
                    src={
                      items.prImg
                        
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
                        ${items.price}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        344$
                      </span>
                    </h1>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening modal
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

      {/* Product Details Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-3xl p-6 relative">
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={`http://localhost:7000/AlImages/${selectedProduct.prImg}`}
                alt={selectedProduct.name}
                className="rounded-lg w-full sm:w-1/2 h-64 object-cover"
              />

              <div className="flex flex-col justify-center sm:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-600 mt-2">{selectedProduct.desc}</p>
                <p className="mt-3 text-gray-700">
                  Category:{" "}
                  <span className="font-semibold">
                    {selectedProduct.categ}
                  </span>
                </p>
                <p className="mt-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      selectedProduct.status === "available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedProduct.status}
                  </span>
                </p>
                <p className="mt-2">
                  Quantity:{" "}
                  <span className="font-semibold">
                    {selectedProduct.quantity}
                  </span>
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${selectedProduct.price}
                  </span>
                  <span className="text-gray-400 line-through">$344</span>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleLocalStore(selectedProduct)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={closeDetails}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Shop;
