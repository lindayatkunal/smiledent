"use client";

import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhone, FaTimes, FaChevronUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Your contact details
  const phoneNumber = "+918828817199"; // Replace with your actual phone number
  const whatsappNumber = "+918828817199"; // Replace with your WhatsApp number
  const whatsappMessage = "Hello! I would like to inquire about your dental services.";

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Contact buttons - Left side */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50">
        {/* Expanded buttons */}
        {isExpanded && (
          <div className="flex flex-col space-y-3 mb-3 animate-fadeInUp">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp size={24} />
              <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  Chat on WhatsApp
                </div>
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </button>

            {/* Phone Button */}
            <button
              onClick={handlePhoneClick}
              className="group relative bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
              aria-label="Call us"
            >
              <FaPhone className='rotate-90' size={20} />
              <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  Call Now
                </div>
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </button>
          </div>
        )}

        {/* Main toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="Contact options"
        >
          {isExpanded ? <FaTimes size={24} /> : (
            <div className="relative">
              <FaPhone className='rotate-90' size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </button>
      </div>

      {/* Scroll to top button - Right side */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
          <button
            onClick={scrollToTop}
            className="group relative bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl animate-fadeInUp"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={20} />
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                Scroll to top
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
