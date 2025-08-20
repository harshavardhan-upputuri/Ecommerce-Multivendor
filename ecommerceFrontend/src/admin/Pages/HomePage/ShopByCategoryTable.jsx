import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const ShopByCategoryTable = () => {
    const {home}=useAppSelector(store=>store);
  
  return (
    <div>
      <HomeCategoryTable data={home.homePageData?.shopByCategories}/>
    </div>
  )
}

export default ShopByCategoryTable
