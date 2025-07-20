import React, { useContext, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Title from './Title';

const Carttotal = () => {
  const {
    currency,
    delivery_charge,
    getcartamount,
    promoCode,
    discount,
    promoApplied,
    applyPromoCode,
    removePromoCode,
    promoLoading
  } = useContext(Shopcontext);

  const [enteredCode, setEnteredCode] = useState('');

  const subTotal = getcartamount();
  const shipping = subTotal === 0 ? 0 : subTotal > 599 ? 0 : delivery_charge;
  const discountedAmount = promoApplied ? discount : 0;
  const finalTotal = Math.max(0, subTotal + shipping - discountedAmount);

  const handleApplyPromo = () => {
    if (!enteredCode.trim()) {
      return;
    }
    applyPromoCode(enteredCode);
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setEnteredCode('');
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-md">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTAL" />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <p>Sub Total</p>
          <p>{currency}{subTotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{shipping.toFixed(2)}</p>
        </div>

        {promoApplied && (
          <div className="flex justify-between text-green-700">
            <p>Promo Discount</p>
            <p>-{currency}{discount.toFixed(2)}</p>
          </div>
        )}

        <hr />

        <div className="flex justify-between font-semibold text-base">
          <p>Total</p>
          <p>{currency}{finalTotal.toFixed(2)}</p>
        </div>

        {/* Promo Code Section */}
        {!promoApplied ? (
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                disabled={promoLoading}
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoLoading || !enteredCode.trim()}
                className={`bg-black text-white text-sm px-4 py-1 rounded hover:bg-gray-800 ${
                  promoLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {promoLoading ? 'Applying...' : 'Apply'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Apply promo codes at checkout
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-green-600">
              ✅ Promo code <b>{promoCode}</b> applied! (-{currency}{discount.toFixed(2)})
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-xs text-red-600 underline hover:text-red-800"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carttotal;