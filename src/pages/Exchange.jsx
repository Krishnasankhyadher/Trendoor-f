import React from 'react'

const Exchange = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center px-6 py-12 gap-12">
      {/* Left Side Image */}
      <div className="w-full lg:w-1/2">
        <img
          src="ChatGPT Image Jul 19, 2025, 12_06_31 PM.png" // Replace with your image path
          alt="Exchange Policy"
          className="rounded-2xl shadow-md w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Side Text */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Exchange & Return Policy</h1>

        <p className="text-gray-700 mb-4">
          At <strong>Trendoor</strong>, we stand by the quality and uniqueness of every item we deliver.
          As a conscious fashion brand dealing with limited stock and curated pieces, we maintain a
          <strong className="text-red-600"> strict no return policy</strong>. Once a product is sold, it cannot be returned under any circumstances.
        </p>

        <p className="text-gray-700 mb-4">
          We encourage our customers to shop mindfully and review size charts and product descriptions carefully before placing an order.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Exchange Policy (Conditional):</h2>
        <p className="text-gray-700 mb-4">
          Exchanges are offered **only** in the following valid scenarios:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Defective or damaged product received.</li>
          <li>Size issue (based on size chart mismatch).</li>
          <li>Product received is completely different from the product image.</li>
          <li>Major mismatch in color, pattern, or style compared to photos shown on our website.</li>
        </ul>

        <p className="text-gray-700 mt-4">
          All exchange requests must be raised within <strong>72 hours of delivery</strong>, along with unboxing video and clear photos as proof.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">How to Request an Exchange:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Email us at <a href="mailto:Trendoorcontact@gmail.com" className="text-blue-600 underline">Trendoorcontact@gmail.com</a> with order ID and issue details.</li>
          <li>Attach clear photos and/or unboxing video for verification.</li>
          <li>Once verified, our team will approve the exchange and arrange pickup if applicable.</li>
        </ul>

        <p className="text-gray-700 mt-6">
          Please note: <strong>Trendoor reserves the right to reject any exchange request</strong> if it does not meet the above conditions.
        </p>
      </div>
    </div>
  );
};
 
export default Exchange
