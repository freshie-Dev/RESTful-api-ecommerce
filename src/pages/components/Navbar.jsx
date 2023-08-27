import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {

    const signout = () => {
        localStorage.removeItem('token')
    }
    
  return (
    <div className='flex justify-between items-center p-6 bg-gray-500 rounded-lg'>
        <h1 className='text-3xl font-semibold'>Navbar</h1>
        <nav>
        <Link className='p-1 mx-1' to="/">Home</Link>
        <Link className='p-1 mx-1' to="/get-products">Products</Link>
        <Link className='p-1 mx-1' to="/add-product">Add Product</Link>
        <Link className='p-1 mx-1' to="/register">Register</Link>
        <Link onClick={signout} className='' to="/register" >Sign out</Link>
        {/* <Link to="/sign-up">Sign Up</Link>
        <Link to="/login">Login</Link> */}
      </nav>
    </div>
  )
}
