import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

export default function Input({
  label, error, hint, type = 'text',
  icon, iconRight, className, required, ...props
}) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const isPassword = type === 'password';

  return (
    <div className="w-full">
      {label && (
        <label className={clsx('block text-sm font-medium mb-1.5', theme === 'dark' ? 'text-dark-muted' : 'text-light-muted')}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>}
        <input
          type={isPassword && show ? 'text' : type}
          className={clsx(
            'input',
            icon && 'pl-10',
            (isPassword || iconRight) && 'pr-10',
            error && '!border-danger focus:!ring-danger/30',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}
            className={clsx('absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors', theme === 'dark' ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text')}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {iconRight && !isPassword && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">{iconRight}</span>}
      </div>
      {error && <p className="text-danger text-xs mt-1.5 flex items-center gap-1">⚠ {error}</p>}
      {hint && !error && <p className={clsx('text-xs mt-1.5', theme === 'dark' ? 'text-dark-muted' : 'text-light-muted')}>{hint}</p>}
    </div>
  );
}