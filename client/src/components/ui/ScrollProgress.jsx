import { motion } from 'framer-motion';

/** Top scroll progress indicator */
const ScrollProgress = ({ progress = 0 }) => (
  <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200 dark:bg-slate-700">
    <motion.div
      className="h-full bg-blue-600 dark:bg-blue-500"
      style={{ width: `${progress * 100}%` }}
      layout
      transition={{ type: 'spring', stiffness: 120, damping: 28 }}
    />
  </div>
);

export default ScrollProgress;
