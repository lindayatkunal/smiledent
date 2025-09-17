"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img1 from "/public/Images/text_bg.jpg"

// Icon map for services - using image paths instead of icons
const iconMap = {
  "Dental Implants": "/Images/Treatment/dental-implant.png",
  "Crowns & Bridges": "/Images/Treatment/crown-bridges.png",
  "Tooth Extraction": "/Images/Treatment/tooth-extraction.png",
  "Pediatric Dentistry": "/Images/Treatment/pediatric-dentistry.png",
  "Braces & Aligners": "/Images/Treatment/braces-aligners.png",
  "Root Canal": "/Images/Treatment/root-canal.png",
  "Teeth Whitening": "/Images/Treatment/tooth-whitening.png",
  "Dental Veneers": "/Images/Treatment/dental-veeners.png",
  "Full Mouth Reconstruction": "/Images/Treatment/teeth-reconstriction.png",
};

const services = [
  {
    title: "Dental Implants",
    desc: "Restore your smile's strength and functionality with our expert dental implant treatment in Dombivli.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Crowns & Bridges",
    desc: "Experience top-quality crowns and bridges treatment in Dombivli for lasting, natural-looking results.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Tooth Extraction",
    desc: "Experience safe and comfortable tooth extraction treatment in Dombivli, performed by our skilled professionals.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Pediatric Dentistry",
    desc: "Ensure your child's oral health with gentle and specialized pediatric dentistry treatment in Dombivli.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Braces & Aligners",
    desc: "Straighten your smile effectively and comfortably with our braces and aligners treatment in Dombivli.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Root Canal",
    desc: "Relieve pain and save your natural tooth with our precise root canal treatment in Dombivli.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Teeth Whitening",
    desc: "Achieve a dazzling smile with our advanced teeth whitening treatment in Dombivli, tailored to your unique needs.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Dental Veneers",
    desc: "Transform your smile with our precision-crafted dental veneers in Dombivli. Achieve a flawless, natural look and regain your confidence.",
    color: "from-slate-700 to-slate-600",
  },
  {
    title: "Full Mouth Reconstruction",
    desc: "Experience a comprehensive revitalization of your smile through our full mouth reconstruction services in Dombivli. This treatment ensures a harmonious and functional oral environment.",
    color: "from-slate-700 to-slate-600",
  },
];

// Mobile Slider Component for Treatments - Updated for 3 treatments

const MobileTreatmentSlider = ({ services, activeService, setActiveService }) => {
  return (
    <div className="block sm:hidden w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={3}
        spaceBetween={8}
        centeredSlides={false}
        loop={true} // Changed from false to true for infinite loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        onSlideChange={(swiper) => {
          // Updated logic for infinite loop
          const realIndex = swiper.realIndex;
          setActiveService(realIndex);
        }}
        className="mobile-treatment-swiper"
        breakpoints={{
          320: {
            slidesPerView: 2.8,
            spaceBetween: 8
          },
          375: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          414: {
            slidesPerView: 3.2,
            spaceBetween: 12
          }
        }}
      >
        {services.map((service, index) => {
          const iconSrc = iconMap[service.title];
          const isActive = activeService === index;
          
          return (
            <SwiperSlide key={service.title}>
              <motion.div
                className="cursor-pointer group flex flex-col items-center"
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveService(index)}
              >
                {/* Mobile Treatment Card - same as before */}
                <div className={`relative w-18 h-18 rounded-2xl transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-xl shadow-amber-400/30'
                    : 'bg-gradient-to-br from-[#0a1730] to-[#061428] shadow-md'
                  } border-2 ${
                  isActive
                    ? 'border-amber-300'
                    : 'border-white/10'
                }`}>
                  
                  {/* Icon Container */}
                  <div className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden p-1.5">
                    {iconSrc && (
                      <motion.div
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-8 h-8"
                      >
                        <Image
                          src={iconSrc}
                          alt={service.title}
                          fill
                          className={`object-contain transition-all duration-500 ${
                            isActive
                              ? 'brightness-0 drop-shadow-sm'
                              : 'brightness-0 invert'
                          }`}
                          sizes="32px"
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Active pulse ring */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-2xl border border-amber-300/50"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>

                {/* Title Below Card */}
                <motion.div
                  className="mt-1.5 text-center max-w-18"
                  animate={{
                    color: isActive ? "#FBBF24" : "#94A3B8"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`font-semibold text-xs leading-tight block transition-all duration-300 ${
                    isActive
                      ? 'text-amber-400 scale-105'
                      : 'text-slate-400'
                  }`}>
                    {service.title}
                  </span>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};




// Enhanced Rounded Square Card Component with Images (Desktop)
const RoundedSquareCard = ({ service, index, isActive, onClick }) => {
  const iconSrc = iconMap[service.title];

  return (
    <motion.div
      className="cursor-pointer group flex flex-col items-center hidden sm:flex"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }
      }}
      whileHover={{
        y: -12,
        scale: 1.08,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      viewport={{ once: true }}
    >
      {/* Enhanced Rounded Square */}
      <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-3xl transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl shadow-amber-400/40'
          : 'bg-gradient-to-br from-[#0a1730] to-[#061428] shadow-lg hover:shadow-xl'
        } border-2 ${
        isActive
          ? 'border-amber-300'
          : 'border-white/10 group-hover:border-amber-400/40'
      }`}>

        {/* Icon Container */}
        <div className="w-full h-full rounded-[20px] flex items-center justify-center relative overflow-hidden p-2">

          {/* Background Pattern for Active */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[20px]" />
          )}

          {/* Image Icon */}
          {iconSrc && (
            <motion.div
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-14 h-14 md:w-16 md:h-16"
            >
              <Image
                src={iconSrc}
                alt={service.title}
                fill
                className={`object-contain transition-all duration-500 ${
                  isActive
                    ? 'brightness-0 drop-shadow-lg'
                    : 'brightness-0 invert group-hover:brightness-75 group-hover:invert-0'
                }`}
                sizes="64px"
                priority={index < 3}
              />
            </motion.div>
          )}

          {/* Active Glow Effect */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[20px]"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>

        {/* Pulse Ring for Active State */}
        {isActive && (
          <motion.div
            className="absolute -inset-2 rounded-3xl border-2 border-amber-300/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Title Below Card - Perfectly Aligned */}
      <motion.div
        className="mt-4 text-center max-w-24 md:max-w-28"
        animate={{
          color: isActive ? "#FBBF24" : "#94A3B8"
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={`font-bold text-xs md:text-sm leading-tight block transition-all duration-300 ${
          isActive
            ? 'text-amber-400 scale-105 drop-shadow-sm'
            : 'text-slate-400 group-hover:text-white group-hover:scale-102'
        }`}>
          {service.title}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Mobile Large Display Component - Increased Size
const MobileLargeDisplay = ({ service }) => {
  const iconSrc = iconMap[service.title];

  return (
    <motion.div
      className="relative block sm:hidden"
      key={service.title}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Mobile Circle - Increased from w-72 h-72 to w-80 h-80 */}
      <div className="relative w-80 h-80 mx-auto rounded-full bg-transparent p-2 shadow-xl border-2 border-amber-400">
        <div className="w-full h-full bg-[#061428]/70 rounded-full flex flex-col items-center justify-center p-8 backdrop-blur-sm border-2 border-white/10 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-full" />

          {/* Animated Image Icon - Increased size */}
          <motion.div
            className="mb-5 relative z-10"
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-18 h-18 bg-amber-400 rounded-full flex items-center justify-center shadow-md p-3">
              {iconSrc && (
                <div className="relative w-full h-full">
                  <Image
                    src={iconSrc}
                    alt={service.title}
                    fill
                    className="object-contain brightness-0"
                    sizes="72px"
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Title - Increased font size */}
          <motion.h3
            className="text-white text-xl font-bold mb-4 text-center leading-tight relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {service.title}
          </motion.h3>

          {/* Description - Increased max-width and font size */}
          <motion.p
            className="text-slate-300 text-center text-base leading-relaxed mb-5 max-w-64 relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {service.desc}
          </motion.p>
        </div>

        {/* Enhanced outer glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-amber-400/10 opacity-40 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};


// Enhanced Large Display Circle Component with Images (Desktop)
const LargeDisplayCircle = ({ service }) => {
  const iconSrc = iconMap[service.title];

  return (
    <motion.div
      className="relative hidden sm:block"
      key={service.title}
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
    >
      {/* Large Circle with enhanced styling */}
      <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-transparent p-3 shadow-2xl border-2 border-amber-400">
        <div className="w-full h-full bg-[#061428]/65 rounded-full flex flex-col items-center justify-center p-8 md:p-10 backdrop-blur-xs border-4 border-white/10 relative overflow-hidden">

          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-full" />

          {/* Animated Image Icon */}
          <motion.div
            className="mb-6 md:mb-8 relative z-10"
            animate={{
              rotate: 360,
              scale: [1, 1.08, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 bg-amber-400 rounded-full flex items-center justify-center shadow-lg p-4">
              {iconSrc && (
                <div className="relative w-full h-full">
                  <Image
                    src={iconSrc}
                    alt={service.title}
                    fill
                    className="object-contain brightness-0"
                    sizes="112px"
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center leading-tight relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-slate-300 text-center text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-80 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {service.desc}
          </motion.p>

          {/* Interactive Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >

          </motion.div>
        </div>

        {/* Enhanced outer glow effect */}
        <motion.div
          className="absolute -inset-6 rounded-full bg-amber-400/15 opacity-40 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

const Treatments = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section
      id="treatments"
      className="relative bg-transparent py-8 sm:py-16 md:py-20 overflow-hidden min-h-screen"
    >
      {/* Enhanced CSS for Mobile Slider */}
      <style jsx global>{`
        .mobile-treatment-swiper {
          padding-bottom: 30px;
        }
        
        .mobile-treatment-swiper .swiper-pagination {
          bottom: 0px !important;
          text-align: center;
        }
        
        .mobile-treatment-swiper .swiper-pagination-bullet {
          width: 6px !important;
          height: 6px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          margin: 0 3px !important;
          transition: all 0.3s ease !important;
        }
        
        .mobile-treatment-swiper .swiper-pagination-bullet-active {
          background: #FCD34D !important;
          transform: scale(1.3);
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 md:px-6">

        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 mt-4 bg-clip-text text-transparent almendra-regular almendra-bold"
            style={{
              backgroundImage: `url(${img1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >   
            Choose Your Perfect Treatment
          </h2>

          {/* Hide subheading on mobile */}
          <p className="hidden sm:block text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Select any treatment from our comprehensive collection to explore detailed information and book your personalized appointment
          </p>
        </motion.div>

        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-6">
          {/* Mobile Treatment Slider */}
          <MobileTreatmentSlider 
            services={services} 
            activeService={activeService} 
            setActiveService={setActiveService} 
          />

          {/* Mobile Large Display */}
          <MobileLargeDisplay service={services[activeService]} />

          
        </div>

        {/* Desktop Layout - Unchanged Grid + Large Display */}
        <div className="hidden sm:block">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-8xl mx-auto">

            {/* Left: Enhanced 3x3 Grid */}
            <div className="order-2 lg:order-1">
              <motion.h3
                className="text-3xl md:text-4xl font-black text-white mb-12 text-center lg:text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400"></span>
              </motion.h3>

              <div className="grid grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-lg mx-auto lg:max-w-none">
                {services.map((service, index) => (
                  <RoundedSquareCard
                    key={service.title}
                    service={service}
                    index={index}
                    isActive={activeService === index}
                    onClick={() => setActiveService(index)}
                  />
                ))}
              </div>

              {/* Enhanced Progress Indicator */}
              <motion.div
                className="mt-12 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-[#061428] font-bold text-sm">{activeService + 1}</span>
                  </div>
                  <p className="text-slate-300 font-semibold">
                    of {services.length} treatments selected
                  </p>
                </div>
                <div className="w-full bg-[#0a1730] rounded-full h-3 border border-white/10 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 h-3 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeService + 1) / services.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Enhanced Large Display Circle */}
            <div className="order-1 lg:order-2 flex justify-center">
              <LargeDisplayCircle service={services[activeService]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;
