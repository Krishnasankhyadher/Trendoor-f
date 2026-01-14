import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import PageTransition from '../components/Pagetransition'
import { FaTimesCircle, FaArrowRight, FaShoppingBag, FaRedoAlt } from 'react-icons/fa'

const OrderFailed = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { cartitems } = useContext(Shopcontext)
  const error = location.state?.error || 'Payment process was interrupted'

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
             <h1 className="text-[20vw] font-black text-black leading-none -ml-10 -mt-10">ERROR</h1>
        </div>

        <div className="max-w-lg w-full relative z-10">
          
          {/* Main Card */}
          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            
            {/* Animated Icon */}
            <div className="mb-8 inline-flex items-center justify-center relative">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                <FaTimesCircle className="text-6xl text-red-600 relative z-10" />
            </div>

            {/* Headers */}
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4">
              Order Failed
            </h2>
            
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>

            {/* Error Message */}
            <div className="bg-red-50 border border-red-100 p-4 mb-8">
                <p className="text-red-600 font-bold text-sm uppercase tracking-wide">
                    {error}
                </p>
            </div>

            {/* Cart Status Message */}
            <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
              {cartitems && Object.keys(cartitems).length > 0
                ? "Don't worry, we have saved your items in the cart. You can try the payment again or choose a different method."
                : "Something went wrong. Please contact our support team if the issue persists."}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/Placeorder')}
                className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-black"
              >
                <FaRedoAlt className="group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Payment Again</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-black group"
              >
                <FaShoppingBag className="group-hover:-translate-y-1 transition-transform" />
                <span>Continue Shopping</span>
              </button>
            </div>

            {/* Help Link */}
            <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Need help? <a href="/contact" className="text-black font-bold border-b border-black hover:text-red-600 hover:border-red-600 transition-colors">Contact Support</a>
                </p>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default OrderFailed