import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  strength?: number;
  radius?: number;
  type?: 'button' | 'submit' | 'reset';
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 60,
  radius = 150,
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  // Text magnetic values
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const textScale = useMotionValue(1);
  const textRotate = useMotionValue(0);

  // Handler for mouse movement over the button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;
    const distance = Math.sqrt(relX * relX + relY * relY);
    if (distance < radius) {
      const force = (radius - distance) / radius;
      // Clamp translation to avoid moving out of bounds
      const maxTrans = Math.min(rect.width, rect.height) * 0.18; // max 18% of button size
      const newX = clamp(relX * force * (strength / 100), -maxTrans, maxTrans);
      const newY = clamp(relY * force * (strength / 100), -maxTrans, maxTrans);
      // Clamp scale
      const newScale = clamp(1 + force * 0.13, 1, 1.13);
      // Clamp rotation
      const maxRot = 10; // degrees
      const newRot = clamp((relX / rect.width) * maxRot, -maxRot, maxRot);
      // Animate
      animate(x, newX, { type: 'spring', stiffness: 300, damping: 22 });
      animate(y, newY, { type: 'spring', stiffness: 300, damping: 22 });
      animate(scale, newScale, { type: 'spring', stiffness: 300, damping: 22 });
      animate(rotate, newRot, { type: 'spring', stiffness: 300, damping: 22 });
      // Text: move opposite, less distance, and rotate
      animate(textX, clamp(-newX * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textY, clamp(-newY * 0.4, -maxTrans * 0.4, maxTrans * 0.4), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textScale, clamp(1 + force * 0.04, 1, 1.04), { type: 'spring', stiffness: 300, damping: 22 });
      animate(textRotate, clamp(-newRot * 0.7, -maxRot * 0.7, maxRot * 0.7), { type: 'spring', stiffness: 300, damping: 22 });
    }
  };

  // Handler for mouse leaving the button
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
      className={`bg-gradient-to-r from-[#6a85b6] via-[#bac8e0] to-[#f3e9d2] text-gray-800 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-lg/40 px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg relative overflow-hidden ${className}`}
      onClick={onClick}
      type={type}
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
      {...props}
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

export default MagneticButton;
