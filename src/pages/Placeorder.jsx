import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import PageTransition from '../components/Pagetransition'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaPhone, FaCreditCard, FaMoneyBillWave, FaLock, FaTruck } from 'react-icons/fa'

const Placeorder = () => {
  const [method, setMethod] = useState('phonepay')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeSection, setActiveSection] = useState('delivery')

  const {
    backendurl,
    token,
    cartitems,
    setcartitems,
    getcartamount,
    delivery_charge,
    products
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
    } catch {
      return null
    }
  }

  const initiatePhonePePayment = async (orderId, amount) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/payment/initiate`,
        { amount, orderId: orderId, mobileNumber: formdata.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        // window.location.href = response.data.checkoutPageUrl
        // navigate("/ordersuccess")
      } else {
        navigate("/orderfailed")
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
      const decoded = decodeToken(token)
      const userid = decoded?.id

      if (!userid) {
        toast.error("User not authenticated")
        setIsProcessing(false)
        return
      }

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
        userid,
        address: formdata,
        items: orderItems,
        amount: getcartamount() + delivery_charge,
        paymentmethod: method
      }

      // 1️⃣ Create order
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

      // 2️⃣ COD → done
      if (method === 'cod') {
        setcartitems({})
        toast.success("Order placed successfully!")
        navigate('/order')
        setIsProcessing(false)
        return
      }

      // 3️⃣ Online → PhonePe
      const { orderId, finalAmount } = response.data
      await initiatePhonePePayment(orderId, finalAmount)

    } catch (error) {
      console.error(error)
      toast.error("Error placing order")
      setIsProcessing(false)
    }
  }

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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeSection === 'cart' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                <span className="font-semibold">1</span>
              </div>
              <div className="ml-2 font-medium">Cart</div>
            </div>

            <div className="w-16 h-1 mx-4 bg-gray-300"></div>

            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeSection === 'delivery' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                <span className="font-semibold">2</span>
              </div>
              <div className="ml-2 font-medium">Delivery</div>
            </div>

            <div className="w-16 h-1 mx-4 bg-gray-300"></div>

            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeSection === 'payment' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                <span className="font-semibold">3</span>
              </div>
              <div className="ml-2 font-medium">Payment</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Checkout</h1>
          <p className="text-gray-600 text-center mb-10">Complete your purchase securely</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Information Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-black p-2 rounded-lg mr-3">
                    <FaTruck className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Delivery Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      required
                      name="firstname"
                      value={formdata.firstname}
                      onChange={onchangehandler}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="First Name"
                      onFocus={() => setActiveSection('delivery')}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      required
                      name="lastname"
                      value={formdata.lastname}
                      onChange={onchangehandler}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Last Name"
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      required
                      name="email"
                      value={formdata.email}
                      onChange={onchangehandler}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaMapMarkerAlt />
                    </div>
                    <input
                      required
                      name="street"
                      value={formdata.street}
                      onChange={onchangehandler}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Street Address"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaCity />
                    </div>
                    <input
                      required
                      name="city"
                      value={formdata.city}
                      onChange={onchangehandler}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="City"
                    />
                  </div>

                  <div className="relative">
                    <input
                      required
                      name="state"
                      value={formdata.state}
                      onChange={onchangehandler}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="State"
                    />
                  </div>

                  <div className="relative">
                    <input
                      required
                      name="zipcode"
                      value={formdata.zipcode}
                      onChange={onchangehandler}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="ZIP Code"
                    />
                  </div>

                  <div className="relative">
                    <input
                      required
                      name="country"
                      value={formdata.country}
                      onChange={onchangehandler}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Country"
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FaPhone />
                    </div>
                    <input
                      required
                      name="phone"
                      value={formdata.phone}
                      onChange={onchangehandler}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-black p-2 rounded-lg mr-3">
                    <FaCreditCard className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => { setMethod('phonepay'); setActiveSection('payment'); }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${method === 'phonepay' ? 'border-black bg-gradient-to-r from-gray-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${method === 'phonepay' ? 'border-black bg-black' : 'border-gray-300'}`}>
                          {method === 'phonepay' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">PhonePe</h3>
                          <p className="text-sm text-gray-600">Pay securely with UPI, Cards & more</p>
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                        Recommended
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => { setMethod('cod'); setActiveSection('payment'); }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-black bg-gradient-to-r from-gray-50 to-white shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${method === 'cod' ? 'border-black bg-black' : 'border-gray-300'}`}>
                        {method === 'cod' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h3 className="font-semibold text-gray-800">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600">Pay when you receive your order</p>
                        </div>
                        <FaMoneyBillWave className="text-gray-400 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-black p-2 rounded-lg mr-3">
                      <FaLock className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                  </div>

                  <div className="mb-6">
                    <Carttotal />
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{getcartamount()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-semibold">₹{delivery_charge}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                        <span className="text-2xl font-bold text-black">₹{getcartamount() + delivery_charge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      onClick={onsubmithandler}
                      disabled={!isFormValid() || isProcessing}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${!isFormValid() || isProcessing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'}`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center text-white">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        `Pay ₹${getcartamount() + delivery_charge}`
                      )}
                    </button>

                    <div className="text-center text-sm text-gray-500">
                      <p>By completing your purchase, you agree to our</p>
                      <p>
                        <a href="/terms" className="text-black font-medium hover:underline">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-black font-medium hover:underline">Privacy Policy</a>
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-6 pt-4 border-t">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-gray-600 font-bold">✓</span>
                        </div>
                        <p className="text-xs text-gray-600">Secure Payment</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-gray-600 font-bold">🔄</span>
                        </div>
                        <p className="text-xs text-gray-600">Easy Returns</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-gray-600 font-bold">🚚</span>
                        </div>
                        <p className="text-xs text-gray-600">Fast Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-5">
                  <div className="flex items-center mb-3">
                    <FaLock className="text-green-400 mr-2" />
                    <h3 className="font-bold">100% Secure Checkout</h3>
                  </div>
                  <p className="text-sm text-gray-300">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Placeorder