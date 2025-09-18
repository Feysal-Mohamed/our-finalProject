// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import Header from '../components/header';

// const Home = () => {
    
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:7000/read/product")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);
//   return (
//     <>
//     <Header />
//     <div className='px-20'>
//       <div className=' h-[300px] items-center flex bg-blue-500  px-20'>
//         <div className='w-[360px] space-y-10'>
//             <h1 className='text-3xl font-bold'>
//                 Grab Upto 50% Off on
//                 Selected headphone
//             </h1>
//             <button className='bg-green-800 px-3 py-2'>Buy Now</button>
//         </div>
//       </div>
//       <div className='flex gap-3'>

       
//       {
//         products.map((items)=>{
//           return(<>
//           <div className='w-[300px] space-y-4 py-2 px-3 rounded-lg border-2'>
//               <img
//                 className='rounded-xl'
//                 key={items._id}
//                 src={`http://localhost:7000/AlImages/${items.prImg}`}
//                 alt={items.name}
//               />
//             <h1>{items.name}</h1>
//             <h1><span>{items.status}</span><span>{items.quantity}</span></h1>
//             <h1><span>{items.price}$</span><span className='line-through text-gray-300'>344$</span></h1>
//               <button >Add To Cart</button>
//        </div>
//             </>)
//         })
//       }
//       </div>
//     </div>
//     </>

//   )
// }

// export default Home

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/header'
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://som-store-bacend.onrender.com/read/product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err))
  }, [])

  return (
    <>
      <Header />
      <div className="px-6 lg:px-20 ">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between rounded-3xl shadow-xl overflow-hidden mt-10 px-6 lg:px-16 py-10 bg-white/10 backdrop-blur-md"
        >
          <div className="w-full lg:w-1/2 space-y-6 text-gray-900 z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold drop-shadow-lg leading-tight">
              Grab Upto 50% Off on<br />Selected Headphone
            </h1>
            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-indigo-100 transition duration-300">
              <Link to="/shop">Buy Now</Link>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0"
          >
            <img
               src="data:image/webp;base64,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"

              alt="Promo"
              className="w-10 lg:w-80  hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 4).map(item => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex flex-col items-center hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
            >
              <motion.img
                src={`https://som-store-bacend.onrender.com/AlImages/${item.prImg}`}
                alt={item.name}
                className="rounded-xl w-full h-56 object-cover mb-4"
                whileHover={{ rotate: 1, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
              <h1 className="text-lg font-semibold text-gray-900 text-center">{item.name}</h1>
              <p className="text-gray-900 text-sm">{item.status} – {item.quantity}</p>
              <div className="text-lg font-bold mt-1 text-gray-900">
                <span>{item.price}$ </span>
                <span className="line-through text-gray-500 text-sm">344$</span>
              </div>

              <button className="bg-white mt-2 text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-indigo-100 transition duration-300">
                <Link to="/shop">Buy Now</Link>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
          <Footer />
    
    </>
  )
}

export default Home
