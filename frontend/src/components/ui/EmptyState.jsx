import { motion } from 'framer-motion';
import Button from './Button';

export default function EmptyState({ icon, title, description, action, actionLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mb-4 text-3xl">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action} size="md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}