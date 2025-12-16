import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import { Shopcontext } from '../context/Shopcontext'
import Productitem from './Productitem'

const Relatedproduct = ({ category, subcategory }) => {

    const { products } = useContext(Shopcontext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            
            // Filter logic
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subcategory === item.subcategory)
            
            // Take 6 items to fit the 3-column grid perfectly
            setRelated(productsCopy.slice(0, 6))
        }
    }, [products, category, subcategory])

    return (
        <div className='my-24 container mx-auto px-4 sm:px-6 lg:px-8'>
            
            <div className='flex flex-col md:flex-row gap-12'>
                
                {/* --- Left Side: Editorial Content (Sticky) --- */}
                <div className='w-full md:w-1/4 flex flex-col justify-center md:sticky md:top-24 h-fit'>
                    
                    {/* Badge */}
                    <div className='flex items-center gap-2 mb-4'>
                        <span className='w-8 h-[1px] bg-black'></span>
                        <span className='text-xs font-bold uppercase tracking-widest text-gray-500'>Top Picks</span>
                    </div>

                    {/* Big Title */}
                    <div className='text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-[#414141]'>
                        <h2 className='font-light'>RELATED</h2>
                        <h2 className='font-serif italic text-gray-500'>Products</h2>
                    </div>

                    {/* Description */}
                    <p className='text-gray-500 text-sm leading-relaxed mb-8 max-w-xs font-light'>
                        Complete your look. Based on your current selection, here are similar styles and matching essentials you might love.
                    </p>

                    {/* CTA Button */}
                    <Link to='/collection' className='group flex items-center gap-3 w-fit'>
                        <span className='text-sm font-semibold uppercase tracking-widest border-b border-black pb-1 transition-all group-hover:border-gray-500 group-hover:text-gray-500'>
                            View Collection
                        </span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>

                {/* --- Right Side: Product Grid --- */}
                <div className='w-full md:w-3/4'>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10'>
                        {related.map((item, index) => (
                            <div key={index} className='group cursor-pointer'>
                                <div className='relative overflow-hidden mb-3'>
                                    <Productitem 
                                        id={item._id} 
                                        name={item.name} 
                                        price={item.price} 
                                        image={item.image} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Relatedproduct