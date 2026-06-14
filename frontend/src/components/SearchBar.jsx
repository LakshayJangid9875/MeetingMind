import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import clsx from 'clsx';

export default function SearchBar() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);
  const ref     = useRef(null);
  const timer   = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Debounced search
  useEffect(() => {
    if (query.length < 3) { setResults([]); setOpen(false); return; }
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/search/?q=${encodeURIComponent(query)}`);
        setResults(res.data.results || []);
        setOpen(true);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer.current);
  }, [query]);

  // Click outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clear = () => { setQuery(''); setResults([]); setOpen(false); };

  return (
    <div ref={ref} className="relative w-72">
      <div className="relative">
        <Search size={15} className={clsx('absolute left-3.5 top-1/2 -translate-y-1/2', isDark ? 'text-dark-muted' : 'text-light-muted')} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search meetings..."
          className={clsx(
            'input pl-9 pr-9 py-2.5',
            isDark ? 'bg-dark-elevated border-dark-border' : 'bg-light-secondary border-light-border'
          )}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {loading ? <Loader2 size={14} className="animate-spin text-brand-400" /> :
           query   ? <button onClick={clear}><X size={14} className={isDark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text'} /></button> : null}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-card-lg border z-50 overflow-hidden',
              isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border'
            )}
          >
            {results.length > 0 ? results.map((r) => (
              <button
                key={r.meeting_id}
                onClick={() => { navigate(`/meetings/${r.meeting_id}`); clear(); }}
                className={clsx(
                  'w-full text-left px-4 py-3.5 transition-colors border-b last:border-0',
                  isDark ? 'hover:bg-dark-elevated border-dark-border' : 'hover:bg-light-secondary border-light-border'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={clsx('text-sm font-medium', isDark ? 'text-dark-text' : 'text-light-text')}>{r.title}</p>
                  <span className="text-brand-400 text-xs font-mono">{(r.score * 100).toFixed(0)}%</span>
                </div>
                <p className={clsx('text-xs truncate', isDark ? 'text-dark-muted' : 'text-light-muted')}>{r.excerpt}</p>
              </button>
            )) : (
              <div className="px-4 py-6 text-center">
                <p className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>No results for "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}