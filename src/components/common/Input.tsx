import type { InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  helperText?: string;
}

const Input = ({
  label,
  error,
  success = false,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  helperText,
  className = '',
  ...props
}: InputProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = 'bg-gray-800 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const stateClasses = error 
    ? 'border-red-500 focus:ring-red-500' 
    : success 
    ? 'border-green-500 focus:ring-green-500' 
    : 'border-gray-700 focus:ring-blue-500 hover:border-gray-600';
  
  const widthClass = fullWidth ? 'w-full' : '';
  const iconClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

  const inputClasses = `${baseClasses} ${stateClasses} ${sizeClasses[size]} ${widthClass} ${iconClasses} ${className}`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <motion.div whileFocus={{ scale: 1.01 }}>
          <input
            className={inputClasses}
            {...props}
          />
        </motion.div>
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <motion.p
          className={`text-sm mt-1 ${error ? 'text-red-400' : 'text-gray-400'}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error || helperText}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
