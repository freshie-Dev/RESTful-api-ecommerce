import React, {useEffect} from 'react'
import ProductsContextProvider from '../../context/ProductsContext'
import FilterContextProvider from '../../context/FilterContext';
import ProductCard from './ProductCard';

export default function Products() {
    const { products } = ProductsContextProvider();
    const { filteredProducts } = FilterContextProvider();
    console.log("Products page",filteredProducts);

    useEffect(() => {
    }, [])
    
    
    
  return (
    <>  
        <div className=' grid grid-cols-3'>
            {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    </>

  )
}