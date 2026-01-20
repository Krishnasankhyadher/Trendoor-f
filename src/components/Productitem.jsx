import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';
import LazyImage from './Lazyload';

const Productitem = ({ id, image, name, price }) => {
  const { currency, addtocart, products } = useContext(Shopcontext);
  const [btnState, setBtnState] = useState('default');

  // --- LOGIC: Calculate Prices & Discount ---
  const priceData = useMemo(() => {
    const currentPrice = Number(price);
    
    // 1. Random increase between 500 and 1000
    const randomBuffer = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    
    // 2. Calculate raw MRP
    let calculatedMrp = currentPrice + randomBuffer;
    
    // 3. Round MRP to nearest 10 (e.g. 1543 -> 1540) for a cleaner look
    calculatedMrp = Math.ceil(calculatedMrp / 10) * 10;

    // 4. Calculate Percentage
    const discount = Math.round(((calculatedMrp - currentPrice) / calculatedMrp) * 100);

    return { mrp: calculatedMrp, discount };
  }, [price]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (btnState !== 'default') return;

    setBtnState('loading');
    
    try {
      const productData = products.find(p => p._id === id);
      const sizeToAdd = productData?.sizes?.[0] || null;

      await addtocart(id, sizeToAdd);
      setBtnState('success');
      
      setTimeout(() => {
        setBtnState('default');
      }, 1200);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setBtnState('error');
      
      setTimeout(() => {
        setBtnState('default');
      }, 2000);
    }
  }, [btnState, id, products, addtocart]);

  const getButtonContent = () => {
    switch (btnState) {
      case 'loading':
        return (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Adding...
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Added
          </span>
        );
      case 'error': return 'Try Again';
      default: return 'Add to Bag';
    }
  };

  return (
    <article className="group" aria-label={`Product: ${name}`}>
      
      {/* Card Wrapper */}
      <div className="bg-white rounded-md overflow-hidden transition-all duration-300 
                      hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                      focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">

        {/* Image - Kept original ratio */}
        <Link 
          to={`/product/${id}`} 
          className="block aspect-[3/4] overflow-hidden focus:outline-none"
        >
          <LazyImage
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Content - Increased Padding for "Larger" feel */}
        <div className="p-5"> {/* Changed from p-4 to p-5 */}

          {/* Product Name - Increased Text Size */}
          <Link 
            to={`/product/${id}`}
            className="focus:outline-none focus:underline"
          >
            <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2 
                           hover:underline transition-colors"> {/* Changed text-sm to text-base */}
              {name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {/* Current Price (Larger) */}
            <p className="text-lg font-bold text-black">
              {currency}{price}
            </p>

            {/* MRP (Crossed Out) */}
            <p className="text-sm text-gray-400 line-through">
              {currency}{priceData.mrp}
            </p>

            {/* Discount Percentage (Orange/Red Highlight) */}
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-sm">
              ({priceData.discount}% OFF)
            </span>
          </div>

          {/* Button - Slightly taller */}
          <button
            onClick={handleAddToCart}
            disabled={btnState !== 'default'}
            className={`mt-5 w-full h-11 text-xs tracking-widest uppercase font-medium
                        transition-all duration-300 border rounded-sm
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                        disabled:cursor-not-allowed
              ${btnState === 'default' &&
                'border-black text-black hover:bg-black hover:text-white active:scale-95'}
              ${btnState === 'loading' &&
                'bg-black text-white border-black'}
              ${btnState === 'success' &&
                'bg-black text-white border-black'}
              ${btnState === 'error' &&
                'bg-red-600 text-white border-red-600 hover:bg-red-700'}
            `}
          >
            {getButtonContent()}
          </button>

        </div>
      </div>
    </article>
  );
};

export default Productitem;
