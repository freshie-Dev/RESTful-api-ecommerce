import React,{useState, useEffect} from 'react'
import axios from 'axios'

export default function GetProducts() {
    const [products, setProducts] = useState([]);

    // const getProducts = async() => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/products');
    //         console.log(response.data);
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.log(error, "Error while getting data");
    //     }
    // };
    async function getProducts () {
        try {
            const response = await axios.get('http://localhost:3000/products');
            // console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log(error, "Error while getting data");
        }
    };
    async function sayHello () {
        console.log("i am saying hello")
    }
    useEffect(() => {
        
        getProducts();
        // sayHello();
    }, []);

  return (
    <div>
        <div>
            <button >Get Products</button>
        </div>
        <div className='' style={{maxWidth: "700px", margin:"auto"}}>
        {
            products.map((product, index) => {
                return (
                    <div key={index}>
                        <h1>{product.name}</h1>
                        <h2>{product.description}</h2>
                        <h3>{product.price}</h3>
                        <h4>{product.category}</h4>
                        <h5>{product.colors}</h5>
                        <h6>{product.brand}</h6>
                        <img src={product.imageUrl} alt="product image" />
                        <p>{product.stock}</p>
                        <p>{product.ratings.stars}</p>
                        <p>{product.ratings.reviews}</p>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}
