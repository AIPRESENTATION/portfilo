import { motion } from 'framer-motion';

/** Professional scroll-triggered section transitions with smooth fade-in */
const SectionWrapper = ({ id, children, className = '', dark = false }) => (
  <motion.section
    id={id}
    className={`relative overflow-hidden py-24 ${dark ? 'section-dark' : 'section-light'} ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.section>
);

export default SectionWrapper;
