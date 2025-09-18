import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://som-store-bacend.onrender.com/read/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-gray-600 mt-2">Discover articles, tips, and insights</p>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={`https://som-store-bacend.onrender.com/AlImages/${post.image}`}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No posts available yet.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
