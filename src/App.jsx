import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import AddProductForm from './backend-components/AddProducts'
import GetProducts from './backend-components/GetProducts'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Products from './pages/components/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import GlobalStyles from './GlobalStyles'
import { ThemeProvider } from 'styled-components'
import Navbar from './pages/components/Navbar'
import SingleProduct from './pages/SingleProduct'




function App() {

  const theme = {
    colors: {
      primary: '#f8049c'
    }
  }
  // convert to state

  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/get-products" element={<Products />} />
        <Route path='/single-product/:id' element={<SingleProduct />} />
      </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
