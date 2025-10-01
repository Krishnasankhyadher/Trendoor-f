import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PaymentCallbackHandler = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const transactionId = searchParams.get('transactionId')
  const status = searchParams.get('status')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(`/api/payment/status/${transactionId}`)
        
        if (response.data.success) {
          if (response.data.paymentStatus === 'SUCCESS') {
            navigate('/ordersuccess', { 
              state: { 
                orderId: response.data.orderId 
              } 
            })
          } else {
            navigate('/orderfailed', { 
              state: { 
                error: response.data.message || 'Payment failed' 
              } 
            })
          }
        } else {
          throw new Error(response.data.message || 'Payment verification failed')
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        navigate('/orderfailed', { 
          state: { 
            error: error.response?.data?.message || error.message || 'Payment processing error' 
          } 
        })
      }
    }

    if (transactionId) {
      verifyPayment()
    } else {
      navigate('/orderfailed', { state: { error: 'Invalid payment response' } })
    }
  }, [transactionId, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg">Processing your payment...</p>
      </div>
    </div>
  )
}

export default PaymentCallbackHandler