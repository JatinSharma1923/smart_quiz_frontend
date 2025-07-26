import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Trophy, Target, User, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Home', icon: <Home />, to: '/' },
  { label: 'Quiz', icon: <BookOpen />, to: '/quiz' },
  { label: 'Trophy', icon: <Trophy />, to: '/leaderboard' },
  { label: 'Goals', icon: <Target />, to: '/goals' },
  { label: 'Profile', icon: <User />, to: '/profile' },
  { label: 'Settings', icon: <Settings />, to: '/settings' },
];

const sidebarVariants = {
  collapsed: { width: 64 },
  expanded: { width: 240 },
};

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();

  return (
    <motion.aside
      className="fixed top-0 left-0 h-full z-40 bg-[#181c24] border-r border-white/10 shadow-lg flex flex-col"
      initial="collapsed"
      animate={expanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ overflow: 'hidden' }}
    >
      <div className="flex flex-col items-center py-6">
        <span className="text-2xl font-bold text-cyan-400 mb-8">SQM</span>
        <nav className="flex-1 w-full">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors duration-200
                  ${isActive ? 'bg-cyan-700/20 text-cyan-400' : 'text-gray-300 hover:bg-cyan-700/10 hover:text-cyan-300'}
                `}
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-xl">{item.icon}</span>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      className="text-base font-medium whitespace-nowrap"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-1" />
      <div className="p-4 text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Smart Quiz Master
      </div>
    </motion.aside>
  );
};

export default Sidebar;
