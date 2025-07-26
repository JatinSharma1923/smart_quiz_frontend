import axiosInstance from './axiosInstance';
import type { QuizGenerationRequest, QuizGenerationResponse } from './openaiApi';

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  difficulty: string;
  question_count: number;
  estimated_time: number;
  created_at: string;
  created_by: string;
  is_public: boolean;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  completed_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  score: number;
  rank: number;
  quizzes_taken: number;
  accuracy: number;
}

export interface QuizSubmission {
  quiz_id: string;
  answers: {
    question_id: string;
    selected_answer: string;
  }[];
  time_taken: number;
}

export interface QuizResult {
  attempt_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  accuracy: number;
  time_taken: number;
  feedback: string;
  detailed_results: {
    question_id: string;
    user_answer: string;
    correct_answer: string;
    is_correct: boolean;
    explanation: string;
  }[];
}

// Quiz Management APIs
export const getUserQuizzes = async (userId: string): Promise<Quiz[]> => {
  try {
    const response = await axiosInstance.get(`/quiz/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user quizzes:', error);
    throw new Error('Failed to fetch user quizzes');
  }
};

export const getQuizById = async (quizId: string): Promise<Quiz> => {
  try {
    const response = await axiosInstance.get(`/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw new Error('Failed to fetch quiz');
  }
};

export const getQuizQuestions = async (quizId: string): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(`/quiz/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw new Error('Failed to fetch quiz questions');
  }
};

export const submitQuiz = async (submission: QuizSubmission): Promise<QuizResult> => {
  try {
    const response = await axiosInstance.post('/quiz/submit', submission);
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw new Error('Failed to submit quiz');
  }
};

export const getQuizAttempts = async (userId: string): Promise<QuizAttempt[]> => {
  try {
    const response = await axiosInstance.get(`/quiz/attempts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    throw new Error('Failed to fetch quiz attempts');
  }
};

export const getQuizAttempt = async (attemptId: string): Promise<QuizAttempt> => {
  try {
    const response = await axiosInstance.get(`/quiz/attempt/${attemptId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz attempt:', error);
    throw new Error('Failed to fetch quiz attempt');
  }
};

// Leaderboard APIs
export const getLeaderboard = async (limit?: number): Promise<LeaderboardEntry[]> => {
  try {
    const params = limit ? { limit } : {};
    const response = await axiosInstance.get('/leaderboard', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw new Error('Failed to fetch leaderboard');
  }
};

export const getUserRank = async (userId: string): Promise<{ rank: number; total_users: number }> => {
  try {
    const response = await axiosInstance.get(`/leaderboard/rank/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    throw new Error('Failed to fetch user rank');
  }
};

// Quiz Generation APIs (re-export from openaiApi)
export const generateQuiz = async (request: QuizGenerationRequest): Promise<QuizGenerationResponse> => {
  try {
    const response = await axiosInstance.post('/quiz/generate/ai', request);
    return response.data;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz');
  }
};

export const generateQuizFromURL = async (url: string, request: Partial<QuizGenerationRequest>): Promise<QuizGenerationResponse> => {
  try {
    const response = await axiosInstance.post('/quiz/generate/from-url', {
      url,
      ...request
    });
    return response.data;
  } catch (error) {
    console.error('Error generating quiz from URL:', error);
    throw new Error('Failed to generate quiz from URL');
  }
};

// Quiz Analytics APIs
export const getQuizAnalytics = async (quizId: string): Promise<{
  total_attempts: number;
  average_score: number;
  completion_rate: number;
  average_time: number;
}> => {
  try {
    const response = await axiosInstance.get(`/quiz/${quizId}/analytics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz analytics:', error);
    throw new Error('Failed to fetch quiz analytics');
  }
};

export const getUserQuizStats = async (userId: string): Promise<{
  total_quizzes_taken: number;
  average_score: number;
  best_score: number;
  total_time_spent: number;
  favorite_topics: string[];
}> => {
  try {
    const response = await axiosInstance.get(`/quiz/stats/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user quiz stats:', error);
    throw new Error('Failed to fetch user quiz stats');
  }
};

// Quiz Sharing APIs
export const shareQuiz = async (quizId: string, isPublic: boolean): Promise<void> => {
  try {
    await axiosInstance.put(`/quiz/${quizId}/share`, { is_public: isPublic });
  } catch (error) {
    console.error('Error sharing quiz:', error);
    throw new Error('Failed to share quiz');
  }
};

export const getPublicQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await axiosInstance.get('/quiz/public');
    return response.data;
  } catch (error) {
    console.error('Error fetching public quizzes:', error);
    throw new Error('Failed to fetch public quizzes');
  }
};

export default {
  getUserQuizzes,
  getQuizById,
  getQuizQuestions,
  submitQuiz,
  getQuizAttempts,
  getQuizAttempt,
  getLeaderboard,
  getUserRank,
  generateQuiz,
  generateQuizFromURL,
  getQuizAnalytics,
  getUserQuizStats,
  shareQuiz,
  getPublicQuizzes,
};