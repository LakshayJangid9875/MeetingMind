import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Card({ children, className, hover = false, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' } : {}}
      onClick={onClick}
      className={clsx(
        'bg-gray-900 border border-gray-800 rounded-2xl',
        hover && 'cursor-pointer hover:border-brand-500/30 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}