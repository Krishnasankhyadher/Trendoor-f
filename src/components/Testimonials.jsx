// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { Quote, Star, User, ArrowRight, Mail } from "lucide-react"; 
import api from "../utils/Api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/testimonials")
      .then((res) => {
        setTestimonials(res.data.testimonials || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  // Animation Logic: Only animate if we have enough items
  const shouldAnimate = testimonials.length >= 3; 

  return (
    <div className="bg-white">
      
      {/* --- SECTION 1: Testimonials Marquee --- */}
      <section className="py-24 border-t border-gray-100 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tight mb-4 font-serif text-black">
            Collaborator Stories
          </h2>
          <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600">
            Trusted by creators and partners worldwide.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full">
          {shouldAnimate && (
            <>
              <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </>
          )}

          <div 
              className={`flex gap-6 ${shouldAnimate ? 'marquee-track' : 'justify-center flex-wrap px-6'}`}
              style={{ width: shouldAnimate ? 'max-content' : '100%' }}
          >
            {/* Double the list for seamless loop */}
            {(shouldAnimate ? [...testimonials, ...testimonials] : testimonials).map((t, index) => (
              <div
                key={`${t._id}-${index}`}
                className="
                  w-[350px] flex-shrink-0 group relative bg-white border border-gray-200 p-8 
                  hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between
                  cursor-pointer
                "
              >
                <Quote className="absolute top-8 right-8 text-gray-100 w-10 h-10 group-hover:text-gray-200 transition-colors" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-black text-black" />
                     ))}
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed font-medium mb-6">
                    "{t.testimonial}"
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 pt-6 border-t border-gray-100">
                  <div className="h-10 w-10 bg-black text-white flex items-center justify-center font-bold text-sm rounded-full">
                     {getInitials(t.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 font-medium">VERIFIED PARTNER</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Call to Action (The "DM Us" part) --- */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                Want to join our network?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                We are always looking for passionate creators. If you think your audience would love our brand, let's talk.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Email / DM Button */}
                <a 
                    href="Trendoorcontact@gmail.com" // Replace with your link
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-none"
                >
                    <Mail className="w-4 h-4 mr-2" /> DM Us / Email
                </a>

                
            </div>
        </div>
      </section>

      {/* Animation CSS */}
      <style>{`
        .marquee-track {
          animation: scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function getInitials(name) {
    if (!name) return <User size={16} />;
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}