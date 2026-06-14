import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Upload, BarChart2, Settings,
  LogOut, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { path: '/upload',    icon: Upload,          label: 'Upload'      },
  { path: '/analytics', icon: BarChart2,       label: 'Analytics'   },
  { path: '/settings',  icon: Settings,        label: 'Settings'    },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={clsx(
        'fixed left-0 top-0 h-screen flex flex-col z-40 border-r transition-colors duration-200',
        isDark ? 'bg-dark-bg border-dark-border' : 'bg-white border-light-border shadow-card'
      )}
    >
      {/* Logo */}
      <div className={clsx('flex items-center h-16 border-b px-4', isDark ? 'border-dark-border' : 'border-light-border')}>
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-glow">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className={clsx('font-bold text-base tracking-tight truncate', isDark ? 'text-dark-text' : 'text-light-text')}
              >
                MeetingMind
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className={clsx('ml-auto p-1.5 rounded-lg transition-colors flex-shrink-0', isDark ? 'text-dark-muted hover:text-dark-text hover:bg-dark-elevated' : 'text-light-muted hover:text-light-text hover:bg-light-secondary')}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </motion.button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <Link key={path} to={path}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 2 }}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative',
                  collapsed && 'justify-center',
                  active
                    ? 'bg-brand-600 text-white shadow-glow'
                    : isDark
                    ? 'text-dark-muted hover:text-dark-text hover:bg-dark-elevated'
                    : 'text-light-muted hover:text-light-text hover:bg-light-secondary'
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={clsx('px-2 py-3 border-t space-y-1', isDark ? 'border-dark-border' : 'border-light-border')}>
        <div className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl', collapsed && 'justify-center')}>
          <div className="w-8 h-8 bg-gradient-to-br from-brand-600/30 to-accent-500/30 rounded-full flex items-center justify-center flex-shrink-0 border border-brand-500/20">
            <span className="text-brand-400 text-sm font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className={clsx('text-sm font-semibold truncate', isDark ? 'text-dark-text' : 'text-light-text')}>{user?.name}</p>
                <p className={clsx('text-xs truncate capitalize', isDark ? 'text-dark-muted' : 'text-light-muted')}>{user?.plan} plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!collapsed && <div className="px-3"><ThemeToggle className="w-full justify-start gap-2 px-2" /></div>}

        <motion.button
          whileHover={{ x: collapsed ? 0 : 2 }}
          onClick={() => { logout(); navigate('/'); }}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
            collapsed && 'justify-center',
            isDark ? 'text-dark-muted hover:text-danger hover:bg-danger/5' : 'text-light-muted hover:text-danger hover:bg-danger/5'
          )}
        >
          <LogOut size={17} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}>
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}