import * as React from 'react';
import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  type: 'reminder' | 'achievement' | 'system';
  message: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications: Notification[] = [
    { id: 1, type: 'reminder', message: 'Don’t forget to complete your daily quiz!' },
    { id: 2, type: 'achievement', message: 'You earned the “Quiz Master” badge!' },
    { id: 3, type: 'system', message: 'System maintenance scheduled for Sunday.' },
  ];
  const bellRef = useRef<HTMLButtonElement>(null);

  // Check if the current path matches the given path
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-bold text-xl">Smart<span className="text-yellow-300">Quiz</span></span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`${isActive('/') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/quiz"
                className={`${isActive('/quiz') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                Quizzes
              </Link>
              <Link
                to="/about"
                className={`${isActive('/about') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-indigo-800 hover:bg-yellow-300 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/profile"
                className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <div className="relative ml-4">
                <button
                  ref={bellRef}
                  aria-label="Show notifications"
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  tabIndex={0}
                >
                  <BellIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700" aria-label="Notifications">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 font-bold text-indigo-700 dark:text-indigo-300">Notifications</div>
                    <ul className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <li className="p-4 text-gray-500 text-center">No notifications</li>
                      ) : notifications.map((n) => (
                        <li key={n.id} className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
                          {n.type === 'reminder' && <span className="mr-2 text-yellow-500">⏰</span>}
                          {n.type === 'achievement' && <span className="mr-2 text-green-500">🏆</span>}
                          {n.type === 'system' && <span className="mr-2 text-blue-500">ℹ️</span>}
                          <span>{n.message}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-indigo-700 focus:outline-none"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`${isActive('/') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className={`${isActive('/quiz') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Quizzes
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'bg-indigo-700 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 pb-3 border-t border-indigo-700">
              <Link
                to="/login"
                className="bg-white text-indigo-600 hover:bg-gray-100 block w-full text-center px-4 py-2 rounded-md text-base font-medium mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-indigo-800 hover:bg-yellow-300 block w-full text-center px-4 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 