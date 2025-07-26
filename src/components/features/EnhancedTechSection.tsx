import { useState, useEffect, useRef } from 'react';
import { motion,useAnimation } from 'framer-motion';
import { GraduationCap, Sparkles, Building2, Briefcase, Users, Brain } from 'lucide-react';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } }
};

// Neural String Background for Split-Panel
const NeuralStringBackground: React.FC = () => {
    const [t, setT] = useState(0);
    const requestRef = useRef<number | undefined>(undefined);
  
    useEffect(() => {
      const animate = () => {
        setT(prev => prev + 0.03);
        requestRef.current = requestAnimationFrame(animate);
      };
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current!);
    }, []);
  
    // Generate a wavy path with animated control points
    const width = 1200;
    const height = 180;
    const points = 17;
    const amplitude = 38;
    const baseY = height / 2;
      // Main path points(first string)
  const pointData = Array.from({ length: points }, (_, i) => {
    // Start and end points off-canvas
      const x = -100 + ((width + 200) / (points - 1)) * i;
      const phase = t + i * 0.45;
      const y = baseY + Math.sin(phase) * amplitude ;
        return { x, y };

    });
      // Second string with pi/2 phase offset
  const pointData2 = Array.from({ length: points }, (_, i) => {
        const x = -100 + ((width + 200) / (points - 1)) * i;
        const phase = t + i * 0.45 + Math.PI / 2;
        const y = baseY + Math.sin(phase) * amplitude - 50;
        return { x, y };
    });
    // Offset for parallel strands
    const offset = 18;
    const leftData = pointData.map((pt, i) => ({ x: pt.x, y: pt.y - offset }));
    const rightData = pointData.map((pt, i) => ({ x: pt.x, y: pt.y + offset }));
    const leftData2 = pointData2.map((pt, i) => ({ x: pt.x, y: pt.y - offset }));
    const rightData2 = pointData2.map((pt, i) => ({ x: pt.x, y: pt.y + offset }));
    // Catmull-Rom spline for smoothness
    function catmullRom2bezier(points: {x:number, y:number}[]) {
        let d = '';
        for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        if (i === 0) d += `M${p1.x},${p1.y}`;
        d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
        }
        return d;
    }
    const dMain = catmullRom2bezier(pointData);
    const dLeft = catmullRom2bezier(leftData);
    const dRight = catmullRom2bezier(rightData);
    const dMain2 = catmullRom2bezier(pointData2);
    const dLeft2 = catmullRom2bezier(leftData2);
    const dRight2 = catmullRom2bezier(rightData2);
    
    return (
        <div className="flex justify-center items-center w-full my-16">
        <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98vw] max-w-[1400px] h-40 md:h-48 pointer-events-none z-0"
        style={{ filter: 'blur(0.7px)' }}
        >
        <defs>
        <linearGradient id="stringGradient3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a21caf" />
            <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <radialGradient id="stringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
            </filter>
        </defs>
        {/* First string */}
        <path d={dMain} stroke="url(#stringGradient3)" strokeWidth="18" fill="none" filter="url(#glow3)" opacity="0.85" />
        <path d={dMain} stroke="#fff" strokeWidth="5" fill="none" opacity="0.7" filter="url(#glow3)" />
        <path d={dLeft} stroke="url(#stringGradient3)" strokeWidth="5" fill="none" opacity="0.5" filter="url(#glow3)" />
        <path d={dRight} stroke="url(#stringGradient3)" strokeWidth="5" fill="none" opacity="0.5" filter="url(#glow3)" />
        {/* Second string with pi/2 phase offset */}
        <path d={dMain2} stroke="url(#stringGradient3)" strokeWidth="18" fill="none" filter="url(#glow3)" opacity="0.7" />
        <path d={dMain2} stroke="#fff" strokeWidth="5" fill="none" opacity="0.5" filter="url(#glow3)" />
        <path d={dLeft2} stroke="url(#stringGradient3)" strokeWidth="5" fill="none" opacity="0.3" filter="url(#glow3)" />
        <path d={dRight2} stroke="url(#stringGradient3)" strokeWidth="5" fill="none" opacity="0.3" filter="url(#glow3)" />
        </svg>
        </div>
    );
    };

const EnhancedTechSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const personas = [
    {
      key: 'students',
      icon: <GraduationCap size={48} className="text-cyan-400" />,
      title: 'Students',
      desc: 'Preparing for government and competitive exams with confidence and clarity.',
      color: 'text-cyan-400'
    },
    {
      key: 'enthusiasts',
      icon: <Sparkles size={48} className="text-purple-400" />,
      title: 'Knowledge Enthusiasts',
      desc: 'Level up your skills and knowledge, challenge yourself, and grow.',
      color: 'text-purple-400'
    },
    {
      key: 'institutes',
      icon: <Building2 size={48} className="text-yellow-400" />,
      title: 'Institutes',
      desc: 'Digitize and distribute your own test series to a wider audience.',
      color: 'text-yellow-400'
    },
    {
      key: 'professionals',
      icon: <Briefcase size={48} className="text-pink-400" />,
      title: 'Professionals',
      desc: 'Prepare for MNC placement and skill-based hiring with smart practice.',
      color: 'text-pink-400'
    }
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % personas.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [personas.length]);

  // Add missing states and dummies before return
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const shapeNames = ['Circle', 'Square', 'Triangle'];
  const shapeTypes = shapeNames;
  const currentShapeName = shapeNames[currentShapeIndex];
  const techPool = [
    { name: 'React', icon: <div>React</div> },
    // Add more as needed
  ];
  const iconCount = techPool.length;
  const shapePositions = new Array(iconCount).fill({ x: 0, y: 0 });

  // Dummy TechIcon component
  const TechIcon = ({ tech, position, index, isActive }: { tech: any; position: any; index: number; isActive: boolean }) => (
    <div style={{ position: 'absolute', left: position.x, top: position.y }}>
      {tech.name}
    </div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-cyan-400/5 via-blue-400/5 to-transparent blur-2xl"></div>
      </div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Built for Every Learner Pathway */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for Every Learner
        </motion.h2>

         {/* Dynamic Split-Panel with Living String Background */}

         <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mt-10 mb-12 relative">

          <NeuralStringBackground />
          {personas.map((persona, idx) => {
            const isActive = hovered === persona.key;
            return (
              <motion.div
                key={persona.key}
                className={`flex-1 flex flex-col items-center justify-center rounded-2xl shadow-lg cursor-pointer border transition-all duration-300 ${isActive ? persona.color + ' bg-black/80 border-white/20 scale-105 z-10' : 'bg-[#23272f]/80 border-transparent scale-95'}`}
                style={{ minWidth: 0, minHeight: 180 }}
                onMouseEnter={() => setHovered(persona.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(persona.key)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                initial={{ flex: 1, opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ flex: isActive ? 2 : 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 22, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className={`rounded-full p-6 mb-3 mt-4 bg-black/40 shadow-lg ${persona.color}`}>{persona.icon}</div>
                <div className="font-bold text-lg text-white mb-1">{persona.title}</div>
                <motion.div
                  className="text-sm text-center px-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`${persona.color} font-medium`}>{persona.desc}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {false && (
          <>
            {/* Tech Cloud Header and Content */}
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Built with Modern Technology
              </h2>
              <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
                Powered by cutting-edge technologies for optimal performance, scalability, and user experience
              </p>
              {/* Shape indicator */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20"
                key={currentShapeName}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Current Formation: {currentShapeName}</span>
              </motion.div>
            </motion.div>
            {/* Tech icons container */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative h-[700px] md:h-[900px]">
                {/* Central glow effect */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
                {/* Tech icons */}
                {techPool.slice(0, iconCount).map((tech, index) => (
                  <TechIcon
                    key={`${tech.name}-${currentShapeIndex}`}
                    tech={tech}
                    position={shapePositions[index]}
                    index={index}
                    isActive={!isTransitioning}
                  />
                ))}
              </div>
            </div>
            {/* Shape navigation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {shapeNames.map((name, index) => (
                <button
                  key={name}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentShapeIndex(index);
                      setIsTransitioning(false);
                    }, 200);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    index === currentShapeIndex
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                      : 'bg-black/20 text-gray-400 hover:bg-black/40 hover:text-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </motion.div>
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'Technologies', value: `${techPool.length}+` },
                { label: 'Formations', value: `${shapeTypes.length}` },
                { label: 'Performance', value: '99.9%' },
                { label: 'Uptime', value: '24/7' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default EnhancedTechSection;