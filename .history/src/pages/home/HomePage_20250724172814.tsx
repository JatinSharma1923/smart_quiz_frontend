import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../../components/Hero/HeroSection';
import FeaturesSection from '../../components/features/FeaturesSection';
import Footer from '../../components/layout/Footer';
import { Brain, Trophy, Users, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/common/Button';

interface Stat {
  icon: JSX.Element;
  value: string;
  label: string;
  description: string;
}

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary demo state
  const [stats, setStats] = useState<Stat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats'); // Replace with actual API endpoint
        setStats(response.data);
      } catch (err) {
        setError('Failed to load stats. Please try again later.');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-black to-brand-darker text-white relative overflow-hidden">
      {/* Animated Grid Overlay + Noise Overlay for unique texture */}
      <div className="pointer-events-none fixed inset-0 z-0 grid-overlay" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 noise-overlay" aria-hidden="true" />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-brand-darkest overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link to="/" className="text-2xl font-bold text-blue-500">
                <span className="text-[#ff007f]">Smart Quiz Master</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors">
                <span className="bg-gradient-to-r from-[#ff007f] to-[#00f0ff] bg-clip-text text-transparent hover:underline hover:neon-glow">Take Quiz</span>
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                  <Link to="/goals" className="text-gray-300 hover:text-white transition-colors">
                    Goals
                  </Link>
                </>
              )}
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                <span className="bg-gradient-to-r from-[#ff007f] to-[#00f0ff] bg-clip-text text-transparent hover:underline hover:neon-glow">About</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex space-x-4"
            >
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 text-base sm:text-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Button
                  variant="gradient"
                  size="lg"
                  className="sm:w-auto px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16 relative z-10">
        <HeroSection />
      </div>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-darker/80 backdrop-blur-md border-t border-brand-darkest relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 neon-glow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Impact in Numbers
          </motion.h2>
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4 text-blue-500" aria-label={stat.label}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <div className="relative z-10">
        <FeaturesSection />
      </div>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-brand-blue to-brand-purple relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 neon-glow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Master Your Knowledge?
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners who are already improving their skills with AI-powered quizzes.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/quiz" className="inline-block">
              <Button
                variant="gradient"
                size="lg"
                className="px-8 py-3 font-semibold w-full neon-glow-soft"
              >
                Start Quiz Now
              </Button>
            </Link>
            <Link to="/signup" className="inline-block">
              <Button
                variant="gradient"
                size="lg"
                className="px-8 py-3 font-semibold w-full neon-glow-soft"
              >
                Create Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomePage;
