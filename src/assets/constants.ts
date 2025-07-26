// App Configuration
export const APP_CONFIG = {
  name: 'Smart Quiz Master',
  version: '1.0.0',
  description: 'AI-powered quiz platform for learning and knowledge testing',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Theme Colors
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Quiz Configuration
export const QUIZ_CONFIG = {
  defaultQuestionCount: 10,
  maxQuestionCount: 50,
  timeLimit: 30 * 60, // 30 minutes in seconds
  difficultyLevels: ['easy', 'medium', 'hard'] as const,
  questionTypes: ['mcq', 'true_false', 'image'] as const,
} as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: 'Home', path: '/', icon: 'Home' },
  { name: 'Take Quiz', path: '/quiz', icon: 'BookOpen' },
  { name: 'Leaderboard', path: '/leaderboard', icon: 'Trophy' },
  { name: 'Goals', path: '/goals', icon: 'Target' },
  { name: 'About', path: '/about', icon: 'Info' },
] as const;

// Feature Cards Data
export const FEATURES_DATA = [
  {
    id: 1,
    title: 'AI-Generated Quizzes',
    description: 'Generate topic-wise quizzes with accurate explanations and difficulty levels.',
    icon: 'Brain',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Secure & Reliable',
    description: 'Built with FastAPI, OpenAI, and advanced caching for performance and safety.',
    icon: 'ShieldCheck',
    color: 'green',
  },
  {
    id: 3,
    title: 'Career-Ready',
    description: 'Prepare for UPSC, SSC, and MNC interviews with real-world trivia and facts.',
    icon: 'Rocket',
    color: 'purple',
  },
] as const;

// Stats Data
export const STATS_DATA = [
  {
    id: 1,
    label: 'AI-Generated',
    value: '1000+',
    description: 'Quizzes Created',
    icon: 'Brain',
  },
  {
    id: 2,
    label: 'Active Users',
    value: '50K+',
    description: 'Learning Daily',
    icon: 'Trophy',
  },
  {
    id: 3,
    label: 'Topics Covered',
    value: '200+',
    description: 'Subjects Available',
    icon: 'Users',
  },
  {
    id: 4,
    label: 'Success Rate',
    value: '95%',
    description: 'Pass Rate',
    icon: 'BookOpen',
  },
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to access this resource.',
  forbidden: 'Access denied. You don\'t have permission.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  timeout: 'Request timed out. Please try again.',
  unknown: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  login: 'Successfully logged in!',
  register: 'Account created successfully!',
  logout: 'Successfully logged out!',
  quizGenerated: 'Quiz generated successfully!',
  quizSubmitted: 'Quiz submitted successfully!',
  profileUpdated: 'Profile updated successfully!',
  passwordChanged: 'Password changed successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  user: 'user',
  theme: 'theme',
  language: 'language',
  quizProgress: 'quiz_progress',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  user: {
    profile: '/user/me',
    stats: '/user/stats',
    badges: '/user/badges',
    sessions: '/user/sessions',
  },
  quiz: {
    generate: '/quiz/generate/ai',
    generateFromUrl: '/quiz/generate/from-url',
    submit: '/quiz/submit',
    userQuizzes: '/quiz/user',
    publicQuizzes: '/quiz/public',
  },
  admin: {
    stats: '/admin/stats',
    apiKeys: '/admin/api-keys',
    logs: '/admin/logs',
    health: '/admin/health',
  },
} as const;