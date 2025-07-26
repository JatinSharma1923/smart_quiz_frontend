
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MouseTiltOptions {
  strength?: number;
  perspective?: number;
  smoothing?: number;
  maxTilt?: number;
  resetOnLeave?: boolean;
}

const useMouseTilt = (options: MouseTiltOptions = {}) => {
  const {
    strength = 0.3,
    perspective = 1000,
    smoothing = 0.1,
    maxTilt = 15,
    resetOnLeave = true
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isHovering.current) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (event.clientX - centerX) / (rect.width / 2);
      const y = (event.clientY - centerY) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));
      mousePos.current = { x: clampedX, y: clampedY };
      const tiltX = clampedY * strength * maxTilt;
      const tiltY = -clampedX * strength * maxTilt;
      gsap.to(element, {
        duration: smoothing,
        rotationX: tiltX,
        rotationY: tiltY,
        transformPerspective: perspective,
        transformOrigin: 'center center',
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      if (resetOnLeave) {
        gsap.to(element, {
          duration: smoothing * 2,
          rotationX: 0,
          rotationY: 0,
          transformPerspective: perspective,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(element, {
        rotationX: 0,
        rotationY: 0,
        transformPerspective: perspective,
        clearProps: 'transform'
      });
    };
  }, [strength, perspective, smoothing, maxTilt, resetOnLeave]);

  return elementRef;
};

export default useMouseTilt;