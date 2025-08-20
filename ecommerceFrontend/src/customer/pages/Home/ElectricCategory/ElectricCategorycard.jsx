import React from 'react'

const ElectricCategorycard = ({item}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
        <img className=" object-cover h-10 w-10  rounded-md" src={item.image} alt="" />
        <h2 className='font-semibold text-sm'>{item.name}</h2>
    </div>
  )
}

export default ElectricCategorycard
