import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'

const Ourpolicy = () => {
  return (
    <> 
     <div className='my-1'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"OUR"} text2={'POLICY'}></Title>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
Secure payments and trusted delivery—our policies are designed to give you a smooth and worry-free experience.
                </p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    </div>
                    </div>
                    </div>
       
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <Link to='/exchange'>
        <img src="https://www.svgrepo.com/show/346829/exchange-dollar.svg" className='w-12 m-auto mb-5' alt="" />
        </Link>
        <p className='font-semibold'>Exchange depend on T&C</p>
        <p className='text-gray-400'>Exchange depend on the conditions tap to know more</p>
      </div>
            <div>
        <Link to='/contact'>
        <img src="https://www.svgrepo.com/show/415825/contact-headset-communication.svg" className='w-12 m-auto mb-5' alt="" />
        </Link>
        <p className='font-semibold'>Contaxt Us</p>
        <p className='text-gray-400'>We providew 24X7 support</p>
      </div>
       <div>
        <Link to='/delivery'>
        <img src="https://www.svgrepo.com/show/403173/delivery-truck.svg" className='w-12 m-auto mb-5' alt="" />
        </Link>
        <p className='font-semibold'>Your order will be delivered in 5-7 days</p>
        <p className='text-gray-400'>Quick delivery to your doorstep with trusted partners.</p>
      </div>
    </div>
    </>
  )
}

export default Ourpolicy
