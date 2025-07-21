
import React from 'react';
import { 
  Target, 
  Globe, 
  Users, 
  Lightbulb,
  Award,
  TrendingUp
} from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Creating a sustainable circular economy for plastic waste across Nigeria."
    },
    {
      icon: Globe,
      title: "Environmental Impact",
      description: "Reducing plastic pollution while creating economic opportunities for communities."
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Empowering waste generators, collectors, and recyclers through fair compensation."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging technology to solve Africa's most pressing environmental challenges."
    }
  ];

  const stats = [
    { number: "2.5", label: "Tons Plastic Collected", suffix: "" },
    { number: "150", label: "Active Community Members", suffix: "+" },
    { number: "3", label: "Collation Centers", suffix: "" },
    { number: "₦50k", label: "Total Payments Made", suffix: "+" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About ReWaya
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building Nigeria's first digital marketplace that transforms plastic waste 
            into economic opportunities while creating a cleaner, more sustainable future.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ReWaya was born from a simple observation: Nigeria generates over 2.5 million tons 
                of plastic waste annually, yet less than 12% gets recycled. We saw an opportunity 
                to turn this environmental challenge into economic empowerment.
              </p>
              <p>
                Starting in Lagos, we've created a digital platform that connects waste generators 
                directly with recyclers, ensuring fair compensation while building a transparent, 
                efficient waste management system.
              </p>
              <p>
                Today, ReWaya is more than a platform—it's a movement toward environmental 
                sustainability and economic inclusion across Nigeria.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center space-y-4 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Our Vision for 2030
            </h3>
            <p className="text-lg text-green-100 leading-relaxed">
              To become West Africa's leading circular economy platform, processing 100,000 tons 
              of plastic waste annually while creating sustainable livelihoods for 50,000 Nigerians 
              across the waste value chain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
