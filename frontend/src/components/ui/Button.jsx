import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const variants = {
  primary:   'bg-brand-600 hover:bg-brand-700 text-white shadow-glow hover:shadow-glow-lg',
  secondary: {
    dark:  'bg-dark-elevated hover:bg-dark-border text-dark-text border border-dark-border',
    light: 'bg-light-secondary hover:bg-light-border text-light-text border border-light-border',
  },
  ghost: {
    dark:  'text-dark-muted hover:text-dark-text hover:bg-dark-elevated',
    light: 'text-light-muted hover:text-light-text hover:bg-light-secondary',
  },
  danger:   'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20',
  success:  'bg-success/10 hover:bg-success/20 text-success border border-success/20',
  gradient: 'bg-gradient-to-r from-brand-600 to-accent-500 hover:opacity-90 text-white shadow-glow',
};

const sizes = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-3.5 py-2 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, iconRight,
  className, fullWidth = false, ...props
}) {
  const { theme } = useTheme();

  const getVariantClass = () => {
    if (typeof variants[variant] === 'string') return variants[variant];
    return variants[variant]?.[theme] || variants[variant]?.dark || '';
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{   scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed select-none',
        getVariantClass(),
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin flex-shrink-0" /> : icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
}