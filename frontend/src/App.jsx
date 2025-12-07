import React from 'react'
import Header from './components/header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Shop from './pages/Shop'
import Dashbord from './dashbord/Dashbord'
import Product from './dashbord/Products'
import AddProduct from './dashbord/Addproducts'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/protect'
import CartPage from './pages/Cartpage'
import Orders from './dashbord/Orders'
import MyDelivery from './pages/myDelivery'
import DetailsBlog from './pages/detailsblog'
import UsersPage from './dashbord/USerCustomer'
import PostList from './dashbord/postList'
import CreatePost from './dashbord/createPost'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/blog' element={<Blogs />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<CartPage />} />
         <Route
          path='/dash'
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path='/prod'
          element={
            <ProtectedRoute adminOnly={true}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Addpro'
          element={
            <ProtectedRoute adminOnly={true}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
             <Route
          path='/Postreader'
          element={
            <ProtectedRoute adminOnly={true}>
              <PostList/>
            </ProtectedRoute>
          }
        />
             <Route
          path='/Orde'
          element={
            <ProtectedRoute adminOnly={true}>
              <Orders />
            </ProtectedRoute>
          }
        />
                    <Route
          path='/CreatePost'
          element={
            <ProtectedRoute adminOnly={true}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
                    <Route
          path='/user'
          element={
            <ProtectedRoute adminOnly={true}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
            <Route
          path='/Orde'
          element={
            <ProtectedRoute adminOnly={true}>
              <Orders />
            </ProtectedRoute>
          }
        />
                    <Route
          path='/user'
          element={
            <ProtectedRoute adminOnly={true}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        
        
      <Route path='/Register' element={<RegisterForm />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/myDelivery' element={<MyDelivery />} />
      <Route path='/post/:id' element={<DetailsBlog />} />
      {/* <Route path='/singleproduct/:id' element={<SingleProduct/>} /> */}
    </Routes>
    </div>
  ) 
  
}

export default App
