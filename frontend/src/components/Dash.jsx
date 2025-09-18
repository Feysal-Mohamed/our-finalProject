import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Dash = () => {
    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("LoggedInUser");
      if (storedUser) {
        // setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("LoggedInUser");
      // setUser(null);
      navigate("/");
    };
  
  return (
    <>
    <div className='flex '>

    <div className=' w-[300px] pl-20  text-left  space-y-10 h-screen text-2xl font-bold text-white flex flex-col justify-center bg-blue-600'>
        <NavLink to="/dash"><h1><i className=" mr-2 fa-solid fa-house-user"></i>Dashbord</h1></NavLink>
        <NavLink to="/prod"><h1><i className=" mr-2 fa-brands fa-product-hunt"></i>Products</h1></NavLink>
        <NavLink to="/Addpro"><h1><i className=" mr-2 fa-solid fa-plus"></i>Add Products</h1></NavLink>
        <NavLink to="/user"><h1><i className=" mr-2 fa-solid fa-user"></i>Customers</h1></NavLink>
        <NavLink to="/Postreader"><h1><i className=" mr-2 fa-solid fa-user"></i>Post LIst</h1></NavLink>
        <NavLink to="/CreatePost"><h1><i className=" mr-2 fa-solid fa-user"></i>Create Post LIst</h1></NavLink>
        <NavLink to="/Orde"><h1><i className=" mr-2 fa-solid fa-cart-shopping"></i>All Orders</h1></NavLink>
        <NavLink to="/"><h1 onClick={()=>handleLogout()} className='text-red-500'><i className="mr-2 text-red-500 fa-solid fa-door-open"></i>LogOut</h1></NavLink>
       
    </div>
    </div>
    </>
  )
}

export default Dash
