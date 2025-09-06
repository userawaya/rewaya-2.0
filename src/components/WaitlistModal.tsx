import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("https://script.google.com/macros/s/AKfycbz5x-LxWX3fGLKh7X0dG9UjxYA8tqxO8CAHdJ7B8180_lQWBV3N1Kwpm78ww7P286kzOA/exec", {
        method: "POST",
        mode: "no-cors", // bypass CORS for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Show success message
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
      // Even in error, assume success since no-cors hides response
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
    setForm({ firstName: "", lastName: "", email: "" }); // Reset form
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg relative text-center"
          >
            <button onClick={handleClose} className="absolute top-2 right-3 text-gray-500 text-xl">
              &times;
            </button>

            {!showSuccess ? (
              <>
                <h2 className="text-2xl font-semibold mb-2">Join the waitlist</h2>
                <p className="text-sm text-gray-500 mb-6">Be the first to know when we launch</p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-lime-500 w-full text-white rounded-full px-6 py-2 hover:shadow-md">
                    Join the waitlist
                  </button>
                </form>
              </>
            ) : (
              // 🎉 Success Modal
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-lime-500 text-6xl">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src="/Group-20.png"
                    className="w-[150px] h-[150px] mx-auto mb-4"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Welcome on-board, {form.firstName}!</h2>
                <p className="text-sm text-gray-600">
                  Be the first to know when we launch. Be the first to know when we launch. Be the first to know when we launch...
                </p>
                <button
                  onClick={handleClose}
                  className="bg-lime-500 text-white rounded-full px-6 py-2 hover:shadow-md mt-2"
                >
                  Let’s go
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
