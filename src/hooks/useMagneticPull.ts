import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Hook similar to Motion+ Cursor's useMagneticPull
function useMagneticPull(ref: React.RefObject<HTMLElement | null>, strength = 0.3, radius = 100) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Button movement - faster spring
  const buttonSpringConfig = { stiffness: 300, damping: 25 };
  const buttonX = useSpring(x, buttonSpringConfig);
  const buttonY = useSpring(y, buttonSpringConfig);
  
  // Text movement - slower spring for lagging effect
  const textSpringConfig = { stiffness: 350, damping: 16 };
  const textX = useSpring(x, textSpringConfig);
  const textY = useSpring(y, textSpringConfig);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMouseMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const force = (radius - dist) / radius;
        x.set((dx / radius) * strength * radius * force);
        y.set((dy / radius) * strength * radius * force);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    // Use global mouse tracking instead of local events
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref, x, y, strength, radius]);

  return { 
    buttonX, 
    buttonY, 
    textX, 
    textY 
  };
}

export default useMagneticPull; 