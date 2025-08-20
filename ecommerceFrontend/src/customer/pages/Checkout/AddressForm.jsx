import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import { useAppDispatch } from '../../../State/Store'
import { createOrder } from '../../../State/customers/OrderSlice'

const AddressFormSchema=Yup.object().shape({
  name:Yup.string().required("Name is required"),
  mobile:Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/,"Invalid mobile number"),
  pincode:Yup.string().required("Pincode number is required").matches(/^[1-9][0-9]{5}$/,"Invalid pin code"),
  address:Yup.string().required("Address is required"),
  city:Yup.string().required("City is required"),
  state:Yup.string().required("State is required"),
  locality:Yup.string().required("Locality is required"),

})

const AddressForm = ({paymentGateWay}) => {
  const dispatch=useAppDispatch();

  const Formik=useFormik({
    initialValues:{
      name:'',
      mobile:"",
      pincode:"",
      address:"",
      city:"",
      state:"",
      locality:""
    },
    validationSchema:AddressFormSchema,
    onSubmit:(values)=>{
      // console.log(values);
      console.log(paymentGateWay);
      dispatch(createOrder({address:values,jwt:localStorage.getItem("jwt"),paymentGateway:paymentGateWay}))
    },
  })
  return (
    <Box >
      <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

      <form onSubmit={Formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item size={{xs:12}}>

            <TextField fullWidth name='name' label="Name" value={Formik.values.name} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.name && Boolean(Formik.errors.name)} helperText={Formik.touched.name && Formik.errors.name} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='mobile' label="Mobile" value={Formik.values.mobile} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.mobile && Boolean(Formik.errors.mobile)} helperText={Formik.touched.mobile && Formik.errors.mobile} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='pincode' label="Pincode" value={Formik.values.pincode} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.pincode && Boolean(Formik.errors.pincode)} helperText={Formik.touched.pincode && Formik.errors.pincode} />
          
          </Grid>
          <Grid item size={{xs:12}}>

            <TextField fullWidth name='address' label="Address" value={Formik.values.address} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.address && Boolean(Formik.errors.address)} helperText={Formik.touched.address && Formik.errors.address} />
          
          </Grid>

          <Grid item size={{xs:12}}>

            <TextField fullWidth name='locality' label="Locality" value={Formik.values.locality} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.locality && Boolean(Formik.errors.locality)} helperText={Formik.touched.locality && Formik.errors.locality} />
          
          </Grid>

          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='city' label="City" value={Formik.values.city} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.city && Boolean(Formik.errors.city)} helperText={Formik.touched.city && Formik.errors.city} />
          
          </Grid>
          <Grid item  size={{xs:6}}>

            <TextField fullWidth name='state' label="State" value={Formik.values.state} onChange={Formik.handleChange} onBlur={Formik.handleBlur} error={Formik.touched.state && Boolean(Formik.errors.state)} helperText={Formik.touched.state && Formik.errors.state} />
          
          </Grid>

          <Grid item size={{xs:12}}>
            <Button   type="submit" variant="contained" color="primary" fullWidth>
              ADD ADDRESS
            </Button>
          </Grid>       

          
        </Grid>
      </form>
    </Box>
  )
}

export default AddressForm
