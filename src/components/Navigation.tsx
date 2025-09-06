import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const Navigation: React.FC = () => {
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
    <nav className="w-full  px-6 py-4 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/lovable-uploads/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8 p-[1.3px] bg-gradient-to-r from-[#79B426] to-[#79B4261A] rounded-lg">
            <div className="bg-white bg-transparent rounded-lg backdrop-blur-sm px-6 py-2 flex items-center space-x-16">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#1E6718] text-lg font-semibold transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
          </div>

          {/* Get Started Button - Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="/get-started"
              className="bg-gradient-to-r text-lg from-[#79B4261A]  to-[#79B426] text-[#1D3B00] px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <a
              href="/get-started"
              className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-green-800 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            >
              Get Started
            </a>
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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
  );
};

export default Navigation;