import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const DOTS = 80;
const DOT_COLORS = ['#666666', '#FFFFFF']; // Dark gray and white
const DOT_ROW_HEIGHT = 40; // px
const WAVE_AMPLITUDE = 15;
const WAVE_LENGTH = Math.PI * 2;
const WAVE_SPEED = 2.5; // seconds per cycle

const ScrollDivider: React.FC = () => {
  // Animate a single phase value from 0 to 2π in a loop
  const [phase, setPhase] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);
  const dividerRef = useRef<HTMLDivElement>(null);
  
  // Arrow movement state
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [rotation, setRotation] = useState(0);
  
  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (dividerRef.current) {
        setContainerWidth(dividerRef.current.offsetWidth - 32); // Account for padding
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Calculate arrow position based on current dot with exact synchronization
  const getArrowPosition = () => {
    const containerElement = dividerRef.current;
    if (!containerElement) return { x: 0, y: 0 };
    
    const actualWidth = containerElement.offsetWidth - 32; // Account for padding
    const dotSpacing = actualWidth / (DOTS - 1);
    
    // Position arrow exactly where the dots are positioned
    const xPixels = (currentDotIndex * dotSpacing) - (actualWidth / 2);
    
    // Use EXACT same wave calculation as the dots - no offset needed
    const dotOffset = (currentDotIndex / DOTS) * WAVE_LENGTH;
    const yPosition = Math.sin(phase + dotOffset) * WAVE_AMPLITUDE;
    
    return { x: xPixels, y: yPosition };
  };

// Phase animation - smooth and continuous
useEffect(() => {
  let frame: number;
  let start: number | null = null;
  function animate(t: number) {
    if (start === null) start = t;
    const elapsed = (t - start) / 1000;
    setPhase(((elapsed / WAVE_SPEED) * WAVE_LENGTH) % (2 * Math.PI));
    frame = requestAnimationFrame(animate);
  }
  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}, []);

  // Arrow jumping logic - synchronized with wave movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDotIndex(prevIndex => {
        const nextIndex = prevIndex + direction;
        
        // Check boundaries and reverse direction smoothly
        if (nextIndex >= DOTS - 1) {
          setDirection(-1);
          setRotation(180); // Face left
          return DOTS - 1;
        } else if (nextIndex <= 0) {
          setDirection(1);
          setRotation(0); // Face right
          return 0;
        }
        
        return nextIndex;
      });
    }, 200); // Faster timing to better sync with wave movement
    
    return () => clearInterval(interval);
  }, [direction]);

    // OLDER ARROW MOVEMENT - Commented out
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPosition(prevPos => {
  //       const newPos = prevPos + (direction * 0.8); // Move 0.8 units per frame for smoother motion
  //       
  //       // Check boundaries and reverse direction
  //       if (newPos >= rightBoundary) {
  //         setDirection(-1);
  //         setRotation(180); // Face left
  //         return rightBoundary;
  //       } else if (newPos <= leftBoundary) {
  //         setDirection(1);
  //         setRotation(0); // Face right
  //         return leftBoundary;
  //       }
  //       
  //       return newPos;
  //     });
  //   }, 16); // Update every 16ms (~60fps) for ultra-smooth animation
  //   
  //   return () => clearInterval(interval);
  // }, [direction]);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Get current arrow position
  const arrowPos = getArrowPosition();

  return (
    <div ref={dividerRef} className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center w-full pb-4">
      {/* Animated Dots Wave */}
      <div
        className="absolute left-0 right-0 w-full flex flex-row justify-between pointer-events-none z-10 px-4"
        style={{ 
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
                {Array.from({ length: DOTS }).map((_, i) => {
          // Each dot's y position based on wave function
          const offset = (i / DOTS) * WAVE_LENGTH;
          const yPosition = Math.sin(phase + offset) * WAVE_AMPLITUDE;
          return (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: 7,
                height: 7,
                background: DOT_COLORS[i % DOT_COLORS.length],
                boxShadow: `0 0 6px ${DOT_COLORS[i % DOT_COLORS.length]}`,
                y: yPosition
              }}
            />
          );
        })}
      </div>
      
      {/* Arrow following the wave with EXACT positioning - positioned above dots */}
      <div
        className="absolute z-20 cursor-pointer hover:scale-110 active:scale-95"
        onClick={handleScroll}
        style={{ 
          pointerEvents: 'auto',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${arrowPos.x}px), calc(-50% + ${arrowPos.y - 25}px)) rotate(${rotation}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.2s ease-out'
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_16px_#810844]"
        >
          {/* Main arrow shaft */}
          <path
            d="M24 6L24 34"
            stroke="#810844"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Arrow head */}
          <path
            d="M18 28L24 38L30 28"
            stroke="#810844"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Arrow head fill */}
          <polygon
            points="18,28 24,38 30,28"
            fill="#810844"
            style={{ filter: 'drop-shadow(0 0 8px #810844)' }}
          />
        </svg>
      </div>
      
      {/* OLDER ARROW MOVEMENT - Commented out */}
      {/* <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ 
          x: position,
          y: [0, 3, 0], // Keep the floating motion
          rotate: rotation
        }}
        transition={{ 
          x: {
            duration: 0.05,
            ease: "linear"
          },
          y: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
        className="drop-shadow-[0_0_16px_#810844] z-20 cursor-pointer"
        onClick={handleScroll}
        style={{ pointerEvents: 'auto' }}
      >
        <motion.path
          d="M24 6L24 34"
          stroke="#810844"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        
        <motion.path
          d="M18 28L24 38L30 28"
          stroke="#810844"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        <motion.polygon
          points="18,28 24,38 30,28"
          fill="#810844"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ filter: 'drop-shadow(0 0 8px #810844)' }}
        />
      </motion.svg> */}
      
      <span
        className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-mono opacity-80 tracking-wide select-none z-20 cursor-pointer"
        onClick={handleScroll}
        style={{ 
          pointerEvents: 'auto',
          background: 'linear-gradient(to right, #6a85b6, #bac8e0, #f3e9d2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 6px rgba(106, 133, 182, 0.5)'
        }}
      >
        Scroll to explore
      </span>
    </div>
  );
};

export default ScrollDivider;