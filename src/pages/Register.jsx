import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import styled from 'styled-components'

export default function Register() {
  return (
    //give both equal space
    <div className=' flex flex-col md:flex-row h-[85vh] w-full justify-center items-center'>
        <div className='bg1 rounded-l-[50px] h-full w-full flex-1 flex flex-col items-center justify-center'>
            <Login />
        </div>
        <div className='bg2 rounded-r-[50px] h-full w-full flex-1 flex flex-col items-center justify-center'>
            <SignUp />
        </div>
    </div>

  )
}

const Container = styled.div`

`
