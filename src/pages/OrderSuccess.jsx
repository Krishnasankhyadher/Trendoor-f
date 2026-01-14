import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import PageTransition from '../components/Pagetransition'; // Assuming you want the transition wrapper
import { FaCheck, FaArrowRight, FaBoxOpen, FaShoppingBag } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { setcartitems } = useContext(Shopcontext);
  
  // Clear cart when this page loads (payment already verified)
  useEffect(() => {
    setcartitems({});
  }, [setcartitems]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
        
        {/* Decorative Background Text (Subtle 'SUCCESS' watermark) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
             <h1 className="text-[20vw] font-black leading-none -ml-10 -mt-10">SUCCESS</h1>
        </div>

        <div className="max-w-lg w-full relative z-10">
          
          {/* Main Success Card */}
          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            
            {/* Animated Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-black rounded-full relative">
                <FaCheck className="text-4xl text-white animate-in zoom-in duration-500" />
                {/* Spinning dashed ring for effect */}
                <div className="absolute inset-0 border-2 border-dashed border-black rounded-full w-28 h-28 -left-2 -top-2 opacity-20 animate-[spin_10s_linear_infinite]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Order Confirmed
            </h2>
            
            <div className="w-12 h-1 bg-black mx-auto mb-6"></div>

            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
              Thank you for your purchase
            </p>

            {/* Info Box (Receipt Style) */}
            <div className="bg-gray-50 border border-dashed border-gray-300 p-6 mb-8 text-left">
                <div className="flex items-start gap-3 mb-2">
                    <FaBoxOpen className="text-lg mt-0.5 text-black" />
                    <div>
                        <p className="text-xs font-bold uppercase text-black mb-1">What happens next?</p>
                        <p className="text-xs font-medium text-gray-500 leading-relaxed">
                            We are getting your order ready to be shipped. We will notify you via email as soon as your package is on its way.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/order')} 
                className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-4 group border-2 border-black"
              >
                <span>View My Orders</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => navigate('/')} 
                className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-4 border-2 border-black group"
              >
                <FaShoppingBag className="text-gray-400 group-hover:text-black transition-colors" />
                <span>Continue Shopping</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrderSuccess;