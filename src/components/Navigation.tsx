import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const {
    user,
    signOut
  } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'how-it-works', 'stakeholders', 'about', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };
  const navItems = [{
    id: 'hero',
    label: 'Home'
  }, {
    id: 'how-it-works',
    label: 'How It Works'
  }, {
    id: 'stakeholders',
    label: 'Who We Serve'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'testimonials',
    label: 'Testimonials'
  }, {
    id: 'faq',
    label: 'FAQ'
  }];

  // Get user's name or email for display
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };
  return <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer transform transition-transform hover:scale-105" onClick={() => scrollToSection('hero')}>
            <div className="w-24 h-6 sm:w-28 sm:h-9">
              <img alt="ReWaya Logo" className="w-full h-full object-contain" src="/lovable-uploads/adc5a49d-a045-4e8f-b8d2-c60e7bdc415e.png" />
            </div>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className={`relative font-medium transition-all duration-300 hover:text-green-600 ${activeSection === item.id ? 'text-green-600' : 'text-gray-700'}`}>
                {item.label}
                {activeSection === item.id && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full animate-fade-in" />}
              </button>)}
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? <div className="flex items-center space-x-4">
                {/* User Profile Dropdown */}
                <div className="relative profile-dropdown">
                  <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                      {getUserDisplayName()}
                    </span>
                  </button>

                  {isProfileDropdownOpen && <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-scale-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileDropdownOpen(false)}>
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button onClick={handleSignOut} className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>}
                </div>
              </div> : <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600 transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 transition-transform duration-200 hover:scale-110" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-100 py-4 animate-slide-up">
            <div className="space-y-4">
              {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left px-4 py-2 font-medium transition-colors ${activeSection === item.id ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`}>
                  {item.label}
                </button>)}
              
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-100">
                {user ? <>
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-green-600">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </Button>
                  </> : <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-700 hover:text-green-600">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>;
};

export default Navigation;
