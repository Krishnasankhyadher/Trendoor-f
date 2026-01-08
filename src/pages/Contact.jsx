import React from 'react'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox'
import PageTransition from '../components/Pagetransition'
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebook, FaTwitter, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen">
        
        {/* --- Header Section --- */}
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <Title text1={'CONTACT'} text2={'US'} />
                <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base">
                    We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
                </p>
            </div>
        </div>

        {/* --- Main Content Section --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Top Row: Store & Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                
                {/* Left: Image (Visual Anchor) */}
                <div className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden shadow-sm">
                     <img 
                        src="/Trendoor/images/ChatGPT Image Jul 6, 2025, 01_17_32 PM.png" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        alt="Trendoor Office" 
                    />
                     <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-6 border-t border-gray-100">
                        <p className="font-serif text-xl text-gray-900">Trendoor HQ</p>
                        <p className="text-sm text-gray-500">The heart of our operations</p>
                     </div>
                </div>

                {/* Right: Primary Info & Careers */}
                <div className="flex flex-col justify-center space-y-8">
                    
                    {/* Store Address Card */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                        <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-3">
                            <span className="p-2 bg-gray-100 rounded-full"><FaMapMarkerAlt size={16} /></span>
                            Bussiness Address
                        </h3>
                        <div className="space-y-4 text-gray-600">
                            <p className="leading-relaxed">
                                <span className="font-semibold text-gray-900 block mb-1">Address</span>
                                BHURAPEER Street No.3 <br /> Hathras, Uttar Pradesh, India
                            </p>
                        </div>
                    </div>

                    {/* Careers Card */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                        <h3 className="text-xl font-medium text-gray-900 mb-4">Careers at Trendoor</h3>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            Passionate about fashion and technology? We are always looking for creative talent to join our remote-first team.
                        </p>
                        <button className="text-sm font-semibold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors pb-0.5">
                            View Open Positions &rarr;
                        </button>
                    </div>

                </div>
            </div>

            {/* Middle Row: Support Channels (The "Functional" part) */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Support Channels</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Phone Support */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                            <FaPhoneAlt size={14} />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                        <p className="text-sm text-gray-500 mb-3">(+91) 94125-89173</p>
                        <p className="text-xs text-gray-400">Mon-Sat: 10AM - 7PM</p>
                    </div>

                    {/* Email Support */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                            <FaEnvelope size={14} />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
                        <p className="text-sm text-gray-500 mb-3">Trendoorcontact@gmail.com</p>
                        <p className="text-xs text-gray-400">Response within 2-4 hours</p>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                            <FaInstagram size={16} />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                        <div className="flex gap-4 mt-3">
                            <a href="https://www.instagram.com/trendoor.in/" className="text-gray-400 hover:text-black transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-black transition-colors"><FaFacebook size={20} /></a>
      
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* --- Newsletter Section (Full Width) --- */}
        <div className="bg-white py-16 border-t border-gray-200">
            <Newsletterbox />
        </div>

      </div>
    </PageTransition>
  )
}

export default Contact