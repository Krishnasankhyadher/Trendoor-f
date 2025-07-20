import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
   const { search, setsearch, showsearch, setshowsearch } = useContext(Shopcontext);
   const[vissible,setvissible]=useState(false)
   const location =useLocation()

   useEffect(()=>{
    if(location.pathname.includes('Collection') ){
      setvissible(true)

    }
    else{
      setvissible(false)
    }
   },[location])

  return showsearch  && vissible ? (
    <div className='border-t border-b bg-gray-50 text-center '>
        <div className='inline-flex items-center justify-center border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-gray-100 text-sm p-2 rounded-2xl' />
        <img src="https://www.svgrepo.com/show/532555/search.svg" className='w-4' alt="" />

        </div>
        <img src="https://www.svgrepo.com/show/521590/cross.svg" className='inline w-6 cursor-pointer' onClick={()=>setshowsearch(false)} alt="" />
      
    </div>
  ) :null
}

export default Searchbar
