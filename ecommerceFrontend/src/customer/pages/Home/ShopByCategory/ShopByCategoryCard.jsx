import React from 'react'

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='h-[150px] w-[150px] lg:w-[249px] rounded-full  bg-primary'>
            <img className=' group-hover:scale-x-95 transition-transform transform-duration-700 object-cover object-top h-full w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFa3ri9vgZ6Pqten9j8XZonPlf9yZD27ghcQ&s" alt="" />
        </div>
        <h1>Kitchen & Table</h1>
    </div>
  )
}

export default ShopByCategoryCard
