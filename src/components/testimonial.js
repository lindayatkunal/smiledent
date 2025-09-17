"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiStar, FiQuote } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import img1 from "/public/Images/text_bg.jpg"

const SLIDE_INTERVAL = 6500;

const slideVariants = {
  enter: (dir) => ({ 
    x: dir > 0 ? 100 : -100, 
    opacity: 0, 
    scale: 0.95,
    rotateY: dir > 0 ? 15 : -15
  }),
  center: { 
    x: 0, 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: { type: "spring", stiffness: 100, damping: 25, duration: 0.8 } 
  },
  exit: (dir) => ({ 
    x: dir > 0 ? -100 : 100, 
    opacity: 0, 
    scale: 0.95, 
    rotateY: dir > 0 ? -15 : 15,
    transition: { duration: 0.4 } 
  }),
};

const testimonialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Testimonials({
  items = [
    {
      quote: "Dr. Tushar Mane and his team provided exceptional dental care. The dental implant procedure was smooth and painless. Highly professional service with amazing results that exceeded my expectations.",
      name: "Rajesh Kumar",
      role: "Software Engineer",
      avatar: "/Images/Testimonial/testi1.png",
      rating: 5,
      treatment: "Dental Implants"
    },
    {
      quote: "Amazing experience with root canal treatment. The clinic is modern, staff is friendly, and Dr. Mane explained every step clearly. No pain during or after treatment. Definitely recommend!",
      name: "Priya Sharma",
      role: "Marketing Manager",
      avatar: "/Images/Testimonial/testi6.png",
      rating: 5,
      treatment: "Root Canal"
    },
    {
      quote: "Professional, caring, and highly skilled. The teeth whitening results are fantastic. The clinic maintains high hygiene standards and the overall experience was exceptional.",
      name: "Aarav Patel",
      role: "Product Manager",
      avatar: "/Images/Testimonial/testi7.png",
      rating: 5,
      treatment: "Teeth Whitening"
    },
  ],
  autoPlay = true,
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef(null);
  const count = items.length;

  const go = useCallback(
    (next) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Enhanced autoplay with play/pause
  useEffect(() => {
    if (!isPlaying || SLIDE_INTERVAL <= 0) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [index, isPlaying, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, isPlaying]);

  const dots = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-4 sm:mb-6 justify-center sm:justify-start">
      {Array.from({ length: 5 }, (_, i) => (
        <FiStar
          key={i}
          className={`w-4 h-4 sm:w-6 sm:h-6 ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-600'}`}
        />
      ))}
    </div>
  );

  return (
    <section
      id="testimonial"
      className="relative bg-transparent py-8 sm:py-16 md:py-20 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Enhanced Header with Mobile Optimization */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-8 sm:mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={testimonialVariants}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 mt-2 sm:mt-4 bg-clip-text text-transparent almendra-regular almendra-bold px-2"
            style={{
              backgroundImage: `url(${img1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            What Our Patients Say About Us
          </h2>
          
          {/* Hide subheading on mobile */}
          <p className="hidden sm:block text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Real experiences from real patients who trusted us with their smiles
          </p>
        </motion.div>

        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-6">
          {/* Mobile Testimonial Card */}
          <div className="relative" style={{ perspective: '800px' }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Compact Mobile Testimonial Card */}
                <div className="bg-gradient-to-br from-[#0a1730]/80 to-[#061428]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl relative overflow-hidden">
                  
                  {/* Background Decorations - Smaller for mobile */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-2xl" />
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-amber-400/20 rounded-full blur-lg" />
                  
                  {/* Mobile Content - Vertical Layout */}
                  <div className="relative z-10 pt-8 text-center">
                    
                    {/* Author Info - Top */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative mb-3 rounded-full p-2 border border-amber-400/30">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                          <Image
                            src={items[index].avatar}
                            alt={items[index].name}
                            fill
                            className="object-cover p-2"
                            sizes="64px"
                            priority
                          />
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center border-2 border-[#061428]">
                          <span className="text-[#061428] text-xs font-bold">✓</span>
                        </div>
                      </div>
                      
                      <h4 className="text-white text-lg font-bold mb-1">
                        {items[index].name}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mb-2">
                        {items[index].role}
                      </p>
                      
                      {/* Treatment Badge */}
                      <div className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full mb-3">
                        <span className="text-amber-300 text-xs font-semibold">
                          {items[index].treatment}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <StarRating rating={items[index].rating} />

                    {/* Quote - Mobile Optimized */}
                    <blockquote className="text-slate-200 text-sm leading-relaxed font-medium">
                      "{items[index].quote}"
                    </blockquote>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Controls - Compact */}
          <div className="flex flex-col items-center gap-4">
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {dots.map((d) => {
                  const active = d === index;
                  return (
                    <motion.button
                      key={d}
                      onClick={() => go(d)}
                      className={`transition-all duration-300 rounded-full ${
                        active 
                          ? "w-8 h-2.5 bg-amber-400" 
                          : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to testimonial ${d + 1}`}
                      aria-current={active ? "true" : "false"}
                    />
                  );
                })}
              </div>
              
              <div className="text-slate-400 text-xs font-medium">
                {index + 1} / {count}
              </div>
            </div>

            {/* Mobile Playback Controls */}
            <div className="bg-gradient-to-br from-[#0a1730]/40 to-[#061428]/40 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold text-xs">Controls:</span>
                
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-amber-400 text-[#061428]' 
                      : 'bg-white/10 text-amber-400 hover:bg-amber-400/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPlaying ? "Pause testimonials" : "Play testimonials"}
                >
                  {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
                </motion.button>
                
                {/* Navigation Controls */}
                <div className="flex gap-1">
                  <motion.button
                    onClick={prev}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-amber-400 rounded-md hover:bg-amber-400/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Previous testimonial"
                  >
                    <FiChevronLeft size={14} />
                    <span className="text-xs font-semibold">Prev</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={next}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-amber-400 rounded-md hover:bg-amber-400/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Next testimonial"
                  >
                    <span className="text-xs font-semibold">Next</span>
                    <FiChevronRight size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden sm:block max-w-6xl mx-auto">
          {/* Testimonial Card - Centered and Wider */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-5xl" style={{ perspective: '1000px' }}>
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={index}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Main Testimonial Card - Reduced Height, Increased Width */}
                  <div className="bg-gradient-to-br from-[#0a1730]/80 to-[#061428]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                    
                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-3xl" />
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl" />

                    {/* Content Layout - Horizontal for reduced height */}
                    <div className="relative z-10 pt-16">
                      <div className="grid md:grid-cols-12 gap-8 items-center">
                        
                        {/* Left Side - Text Content */}
                        <div className="md:col-span-8">
                          {/* Star Rating */}
                          <StarRating rating={items[index].rating} />

                          {/* Quote */}
                          <blockquote className="text-slate-200 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                            "{items[index].quote}"
                          </blockquote>

                          {/* Treatment Badge */}
                          <div className="inline-block px-4 py-2 bg-amber-400/20 border border-amber-400/30 rounded-full">
                            <span className="text-amber-300 text-sm font-semibold">
                              Treatment: {items[index].treatment}
                            </span>
                          </div>
                        </div>

                        {/* Right Side - Author Info */}
                        <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
                          <div className="relative mb-4 rounded-full p-5 border border-amber-400/30 animate-pulse">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl">
                              <Image
                                src={items[index].avatar}
                                alt={items[index].name}
                                fill
                                className="object-cover p-4"
                                sizes="112px"
                                priority
                              />
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center border-3 border-[#061428]">
                              <span className="text-[#061428] text-sm font-bold">✓</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-white text-xl font-bold mb-1">
                              {items[index].name}
                            </h4>
                            <p className="text-slate-400 text-sm font-medium">
                              {items[index].role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls Below Testimonial Card */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {dots.map((d) => {
                  const active = d === index;
                  return (
                    <motion.button
                      key={d}
                      onClick={() => go(d)}
                      className={`transition-all duration-300 rounded-full ${
                        active 
                          ? "w-10 h-3 bg-amber-400" 
                          : "w-3 h-3 bg-white/30 hover:bg-white/60"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to testimonial ${d + 1}`}
                      aria-current={active ? "true" : "false"}
                    />
                  );
                })}
              </div>
              
              <div className="text-slate-400 text-sm font-medium">
                {index + 1} / {count}
              </div>
            </div>

            {/* Playback Controls - Now Below */}
            <motion.div
              className="bg-gradient-to-br from-[#0a1730]/40 to-[#061428]/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold text-sm">Controls:</span>
                
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-amber-400 text-[#061428]' 
                      : 'bg-white/10 text-amber-400 hover:bg-amber-400/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPlaying ? "Pause testimonials" : "Play testimonials"}
                >
                  {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                </motion.button>
                
                {/* Navigation Controls */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={prev}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white/10 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Previous testimonial"
                  >
                    <FiChevronLeft size={16} />
                    <span className="text-xs font-semibold">Prev</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={next}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white/10 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Next testimonial"
                  >
                    <span className="text-xs font-semibold">Next</span>
                    <FiChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
