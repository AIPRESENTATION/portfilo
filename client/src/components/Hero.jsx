import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiDownload, FiChevronDown } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const Hero = ({ about, social }) => {
  const titles = about?.heroTitles || [
    'AI & Cybersecurity Enthusiast',
    'Full Stack Developer',
    'Quantum Computing Explorer',
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    if (titles.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000); // Change title every 4 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  const socialLinks = [
    { href: social?.github, icon: FiGithub, label: 'GitHub' },
    { href: social?.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
    { href: social?.leetcode, icon: SiLeetcode, label: 'LeetCode' },
    { href: social?.codechef, icon: SiCodechef, label: 'CodeChef' },
  ].filter((l) => l.href);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-16 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-500/10"
        />
      </div>

      <div className="section-container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"
          />
          Available for opportunities
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl dark:border-blue-400"
            >
              <img
                src={about?.profileImageUrl || '/profile.jpg'}
                alt={about?.heroName || 'Profile'}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {/* Subtle ring effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full border-2 border-blue-400 dark:border-blue-500"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          {about?.heroName || 'Rakesh Koraganji'}
        </motion.h1>

        {/* Clean Role Animation */}
        <div className="mt-6 h-10 sm:h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTitleIndex}
              initial={{ 
                opacity: 0, 
                y: 20,
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              exit={{ 
                opacity: 0, 
                y: -20,
              }}
              transition={{
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300"
            >
              {titles[currentTitleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300"
        >
          {about?.heroBio ||
            'Building intelligent systems at the intersection of AI, security, and quantum computing.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {about?.resumeUrl && (
            <motion.a
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload size={18} />
              Download Resume
            </motion.a>
          )}
          <motion.a
            href="#projects"
            className="btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex items-center gap-4"
        >
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
          aria-label="Scroll to about"
          whileHover={{ scale: 1.2 }}
        >
          <FiChevronDown size={28} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
