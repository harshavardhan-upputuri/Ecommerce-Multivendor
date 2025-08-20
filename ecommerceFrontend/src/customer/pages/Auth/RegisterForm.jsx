import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useAppDispatch } from '../../../State/Store';
import { sendLoginSignupOtp } from '../../../State/AuthSlice';

const RegisterForm = () => {
  const dispatch = useAppDispatch()


  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: ""
    },
    onSubmit: (values) => {
      console.log("Form data ", values);


    }
  })

  const handleSendOtp = () => {

    dispatch(sendLoginSignupOtp({ email: formik.values.email }))
  }

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary pb-5">
        Register  As Customer</h1>
      <div className="space-y-5">
        <TextField sx={{ mb: 3 }} fullWidth name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />


        {true &&
          <div className='space-y-5'>
            <div className='space-y-2'>
              <p className="font-medium text-sm">Enter OTP sent to your email</p>
              <TextField sx={{ mb: 3 }} fullWidth name='otp' label="Otp" value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.otp && Boolean(formik.errors.otp)} helperText={formik.touched.otp && formik.errors.otp} />

            </div>
            <TextField sx={{ mb: 3 }} fullWidth name='fullName' label="Full Name" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.fullName && Boolean(formik.errors.fullName)} helperText={formik.touched.fullName && formik.errors.fullName} />

          </div>
        }

        {false && <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "11px", mb: "10px" }}>
          Sent Otp
        </Button>}


        <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "11px" }}>
          Signup
        </Button>
      </div>
    </div>
  )
}

export default RegisterForm
