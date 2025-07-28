import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>LATEST ARRIVALS</h1>
          <div className='flex items-center gap-2'>

       <Link to="/collection"><p className='font-semibold text-sm md:text-base'>SHOP NOW</p></Link>     
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>

        </div>

        </div>
      
        <img src="/Trendoor/images/ChatGPT Image Jun 30, 2025, 10_42_15 PM.png" className='h-100 w-auto sm:w-1/2' alt="" loading="lazy" />
    </div>
  )
}

export default Hero
