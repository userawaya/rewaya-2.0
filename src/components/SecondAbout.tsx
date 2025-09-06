import React from 'react';

const AboutReWaya: React.FC = () => {
  const stats = [
    {
      number: "2.5",
      label: "Tons of Plastic collected",
      unit: ""
    },
    {
      number: "3",
      label: "Collection Centers",
      unit: ""
    },
    {
      number: "150+",
      label: "Active community members",
      unit: ""
    },
    {
      number: "₦50k+",
      label: "Total Payments Made",
      unit: ""
    }
  ];

  return (
    <div className="h-[100%] sm:min-h-screen pb-16 sm:pb-0 bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-6">
            About ReWaya
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-[#777777] max-w-4xl mx-auto leading-relaxed">
            We're building Nigeria's first digital marketplace that transforms plastic waste into 
            economic opportunities while creating a cleaner, more sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Our Story Section */}
          <div className="space-y-6">
            <h2 className="text-sm sm:text-3xl text-[#4B5563] mb-6">
              Our Story
            </h2>
            
            <div className="text-[10px] sm:text-lg space-y-6 text-[#4B5563] leading-relaxed">
              <p>
                ReWaya was born from a simple observation: Nigeria generates over 2.5 million tons of 
                plastic waste annually, yet less than 12% gets recycled. We saw an opportunity to turn this 
                environmental challenge into economic empowerment.
              </p>
              
              <p>
                Starting in Lagos, we've created a digital platform that connects waste generators directly 
                with recyclers, ensuring fair compensation while building a transparent, efficient waste 
                management system.
              </p>
              
              <p>
                Today, ReWaya is more than a platform—it's a movement toward environmental 
                sustainability and economic inclusion across Nigeria.
              </p>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-6 w-[75%]">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-[#F7F7F7] rounded-2xl p-2 sm:p-6  text-center mt-10 sm:mt-0 h-[60%] sm:h-[100%] w-[100%] sm:w-[90%]"
              >
                <div className="text-[12px] sm:text-3xl md:text-4xl font-bold font-bricolage text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-[7px] sm:text-sm md:text-base text-black leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutReWaya;