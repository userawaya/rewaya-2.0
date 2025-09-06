
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingContextType {
  isOnboarding: boolean;
  currentStep: number;
  totalSteps: number;
  userRole: string;
  startOnboarding: (role: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userRole, setUserRole] = useState('generator');
  const [totalSteps, setTotalSteps] = useState(4);

  // Check if user needs onboarding on mount
  useEffect(() => {
    if (user && !localStorage.getItem('onboarding_completed')) {
      const role = user.user_metadata?.role || 'generator';
      startOnboarding(role);
    }
  }, [user]);

  const startOnboarding = (role: string) => {
    setUserRole(role);
    setCurrentStep(0);
    setTotalSteps(getRoleStepCount(role));
    setIsOnboarding(true);
  };

  const getRoleStepCount = (role: string) => {
    switch (role) {
      case 'generator': return 4;
      case 'controller': return 5;
      case 'driver': return 4;
      case 'recycler': return 4;
      default: return 4;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsOnboarding(false);
    setCurrentStep(0);
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsOnboarding(false);
    setCurrentStep(0);
  };

  const value = {
    isOnboarding,
    currentStep,
    totalSteps,
    userRole,
    startOnboarding,
    nextStep,
    prevStep,
    completeOnboarding,
    skipOnboarding
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
