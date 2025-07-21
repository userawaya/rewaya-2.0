import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export default function WelcomeModal({ name = "", onClose }: { name?: string; onClose: () => void }) {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel as={motion.div} 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl text-center relative"
        >
          {/* Icon */}
          <div className="text-green-500 text-6xl mb-4">
            <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src="/Group-20.png"
                    className="w-[400px] h-[400px] mx-auto mb-4"
                  />
          </div>

          {/* Heading */}
          <Dialog.Title className="text-2xl font-semibold">
            Welcome on-board, {name}!
          </Dialog.Title>

          {/* Description */}
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Be the first to know when we launch. Be the first to know when we launch. Be the first to know when we launch. Be the first to know when we launch.
          </p>

          {/* CTA Button */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={closeModal}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-full shadow-md transition"
            >
              Let’s go
            </button>

            {/* Avatar */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-white -ml-3 shadow"
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
