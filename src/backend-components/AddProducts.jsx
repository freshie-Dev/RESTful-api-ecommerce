import React, { useState } from 'react';
import axios from 'axios';
function AddProductForm() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: [],
        colors: [],
        brand: '',
        imageUrl: '',
        stock: '',
        ratings: {
            stars: '',
            reviews: '',
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
            setProduct({
                ...product,
                [name]: value,
            });
    };
    const handleNestedInput = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            ratings: {
                ...prevProduct.ratings,
                [name]: value
            }
        }));
    };
    

    const postProduct = async() => {
        try {
            const response = await axios.post('http://localhost:3000/products', product);
            console.log(response.data);
        } catch (error) {
            console.log(error, "Error while posting data");
        }
    };
    const handleColorChange = (e) => {
        const { value } = e.target;
        // split the vable by space and store it in an array
        const colorsArray = value.split(',');
        setProduct(prevProduct => ({
            ...prevProduct,
            colors: colorsArray
        }));
        console.log("colors",colorsArray);
    };
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        // split the vable by comma and store it in an array
        const categoryArray = value.split(',');
        setProduct(prevProduct => ({
            ...prevProduct,
            category: categoryArray
        }));
        console.log("categoty",categoryArray);
    };

    const getAllProducts = async() => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            console.log(response.data);
        } catch (error) {
            console.log(error, "Error while getting data");
        }
    };
    const updateCategory = async() => {
        try {
            const response = await axios.patch('http://localhost:3000/products', {
                oldCategory: 'clothes shoes',
                newCategory: 'men clothes shoes'
            });
            console.log(response.data);
        } catch (error) {
            console.log(error, "Error while updating data");
        }
    };


    
    return (
        <div>
            <input onChange={handleChange} placeholder='name' type="text" name='name' value={product.name} />
            <input onChange={handleChange} placeholder='description' type="text" name='description' value={product.description} />
            <input onChange={handleChange} placeholder='price' type="text" name='price' value={product.price} />
            <input onChange={handleCategoryChange} placeholder='category' type="text" name='category' value={product.category} />
            {/* <input onChange={handleChange} placeholder='colors' type="text" name='colors' value={product.colors} /> */}
            {/* colors is an array and i want to add multiple colors to that array */}
            <input onChange={handleColorChange} placeholder='colors' type="text" name='colors' value={product.colors} />
            <input onChange={handleChange} placeholder='brand' type="text" name='brand' value={product.brand} />
            <input onChange={handleChange} placeholder='imageUrl' type="text" name='imageUrl' value={product.imageUrl} />
            <input onChange={handleChange} placeholder='stock' type="text" name='stock' value={product.stock} />
            <input onChange={handleNestedInput} placeholder='stars' type="text" name='stars' value={product.ratings.stars} />
            <input onChange={handleNestedInput} placeholder='reviews' type="text" name='reviews' value={product.ratings.reviews} />
            <button onClick={postProduct}>Submit!</button>
            <button onClick={getAllProducts}>Get All Products</button>
            <button onClick={updateCategory}>Update category</button>
        </div>
    );
}

export default AddProductForm;
