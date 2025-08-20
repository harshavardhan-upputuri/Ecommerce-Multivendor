import React from 'react'
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo'
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo'
import { menLevelThree } from '../../../data/category/level Three/menLevelThree'
import { womenLevelThree } from '../../../data/category/level Three/womenLevelThree'
import { electronicsLevelThree } from '../../../data/category/level Three/electronicsLevelThree'
import { furnitureLevelThree } from '../../../data/category/level Three/furnitureLevelThree'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const categoryTwo={
    men:menLevelTwo,
    women:womenLevelTwo,
    electronics:electronicsLevelTwo,
    home_furniture:furnitureLevelTwo
}

const categoryThree={
    men:menLevelThree,
    women:womenLevelThree,
    electronics:electronicsLevelThree,
    home_furniture:furnitureLevelThree
}

const CategorySheet = ({seletedCategory,setShowSheet}) => {
    const childCategory=(category,parentCategoryId)=>{
        return category.filter((child)=>child.parentCategoryId===parentCategoryId);
    }
    const navigate=useNavigate()
  return (
    <div>
      <Box sx={{zIndex:2}} className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
        <div className="flex text-sm flex-wrap ">
            {
                categoryTwo[seletedCategory]?.map((item,index)=><div className={`p-8 lg:w-[25%] ${index%2==0?"bg-slate-50":"bg-white"}`}>
                    <p className='text-primary mb-5 font-semibold'>{item.name}</p>
                    <ul className='space-y-3'>

                        {childCategory(categoryThree[seletedCategory],item.categoryId).map((item)=><div>
                            <li onClick={()=>navigate("/products/"+item.categoryId)} className="hover:text-primary cursor-pointer">
                                {item.name}
                            </li>
                        </div>)}
                        
                    </ul>
                </div>)
            }
        </div>
      </Box>
    </div>
  )
}

export default CategorySheet
