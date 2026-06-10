import { useState } from 'react';
import clsx from 'clsx';

export default function Input({
  label,
  error,
  type = 'text',
  icon,
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {icon}
          </span>
        )}
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={clsx(
            'w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all',
            'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
            error ? 'border-red-500' : 'border-gray-700 hover:border-gray-600',
            icon && 'pl-9',
            isPassword && 'pr-10',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}