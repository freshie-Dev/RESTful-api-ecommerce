import React, {useState} from 'react'
import UserContextProvider from '../context/UserContext';
import axios from 'axios';
// useparams
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export default function SignUp() {
  let navigate = useNavigate();
  // const { createUser, setSignupSwitch } = UserContextProvider();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'password2') {
      setConfirmPassword(e.target.value)
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // createUser(user);
    const response = await axios.post('http://localhost:3000/register', user)
    const data = await response.data;
    localStorage.setItem('token', data.token)

    navigate('/')
    console.log(token)

  };

  return (
    // text-[#F8ECC9]
    <Wrapper>
      <div className='flex flex-col text-black'>
        <form onSubmit={handleSubmit} className='border-4  text-[#C08261]  border-[#C08261] rounded-[15px] bg-1 flex flex-col justify-center items-center'>
          <h1 className=' text-5xl font-semibold w-[290px] sm:w-[320px] p-3 text-center'>Register</h1>
            <input onChange={handleChange} className=' w-[290px] sm:w-[320px] p-3 focus:outline-none' placeholder='Name' type="text" name="name" value={user.name} required/>
            <input onChange={handleChange} className='bg-1 w-[290px] sm:w-[320px] p-3  border  focus:outline-none' placeholder='Email'type="email" name="email" value={user.email} required />
            <input onChange={handleChange} className=' w-[290px] sm:w-[320px] p-3  border focus:outline-none' placeholder='Password' type="password" name="password" value={user.password} required/>
            <input onChange={handleChange} className='bg-1 w-[290px] sm:w-[320px] p-3 rounded-b-lg border  focus:outline-none' placeholder='Confirm Password' type="password" name="password2" value={confirmPassword} required/>
            {/* input for selecting from "buyer" or "seller" */}
            
        <p className=' p-3 bg-white w-full text-center'>What are you registering as?</p>
            <select className=' py-2 px-3 my-2 rounded-lg' onChange={handleChange} name="type" value={user.type} required>
                <option value="">Select One</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            <button className='text-lg p-3 rounded-b-lg bg-[#C08261] w-full text-[#F8ECC9] ' type="submit">Sign Up</button>
        </form>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .bg-1{
    background-color: #FAF1E4;  /* fallback for old browsers */
  }
`