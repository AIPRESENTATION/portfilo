import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiRefreshCw } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { getChatbotData } from '../services/api';

// ─── Suggestion chips ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Tell me about Rakesh',
  'Show projects',
  'What skills does Rakesh know?',
  'Show certifications',
  'Show achievements',
  'Download resume',
  'Contact details',
  'Show social links',
];

// ─── Rule-based response engine ───────────────────────────────────────────────
function getResponse(input, data) {
  const q = input.toLowerCase().trim();
  const { about = {}, projects = [], skills = [], certifications = [], achievements = [], social = {} } = data;

  // ── About / Who / Rakesh ──────────────────────────────────────────────────
  if (/\b(about|who|rakesh|tell me|introduce|bio|description|background|yourself)\b/.test(q)) {
    const lines = [];
    if (about.heroName?.trim())          lines.push(`👤 **${about.heroName.trim()}**`);
    if (about.heroTitles?.length)        lines.push(`💼 ${about.heroTitles.join(' | ')}`);
    if (about.aboutDescription?.trim())  lines.push(`\n${about.aboutDescription.trim()}`);
    else if (about.heroBio?.trim())      lines.push(`\n${about.heroBio.trim()}`);
    if (about.location?.trim())          lines.push(`\n📍 ${about.location.trim()}`);
    if (about.email?.trim())             lines.push(`✉️ ${about.email.trim()}`);
    if (!lines.length) return 'This information has not been added yet.';
    return lines.join('\n');
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  if (/\b(project|projects|work|built|portfolio|app|application|made|created)\b/.test(q)) {
    if (!projects.length) return 'This information has not been added yet.';
    const list = projects
      .slice(0, 6)
      .map((p) => {
        const desc = p.description?.length > 80
          ? p.description.slice(0, 80) + '…'
          : p.description || '';
        const stack = p.techStack?.length ? ` _(${p.techStack.slice(0, 3).join(', ')})_` : '';
        const links = [];
        if (p.liveUrl?.trim())   links.push(`[Live](${p.liveUrl.trim()})`);
        if (p.githubUrl?.trim()) links.push(`[GitHub](${p.githubUrl.trim()})`);
        return `• **${p.title}**${stack}\n  ${desc}${links.length ? `\n  ${links.join(' · ')}` : ''}`;
      })
      .join('\n');
    const more = projects.length > 6 ? `\n\n_…and ${projects.length - 6} more on the Projects section._` : '';
    return `🚀 **Projects (${projects.length} total)**\n\n${list}${more}`;
  }

  // ── Skills / Technologies ─────────────────────────────────────────────────
  if (/\b(skill|skills|tech|technology|technologies|stack|language|framework|tool|know|use|expertise)\b/.test(q)) {
    if (!skills.length) return 'This information has not been added yet.';
    const grouped = skills.reduce((acc, s) => {
      const cat = s.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(s.name);
      return acc;
    }, {});
    const lines = Object.entries(grouped)
      .map(([cat, names]) => `• **${cat}**: ${names.join(', ')}`)
      .join('\n');
    return `💡 **Skills & Technologies (${skills.length} total)**\n\n${lines}`;
  }

  // ── Certifications ────────────────────────────────────────────────────────
  if (/\b(certif|certificate|certification|credential|course)\b/.test(q)) {
    if (!certifications.length) return 'This information has not been added yet.';
    const list = certifications
      .map((c) => {
        const date = c.date ? ` (${c.date})` : '';
        const link = c.credentialUrl?.trim() ? ` — [View](${c.credentialUrl.trim()})` : '';
        return `• **${c.title}** — ${c.issuer || ''}${date}${link}`;
      })
      .join('\n');
    return `🏆 **Certifications (${certifications.length} total)**\n\n${list}`;
  }

  // ── Achievements ──────────────────────────────────────────────────────────
  if (/\b(achiev|achievement|award|milestone|accomplish|win|coding|problem|rank|contest)\b/.test(q)) {
    if (!achievements.length) return 'This information has not been added yet.';
    const list = achievements
      .map((a) => {
        const desc = a.description?.length > 90
          ? a.description.slice(0, 90) + '…'
          : a.description || '';
        const date = a.date ? ` _(${a.date})_` : '';
        return `• **${a.title}**${date}\n  ${desc}`;
      })
      .join('\n');
    return `🌟 **Achievements (${achievements.length} total)**\n\n${list}`;
  }

  // ── Resume ────────────────────────────────────────────────────────────────
  if (/\b(resume|cv|download|curriculum)\b/.test(q)) {
    if (!about.resumeUrl?.trim()) return 'Resume link has not been added yet.';
    return `📄 **Resume**\n\nDownload Rakesh's resume here:\n👉 ${about.resumeUrl.trim()}`;
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  if (/\b(contact|email|phone|reach|message|hire|connect)\b/.test(q)) {
    const lines = [];
    const emailVal = about.email?.trim() || social.email?.trim();
    if (emailVal)                lines.push(`✉️ **Email:** ${emailVal}`);
    if (about.location?.trim()) lines.push(`📍 **Location:** ${about.location.trim()}`);
    if (!lines.length) {
      return '📬 Use the **Contact** section on this page to send Rakesh a direct message!';
    }
    lines.push('\n📬 Or use the **Contact** section on this page to send a message directly!');
    return `📬 **Contact Details**\n\n${lines.join('\n')}`;
  }

  // ── Social Links ──────────────────────────────────────────────────────────
  if (/\b(social|linkedin|github|leetcode|codechef|twitter|link|profile|connect|follow)\b/.test(q)) {
    const lines = [];
    if (social.github?.trim())   lines.push(`🐙 **GitHub:** ${social.github.trim()}`);
    if (social.linkedin?.trim()) lines.push(`💼 **LinkedIn:** ${social.linkedin.trim()}`);
    if (social.leetcode?.trim()) lines.push(`💻 **LeetCode:** ${social.leetcode.trim()}`);
    if (social.codechef?.trim()) lines.push(`👨‍🍳 **CodeChef:** ${social.codechef.trim()}`);
    if (social.twitter?.trim())  lines.push(`🐦 **Twitter:** ${social.twitter.trim()}`);
    if (!lines.length) return 'Social links have not been added yet.';
    return `🔗 **Social Links**\n\n${lines.join('\n')}`;
  }

  // ── Experience / Journey ──────────────────────────────────────────────────
  if (/\b(experience|journey|career|story|history)\b/.test(q)) {
    const lines = [];
    if (about.aboutDescription?.trim()) lines.push(about.aboutDescription.trim());
    else if (about.heroBio?.trim())     lines.push(about.heroBio.trim());
    if (projects.length)       lines.push(`\n🚀 Built **${projects.length}** projects`);
    if (achievements.length)   lines.push(`🌟 Earned **${achievements.length}** achievements`);
    if (certifications.length) lines.push(`🏆 Holds **${certifications.length}** certifications`);
    if (!lines.length) return 'This information has not been added yet.';
    return lines.join('\n');
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return "I can help you with Rakesh's **projects**, **skills**, **certifications**, **achievements**, **resume**, **contact details**, and **social links**. Try one of the suggestions below!";
}

// ─── Markdown-like renderer (bold + italic + links) ───────────────────────────
function renderText(text) {
  return text.split('\n').map((line, i) => {
    // Split on **bold**, _italic_, and [text](url)
    const parts = [];
    const regex = /\*\*(.*?)\*\*|_(.*?)_|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let last = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      if (match[1] !== undefined) {
        parts.push(<strong key={match.index}>{match[1]}</strong>);
      } else if (match[2] !== undefined) {
        parts.push(<em key={match.index}>{match[2]}</em>);
      } else if (match[3] !== undefined) {
        parts.push(
          <a
            key={match.index}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {match[3]}
          </a>
        );
      }
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <span key={i} className="block leading-relaxed">
        {parts.length ? parts : '\u00A0'}
      </span>
    );
  });
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 dark:bg-slate-800">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-blue-400 dark:bg-blue-500"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
const WELCOME_MSG = {
  from: 'bot',
  text: "Hi! 👋 I'm **Ask Rakesh AI**. I can help you explore Rakesh's portfolio.\n\nAsk me about his projects, skills, certifications, achievements, resume, or contact details!",
};

const Chatbot = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Hide chatbot on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');
  if (isAdminPage) return null;

  // Fetch fresh data every time the chat opens
  const fetchData = useCallback(() => {
    setLoading(true);
    setFetchError(false);
    getChatbotData()
      .then((res) => {
        setPortfolioData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setPortfolioData({});
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, fetchData]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const handleOpen = () => {
    setOpen((v) => {
      if (!v) {
        // Reset to welcome state on re-open
        setMessages([WELCOME_MSG]);
        setInput('');
      }
      return !v;
    });
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      let response;
      if (loading) {
        response = 'Still loading portfolio data, please try again in a moment.';
      } else if (fetchError || !portfolioData) {
        response = 'Unable to load portfolio data right now. Please try again later.';
      } else {
        response = getResponse(trimmed, portfolioData);
      }
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: response }]);
    }, 650);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isOnline = !loading && !fetchError && portfolioData !== null;

  return (
    <>
      {/* ── Floating Button ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping" />
        )}
        <motion.button
          onClick={handleOpen}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={open ? 'Close chatbot' : 'Open Ask Rakesh AI chatbot'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiMessageSquare size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-slate-900/20 dark:border-slate-700 dark:bg-slate-900"
            style={{
              width: 'min(360px, calc(100vw - 2rem))',
              height: 'min(520px, calc(100dvh - 8rem))',
            }}
            role="dialog"
            aria-label="Ask Rakesh AI chatbot"
          >
            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 dark:from-blue-700 dark:to-blue-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
                  <FiMessageSquare size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">Ask Rakesh AI</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        loading
                          ? 'bg-yellow-300 animate-pulse'
                          : isOnline
                          ? 'bg-green-300'
                          : 'bg-red-400'
                      }`}
                    />
                    <p className="text-xs text-blue-100">
                      {loading ? 'Loading data…' : isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              {/* Refresh button */}
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-40"
                aria-label="Refresh portfolio data"
                title="Refresh data"
              >
                <motion.span
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={loading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                >
                  <FiRefreshCw size={14} />
                </motion.span>
              </button>
            </div>

            {/* ── Messages ────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.from === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm shadow-sm'
                        : 'bg-gray-100 text-slate-800 rounded-bl-sm dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && <TypingDots />}

              {/* Suggestion chips — shown after welcome message only */}
              {messages.length === 1 && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-all hover:bg-blue-100 hover:border-blue-400 active:scale-95 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input ───────────────────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-gray-200 px-3 py-3 dark:border-slate-700"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Rakesh…"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-500"
                disabled={typing}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
                aria-label="Send message"
              >
                <FiSend size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
