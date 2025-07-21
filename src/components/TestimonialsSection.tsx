
import React from 'react';
import { Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amina Hassan",
      location: "Lagos Island",
      role: "Household Generator",
      avatar: "🌟",
      rating: 5,
      earnings: "₦5,200",
      period: "last month",
      quote: "ReWaya has completely changed how I think about plastic waste. Instead of throwing bottles away, I now see them as money. The process is so simple and the controllers are always friendly and helpful.",
      highlight: "Earned over ₦15,000 in 3 months"
    },
    {
      id: 2,
      name: "David Okafor",
      location: "Victoria Island",
      role: "Estate Manager",
      avatar: "🏢",
      rating: 5,
      earnings: "₦32,500",
      period: "last month",
      quote: "Managing plastic waste for our 200-unit estate was a nightmare until we partnered with ReWaya. Now residents are motivated to sort their waste, and we're earning money while helping the environment.",
      highlight: "Reduced estate waste by 70%"
    },
    {
      id: 3,
      name: "Fatima Abdullahi",
      location: "Ikoyi",
      role: "Small Business Owner",
      avatar: "💼",
      rating: 5,
      earnings: "₦8,900",
      period: "last month",
      quote: "As a restaurant owner, we generate a lot of plastic packaging. ReWaya makes it easy to turn this waste into extra income. The pickup service is reliable and the payments are always on time.",
      highlight: "Zero plastic waste to landfill"
    },
    {
      id: 4,
      name: "Ahmed Ibrahim",
      location: "Lagos Mainland",
      role: "Community Leader",
      avatar: "👨‍💼",
      rating: 5,
      earnings: "₦18,700",
      period: "last month",
      quote: "I organize my community to participate in ReWaya. We've created a local collection point and everyone brings their plastic here. It's brought our community together while earning us money.",
      highlight: "Organized 50+ households"
    },
    {
      id: 5,
      name: "Grace Nkem",
      location: "Surulere",
      role: "Teacher & Environmental Advocate",
      avatar: "👩‍🏫",
      rating: 5,
      earnings: "₦6,800",
      period: "last month",
      quote: "ReWaya helps me teach my students about environmental responsibility while earning extra income. The transparency and fair pricing make it trustworthy for families like mine.",
      highlight: "Teaching sustainability through action"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people earning money while making a positive 
            environmental impact through ReWaya.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Quote Icon */}
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Quote className="w-6 h-6 text-green-600" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Highlight */}
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="text-sm font-semibold text-green-700">
                        {testimonial.highlight}
                      </div>
                    </div>

                    {/* Earnings */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {testimonial.earnings}
                      </div>
                      <div className="text-sm text-blue-600">
                        earned {testimonial.period}
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">₦87k+</div>
            <div className="text-gray-600">Total Earned by Community</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">Happy Generators</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
