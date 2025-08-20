import React from 'react'
import ElectricCategorycard from './ElectricCategorycard'
import { useAppSelector } from '../../../../State/Store';

const ElectricCategory = () => {
  const {home}=useAppSelector(store=>store);
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
      {home.homePageData?.electricCategories.map((item)=> <ElectricCategorycard item={item}/>)}
    </div>
  )
}

export default ElectricCategory
