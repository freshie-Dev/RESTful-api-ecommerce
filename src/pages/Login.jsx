import React, { useState} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import UserProviderContext from '../context/UserContext';

export default function Login() {
    const {loggedInUser, setLoggedInUser} = UserProviderContext();
    let navigate = useNavigate();
    const [User, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...User,
            [e.target.name]: e.target.value
        })
    };
    const login = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/register/login', User)
        const data = await (response.data)

        const token = data.token
        const userCart = JSON.stringify(data.foundUser.cart)

        localStorage.setItem('token', token)
        setLoggedInUser



        console.log(token, userCart)
    };


  return (
    <>
        <form onSubmit={login} className='rounded-[15px] flex flex-col justify-center items-center border-4 border-[#FFDBAA]'>
        <h1 className='text-5xl p-3 font-semibold bg-[#FF9E9D] w-full rounded-t-xl  text-center text-[#5AB5AD]'>Login</h1>
            <input className="bg-[#95ded7] w-[290px] sm:w-[320px] p-3  border border-b-blue-200 focus:outline-none"onChange={handleChange} placeholder='Email'type="email" name="email" value={User.email} required />
            <input className="bg-[#fcd2d2] w-[290px] sm:w-[320px] p-3 border-b-blue-200 focus:outline-none"onChange={handleChange} placeholder='Password' type="password" name="password" value={User.password} required/>
            <button type="submit" className='w-[290px] sm:w-[320px] text-xl font-semibold p-3 rounded-b-xl   bg-[#5AB5AD] text-center text-[#FF9E9D]  '>Login</button>
        </form>
    </>
  )
};

const Container = styled.div`
    .bg-1{
        --r: 56px; /* control the size */
        --c1: #3FB8AF /*color 1*/ 99%,#0000 101%;
        --c2: #FF9E9D /*color 2*/ 99%,#0000 101%;
        
        --s:calc(var(--r)*.866);  /* .866 = cos(30deg) */
        --g0:radial-gradient(var(--r),var(--c1));
        --g1:radial-gradient(var(--r),var(--c2));
        --f:radial-gradient(var(--r) at calc(100% + var(--s)) 50%,var(--c1));
        --p:radial-gradient(var(--r) at 100% 50%,var(--c2));
        background:
            var(--f) 0 calc(-5*var(--r)/2),
            var(--f) calc(-2*var(--s)) calc(var(--r)/2),
            var(--p) 0 calc(-2*var(--r)),
            var(--g0) var(--s) calc(-5*var(--r)/2),
            var(--g1) var(--s) calc( 5*var(--r)/2),
            radial-gradient(var(--r) at 100% 100%,var(--c1)) 0 calc(-1*var(--r)),   
            radial-gradient(var(--r) at 0%   50% ,var(--c1)) 0 calc(-4*var(--r)),
            var(--g1) calc(-1*var(--s)) calc(-7*var(--r)/2),
            var(--g0) calc(-1*var(--s)) calc(-5*var(--r)/2),
            var(--p) calc(-2*var(--s)) var(--r),
            var(--g0) calc(-1*var(--s)) calc(var(--r)/ 2),
            var(--g1) calc(-1*var(--s)) calc(var(--r)/-2),
            var(--g0) 0 calc(-1*var(--r)),
            var(--g1) var(--s) calc(var(--r)/-2),
            var(--g0) var(--s) calc(var(--r)/ 2) 
            #FF9E9D; /*color 2 again here (yes I got lazy defining a variable ) */
        background-size: calc(4*var(--s)) calc(6*var(--r));
    }
`