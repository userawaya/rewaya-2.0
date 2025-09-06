
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Shield, 
  Truck, 
  Recycle,
  CheckCircle,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { useOnboarding } from './OnboardingProvider';

const roleIcons = {
  generator: Users,
  controller: Shield,
  driver: Truck,
  recycler: Recycle
};

const roleColors = {
  generator: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  controller: 'bg-amber-100 text-amber-700 border-amber-200',
  driver: 'bg-sky-100 text-sky-700 border-sky-200',
  recycler: 'bg-purple-100 text-purple-700 border-purple-200'
};

const OnboardingModal = () => {
  const { 
    isOnboarding, 
    currentStep, 
    totalSteps, 
    userRole, 
    nextStep, 
    prevStep, 
    completeOnboarding, 
    skipOnboarding 
  } = useOnboarding();

  if (!isOnboarding) return null;

  const RoleIcon = roleIcons[userRole as keyof typeof roleIcons] || Users;
  const roleColorClass = roleColors[userRole as keyof typeof roleColors];

  const getStepContent = () => {
    const baseSteps = [
      {
        title: `Welcome to ReWaya!`,
        content: (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-full ${roleColorClass}`}>
                <RoleIcon className="w-8 h-8" />
              </div>
            </div>
            <p className="text-gray-600 text-center">
              You've successfully joined as a <Badge variant="secondary" className={roleColorClass}>{userRole}</Badge>
            </p>
            <p className="text-gray-600 text-center">
              Let's take a quick tour to help you get started with the platform and maximize your impact in the plastic waste management ecosystem.
            </p>
          </div>
        )
      }
    ];

    const roleSpecificSteps = getRoleSpecificSteps();
    const finalStep = {
      title: "You're All Set!",
      content: (
        <div className="space-y-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <p className="text-gray-600">
            Congratulations! You've completed the onboarding process. You're now ready to start making a difference in plastic waste management.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-medium">Pro Tip:</p>
            <p className="text-green-600 text-sm">
              Explore all the features in your dashboard and don't hesitate to switch roles to understand the complete ecosystem.
            </p>
          </div>
        </div>
      )
    };

    const allSteps = [...baseSteps, ...roleSpecificSteps, finalStep];
    return allSteps[currentStep] || allSteps[0];
  };

  const getRoleSpecificSteps = () => {
    switch (userRole) {
      case 'generator':
        return [
          {
            title: "Submit Plastic Waste",
            content: (
              <div className="space-y-4">
                <Target className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-gray-600">
                  As a Generator, you can submit plastic waste to collection centers and earn credits for your contributions.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-emerald-700 text-sm">
                    • Take photos of your plastic waste<br/>
                    • Select the nearest collection center<br/>
                    • Track your environmental impact
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Track Your Impact",
            content: (
              <div className="space-y-4">
                <Zap className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-gray-600">
                  Monitor your environmental contributions and see how your efforts are making a difference.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-emerald-700 text-sm">
                    • View your total waste submitted<br/>
                    • See your carbon footprint reduction<br/>
                    • Earn and track your eco-credits
                  </p>
                </div>
              </div>
            )
          }
        ];
      
      case 'controller':
        return [
          {
            title: "Manage Collection Centers",
            content: (
              <div className="space-y-4">
                <Shield className="w-12 h-12 text-amber-600 mx-auto" />
                <p className="text-gray-600">
                  As a Controller, you manage waste intake at collection centers and ensure quality standards.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-amber-700 text-sm">
                    • Assess incoming waste quality<br/>
                    • Manage center inventory<br/>
                    • Coordinate with drivers for pickups
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Quality Assessment",
            content: (
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 text-amber-600 mx-auto" />
                <p className="text-gray-600">
                  Ensure all plastic waste meets recycling standards through proper assessment and sorting.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-amber-700 text-sm">
                    • Use assessment forms<br/>
                    • Categorize plastic types<br/>
                    • Maintain quality records
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Coordinate Logistics",
            content: (
              <div className="space-y-4">
                <Truck className="w-12 h-12 text-amber-600 mx-auto" />
                <p className="text-gray-600">
                  Work with drivers to ensure timely pickup and delivery to recycling facilities.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-amber-700 text-sm">
                    • Schedule pickup requests<br/>
                    • Monitor inventory levels<br/>
                    • Track delivery status
                  </p>
                </div>
              </div>
            )
          }
        ];
      
      case 'driver':
        return [
          {
            title: "Optimize Your Routes",
            content: (
              <div className="space-y-4">
                <Truck className="w-12 h-12 text-sky-600 mx-auto" />
                <p className="text-gray-600">
                  As a Driver, you'll transport plastic waste from collection centers to recycling facilities efficiently.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <p className="text-sky-700 text-sm">
                    • View optimized pickup routes<br/>
                    • Accept pickup requests<br/>
                    • Track delivery progress
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Manage Deliveries",
            content: (
              <div className="space-y-4">
                <Target className="w-12 h-12 text-sky-600 mx-auto" />
                <p className="text-gray-600">
                  Keep track of your deliveries and earnings while contributing to the circular economy.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <p className="text-sky-700 text-sm">
                    • Update delivery status<br/>
                    • Track your earnings<br/>
                    • View performance metrics
                  </p>
                </div>
              </div>
            )
          }
        ];
      
      case 'recycler':
        return [
          {
            title: "Browse Quality Materials",
            content: (
              <div className="space-y-4">
                <Recycle className="w-12 h-12 text-purple-600 mx-auto" />
                <p className="text-gray-600">
                  As a Recycler, you can browse and purchase high-quality sorted plastic materials.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-700 text-sm">
                    • Browse available materials<br/>
                    • Check quality assessments<br/>
                    • Place bulk orders
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Track Your Supply Chain",
            content: (
              <div className="space-y-4">
                <Zap className="w-12 h-12 text-purple-600 mx-auto" />
                <p className="text-gray-600">
                  Monitor your orders and maintain a steady supply of recycling materials.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-700 text-sm">
                    • Track order status<br/>
                    • Monitor inventory levels<br/>
                    • View supply analytics
                  </p>
                </div>
              </div>
            )
          }
        ];
      
      default:
        return [];
    }
  };

  const stepContent = getStepContent();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Getting Started</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={skipOnboarding}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">{stepContent.title}</h3>
            {stepContent.content}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button 
              variant="ghost"
              onClick={skipOnboarding}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </Button>

            <Button onClick={nextStep}>
              {currentStep === totalSteps - 1 ? (
                <>
                  Get Started
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
