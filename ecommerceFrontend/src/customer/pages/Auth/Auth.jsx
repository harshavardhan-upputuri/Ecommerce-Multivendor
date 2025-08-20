import React, { useState } from 'react'
import Login from './Login';
import RegisterForm from './RegisterForm';
import Button from '@mui/material/Button';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='relative flex justify-center items-center h-[90vh]  '>

      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/84/32/52/360_F_284325273_ei2pxwlAyg4ghLOBINFPiF1LVubbfLpA.jpg')" }}
      ></div>


      <div className='absolute inset-0 bg-black/50'></div>


      <div className='relative z-10 max-w-md w-full rounded-md shadow-lg bg-white p-5'>
        {isLogin ? <Login /> : <RegisterForm />}

        <div className="flex items-center gap-1 justify-center mt-5">
          <p>{isLogin && "Don't "} have Account</p>
          <Button size='small' onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Account" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Auth
