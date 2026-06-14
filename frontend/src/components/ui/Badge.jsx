import clsx from 'clsx';

const variants = {
  default:  'bg-gray-500/10 text-gray-400 border border-gray-500/20',
  success:  'bg-success/10 text-success border border-success/20',
  warning:  'bg-warning/10 text-warning border border-warning/20',
  danger:   'bg-danger/10  text-danger  border border-danger/20',
  info:     'bg-brand-500/10 text-brand-400 border border-brand-500/20',
  brand:    'bg-brand-500/10 text-brand-400 border border-brand-500/20',
  accent:   'bg-accent-500/10 text-accent-400 border border-accent-500/20',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({ children, variant = 'default', size = 'md', dot = false, className }) {
  return (
    <span className={clsx('inline-flex items-center gap-1.5 font-medium rounded-full', variants[variant], sizes[size], className)}>
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-success': variant === 'success',
        'bg-warning': variant === 'warning',
        'bg-danger':  variant === 'danger',
        'bg-brand-400': variant === 'info' || variant === 'brand',
      })} />}
      {children}
    </span>
  );
}