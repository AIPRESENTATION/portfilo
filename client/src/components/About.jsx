import { motion } from 'framer-motion';
import { FiMapPin, FiMail } from 'react-icons/fi';

const About = ({ about }) => {
  return (
    <section id="about" className="section-light py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <span className="section-label">Introduction</span>
          <h2 className="section-title mt-2">{about?.aboutTitle || 'About Me'}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="card mt-12 p-8 lg:p-10 relative overflow-hidden group"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.05), transparent 70%)',
            }}
          />
          
          <div className="relative z-10">
            {/* About Me Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
              About Me
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {about?.aboutDescription ||
                'Passionate developer exploring AI, cybersecurity, and quantum computing.'}
            </motion.p>

            {/* Info Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {about?.location && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{about.location}</p>
                  </div>
                </motion.div>
              )}
              
              {(about?.email || about?.resumeUrl) && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{about.email || 'Contact via form'}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"
              />
              Available for opportunities
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
