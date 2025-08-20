import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createDeal } from '../../../State/admin/DealSlice';

const CreateDealForm = () => {
    const dispatch=useAppDispatch();
      const {home} =useAppSelector(store=>store);

    const formik = useFormik({
        initialValues: {
            discount: 0,
            category: ""
        },
        onSubmit: (values) => {
            console.log("Submit ", values);
            const reqData={
                discount:values.discount,
                category:{
                    id:values.category
                }
            }
            dispatch(createDeal(reqData))
        }
    })
    return (
        <Box component={"form"} onSubmit={formik.handleSubmit} className='space-y-6'>
            <Typography  sx={{mb:3}} variant='h4' className='text-center'>
                Create Deal
            </Typography>
            <TextField sx={{mb:3}} fullWidth name='discount' label="discount" value={formik.values.discount} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.discount && Boolean(formik.errors.discount)} helperText={formik.touched.discount && formik.errors.discount} />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.category}
                    label="Category"
                    onChange={formik.handleChange}
                >
                    {home.homePageData?.dealCategories.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
                    
                </Select>
            </FormControl>

            <Button fullWidth sx={{py:".9rem", mt:3}} type='submit' variant='contained'>Create Deal</Button>
        </Box>
    )
}

export default CreateDealForm
