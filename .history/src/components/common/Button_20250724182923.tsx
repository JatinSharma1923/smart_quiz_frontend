import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ICONS, ICON_SIZES } from '../../assets';
import React, { useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: ReactNode | keyof typeof ICONS;
  iconPosition?: 'left' | 'right';
  iconSize?: keyof typeof ICON_SIZES;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  iconSize = 'md',
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    gradient: 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold shadow-lg hover:shadow-cyan-400/40',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

  // Handle icon rendering
  const renderIcon = () => {
    if (!icon || loading) return null;
    
    let iconElement: ReactNode;
    
    if (typeof icon === 'string' && icon in ICONS) {
      // If icon is a string key, get the icon component
      const IconComponent = ICONS[icon as keyof typeof ICONS];
      iconElement = <IconComponent className={ICON_SIZES[iconSize]} />;
    } else {
      // If icon is already a ReactNode, use it directly
      iconElement = icon;
    }

    const iconClasses = iconPosition === 'left' ? 'mr-2' : 'ml-2';
    
    return (
      <span className={iconClasses}>
        {iconElement}
      </span>
    );
  };

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </motion.button>
  );
};

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setFeedback('');
      setSubmitted(false);
    }, 1500);
  };

  return (
    <>
      <Button
        variant="gradient"
        className="fixed bottom-6 right-6 z-50"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
      >
        💬
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
              aria-label="Close feedback form"
            >
              ×
            </Button>
            <h2 className="text-lg font-bold mb-2 text-indigo-700 dark:text-indigo-300">Send Feedback</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Your suggestion or issue..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
                aria-label="Feedback message"
              />
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={submitted}
                aria-label="Submit feedback"
              >
                {submitted ? 'Thank you!' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Button;