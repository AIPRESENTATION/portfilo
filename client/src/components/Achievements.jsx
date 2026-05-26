import { motion } from 'framer-motion';
import { FiAward, FiCode, FiGithub, FiStar } from 'react-icons/fi';

const iconMap = {
  trophy: FiAward,
  code: FiCode,
  github: FiGithub,
  star: FiStar,
};

const Achievements = ({ achievements = [] }) => {
  return (
    <section id="achievements" className="section-alt py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <span className="section-label">Milestones</span>
          <h2 className="section-title mt-2">Achievements</h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Recognition and accomplishments throughout my journey.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon] || FiAward;
            return (
              <motion.div
                key={item._id}
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
                className="card p-6 group"
              >
                <motion.div 
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                {item.date && <p className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400">{item.date}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
