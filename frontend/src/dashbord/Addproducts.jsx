import React, { useState } from 'react'
import Dash from '../components/Dash'
import axios from 'axios'

const AddProduct = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [Quant, setQuant] = useState("")
  const [Category, setCategory] = useState("")
  const [Descript, setDescript] = useState("")
  const [Image1, setImage1] = useState(null)
  // console.log(name, price, Quant, Category, Descript, Image1)

  const PostProduct = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price); // use lowercase 'price'
    formdata.append("quantity", Quant);
    formdata.append("categ", Category);
    formdata.append("desc", Descript);
    formdata.append("prImg", Image1);
    axios.post(`${import.meta.env.VITE_REACT_API}/create/product`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(() => {
        alert("Product successfully added");
        
      })
      .catch((err) => {
        console.error("Error adding product:", err.response?.data || err.message);
        alert("Failed to add product. Check console for details.");
      });


  }
  return (
    <div className='flex'>
      <div className='fixed '>
        <Dash />
      </div>

      <div className='flex justify-center w-full items-center h-screen'>
        <form onSubmit={PostProduct} className='flex flex-col space-y-3 bg-blue-500 px-10 py-5 rounded-lg' action="">
          <input value={name} onChange={(e) => setName(e.target.value)} className='border-2  rounded-lg text-base border-black pl-3' type="text" placeholder='Enter Product Name' />
          <input value={Descript} onChange={(e) => setDescript(e.target.value)} className='border-2 rounded-lg text-base border-black pl-3' type="text" placeholder='Enter Description' />
          <input value={price} onChange={(e) => setPrice(e.target.value)} className='border-2 rounded-lg text-base border-black pl-3' type="number" placeholder='Enter Price' />
          <input value={Quant} onChange={(e) => setQuant(e.target.value)} className='border-2 rounded-lg text-base border-black pl-3' type="number" placeholder='Enter Quantity' />
          <select value={Category} onChange={(e) => setCategory(e.target.value)} className='rounded-lg py-1 pl-2' name="" placeholder="choose" id="">
            <option value="">choose Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Furnatute">Furnatute</option>
            <option value="Men">Men</option>

          </select>

          <input onChange={(e) => setImage1(e.target.files[0])} type="file" placeholder='Enter ' />
          <button type='submit' className='text-xl font-bold bg-blue-400 text-white rounded-lg'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
