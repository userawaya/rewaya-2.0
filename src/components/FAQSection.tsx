import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

  const faqs = [
    {
      question: "How does ReWaya work?",
      answer: "ReWaya connects plastic waste generators with collectors and recyclers through our digital platform. Simply register, collect your plastic waste, request a pickup through our app, and get paid when your waste is collected and verified. Our collectors transport the waste to recycling centers where it's processed into new products."
    },
    {
      question: "What types of plastic do you accept?",
      answer: "We accept most types of recyclable plastics including PET bottles (water, soft drink bottles), HDPE containers (milk jugs, detergent bottles), plastic bags, food containers, and other clean plastic materials. All plastics should be clean and free from food residue. We provide a detailed guide in our app to help you identify acceptable plastic types."
    },
    {
      question: "How do I get paid?",
      answer: "Payments are made directly to your registered mobile money account or bank account within 24-48 hours after your plastic waste is collected and verified. The amount depends on the type, quality, and quantity of plastic you provide. You can track your earnings and payment history through the ReWaya app."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! ReWaya is completely free to join and use. There are no registration fees, subscription charges, or hidden costs. You simply earn money for the plastic waste you provide. Download our app, register your account, and start earning immediately."
    },
    {
      question: "Is there a minimum amount of plastic required?",
      answer: "While there's no strict minimum, we recommend collecting at least 5kg of plastic waste before requesting a pickup to make the collection economically viable for both you and our collectors. However, you can accumulate smaller amounts over time until you reach a reasonable quantity for collection."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-8 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="sm:max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16 font-bricolage">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Got questions?
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            We've the answers
          </h3>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 flex flex-col justify-center m-auto w-[90%] sm:w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border bg-[#F8FFED] border-[#79B426] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-6 lg:px-8 py-6 text-left flex items-center justify-between transition-all duration-300'
                 
              >
                <span className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 transition-all duration-300 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-[#79B426]" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#79B426]" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-6 lg:px-8 pb-6 transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-[#F8FFED]' 
                    : 'bg-white'
                }`}>
                  <p className="text-gray-700 leading-relaxed text-base text-[10px] sm:text-sm lg:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default FAQ;