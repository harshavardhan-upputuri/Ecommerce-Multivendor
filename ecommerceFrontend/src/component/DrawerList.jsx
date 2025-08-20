import React from 'react'
import {Divider, ListItemIcon, ListItemText} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../State/Store';
import { logout } from '../State/AuthSlice';
// const DrawerListProps={
//   menu:[],
//   menu2:[],
//   toggleDrawer:()=>{}
// }
/**
 * @typedef {Object} MenuItem
 * @property {string} name  
 * @property {string} path  
 * @property {*} icon  
 * @property {*} activeIcon  
 */

/**
 * @param {{ menu: MenuItem[], menu2: MenuItem[], toggleDrawer: () => void }} props
 */

const DrawerList = ({menu=[],menu2=[],toggleDrawer=()=>{}}) => {
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  const handleLogout=()=>{
    dispatch(logout(navigate))
  }
  return (
    <div className='h-full'>
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">

        
            <div className="space-y-2">
                {
                  menu.map((item,index)=>(
                    <div onClick={()=> navigate(item.path)} className='pr-9 cursor-pointer' key={index}>
                      <div className={`${item.path==location.pathname ?"bg-primary text-white":"bg-white text-primary" } flex items-center px-5 py-3 rounded-r-full `}>
                        <ListItemIcon>
                          {item.path==location.pathname  ?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                      </div>
                    </div>
                  ) )
                }
            </div>

            <Divider/>
            <div className="space-y-2">
                {
                  menu2.map((item,index)=>(
                    <div onClick={()=>{
                      navigate(item.path);
                      if(item.path=="/") handleLogout()
                    }} className='pr-9 cursor-pointer' key={index}>
                      <div className={`${item.path==location.pathname ?"bg-primary text-white":"bg-white text-primary" } flex items-center px-5 py-3 rounded-r-full `}>
                        <ListItemIcon>
                          {item.path==location.pathname  ?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                      </div>
                    </div>
                  ) )
                }
            </div>
        
      </div>
    </div>
  )
}

export default DrawerList
