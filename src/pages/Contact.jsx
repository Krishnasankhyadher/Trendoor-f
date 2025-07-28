import React from 'react'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t '>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src="/Trendoor/images/ChatGPT Image Jul 6, 2025, 01_17_32 PM.png" className='w-full md:max-w-[480px]' alt=""  loading="lazy"/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
          <p className='text-gray-600'>BHURAPEER Streat No.3 <br />HATHRAS , UTTARPRADESH  </p>
          <p className='text-gray-600'>Tel:(+91) 9412589173 <br /> Email: Trendoorcontact@gmail.com </p>
          <p className='font-semibold text-xl text-gray-600'>Carrers at Trendoor</p>
          <p className='text-gray-600'>Learn more about our terms and  job opportunity in future. </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Now</button>

        </div>

      </div>
    </div>
  )
}

export default Contact
