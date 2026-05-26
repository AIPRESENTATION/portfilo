import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const Footer = ({ social = {} }) => {
  const year = new Date().getFullYear();

  const socialIcons = [
    { href: social.github, icon: FiGithub, label: 'GitHub' },
    { href: social.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
    { href: social.leetcode, icon: SiLeetcode, label: 'LeetCode' },
    { href: social.codechef, icon: SiCodechef, label: 'CodeChef' },
    { href: social.email ? `mailto:${social.email}` : '', icon: FiMail, label: 'Email' },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-slate-700 dark:bg-slate-800">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
              Rakesh Koraganji
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              AI & Cybersecurity · Full Stack · Quantum Computing
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          © {year} Rakesh Koraganji. Built with React & Node.js.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
