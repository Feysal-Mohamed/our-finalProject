import React, { useState, useEffect } from "react";
import Dash from "../components/Dash";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", image: null });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_API}/read/post`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditForm({ title: post.title, description: post.description, image: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await fetch(`${import.meta.env.VITE_REACT_API}/delete/post/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p._id !== id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);
    if (editForm.image) formData.append("image", editForm.image);

    const res = await fetch(`${import.meta.env.VITE_REACT_API}/update/post/${editPostId}`, {
      method: "PUT",
      body: formData,
    });
    const updatedPost = await res.json();

    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
    setEditPostId(null);
    setEditForm({ title: "", description: "", image: null });
  };

  return (
    <>
    <div className="fixed">
        <Dash />
    </div>
    <div className="max-w-6xl ml-[300px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) =>
          editPostId === post._id ? null : ( // hide post when editing
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.image && (
                <img
                  src={`${import.meta.env.VITE_REACT_API}/AlImages/${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">{post.title}</h2>
                <p className="text-gray-700 mb-4  line-clamp-3">{post.description}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Edit Form */}
      {editPostId && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Post</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Title"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              placeholder="Description"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={4}
              required
            ></textarea>
            <input
              type="file"
              onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
              className="w-full"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditPostId(null)}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
</>
  );
};

export default PostList;
