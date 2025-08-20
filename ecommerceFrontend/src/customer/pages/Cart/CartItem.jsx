import { Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch} from "../../../State/Store";
import { updateCartItem } from '../../../State/customers/cartSlice';
const CartItem = ({item}) => {
 

    const dispatch=useAppDispatch()

    const handleUpdateQuantity=(delta)=>{
        dispatch(updateCartItem({jwt:localStorage.getItem("jwt"),cartItemId:item.id,cartItem:{quantity:item.quantity+delta}}))
    }
    return (
        <div className='border rounded-md relative '>
            <div className="p-5 flex gap-3">
                <div>
                    {/* "http://res.cloudinary.com/dxoqwusir/image/upload/v1727460133/4QdHw1UN_f8db19fa1b1947689b2cc1f461b25b14_fc2y1j.jpg" */}
                    <img className='w-[90px] rounded-md' src={item.product.images[0]} alt="" />
                </div>
                <div className="space-y-2">
                    <h1 className="font-semibold text-lg">{item.product.seller?.businessDetails.businessName}</h1>
                    <p className='text-gray-600 font-medium text-sm'>{item.product.title}</p>
                    <p className='text-gray-400 text-xs'><strong>Sold by:</strong> Natural Lifestyle Products Private Limited</p>
                    <p className='text-sm'>7 days replacement available</p>
                    <p className='text-gray-500 text-sm'><strong>quantity : </strong>{item.quantity}</p>
                </div>


            </div>
            <Divider />

            <div className='flex justify-between items-center'>
                <div className="px-5 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-2 w-[140px] justify-between ">
                        <Button variant='outlined' disabled={item.quantity == 1} onClick={()=> handleUpdateQuantity(-1)}>
                            <Remove />
                        </Button>
                        <span>
                            {item.quantity}
                        </span>
                        <Button variant='outlined' onClick={() => handleUpdateQuantity(1)}>
                            <AddIcon />
                        </Button>
                    </div>
                </div>
                <div className='pr-5'>
                    <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
                </div>
            </div>
            <div className='absolute top-1 right-1 '>
                <IconButton color='primary'>
                    <Close/>
                </IconButton>
            </div>
        </div>
    )
}

export default CartItem
