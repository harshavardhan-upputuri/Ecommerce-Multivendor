import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"

 

const BecomeSellerFormStep2 = ({formik}) => {
   
  return (
    <Box >
     
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item size={{xs:12}}>

            <TextField fullWidth name='name' label="Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='mobile' label="Mobile" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.mobile && Boolean(formik.errors.mobile)} helperText={formik.touched.mobile && formik.errors.mobile} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='pincode' label="Pincode" value={formik.values.pincode} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.pincode && Boolean(formik.errors.pincode)} helperText={formik.touched.pincode && formik.errors.pincode} />
          
          </Grid>
          <Grid item size={{xs:12}}>

            <TextField fullWidth name='address' label="Address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.address && Boolean(formik.errors.address)} helperText={formik.touched.address && formik.errors.address} />
          
          </Grid>

          <Grid item size={{xs:12}}>

            <TextField fullWidth name='locality' label="Locality" value={formik.values.locality} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.locality && Boolean(formik.errors.locality)} helperText={formik.touched.locality && formik.errors.locality} />
          
          </Grid>

          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='city' label="City" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.city && Boolean(formik.errors.city)} helperText={formik.touched.city && formik.errors.city} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='state' label="State" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.state && Boolean(formik.errors.state)} helperText={formik.touched.state && formik.errors.state} />
          
          </Grid>

                

          
        </Grid>
      </form>
    </Box>
  )
}

export default BecomeSellerFormStep2

