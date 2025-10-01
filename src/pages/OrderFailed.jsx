import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { toast } from 'react-toastify'

const OrderFailed = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { cartitems } = useContext(Shopcontext)
  const error = location.state?.error || 'Payment failed'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {cartitems && Object.keys(cartitems).length > 0
              ? "Your items are still in the cart. Please try again."
              : "Please try again or contact support."}
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/checkout')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderFailed