import React from 'react'
import { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import PageTransition from '../components/Pagetransition'

const Placeorder = () => {
  const [method, setMethod] = useState('phonepay')
  const [isProcessing, setIsProcessing] = useState(false)
  const { 
    backendurl, 
    token, 
    cartitems, 
    setcartitems, 
    getcartamount, 
    delivery_charge, 
    products, 
    discount,
    promoCode 
  } = useContext(Shopcontext)
  
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const navigate = useNavigate()

  const onchangehandler = (e) => {
    const { name, value } = e.target
    setformdata(prev => ({ ...prev, [name]: value }))
  }

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (err) {
      return null
    }
  }

  const initiatePhonePePayment = async (orderId, amount) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/payment/initiate`,
        { amount, orderId, userId: decodeToken(token)?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (response.data.success) {
        window.location.href = response.data.url
      } else {
        throw new Error(response.data.message || 'Payment initiation failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(error.response?.data?.message || error.message || 'Payment failed')
      setIsProcessing(false)
    }
  }

  const onsubmithandler = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const decoded = decodeToken(token)
      const userid = decoded?.id

      if (!userid) {
        toast.error("Please login first to place order")
        setIsProcessing(false)
        return
      }

      // Prepare order items
      const orderItems = []
      for (const productId in cartitems) {
        const product = products.find(p => p._id === productId)
        if (!product) continue

        for (const size in cartitems[productId]) {
          const quantity = cartitems[productId][size]
          if (quantity > 0) {
            orderItems.push({
              _id: product._id,
              name: product.name,
              price: product.price,
              size,
              quantity
            })
          }
        }
      }

      const orderData = {
        userid,
        address: formdata,
        items: orderItems,
        amount: getcartamount() + delivery_charge - discount,
        originalAmount: getcartamount() + delivery_charge,
        discountAmount: discount,
        promoCode: promoCode || null
      }

      if (method === 'phonepay') {
        // First create the order
        const orderResponse = await axios.post(
          `${backendurl}/api/order/place`,
          { ...orderData, paymentmethod: 'phonepay', payment: false },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (orderResponse.data.success) {
          // Then initiate PhonePe payment
          await initiatePhonePePayment(
            orderResponse.data.orderId, 
            orderResponse.data.finalAmount
          )
        } else {
          throw new Error(orderResponse.data.message || 'Order creation failed')
        }
      } else {
        // COD order
        const response = await axios.post(
          `${backendurl}/api/order/place`,
          { ...orderData, paymentmethod: 'cod', payment: false },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (response.data.success) {
          setcartitems({})
          navigate('/ordersuccess', { state: { orderId: response.data.orderId } })
        } else {
          throw new Error(response.data.message || 'Order placement failed')
        }
      }
    } catch (error) {
      console.error("Order error:", error)
      toast.error(error.response?.data?.message || error.message || "Order failed")
      setIsProcessing(false)
    }
  }

  // Form validation
  const isFormValid = () => {
    return (
      formdata.firstname &&
      formdata.lastname &&
      formdata.email &&
      formdata.street &&
      formdata.city &&
      formdata.state &&
      formdata.zipcode &&
      formdata.country &&
      formdata.phone
    )
  }

  return (
    <PageTransition>

    <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        
        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='firstname' value={formdata.firstname} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" placeholder='First Name' />
          <input required onChange={onchangehandler} name='lastname' value={formdata.lastname} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" placeholder='Last Name' />
        </div>

        <input required onChange={onchangehandler} name='email' value={formdata.email} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="email" placeholder='Email' />
        
        <input required onChange={onchangehandler} name='street' value={formdata.street} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" placeholder='Address' />
        
        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='city' value={formdata.city} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" placeholder='City' />
          <input required onChange={onchangehandler} name='state' value={formdata.state} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangehandler} name='zipcode' value={formdata.zipcode} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="number" placeholder='Pincode' />
          <input required onChange={onchangehandler} name='country' value={formdata.country} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" placeholder='Country' />
        </div>

        <input required onChange={onchangehandler} name='phone' value={formdata.phone} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="number" placeholder='Phone no.' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal />
        </div>

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('phonepay')} 
              className={`flex items-center gap-3 border p-1 px-3 cursor-pointer ${method === 'phonepay' ? 'border-green-400' : ''}`}>
              <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'phonepay' ? 'bg-green-400' : ''}`}></div>
              <p className='text-gray-500 text-sm font-medium mx-4'>PHONEPE</p>
            </div>

            <div onClick={() => setMethod('cod')} 
              className={`flex items-center gap-3 border p-1 px-3 cursor-pointer ${method === 'cod' ? 'border-green-400' : ''}`}>
              <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></div>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
          <button 
  type='submit'
  disabled={!isFormValid() || isProcessing}
  className={`
    relative
    bg-black 
    text-white 
    px-16 
    py-3 
    text-sm
    transition-all
    duration-200
    ${(!isFormValid() || isProcessing) 
      ? 'opacity-70 cursor-not-allowed' 
      : 'hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99]'
    }
    overflow-hidden
    `}
>
  {/* Button text */}
  <span className={`relative z-10 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
    PLACE ORDER
  </span>
  
  {/* Loading indicator */}
  {isProcessing && (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg 
        className="animate-spin h-5 w-5 text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )}
</button>

          </div>
        </div>
      </div>
    </form>
          </PageTransition>
  )
}

export default Placeorder