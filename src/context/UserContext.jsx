import {createContext, useEffect, useState, useContext} from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({children}) {
    const [userCart, setUserCart] = useState({
        productId: '',
        quantity: 0
    });

    const addToCart = async () => {
        // pass usercart and auth-token from localstorage as headers
        const response = await axios.post('http://localhost:3000/register/cart', userCart, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.data;
        // console.log(data)
    }

    return (
        <UserContext.Provider value={{ userCart, setUserCart}}>
            {children}
        </UserContext.Provider>
    )
}

const UserProviderContext = () => {
    return (useContext(UserContext))
}
export {UserProvider};
export default UserProviderContext;