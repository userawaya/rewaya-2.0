import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center w-full pb-10 sm:py-16 bg-white px-4'>
      <div className='w-[88%] sm:w-[50%] mt-[45px] sm:mt-[30px]'>
        <h1 className='font-bricolage font-bold text-black text-[26.81px] leading-[100%] sm:text-[56px] mb-[35px] sm:mb-[60px]'>Complete Transparency, <span className='text-[#79B426]'>Maximum Impact</span></h1>
      </div>
      
      {/* First Row */}
      <div className='flex flex-col lg:flex-row gap-4 w-full lg:w-[85%] justify-center items-center'>
        {/* Bring Your Plastic Card */}
        <div className='relative w-full sm:w-[90%] lg:w-[58%] h-[150px] sm:h-[270px] flex bg-[rgb(121,180,38)] rounded-[20px] border border-[#1E671833] overflow-hidden'>
          <div className='w-[55%] lg:w-[50%] ml-[30px] mt-[30px] text-[#FFFFFF] z-10'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px] leading-[100%] text-left'>Bring Your Plastic</h1>
            <p className='w-full text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] text-left mt-[5px] sm:mt-[15px]'>
              Take sorted plastic waste to your nearest collation center. 
              Clean PET bottles, containers, and packaging materials are accepted.
            </p>
          </div>
          <div className='absolute right-0 bottom-0 w-[45%] lg:w-[50%] h-full flex items-end justify-end'>
            <img 
              src='/waste.png' 
              className='w-full h-auto max-h-[90%] object-contain rounded-[18px]'
              alt='Plastic waste'
            />
          </div>
        </div>
        
        {/* Quality Assessment Card */}
        <div className='w-full sm:w-[90%] lg:w-[42%] h-[150px] sm:h-[270px] rounded-[20px] border-[1px] border-[rgba(103,78,24,0.2)] bg-[#F5E5BC] overflow-hidden'>
          <div className='w-[65%] mt-[15.89px] sm:mt-[30px] ml-[20.63px] sm:ml-[30px] text-left'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px] text-[rgb(103,78,24)] font-medium'>Quality Assessment</h1>
            <p className='text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] text-[#674E18] text-left w-[70%]'>
              Our trained controllers weigh, sort, and assess the quality of your plastic materials
              using standardized grading criteria.
            </p>
          </div>
          <div className='flex flex-wrap justify-end mt-2 sm:mt-4 ml-[60px] sm:ml-[30px] gap-1 sm:gap-2'>
            <img src='/slide-1.png' className='w-[44%] sm:w-[65%] h-[28.151432037353516px] sm:h-[49.557762145996094px]' alt='Quality assessment' />
            <img src='/slide-2.png' className='hidden sm:block w-[20%] h-[49.557762145996094px]' alt='Quality assessment' />
            <img src='/slide-2.1.png' className='block sm:hidden w-[44%] h-[28.151432037353516px]' alt='Quality assessment' />
            </div>
            <div className='flex flex-wrap justify-end mt-2 sm:mt-2 ml-[20px] sm:ml-[85px] gap-1 sm:gap-2'>
            <img src='/slide-3.png' className='w-[35%] sm:w-[65%] h-[28.151432037353516px] sm:h-[49.557762145996094px]'  alt='Quality assessment' />
            <img src='/slide-4.png' className='hidden sm:block w-[12%] max-w-[161px] h-[49.557762145996094px]' alt='Quality assessment' />
            <img src='/slide-3.1.png' className='block sm:hidden w-[35%] max-w-[161px] h-[28.151432037353516px] sm:h-[49.557762145996094px]' alt='Quality assessment' />
        </div>
        </div>
      </div>

      {/* Second Row */}
      <div className='flex flex-col lg:flex-row gap-4 w-full lg:w-[85%] justify-center items-center mt-4'>
        {/* Earn Credits Card */}
        <div className='bg-[#FFFFFF] w-full sm:w-[90%] lg:w-[42%] h-[150px] sm:h-[270px] rounded-[20px] border border-[#00000033] p-6'>
          <div className='w-[55%] mt-[15px] sm:mt-[30px] text-left'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px] leading-[100%] text-left'>Earn Credits</h1>
            <p className='w-full text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] text-left mt-[5px] sm:mt-[15px]'>
              Receive credits based on weight, plastic type, and quality score. Higher quality
              materials earn more credits per kilogram.
            </p>
          </div>
        </div>

        {/* Pickup & Transport Card */}
        <div className='relative w-full sm:w-[90%] lg:w-[58%] h-[150px] sm:h-[270px] flex bg-[#E3F1AA] rounded-[20px] border border-[#1E671833] overflow-hidden'>
          <div className='w-[55%] lg:w-[50%] ml-[30px] mt-[30px] text-[#1E6718] z-10'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px] leading-[100%] text-left'>Pickup & Transport</h1>
            <p className='w-full text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] text-left mt-[5px] sm:mt-[15px]'>
              Our drivers collect sorted plastic from collation centers
              and transport it to partner recycling facilities with full traceability.
            </p>
          </div>
          <div className='absolute right-0 bottom-0 w-[45%] lg:w-[50%] h-full flex items-end justify-end'>
            <img 
              src='/truck-1.png' 
              className='w-full h-auto max-h-[90%] object-contain rounded-[18px]'
              alt='Recycling truck'
            />
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className='flex flex-col lg:flex-row gap-4 w-full lg:w-[85%] justify-center items-center mt-4'>
        {/* Recycling Process Card */}
        <div className='relative bg-[#F1FFDD] w-full sm:w-[90%] lg:w-[58%] h-[150px] sm:h-[270px] rounded-2xl border border-[#1E671833] overflow-hidden'>
          <div className='w-[55%] lg:w-[60%] mt-[30px] ml-[30px] text-left text-[#1E6718]'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px]'>Recycling Process</h1>
            <p className='text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] w-full'>
              Partner facilities process the plastic waste into new products, 
              completing the circular economy loop and generating environmental impact.
            </p>
          </div>
          <div className='absolute right-0 bottom-0 w-[45%] lg:w-[40%] h-full flex items-end justify-end'>
            <img 
              src='/bin-1.png' 
              className='w-full h-auto max-h-[90%] object-contain rounded-br-2xl'
              alt='Recycling bin'
            />
          </div>
        </div>

        {/* Monthly Cashout Card */}
        <div className='relative w-full sm:w-[90%] lg:w-[42%] h-[150px] sm:h-[270px] flex bg-[#0F0F0F] rounded-[20px] border border-[#00000033] overflow-hidden'>
          <div className='w-[55%] lg:w-[60%] ml-[30px] mt-[30px] text-[#FFFFFF] z-10'>
            <h1 className='font-bricolage text-[14.5px] sm:text-[26px] leading-[100%] text-left'>Monthly Cashout</h1>
            <p className='w-full text-[7.25px] sm:text-[13px] leading-[11.15px] sm:leading-[20px] text-left mt-[5px] sm:mt-[15px]'>
              Convert your accumulated credits to cash through monthly payouts. 
              Track your impact and earnings through our mobile app.
            </p>
          </div>
          <div className='absolute right-0 bottom-0 w-[45%] lg:w-[70%] h-full flex items-end justify-end'>
            <img 
              src='/dashboard.png' 
              className='w-full h-auto max-h-[90%] object-contain rounded-[18px]'
              alt='Recycling truck'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About