import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch } from '../../../State/Store'
import { sendLoginSignupOtp, signin } from '../../../State/AuthSlice'
import { sellerLogin } from '../../../State/seller/SellerAuthSlice'

const SellerLoginForm = () => {
  const dispatch=useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: ""
    },
    onSubmit: (values) => {
      console.log("Form data ", values);
      // dispatch(signin(formik.values))
      dispatch(sellerLogin(formik.values))

    }
  })
  const handleSendOtp=()=>{
    
    dispatch(sendLoginSignupOtp({email:formik.values.email}))
  }
  const handleLogin=()=>{
    // dispatch(signin(email))
  }
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary pb-5">Login As Seller</h1>
      <div className="space-y-5">
        <TextField sx={{ mb: 3 }} fullWidth name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />


        {true && 
        <div className='space-y-2'>
          <p className="font-medium text-sm">Enter OTP sent to your email</p>
          <TextField sx={{ mb: 3 }} fullWidth name='otp' label="Otp" value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.otp && Boolean(formik.errors.otp)} helperText={formik.touched.otp && formik.errors.otp} />
        </div>
        }

        <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{py:"11px", mb:"10px"}}>
          Sent Otp
        </Button>

        <Button onClick={()=>formik.handleSubmit()} fullWidth variant='contained' sx={{py:"11px"}}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default SellerLoginForm
