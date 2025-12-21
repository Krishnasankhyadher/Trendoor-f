// OrderSuccess.js - Simplified version
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { setcartitems } = useContext(Shopcontext);
  
  // Clear cart when this page loads (payment already verified)
  React.useEffect(() => {
    setcartitems({});
  }, [setcartitems]);

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-medium text-gray-800'>Order Successful!</h2>
      <p className='text-gray-600 mt-2'>Thank you for your purchase.</p>
      <button onClick={()=>navigate('/order')} className='mt-8 bg-black text-white px-8 py-3 text-sm'>
        VIEW ORDERS
      </button>
    </div>
  );
};

export default OrderSuccess;