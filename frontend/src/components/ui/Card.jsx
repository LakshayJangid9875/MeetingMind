import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Card({ children, className, hover = false, glow = false, onClick, padding = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={clsx(
        'card',
        hover && 'cursor-pointer hover:border-brand-500/30',
        glow && 'shadow-glow',
        padding && 'p-6',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}