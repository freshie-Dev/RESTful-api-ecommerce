import React from 'react'
import { useParams } from 'react-router'
import ProductsContextProvider from '../context/ProductsContext'
import AddToCart from './components/AddToCart';


export default function SingleProduct() {

 
  const { id } = useParams();
  const { foundProduct, getOneProduct } = ProductsContextProvider();

  React.useEffect(() => {
      getOneProduct(id);
  }, []);

  if (Object.keys(foundProduct).length === 0) {
    return ( <h1 className='text-3xl text-center'>Loading...</h1>)
  }
  return (
    <div className='flex flex-col'>
          <div className='m-[20px] p-4 bg-slate-600'>
            <h1 className=' bg-slate-400'></h1>
            <h1>{foundProduct.name}</h1>
            <h1>{foundProduct.price}</h1>
            <h1>{foundProduct.description}</h1>
            <h1>{foundProduct.stock}</h1>
          </div>
          <AddToCart />

    </div>
  )
}
