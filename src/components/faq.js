"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle, FiMessageCircle } from "react-icons/fi";
import { FaTooth } from "react-icons/fa";
import img1 from "/public/Images/text_bg.jpg"

const faqs = [
  {
    q: "What types of dental services do you offer?",
    a: "We provide comprehensive care including dental implants, crowns & bridges, root canal treatment, pediatric dentistry, tooth extraction, braces & aligners, teeth whitening, dental veneers, and full mouth reconstruction.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "Can I schedule an appointment online?",
    a: "Yes. Appointments can be scheduled online anytime. Choose the preferred date and time, and a confirmation will be sent instantly.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "Do you offer emergency dental services?",
    a: "Yes. Emergency slots are available daily for urgent pain, swelling, or trauma. Call the clinic for priority assistance.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, major credit/debit cards, UPI, and net banking. EMI options may be available for select treatments.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "Is parking available at the clinic?",
    a: "Yes. On-site or adjacent dedicated parking is available for patients. Assistance is provided during peak hours.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "How many branches do you have?",
    a: "We currently operate across Dombivli East & West. More locations may be added—check the contact page for updates.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
  {
    q: "Do your clinics operate under different names at each location?",
    a: "All branches operate under the same brand with unified standards, protocols, and records for a seamless experience.",
    icon: <FiHelpCircle className="text-amber-400" size={20} />
  },
];

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      className="relative bg-transparent py-8 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-[-8rem] w-[28rem] h-[28rem] rounded-full bg-amber-400/6 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[24rem] h-[24rem] rounded-full bg-amber-400/10 blur-3xl animate-pulse" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Enhanced Header with Mobile Optimization */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center mb-8 sm:mb-12 md:mb-16"
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
            Your Questions Answered
          </h2>

          <motion.p
            variants={item}
            className="hidden sm:block text-base sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Get instant answers to common concerns about our dental services, appointments, and clinic facilities
          </motion.p>

        </motion.div>

        {/* Mobile Layout - Single Column FAQ Only */}
        <div className="block sm:hidden">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={f.q} variants={item}>
                  <motion.button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className={`w-full text-left rounded-xl border transition-all duration-500 ${isOpen
                        ? "bg-gradient-to-br from-[#0a1730]/80 to-[#061428]/80 border-amber-400/50 shadow-lg shadow-amber-400/10"
                        : "bg-gradient-to-br from-[#0a1730]/40 to-[#061428]/40 border-white/10 hover:border-amber-400/30"
                      } backdrop-blur-xl`}
                    whileHover={{
                      scale: 1.01,
                      borderColor: isOpen ? "rgba(251, 191, 36, 0.6)" : "rgba(251, 191, 36, 0.4)"
                    }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between px-4 py-4">
                      <div className="flex items-center gap-3 flex-1 pr-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-400/20' : 'bg-white/10'
                          }`}>
                          <div className="scale-75">
                            {f.icon}
                          </div>
                        </div>
                        <span className={`text-sm font-semibold transition-colors duration-300 leading-tight ${isOpen ? 'text-amber-300' : 'text-white'
                          }`}>
                          {f.q}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-amber-400/20' : 'bg-white/10'
                          }`}
                      >
                        <FiChevronDown className="text-amber-400" size={16} />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="pl-11">
                              <motion.p
                                className="text-slate-300 leading-relaxed text-sm"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                              >
                                {f.a}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Contact Button - Standalone */}
          <div className="mt-8 flex justify-center">
            <motion.a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#061428] font-bold rounded-xl transition-all duration-300 hover:from-amber-300 hover:to-amber-400 shadow-lg text-sm"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 30px rgba(251, 191, 36, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FiMessageCircle size={18} />
              Need More Help? Contact Us
            </motion.a>
          </div>
        </div>

        {/* Desktop Layout - Unchanged Main FAQ Layout */}
        <div className="hidden sm:block max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Side - Info Card (Hidden on mobile) */}
            <div className="lg:col-span-4 justify-center items-center">
              <motion.div
                className="sticky top-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-[#0a1730]/60 to-[#061428]/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <FiHelpCircle className="text-[#061428]" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    Need More Help?
                  </h3>

                  <p className="text-slate-400 mb-8 text-center leading-relaxed">
                    Can't find what you're looking for? Our friendly team is here to assist you with any questions or concerns.
                  </p>

                  <div className="space-y-4">
                    <motion.a
                      href="#contact"
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#061428] font-bold rounded-2xl transition-all duration-300 hover:from-amber-300 hover:to-amber-400 shadow-lg"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 12px 30px rgba(251, 191, 36, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiMessageCircle size={20} />
                      Contact Us
                    </motion.a>
                  </div>

                  {/* Stats */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-amber-400">24/7</div>
                        <div className="text-sm text-slate-400">Support</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-amber-400">100%</div>
                        <div className="text-sm text-slate-400">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - FAQ Accordions */}
            <div className="lg:col-span-8">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
              >
                {faqs.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <motion.div key={f.q} variants={item}>
                      <motion.button
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className={`w-full text-left rounded-2xl border transition-all duration-500 ${isOpen
                            ? "bg-gradient-to-br from-[#0a1730]/80 to-[#061428]/80 border-amber-400/50 shadow-xl shadow-amber-400/10"
                            : "bg-gradient-to-br from-[#0a1730]/40 to-[#061428]/40 border-white/10 hover:border-amber-400/30"
                          } backdrop-blur-xl`}
                        whileHover={{
                          scale: 1.01,
                          borderColor: isOpen ? "rgba(251, 191, 36, 0.6)" : "rgba(251, 191, 36, 0.4)"
                        }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between px-6 sm:px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-amber-400/20' : 'bg-white/10'
                              }`}>
                              {f.icon}
                            </div>
                            <span className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-amber-300' : 'text-white'
                              }`}>
                              {f.q}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-amber-400/20' : 'bg-white/10'
                              }`}
                          >
                            <FiChevronDown className="text-amber-400" size={20} />
                          </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-panel-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 sm:px-8 pb-6">
                                <div className="pl-14">
                                  <motion.p
                                    className="text-slate-300 leading-relaxed text-base"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.3 }}
                                  >
                                    {f.a}
                                  </motion.p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
