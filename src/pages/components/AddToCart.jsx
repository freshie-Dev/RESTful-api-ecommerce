import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import UserProviderContext from '../../context/UserContext';
import ProductsContextProvider from '../../context/ProductsContext';

export default function () {
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState('');

    const { foundProduct } = ProductsContextProvider();
    const [userCart, setUserCart] = UserProviderContext();

    
    const addToCart = () => {

       
    }

  return (
    <div className='m-[20px] p-4 bg-slate-400'>
        <button className='w-[50px] h-[30px] bg-slate-300 rounded-md'>-</button>
        <span className='px-5'>{quantity}</span>
        <button className='w-[50px] h-[30px] bg-slate-300 rounded-md'>+</button>

        <br />
        <button onClick={addToCart} className='my-4 w-[100px] h-[40px] bg-slate-300 rounded-md'>Add to 🛒</button>
    </div>
  )
}
