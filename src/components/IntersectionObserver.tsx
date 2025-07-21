
import React, { useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

const IntersectionObserver: React.FC<IntersectionObserverProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  animationClass = 'animate-fade-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasObserver, setHasObserver] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.log('IntersectionObserver not supported, showing content immediately');
      setIsVisible(true);
      return;
    }

    setHasObserver(true);

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        console.log('Intersection entry:', entry.isIntersecting, entry.target);
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      console.log('Starting to observe element:', currentElement);
      observer.observe(currentElement);
    }

    // Fallback: show content after 2 seconds if not yet visible
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log('Fallback triggered: showing content after timeout');
        setIsVisible(true);
      }
    }, 2000);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      clearTimeout(fallbackTimer);
    };
  }, [threshold, rootMargin, isVisible]);

  // For unsupported browsers or as fallback, show content immediately
  const shouldShowContent = !hasObserver || isVisible;

  return (
    <div
      ref={elementRef}
      className={`${className} ${shouldShowContent ? animationClass : 'opacity-0'}`}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default IntersectionObserver;
