import { createContext, useEffect, useReducer, useContext } from "react";
import ProductsContextProvider from "./ProductsContext";
const FilterContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filteredProducts: [...action.payload],
                allProducts: [...action.payload],
            }
        default:
            return state;
    }
}

const initialState = {
    filteredProducts: [],
    allProducts: [],
};

const FilterProvider = ({ children }) => {
    const { products } = ProductsContextProvider();
    console.log("FilterPage ",products)

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products]);

 

    return(
        <FilterContext.Provider value={
            {
                ...state,
            }
            }>
            {children}
        </FilterContext.Provider>
    )
};
const FilterContextProvider = () => {
    return ( useContext(FilterContext) )
};

export { FilterProvider };
export default FilterContextProvider ;