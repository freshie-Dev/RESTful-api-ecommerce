import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [foundProduct, setFoundProduct] = useState([]);

    //! Get all products
    const getProducts = async () => {
        const response = await axios.get('http://localhost:3000/products');
        const data = await response.data;
        // console.log(response.data);
        setProducts(response.data);
    };

    //! Get one product
    const getOneProduct = async (id) => {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const data = await response.data;
        // console.log(response.data);
        setFoundProduct(response.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return(
        <ProductsContext.Provider value={
            {
                products, getProducts,
                foundProduct, getOneProduct
            }
            }>
            {children}
        </ProductsContext.Provider>
    )
};
const ProductsContextProvider = () => {
    return ( useContext(ProductsContext) )
};

export { ProductsProvider };
export default ProductsContextProvider ;