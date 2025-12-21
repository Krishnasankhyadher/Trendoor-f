import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import PageTransition from '../components/Pagetransition'
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck, FaArrowRight, FaTag } from 'react-icons/fa'

const Cart = () => {
  const { products, cartitems, currency, updatequantity, navigate, getcartamount } = useContext(Shopcontext)
  const [cartdata, setcartdata] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

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
    setCartTotal(getcartamount())
  }, [getcartamount])

  const increaseQuantity = (itemId, size, currentQty) => {
    updatequantity(itemId, size, currentQty + 1)
  }

  const decreaseQuantity = (itemId, size, currentQty) => {
    if (currentQty > 1) {
      updatequantity(itemId, size, currentQty - 1)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-black p-3 rounded-xl mr-4">
              <FaShoppingBag className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Your Shopping Cart</h1>
              <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center items-center mb-10">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white">
                <span className="font-bold">1</span>
              </div>
              <div className="ml-3 font-semibold text-black">Cart</div>
            </div>
            
            <div className="w-20 h-1 mx-4 bg-gray-300"></div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                <span className="font-bold">2</span>
              </div>
              <div className="ml-3 font-medium text-gray-600">Delivery</div>
            </div>
            
            <div className="w-20 h-1 mx-4 bg-gray-300"></div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                <span className="font-bold">3</span>
              </div>
              <div className="ml-3 font-medium text-gray-600">Payment</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {cartdata.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FaShoppingBag className="text-gray-400 text-6xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to your cart and they'll appear here</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-900 transition-all transform hover:-translate-y-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2">
                {/* Free Delivery Banner */}
                {cartTotal < 599 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaTruck className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Free Delivery Alert! 🚚</h3>
                        <p className="text-gray-600">
                          Add ₹{599 - cartTotal} more to get <strong className="text-blue-600">FREE delivery</strong>
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((cartTotal / 599) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cart Items Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Cart Items ({cartdata.length})</h2>
                    <span className="text-sm text-gray-500">Items ready for checkout</span>
                  </div>

                  <div className="space-y-4">
                    {cartdata.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                      >
                        {/* Product Image and Info */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={item.product.image[0]}
                              alt={item.product.name}
                              className="w-24 h-28 object-cover rounded-xl shadow-sm"
                              loading="lazy"
                            />
                            <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                              {item.quantity}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{item.product.name}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xl font-bold text-black">{currency}{item.product.price}</span>
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium">
                                Size: {item.size}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <FaTag className="text-gray-400" />
                              <span className="text-sm text-gray-500">In Stock • Ready to Ship</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls and Delete */}
                        <div className="flex items-center gap-6">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                            <button
                              onClick={() => decreaseQuantity(item._id, item.size, item.quantity)}
                              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l-xl transition-all"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus className={`${item.quantity <= 1 ? 'opacity-30' : ''}`} />
                            </button>
                            <span className="px-4 py-2 font-bold text-gray-800 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item._id, item.size, item.quantity)}
                              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r-xl transition-all"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => updatequantity(item._id, item.size, 0)}
                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Remove item"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping Button */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => navigate('/')}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      ← Continue Shopping
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  {/* Order Summary Card */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-black p-2 rounded-lg mr-3">
                        <FaShoppingBag className="text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                    </div>

                    <div className="mb-6">
                      <Carttotal />
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal ({cartdata.length} items)</span>
                        <span className="font-semibold">{currency}{cartTotal}</span>
                      </div>
                      
                      {cartTotal < 599 && (
                        <div className="flex justify-between items-center text-blue-600">
                          <span>Delivery Charges</span>
                          <span className="font-semibold">{currency}50</span>
                        </div>
                      )}
                      
                      {cartTotal >= 599 && (
                        <div className="flex justify-between items-center text-green-600">
                          <span className="flex items-center gap-2">
                            <FaTruck /> Free Delivery
                          </span>
                          <span className="font-semibold">{currency}0</span>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-800">Total Amount</span>
                          <span className="text-2xl font-bold text-black">
                            {currency}{cartTotal >= 599 ? cartTotal : cartTotal + 50}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => navigate('/Placeorder')}
                      className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      Proceed to Checkout
                      <FaArrowRight />
                    </button>

                    {/* Security Note */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold">✓</span>
                        </div>
                        <p>Secure checkout • Easy returns • 24/7 support</p>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 mb-3">We accept:</p>
                      <div className="flex gap-2">
                        {['PhonePe', 'UPI', 'Cards', 'COD'].map((method, idx) => (
                          <div key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                            {method}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Save Note */}
                  {cartTotal < 599 && (
                    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-400 p-2 rounded-lg mr-3">
                          <FaTruck className="text-white" />
                        </div>
                        <h3 className="font-bold">Save on Delivery!</h3>
                      </div>
                      <p className="text-sm text-blue-100">
                        Add <strong>₹{599 - cartTotal} more</strong> to qualify for free delivery
                      </p>
                    </div>
                  )}
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