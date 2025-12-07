import React, { useState } from "react";
import Dash from "../components/Dash";

const CreatePost = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for live preview

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_API}/create/post`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Post created successfully!");
        setForm({ title: "", description: "" });
        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create post");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex">
      {/* Dashboard */}
      <div className="w-72">
        <Dash />
      </div>

      {/* Create Post Form */}
      <div className="flex-1 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">➕ Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={5}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mt-2 border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
