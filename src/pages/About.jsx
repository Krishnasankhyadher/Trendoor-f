import React from 'react';
import Title from '../components/Title';
import Newsletterbox from '../components/Newsletterbox';

const About = () => {
  return (
    <div className="flex flex-col gap-10 px-4 sm:px-10 py-10 bg-white text-gray-800">
      
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src='/Trendoor/images/ChatGPT Image Jul 6, 2025, 12_02_14 PM.png'
            alt="About Trendoor"
            className="w-full h-100 rounded-md shadow-md object-cover"
            loading="lazy"
          />
        </div>

        {/* About Text */}
        <div className="w-full md:w-1/2 text-sm sm:text-base space-y-4">
          <h2 className="text-3xl font-semibold mb-4">
            About <span className="text-black-700">Trendoor</span>
          </h2>

          <p>
            <strong>Trendoor</strong> was born out of a passion for sustainability and a vision to redefine how India shops for fashion. Our journey began with a simple yet powerful idea: to make trendy, high-quality fashion accessible and affordable through the power of curated collections.
          </p>

          <p>
            Since our inception, we’ve been committed to offering a handpicked selection of fashion that meets the style needs of modern shoppers. From everyday wear to unique statement pieces, every item on Trendoor carries a story — sourced responsibly and delivered with care. We partner with trusted suppliers to ensure that our customers get the best of global fashion while supporting a more conscious future.
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              At Trendoor, our mission is to make fashion affordable, accessible, and expressive for everyone. We believe that great style shouldn’t come at a high cost — to you or the planet. By bringing carefully selected pieces to your doorstep, we aim to empower people to look good, feel confident, and express themselves without limits.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="space-y-4">
        <div className="text-2xl">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <ul className="list-disc pl-5 text-sm sm:text-base space-y-2">
          <li><strong>Quality Assurance:</strong> We handpick every item to ensure it meets our high standards. From fabric to fit, each product is inspected for durability, comfort, and design — so you receive nothing but the best.</li>
          <li><strong>Seamless Convenience:</strong> Shopping with Trendoor is quick and effortless. Our intuitive platform, smooth navigation, and secure checkout make your experience seamless.</li>
          <li><strong>Exceptional Customer Support:</strong> Our team is always ready to assist — whether it's sizing, orders, or feedback. We value every customer and are here to serve with care.</li>
        </ul>
      </div>
      <Newsletterbox/>
    </div>
  );
};

export default About;
