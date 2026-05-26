import { motion } from 'framer-motion';

/** Soft animated gradient blobs for premium depth */
const GradientBlobs = ({ variant = 'hero' }) => {
  const isHero = variant === 'hero';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          isHero 
            ? 'left-[8%] top-[15%] h-80 w-80 bg-cyan-400/15' 
            : 'left-[5%] top-[10%] h-64 w-64 bg-cyan-400/12'
        }`}
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          isHero 
            ? 'right-[12%] top-[25%] h-96 w-96 bg-accent-purple/15' 
            : 'right-[10%] bottom-[20%] h-72 w-72 bg-accent-purple/12'
        }`}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          isHero 
            ? 'bottom-[8%] left-[35%] h-72 w-72 bg-accent-blue/12' 
            : 'bottom-[5%] left-[30%] h-56 w-56 bg-accent-blue/10'
        }`}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default GradientBlobs;
