import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, HeroSection, FeaturesSection, Footer } from '../../components';
import { Brain, Trophy, Users, BookOpen, HelpCircle, ShieldCheck, Layers, ChevronDown } from 'lucide-react';
import MagneticButton from '../../components/common/MagneticButton';
import { getSystemStats } from '../../services/adminApi';
import type { SystemStats } from '../../services/adminApi';
import EnhancedTechSection from '../../components/features/EnhancedTechSection';

interface FAQItemProps {
  icon: React.ElementType;
  color: string;
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ icon: Icon, color, question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);
  const isYellow = color === 'text-yellow-400';
  const borderClass = isYellow
    ? `border-cyan-400/40 group-hover:border-yellow-400 ${open ? 'border-yellow-400' : ''}`
    : 'border-cyan-400/40';
  return (
    <motion.div
      className={`bg-[#23272f]/80 rounded-xl shadow-md border ${borderClass} group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="flex items-center w-full text-left px-6 py-4 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon className={`${color} w-6 h-6 mr-3`} />
        <span className="font-semibold text-cyan-300 flex-1 text-base">{question}</span>
        <ChevronDown className={`ml-2 ${color} transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        layout
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-6"
      >
        {open && <div className="py-2 text-gray-300 text-sm">{answer}</div>}
      </motion.div>
    </motion.div>
  );
};

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const HomePage = () => {
  const [stats, setStats] = React.useState<SystemStats | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSystemStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load stats. Please try again later.');
      } finally {
        setLoading(false);
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
      <nav className="fixed top-0 w-full bg-gradient-to-br from-[#0f0f0f]/50 via-[#1a1a1a]/50 to-[#050505]/50 backdrop-blur-sm z-50 overflow-x-auto px-4 sm:px-6 lg:px-8 h-auto min-h-[56px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link to="/" className="text-2xl font-bold text-cyan-400 tracking-tight">
                Smart Quiz Master
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors">
                Quiz
              </Link>
              <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-4"
            >
              {/* isLoggedIn ? (
                <>
                  <Button variant="gradient" size="lg" className="sm:w-auto px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl">
                    Dashboard
                  </Button>
                </>
              ) : ( */}
                <Button
                  variant="gradient"
                  size="lg"
                  className="sm:w-auto px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
              {/* ) */}
            </motion.div>
          </div>
        </div>
      </nav>

      <div className="pt-24">
        <HeroSection />
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#f3e9d2] via-[#bac8e0] to-[#6a85b6] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#222]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Create</h3>
              <p className="text-gray-700">Design your own quizzes with AI-powered question generation.</p>
            </div>
            <div className="bg-white/70 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Take</h3>
              <p className="text-gray-700">Challenge yourself or friends and get instant feedback.</p>
            </div>
            <div className="bg-white/70 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Analyze</h3>
              <p className="text-gray-700">Track your progress and discover areas to improve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#e0eafc] via-[#cfdef3] to-[#f3e9d2] relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#222]">Why Choose Smart Quiz Master?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Lightning Fast</h3>
              <p className="text-gray-700">Experience instant quiz generation and real-time feedback powered by advanced AI.</p>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Secure & Private</h3>
              <p className="text-gray-700">Your data is protected with industry-leading security and privacy standards.</p>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold text-lg mb-2 text-[#6a85b6]">Accessible Anywhere</h3>
              <p className="text-gray-700">Take quizzes and track progress from any device, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#f3e9d2] via-[#bac8e0] to-[#6a85b6] relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#222]">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 italic mb-4">"Smart Quiz Master made learning fun and effective. The AI-generated quizzes are spot on!"</p>
              <div className="font-semibold text-[#6a85b6]">— Priya S.</div>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 italic mb-4">"I love the instant feedback and the beautiful, easy-to-use interface."</p>
              <div className="font-semibold text-[#6a85b6]">— Alex R.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#6a85b6] via-[#bac8e0] to-[#f3e9d2] relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#222]">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8">Join thousands of learners and educators using Smart Quiz Master to transform their learning experience.</p>
          <MagneticButton
            className="px-10 py-4 font-semibold text-lg"
            onClick={() => window.location.href = '/signup'}
          >
            Create Your Free Account
          </MagneticButton>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-darker/80 backdrop-blur-md border-t border-brand-darkest relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Our Impact in Numbers
          </motion.h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading stats...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats && (
                <>
                  <motion.div
                    key="totalUsers"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex justify-center mb-4 text-blue-500" aria-label="Total Users">
                      <Users className="w-10 h-10" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stats.total_users}</div>
                    <div className="text-sm text-gray-400 mb-1">Total Users</div>
                    <div className="text-xs text-gray-500">Registered learners and educators</div>
                  </motion.div>
                  <motion.div
                    key="totalQuizzes"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex justify-center mb-4 text-blue-500" aria-label="Total Quizzes">
                      <BookOpen className="w-10 h-10" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stats.total_quizzes}</div>
                    <div className="text-sm text-gray-400 mb-1">Total Quizzes</div>
                    <div className="text-xs text-gray-500">Generated and shared quizzes</div>
                  </motion.div>
                  <motion.div
                    key="totalQuestions"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-center mb-4 text-blue-500" aria-label="Total Questions">
                      <Brain className="w-10 h-10" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stats.total_attempts}</div>
                    <div className="text-sm text-gray-400 mb-1">Total Questions</div>
                    <div className="text-xs text-gray-500">Questions in our database</div>
                  </motion.div>
                  <motion.div
                    key="totalSessions"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-center mb-4 text-blue-500" aria-label="Total Sessions">
                      <Layers className="w-10 h-10" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stats.active_sessions}</div>
                    <div className="text-sm text-gray-400 mb-1">Total Sessions</div>
                    <div className="text-xs text-gray-500">Quiz sessions completed</div>
                  </motion.div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#181A1B]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about Smart Quiz Master.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                icon: HelpCircle,
                color: "text-yellow-400",
                question: "How does the AI generate quizzes?",
                answer: "Our AI uses advanced language models and a curated question bank to generate quizzes tailored to your preferences.",
              },
              {
                icon: Layers,
                color: "text-pink-400",
                question: "Can I use Smart Quiz Master for multiple exams?",
                answer: "Absolutely. Our platform supports a wide range of competitive exams and custom quizzes.",
              },
              {
                icon: ShieldCheck,
                color: "text-purple-400",
                question: "Is my data secure?",
                answer: "Yes, we use industry-standard encryption and never share your data with third parties.",
              },
              {
                icon: BookOpen,
                color: "text-green-400",
                question: "Can I practice topic-wise?",
                answer: "Yes! You can select specific topics or categories for focused practice sessions.",
              },
              {
                icon: Trophy,
                color: "text-orange-400",
                question: "How does the gamification work?",
                answer: "You earn badges, maintain streaks, and unlock achievements as you progress and challenge friends.",
              },
            ].map((faq, i) => (
              <FAQItem key={i} icon={faq.icon} color={faq.color} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="container mx-auto text-center">
          <div className="mb-4 text-gray-500 font-semibold">Featured In</div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="/logo1.png" alt="Media 1" className="h-8 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300" />
            <img src="/logo2.png" alt="Media 2" className="h-8 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300" />
            <img src="/logo3.png" alt="Media 3" className="h-8 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300" />
            <img src="/logo4.png" alt="Media 4" className="h-8 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300" />
          </div>
        </div>
      </section>

   {/* Modern Landing Section - Inserted below newsletter */}

      {/* Unlock Your Learning Journey Section (FeaturesSection) */}
      <div className="relative z-10">
        <FeaturesSection />
      </div>

      {/* CTA Section - Unlock Your Learning Journey */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-brand-blue to-brand-purple relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 neon-glow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners and educators using Smart Quiz Master to transform their learning experience.
          </motion.p>
          <motion.div
            className="flex flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagneticButton
              className="px-8 py-3 font-semibold mx-auto max-w-xs sm:w-auto neon-glow-soft"
              onClick={() => navigate('/quiz')}
              strength={40}
              radius={120}
            >
              Start Quiz Now
            </MagneticButton>
            <MagneticButton
              className="px-8 py-3 font-semibold mx-auto max-w-xs sm:w-auto neon-glow-soft"
              onClick={() => navigate('/signup')}
              strength={40}
              radius={120}
            >
              Create Account
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Built with Modern Technology - Enhanced Animated Tech Cloud with Floating Icons */}
      <EnhancedTechSection />



      <Footer />
    </div>
  );
};

export default HomePage;
