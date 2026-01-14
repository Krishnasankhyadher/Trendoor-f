import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Carttotal from '../components/Carttotal' // <--- IMPORTING THE WORKING COMPONENT
import PageTransition from '../components/Pagetransition'
import { FaArrowRight, FaTimes, FaTag, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify' 

// --- Interactive Input (For Promo Code) ---
const InteractiveInput = ({ label, name, value, onChange, type = "text", required = false, autoComplete, icon, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  
  return (
    <div className={`relative w-full group ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
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
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer w-full bg-white border-2 outline-none px-4 py-3.5 pt-5 text-sm font-medium text-black transition-all duration-300 placeholder-transparent
          ${icon ? 'pl-11' : 'pl-4'}
          ${isFocused ? 'border-black ring-1 ring-black/5' : 'border-gray-200 hover:border-gray-300'}
          ${hasValue ? 'border-gray-800' : ''}
        `}
        placeholder={label} 
      />
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider
          ${icon ? 'left-11' : 'left-4'}
          ${isFocused || hasValue 
            ? '-top-2.5 text-[9px] bg-white px-1 text-black' 
            : 'top-3.5 text-xs text-gray-400'
          }
        `}
      >
        {label}
      </label>
      {hasValue && !disabled && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 animate-in fade-in zoom-in duration-200">
           <FaCheck className="text-xs" />
        </div>
      )}
    </div>
  );
};

const Cart = () => {
  const { products, cartitems, currency, updatequantity, navigate, getcartamount, delivery_charge } = useContext(Shopcontext)
  const [cartdata, setcartdata] = useState([])
  
  // Coupon States
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [isCouponApplied, setIsCouponApplied] = useState(false)

  // 1. Load Cart Data
  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const itemId in cartitems) {
        for (const size in cartitems[itemId]) {
          if (cartitems[itemId][size] > 0) {
            const product = products.find(p => p._id === itemId)
            if (product) {
              tempData.push({
                _id: itemId,
                size: size,
                quantity: cartitems[itemId][size],
                product: product
              })
            }
          }
        }
      }
      setcartdata(tempData)
    }
  }, [cartitems, products])

  // 2. Handle Discount Recalculation
  useEffect(() => {
    const amount = getcartamount();
    if (isCouponApplied) {
        setDiscountAmount(amount * 0.10); // 10% logic
    } else {
        setDiscountAmount(0);
    }
  }, [getcartamount, cartitems, isCouponApplied])

  // 3. Helper Functions
  const increaseQuantity = (itemId, size, currentQty) => updatequantity(itemId, size, currentQty + 1)
  const decreaseQuantity = (itemId, size, currentQty) => {
    if (currentQty > 1) updatequantity(itemId, size, currentQty - 1)
  }

  const applyCoupon = () => {
    if (isCouponApplied) return;
    if (promoCode.toUpperCase() === 'TRENDOOR10') {
        setIsCouponApplied(true);
        toast.success("Coupon Applied Successfully!");
    } else {
        toast.error("Invalid Promo Code");
    }
  }

  const removeCoupon = () => {
      setIsCouponApplied(false);
      setPromoCode('');
      setDiscountAmount(0);
      toast.info("Coupon Removed");
  }

  const proceedToCheckout = () => {
      navigate('/Placeorder', { 
          state: { 
              discountAmount: discountAmount,
              isCouponApplied: isCouponApplied,
              promoCode: promoCode 
          } 
      });
  }

  // Calculate final total locally just for display below the component
  const subTotal = getcartamount();
  const shipping = subTotal === 0 ? 0 : subTotal > 599 ? 0 : delivery_charge;
  const totalAfterDiscount = Math.max(0, subTotal + shipping - discountAmount);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black pt-10 pb-20 px-4 md:px-8">
        
        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                Shopping Cart
            </h1>
            <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {cartdata.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-gray-200 bg-gray-50">
              <p className="text-lg font-bold uppercase tracking-widest text-gray-400 mb-8">Your cart is empty</p>
              <button onClick={() => navigate('/')} className="bg-black text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all duration-300">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              {/* LEFT COLUMN: Products List (Standard) */}
              <div className="flex-1">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 pb-3 border-b-2 border-black text-xs font-bold uppercase tracking-widest">
                    <span>Product</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Total</span>
                    <span></span>
                </div>

                {/* Cart Items */}
                <div className="flex flex-col">
                  {cartdata.map((item, index) => (
                    <div key={index} className="py-6 border-b border-gray-200 group flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr_auto] gap-6 sm:gap-4 items-center">
                        {/* Product Info */}
                        <div className="flex items-start gap-6 w-full">
                            <div className="w-24 aspect-[3/4] bg-gray-100 relative overflow-hidden border border-transparent group-hover:border-black transition-all duration-300">
                                <img src={item.product.image[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col pt-1">
                                <h3 className="text-lg font-bold uppercase tracking-tight">{item.product.name}</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{currency}{item.product.price}</p>
                                <span className="inline-block mt-3 text-xs font-bold uppercase border border-gray-300 px-2 py-1 self-start">Size: {item.size}</span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center w-full sm:w-auto">
                            <div className="flex border border-black">
                                <button onClick={() => decreaseQuantity(item._id, item.size, item.quantity)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors disabled:opacity-30" disabled={item.quantity <= 1}>-</button>
                                <span className="w-10 flex items-center justify-center font-bold text-sm bg-gray-50 border-x border-black">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item._id, item.size, item.quantity)} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors">+</button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right w-full sm:w-auto flex justify-between sm:block">
                            <span className="sm:hidden text-xs font-bold uppercase">Total</span>
                            <span className="font-bold text-lg">{currency}{item.product.price * item.quantity}</span>
                        </div>

                        {/* Remove */}
                        <div className="text-right w-full sm:w-auto flex justify-end">
                             <button onClick={() => updatequantity(item._id, item.size, 0)} className="text-gray-400 hover:text-red-600 transition-colors"><FaTimes /></button>
                        </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: SUMMARY using Carttotal Component */}
              <div className="w-full lg:w-[400px]">
                <div className="bg-gray-50 border-2 border-black p-8 lg:sticky lg:top-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    
                    <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center justify-between">
                        <span>Summary</span>
                        <span className="text-sm font-medium bg-black text-white px-2 py-1">INR</span>
                    </h2>

                    {/* --- USE THE COMPONENT HERE --- */}
                    {/* This ensures logic matches Placeorder exactly */}
                    <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
                        <Carttotal />
                    </div>

                    <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

                    

                    {/* DISCOUNT DISPLAY */}
                    {isCouponApplied && (
                        <div className="flex justify-between text-green-600 animate-in fade-in slide-in-from-top-1 mb-4 text-sm">
                            <span className="uppercase font-bold">Discount (10%)</span>
                            <span className="font-bold">-{currency}{discountAmount.toFixed(2)}</span>
                        </div>
                    )}

                    {/* FINAL TOTAL (Needed if discount exists) */}
                    {isCouponApplied && (
                        <div className="flex justify-between items-end mb-8 border-t border-gray-200 pt-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-gray-500 block">New Total</span>
                            </div>
                            <span className="text-3xl font-black">{currency}{totalAfterDiscount.toFixed(2)}</span>
                        </div>
                    )}

                    <button 
                        onClick={proceedToCheckout}
                        className="w-full py-5 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-between px-6 transition-all duration-300 group relative overflow-hidden bg-black text-white hover:bg-gray-900"
                    >
                        <span className="relative z-10">Checkout</span>
                        <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                         <p className="text-[10px] uppercase tracking-wide flex items-center gap-1">
                            <FaCheck className="text-[8px]" /> Secure Checkout
                         </p>
                    </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default Cart