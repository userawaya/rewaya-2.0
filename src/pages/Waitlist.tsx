import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitlistModal from "../components/WaitlistModal";

const Waitlist = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative overflow-hidden"
    >
      {/* Background Vectors - Hidden on mobile */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        src="/Vector-1.png"
        className=" w-[200px] sm:w-[400px] absolute top-0 left-0"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        src="/Vector-1.png"
        className="hidden sm:block w-[100px] sm:w-[200px] absolute top-0 left-[150px] sm:left-[350px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        src="/Vector-4.png"
        className="hidden sm:block w-[200px] sm:w-[430px] absolute top-0 left-[300px] sm:left-[840px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        src="/Vector-2.png"
        className=" w-[200px] sm:w-[400px] absolute top-0 right-0"
      />

      {/* Logo */}
      <img
        src="/lovable-uploads/logo.png"
        alt="Rewaya Logo"
        className="w-30 absolute top-[50px] mt-0 sm:w-30 h-8 sm:h-10 sm:mt-[70px]"
      />
      <div className="text-gray-500 text-xs absolute top-[120px] sm:text-sm mb-6">⚙️ coming soon</div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-4xl w-[80%] sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 px-2"
      >
        Earn Monthly Income<br />
        From Your <span className="bg-gradient-to-r from-[#79B426] to-[#1E6718] text-transparent bg-clip-text">Waste</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className=" text-gray-600 mb-2 text-sm sm:text-base  max-w-md sm:max-w-xl  px-2"
      >
        Transform your trash into opportunity. Discover Nigeria's premier digital marketplace,
        connecting waste generators with recyclers, to unlock the value in your waste.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
      >
        Join the waitlist
      </motion.button>

      <WaitlistModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-row sm:flex-row justify-center gap-4 sm:gap-8 mt-2 sm:mt-12 text-center w-full px-4"
      >
        <div className="px-2 py-2 sm:py-0">
          <div className="text-lg sm:text-xl font-semibold">32M+</div>
          <div className="text-gray-500 text-xs sm:text-sm">Tonnes of waste generated yearly</div>
        </div>
        <div className="px-2 py-2 sm:py-0">
          <div className="text-lg sm:text-xl font-semibold">₦15K</div>
          <div className="text-gray-500 text-xs sm:text-sm">Average monthly earnings potential</div>
        </div>
        <div className="px-2 py-2 sm:py-0">
          <div className="text-lg sm:text-xl font-semibold">100%</div>
          <div className="text-gray-500 text-xs sm:text-sm">Environmental impact improvement</div>
        </div>
      </motion.div>

      {/* Bottom Graphics */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        src="/Vector-6.png"
        className="w-full absolute bottom-0 h-[35vh] sm:h-[25vh]"
      />

      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        src="/Vector-7.png"
        className="w-full  absolute bottom-0 h-[35vh] sm:h-[25vh] sm:top-[80vh]"
      />

      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        src="/Group-19.png"
        className="h-[25vh] w-[23%] top-[75vh] sm:h-[45vh] block absolute bottom-0 sm:w-[14%]  sm:top-[55vh] right-0 mb-4 mr-12"
      />

      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        src="/Layer_1.png"
        className="h-[25vh] w-[23%] top-[75vh] sm:h-[45vh] block absolute bottom-0 sm:w-[14%]  sm:top-[55vh] left-0 mb-4 ml-12"
      />
    </motion.main>
  );
};

export default Waitlist;