import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import {Button} from '@mui/material'
import {   Storefront } from '@mui/icons-material';
const Home = () => {
  return (
    <>
        <div className="space-y-5 lg:space-y-10 relative pb-20">
            <ElectricCategory/>
            <CategoryGrid/>
            

            <div className='pt-20'>
              <h1 className="text-center text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-10">TODAY'S DEAL</h1>
              <Deal/>
            </div>

            <section className='py-20'>
              <h1 className="text-center text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-20">SHOP BY CATEGORY</h1>
              <ShopByCategory/>
            </section>

            <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
              <img className='w-full h-full' src="https://i.pinimg.com/1200x/5b/54/6f/5b546f487c3a3ad462ff31a999e32206.jpg" alt="" />
            
              <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3 ">
                <h1>Sell your Product</h1>
                <p className='text-lg md:text-2xl'>With <span className='logo'>Harsha</span></p>
                
                <div className="pt-6 flex justify-center">
                  <Button startIcon={<Storefront/>} variant="contained" size="large">
                    Become Seller
                  </Button>
                </div>
              </div>
            </section>
        </div> 
    </>
  )
}

export default Home
