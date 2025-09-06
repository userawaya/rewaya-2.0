
import React from 'react';
import IntersectionObserver from './IntersectionObserver';
import ActionTile from './ActionTile';
import { 
  Users, 
  Shield, 
  Truck, 
  Recycle,
  Building,
  Heart,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const StakeholderSection: React.FC = () => {
  const stakeholders = [
    {
      icon: Users,
      title: "Waste Generators",
      description: "Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.",
      variant: "generator" as const,
      stats: "150+ Active Generators",
      earning: "₦2,500/month avg"
    },
    {
      icon: Shield,
      title: "Collation Controllers",
      description: "Trained staff managing intake, quality assessment, weighing, and sorting at our verified collation centers.",
      variant: "controller" as const,
      stats: "3 Collation Centers",
      earning: "₦45,000/month"
    },
    {
      icon: Truck,
      title: "Pickup Drivers",
      description: "Professional drivers handling transport from collation centers to recycling facilities with optimized routes.",
      variant: "driver" as const,
      stats: "5+ Active Drivers",
      earning: "₦38,000/month"
    },
    {
      icon: Recycle,
      title: "Recyclers",
      description: "Partner companies purchasing quality-assured plastic materials for conversion into new products.",
      variant: "recycler" as const,
      stats: "3 Partner Recyclers",
      earning: "15% cost savings"
    },
    {
      icon: Building,
      title: "Corporate Partners",
      description: "Institutions and businesses participating in our sustainability program for CSR and environmental impact.",
      variant: "admin" as const,
      stats: "10+ Corporate Partners",
      earning: "ESG compliance"
    },
    {
      icon: Heart,
      title: "Community Advocates",
      description: "Local champions and environmental activists promoting plastic waste awareness and sustainable practices.",
      variant: "generator" as const,
      stats: "25+ Community Leaders",
      earning: "Social impact"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <IntersectionObserver className="text-center mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-green-700 font-semibold border border-green-200 shadow-lg mb-6">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Trusted Ecosystem
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Who We
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Serve</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium mb-8">
              ReWaya connects all stakeholders in the plastic waste value chain, 
              creating opportunities for everyone to participate and benefit.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center px-4 py-2 bg-green-100/80 text-green-700 rounded-xl font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                100% Transparent
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-100/80 text-blue-700 rounded-xl font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Fair Pricing
              </div>
              <div className="flex items-center px-4 py-2 bg-purple-100/80 text-purple-700 rounded-xl font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Verified Partners
              </div>
            </div>
          </div>
        </IntersectionObserver>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {stakeholders.map((stakeholder, index) => (
            <IntersectionObserver 
              key={index} 
              className="transition-all duration-500"
              animationClass="animate-fade-up opacity-100"
              threshold={0.05}
            >
              <div style={{ animationDelay: `${index * 0.1}s` }} className="h-full">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 group cursor-pointer h-full hover:scale-[1.02]">
                  {/* Enhanced ActionTile content */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-all duration-300 group-hover:scale-110 ${
                      stakeholder.variant === 'generator' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 border-emerald-300' :
                      stakeholder.variant === 'controller' ? 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 border-amber-300' :
                      stakeholder.variant === 'driver' ? 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600 border-sky-300' :
                      stakeholder.variant === 'recycler' ? 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 border-purple-300' :
                      'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 border-slate-300'
                    }`}>
                      <stakeholder.icon className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {stakeholder.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">
                        {stakeholder.stats}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {stakeholder.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600 font-bold">
                      <span className="text-sm mr-1">Earning:</span>
                      <span>{stakeholder.earning}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </IntersectionObserver>
          ))}
        </div>

        {/* Enhanced Call to Action Section */}
        <IntersectionObserver className="text-center">
          <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-3xl p-12 max-w-5xl mx-auto shadow-2xl border border-white/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-green-100/80 text-green-700 rounded-full font-semibold mb-6">
                <Heart className="w-5 h-5 mr-2" />
                Join Our Growing Community
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Join the 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> ReWaya Revolution?</span>
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you generate plastic waste, manage operations, transport materials, 
                or recycle products - there's a profitable place for you in our sustainable ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl font-bold hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg border-2 border-green-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 mr-3" />
                  Join as Generator
                  <ArrowRight className="w-5 h-5 ml-3" />
                </button>
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
                  <Building className="w-6 h-6 mr-3" />
                  Partner with Us
                  <ArrowRight className="w-5 h-5 ml-3" />
                </button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-medium">Free to join</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-medium">Start earning immediately</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-medium">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default StakeholderSection;
