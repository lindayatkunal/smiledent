"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import img1 from "/public/Images/text_bg.jpg";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function validateAndBuildFormData(form) {
    setErr("");
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const services = String(fd.get("services") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const phoneDigits = phone.replace(/\D/g, "");
    if (!name || phoneDigits.length < 10) {
      throw new Error("Please enter name and a valid 10-digit phone number.");
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const clean = new FormData();
    clean.set("name", name);
    clean.set("phone", phoneDigits);
    if (email) clean.set("email", email);
    if (services) clean.set("services", services);
    if (message) clean.set("message", message);

    return clean;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;  // capture immediately
    setLoading(true);
    setErr("");
    setSent(false);
    try {
      const clean = validateAndBuildFormData(formEl);

      const res = await fetch("/api/contact", { method: "POST", body: clean });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out?.ok !== true) throw new Error(out?.error || "Failed to send");

      setSent(true);
      formEl.reset();                // safe: not using e.currentTarget after await
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      setErr(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <section id="contact" className="relative bg-transparent py-8 sm:py-16 md:py-20 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-[-8rem] w-[28rem] h-[28rem] rounded-full bg-amber-400/6 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[24rem] h-[24rem] rounded-full bg-amber-400/10 blur-3xl animate-pulse" />
      </div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.4) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            Ready to Transform Your Smile?
          </h2>

          <p className="hidden sm:block text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have a question, need an appointment, or want expert guidance? Send a message and our team will respond promptly with personalized care.
          </p>
        </motion.div>

        {/* Mobile layout */}
        <div className="block sm:hidden space-y-6">
          {/* Form card */}
          <motion.div
            className="relative rounded-2xl border border-white/10 backdrop-blur-xl p-5 shadow-xl overflow-hidden"
            style={{ background: "rgba(10, 23, 48, 0.4)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-1 text-center">Send Us a Message</h3>
              <p className="text-slate-400 mb-5 leading-relaxed text-sm text-center">We'll get back to you within 24 hours</p>

              {err && (
                <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
                  {err}
                </div>
              )}
              {sent && (
                <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 px-3 py-2 text-sm flex items-center gap-2">
                  <FiCheckCircle /> Message sent successfully!
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name-mobile" className="block text-xs font-semibold text-white/90 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name-mobile"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-3 py-3 text-sm outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone-mobile" className="block text-xs font-semibold text-white/90 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone-mobile"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder="98765 43210"
                    className="w-full rounded-lg border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-3 py-3 text-sm outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email-mobile" className="block text-xs font-semibold text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-mobile"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-3 py-3 text-sm outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="services-mobile" className="block text-xs font-semibold text-white/90 mb-2">
                    Services
                  </label>
                  <select
                    id="services-mobile"
                    name="services"
                    defaultValue=""
                    className="w-full rounded-lg border border-white/20 bg-[#061428]/60 text-white px-3 py-3 text-sm outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="consultation">Consultation</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="whitening">Whitening</option>
                    <option value="orthodontics">Orthodontics</option>
                    <option value="root-canal">Root Canal</option>
                    <option value="dental-implants">Dental Implants</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message-mobile" className="block text-xs font-semibold text-white/90 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message-mobile"
                    name="message"
                    rows={4}
                    placeholder="Share details about your concern or questions..."
                    className="w-full rounded-lg border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-3 py-3 text-sm outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300 resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 font-bold text-[#061428] shadow-lg hover:from-amber-300 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 disabled:opacity-60 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend size={16} /> Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Mobile contact info card */}
          <motion.div
            className="relative rounded-2xl border border-white/10 backdrop-blur-xl p-5 shadow-xl overflow-hidden"
            style={{ background: "rgba(10, 23, 48, 0.4)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-1 text-center">Contact Information</h3>
              <p className="text-slate-400 mb-4 leading-relaxed text-sm text-center">Reach out by phone, email, or visit us</p>

              <div className="space-y-3">
                {[
                  { icon: <FiPhone size={18} />, title: "+91 88288 17199", accent: "phone" },
                  { icon: <FiMail size={18} />, title: "drtusharmane@gmail.com", accent: "email" },
                  { icon: <FiMapPin size={18} />, title: "Dombivli East, Maharashtra", accent: "location" },
                  { icon: <FiClock size={18} />, title: "Mon–Sat: 10:00 AM – 10:00 PM", accent: "hours" },
                ].map((item, index) => (
                  <motion.div
                    key={item.accent}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* Emergency CTA */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <h4 className="text-white font-bold text-base mb-3 text-center">Emergency? Need Help?</h4>
                <div className="flex flex-col gap-2">
                  <motion.a
                    href="tel:+918828817199"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#061428] font-bold rounded-lg transition-all duration-300 hover:from-amber-300 hover:to-amber-400 text-sm"
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiPhone size={16} />
                    Call Now
                  </motion.a>

                  <motion.a
                    href="https://wa.me/918828817199"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-amber-400/50 text-amber-300 font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/10 hover:border-amber-400 text-sm"
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left: Form */}
            <motion.div
              className="relative rounded-3xl border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden"
              style={{ background: "rgba(10, 23, 48, 0.4)", backdropFilter: "blur(20px)" }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Send Us a Message</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {err && (
                  <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
                    {err}
                  </div>
                )}
                {sent && (
                  <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 px-3 py-2 text-sm flex items-center gap-2">
                    <FiCheckCircle /> Message sent successfully! We'll get back to you shortly.
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-3">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter Your Name"
                        className="w-full rounded-xl border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-4 py-4 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white/90 mb-3">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        placeholder="98765 43210"
                        className="w-full rounded-xl border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-4 py-4 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-3">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-4 py-4 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="services" className="block text-sm font-semibold text-white/90 mb-3">
                        Services
                      </label>
                      <select
                        id="services"
                        name="services"
                        defaultValue=""
                        className="w-full rounded-xl border border-white/20 bg-[#061428]/60 text-white px-4 py-4 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="consultation">Consultation</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="whitening">Whitening</option>
                        <option value="orthodontics">Orthodontics</option>
                        <option value="root-canal">Root Canal</option>
                        <option value="dental-implants">Dental Implants</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Share details about your concern, preferred appointment time, or any specific questions."
                      className="w-full rounded-xl border border-white/20 bg-[#061428]/60 text-white placeholder-white/50 px-4 py-4 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/40 backdrop-blur-sm transition-all duration-300 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-3 cursor-pointer rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 font-bold text-[#061428] shadow-lg hover:from-amber-300 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 disabled:opacity-60 transition-all duration-300"
                      whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(251, 191, 36, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <FiSend size={18} /> Send Message
                        </>
                      )}
                    </motion.button>
                  </div>

                  {sent && (
                    <motion.p
                      className="mt-4 inline-flex items-center gap-2 text-emerald-300 font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FiCheckCircle /> Message sent successfully! We'll get back to you shortly.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Right: Info card */}
            <motion.div
              className="relative rounded-3xl border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden"
              style={{ background: "rgba(10, 23, 48, 0.4)", backdropFilter: "blur(20px)" }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Clinic Information</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Reach out by phone or email, or visit during working hours. Advance booking is recommended for the best experience.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: <FiPhone size={24} />, title: "+91 88288 17199", accent: "phone" },
                    { icon: <FiMail size={24} />, title: "drtusharmane@gmail.com", accent: "email" },
                    { icon: <FiMapPin size={24} />, title: "Dombivli East , Maharashtra", accent: "location" },
                    { icon: <FiClock size={24} />, title: "Mon–Sat: 10:00 AM – 10:00 PM", accent: "hours" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.accent}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.3)" }}
                    >
                      <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-white font-bold text-lg">{item.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-white font-bold text-lg mb-4">Emergency? Need Immediate Help?</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href="tel:+918828817199"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#061428] font-bold rounded-xl transition-all duration-300 hover:from-amber-300 hover:to-amber-400"
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(251, 191, 36, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiPhone size={18} />
                      Call Now
                    </motion.a>

                    <motion.a
                      href="https://wa.me/918828817199"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-amber-400/50 text-amber-300 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/10 hover:border-amber-400"
                      whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.8)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaWhatsapp size={18} />
                      WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
