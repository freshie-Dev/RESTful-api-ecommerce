import React from 'react'
import { NavLink } from 'react-router-dom';

export default function ProductCard(props) {
    // i have passed a product object as a prop
    // i need to destructure it
    const { product } = props;
    return (
        <NavLink to={`/single-product/${product._id}`} className='w-full'>
            <div className='w-full '>
                <img className=' scale-85 mx-auto object-contain' src={product.imageUrl} alt={product.name} />
                <h1>{product.name}</h1>
                <h1>{product.price}</h1>
                <h1>{product.description}</h1>
            </div>
        </NavLink>
    )

}
