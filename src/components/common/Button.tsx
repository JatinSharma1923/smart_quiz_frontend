
import type { ReactNode } from 'react';
import React, { useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ICONS, ICON_SIZES } from '../../assets';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

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
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    gradient: 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold shadow-lg hover:shadow-cyan-400/40',
  };
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm lg:px-4 lg:py-2 lg:text-base',
    md: 'px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg',
    lg: 'px-6 py-3 text-base md:px-8 md:py-4 md:text-lg lg:px-10 lg:py-5 lg:text-xl',
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

  // Magnetic motion values
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const textScale = useMotionValue(1);
  const textRotate = useMotionValue(0);

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;
    const distance = Math.sqrt(relX * relX + relY * relY);
    const radius = Math.max(rect.width, rect.height) * 0.7;
    const strength = 60;
    if (distance < radius) {
      const force = (radius - distance) / radius;
      const maxTrans = Math.min(rect.width, rect.height) * 0.18;
      const newX = clamp(relX * force * (strength / 100), -maxTrans, maxTrans);
      const newY = clamp(relY * force * (strength / 100), -maxTrans, maxTrans);
      const newScale = clamp(1 + force * 0.13, 1, 1.13);
      const maxRot = 10;
      const newRot = clamp((relX / rect.width) * maxRot, -maxRot, maxRot);
      animate(x, newX, { type: 'spring', stiffness: 300, damping: 22 });
      animate(y, newY, { type: 'spring', stiffness: 300, damping: 22 });
      animate(scale, newScale, { type: 'spring', stiffness: 300, damping: 22 });
      animate(rotate, newRot, { type: 'spring', stiffness: 300, damping: 22 });
      animate(textX, clamp(-newX * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textY, clamp(-newY * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textScale, clamp(1 + force * 0.04, 1, 1.04), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textRotate, clamp(-newRot * 0.7, -maxRot * 0.7, maxRot * 0.7), { type: 'spring', stiffness: 300, damping: 22 });
    }
  };
  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(y, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(scale, 1, { type: 'spring', stiffness: 200, damping: 18 });
    animate(rotate, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textX, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textY, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textScale, 1, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textRotate, 0, { type: 'spring', stiffness: 200, damping: 18 });
  };

  // Handle icon rendering
  const renderIcon = () => {
    if (!icon || loading) return null;
    let iconElement: ReactNode;
    if (typeof icon === 'string' && icon in ICONS) {
      const IconComponent = ICONS[icon as keyof typeof ICONS];
      iconElement = <IconComponent className={ICON_SIZES[iconSize]} />;
    } else {
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
      ref={buttonRef}
      type={type}
      className={`${classes} relative overflow-hidden`}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        x,
        y,
        scale,
        rotate,
        transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseMove}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      <motion.span
        className="relative z-10 inline-flex items-center"
        style={{
          x: textX,
          y: textY,
          scale: textScale,
          rotate: textRotate,
        }}
      >
        {iconPosition === 'left' && renderIcon()}
        {children}
        {iconPosition === 'right' && renderIcon()}
      </motion.span>
    </motion.button>
  );
};

// Regular Button Component with Magnetic Behavior
export const RegularButton = ({
  variant,
  size,
  className = '',
  onClick,
  children,
}: {
  variant?: string;
  size?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  const baseClasses = "font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full relative overflow-hidden";
  const variantClasses = variant === 'gradient' 
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
    : "bg-gray-800 text-white hover:bg-gray-700";
  const sizeClasses = size === 'lg'
    ? "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg lg:px-10 lg:py-5 lg:text-xl"
    : "px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg";

  // Magnetic motion values
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const textScale = useMotionValue(1);
  const textRotate = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;
    const distance = Math.sqrt(relX * relX + relY * relY);
    const radius = Math.max(rect.width, rect.height) * 0.7;
    const strength = 60;
    if (distance < radius) {
      const force = (radius - distance) / radius;
      const maxTrans = Math.min(rect.width, rect.height) * 0.18;
      const newX = clamp(relX * force * (strength / 100), -maxTrans, maxTrans);
      const newY = clamp(relY * force * (strength / 100), -maxTrans, maxTrans);
      const newScale = clamp(1 + force * 0.13, 1, 1.13);
      const maxRot = 10;
      const newRot = clamp((relX / rect.width) * maxRot, -maxRot, maxRot);
      animate(x, newX, { type: 'spring', stiffness: 300, damping: 22 });
      animate(y, newY, { type: 'spring', stiffness: 300, damping: 22 });
      animate(scale, newScale, { type: 'spring', stiffness: 300, damping: 22 });
      animate(rotate, newRot, { type: 'spring', stiffness: 300, damping: 22 });
      animate(textX, clamp(-newX * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textY, clamp(-newY * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textScale, clamp(1 + force * 0.04, 1, 1.04), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textRotate, clamp(-newRot * 0.7, -maxRot * 0.7, maxRot * 0.7), { type: 'spring', stiffness: 300, damping: 22 });
    }
  };
  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(y, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(scale, 1, { type: 'spring', stiffness: 200, damping: 18 });
    animate(rotate, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textX, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textY, 0, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textScale, 1, { type: 'spring', stiffness: 200, damping: 18 });
    animate(textRotate, 0, { type: 'spring', stiffness: 200, damping: 18 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      style={{
        x,
        y,
        scale,
        rotate,
        transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseMove}
    >
      <motion.span
        className="relative z-10 block"
        style={{
          x: textX,
          y: textY,
          scale: textScale,
          rotate: textRotate,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default Button;
