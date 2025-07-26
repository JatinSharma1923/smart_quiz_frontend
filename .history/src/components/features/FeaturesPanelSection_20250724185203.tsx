import * as React from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse">
        <circle cx="20" cy="20" r="16" stroke="#39FF14" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r="8" stroke="#39FF14" strokeWidth="2" fill="none" />
      </svg>
    ),
    title: 'AI-Powered Insights',
    description: 'Leverage advanced AI to analyze your quiz performance and boost your learning.'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 animate-spin-slow">
        <rect x="8" y="8" width="24" height="24" rx="6" stroke="#39FF14" strokeWidth="3" fill="none" />
        <rect x="16" y="16" width="8" height="8" rx="2" stroke="#39FF14" strokeWidth="2" fill="none" />
      </svg>
    ),
    title: 'Customizable Quizzes',
    description: 'Create, edit, and share quizzes tailored to your unique learning goals.'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce">
        <polygon points="20,6 36,34 4,34" stroke="#39FF14" strokeWidth="3" fill="none" />
        <circle cx="20" cy="26" r="3" fill="#39FF14" />
      </svg>
    ),
    title: 'Real-Time Collaboration',
    description: 'Work together with friends or classmates in real time for a dynamic learning experience.'
  }
];

// Feature Card Component
export const FeatureCard = ({ icon, title, description, color }: {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}) => {
  return (
    <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesPanelSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="flex-1 bg-[#181A1B]/80 border-2 border-[#39FF14] rounded-2xl shadow-[0_0_24px_#39FF14] backdrop-blur-md p-6 sm:p-8 flex flex-col items-center text-center min-w-[200px] max-w-md w-full"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.8, delay: i * 0.15 } }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#39FF14] mb-3 drop-shadow-[0_0_8px_#39FF14] tracking-wide">
              {feature.title}
            </h3>
            <p className="text-base sm:text-lg text-[#F3F3F3] font-normal opacity-90">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesPanelSection; 