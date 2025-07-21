import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play, Recycle, Award, MapPin, TrendingUp, Star, Users, Shield, Volume2, VolumeX } from 'lucide-react';

// Video configuration
const HERO_VIDEOS = [
  {
    id: 1,
    src: '/public/videos/video1.mp4',
    title: 'Plastic Collection',
    description: 'See how easy it is to collect plastic waste'
  },
  {
    id: 2,
    src: '/public/videos/C.mp4',
    title: 'Quality Assessment',
    description: 'Our experts evaluate your plastic waste'
  },
  {
    id: 3,
    src: '/public/videos/video1.mp4',
    title: 'Earn Credits',
    description: 'Watch your credits grow in real-time'
  },
  {
    id: 4,
    src: '/public/videos/B.mp4', // Using B.mp4 as placeholder for 4th video
    title: 'Convert to Cash',
    description: 'Turn your efforts into real money'
  }
];

interface HeroSectionProps {
  onWatchDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onWatchDemo }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-change videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Set the next video index
      const newNextIndex = currentVideoIndex === HERO_VIDEOS.length - 1 ? 0 : currentVideoIndex + 1;
      setNextVideoIndex(newNextIndex);
      
      // Start loading the next video
      if (nextVideoRef.current) {
        nextVideoRef.current.load();
      }
      
      // After a short delay, switch the videos
      setTimeout(() => {
        setCurrentVideoIndex(newNextIndex);
        setIsTransitioning(false);
      }, 1000); // 1 second for transition effect
    }, 120000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [currentVideoIndex]);

  const toggleMute = () => {
    if (videoRef.current && nextVideoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      nextVideoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background with Crossfade Effect */}
      <div className="absolute inset-0 w-full h-full">
        {/* Current Video */}
        <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}>
          <video
            ref={videoRef}
            key={`current-${currentVideoIndex}`}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
          >
            <source src={HERO_VIDEOS[currentVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Next Video (preloading) */}
        <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}>
          <video
            ref={nextVideoRef}
            key={`next-${nextVideoIndex}`}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
          >
            <source src={HERO_VIDEOS[nextVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-[0.5px]" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20 transition-all duration-1000 ${
            isTransitioning ? 'opacity-70' : 'opacity-100'
          }`} />
          
          {/* Animated particles effect during transition */}
          {isTransitioning && (
            <>
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/30 animate-float"
                    style={{
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 3 + 2}s`,
                      animationDelay: `${Math.random() * 1}s`
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-white/10 animate-pulse duration-1000" style={{
                animationDuration: '1s',
                opacity: isTransitioning ? 0.3 : 0
              }} />
            </>
          )}
        </div>
      </div>

      {/* Content (rest of your component remains the same) */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-20 lg:py-32 min-h-screen">
        {/* Mute/Unmute Button */}

      

        {/* Premium badge */}
        <div className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 mb-8 ${
          isTransitioning ? 'animate-pulse scale-105' : 'animate-scale-in'
        }`}>
          <Recycle className="w-5 h-5 mr-2 animate-spin-slow" />
          Nigeria's #1 Circular Economy Platform
          <Star className="w-4 h-4 ml-2 text-yellow-400" />
        </div>

        {/* Enhanced headline */}
        <div className={`space-y-6 mb-8 transition-all duration-700 ${
          isTransitioning ? 'opacity-80 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
            Transform Your 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 animate-glow"> 
              Plastic Waste
            </span> 
            Into Real
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500"> Cash</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-2xl drop-shadow-lg">
            Join <span className="font-bold text-green-400">100,000+ Nigerians</span> earning money while protecting the environment. 
            Our transparent marketplace connects you directly with recyclers for <span className="font-bold text-blue-400">guaranteed fair prices</span>.
          </p>
        </div>

        {/* Enhanced stats with better visual treatment */}
        <div className={`grid grid-cols-3 gap-6 py-6 mb-8 transition-all duration-700 ${
          isTransitioning ? 'opacity-80 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          <div className="text-center group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-200">2.5T+</div>
            <div className="text-sm font-semibold text-white/80 mb-3">Plastic Collected</div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-slide-in-right"></div>
            </div>
          </div>
          <div className="text-center group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">₦10M+</div>
            <div className="text-sm font-semibold text-white/80 mb-3">Total Earnings</div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-slide-in-right" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="text-center group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-200">100K+</div>
            <div className="text-sm font-semibold text-white/80 mb-3">Active Members</div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-slide-in-right" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pt-4 mb-12">
          <button className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xl font-bold px-10 py-8 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group-hover:shadow-green-500/25 border-2 border-green-500/20">
            <Users className="w-6 h-6 mr-3 inline" />
            Start Earning Today
            <ArrowRight className="w-6 h-6 ml-3 inline group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          <button 
            className="text-xl font-semibold px-10 py-8 rounded-2xl border-3 border-white/30 hover:border-green-400 hover:text-green-400 hover:bg-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group bg-white/10 backdrop-blur-md shadow-lg text-white" 
            onClick={onWatchDemo}
          >
            <Play className="w-6 h-6 mr-3 inline group-hover:scale-125 transition-transform duration-300" />
            Watch Demo Video
          </button>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="flex flex-wrap items-center gap-8 pt-6 mb-12">
          <div className="flex items-center text-white/80 group hover:text-green-400 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 shadow-md hover:shadow-lg border border-white/20">
            <Shield className="w-6 h-6 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">Quality Guaranteed</span>
          </div>
          <div className="flex items-center text-white/80 group hover:text-blue-400 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 shadow-md hover:shadow-lg border border-white/20">
            <MapPin className="w-6 h-6 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">5 Lagos Locations</span>
          </div>
          <div className="flex items-center text-white/80 group hover:text-purple-400 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 shadow-md hover:shadow-lg border border-white/20">
            <TrendingUp className="w-6 h-6 mr-3 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">Fast Growing Network</span>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;