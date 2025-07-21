import React, { useContext, useState } from 'react'
import {Link, NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'

const Navbar = () => {
    const[visible ,setvisible]=useState(false)
    const [showDropdown, setShowDropdown] = useState(false);

    const {setshowsearch, getcartcount,token, settoken,setcartitems,navigate}=useContext(Shopcontext)
    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        settoken('')
        setcartitems({})
    }
    return (
        <div className='flex items-center justify-between py-5 font-medium'>
     <Link to='/'>     <img src="/Trendoor/images/Screenshot 2025-06-30 141043.png" alt="no image" className='w-36' /></Link>  
            <ul className='hidden  sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/About' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={()=>setshowsearch(true)} src="https://www.svgrepo.com/show/532555/search.svg" alt="no image" className='w-5 cursor-pointer' />
                <div className='relative group'>
                <img
  onClick={() => {
    if (!token) {
      navigate('/login');
    } else {
      setShowDropdown(prev => !prev);
    }
  }}
  src="https://www.svgrepo.com/show/512729/profile-round-1342.svg"
  className="w-5 cursor-pointer"
  alt="User Profile"
/>
                  {token && (
  <div className={`absolute right-0 pt-4 z-10 ${showDropdown ? 'block' : 'hidden'} md:group-hover:block`}>
    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
      <p
        onClick={() => {
          setShowDropdown(false);
          navigate('/order');
        }}
        className="cursor-pointer hover:text-black"
      >
        Orders
      </p>
      <p
        onClick={() => {
          setShowDropdown(false);
          logout();
        }}
        className="cursor-pointer hover:text-black"
      >
        Logout
      </p>
    </div>
  </div>
)}
</div>
              <Link to='/cart' className='relative'>
              <img src="https://www.svgrepo.com/show/524270/bag-5.svg" className='w-6 min-w-6' alt="" />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>      {getcartcount()}       </p>
              </Link>
              <img onClick={()=>setvisible(true)} src="https://www.svgrepo.com/show/532195/menu.svg" className='w-5 cursor-pointer sm:hidden' alt="" />
           </div>
           <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0' }`}>
            <div className='flex flex-col text-gray-600 '>
                <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180 ' src="https://www.svgrepo.com/show/350491/drop-down.svg" alt="" />
                    <p>Back</p>

                </div>
                <NavLink className='py-2 pl-6 border' onClick={()=>setvisible(false)} to='/'>HOME</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={()=>setvisible(false)} to='/Collection'>COLLECTION</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={()=>setvisible(false)} to='/About'>ABOUT</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={()=>setvisible(false)} to='/Contact'>CONTACT</NavLink>


            </div>

           </div>


        </div>
    )
}

export default Navbar
