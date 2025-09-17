"use client";

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Megrim, Delius_Swash_Caps, Oleo_Script, Playfair_Display } from "next/font/google";
// Import icons from react-icons
import { FaTooth, FaSmile, FaTrophy } from 'react-icons/fa';
import { GiArtificialIntelligence, GiTrophy } from 'react-icons/gi';
import { MdHealing } from 'react-icons/md';
import Image from 'next/image';
import img1 from "/public/Images/text_bg.jpg"
import img2 from "/public/Images/about/1.jpg"
import img3 from "/public/Images/Hero/clinic3.jpg"

const bruno = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});
const bruno2 = Delius_Swash_Caps({
  weight: "400",
  subsets: ["latin"],
});
const bruno3 = Oleo_Script({
  weight: "400",
  subsets: ["latin"],
});

const iconMap = {
  "Crown & Bridges": FaTooth,
  "Dental Implants": GiArtificialIntelligence,
  "Root Canal": MdHealing,
  "Smile Designing": FaSmile,
};

// Mobile Achievement Card - More Compact Design
const MobileAchievementCard = ({ number, text, delay, index }) => {
  const IconComponent = iconMap[text] || null;

  return (
    <motion.div
      className="block sm:hidden"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: delay
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* More compact horizontal card for mobile */}
      <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 flex items-center space-x-3">

        {/* Icon */}
        {IconComponent && (
          <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent className="text-amber-300" size={16} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-0.5">{number}</h3>
          <p className="text-slate-300 text-xs font-medium leading-tight">{text}</p>
        </div>

        {/* Accent line */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full flex-shrink-0" />
      </div>
    </motion.div>
  );
};

// Desktop Achievement Card (unchanged for md and lg)
const ModernAchievementCard = ({ number, text, delay, index }) => {
  const IconComponent = iconMap[text] || null;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group hidden sm:block"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 25,
          delay: delay
        }
      }}
      whileHover={{
        scale: 1.02,
        y: -10,
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern card with angled design */}
      <div className="relative bg-gradient-to-br from-slate-800/20 to-slate-700/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden group-hover:border-amber-300/30 transition-all duration-500">

        {/* Diagonal accent line */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
          animate={{
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon in corner */}
        {IconComponent && (
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 bg-amber-400/10 rounded-2xl flex items-center justify-center"
            animate={{
              backgroundColor: isHovered ? "rgba(252, 211, 77, 0.2)" : "rgba(252, 211, 77, 0.1)",
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="text-amber-300" size={20} />
          </motion.div>
        )}

        {/* Number - large and prominent */}
        <motion.div
          className="mb-4"
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-5xl lg:text-6xl font-black text-white mb-2">{number}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
        </motion.div>

        {/* Text */}
        <p className="text-slate-300 font-semibold text-lg leading-tight">{text}</p>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </motion.div>
  );
};

export default function PageWithHeroAndUSP() {
  const sectionRef = useRef(null);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const achievements = [
    { number: '2,500+', text: 'Crown & Bridges' },
    { number: '1,000+', text: 'Dental Implants' },
    { number: '10,000+', text: 'Root Canal' },
    { number: '500+', text: 'Smile Designing' },
  ];

  return (
    <>
      {/* PART 1: The Main Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-white">
        <Image
          src={img3}
          alt="Clinic Hero"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-900/70" />

        {/* Decorative Shapes Layer - Hidden on mobile for cleaner look */}
        <div className="absolute inset-0 z-10 hidden sm:block">
          <div
            className="absolute left-0 top-[140px] -translate-y-1/2 h-[300px] w-[170px] bg-amber-400/30 [clip-path:polygon(0_0,_100%_50%,_0_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-[140px] -translate-y-1/2 h-[295px] w-[165px] bg-slate-900/50 [clip-path:polygon(0_0,_100%_50%,_0_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-2/3 -translate-y-1/2 h-[350px] w-[230px] bg-gradient-to-r from-amber-300 to-amber-500 opacity-20 [clip-path:polygon(0_0,_100%_50%,_0_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-4/5 -translate-y-1/2 h-[300px] w-[170px] bg-amber-400 opacity-40 [clip-path:polygon(0_0,_100%_50%,_0_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-[95%] -translate-y-1/2 h-[250px] w-[130px] bg-amber-400 opacity-25 [clip-path:polygon(0_0,_100%_50%,_0_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-[280px] w-[320px] bg-amber-500 opacity-10 [clip-path:polygon(0_100%,_100%_100%,_0_0)]"
            aria-hidden="true"
          />
        </div>

        {/* Mobile decorative accent */}
        <div className="absolute inset-0 z-10 sm:hidden">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-amber-400/20 to-transparent" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full" />
        </div>

        {/* Foreground Content (Headings and Button) */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          {/* Mobile Layout - Optimized Spacing */}
          <div className="block sm:hidden space-y-4">
            {/* Heading moved up with reduced spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-8"
            >
              <h1 className={`${bruno.className} text-3xl font-bold tracking-tight mb-2`}>
                Exceptional <span className='text-amber-400'>Dental Care</span> with Excellent Results
              </h1>

            </motion.div>

            {/* Mobile Image - Added between heading and button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto w-full max-w-sm relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30"
            >
              {/* Aspect ratio box */}
              <div className="relative w-full pb-[100%]">
                <Image
                  src={img2}
                  alt="Dental Care Excellence"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Button with proper spacing */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-amber-400 cursor-pointer text-slate-900 font-bold py-3 px-6 mt-5 rounded-lg text-base hover:bg-amber-300 transition-colors duration-300"
            >
              Enquire Now
            </motion.button>
          </div>

          {/* Desktop Layout - Unchanged */}
          <div className="hidden sm:block">
            <h1 className={`${bruno.className} text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4`}>
              Exceptional <span className='text-amber-400'>Dental Care</span> with Excellent Results
            </h1>
            <p className={`${bruno3.className} text-lg sm:text-2xl text-slate-300 mb-8 mt-10`}>
              Most Trusted Dental Clinic in Dombivli East
            </p>

            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-amber-400 cursor-pointer text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-300 transition-colors duration-300 mt-10"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* PART 2: Modern USP Section with Split Layout */}
      <section
        ref={sectionRef}
        className="relative bg-transparent overflow-hidden py-8 sm:py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

          {/* Top Section: Interactive Stats Hero */}
          <motion.div
            className="text-center mb-6 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 mt-2 sm:mt-4 bg-clip-text text-transparent almendra-regular almendra-bold px-2"
              style={{
                backgroundImage: `url(${img1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              Our Impact in Numbers
            </h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed">
              Every number tells a story of trust, expertise, and life-changing dental care
            </p>
          </motion.div>

          {/* Mobile Layout - Grid of 4 */}
          <div className="block sm:hidden grid grid-cols-2 gap-3 mb-6">
            {achievements.map((achievement, index) => (
              <MobileAchievementCard
                key={achievement.text}
                number={achievement.number}
                text={achievement.text}
                delay={0.1 * (index + 1)}
                index={index}
              />
            ))}
          </div>


          {/* Desktop Layout - Grid (unchanged for md and lg) */}
          <div className="py-4 hidden sm:block">
            {/* Asymmetric Grid Layout */}
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - 2 cards */}
                <div className="lg:col-span-1 space-y-8">
                  <ModernAchievementCard
                    number={achievements[0].number}
                    text={achievements[0].text}
                    delay={0.2}
                    index={0}
                  />
                  <ModernAchievementCard
                    number={achievements[1].number}
                    text={achievements[1].text}
                    delay={0.4}
                    index={1}
                  />
                </div>

                {/* Right Column - 2 cards offset */}
                <div className="lg:col-span-1 space-y-8 lg:mt-16">
                  <ModernAchievementCard
                    number={achievements[2].number}
                    text={achievements[2].text}
                    delay={0.6}
                    index={2}
                  />
                  <ModernAchievementCard
                    number={achievements[3].number}
                    text={achievements[3].text}
                    delay={0.8}
                    index={3}
                  />
                </div>

                {/* Center Column - CTA Section (Hidden on mobile) */}
                <div className="lg:col-span-1 flex flex-col justify-center lg:mt-8 hidden lg:flex">
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/20 to-slate-700/10 backdrop-blur-sm rounded-3xl p-8 border border-amber-400/20 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(252, 211, 77, 0.4)"
                    }}
                  >
                    <div className="w-16 h-16 bg-amber-400/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl"><GiTrophy /></span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      Join Our Success Story
                    </h4>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      Experience the same exceptional care that thousands of patients trust for their dental health.
                    </p>
                    <motion.button
                      className="w-full px-6 py-4 bg-gradient-to-r cursor-pointer from-amber-400 to-amber-600 text-slate-900 font-bold rounded-2xl"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 8px 25px rgba(252, 211, 77, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Book Consultation
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>



        </div>
      </section>
    </>
  );
}
