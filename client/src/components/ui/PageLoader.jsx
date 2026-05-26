import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
        >
          {/* Spinner */}
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-slate-700" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent dark:border-t-blue-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
