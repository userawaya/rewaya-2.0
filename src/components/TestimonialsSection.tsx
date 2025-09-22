import React, { useEffect, useRef, useState } from "react";

const Testimonials: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote:
        "ReWaya has completely changed how I think about plastic waste. Instead of throwing bottles away, I now see them as money. The process is so simple and the controllers are always friendly and helpful.",
      name: "Amina Hassan",
      role: "Household Generator",
      location: "Lagos Island",
      avatar: "/avatars/amina.jpg",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "ReWaya has completely changed how I think about plastic waste. Instead of throwing bottles away, I now see them as money. The process is so simple and the controllers are always friendly and helpful.",
      name: "Amina Hassan",
      role: "Household Generator",
      location: "Lagos Island",
      avatar: "/avatars/amina2.jpg",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "ReWaya has transformed our community's approach to waste management. We're not just cleaning our environment, we're also earning from it. It's a win-win situation for everyone involved.",
      name: "Ibrahim Musa",
      role: "Community Collector",
      location: "Abuja",
      avatar: "/avatars/ibrahim.jpg",
      rating: 5,
    },
    {
      id: 4,
      quote:
        "As a recycling business owner, ReWaya has made it so much easier to source quality plastic waste. The platform is efficient and the waste quality is consistently good.",
      name: "Fatima Adebayo",
      role: "Recycling Business Owner",
      location: "Kano",
      avatar: "/avatars/fatima.jpg",
      rating: 5,
    },
    {
      id: 5,
      quote:
        "I've been able to supplement my income by collecting plastic waste in my neighborhood. ReWaya makes the entire process seamless from collection to payment.",
      name: "Chinedu Okoro",
      role: "Independent Collector",
      location: "Port Harcourt",
      avatar: "/avatars/chinedu.jpg",
      rating: 5,
    },
    {
      id: 6,
      quote:
        "The environmental impact of ReWaya is remarkable. We're reducing plastic pollution while creating economic opportunities for communities across Nigeria.",
      name: "Dr. Adeola Johnson",
      role: "Environmental Scientist",
      location: "Ibadan",
      avatar: "/avatars/adeola.jpg",
      rating: 5,
    },
  ];

  // Duplicate testimonials for infinite scroll effect
  const loopedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    let animationFrame: number;
    const speed = 0.5; // adjust for faster/slower slide

    const animate = () => {
      setOffset((prev) => {
        const carouselWidth = carouselRef.current?.scrollWidth || 0;
        if (Math.abs(prev) >= carouselWidth / 2) {
          return 0; // reset when half scrolled (since we duplicated list)
        }
        return prev - speed;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 font-bricolage">
            What Our Community Says
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Real stories from real people earning money while making a positive
            environmental impact through ReWaya.
          </p>
        </div>

        {/* Continuous Slider */}
        <div className="overflow-hidden rounded-2xl ">
          <div
            ref={carouselRef}
            className="flex space-x-6 sm:space-x-12 "
            style={{
              transform: `translateX(${offset}px)`,
              transition: "none",
            }}
          >
            {loopedTestimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#00000033] w-[50%] sm:w-[30%] flex-shrink-0"
              >
                
                <img src='/quotes.png' className="w-7 sm:w-10 h-7 sm:h-10 rounded-full mb-4 object-cover" />
                <div className='flex flex-row w-[12%]'>
                <img src='/stars-2.png' className="w-[7.660799980163574px] sm:w-5 h-[7.660799980163574] sm:h-5 rounded-full mb-4 object-cover mx-auto" />
                <img src='/stars-2.png' className="w-[7.660799980163574px] sm:w-5 h-[7.660799980163574] sm:h-5 rounded-full mb-4 object-cover mx-auto" />
                <img src='/stars-2.png' className="w-[7.660799980163574px] sm:w-5 h-[7.660799980163574] sm:h-5 rounded-full mb-4 object-cover mx-auto" />
                <img src='/stars-2.png' className="w-[7.660799980163574px] sm:w-5 h-[7.660799980163574] sm:h-5 rounded-full mb-4 object-cover mx-auto" />
                <img src='/stars-2.png' className="w-[7.660799980163574px] sm:w-5 h-[7.660799980163574] sm:h-5 rounded-full mb-4 object-cover mx-auto" />
                
                </div>
                <blockquote className="text-gray-700 text-[7.18px] w-[154.37185668945312px] sm:w-full sm:text-[15px] mb-4 leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-[22.982398986816406px] sm:w-12 h-[22.982398986816406px] sm:h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-white text-[4.79px] sm:text-sm font-semibold">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-[7.54px] sm:text-sm">
                      {t.name}
                    </h4>
                    <p className="text-gray-600  text-[6.28px] sm:text-xs">{t.role}</p>
                    <p className="text-gray-500 text-[6.28px] sm:text-xs">{t.location}</p>
                  </div>
                </div>
                </div>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
