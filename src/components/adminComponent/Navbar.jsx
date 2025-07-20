import React from 'react'

const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src="Screenshot 2025-06-30 141043.png" className='w-[max(10%,80px)]' alt="" />
        <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs'>Log OUT</button>
      
    </div>
  )
}

export default Navbar
