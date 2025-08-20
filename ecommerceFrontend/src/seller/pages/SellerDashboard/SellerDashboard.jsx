import React from 'react'

import SellerRoutes from '../../../Routes/SellerRoutes'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'
const SellerDashboard=()=>{
    const toggleDrawer=()=>{}
    return(
        <div>
            <div className="lg:flex lg:h-[90vh]">
                <section className="hidden lg:block h-full">
                    <SellerDrawerList toggleDrawer={toggleDrawer}/>
                </section>
                <section className="p-10 w-full overflow-y-auto lg:w-[80%]">
                    <SellerRoutes/>
                </section>
            </div>
        </div>
    )
}

export default SellerDashboard