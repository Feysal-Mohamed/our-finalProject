import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
function DetailsBlog(){
    const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7000/read/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post details:", err));
  }, [id]);
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7000/read/post`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  if (!post) {
    return <p className="text-center py-10">Loading post details </p>;
  }

    return (
         <div className="min-h-screen bg-gray-50">
      <Header />
       {/* divtaan flex sii comantigaan hoos tiisa  */}
       <div className="max-w-7xl mx-auto py-10 px-6">
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="md:col-span-2">
          {/* Sawirka weyn */}
          <img
            src={`${import.meta.env.VITE_REACT_API}/AlImages/${post.image}`}
            alt="Blog main"
            className="w-full h-[300px] object-cover rounded-lg mb-6"
          />

          {/* Article content */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="text-red-500 font-semibold">Lifestyle</span> • Admin • Feb 19, 2025
            </p>
            <h1 className="text-3xl font-bold mb-4">
             {post.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">{post.description}
              Did you come here for something in particular or just general Riker-bashing?
              And blowing into maximum warp speed, you appeared for an instant to be in two
              places at once. We have a saboteur aboard. We know you’re dealing in stolen ore.
              But I wanna talk about the assassination attempt on Lieutenant Worf. Could
              someone survive inside a transporter buffer for 75 years? Fate. It protects
              fools, little children, and ships named “Enterprise.”
            </p>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-8">
          {/* Blog Categories */}
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Blog Categories</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Lifestyle</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Social Media</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Company News</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Electronics</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
            </ul>
          </div>

          {/* Latest Blogs */}
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Blogs</h2>
            <div className="space-y-5">
              {/* Blog 1 */}
                  {posts.slice(0, 3).map((data) => (
              <div key={data._id} className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.VITE_REACT_API}/AlImages/${data.image}`}
                  alt="Blog"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 line-clamp-1 font-semibold text-sm hover:text-red-500 cursor-pointer">
                    {data.title}
                  </h3>
                    <h3 className="text-gray-800 font-semibold text-sm line-clamp-1 hover:text-red-500 cursor-pointer">
                    {data.description}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}


           
              </div>
            </div>
          </div>
        </div>
        {/* End Sidebar */}
      </div>
      </div>
  
    )
}
export default DetailsBlog