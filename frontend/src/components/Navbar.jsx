import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Features',     href: '#features'      },
  { label: 'How it works', href: '#how-it-works'  },
  { label: 'Pricing',      href: '#pricing'        },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isDark = theme === 'dark';

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? isDark
            ? 'glass-dark border-b border-dark-border shadow-card'
            : 'glass-light border-b border-light-border shadow-card'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-accent-500 rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className={clsx('font-bold text-lg tracking-tight', isDark ? 'text-dark-text' : 'text-light-text')}>
              MeetingMind
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={clsx('text-sm font-medium transition-colors hover:text-brand-500', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                {label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className={clsx('text-sm font-medium transition-colors hover:text-brand-500 px-3 py-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/signup" className="bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-glow transition-all">
                Get started →
              </Link>
            </motion.div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className={clsx('p-2 rounded-xl', isDark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text')}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={clsx('border-t overflow-hidden', isDark ? 'border-dark-border' : 'border-light-border')}
            >
              <div className="py-4 space-y-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)}
                    className={clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isDark ? 'text-dark-muted hover:text-dark-text hover:bg-dark-elevated' : 'text-light-muted hover:text-light-text hover:bg-light-secondary')}
                  >
                    {label}
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <Link to="/login" className={clsx('block text-center py-2.5 rounded-xl text-sm font-medium border transition-colors', isDark ? 'border-dark-border text-dark-text' : 'border-light-border text-light-text')}>Sign in</Link>
                  <Link to="/signup" className="block text-center bg-brand-600 text-white py-2.5 rounded-xl text-sm font-semibold">Get started free</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}