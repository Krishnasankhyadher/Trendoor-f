import React from 'react';

const Exchange = () => {
  return (
    <div className="flex justify-center px-4 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Exchange & Return Policy
        </h1>

        <p className="text-gray-700 mb-4">
          At <strong>Trendoor</strong>, we stand by the quality and uniqueness of every item we deliver.
          As a conscious fashion brand dealing with limited stock and curated pieces, we maintain a
          <strong className="text-red-600"> strict no return and refund policy</strong>. Once a product is sold, it cannot be returned under any circumstances.
        </p>

        <p className="text-gray-700 mb-4">
          We encourage our customers to shop mindfully and review size charts and product descriptions carefully before placing an order.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Exchange Policy (Conditional):</h2>
        <p className="text-gray-700 mb-4">
          Exchanges are offered <strong>only</strong> in the following valid scenarios:
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 mb-4 space-y-1">
          <li>Defective or damaged product received.</li>
          <li>Size issue (based on size chart mismatch).</li>
          <li>Product received is completely different from the product image.</li>
          <li>Major mismatch in color, pattern, or style compared to photos shown on our website.</li>
        </ul>

        <p className="text-gray-700 mt-4">
          All exchange requests must be raised within <strong>72 hours of delivery</strong>, along with unboxing video and clear photos as proof.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-2">How to Request an Exchange:</h2>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mb-4">
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

export default Exchange;
