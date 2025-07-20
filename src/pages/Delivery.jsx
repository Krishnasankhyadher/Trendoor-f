import React from 'react'

const Delivery = () => {
  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-3xl font-semibold mb-6">Delivery Policy</h2>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          We aim to deliver your favorite styles to your doorstep as quickly and safely as possible.
          Our reliable delivery partners ensure timely and secure shipments across India.
        </p>

        <h3 className="text-xl font-medium">Delivery Time</h3>
        <p>
          Orders are typically processed within <strong>1–2 business days</strong> and delivered within
          <strong> 5–7 working days</strong>, depending on your location.
        </p>

        <h3 className="text-xl font-medium">Shipping Charges</h3>
        <p>
          Standard shipping is <strong>free</strong> on all prepaid orders. For COD orders, a small
          additional fee may apply, which will be shown at checkout.
        </p>

        <h3 className="text-xl font-medium">Tracking Your Order</h3>
        <p>
          Once shipped, you’ll receive a tracking link via email or SMS to follow your order's journey.
        </p>

        <h3 className="text-xl font-medium">Delivery Support</h3>
        <p>
          If you face any issues with your delivery, feel free to reach out to us at{' '}
          <a href="mailto:Trendoorcontact@gmail.com" className="text-blue-600 underline">
            trendoorcontact@gmail.com
          </a>
          . We’re here to help!
        </p>
      </div>
    </div>
  )
}

export default Delivery
