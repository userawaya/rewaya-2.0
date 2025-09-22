import React from 'react';

const OurValues: React.FC = () => {
  const values = [
    {
      iconSrc: "/firstIcon.png", // or .png
      iconAlt: "Mission-Driven icon",
      title: "Mission-Driven",
      description: "Creating a sustainable circular economy for plastic waste across Nigeria."
    },
    {
      iconSrc: "/Environment.png", // or .png
      iconAlt: "Environmental Impact icon",
      title: "Environmental Impact",
      description: "Reducing plastic pollution while creating economic opportunities for communities."
    },
    {
      iconSrc: "/Community.png", // or .png
      iconAlt: "Community-Focused icon",
      title: "Community-Focused",
      description: "Empowering waste generators, collectors, and recyclers through fair compensation."
    },
    {
      iconSrc: "/Innovation.png", // or .png
      iconAlt: "Innovation icon",
      title: "Innovation",
      description: "Empowering waste generators, collectors, and recyclers through fair compensation."
    }
  ];

  return (
    <section className="mb-4 sm:mb-0 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            Our Values
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ReWaya connects all stakeholders in the plastic waste value chain, creating opportunities for 
            everyone to participate and benefit.
          </p>
        </div>

        {/* Values Grid */}
        <div className="flex flex-col w-[30%] mx-auto sm:w-[100%] sm:grid sm:grid-cols-4 gap-4 sm:gap-8">
          {values.map((value, index) => {
            return (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-2xl p-2 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-center group"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-8 sm:w-16 h-8 sm:h-16 ">
                  <img 
                    src={value.iconSrc}
                    alt={value.iconAlt}
                    width={32}
                    height={32}
                    className="w-4 sm:w-8 h-4 sm:h-8"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[6px] sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[4px] sm:text-lg text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;