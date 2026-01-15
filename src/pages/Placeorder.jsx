import React, { useContext, useState,useEffect } from 'react'
import Carttotal from '../components/Carttotal'
import { useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import PageTransition from '../components/Pagetransition'
import { FaArrowRight, FaLock, FaShieldAlt, FaCheck, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'

// 1. Reusable Interactive Input Component
const InteractiveInput = ({ label, name, value, onChange, type = "text", required = false, autoComplete, icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  
  return (
    <div className="relative w-full group">
      {/* Icon Wrapper */}
      {icon && (
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused || hasValue ? 'text-black' : 'text-gray-300'}`}>
          {icon}
        </div>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer w-full bg-white border-2 outline-none px-4 py-3.5 pt-5 text-sm font-medium text-black transition-all duration-300 placeholder-transparent
          ${icon ? 'pl-11' : 'pl-4'}
          ${isFocused ? 'border-black ring-1 ring-black/5' : 'border-gray-200 hover:border-gray-300'}
          ${hasValue ? 'border-gray-800' : ''}
        `}
        placeholder={label} // Needed for :placeholder-shown trick
      />

      {/* Floating Label */}
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider
          ${icon ? 'left-11' : 'left-4'}
          ${isFocused || hasValue 
            ? '-top-2.5 text-[9px] bg-white px-1 text-black' 
            : 'top-3.5 text-xs text-gray-400'
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Validation Checkmark */}
      {hasValue && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 animate-in fade-in zoom-in duration-200">
           <FaCheck className="text-xs" />
        </div>
      )}
    </div>
  );
};

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
    authReady,
    products,
    promoApplied, 
    discount
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
   if (!authReady) {
    return <div>Loading...</div>;
  }

 useEffect(() => {
    // Check if auth is finished checking and there is NO token
    if (authReady && !token) {
      
      // 1. Show a message so they know what's happening
      toast.info("You are not logged in. Redirecting to login...");

      // 2. Set a timer (e.g., 3000ms = 3 seconds)
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      // 3. Cleanup the timer if the user leaves the page manually
      return () => clearTimeout(timer);
    }
  }, [authReady, token, navigate]);
  const onchangehandler = (e) => {
    const { name, value } = e.target
    setformdata(prev => ({ ...prev, [name]: value }))
  }

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
      return null
    }
  }

  const initiatePhonePePayment = async (orderId, amount) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/payment/initiate`,
        { amount, orderId: orderId, mobileNumber: formdata?.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        window.location.href = response.data?.checkoutPageUrl
        // navigate("/ordersuccess")
      } else {
        window.location.href = response.data?.checkoutPageUrl
        throw new Error('Payment initiation failed')
      }
    } catch (error) {
      console.error(error)
      toast.error("Payment failed")
      setIsProcessing(false)
    }
  }

 const onsubmithandler = async (e) => {
  e.preventDefault()
  if (isProcessing) return

  setIsProcessing(true)

  try {
    // Build order items
    let orderItems = []
    for (const productId in cartitems) {
      const product = products.find(p => p._id === productId)
      if (!product) continue

      for (const size in cartitems[productId]) {
        const quantity = cartitems[productId][size]
        if (quantity > 0) {
          orderItems.push({
            ...structuredClone(product),
            size,
            quantity
          })
        }
      }
    }

    const orderdata = {
      address: formdata,
      items: orderItems,
      amount: finalTotal,
      paymentmethod: method
    }

    const response = await axios.post(
      `${backendurl}/api/order/place`,
      orderdata,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!response.data.success) {
      toast.error(response.data.message)
      setIsProcessing(false)
      return
    }

    if (method === 'cod') {
      setcartitems({})
      toast.success("Order placed successfully!")
      navigate('/order')
      setIsProcessing(false)
      return
    }

    // Online payment
    const { orderId , finalAmount } = response.data
    await initiatePhonePePayment(orderId, finalAmount)

  } catch (error) {
    console.error(error)
    toast.error("Error placing order")
    setIsProcessing(false)
  }
}


  const isFormValid = () => {
    return (
      formdata.firstname && formdata.lastname && formdata.email &&
      formdata.street && formdata.city && formdata.state &&
      formdata.zipcode && formdata.country && formdata.phone
    )
  }
  // --- EXACT LOGIC FROM CARTTOTAL ---
  const subTotal = getcartamount();
  const shipping = subTotal === 0 ? 0 : subTotal > 599 ? 0 : delivery_charge;
  const discountedAmount = promoApplied ? discount : 0;
  
  // This is the number that matches your screenshot
  const finalTotal = Math.max(0, subTotal + shipping - discountedAmount);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black pt-10 pb-20 px-4 md:px-8">
        
        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                Secure Checkout
            </h1>
            <div className="w-24 h-1 bg-black mx-auto"></div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Finish your order in 3 steps
            </p>
        </div>

        <form onSubmit={onsubmithandler} className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* LEFT COLUMN: FORMS */}
            <div className="flex-1 space-y-12">
              
              {/* 1. SHIPPING DETAILS */}
              <div>
                 <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100">
                    <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm font-bold">01</span>
                    <h2 className="text-xl font-black uppercase tracking-wide">Shipping Details</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InteractiveInput 
                        label="First Name" 
                        name="firstname" 
                        value={formdata.firstname} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="given-name" 
                    />
                    <InteractiveInput 
                        label="Last Name" 
                        name="lastname" 
                        value={formdata.lastname} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="family-name" 
                    />
                    
                    <div className="md:col-span-2">
                        <InteractiveInput 
                            label="Email Address" 
                            name="email" 
                            type="email"
                            value={formdata.email} 
                            onChange={onchangehandler} 
                            required 
                            autoComplete="email" 
                        />
                    </div>

                    <div className="md:col-span-2">
                        <InteractiveInput 
                            label="Street Address" 
                            name="street" 
                            value={formdata.street} 
                            onChange={onchangehandler} 
                            required 
                            autoComplete="street-address" 
                        />
                    </div>

                    <InteractiveInput 
                        label="City" 
                        name="city" 
                        value={formdata.city} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="address-level2" 
                    />
                    
                    <InteractiveInput 
                        label="State / Province" 
                        name="state" 
                        value={formdata.state} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="address-level1" 
                    />

                    <InteractiveInput 
                        label="Zip Code" 
                        name="zipcode" 
                        value={formdata.zipcode} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="postal-code" 
                    />
                    
                    <InteractiveInput 
                        label="Country" 
                        name="country" 
                        value={formdata.country} 
                        onChange={onchangehandler} 
                        required 
                        autoComplete="country" 
                    />

                    <div className="md:col-span-2">
                        <InteractiveInput 
                            label="Phone Number" 
                            name="phone" 
                            type="tel"
                            value={formdata.phone} 
                            onChange={onchangehandler} 
                            required 
                            autoComplete="tel" 
                        />
                    </div>
                 </div>
              </div>

              {/* 2. PAYMENT METHOD */}
              <div>
                 <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100">
                    <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm font-bold">02</span>
                    <h2 className="text-xl font-black uppercase tracking-wide">Payment Method</h2>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PhonePe / Online */}
                    <div 
                        onClick={() => setMethod('phonepay')}
                        className={`group cursor-pointer border-2 p-6 transition-all duration-300 relative overflow-hidden ${method === 'phonepay' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <FaCreditCard className={`text-xl ${method === 'phonepay' ? 'text-white' : 'text-black'}`} />
                            <div>
                                <h3 className="font-bold uppercase text-sm tracking-wide">Pay Online</h3>
                                <p className={`text-[10px] font-medium uppercase mt-0.5 ${method === 'phonepay' ? 'text-gray-400' : 'text-gray-500'}`}>UPI / Card /Net Banking</p>
                            </div>
                        </div>
                        {method === 'phonepay' && (
                             <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-green-400">
                                 Selected
                             </div>
                        )}
                    </div>

                    {/* COD */}
                    <div 
                        onClick={() => setMethod('cod')}
                        className={`group cursor-pointer border-2 p-6 transition-all duration-300 relative overflow-hidden ${method === 'cod' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <FaMoneyBillWave className={`text-xl ${method === 'cod' ? 'text-white' : 'text-black'}`} />
                            <div>
                                <h3 className="font-bold uppercase text-sm tracking-wide">Cash on Delivery</h3>
                                <p className={`text-[10px] font-medium uppercase mt-0.5 ${method === 'cod' ? 'text-gray-400' : 'text-gray-500'}`}>Pay at doorstep</p>
                            </div>
                        </div>
                        {method === 'cod' && (
                             <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-green-400">
                                 Selected
                             </div>
                        )}
                    </div>
                 </div>
              </div>

            </div>

            {/* RIGHT COLUMN: RECEIPT */}
            <div className="w-full lg:w-[400px]">
                <div className="bg-gray-50 border-2 border-black p-8 lg:sticky lg:top-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center justify-between">
                        <span>Total Due</span>
                        <span className="text-sm font-medium bg-black text-white px-2 py-1">INR</span>
                    </h2>

                    {/* Summary Component */}
                    <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
                        <Carttotal />
                    </div>

                    <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-xs font-bold uppercase text-gray-500 block">Final Amount</span>
                            <span className="text-xs font-bold uppercase text-gray-500 block">Inc. Taxes</span>
                        </div>
                        <span className="text-3xl font-black">₹{finalTotal.toFixed(2)}</span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={!isFormValid() || isProcessing}
                        className={`w-full py-5 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-between px-6 transition-all duration-300 group relative overflow-hidden
                        ${!isFormValid() || isProcessing 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-gray-900'
                        }`}
                    >
                        <span className="relative z-10">{isProcessing ? 'Processing...' : 'Pay Now'}</span>
                        {!isProcessing && <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />}
                    </button>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <FaLock className="text-[10px]" />
                            <span className="text-[9px] uppercase font-bold tracking-wide">256-bit SSL Secure</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                             <FaShieldAlt className="text-[10px]" />
                            <span className="text-[9px] uppercase font-bold tracking-wide">Fraud Protection</span>
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </form>
      </div>
    </PageTransition>
  )
}

export default Placeorder   