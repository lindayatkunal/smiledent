"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaTooth, FaPlay, FaPause, FaExpand } from "react-icons/fa";
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import img1 from "/public/Images/text_bg.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// Array of gallery images (15 images)
const galleryImages = [
  "/Images/Gallery/p1.jpg",
  "/Images/Gallery/p2.jpg",
  "/Images/Gallery/p3.jpg",
  "/Images/Gallery/p4.jpg",
  "/Images/Gallery/p5.jpg",
  "/Images/Gallery/p6.jpg",
  "/Images/Gallery/p7.jpg",
  "/Images/Gallery/p8.jpg",
  "/Images/Gallery/p9.jpg",
  "/Images/Gallery/p10.jpg",
  "/Images/Gallery/p11.jpg",
  "/Images/Gallery/p12.jpg",
  "/Images/Gallery/p13.jpg",
  "/Images/Gallery/p14.jpg",
  "/Images/Gallery/p15.jpg",
];

// 3D Rotating Circular Gallery Component - FIXED SPACING
const Advanced3DGallery = () => {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const autoRotationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const items = container?.querySelectorAll('.gallery-3d-item');
    const numImages = galleryImages.length;
    const angleStep = 360 / numImages;

    // FIXED radius - reduced mobile radius to close gaps
    const isMobile = window.innerWidth <= 768;
    const radius = isMobile ? 220 : 500; // Reduced mobile radius from 300 to 220

    if (!container || !items) return;

    const ctx = gsap.context(() => {
      // FIXED positioning - proper 3D circle
      items.forEach((item, i) => {
        const angle = i * angleStep;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const z = Math.sin((angle * Math.PI) / 180) * radius;

        gsap.set(item, {
          x: x,
          z: z,
          rotationY: angle + 90,
          transformOrigin: "center center",
        });
      });

      // SMOOTHER entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      // Gentler entrance effect
      tl.fromTo(items, {
        opacity: 0,
        scale: 0.5,
        rotationX: -30,
        y: -100,
      }, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: {
          amount: 1,
          from: "center",
        }
      })
      .to(container, {
        rotationY: 180,
        duration: 3,
        ease: "power2.inOut",
      }, "-=0.8");

      // SMOOTHER auto rotation
      const startAutoRotation = () => {
        autoRotationRef.current = gsap.to(container, {
          rotationY: "+=360",
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      };

      // Enhanced Draggable
      Draggable.create(container, {
        type: "rotation",
        inertia: true,
        dragResistance: 0.3,
        onDragStart: () => {
          setIsAutoRotating(false);
          if (autoRotationRef.current) {
            autoRotationRef.current.kill();
          }
        },
        onDrag: function () {
          setCurrentRotation(this.rotation);
        },
        onDragEnd: () => {
          gsap.delayedCall(2, () => {
            if (isAutoRotating) {
              startAutoRotation();
            }
          });
        }
      });

      if (isAutoRotating) {
        startAutoRotation();
      }

    }, galleryRef);

    return () => {
      ctx.revert();
      if (autoRotationRef.current) {
        autoRotationRef.current.kill();
      }
    };
  }, [isAutoRotating]);

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
    if (!isAutoRotating) {
      autoRotationRef.current = gsap.to(containerRef.current, {
        rotationY: "+=360",
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    } else if (autoRotationRef.current) {
      autoRotationRef.current.kill();
    }
  };

  return (
    <div id="gallery" ref={galleryRef} className="advanced-3d-gallery">
      {/* FIXED CSS - Better spacing and taller images */}
      <style jsx global>{`
        .advanced-3d-gallery {
          perspective: 2000px;
          perspective-origin: center center;
          width: 100%;
          height: 800px; /* Increased height */
          position: relative;
          overflow: hidden;
          margin: 0; /* Remove margins */
          padding: 0; /* Remove padding */
        }
        
        .gallery-3d-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          width: 1000px;
          height: 1000px;
        }
        
        .gallery-3d-item {
          position: absolute;
          width: 200px;
          height: 320px; /* Increased from 250px to 320px */
          top: 50%;
          left: 50%;
          margin: -160px 0 0 -100px; /* Adjusted for new height */
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(251, 191, 36, 0.3);
          background: linear-gradient(135deg, rgba(10, 23, 48, 0.8), rgba(6, 20, 40, 0.9));
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .gallery-3d-item:hover {
          box-shadow: 0 25px 50px rgba(251, 191, 36, 0.4);
          border-color: rgba(251, 191, 36, 0.8);
          transform: scale(1.05) translateZ(20px);
        }
        
        .gallery-controls {
          position: absolute;
          bottom: 20px; /* Reduced from 30px */
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 10;
        }
        
        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(10, 23, 48, 0.9);
          border: 2px solid rgba(251, 191, 36, 0.4);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #FBBF24;
        }
        
        .control-btn:hover {
          background: rgba(251, 191, 36, 0.2);
          border-color: rgba(251, 191, 36, 0.8);
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
        }
        
        .modal-container {
          max-width: 90vw;
          max-height: 90vh;
          width: auto;
          height: auto;
          overflow: hidden;
          border-radius: 24px;
          background: rgba(6, 20, 40, 0.95);
          backdrop-filter: blur(20px);
        }
        
        .modal-image-wrapper {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        /* FIXED Mobile View - Reduced gaps */
        @media (max-width: 768px) {
          .advanced-3d-gallery {
            height: 500px; /* Reduced height to bring images closer */
            perspective: 1200px; /* Reduced perspective */
          }
          .gallery-3d-container {
            width: 500px; /* Reduced container size */
            height: 500px;
          }
          .gallery-3d-item {
            width: 140px;
            height: 220px; /* Increased from 180px to 220px */
            margin: -110px 0 0 -70px; /* Adjusted for new height */
          }
          .control-btn {
            width: 45px;
            height: 45px;
          }
          .gallery-controls {
            bottom: 15px;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .advanced-3d-gallery {
            height: 450px; /* Further reduced for smaller screens */
          }
          .gallery-3d-container {
            width: 450px; /* Smaller container */
            height: 450px;
          }
          .gallery-3d-item {
            width: 120px;
            height: 190px; /* Increased from 160px to 190px */
            margin: -95px 0 0 -60px; /* Adjusted for new height */
          }
        }
      `}</style>

      {/* 3D Gallery Container */}
      <div ref={containerRef} className="gallery-3d-container">
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className="gallery-3d-item"
            onClick={() => setSelectedImage({ src, index })}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 140px, 200px"
              quality={90}
            />
            {/* REMOVED NUMBERING - No gallery-3d-number div */}
          </div>
        ))}
      </div>

      {/* Gallery Controls */}
      <div className="gallery-controls">
        <motion.button
          className="control-btn"
          onClick={toggleAutoRotation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoRotating ? <FaPause size={16} /> : <FaPlay size={16} />}
        </motion.button>

        <motion.button
          className="control-btn"
          onClick={() => setSelectedImage({ src: galleryImages[0], index: 0 })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaExpand size={16} />
        </motion.button>
      </div>

      {/* Enhanced Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="modal-container relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-image-wrapper">
              <Image
                src={selectedImage.src}
                alt={`Gallery image ${selectedImage.index + 1}`}
                width={700}
                height={800}
                className="object-cover rounded-2xl"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                }}
                quality={95}
              />
            </div>

            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-amber-400 hover:bg-amber-300 rounded-full flex items-center justify-center text-[#061428] font-bold transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default function Gallery() {
  return (
    <section className="relative bg-transparent py-4 sm:py-8 md:py-10"> {/* Reduced padding */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Gallery Header - REDUCED SPACING */}
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-8" // Reduced from mb-8 sm:mb-12 md:mb-16
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-2 sm:mb-3 mt-1 sm:mt-2 bg-clip-text text-transparent almendra-regular almendra-bold px-2" // Reduced margins
            style={{
              backgroundImage: `url(${img1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            Immersive Journey Through Our Dental Excellence
          </h2>
        </motion.div>

        {/* Advanced 3D Gallery */}
        <Advanced3DGallery />
      </div>
    </section>
  );
}
