import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const Projects = ({ projects = [] }) => {
  const sorted = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="projects" className="section-light py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title mt-2">Featured Projects</h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Innovative solutions spanning AI, quantum computing, accessibility, and policy intelligence.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sorted.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="card group overflow-hidden p-0"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-slate-700">
                {project.imageUrl ? (
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900/20 dark:to-slate-800">
                    <span className="text-4xl font-bold text-blue-600/30 dark:text-blue-400/30">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                {project.featured && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="absolute right-4 top-4 flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm dark:bg-blue-500"
                  >
                    <FiStar size={12} />
                    Featured
                  </motion.span>
                )}
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold text-slate-900 dark:text-white"
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {project.title}
                </motion.h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack?.map((tech, techIndex) => (
                    <motion.span 
                      key={tech} 
                      className="tech-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={18} />
                      View Code
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
