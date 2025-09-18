import React, { useState } from "react"; 
import Header from "../components/header";

import { FaUserTie, FaTruck } from "react-icons/fa"; // Import icons
import Footer from "../components/Footer";

const About = () => {
  const [category, setCategory] = useState("electronics");
  const frimage = "data:image/jpeg;base64,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"
  return (  
    <div>
      <Header />
    
      

      
      {/* 🔥 Hot Items Section */}
      <div className=" from-gray-50 to-gray-100 py-10">
        <div className="text-center mb-8">
           <h1 className="text-4xl transition-transform duration-300  text-gray-400 mt-10 mb-20  lg:text-5xl font-extrabold drop-shadow-lg leading-tight">
            ABOUT US
            </h1>

          <div className="flex justify-center gap-5 mt-6">
            <button
              onClick={() => setCategory("electronics")}
              className={`px-6 py-2 rounded-full font-semibold ${
                category === "electronics" ? "bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-indigo-100 transition duration-300" : "border"
              }`}
            >
              Electronics
            </button>
            <button
              onClick={() => setCategory("clothes")}
              className={`px-6 py-2 rounded-full font-semibold ${
                category === "clothes" ? "bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-indigo-100 transition duration-300" : "border"
              }`}
            >
              Clothes
            </button>
          </div>
        </div>

        {/* Electronics */}
        {category === "electronics" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/10613/10613878.png"
                alt="Smartphone"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Smartphone Pro Max</h2>
              <p className="text-gray-600 text-sm mt-2">High-performance smartphone with best camera and speed.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3069/3069186.png"
                alt="Headphones"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Wireless Headphones</h2>
              <p className="text-gray-600 text-sm mt-2">Noise cancellation and long battery life.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                alt="Smart Watch"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Smart Watch</h2>
              <p className="text-gray-600 text-sm mt-2">Track health, fitness and notifications easily.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1049/1049105.png"
                alt="Laptop"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Laptop Ultra Slim</h2>
              <p className="text-gray-600 text-sm mt-2">Powerful laptop for work and gaming.</p>
            </div>
          </div>
        )}

        {/* Clothes */}
        {category === "clothes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
                alt="T-shirt"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Casual T-Shirt</h2>
              <p className="text-gray-600 text-sm mt-2">Soft cotton t-shirt for everyday comfort.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1545/1545683.png"
                alt="Jeans"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Blue Jeans</h2>
              <p className="text-gray-600 text-sm mt-2">Classic fit jeans with durable fabric.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1559/1559512.png"
                alt="Sneakers"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Sneakers</h2>
              <p className="text-gray-600 text-sm mt-2">Trendy sneakers for sports and casual wear.</p>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/892/892500.png"
                alt="Jacket"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="font-bold text-lg">Winter Jacket</h2>
              <p className="text-gray-600 text-sm mt-2">Warm stylish jacket for winter season.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row mt-20 gap-6 p-6 bg-gray-50">
      {/* Card 1 - Laptop */}
      <div className="bg-black text-white rounded-2xl  p-6 h-[300px] flex-1 relative overflow-hidden">
        <p className="text-lg font-semibold">TODAY SPECIAL</p>
        <h2 className="text-3xl font-bold text-yellow-500">LAPTOP DEAL</h2>
        <p className="absolute bottom-6 left-6 text-yellow-400 text-lg font-semibold">
          $599.00
        </p>
        <img
          src="https://pngimg.com/d/laptop_PNG101811.png" // laptop image from internet
          alt="Laptop"
          className="absolute right-4 bottom-0 w-56 object-contain"
        />
      </div>

      {/* Card 2 - Smartphone */}
      <div className="bg-black text-white rounded-2xl  p-6 flex-1 relative overflow-hidden">
        <p className="text-red-500 font-semibold">CRAZY, EVERYDAY OFFER</p>
        <h2 className="text-3xl font-bold">SMARTPHONE DEAL</h2>
        <p className="mt-2 text-gray-300">
          The latest smartphone with amazing performance.
        </p>
        
        <div className="absolute top-6 right-6 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm">
          30% OFF
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIE-shptbkegQlTfwE6eDy7Is3BisxldwmKQ&s" // smartphone image from internet
          alt="Smartphone"
          className="absolute right-4 bottom-0 w-48 object-contain"
        />
      </div>
    </div>

        <Footer />
    </div>

  );
};

export default About;



