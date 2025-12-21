// Create a new file: PaymentCallback.js
import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendurl, token, setcartitems } = useContext(Shopcontext);
  
  // PhonePe returns these parameters
  const merchantOrderId = searchParams.get("merchantOrderId");
  const code = searchParams.get("code");
  const status = searchParams.get("status");

  useEffect(() => {
    const handlePaymentCallback = async () => {
      if (!token || !merchantOrderId) {
        navigate('/orderfailed');
        return;
      }

      // Check if payment was cancelled/failed
      if (code === "PAYMENT_CANCELLED" || code === "PAYMENT_ERROR" || 
          status === "FAILED" || status === "CANCELLED") {
        // Delete the pending order
        try {
          await axios.post(
            backendurl + '/api/order/cancel',
            { orderId: merchantOrderId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Failed to cancel order:", error);
        }
        
        toast.error("Payment was cancelled or failed");
        navigate('/orderfailed');
        return;
      }

      // If payment appears successful, verify it
      try {
        const response = await axios.post(
          backendurl + '/api/order/verify',
          { merchantOrderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setcartitems({});
          toast.success("Order Placed Successfully!");
          navigate('/ordersuccess'); // Redirect to success page
        } else {
          toast.error(response.data.message || "Payment verification failed");
          navigate('/orderfailed');
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment verification error");
        navigate('/orderfailed');
      }
    };

    handlePaymentCallback();
  }, [token, merchantOrderId]);

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-medium text-gray-800'>Processing Payment...</h2>
      <p className='text-gray-600 mt-2'>Please wait while we confirm your payment.</p>
    </div>
  );
};

export default PaymentCallback;