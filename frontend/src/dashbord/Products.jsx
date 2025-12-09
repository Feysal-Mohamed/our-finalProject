import React, { useState, useEffect } from 'react';
import Dash from '../components/Dash';
import axios from 'axios';

const Product = () => {
  const [readData, setReadData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [Quant, setQuant] = useState("");
  const [Category, setCategory] = useState("");
  const [Descript, setDescript] = useState("");
  const [Image1, setImage1] = useState(null);
  const [ImagePreview, setImagePreview] = useState("");

  // Fetch all products
  const getData = () => {
    axios.get(`${import.meta.env.VITE_REACT_API}/read/product`)
      .then(res => {
        setReadData(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
      });
  };

  // Delete a product by ID
  const deleteProduct = (id) => {
    axios.delete(`${import.meta.env.VITE_REACT_API}/delete/product/${id}`)
      .then(() => {
        getData();
      })
      .catch(err => {
        console.error("Failed to delete product:", err);
      });
  };

  // Load product details into form for editing
  const handleEdit = (id) => {
    axios.get(`${import.meta.env.VITE_REACT_API}/singleProduct/product/${id}`)
      .then(res => {
        const data = res.data;
        setEditingId(id);
        setName(data.name);
        setPrice(data.price);
        setQuant(data.quantity);
        setCategory(data.categ);
        setDescript(data.desc);
        setImagePreview(`${import.meta.env.VITE_REACT_API}/AlImages/${data.prImg}`);
        setImage1(null); // Reset image input until user uploads a new file
        setIsEditing(true);
      })
      .catch(err => {
        console.error("Failed to load product for editing:", err);
      });
  };

  // Clear form fields
  const clearForm = () => {
    setName("");
    setPrice("");
    setQuant("");
    setCategory("");
    setDescript("");
    setImage1(null);
    setImagePreview("");
  };

  // Update product handler
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("quantity", Quant);
    formdata.append("categ", Category);
    formdata.append("desc", Descript);

    if (Image1) {
      formdata.append("img", Image1);
    }

    axios.put(`${import.meta.env.VITE_REACT_API}/update/product/${editingId}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert("Product Updated Successfully");
        setIsEditing(false);
        setEditingId(null);
        getData();
        clearForm();
      })
      .catch(err => {
        console.error("Failed to update product:", err);
        alert("Failed to update product");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex space-x-10 '>
      <div className='fixed'><Dash /></div>

      <div className='mt-10 pl-[300px] px-5'>
        {isEditing ? (
          <div className="p-5 bg-white shadow rounded max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Product Name"
                required
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Price"
                type="number"
                min="0"
                step="0.01"
                required
              />
              <input
                value={Descript}
                onChange={(e) => setDescript(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Description"
                required
              />
              <input
                value={Quant}
                onChange={(e) => setQuant(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Quantity"
                type="number"
                min="0"
                required
              />
              <input
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Category"
                required
              />
              <input
                type="file"
                onChange={(e) => setImage1(e.target.files[0])}
                accept="image/*"
              />

              {ImagePreview && (
                <img src={ImagePreview} alt="Preview" className="w-32 mt-2 rounded" />
              )}

              <div className="space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-500 text-white px-5 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    clearForm();
                  }}
                  className="bg-gray-400 text-white px-5 py-2 rounded"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h1 className='text-2xl font-bold underline underline-offset-4 decoration-blue-500'>Product List</h1>
            <table className=' mt-10'>
              <thead className='text-center'>
                <tr className='bg-gray-300 text-center'>
                  <th className='px-4'>Num</th>
                  <th className='px-16'>Image</th>
                  <th className='pr-12'>Product Name</th>
                  <th className='pr-12'>Quantity</th>
                  <th className='pr-12'>Price</th>
                  <th className='pr-12'>Category</th>
                  <th className='pr-12'>Status</th>
                  <th className='pr-12'>Action</th>
                </tr>
              </thead>
              <tbody>
                {readData.map((items,index) => (
                  <tr key={items._id} className='hover:bg-gray-100 text-center' >
                    <td className='px-4'>{index+1}</td>
                    <td className='px-16'>

                      <img
                        className='w-[180px] rounded-lg mt-2'
                        src={items.prImg}
                        alt={items.name}
                      />
                    </td>
                    <td className=' pr-12'>{items.name}</td>
                    <td className=' pr-12'>{items.quantity}</td>
                    <td className=' pr-12'>${items.price}</td>
                    <td className=' pr-12'>{items.categ}</td>
                    <td className={`${items.status === "available" ?"text-green-500" : "text-red-500"} pr-12`}>{items.status}</td>
                    <td className=' pr-12'>
                      <div className='flex space-x-2'>
                        <i
                          onClick={() => handleEdit(items._id)}
                          className="cursor-pointer text-blue-600 fa-solid fa-pen-to-square"
                          title="Edit"
                        ></i>
                        <i
                          onClick={() => deleteProduct(items._id)}
                          className="cursor-pointer text-red-600 fa-solid fa-trash"
                          title="Delete"
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
