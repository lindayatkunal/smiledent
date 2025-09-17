"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { useRef, useState } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import img1 from "/public/Images/text_bg.jpg";

// Floating 3D Card Component
function FloatingCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          delay,
          duration: 1.2,
          type: "spring",
          stiffness: 80,
          damping: 20
        }
      }}
      whileHover={{
        y: -20,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.4 }
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="transform-gpu"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  );
}

// Mobile-optimized Swiper Component
function MobileSwiper({ slides, activeSlide, setActiveSlide }) {
  return (
    <div className="block sm:hidden w-full h-64 rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-white/10">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full mobile-swiper"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Dental clinic image ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                quality={85}
              />
              {/* Mobile slide overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              {/* Slide indicator */}
              <div className="absolute top-3 right-3 bg-amber-400/20 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs font-semibold">
                  {i + 1}/{slides.length}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const slides = [
  "/Images/about/1.jpg",
  "/Images/about/2.jpg",
  "/Images/about/3.jpg",
  "/Images/about/4.jpg",
 
  "/Images/about/9.jpg",
];

export default function AboutUs() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="aboutus"
      className="relative min-h-screen bg-transparent overflow-hidden"
    >
      {/* Enhanced CSS */}
      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
          z-index: 10;
        }
        
        .swiper-slide {
          background: transparent;
          border-radius: 24px;
          overflow: hidden;
        }
        
        /* Mobile-specific swiper styles */
        .mobile-swiper .swiper-slide {
          border-radius: 16px;
        }
        
        .mobile-swiper .swiper-pagination {
          bottom: 8px !important;
        }
        
        .mobile-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          margin: 0 3px !important;
        }
        
        .mobile-swiper .swiper-pagination-bullet-active {
          background: #FCD34D !important;
          transform: scale(1.2);
        }
        
        /* Desktop swiper styles */
        .swiper-button-next, .swiper-button-prev {
          color: #FCD34D !important;
          background: rgba(15, 23, 42, 0.9) !important;
          width: 50px !important;
          height: 50px !important;
          margin-top: -25px !important;
          border-radius: 50% !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease !important;
          z-index: 999 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border: 2px solid rgba(252, 211, 77, 0.3) !important;
        }

        .swiper-button-next:hover, .swiper-button-prev:hover {
          transform: scale(1.1) !important;
          background: rgba(252, 211, 77, 0.2) !important;
          box-shadow: 0 8px 25px rgba(252, 211, 77, 0.3) !important;
          border-color: rgba(252, 211, 77, 0.6) !important;
        }

        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
          color: #FCD34D !important;
        }
        
        .swiper-pagination {
          bottom: 0px !important;
        }
        
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #FCD34D !important;
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(252, 211, 77, 0.8);
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(252, 211, 77, 0.5);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">

        {/* Mobile Layout - Reordered: Heading → Images → Description */}
        <div className="block sm:hidden space-y-6">
          {/* Mobile Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-3xl font-black mb-4 bg-clip-text text-transparent almendra-regular almendra-bold"
              style={{
                backgroundImage: `url(${img1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              Transforming Smiles & Lives
            </h2>
          </motion.div>

          {/* Mobile Images - Increased Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Updated MobileSwiper with increased height */}
            <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-white/10">
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true
                }}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                className="w-full h-full mobile-swiper"
              >
                {slides.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`Dental clinic image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={i === 0}
                        quality={85}
                      />
                      {/* Mobile slide overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                      {/* Slide indicator */}
                      <div className="absolute top-3 right-3 bg-amber-400/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white text-xs font-semibold">
                          {i + 1}/{slides.length}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* Mobile Description - Full Content with View More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-300 text-sm leading-relaxed"
          >
            {(() => {
              const [showMore, setShowMore] = useState(false);
              const fullDescriptions = [
                "Welcome to Dr. Mane's Dental Clinic & Implant Centre, your premier dental clinic in Dombivli East for cutting-edge dental care. Founded by Dr. Tushar Mane, a distinguished dental surgeon and Implantologist with over 17 years of expertise, our clinic epitomizes excellence in dental care.",
                "Led by Dr. Mane, our expert team offers a comprehensive range of specialized services including full mouth rehabilitation, dental implants, root canal treatment, dental veneers, teeth braces, pediatric dentistry, wisdom teeth removal, and more. Whether you seek Cosmetic Smile Design or Clear Aligners tailored to your needs, we deliver exceptional care tailored to each individual.",
                "When searching for the best dental clinic in Dombivli East or the best dental clinic near me, Dr. Mane's Dental Clinic is your top choice. We are committed to your dental health and well-being, offering personalized care and unparalleled expertise. Discover the difference with us today."
              ];

              return (
                <>
                  {/* First paragraph always visible */}
                  <p>{fullDescriptions[0]}</p>

                  {/* Remaining paragraphs with View More functionality */}
                  {showMore && (
                    <>
                      <p>{fullDescriptions[1]}</p>
                      <p>{fullDescriptions[2]}</p>
                    </>
                  )}

                  {/* View More / View Less Button */}
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-sm underline transition-colors duration-300"
                  >
                    {showMore ? 'View Less' : 'View More'}
                  </button>

                  {/* Mobile CTA */}
                  <motion.button
                    className="w-full mt-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-bold rounded-xl text-base"
                    whileTap={{ scale: 0.98 }}
                  >
                     Book Your Consultation
                  </motion.button>
                </>
              );
            })()}
          </motion.div>
        </div>


        {/* Desktop Layout - Unchanged Grid Layout */}
        <div className="hidden sm:block">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

            {/* Left: Enhanced Text Content */}
            <motion.div
              className="space-y-8"
              style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
            >
              {/* Main Heading with Gradient Animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-4xl md:text-6xl font-black mb-4 mt-4 bg-clip-text text-transparent almendra-regular almendra-bold"
                  style={{
                    backgroundImage: `url(${img1.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  Transforming Smiles & Lives
                </h2>
              </motion.div>

              {/* Description with Stagger Animation */}
              <motion.div
                className="space-y-6 text-slate-300 text-lg leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {[
                  "Welcome to Dr. Mane's Dental Clinic & Implant Centre, your premier dental clinic in Dombivli East for cutting-edge dental care. Founded by Dr. Tushar Mane, a distinguished dental surgeon and Implantologist with over 17 years of expertise, our clinic epitomizes excellence in dental care.",

                  "Led by Dr. Mane, our expert team offers a comprehensive range of specialized services including full mouth rehabilitation, dental implants, root canal treatment, dental veneers, teeth braces, pediatric dentistry, wisdom teeth removal, and more. Whether you seek Cosmetic Smile Design or Clear Aligners tailored to your needs, we deliver exceptional care tailored to each individual.",

                  "When searching for the best dental clinic in Dombivli East or the best dental clinic near me, Dr. Mane's Dental Clinic is your top choice. We are committed to your dental health and well-being, offering personalized care and unparalleled expertise. Discover the difference with us today."
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{
                      x: 10,
                      color: "#FCD34D",
                      transition: { duration: 0.3 }
                    }}
                    className="cursor-pointer transition-colors"
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>

              {/* Interactive CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 pt-4"
              >
                <motion.button
                  className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-bold rounded-2xl relative overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(252, 211, 77, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-300 to-yellow-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                     Book Your Consultation
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: Enhanced Interactive Slider */}
            <FloatingCard delay={0.8}>
              <motion.div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-amber-400/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: isHovered ? 0.6 : 0.3,
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Main Slider Container */}
                <div className="relative h-[500px] lg:h-[600px] glass-effect rounded-3xl overflow-hidden border border-white/10">

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-transparent to-blue-500" />
                  </div>

                  {/* Swiper Slider */}
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    loop={true}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    }}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                    navigation={true}
                    coverflowEffect={{
                      rotate: 20,
                      stretch: 0,
                      depth: 200,
                      modifier: 1,
                      slideShadows: true
                    }}
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    className="w-full h-full"
                    breakpoints={{
                      768: {
                        slidesPerView: 1.2,
                        spaceBetween: 20
                      },
                      1024: {
                        slidesPerView: 1.5,
                        spaceBetween: 30
                      }
                    }}
                  >
                    {slides.map((src, i) => (
                      <SwiperSlide key={i} style={{ width: 'auto' }}>
                        <motion.div
                          className="relative w-full h-full rounded-2xl overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Image Container */}
                          <div className="relative w-full h-full bg-slate-700">
                            <Image
                              src={src}
                              alt={`Dental clinic image ${i + 1}`}
                              fill
                              className="object-cover transition-all duration-700"
                              style={{
                                filter: activeSlide === i
                                  ? 'brightness(1.1) contrast(1.1) saturate(1.1)'
                                  : 'brightness(0.9) contrast(0.9)'
                              }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                              priority={i === 0}
                              quality={90}
                            />
                          </div>

                          {/* Slide Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Slide Number */}
                          <motion.div
                            className="absolute top-4 right-4 w-8 h-8 glass-effect rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            animate={{
                              scale: activeSlide === i ? 1.2 : 1,
                              backgroundColor: activeSlide === i ? "rgba(252, 211, 77, 0.3)" : "rgba(255, 255, 255, 0.1)"
                            }}
                          >
                            {i + 1}
                          </motion.div>
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Slide Counter */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 glass-effect rounded-full px-4 py-2 border border-amber-300/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="text-amber-300 font-semibold text-sm">
                    {activeSlide + 1} / {slides.length}
                  </span>
                </motion.div>
              </motion.div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
