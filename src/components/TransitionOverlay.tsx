import { motion } from "framer-motion";

interface TransitionOverlayProps {
  text?: string;
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  text = "Redirecting...",
}) => {
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
        className="text-center"
      >
        <img
          src="/img/Logo.png"
          className="w-24 h-24 animate-pulse mx-auto"
        />
        <p className="mt-4 text-gray-800 dark:text-white font-semibold">
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
};
