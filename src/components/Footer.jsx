import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
                <div>
                    <Link to='/'><img src="/Trendoor/images/Screenshot 2025-06-30 141043.png" alt="no image" className='w-36' /></Link>
                    <p className='w-full md:w-2/3 text-gray-600'>
At Trendoor, we’re redefining fashion. From trendy styles to timeless pieces, we curate quality you can trust—all while keeping it affordable. Explore fashion that’s smart, sustainable, and just your vibe.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                      <Link to='/'><li>HOME</li></Link>  
                        <Link to='/About'><li>ABOUT US</li></Link>
                     <Link to='/delivery'><li>DELIVERY</li></Link>   
                      <Link to='/privacy'><li>PRIVACY POLICY</li></Link>  

                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH </p>
                    <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>+91 9412589173</li>
                    <li>Trendoorcontact@gmail.com</li>
                    </ul>

                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ Trendoor.in -All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Footer
