import { motion } from 'framer-motion';
import { FiExternalLink, FiAward } from 'react-icons/fi';

const Certifications = ({ certifications = [] }) => {
  return (
    <section id="certifications" className="section-light py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-title mt-2">Certifications</h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Professional certifications and credentials validating my expertise.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="card flex flex-col p-6 group"
            >
              <motion.div 
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FiAward size={24} />
              </motion.div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cert.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
              <p className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400">{cert.date}</p>
              {cert.credentialUrl && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300"
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  View Credential
                  <FiExternalLink size={14} />
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
