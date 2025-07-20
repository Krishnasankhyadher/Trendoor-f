import React, { useContext, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import axios from 'axios'
import { useEffect } from 'react'

const Order = () => {
  const {backendurl,token, currency}=useContext(Shopcontext)
  const [orderdata,setorderdata]=useState([])

  const loadorderdata = async ()=>{
    try {
      if (!token) {
        return null
      }
    const response= await axios.post(backendurl + '/api/order/userorder',{},{ headers: { Authorization: `Bearer ${token}` } })
    
     if (response.data.success) {
      let allorderitems = []
      response.data.order.forEach((order)=>{
        order.items.forEach((item)=>{
          item['status']= order.status
          item['payment']= order.payment
          item['paymentmethod']= order.paymentmethod
          item['date']= order.date
          allorderitems.push(item)
        })
      })
      setorderdata(allorderitems.reverse());
      
     }
    } catch (error) {
      
    }
  }
  useEffect(() => {
  loadorderdata();
}, [token]);
  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={"MY"} text2={'ORDERS'}/>

      </div>
      <div>
        {
          orderdata.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='text-gray-700text-base mt-2 gap-3 flex items-center'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                 </div>
                   <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                   <p className='mt-2'>Payment Method: <span className='text-gray-400'>{item.paymentmethod}</span></p>
                </div>
             </div>
             <div className='md:w-1/2 flex justify-between'>
             <div className='flex items-center gap-2 '>
              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              <p className='text-sm md:text-base'>{item.status}</p>
            </div>
            <button onClick={loadorderdata} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

             </div>

            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
