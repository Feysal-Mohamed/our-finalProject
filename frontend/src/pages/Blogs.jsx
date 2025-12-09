import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/Footer";
import { FaTimes } from "react-icons/fa";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_API}/read/post`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  const closePost = () => setSelectedPost(null);

  if (loading) {
    return (
      <>
        <Header />
        <div className="h-screen flex items-center justify-center text-gray-500">
          Loading posts...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Title */}
      <div className="text-center py-10 bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-gray-600 mt-2">Discover articles, tips, and insights</p>
      </div>

      {/* Blog Grid — full-screen style */}
      <div className="flex-grow px-6 sm:px-12 md:px-20 py-10 bg-gray-50">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition cursor-pointer flex flex-col"
                onClick={() => setSelectedPost(post)}
              >
                <img
                src={post.image}
                  alt={post.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3 flex-grow">
                    {post.description}
                  </p>
                  <p className="text-gray-400 text-xs mt-auto">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No blog posts available yet.
          </p>
        )}
      </div>

      <Footer />

      {/* Post Details Popup (full-screen overlay) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5x h-screen px-20 overflow-y-auto relative">
            <button
              onClick={closePost}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <FaTimes size={22} />
            </button>

            <img
              src={`${import.meta.env.VITE_REACT_API}/AlImages/${selectedPost.image}`}
              alt={selectedPost.title}
              className="w-[40%] mt-20 h-80 object-cover rounded-t-xl"
            />

            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedPost.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                {selectedPost.description}
              </p>
              <p className="text-gray-400 text-sm">
                Published:{" "}
                {new Date(selectedPost.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closePost}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
