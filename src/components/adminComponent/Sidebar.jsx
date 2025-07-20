import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
            <NavLink to="add" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
            <img src="https://www.svgrepo.com/show/528833/add-square.svg" className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Add Items </p>

            </NavLink>
            <NavLink to="list" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
            <img src="https://www.svgrepo.com/show/522403/folder.svg" className='w-5 h-5' alt="" />
            <p className='hidden md:block'>List Items </p>

            </NavLink>
            <NavLink to="orders" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
            <img src="https://www.svgrepo.com/show/524566/folder-check.svg" className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Orders </p>

            </NavLink>
            <NavLink to="promo" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
            <img src="https://www.svgrepo.com/show/524566/folder-check.svg" className='w-5 h-5' alt="" />
            <p className='hidden md:block'>PromoCodes </p>

            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
