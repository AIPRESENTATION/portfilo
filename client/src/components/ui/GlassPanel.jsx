import { motion } from 'framer-motion';

/** Premium glass panel with smooth scroll reveal */
const GlassPanel = ({ children, className = '', delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={`glass-panel ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassPanel;
