import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, details, color }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${color || 'bg-white'} text-center`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {details && <p className="text-xs text-gray-500">{details}</p>}
    </motion.div>
  );
};

export default FeatureCard;
