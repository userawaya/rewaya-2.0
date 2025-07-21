
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does ReWaya work?",
      answer: "ReWaya connects waste generators with recyclers through our digital platform. You bring sorted plastic waste to our collation centers, get it weighed and quality-assessed by our trained controllers, earn credits based on weight and quality, and convert those credits to cash monthly."
    },
    {
      question: "What types of plastic do you accept?",
      answer: "We accept clean PET bottles, plastic containers, packaging materials, and other recyclable plastics. Our controllers assess quality based on cleanliness, contamination levels, and plastic type. Higher quality materials earn more credits per kilogram."
    },
    {
      question: "How much can I earn with ReWaya?",
      answer: "Earnings depend on the quantity and quality of plastic you bring. On average, active generators earn ₦2,000-₦8,000 monthly. Our top contributors can earn even more. Quality matters - cleaner, well-sorted materials get better rates."
    },
    {
      question: "Where are your collation centers located?",
      answer: "We currently operate 3 collation centers across Lagos Island, with plans to expand to Victoria Island and Ikoyi. You can find the nearest center using our app's location feature."
    },
    {
      question: "How do I get paid?",
      answer: "Credits are converted to cash through monthly payouts. You can track your earnings through our app and receive payments via mobile money, bank transfer, or cash pickup at collation centers."
    },
    {
      question: "Is there a minimum amount of plastic required?",
      answer: "No minimum requirement! Whether you bring 1kg or 100kg, every contribution counts. However, larger quantities are more cost-effective to process and may receive better rates."
    },
    {
      question: "How do you ensure fair pricing?",
      answer: "Our pricing is transparent and based on current market rates for recycled materials. All weighing and quality assessment follows standardized procedures, and you receive a detailed breakdown of your credits."
    },
    {
      question: "Can businesses participate in ReWaya?",
      answer: "Absolutely! We have corporate partnership programs for businesses, schools, and institutions. Corporate partners can participate in our CSR programs and contribute to their sustainability goals while earning credits."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about ReWaya. Can't find what you're looking for? 
            Contact our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
