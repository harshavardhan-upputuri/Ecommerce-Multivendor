import { TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep4 = ({formik}) => {
  return (
    <div className='space-y-5'>
        <TextField sx={{ mb: 3 }} fullWidth name='businessDetails.businessName' label="Business Name" value={formik.values.businessDetails.businessName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)} helperText={formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName} />
      
        <TextField sx={{ mb: 3 }} fullWidth name='businessDetails.sellerName' label="Seller Name" value={formik.values.businessDetails.sellerName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.businessDetails?.sellerName && Boolean(formik.errors.businessDetails?.sellerName)} helperText={formik.touched.businessDetails?.sellerName && formik.errors.businessDetails?.sellerName} />

        <TextField sx={{ mb: 3 }} fullWidth name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
       
        <TextField sx={{ mb: 3 }} fullWidth name='password' label="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />

    </div>
  )
}

export default BecomeSellerFormStep4
