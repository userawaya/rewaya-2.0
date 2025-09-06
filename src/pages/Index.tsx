import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import Tablet from '@/components/Tablet';
import About from '@/components/About';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import VideoModal from '@/components/VideoModal';
import { Mail, Phone, MapPin, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Audience from '@/components/Audience';
import AboutReWaya from '@/components/SecondAbout';
import OurValues from '@/components/Values';
import Footer from '@/components/Footer';
import LastSection from '@/components/LastSection';
const Index = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return <>
      {/* Navigation */}
      {/* <Navigation /> */}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <Tablet />
        </section>

        {/* Stakeholder Section */}
        <section id="stakeholders">
          <About />
        </section>

        {/* About Section */}
        <section id="about">
          <Audience />
        </section>


<section id="testimonials">
          <AboutReWaya />
        </section>

        <section id="testimonials">
          <OurValues />
        </section>
  
        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQSection />
        </section>

        <section id="faq">
          <LastSection />
        </section>
      </main>

      {/* Enhanced Footer */}
      <Footer/>
    </>;
};
export default Index;