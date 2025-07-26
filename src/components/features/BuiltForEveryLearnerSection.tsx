import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Building2, Briefcase } from 'lucide-react';

const personas = [
  {
    key: 'students',
    icon: <GraduationCap size={32} className="text-cyan-400" />,
    title: 'Students',
    desc: 'Preparing for government and competitive exams with confidence and clarity.'
  },
  {
    key: 'enthusiasts',
    icon: <Sparkles size={32} className="text-purple-400" />,
    title: 'Knowledge Enthusiasts',
    desc: 'Level up your skills and knowledge, challenge yourself, and grow.'
  },
  {
    key: 'institutes',
    icon: <Building2 size={32} className="text-yellow-400" />,
    title: 'Institutes',
    desc: 'Digitize and distribute your own test series to a wider audience.'
  },
  {
    key: 'professionals',
    icon: <Briefcase size={32} className="text-pink-400" />,
    title: 'Professionals',
    desc: 'Prepare for MNC placement and skill-based hiring with smart practice.'
  }
];

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } }
};

const BuiltForEveryLearnerSection: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for Every Learner
        </motion.h2>
        {/* Pathway */}
        <div className="flex flex-col md:flex-row items-center justify-center relative min-h-[320px] md:min-h-[220px]">
          {/* SVG Path */}
          <motion.svg
            width="100%"
            height="80"
            viewBox="0 0 800 80"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-20 hidden md:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M 80 40 Q 240 0 400 40 Q 560 80 720 40"
              stroke="url(#pathGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="0.5" stopColor="#a21caf" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </motion.svg>
          {/* Vertical Path for Mobile */}
          <motion.svg
            width="80"
            height="320"
            viewBox="0 0 80 320"
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-20 md:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M 40 40 Q 0 120 40 160 Q 80 200 40 280"
              stroke="url(#pathGradientV)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
            />
            <defs>
              <linearGradient id="pathGradientV" x1="0" y1="0" x2="0" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="0.5" stopColor="#a21caf" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </motion.svg>
          {/* Persona Stops */}
          <div className="flex md:flex-row flex-col w-full h-full items-center justify-between relative z-10">
            {personas.map((persona, idx) => (
              <div
                key={persona.key}
                className="flex flex-col items-center group w-full md:w-auto"
                onMouseEnter={() => setHovered(persona.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(persona.key)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                <motion.div
                  className={`relative flex items-center justify-center rounded-full border-4 shadow-xl transition-all duration-300 bg-gray-900/80 backdrop-blur-md cursor-pointer ${
                    hovered === persona.key ? 'border-cyan-400/80 scale-110 shadow-cyan-400/30' : 'border-gray-700/60'
                  }`}
                  style={{ width: 80, height: 80 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.13, boxShadow: '0 0 32px #22d3ee55' }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  {persona.icon}
                  {/* Glowing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{
                      boxShadow:
                        hovered === persona.key
                          ? '0 0 32px 8px #22d3ee55, 0 0 0 4px #a21caf33'
                          : '0 0 0 0 #0000'
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
                <div className="mt-4 text-lg font-semibold text-sky-200 text-center">
                  {persona.title}
                </div>
                {/* Description Tooltip/Panel */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hovered === persona.key ? 1 : 0,
                    y: hovered === persona.key ? 0 : 10,
                    pointerEvents: hovered === persona.key ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {hovered === persona.key && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 px-6 py-4 rounded-xl bg-black/95 backdrop-blur-md text-base text-white shadow-2xl border border-white/10 min-w-[220px] z-20">
                      <span className="text-cyan-300 font-medium">{persona.desc}</span>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForEveryLearnerSection;
