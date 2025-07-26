import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import MagneticButton from '../common/MagneticButton';
import BlobBackground from './BlobBackground';
import ScrollDivider from './ScrollDivider';
import ThreeDFloatingBox from './3DFloatingBox';
import { useNavigate } from 'react-router-dom';
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (subheadlineRef.current && ctaRef.current) {
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0.2, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: subheadlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0.2, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          delay: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }
  }, []);

  const handleCTAClick = () => {
    navigate('/quiz');
  };
  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#050505] flex items-center justify-center pt-0 mt-0 z-0"
    > 
      {/* Animated Grid Overlay */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 grid-overlay" aria-hidden="true" /> */}
      {/* Background Elements */}
      <BlobBackground />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <ThreeDFloatingBox />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Top badge: pill, glowing */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-block px-6 py-2 rounded-full bg-black/70 border-2 border-cyan-400 shadow-[0_0_16px_#00fff7] text-cyan-200 font-semibold text-base tracking-wide backdrop-blur-md">
            ✨ Next-Gen Quiz Platform
          </span>
        </motion.div>
        {/* Headline: bold, neon-glow, centered */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 drop-shadow-[0_0_16px_#ff007f]"
        >
          Smart Quiz Platform.
        </motion.h1>
        {/* Subheadline: centered, white/yellow, medium size */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-2xl text-center text-yellow-100 mb-10 font-medium"
        >
          Unlock your potential. Challenge your knowledge. Shape your future.
        </motion.p>
        {/* CTA: MagneticButton, magnetic text */}
        <div className="flex justify-center mb-12">
          <MagneticButton
            className="px-10 py-5 text-lg md:text-xl rounded-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink text-white font-bold tracking-wide shadow-lg border-2 border-brand-cyan/40 hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={handleCTAClick}
            strength={80}
            radius={180}
          >
            <motion.span
              initial={{ letterSpacing: '0.05em', scale: 1 }}
              animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="inline-block"
            >
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent">
                Start Creating
              </span>
            </motion.span>
          </MagneticButton>
        </div>
        {/* Feature icons row (optional, as in screenshot) */}
        <div className="flex justify-center gap-8 mt-8 mb-2">
          <div className="flex flex-col items-center">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400 mb-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 12l-4-4-4 4m8 0H4m16 0h-4" /></svg>
            <span className="text-xs text-cyan-200 font-semibold">Live Analytics</span>
            <span className="text-[10px] text-gray-400 mt-1">Get real-time insights and analytics on your quiz performance.</span>
          </div>
          {/* Add more icons as needed */}
        </div>
      </div>

      {/* Scroll Divider */}
      <ScrollDivider />
    </section>
  );
};

export default HeroSection;