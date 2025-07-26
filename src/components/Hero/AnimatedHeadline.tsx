import * as React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
interface AnimatedHeadlineProps {
  headlineWords?: string[];
  tagline?: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ headlineWords, tagline }) => {
  const words = headlineWords || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8
      }
    }
  };

  const word = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 90,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const highlight = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: 2.5
      }
    }
  };

  return (
    <motion.h1
      variants={container as any}
      initial="hidden"
      animate="visible"
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#ffffff] tracking-tight leading-tight mb-8"
    >
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
        {words.map((text: string, index: number) => (
          <motion.span
            key={index}
            variants={word as any}
            className={`inline-block drop-shadow-lg ${
              text === 'Smart' ? 'relative' : ''
            }`}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {text === 'Smart' ? (
              <span className="relative">
                {text}
                <motion.div
                  variants={highlight as any}
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] rounded-full origin-left"
                  style={{ transformOrigin: 'left center' }}
                />
              </span>
            ) : (
              text
            )}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="text-lg sm:text-xl md:text-2xl font-normal text-cyan-300 mt-4 tracking-wide"
      >
        {tagline}
      </motion.div>
    </motion.h1>
  );
};

export default AnimatedHeadline;
