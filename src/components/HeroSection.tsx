import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const HeroSection: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Testimonial', href: '/testimonial' },
    { label: 'FAQs', href: '/faqs' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  return (
    <div className="sm:h-[80%] w-full bg-gradient-to-b from-[#96DA354D] via-[#E7FFC500] to-[#E7FFC500] pt-9 overflow-hidden">
      {/* Navigation */}
      <nav className="w-full px-6 py-4">
        <div className="w-[90%] sm:max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
             <img src="/lovable-uploads/logo.png" alt="Logo" className="h-8 sm:h-8 w-auto" />
          </div>

            {/* Desktop Navigation Items */}
             <div className="hidden md:flex items-center space-x-8 px-[1.5px] p-[1px] bg-gradient-to-r from-[#79B426] to-[#79B4261A] rounded-lg">
              <div className="bg-[#f7ffddee] rounded-lg backdrop-blur-sm px-6 py-2 flex items-center space-x-20">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[#1E6718] text-lg font-semilight transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              </div>
            </div>

            {/* Get Started Button - Desktop */}
            <div className=" items-center">
            <button className="bg-[#000000] hover:bg-gray-800 text-white px-3 py-3 hidden sm:flex rounded-2xl font-semibold sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl items-center gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                </div>
              </span>
              Get started for free
            </button>
          </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* <a
                href="/get-started"
                className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-green-800 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              >
                Get Started
              </a> */}
              <button 
                onClick={toggleMobileMenu}
                className="text-black"
              >
                <svg className="h-10 w-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 py-2 border-b border-green-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 px-6 py-12 md:py-20">
        <div className=" max-w-4xl mx-auto text-center">
          {/* Hero Headline */}
          <h1 className="flex flex-col justify-center items-center m-auto w-[80%] sm:w-[90%] font-bricolage text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Transform Your Plastic
            <br />
            <span className="text-[#79B426]">
              Waste Into Real Cash
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join 100,000+ Nigerians earning money while protecting the environment. Our transparent 
            marketplace connects you directly with recyclers for guaranteed fair prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <button className="bg-[#000000] hover:bg-gray-800 text-white px-3 py-3 rounded-2xl font-semibold sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                </div>
              </span>
              Get started for free
            </button>

            <button className="bg-white h-16 hover:bg-gray-50 w-[60%] sm:w-[20%] text-gray-700 border-2 px-2 text-[14px] border-[#0F0F0F] rounded-2xl font-semibold text-lg transition-all duration-200 shadow-sm hover:shadow-md flex justify-center gap-4 items-center">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded">
                <img src='/play.png' className='w-[14px] h-[14px]'></img>
              </span>
              How It Works
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;