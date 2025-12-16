import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import PageTransition from '../components/Pagetransition'

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setcartitems } = useContext(Shopcontext)
  const orderId = location.state?.orderId

  useEffect(() => {
    // Clear cart on success
    setcartitems({})
    
    if (!orderId) {
      toast.error('Invalid order details')
      navigate('/')
    }
  }, [orderId, navigate, setcartitems])

  return (
    <PageTransition>

    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Placed Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your order ID: <span className="font-medium">{orderId}</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a confirmation email with your order details.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
              </PageTransition>
  )
}

export default OrderSuccess