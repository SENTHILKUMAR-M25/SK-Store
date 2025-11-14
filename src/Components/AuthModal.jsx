import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const AuthModal = ({
  show,
  onClose,
  isLoginMode,
  setIsLoginMode,
  onSubmit,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 m-3 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Outer Glow Effect */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-amber-500/30 shadow-xl"
          >
            {/* Inner Glass Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg relative">

              {/* Floating Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 bg-white text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {isLoginMode ? "Welcome Back 👋" : "Create Your Account ✨"}
              </h2>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 
                      focus:ring-2 focus:ring-amber-400 focus:bg-white transition outline-none"
                    />
                  </div>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 
                  focus:ring-2 focus:ring-amber-400 focus:bg-white transition outline-none"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 
                  focus:ring-2 focus:ring-amber-400 focus:bg-white transition outline-none"
                />

                {/* Fancy Submit Button */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 rounded-lg font-semibold text-white 
                  bg-gradient-to-r from-amber-500 to-amber-600
                  hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition"
                >
                  {isLoginMode ? "Login" : "Register"}
                </motion.button>
              </form>

              {/* Toggle */}
              <p className="text-sm text-center text-gray-700 mt-4">
                {isLoginMode
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  {isLoginMode ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoginMode: PropTypes.bool.isRequired,
  setIsLoginMode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthModal;
