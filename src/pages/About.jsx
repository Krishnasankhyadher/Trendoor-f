import React from 'react';
import Title from '../components/Title';
import Newsletterbox from '../components/Newsletterbox';
import PageTransition from '../components/Pagetransition';

const About = () => {
  return (
    <PageTransition>
      <div className="bg-white">
        
        {/* --- Hero Section --- */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
              
              {/* Image Section - Fashion Portrait Style */}
              <div className="w-full lg:w-5/12 lg:sticky lg:top-24 self-start">

                <div className="relative group overflow-hidden rounded-sm bg-gray-100 aspect-[4/5]">
                    {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src='/Trendoor/images/ChatGPT Image Jul 6, 2025, 12_02_14 PM.png'
                    alt="About Trendoor"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center py-4">
                
                {/* Header */}
                <div className="mb-10">
                  <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                    Est. 2025
                  </span>
                  <h1 className="text-4xl md:text-6xl font-serif text-[#333] leading-tight">
                    We are <br />
                    <span className="italic font-light text-gray-500">Trendoor.</span>
                  </h1>
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed font-light">
                  <p>
                    <strong className="text-black font-medium">Trendoor</strong> was born out of a passion for sustainability and a vision to redefine how India shops for fashion. Our journey began with a simple yet powerful idea: to make trendy, high-quality fashion accessible and affordable through the power of curated collections.
                  </p>

                  <p>
                    Since our inception, we've been committed to offering a handpicked selection of fashion that meets the style needs of modern shoppers. From everyday wear to unique statement pieces, every item on Trendoor carries a story — sourced responsibly and delivered with care. 
                  </p>

                  <div className="pl-6 border-l-2 border-black/80 my-8 py-2">
                    <p className="text-xl md:text-2xl font-serif italic text-gray-800">
                      "Our mission is to empower people to look good, feel confident, and express themselves without limits."
                    </p>
                  </div>

                  <p>
                    We partner with trusted suppliers to ensure that our customers get the best of global fashion while supporting a more conscious future.
                  </p>
                </div>

                {/* Signature / Decorative Element */}
                <div className="mt-10 pt-10 border-t border-gray-100 flex items-center gap-4">
                    <div className="h-px w-16 bg-black"></div>
                    <p className="text-sm font-medium tracking-wide">THE FOUNDERS</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Why Choose Us Section --- */}
        <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 text-2xl">
                    <Title text1={'WHY'} text2={'CHOOSE US'} />
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
                        Experience the difference of a platform built around quality, speed, and customer satisfaction.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Card 1 */}
                    <div className="group bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                            <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-3 tracking-wide text-gray-900">Quality Assurance</h3>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600">
                            We handpick every item to ensure it meets our high standards. From fabric to fit, each product is inspected for durability and comfort.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                            <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-3 tracking-wide text-gray-900">Seamless Convenience</h3>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600">
                            Shopping with Trendoor is quick and effortless. Our intuitive platform and smooth navigation make your experience seamless.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white p-10 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                             <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-3 tracking-wide text-gray-900">Exceptional Support</h3>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600">
                            Our team is always ready to assist — whether it's sizing, orders, or feedback. We value every customer and are here to serve.
                        </p>
                    </div>

                </div>
            </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
                    <div className="text-center px-4">
                        <p className="text-3xl md:text-4xl font-bold text-black mb-1">200+</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Curated Products</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-3xl md:text-4xl font-bold text-black mb-1">500+</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Happy Customers</p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-3xl md:text-4xl font-bold text-black mb-1">100%</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Satisfaction</p>
                    </div>
                     <div className="text-center px-4">
                        <p className="text-3xl md:text-4xl font-bold text-black mb-1">24/7</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Human Support</p>
                    </div>
                 </div>
            </div>
        </div>

        {/* --- Newsletter --- */}
        <div className="py-16">
             <Newsletterbox />
        </div>
        
      </div>
    </PageTransition>
  );
};

export default About;