import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import StakeholderSection from '@/components/StakeholderSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import VideoModal from '@/components/VideoModal';
import { Mail, Phone, MapPin, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
const Index = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return <>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-green-50 via-white to-blue-50 pt-16">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection onWatchDemo={() => setIsVideoModalOpen(true)} />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* Stakeholder Section */}
        <section id="stakeholders">
          <StakeholderSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQSection />
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Enhanced Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-32 h-12">
                  <img alt="ReWaya Logo" className="w-full h-full object-contain" src="/lovable-uploads/8c8dba08-616f-46b5-bbc6-c7c874aebf04.png" />
                </div>
              </div>
              <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                Transforming plastic waste into valuable resources across Nigeria. 
                Join us in creating a cleaner, more sustainable future for our communities.
              </p>
              
              {/* Stats in footer */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100K+</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">2.5T+</div>
                  <div className="text-xs text-gray-400">Plastic Recycled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">₦10M+</div>
                  <div className="text-xs text-gray-400">Paid Out</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Link to="/contact" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <a href="#how-it-works" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    FAQ
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3 group hover:text-green-400 transition-colors duration-300">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>support@rewaya.ng</span>
                </div>
                <div className="flex items-center space-x-3 group hover:text-green-400 transition-colors duration-300">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+234 800 REWAYA 1</span>
                </div>
                <div className="flex items-center space-x-3 group hover:text-green-400 transition-colors duration-300">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-400 text-lg">
              © 2024 ReWaya. All rights reserved. 
              <span className="text-green-400 ml-2">Building a sustainable future, one plastic bottle at a time.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </>;
};
export default Index;