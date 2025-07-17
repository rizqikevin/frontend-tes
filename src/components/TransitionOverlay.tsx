import { motion } from "framer-motion";

export const TransitionOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/img/Logo.png" className="w-24 h-24 animate-pulse" />
        <p className="mt-4 text-gray-800 dark:text-white font-semibold">
          Redirecting...
        </p>
      </motion.div>
    </motion.div>
  );
};
