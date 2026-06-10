import clsx from 'clsx';

const variants = {
  default:  'bg-gray-700 text-gray-300',
  success:  'bg-green-500/10 text-green-400 border border-green-500/20',
  warning:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  error:    'bg-red-500/10 text-red-400 border border-red-500/20',
  info:     'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  brand:    'bg-brand-500/10 text-brand-400 border border-brand-500/20',
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}