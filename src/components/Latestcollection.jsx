import React, { useContext, useEffect, useState } from 'react'
import { products } from '../assets/Asset'
import {Shopcontext} from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const Latestcollection = () => {

    const {products}=useContext(Shopcontext)
    const[latestproducts ,setlatestproducts]=useState([])
        useEffect(()=>{
            setlatestproducts(products.slice(0,8))

        },[products])
    
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
Discover the newest trends handpicked for you. From stylish casuals to modern essentials — refresh your wardrobe with our latest arrivals.
            </p>

        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
     {
  latestproducts.map((item, index) => (
    <Productitem
      key={index}
      id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
    />
  ))
}


      </div>
    </div>
  )
}

export default Latestcollection
