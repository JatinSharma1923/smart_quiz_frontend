import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, Fragment } from 'react';
import * as gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ThreeDecorativeModel from './features/ThreeDecorativeModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleBackground from './features/ParticleBackground';

function useParallaxTilt(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.transform = `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [ref]);
}

gsap.registerPlugin(ScrollTrigger);

function FloatingSphere() {
  return (
    <mesh position={[-2, 1.2, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#38bdf8" transparent opacity={0.7} />
    </mesh>
  );
}
function FloatingTorus() {
  return (
    <mesh position={[2, -1, 0]} rotation={[0.5, 0.5, 0]}>
      <torusGeometry args={[0.5, 0.18, 16, 100]} />
      <meshStandardMaterial color="#f472b6" wireframe />
    </mesh>
  );
}

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useParallaxTilt(textContainerRef);

  // Framer Motion parallax for background blobs
  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 400], [0, 80]);
  const yBg2 = useTransform(scrollY, [0, 400], [0, 160]);

  // Mouse parallax for 3D model
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current && buttonRef.current) {
      // Entry animation (staggered)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, delay: 0.3, duration: 1, ease: 'power4.out' }
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, delay: 0.6, duration: 0.8, ease: 'back.out(1.7)' }
      );

      // Scroll-triggered parallax for text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top center',
          scrub: true,
        },
      });
      tl.to(titleRef.current, {
        y: -50,
        opacity: 0.5,
        scale: 0.95,
        duration: 1,
        ease: 'power1.out',
      });
      tl.to(subtitleRef.current, {
        y: -30,
        opacity: 0.6,
        duration: 1,
        ease: 'power1.out',
      }, '<');

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  const headline = [
    'Create', 'AI-Generated', 'Quizzes', <br key="br1" />,
    <span key="span1" className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Like Never Before</span>
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c6ff] text-white flex flex-col justify-center items-center overflow-hidden">
      <ParticleBackground />
      {/* Layered, animated, blurred gradient blobs */}
      <motion.div
        ref={bg1Ref}
        className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full blur-3xl opacity-30 z-0"
        style={{ y: yBg1 }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        ref={bg2Ref}
        className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400 to-fuchsia-600 rounded-full blur-2xl opacity-20 z-0"
        style={{ y: yBg2 }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-gradient-to-tl from-cyan-400 to-blue-700 rounded-full blur-2xl opacity-25 z-0"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 12, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating SVG shape for extra motion */}
      <motion.svg
        className="absolute left-[10%] bottom-[15%] w-[180px] h-[180px] z-0 opacity-30"
        viewBox="0 0 200 200"
        animate={{ y: [0, 30, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="90" ry="60" fill="url(#glow)" />
      </motion.svg>
      {/* Text Content */}
      <div ref={textContainerRef} className="relative z-10 text-center px-6 pt-24 md:pt-32 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-xl ring-1 ring-white/10">
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl flex flex-wrap justify-center gap-2"
          initial="hidden"
          animate="visible"
        >
          {headline.map((word, i) => (
            typeof word === 'string' ? (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.7, type: 'spring', stiffness: 80 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ) : (
              <Fragment key={i}>{word}</Fragment>
            )
          ))}
        </motion.h1>
        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-2xl opacity-80 max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
        >
          Smart Quiz Master lets you build, analyze, and scale quizzes — powered by OpenAI, styled with class.
        </motion.p>
        <motion.button
          ref={buttonRef}
          className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-pink-500 hover:to-indigo-600 transition text-white rounded-2xl text-lg shadow-2xl font-bold tracking-wide ring-2 ring-blue-400/40"
          whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(56,189,248,0.25)' }}
          whileTap={{ scale: 0.97 }}
          animate={{ boxShadow: [
            '0 0 0 0 rgba(56,189,248,0.25)',
            '0 0 32px 8px rgba(56,189,248,0.35)',
            '0 0 0 0 rgba(56,189,248,0.25)'
          ] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Get Started
        </motion.button>
      </div>
      {/* 3D Decorative Models Layer */}
      <motion.div
        className="pointer-events-none select-none absolute inset-0 w-full h-full z-0"
        initial={{}}
        animate={{}}
      >
        {/* Main 3D Model, now larger and more central */}
        <motion.div
          ref={modelRef}
          style={{
            rotateX: parallax.y * 10,
            rotateY: parallax.x * 10,
            transition: 'rotateX 0.2s, rotateY 0.2s',
            z: parallax.y * 10,
          }}
          animate={{ scale: [1, 1.03, 1], z: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[700px] md:h-[700px] opacity-80"
        >
          <ThreeDecorativeModel />
        </motion.div>
        {/* Floating Sphere - moves diagonally across the section */}
        <motion.div
          className="absolute"
          initial={{ x: -200, y: 100 }}
          animate={{ x: [0, 600, 0], y: [0, 300, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 260, height: 260 }}
        >
          <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 2]} intensity={0.4} />
            <FloatingSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </motion.div>
        {/* Floating Torus - moves in a different path */}
        <motion.div
          className="absolute"
          initial={{ x: 800, y: 400 }}
          animate={{ x: [800, 200, 800], y: [400, 0, 400] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 220, height: 220 }}
        >
          <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 2]} intensity={0.4} />
            <FloatingTorus />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </motion.div>
      </motion.div>
      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="block w-8 h-8 rounded-full border-2 border-white flex items-center justify-center animate-bounce mb-1">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <span className="text-xs text-white/70 tracking-wide">Scroll Down</span>
      </motion.div>
      {/* SVG Wave Divider */}
      <svg className="absolute bottom-0 left-0 w-full h-24 z-10" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" fillOpacity="0.12" d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,112C672,96,768,64,864,69.3C960,75,1056,117,1152,128C1248,139,1344,117,1392,106.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
      </svg>
    </section>
  );
};

export default HeroSection;
