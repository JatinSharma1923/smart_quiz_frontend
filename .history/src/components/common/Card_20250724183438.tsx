import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ICONS, ICON_SIZES } from '../../assets';

interface CardProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: string;
  header?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  icon?: ReactNode | keyof typeof ICONS;
  iconSize?: keyof typeof ICON_SIZES;
}

const Card = ({
  children,
  title,
  subtitle,
  header,
  footer,
  variant = 'default',
  className = '',
  onClick,
  hoverable = false,
  icon,
  iconSize = 'lg',
}: CardProps) => {
  const baseClasses = 'bg-brand-darkest/80 rounded-xl overflow-hidden card-animated-border backdrop-blur-md';
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-lg shadow-brand-pink/20',
    outlined: '',
  };

  const hoverClasses = hoverable ? 'transition-transform duration-200 hover:scale-105 cursor-pointer hover:neon-glow' : '';
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  const CardWrapper = onClick ? motion.div : motion.div;
  const motionProps = onClick ? {
    onClick,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  } : {};

  // Handle icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    let iconElement: ReactNode;
    if (typeof icon === 'string' && icon in ICONS) {
      const IconComponent = ICONS[icon as keyof typeof ICONS];
      iconElement = <IconComponent className={`${ICON_SIZES[iconSize]} text-brand-cyan/90 neon-glow-soft`} />;
    } else {
      iconElement = icon;
    }
    return (
      <div className="flex items-center justify-center mb-4">
        {iconElement}
      </div>
    );
  };

  return (
    <CardWrapper className={classes + ' group'} {...motionProps}>
      {(header || title || icon) && (
        <div className="px-6 py-4 border-b border-gray-700">
          {header || (
            <div className="text-center">
              {icon && renderIcon()}
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      
      <div className="px-6 py-0">
        <div
          className="transition-all duration-300 ease-in-out max-h-0 opacity-0 overflow-hidden group-hover:max-h-[999px] group-hover:opacity-100 group-hover:py-4"
        >
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
          {footer}
        </div>
      )}
    </CardWrapper>
  );
};

export default Card;