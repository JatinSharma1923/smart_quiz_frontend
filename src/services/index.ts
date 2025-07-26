// Export types and interfaces
export type {
  QuizGenerationRequest,
  QuizGenerationResponse,
  Question,
  ContentFetchRequest,
  ContentFetchResponse,
  DifficultyEstimationRequest,
  DifficultyEstimationResponse,
  TopicClassificationRequest,
  TopicClassificationResponse,
} from './openaiApi';

export type {
  User,
  UserStats,
  UserBadge,
  UserSession,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from './userApi';

export type {
  Quiz,
  QuizAttempt,
  LeaderboardEntry,
  QuizSubmission,
  QuizResult,
} from './quizApi';

export type {
  SystemStats,
  ApiKey,
  LogEntry,
  HealthStatus,
  CacheStatus,
} from './adminApi';

// Re-export axios instance
export { default as axiosInstance } from './axiosInstance';

// Default exports for convenience
export { default as openaiApi } from './openaiApi';
export { default as userApi } from './userApi';
export { default as quizApi } from './quizApi';
export { default as adminApi } from './adminApi';
