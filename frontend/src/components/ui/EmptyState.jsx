import { motion } from 'framer-motion';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';

export default function EmptyState({ icon, title, description, action, actionLabel, secondaryAction, secondaryLabel }) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-5 text-4xl ${
        theme === 'dark' ? 'bg-dark-elevated border border-dark-border' : 'bg-light-secondary border border-light-border'
      }`}>
        {icon}
      </div>
      <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{title}</h3>
      <p className={`text-sm max-w-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>{description}</p>
      <div className="flex gap-3">
        {action && <Button onClick={action}>{actionLabel}</Button>}
        {secondaryAction && <Button variant="secondary" onClick={secondaryAction}>{secondaryLabel}</Button>}
      </div>
    </motion.div>
  );
}