import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center w-[100%] pb-10 sm:py-16 bg-white text-4xl px-4'>
      <div className='w-[80%] sm:w-[40%] text-2xl sm:text-5xl'>
      <h1 className='font-bricolage font-bold text-black'>Complete Transparency, <span className='text-[#79B426]'>Maximum Impact</span></h1>
      </div>
      <div className='flex flex-col sm:flex-row sm:space-x-4 w-[100%] sm:w-[85%] justify-center items-center'>
        <img src='/bring.png' className='w-full sm:w-[50%] h-[25vh] sm:h-[40vh]  mt-5'></img>
        <img src='/quality.png' className='w-full sm:w-[40%] h-[25vh] sm:h-[40vh] mt-5'></img>
      </div>
      <div className='flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-[85%] justify-center items-center'>
        <img src='/credits-clear.png' className='w-full sm:w-[40%] h-[25vh] sm:h-[40vh]  mt-5'></img>
        <img src='/truck.png' className='w-full sm:w-[50%] h-[25vh] sm:h-[40vh] mt-5'></img>
      </div>
      <div className='flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-[85%] justify-center items-center'>
        <img src='/bin.png' className='w-full sm:w-[50%] h-[25vh] sm:h-[40vh]  mt-5'></img>
        <img src='/cashout.png' className='w-full sm:w-[40%] h-[25vh] sm:h-[40vh] mt-5'></img>
      </div>
    </div>
  )
}

export default About