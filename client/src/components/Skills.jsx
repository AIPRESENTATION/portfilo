import { motion } from 'framer-motion';

const Skills = ({ skills = [] }) => {
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="section-alt py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-title mt-2">Skills & Technologies</h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: catIndex * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="card h-full p-6 group"
            >
              <motion.h3 
                className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {category}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {grouped[category].map((skill, index) => (
                  <motion.span
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: catIndex * 0.1 + index * 0.05,
                      ease: 'easeOut'
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-default dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
