"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaAward, FaTooth, FaUserMd, FaCheckCircle, FaXRay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import img1 from "/public/Images/text_bg.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

const doctorImages = [
  "/Images/Dentist/dr1.jpg",
  "/Images/Dentist/dr3.jpg",
  "/Images/Dentist/dr4.jpg",
  "/Images/Dentist/dr5.jpg",
  "/Images/Dentist/dr11.jpg",
  "/Images/Dentist/dr2.jpg",
  "/Images/Dentist/dr6.jpg",
  "/Images/Dentist/dr7.jpg",
  "/Images/Dentist/dr8.jpg",
  "/Images/Dentist/dr9.jpg",
  "/Images/Dentist/dr12.jpg",
];

export default function Doctor() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMore, setShowMore] = useState(false); // ✅ lifted here

  const points = [
    { icon: <FaStar className="text-amber-400" />, text: "18+ Years of Experience" },
    { icon: <FaUserMd className="text-amber-400" />, text: "Experienced Implantologist" },
    { icon: <FaAward className="text-amber-400" />, text: "Advanced Cosmetic Dentistry Skills" },
    { icon: <FaCheckCircle className="text-amber-400" />, text: "Specialist in Single Sitting RCT" },
    { icon: <FaTooth className="text-amber-400" />, text: "Implant Dentures Specialist" },
    { icon: <FaXRay className="text-amber-400" />, text: "Owner of ScanX 3D CBCT Centre in Dombivli" },
  ];

  const fullDescriptions = [
    "Dr. Tushar Mane, a recognized dentist in Dombivli East, is highly skilled in dental care and advanced implant procedures, making him the preferred choice as a dentist near me. Dr. Mane specializes in a comprehensive range of dental services, including full mouth rehabilitation, dental implants, root canal treatment, dental veneers, teeth braces, pediatric dentistry, wisdom tooth extraction, teeth cleanings, and fillings, as well as complex treatments like the precise placement and restoration of full mouth reconstruction.",
    "As the best dentist in Dombivli, Dr. Mane offers expertise in implantology, focusing on the surgical placement of dental implants to support various prostheses such as crowns, bridges, and dentures. His dedicated team collaborates closely with patients to assess their oral health needs and develop personalized treatment plans, ensuring smiles are rejuvenated and overall dental functionality is enhanced.",
    "Discover exceptional dental care with Dr. Tushar Mane, the trusted dentist in Dombivli, serving patients in both Dombivli East. Contact us today to schedule an appointment and experience top-tier dental expertise near you."
  ];

  return (
    <section id="dentist" className="relative bg-transparent py-8 sm:py-16 md:py-20 px-4 sm:px-10 overflow-hidden">
      <div className="relative z-10 container mx-auto">

        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-3xl font-black mb-2 bg-clip-text text-transparent almendra-regular almendra-bold"
              style={{
                backgroundImage: `url(${img1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Dr. Tushar Mane
            </h2>
            <p className="text-lg font-semibold text-white">
              Dental Surgeon and Implantologist
            </p>
          </motion.div>

          {/* Mobile Images */}
          <div className="w-full h-96 rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-white/10">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
              className="w-full h-full mobile-doctor-swiper"
            >
              {doctorImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`Dr. Tushar Mane - Professional image ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority={i === 0}
                      quality={85}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Text + Show More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4"
          >
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{fullDescriptions[0]}</p>

            {showMore && (
              <>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{fullDescriptions[1]}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{fullDescriptions[2]}</p>
              </>
            )}

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-amber-400 hover:text-amber-300 font-semibold text-sm underline transition-colors duration-300 mb-4"
            >
              {showMore ? "View Less" : "View More"}
            </button>

            <div className="grid grid-cols-1 gap-2 mb-4">
              {points.slice(0, 4).map((p, index) => (
                <motion.div
                  key={p.text}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm">{p.icon}</span>
                  <span className="text-white/90 font-medium text-xs">{p.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 font-semibold text-[#061428] shadow-lg text-sm w-full justify-center"
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.a>
          </motion.div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden sm:block">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2
              className="text-4xl md:text-6xl font-black mb-4 mt-4 bg-clip-text text-transparent almendra-regular almendra-bold"
              style={{
                backgroundImage: `url(${img1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >Dr. Tushar Mane</h2>
            <motion.p variants={item} className="mt-3 text-xl sm:text-2xl font-semibold text-white">
              Dental Surgeon and Implantologist.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 max-w-9xl mx-auto justify-center items-center"
          >
            <motion.div
              variants={item}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 lg:col-span-3"
              style={{
                background: 'rgba(10, 23, 48, 0.3)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <p className="text-slate-300 leading-relaxed">
                Dr. Tushar Mane, a recognized dentist in Dombivli East, is highly skilled in dental care and
                advanced implant procedures, making him the preferred choice as a dentist near me. Dr. Mane specializes
                in a comprehensive range of dental services, including full mouth rehabilitation, dental implants, root
                canal treatment, dental veneers, teeth braces, pediatric dentistry, wisdom tooth extraction, teeth
                cleanings, and fillings, as well as complex treatments like the precise placement and restoration of full
                mouth reconstruction.
              </p>
              <p className="mt-4 text-slate-300 leading-relaxed">
                As the best dentist in Dombivli, Dr. Mane offers expertise in implantology, focusing on the surgical
                placement of dental implants to support various prostheses such as crowns, bridges, and dentures. His
                dedicated team collaborates closely with patients to assess their oral health needs and develop
                personalized treatment plans, ensuring smiles are rejuvenated and overall dental functionality is
                enhanced.
              </p>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Discover exceptional dental care with Dr. Tushar Mane, the trusted dentist in Dombivli, serving patients
                in both Dombivli East. Contact us today to schedule an appointment and experience top‑tier dental
                expertise near you.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
                {points.map((p, index) => (
                  <motion.li
                    key={p.text}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="mt-1 text-lg">{p.icon}</span>
                    <span className="text-white/90 font-medium">{p.text}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 font-semibold text-[#061428] shadow-lg hover:from-amber-300 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(251, 191, 36, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Consultation
                </motion.a>
              </div>

              <span className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-amber-400/10 blur-xl" />
            </motion.div>

            <motion.div
              variants={item}
              className="relative lg:col-span-2"
            >
              <div className="doctor-slider-container relative h-[450px] sm:h-[500px] lg:h-[650px] shadow-2xl">

                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-transparent" />
                </div>

                <Swiper
                  modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                  className="absolute inset-0 z-10"
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true
                  }}
                  navigation
                  loop
                  grabCursor={true}
                  centeredSlides
                  onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: 25,
                    stretch: 0,
                    depth: 100,
                    modifier: 1.5,
                    slideShadows: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 1,
                    }
                  }}
                >
                  {doctorImages.map((src, i) => (
                    <SwiperSlide key={src}>
                      <motion.div
                        className="relative w-full h-full group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={src}
                            alt={`Dr. Tushar Mane - Professional image ${i + 1}`}
                            fill
                            className="object-cover transition-all duration-700"
                            style={{
                              filter: currentSlide === i
                                ? 'brightness(1.1) contrast(1.1)'
                                : 'brightness(0.9) contrast(0.9)'
                            }}
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 60vw, 40vw"
                            priority={i === 0}
                            quality={90}
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#061428]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <motion.div
                          className="absolute bottom-4 left-4 right-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: currentSlide === i ? 1 : 0,
                            y: currentSlide === i ? 0 : 20
                          }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                        </motion.div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-slate-400 text-sm">
                  {currentSlide + 1} / {doctorImages.length}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
