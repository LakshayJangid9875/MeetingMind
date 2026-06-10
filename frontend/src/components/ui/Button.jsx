import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary:   'bg-brand-500 hover:bg-brand-600 text-white shadow-glow hover:shadow-glow-lg',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700',
  ghost:     'text-gray-400 hover:text-white hover:bg-gray-800',
  danger:    'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{   scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      ) : icon ? (
        <span className="text-base">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}