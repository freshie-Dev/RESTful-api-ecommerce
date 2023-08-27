import React from 'react'
import ProductsContextProvider from '../../context/ProductsContext'
import ProductCard from './ProductCard';

export default function Products() {
    const { products, getProducts } = ProductsContextProvider();

    React.useEffect(() => {
        getProducts();
    }, []);
    
  return (
    <>
        <div>Products</div>
        {products.map((product, index) => {
            return (
                <div key={index}>
                    <ProductCard product = {product} />
                </div>
            )
        })}
    </>

  )
}
