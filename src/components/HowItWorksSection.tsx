
import React from 'react';
import IntersectionObserver from './IntersectionObserver';
import { 
  Users, 
  Shield, 
  Award, 
  Truck, 
  MapPin,
  Recycle,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: MapPin,
      title: "Bring Your Plastic",
      description: "Take sorted plastic waste to your nearest collation center. Clean PET bottles, containers, and packaging materials are accepted.",
      color: "emerald",
      highlight: "Start earning today"
    },
    {
      icon: Shield,
      title: "Quality Assessment", 
      description: "Our trained controllers weigh, sort, and assess the quality of your plastic materials using standardized grading criteria.",
      color: "amber",
      highlight: "Fair evaluation"
    },
    {
      icon: Award,
      title: "Earn Credits",
      description: "Receive credits based on weight, plastic type, and quality score. Higher quality materials earn more credits per kilogram.",
      color: "green",
      highlight: "Instant rewards"
    },
    {
      icon: Truck,
      title: "Pickup & Transport",
      description: "Our drivers collect sorted plastic from collation centers and transport it to partner recycling facilities with full traceability.",
      color: "blue",
      highlight: "Seamless logistics"
    },
    {
      icon: Recycle,
      title: "Recycling Process",
      description: "Partner facilities process the plastic waste into new products, completing the circular economy loop and generating environmental impact.",
      color: "teal",
      highlight: "Environmental impact"
    },
    {
      icon: Users,
      title: "Monthly Cashout",
      description: "Convert your accumulated credits to cash through monthly payouts. Track your impact and earnings through our mobile app.",
      color: "purple",
      highlight: "Real money"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'text-emerald-600 bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-300',
      amber: 'text-amber-600 bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300',
      green: 'text-green-600 bg-gradient-to-br from-green-100 to-green-200 border-green-300',
      blue: 'text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300',
      teal: 'text-teal-600 bg-gradient-to-br from-teal-100 to-teal-200 border-teal-300',
      purple: 'text-purple-600 bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300';
  };

  const getBackgroundClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      amber: 'bg-gradient-to-br from-amber-50 to-amber-100',
      green: 'bg-gradient-to-br from-green-50 to-green-100',
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
      teal: 'bg-gradient-to-br from-teal-50 to-teal-100',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gradient-to-br from-gray-50 to-gray-100';
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <IntersectionObserver className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How ReWaya
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Works</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
              Our simple 6-step process connects waste generators with recyclers, 
              creating value for everyone while protecting the environment.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-semibold border border-gray-200 shadow-lg">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Trusted by 100,000+ Nigerians
              </div>
            </div>
          </div>
        </IntersectionObserver>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <IntersectionObserver 
                key={index}
                animationClass="animate-fade-up hover-lift opacity-100"
                className="transition-all duration-500"
                threshold={0.05}
              >
                <div 
                  className={`relative ${getBackgroundClasses(step.color)} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 border-white/50 hover:border-white/80 backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number with enhanced design */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-white">
                    {index + 1}
                  </div>

                  {/* Highlight badge */}
                  <div className="absolute -top-3 -right-3 bg-white text-gray-700 px-3 py-1 rounded-xl text-sm font-semibold shadow-lg border border-gray-200">
                    {step.highlight}
                  </div>

                  {/* Icon with enhanced styling */}
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 border-2 shadow-lg ${getColorClasses(step.color)}`}>
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Content with better typography */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {step.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-gray-500 group-hover:text-green-600 transition-colors">
                    <span className="text-sm font-semibold mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </IntersectionObserver>
            );
          })}
        </div>

        {/* Enhanced Process Flow Visualization */}
        <IntersectionObserver className="mt-20">
          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Transparency, Maximum Impact
              </h3>
              <p className="text-xl text-gray-600">
                Track your plastic from collection to recycling with full blockchain verification
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Collection</h4>
                  <p className="text-gray-600">Verified collection centers</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-gray-400 hidden lg:block" />
                
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Assessment</h4>
                  <p className="text-gray-600">Quality verification</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-gray-400 hidden lg:block" />
                
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Transport</h4>
                  <p className="text-gray-600">Secure logistics</p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-gray-400 hidden lg:block" />
                
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Recycle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Recycling</h4>
                  <p className="text-gray-600">New product creation</p>
                </div>
              </div>
            </div>
          </div>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default HowItWorksSection;
