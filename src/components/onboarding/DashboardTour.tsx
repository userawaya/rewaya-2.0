
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface DashboardTourProps {
  isActive: boolean;
  onComplete: () => void;
  steps: TourStep[];
}

const DashboardTour: React.FC<DashboardTourProps> = ({ isActive, onComplete, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.position = 'relative';
        element.style.zIndex = '1000';
        element.style.border = '2px solid #10b981';
        element.style.borderRadius = '8px';
        element.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.2)';
      }
    }

    return () => {
      if (targetElement) {
        targetElement.style.border = '';
        targetElement.style.borderRadius = '';
        targetElement.style.boxShadow = '';
        targetElement.style.zIndex = '';
      }
    };
  }, [currentStep, isActive, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    if (targetElement) {
      targetElement.style.border = '';
      targetElement.style.borderRadius = '';
      targetElement.style.boxShadow = '';
      targetElement.style.zIndex = '';
    }
    onComplete();
  };

  if (!isActive || !steps[currentStep] || !targetElement) return null;

  const step = steps[currentStep];
  const rect = targetElement.getBoundingClientRect();
  
  const getTooltipPosition = () => {
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const spacing = 16;

    switch (step.position) {
      case 'top':
        return {
          top: rect.top - tooltipHeight - spacing,
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2)
        };
      case 'bottom':
        return {
          top: rect.bottom + spacing,
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2)
        };
      case 'left':
        return {
          top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
          left: rect.left - tooltipWidth - spacing
        };
      case 'right':
        return {
          top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
          left: rect.right + spacing
        };
      default:
        return {
          top: rect.bottom + spacing,
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2)
        };
    }
  };

  const position = getTooltipPosition();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-[999]" onClick={completeTour} />
      
      {/* Tour Tooltip */}
      <Card 
        className="fixed z-[1001] w-80 shadow-xl"
        style={{
          top: Math.max(16, position.top),
          left: Math.max(16, Math.min(window.innerWidth - 336, position.left))
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={completeTour}
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm mb-6">{step.content}</p>

          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <span className="text-xs text-gray-400">
              {currentStep + 1} / {steps.length}
            </span>

            <Button 
              size="sm"
              onClick={nextStep}
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardTour;
