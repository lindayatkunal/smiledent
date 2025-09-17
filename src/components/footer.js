"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

/* Motion helpers */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const springHover = {
  whileHover: { scale: 1.03, y: -4, transition: { type: "spring", stiffness: 260, damping: 18 } },
  whileTap: { scale: 0.98 },
};
const linkUnderline =
  "group inline-flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-300 " +
  "bg-left-bottom bg-gradient-to-r from-amber-400 to-amber-400 bg-[length:0%_2px] bg-no-repeat " +
  "group-hover:bg-[length:100%_2px] ease-out duration-500";

/* Decorative ring + aurora */
const Aurora = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"
      animate={{ rotate: [0, 45, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      style={{ boxShadow: "0 0 80px 10px rgba(255,255,255,0.04) inset" }}
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* Small 3D tilt helper for icon buttons - BALANCED SIZE */
function TiltIcon({ href, label, children, colorClass, glowClass, size = "medium" }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useTransform(y, [0, 1], [8, -8]);
  const ry = useTransform(x, [0, 1], [-8, 8]);
  const sx = useSpring(rx, { stiffness: 200, damping: 16 });
  const sy = useSpring(ry, { stiffness: 200, damping: 16 });

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px);
    y.set(py);
    e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--my", `${py * 100}%`);
  };

  // Better size control
  const sizeConfig = {
    small: { container: "w-12 h-12", icon: "text-lg" },
    medium: { container: "w-16 h-16", icon: "text-xl" },
    large: { container: "w-20 h-20", icon: "text-2xl" }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ transformStyle: "preserve-3d", rotateX: sx, rotateY: sy }}
      className={`relative ${config.container} flex items-center justify-center rounded-xl ${colorClass} ring-1 ring-white/15 transition-all duration-300`}
      whileHover={{
        scale: 1.1,
        rotate: 3,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Balanced glow */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-xl ${glowClass}`}
        style={{
          background:
            "radial-gradient(160px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.15), transparent 40%)",
        }}
      />

      <span
        className={`relative text-white drop-shadow-md z-10 ${config.icon}`}
        style={{ transform: "translateZ(15px)" }}
      >
        {children}
      </span>
    </motion.a>
  );
}

/* Orbiting social icons around the logo - CONTAINED WITHIN CARD */
function SocialOrbitRings() {
  const Icon = ({ children }) => (
    <motion.div
      className="absolute"
      animate={{ rotate: ["0deg", "-360deg"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="pointer-events-none absolute inset-4"> {/* CONSTRAINED WITHIN CARD */}
      {/* Outer ring - INSIDE CARD BOUNDARIES */}
      <motion.div
        className="absolute inset-0 rounded-full" // Removed negative margins
        style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Instagram - Top */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
          <Icon>
            <div className="pointer-events-auto">
              <TiltIcon
                href="https://instagram.com/"
                label="Instagram"
                colorClass="bg-gradient-to-br from-pink-500/30 to-purple-500/30"
                glowClass="shadow-[0_0_20px_0_rgba(244,114,182,0.4)]"
                size="medium" // Reduced size to fit within card
              >
                <FaInstagram />
              </TiltIcon>
            </div>
          </Icon>
        </div>

        {/* YouTube - Bottom Right (MOVED TO OUTER RING, same position) */}
        <div className="absolute left-[15%] bottom-[15%] transform translate-x-1/2 translate-y-1/2">
          <Icon>
            <div className="pointer-events-auto">
              <TiltIcon
                href="https://youtube.com/"
                label="YouTube"
                colorClass="bg-gradient-to-br from-red-500/30 to-red-600/30"
                glowClass="shadow-[0_0_20px_0_rgba(239,68,68,0.4)]"
                size="medium"
              >
                <FaYoutube />
              </TiltIcon>
            </div>
          </Icon>
        </div>

        {/* LinkedIn - Left */}
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Icon>
            <div className="pointer-events-auto">
              <TiltIcon
                href="https://linkedin.com/"
                label="LinkedIn"
                colorClass="bg-gradient-to-br from-cyan-500/30 to-blue-500/30"
                glowClass="shadow-[0_0_20px_0_rgba(34,211,238,0.4)]"
                size="medium"
              >
                <FaLinkedinIn />
              </TiltIcon>
            </div>
          </Icon>
        </div>
      </motion.div>

      {/* Middle ring - SMALLER AND CONTAINED */}
      <motion.div
        className="absolute inset-12 rounded-full"
        style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {/* Facebook - Bottom Right */}
        <div className="absolute right-[25%] bottom-[15%] transform translate-x-1/2 translate-y-1/2">
          <Icon>
            <div className="pointer-events-auto">
              <TiltIcon
                href="https://facebook.com/"
                label="Facebook"
                colorClass="bg-gradient-to-br from-blue-500/20 to-blue-600/20"
                glowClass="shadow-[0_0_15px_0_rgba(59,130,246,0.3)]"
                size="small"
              >
                <FaFacebookF />
              </TiltIcon>
            </div>
          </Icon>
        </div>
      </motion.div>

      {/* Inner ring - SUBTLE ACCENT */}
      <motion.div
        className="absolute inset-20 rounded-full"
        style={{ border: "1px dashed rgba(255,255,255,0.06)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}





/* Copy utility */
function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch { }
      }}
      className="text-xs rounded-full border border-white/15 px-2 py-1 text-slate-300 hover:text-white hover:border-white/25 transition-colors"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const Footer = () => {
  return (
    <footer className="relative bg-slate-950/70 border-t border-white/10">
      <Aurora />

      {/* Marquee highlights */}
      <div className="relative overflow-hidden border-b border-white/10">
        <motion.div
          className="whitespace-nowrap py-2 text-xs text-amber-200/90"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <span className="mx-6">Painless Implants</span>
          <span className="mx-6">Cosmetic Dentistry</span>
          <span className="mx-6">Emergency Care</span>
          <span className="mx-6">Same‑Day Appointments</span>
          <span className="mx-6">Painless Implants</span>
          <span className="mx-6">Cosmetic Dentistry</span>
          <span className="mx-6">Emergency Care</span>
          <span className="mx-6">Same‑Day Appointments</span>
        </motion.div>
      </div>

      {/* Mobile Layout - Unchanged (Your preferred mobile view) */}
      <div className="block lg:hidden relative container mx-auto px-4 py-8">
        <div className="space-y-6">

          {/* Mobile Logo Section */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <Image
                src="/Images/logo1.png"
                alt="Dr. Mane's Dental Clinic"
                width={150}
                height={60}
                className="mx-auto h-40 w-auto object-contain"
                priority
              />
            </div>

            {/* Mobile Social Links - Simple Row */}
            <div className="flex justify-center gap-4 mt-4">
              {[
                { href: "https://instagram.com/", icon: <FaInstagram />, color: "bg-gradient-to-br from-fuchsia-500/30 to-rose-500/30" },
                { href: "https://facebook.com/", icon: <FaFacebookF />, color: "bg-blue-500/20" },
                { href: "https://youtube.com/", icon: <FaYoutube />, color: "bg-red-500/20" },
                { href: "https://linkedin.com/", icon: <FaLinkedinIn />, color: "bg-cyan-500/20" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg ${social.color} ring-1 ring-white/10 flex items-center justify-center text-white transition-transform`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Mobile Map */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-sm"
          >
            <div className="relative aspect-[16/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5327.98916011022!2d73.08735596332743!3d19.2188933818884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795d3ede7a691%3A0x74ea3a4d5c67776d!2sDr.%20Mane's%20Dental%20Clinic%20%26%20Implant%20Centre%20Dombivli%20East!5e0!3m2!1sen!2sin!4v1756792512834!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-amber-400 text-[#061428] font-bold text-xs rounded shadow">
                Our Location
              </div>
            </div>
            <p className="px-4 py-3 text-slate-300 text-xs text-center">
              Dr. Mane's Dental Clinic & Implant Centre - Dombivli East
            </p>
          </motion.section>
        </div>

        {/* Mobile Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-slate-400 text-xs mb-3">
            &copy; 2025 Dr. Mane's Dental Clinic. All rights reserved.
          </p>
          <a
            href="https://mastermindweb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="/Images/footer_copyright.png"
              alt="Mastermind Web Developers"
              className="h-20 w-auto mx-auto"
            />
          </a>
        </div>
      </div>

      {/* Desktop Layout - RESTORED ORIGINAL with orbiting social icons and contact cards */}
      <div className="hidden lg:block relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT: Center logo hub with orbiting social icons (RESTORED) */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative grid place-items-center rounded-2xl p-6 bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-md"
          >
            <div className="relative size-64 md:size-72 lg:size-80">
              <motion.div
                className="absolute inset-0 rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-md grid place-items-center"
                animate={{ rotate: [0, 3, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/Images/logo1.png"
                  alt="Smiledent Dental Care"
                  width={200}
                  height={80}
                  className="mx-auto h-44 w-auto object-contain"
                  priority
                />
              </motion.div>

              {/* Orbit rings - RESTORED */}
              <SocialOrbitRings />
            </div>
          </motion.section>

          {/* MIDDLE: Interactive contact (RESTORED) */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl p-6 bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-md"
            {...springHover}
          >
            <h3 className="text-white text-xl font-semibold mb-4">Contact</h3>

            <div className="space-y-4">
              {/* Phone row */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 bg-amber-400/20 rounded-lg grid place-items-center">
                    <FiPhone className="text-amber-400" size={16} />
                  </span>
                  <div className="leading-tight">
                    <a href="tel:+918828817199" className="text-white text-sm hover:underline">
                      +91 88288 17199
                    </a>
                    <p className="text-slate-400 text-xs">Tap to call</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href="tel:+918828817199" className="inline-flex items-center gap-1 text-xs text-amber-200 hover:text-white">
                    Call <FiArrowUpRight />
                  </a>
                  <CopyButton value="+918828817199" />
                </div>
              </div>

              {/* Email row */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 bg-amber-400/20 rounded-lg grid place-items-center">
                    <FiMail className="text-amber-400" size={16} />
                  </span>
                  <div className="leading-tight">
                    <a href="mailto:drtusharmane@gmail.com" className="text-white text-sm hover:underline">
                      drtusharmane@gmail.com
                    </a>
                    <p className="text-slate-400 text-xs">Usually responds in 1–2 hrs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href="mailto:drtusharmane@gmail.com" className="inline-flex items-center gap-1 text-xs text-amber-200 hover:text-white">
                    Email <FiArrowUpRight />
                  </a>
                  <CopyButton value="drtusharmane@gmail.com" />
                </div>
              </div>

              {/* Hours block */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 bg-amber-400/20 rounded-lg grid place-items-center">
                    <FiClock className="text-amber-400" size={16} />
                  </span>
                  <div>
                    <p className="text-white text-sm">Monday – Sunday</p>
                    <p className="text-slate-400 text-xs">10:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+918828817199" className={linkUnderline}>
                <FiPhone className="text-amber-300" /> Quick Call
              </a>
              <a href="mailto:drtusharmane@gmail.com" className={linkUnderline}>
                <FiMail className="text-amber-300" /> Write Email
              </a>
            </div>
          </motion.section>

          {/* RIGHT: Map card (RESTORED) */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl p-0 overflow-hidden ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col"
            {...springHover}
          >
            <div className="relative aspect-[16/10]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5327.98916011022!2d73.08735596332743!3d19.2188933818884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795d3ede7a691%3A0x74ea3a4d5c67776d!2sDr.%20Mane's%20Dental%20Clinic%20%26%20Implant%20Centre%20Dombivli%20East!5e0!3m2!1sen!2sin!4v1756792512834!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-amber-400 text-[#061428] font-bold text-xs rounded-md shadow">
                East Location
              </div>
            </div>
            <p className="px-6 py-3 text-slate-300 text-xs text-center">
              Dr. Mane Dental Clinic &amp; Implant Centre
            </p>
          </motion.section>
        </div>

        {/* Mobile quick actions for desktop (RESTORED) */}
        <div className="mt-8 grid grid-cols-1 gap-3 md:hidden">
          <details className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
            <summary className="cursor-pointer text-white">Quick Call</summary>
            <div className="mt-3 flex flex-col gap-2">
              <a href="tel:+918828817199" className={linkUnderline}>+91 88288 17199</a>
              <a href="tel:+919820560087" className={linkUnderline}>+91 98205 60087</a>
            </div>
          </details>
          <details className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
            <summary className="cursor-pointer text-white">Email</summary>
            <div className="mt-3">
              <a href="mailto:drtusharmane@gmail.com" className={linkUnderline}>
                drtusharmane@gmail.com
              </a>
            </div>
          </details>
        </div>

        {/* Divider (RESTORED) */}
        <div className="mt-10 border-t border-white/10" />

        {/* Desktop Bottom (RESTORED) */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm pb-2">
            &copy; 2025 Dr. Mane&apos;s Dental Clinic. All rights reserved.
          </p>
          <a
            href="https://mastermindweb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block align-middle hover:scale-110 transition-transform"
          >
            <img
              src="/Images/footer_copyright.png"
              alt="Mastermind Web Developers"
              className="h-32 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
