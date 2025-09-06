import React from 'react'

const Audience = () => {
  return (
    <div className='w-[100%] h-full bg-gradient-to-b from-[#344E10] via-[#79B426] to-[#79B426] flex flex-col justify-center items-center px-4 py-16'>
       <h1 className='text-white font-bold text-3xl sm:text-6xl'>Who We Serve</h1>
       <p className='text-gray-100 text-[15px] sm:text-[21px] font-semilight w-[100%] sm:w-[35%] mt-5 text-center'>ReWaya connects all stakeholders 
        in the plastic waste value chain, creating opportunities 
        for everyone to participate and benefit.</p>

      {/* Waste Generators - Already responsive */}
      <div className='bg-white w-[90%] sm:w-[70%] h-[80vh] sm:h-[70vh] rounded-2xl mt-10 flex justify-center items-center'>
        <div className='flex flex-col sm:flex-row justify-between w-full mt-20 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[80%] sm:w-[40%] sm:h-[70%] flex sm:my-auto'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-8 sm:mt-0 sm:w-[40%] text-5xl'>Waste Generators</h1>
            <p className='text-gray-700 text-sm sm:text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded mr-2">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Collation Controllers - Desktop version */}
      <div className='hidden sm:flex bg-white w-[70%] h-[80vh] sm:h-[70vh] rounded-2xl mt-10 justify-center items-center'>
        <div className='flex justify-between w-[85%] items-center'>
          <div className='flex flex-col w-[45%]'>
            <h1 className='text-black font-bricolage w-[40%] text-5xl'>Collation Controllers</h1>
            <p className='text-gray-700 text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
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
      <div className='sm:hidden bg-white w-[90%] h-[80vh] sm:h-[70vh] rounded-2xl mt-10 flex justify-center items-center'>
        <div className='flex flex-col justify-between w-full mt-20 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[80%] sm:w-[40%] sm:h-[70%] flex sm:my-auto'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-8 sm:mt-0 sm:w-[40%] text-5xl'>Collation Controllers</h1>
            <p className='text-gray-700 text-sm sm:text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded mr-2">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                </div>
              </span>
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Recyclers - Desktop version */}
      <div className='hidden sm:flex bg-white w-[70%] h-[80vh] sm:h-[70vh] rounded-2xl mt-10 justify-center items-center'>
        <div className='flex justify-between w-[85%] items-center'>
          <img src='/meeting.png' className='w-[40%] h-[70%] flex my-auto'></img>
          <div className='flex flex-col w-[45%]'>
            <h1 className='text-black font-bricolage w-[40%] text-5xl'>Recyclers</h1>
            <p className='text-gray-700 text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
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
      <div className='sm:hidden bg-white w-[90%] h-[80vh] sm:h-[70vh] rounded-2xl mt-10 flex justify-center items-center'>
        <div className='flex flex-col justify-between w-full mt-20 sm:mt-0 sm:w-[85%] items-center'>
          <img src='/meeting.png' className='w-[80%] sm:w-[40%] sm:h-[70%] flex sm:my-auto'></img>
          <div className='flex flex-col w-[80%] sm:w-[45%]'>
            <h1 className='text-black font-bricolage w-[100%] mt-8 sm:mt-0 sm:w-[40%] text-5xl'>Recyclers</h1>
            <p className='text-gray-700 text-sm sm:text-lg mt-4 mb-6'>
              Households, estates, schools, and institutions earning credits by bringing plastic waste to collation centers.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-3 w-[50%] sm:w-[45%] rounded-lg font-semibold text-[12px] sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
              <span className="bg-[#79B426] text-gray-900 px-3 py-[13px] rounded mr-2">
                <div className='flex flex-row m-auto justify-end items-center'>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
                <img src='/greater.png' className='w-[4px] sm:w-[8px] h-[7px] sm:h-[14px]'></img>
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