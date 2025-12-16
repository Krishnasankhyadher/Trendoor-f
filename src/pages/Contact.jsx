import React from 'react'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox'
import PageTransition from '../components/Pagetransition'

const Contact = () => {
  return (
    <PageTransition>
      <div>
        
        {/* --- Header --- */}
        <div className='text-center text-2xl pt-10 border-t'>
            <Title text1={'CONTACT'} text2={'US'} />
        </div>

        {/* --- Main Content --- */}
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            
            {/* Left Side: Image */}
            <img 
                src="/Trendoor/images/ChatGPT Image Jul 6, 2025, 01_17_32 PM.png" 
                className='w-full md:max-w-[480px]' 
                alt="Trendoor Office" 
                loading="lazy"
            />

            {/* Right Side: Text & Actions */}
            <div className='flex flex-col justify-center items-start gap-6'>
                
                {/* Store Details */}
                <h3 className='font-semibold text-xl text-gray-600'>Our Store</h3>
                <p className='text-gray-500 leading-relaxed'>
                    BHURAPEER Street No.3 <br /> 
                    Hathras, Uttar Pradesh, India
                </p>
                <p className='text-gray-500'>
                    Tel: (+91) 94125-89173 <br /> 
                    Email: Trendoorcontact@gmail.com
                </p>

                {/* Careers Section */}
                <h3 className='font-semibold text-xl text-gray-600 mt-4'>Careers at Trendoor</h3>
                <p className='text-gray-500 max-w-sm'>
                    Learn more about our teams and job openings. We are always looking for creative talent.
                </p>

                {/* Styled Button */}
                <button className='border border-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-all duration-500 ease-in-out'>
                    Explore Jobs
                </button>

            </div>
        </div>

        {/* --- Newsletter --- */}
        <Newsletterbox />

      </div>
    </PageTransition>
  )
}

export default Contact