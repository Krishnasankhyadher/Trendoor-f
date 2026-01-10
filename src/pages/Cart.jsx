import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import PageTransition from '../components/Pagetransition'
import { FaArrowRight, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify' // Assuming you have this installed

const Cart = () => {
  const { products, cartitems, currency, updatequantity, navigate, getcartamount } = useContext(Shopcontext)
  const [cartdata, setcartdata] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  
  // Coupon States
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [isCouponApplied, setIsCouponApplied] = useState(false)

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

  useEffect(() => {
    const amount = getcartamount();
    setCartTotal(amount);
    
    // Recalculate discount if cart total changes (e.g. item removed)
    if (isCouponApplied) {
        setDiscountAmount(amount * 0.10); // Re-apply 10%
    }
  }, [getcartamount, cartitems, isCouponApplied])

  const increaseQuantity = (itemId, size, currentQty) => {
    updatequantity(itemId, size, currentQty + 1)
  }

  const decreaseQuantity = (itemId, size, currentQty) => {
    if (currentQty > 1) {
      updatequantity(itemId, size, currentQty - 1)
    }
  }

  // --- COUPON LOGIC ---
  const applyCoupon = () => {
    if (isCouponApplied) {
        toast.info("Coupon already applied!");
        return;
    }
    
    // Example Logic: Check for a specific code
    if (promoCode.toUpperCase() === 'Enter A Coupon Code') {
        const discount = cartTotal * 0.10; // 10% Discount
        setDiscountAmount(discount);
        setIsCouponApplied(true);
        toast.success("Coupon Applied Successfully!");
    } else {
        toast.error("Invalid Promo Code");
        setDiscountAmount(0);
        setIsCouponApplied(false);
    }
  }

  const removeCoupon = () => {
      setDiscountAmount(0);
      setIsCouponApplied(false);
      setPromoCode('');
      toast.info("Coupon Removed");
  }

  // Shipping & Total Calculation
  const freeShippingThreshold = 599;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 99;
  const finalTotal = cartTotal + shippingFee - discountAmount;

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
              <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* LEFT COLUMN: Products */}
              <div className="flex-1">
                
                {/* Shipping Progress */}
                <div className="mb-10">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                        <span>Shipping Goal</span>
                        <span>{progress === 100 ? "Free Shipping" : `${progress.toFixed(0)}%`}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 border border-gray-200">
                        <div 
                            className="h-full bg-black transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    {progress < 100 && (
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-2">
                            Add <span className="text-black font-bold">{currency}{freeShippingThreshold - cartTotal}</span> to qualify for free shipping.
                        </p>
                    )}
                </div>

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
                                <span className="inline-block mt-3 text-xs font-bold uppercase border border-gray-300 px-2 py-1 self-start">
                                    Size: {item.size}
                                </span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center w-full sm:w-auto">
                            <div className="flex border border-black">
                                <button 
                                    onClick={() => decreaseQuantity(item._id, item.size, item.quantity)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-10 flex items-center justify-center font-bold text-sm bg-gray-50 border-x border-black">
                                    {item.quantity}
                                </span>
                                <button 
                                    onClick={() => increaseQuantity(item._id, item.size, item.quantity)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right w-full sm:w-auto flex justify-between sm:block">
                            <span className="sm:hidden text-xs font-bold uppercase">Total</span>
                            <span className="font-bold text-lg">{currency}{item.product.price * item.quantity}</span>
                        </div>

                        {/* Remove */}
                        <div className="text-right w-full sm:w-auto flex justify-end">
                             <button 
                                onClick={() => updatequantity(item._id, item.size, 0)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                             >
                                <FaTimes />
                             </button>
                        </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                     <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-all">
                        ← Continue Shopping
                     </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Summary */}
              <div className="w-full lg:w-[400px]">
                <div className="bg-gray-50 border border-gray-200 p-6 lg:sticky lg:top-24">
                    <h2 className="text-xl font-black uppercase tracking-wide mb-6">Order Summary</h2>
                    
                    {/* Cost Breakdown */}
                    <div className="space-y-3 text-sm border-b border-gray-200 pb-6 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600 uppercase font-medium">Subtotal</span>
                            <span className="font-bold">{currency}{cartTotal}</span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600 uppercase font-medium">Shipping</span>
                            <span className="font-bold">
                                {cartTotal >= freeShippingThreshold ? 'Free' : `${currency}50`}
                            </span>
                        </div>

                        {/* Discount Row - Only shows if applied */}
                        {isCouponApplied && (
                            <div className="flex justify-between text-green-600">
                                <span className="uppercase font-bold">Discount (10%)</span>
                                <span className="font-bold">-{currency}{discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    {/* COUPON SECTION */}
                    <div className="mb-8">
                        <label className="text-xs font-bold uppercase tracking-widest mb-2 block text-gray-500">
                            Promo Code
                        </label>
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="TRY: TRENDOOR10"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                disabled={isCouponApplied}
                                className={`flex-1 bg-white border border-r-0 border-gray-300 px-4 py-3 text-sm font-medium outline-none focus:border-black transition-colors uppercase placeholder:text-gray-300 ${isCouponApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            {isCouponApplied ? (
                                <button 
                                    onClick={removeCoupon}
                                    className="bg-red-600 text-white px-4 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            ) : (
                                <button 
                                    onClick={applyCoupon}
                                    className="bg-black text-white px-6 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                                >
                                    Apply
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Final Total */}
                    <div className="flex justify-between items-end mb-8">
                        <span className="text-lg font-black uppercase">Total</span>
                        <span className="text-2xl font-black">{currency}{finalTotal.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button 
                        onClick={() => navigate('/Placeorder')}
                        className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black border-2 border-black transition-all duration-300 flex items-center justify-between px-6 group"
                    >
                        <span>Checkout</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                         <p className="text-[10px] uppercase tracking-wide">Secure Checkout Encrypted</p>
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