import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface QuizCardProps {
  id: string | number;
  title: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionsCount?: number;
  timeEstimate?: string;
  category?: string;
  imageUrl?: string | null;
  onClick?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  description,
  difficulty = 'medium',
  questionsCount = 10,
  timeEstimate = '10 min',
  category = 'General Knowledge',
  imageUrl = null,
  onClick,
}) => {
  const difficultyColor: Record<string, string> = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const defaultImage = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(80,80,180,0.10)' }}
      whileTap={{ scale: 0.97 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Quiz card: ${title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onClick && onClick(); } }}
    >
      {/* Card image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 m-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty.toLowerCase()]}`}>
            {difficulty}
          </span>
        </div>
        <div className="absolute top-0 right-0 m-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {category}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>

        {/* Quiz details */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {questionsCount} questions
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeEstimate}
          </div>
        </div>

        {/* Action button */}
        <Link
          to={`/quiz/${id}`}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
          aria-label={`Start quiz: ${title}`}
        >
          Start Quiz
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizCard; 