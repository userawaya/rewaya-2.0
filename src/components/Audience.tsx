import React from 'react'

const Audience = () => {
  return (
    <div className='w-[100%] h-full bg-gradient-to-b from-[#344E10] via-[#79B426] to-[#79B426] flex flex-col justify-center items-center px-4 py-16'>
       <h1 className='text-white font-bold text-3xl sm:text-6xl'>Who We Serve</h1>
       <p className='text-gray-100 text-[15px] sm:text-[21px] font-semilight w-[100%] sm:w-[35%] mt-5 text-center'>ReWaya connects all stakeholders 
        in the plastic waste value chain, creating opportunities 
        for everyone to participate and benefit.</p>

      {/* Waste Generators - Already responsive */}
      <div className='bg-white w-[334.3999938964844px] sm:w-[1050px] h-[401.0559997558594px] sm:h-[486px] rounded-[20px] mt-10 flex justify-center items-center'>
        <div className='flex flex-col sm:flex-row sm:justify-between w-full mt-7 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[273.6000061035156px] sm:w-[40%] h-[206.72000122070312px] sm:h-[70%]'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-3 sm:mt-0 sm:w-[40%] text-[26.55px] sm:text-5xl'>Waste Generators</h1>
            <p className='text-gray-700 w-[273.6000061035156px] sm:w-[100%] text-[8.85px] sm:text-lg mt-2 sm:mt-4 mb-3'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[88.93760681152344px] sm:w-[45%] rounded-lg font-semibold text-[7.6px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group">
              <span className="bg-[#79B426] text-gray-900 w-[13.680000305175781px] sm:w-[40px] h-[13.680000305175781px] sm:h-[40px] rounded mr-2">
                <div className='flex flex-row m-auto justify-center items-center text-center pt-1 sm:pt-3'>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Collation Controllers - Desktop version */}
      <div className='hidden sm:flex bg-white w-[1050px] h-[80vh] sm:h-[486px] rounded-2xl mt-10 justify-center items-center'>
        <div className='flex justify-between w-[85%] items-center'>
          <div className='flex flex-col w-[45%]'>
            <h1 className='text-black font-bricolage w-[40%] text-5xl'>Collation Controllers</h1>
            <p className='text-gray-700 text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded mr-2">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
          <img src='/meeting.png' className='w-[40%] h-[70%] flex my-auto'></img>
        </div>
      </div>

      {/* Collation Controllers - Mobile version */}
      <div className='bg-white flex sm:hidden w-[334.3999938964844px] sm:w-[1050px] h-[401.0559997558594px] sm:h-[486px] rounded-[20px] mt-10 justify-center items-center'>
        <div className='flex flex-col sm:flex-row sm:justify-between w-full mt-7 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[273.6000061035156px] sm:w-[40%] h-[206.72000122070312px] sm:h-[70%]'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-3 sm:mt-0 sm:w-[40%] text-[26.55px] sm:text-5xl'>Collation Controllers</h1>
            <p className='text-gray-700 w-[273.6000061035156px] sm:w-[100%] text-[8.85px] sm:text-lg mt-2 sm:mt-4 mb-3'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[88.93760681152344px] sm:w-[45%] rounded-lg font-semibold text-[7.6px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group">
              <span className="bg-[#79B426] text-gray-900 w-[13.680000305175781px] h-[13.680000305175781px] rounded mr-2">
                <div className='flex flex-row m-auto justify-center items-center text-center pt-1'>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Recyclers - Desktop version */}
      <div className='hidden sm:flex bg-white w-[1050px] h-[80vh] sm:h-[486px] rounded-2xl mt-10 justify-center items-center'>
        <div className='flex justify-between w-[85%] items-center'>
          <img src='/meeting.png' className='w-[40%] h-[70%] flex my-auto'></img>
          <div className='flex flex-col w-[45%]'>
            <h1 className='text-black font-bricolage w-[40%] text-5xl'>Recyclers</h1>
            <p className='text-gray-700 text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded mr-2">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                <img src='/greater.png' className='w-[8px] h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
            </div>
        </div>
      </div>

      {/* Recyclers - Mobile version */}
      <div className='bg-white flex sm:hidden w-[334.3999938964844px] sm:w-[1050px] h-[401.0559997558594px] sm:h-[486px] rounded-[20px] mt-10 justify-center items-center'>
        <div className='flex flex-col sm:flex-row sm:justify-between w-full mt-7 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[273.6000061035156px] sm:w-[40%] h-[206.72000122070312px] sm:h-[70%]'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-3 sm:mt-0 sm:w-[40%] text-[26.55px] sm:text-5xl'>Recyclers</h1>
            <p className='text-gray-700 w-[273.6000061035156px] sm:w-[100%] text-[8.85px] sm:text-lg mt-2 sm:mt-4 mb-3'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[88.93760681152344px] sm:w-[45%] rounded-lg font-semibold text-[7.6px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group">
              <span className="bg-[#79B426] text-gray-900 w-[13.680000305175781px] h-[13.680000305175781px] rounded mr-2">
                <div className='flex flex-row m-auto justify-center items-center text-center pt-1'>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[2.8500001430511475px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audience