"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTooth } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#aboutus" },
  { label: "Treatments", href: "#treatments" },
  { label: "Dentist", href: "#dentist" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function DentalNavbar() {
  const containerRef = useRef(null);
  const itemRefs = useMemo(
    () => NAV_ITEMS.map(() => ({ current: null })),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [line, setLine] = useState({ left: 0, width: 0, visible: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const moveLine = (index) => {
    const btn = itemRefs[index]?.current;
    const container = containerRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    setLine({
      left: btnRect.left - parentRect.left,
      width: btnRect.width,
      visible: true,
    });
  };

  const handleNavClick = (index, href) => {
    setActiveIndex(index);
    setMenuOpen(false); // close menu on mobile click

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    moveLine(activeIndex);
    const onResize = () => moveLine(activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-center py-0">
    <nav className="w-full max-w-7xl">
        <div className="relative flex items-center justify-between rounded-2xl border border-amber-300/20 bg-slate-900/60 px-6 py-4 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          
          {/* Left logo
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <FaTooth className="text-2xl" />
            <span className="text-lg">DentalCare</span>
          </div> */}

          {/* Desktop nav */}
          <div
            ref={containerRef}
            className="hidden md:flex relative items-center gap-12 mx-auto"
          >
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.label}
                ref={itemRefs[i]}
                onClick={() => handleNavClick(i, item.href)}
                className={`relative px-3 py-1 text-[15px] font-semibold cursor-pointer tracking-wide transition-all duration-500 ${
                  activeIndex === i
                    ? "text-amber-300"
                    : "text-slate-300 hover:text-amber-200"
                }`}
              >
                <motion.span
                  animate={{
                    color: activeIndex === i ? "#FCD34D" : "#D1D5DB",
                    scale: activeIndex === i ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  {item.label}
                </motion.span>
              </button>
            ))}
            {line.visible && (
              <motion.div
                aria-hidden
                initial={false}
                animate={{ x: line.left, width: line.width }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute -bottom-[6px] h-[4px] rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-[0_0_14px_rgba(252,211,77,0.7)]"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "linear",
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Hamburger icon for mobile */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-8 h-6 flex flex-col justify-between"
              animate={menuOpen ? "open" : "closed"}
            >
              <motion.span
                className="h-[3px] w-full bg-amber-400 rounded"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 9 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="h-[3px] w-full bg-amber-400 rounded"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="h-[3px] w-full bg-amber-400 rounded"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -9 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-screen w-64 bg-slate-900/95 backdrop-blur-lg border-l border-amber-300/20 shadow-lg z-50 p-6 md:hidden"
        >
          <div className="flex flex-col gap-6 mt-10">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(i, item.href)}
                className={`text-lg font-semibold tracking-wide ${
                  activeIndex === i
                    ? "text-amber-300"
                    : "text-slate-300 hover:text-amber-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>
    </div>
  );
}
