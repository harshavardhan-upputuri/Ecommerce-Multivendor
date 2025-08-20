import React from 'react'
import  "./ShopByCategory.css"
const ShopByCategoryCard = ({item}) => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custom-border h-[150px] w-[150px] lg:w-[249px] lg:h-[249px] rounded-full  bg-primary'>
            <img className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full' src={item.image} alt="" />
        </div>
        <h1>{item.name}</h1>
    </div>
  )
}

export default ShopByCategoryCard
