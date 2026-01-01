import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='border-t border-gray-200 px-4 sm:px-10'>
            
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
                
                {/* 1. Brand Section */}
                <div>
                    <Link to='/'>
                        <img src="/Trendoor/images/Screenshot 2025-06-30 141043.png" alt="Trendoor" className='w-32 mb-5' />
                    </Link>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        At Trendoor, we’re redefining fashion. From trendy styles to timeless pieces, we curate quality you can trust—all while keeping it affordable.
                    </p>
                </div>

                {/* 2. Company Links + Admin Button */}
                <div>
                    <p className='text-lg font-semibold mb-5 text-gray-800'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600 font-medium'>
                        <Link to='/' className='hover:text-black transition-colors'><li>Home</li></Link>
                        <Link to='/About' className='hover:text-black transition-colors'><li>About Us</li></Link>
                        <Link to='/delivery' className='hover:text-black transition-colors'><li>Delivery</li></Link>
                        <Link to='/privacy' className='hover:text-black transition-colors'><li>Privacy Policy</li></Link>
                        <Link to='/terms' className='hover:text-black transition-colors'><li>Terms & Conditions</li></Link>
                        
                        {/* --- THE BUTTON --- */}
                        <Link to='/collaborator-login' className='mt-4 inline-block'>
                            <button className='bg-black text-white text-xs px-5 py-2 rounded-full shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300'>
                                Collaborator Login
                            </button>
                        </Link>
                        {/* ------------------ */}
                    </ul>
                </div>

                {/* 3. Contact Section */}
                <div>
                    <p className='text-lg font-semibold mb-5 text-gray-800'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='font-medium'>+91 9412589173</li>
                        <li className='hover:underline cursor-pointer'>Trendoorcontact@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div>
                <hr className='border-gray-300'/>
                <p className='py-5 text-sm text-center text-gray-500'>
                    Copyright 2024 @ Trendoor.in - All Rights Reserved
                </p>
            </div>

        </div>
    )
}

export default Footer