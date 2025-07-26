'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../common/MagneticButton';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-md py-3' : 'bg-black/95 py-5'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left: Logo/Title */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 select-none">
          Smart Quiz Master
        </Link>
        {/* Center/Right: Links */}
        <nav className="flex items-center space-x-8">
          <Link to="/quiz" className="text-base font-medium text-white hover:text-pink-400 transition-colors duration-200">
            Take Quiz
          </Link>
          <Link to="/about" className="text-base font-medium text-white hover:text-green-400 transition-colors duration-200">
            About
          </Link>
        </nav>
        {/* Right: Magnetic Sign In Button */}
        <MagneticButton
          className="ml-6 px-6 py-2 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold shadow-lg border border-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => window.location.href = '/signin'}
          strength={70}
          radius={120}
        >
          <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-300 bg-clip-text text-transparent font-bold">
            Sign In
          </span>
        </MagneticButton>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
    >
      {children}
    </Link>
  );
};

export default Navbar; 