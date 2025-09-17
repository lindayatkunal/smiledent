// src/app/page.js
import Image from "next/image";
import DentalNavbar from "../components/navbar";
import PageWithHeroAndUSP from "../components/hero";
import AboutUs from "../components/about";
import Treatments from "../components/treatments";
import Dentist from "../components/dentist";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonial";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ParticlesCursorBackground from "@/components/ParticlesCursorBackground";
import FloatingButtons from "@/components/FloatingButtons"; // Add this import
import img from "/public/Images/line_vector.png";

export default function HomePage() {
  return (
    <div 
      className="relative bg-[#061428] overflow-hidden min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #061428 0%, #0a1730 50%, #061428 100%)'
      }}
    >
      {/* Global Background Particles and Cursor Effects */}
      <ParticlesCursorBackground />
      <div className="fixed inset-0 z-1 opacity-50">
        <Image src={img} alt="background" className="bg-cover w-full h-screen"></Image>
      </div>

      {/* Enhanced Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-amber-400/8 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-[-8rem] w-[28rem] h-[28rem] rounded-full bg-amber-400/6 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[24rem] h-[24rem] rounded-full bg-amber-400/10 blur-3xl animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-[20rem] h-[20rem] rounded-full bg-amber-400/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/2 right-[-6rem] w-[26rem] h-[26rem] rounded-full bg-amber-400/7 blur-3xl animate-pulse" />
      </div>

      {/* All Components with relative z-index */}
      <div className="relative z-10">
        <DentalNavbar />
        <PageWithHeroAndUSP />
        <AboutUs />
        <Treatments />
        <Dentist />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>

      {/* Floating Contact Buttons */}
      <FloatingButtons />
    </div>
  );
}
