import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // Added Link for the button
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const Latestcollection = () => {

    const { products } = useContext(Shopcontext)
    const [latestproducts, setlatestproducts] = useState([])

    useEffect(() => {
        // Displaying 6 items looks best in this 3-column layout
        setlatestproducts(products.slice(0, 6))
    }, [products])

    return (
        <div className='my-20 container mx-auto px-4 sm:px-6 lg:px-8'>
            
            <div className='flex flex-col md:flex-row gap-12'>
                
                {/* --- Left Side: Editorial Content (Sticky) --- */}
                {/* This stays fixed on the left while you scroll the products on desktop */}
                <div className='w-full md:w-1/4 flex flex-col justify-center md:sticky md:top-24 h-fit'>
                    
                    {/* Badge */}
                    <div className='flex items-center gap-2 mb-4'>
                        <span className='w-8 h-[1px] bg-black'></span>
                        <span className='text-xs font-bold uppercase tracking-widest text-gray-500'>New Season</span>
                    </div>

                    {/* Big Title */}
                    <div className='text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-[#414141]'>
                        <h2 className='font-light'>LATEST</h2>
                        <h2 className='font-serif italic text-gray-500'>Arrivals</h2>
                    </div>

                    {/* Description */}
                    <p className='text-gray-500 text-sm leading-relaxed mb-8 max-w-xs font-light'>
                        Discover the newest trends handpicked for you. From stylish casuals to modern essentials — refresh your wardrobe.
                    </p>

                    {/* CTA Button */}
                    <Link to='/collection' className='group flex items-center gap-3 w-fit'>
                        <span className='text-sm font-semibold uppercase tracking-widest border-b border-black pb-1 transition-all group-hover:border-gray-500 group-hover:text-gray-500'>
                            Shop All
                        </span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>

                {/* --- Right Side: Product Grid --- */}
                <div className='w-full md:w-3/4'>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10'>
                        {latestproducts.map((item, index) => (
                            <div 
                                key={index}
                                // Staggered animation effect (optional CSS class needed or keep simple)
                                className='group cursor-pointer'
                            >
                                {/* We wrap the Productitem to add extra hover effects if the component allows */}
                                <div className='relative overflow-hidden mb-3'>
                                    <Productitem
                                        id={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                    {/* Optional: Add a subtle overlay or interaction if Productitem supports it */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Latestcollection