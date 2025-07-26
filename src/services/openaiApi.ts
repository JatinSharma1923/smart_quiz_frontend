import axiosInstance from './axiosInstance';

export interface QuizGenerationRequest {
  topic: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionCount?: number;
  questionType?: 'mcq' | 'true_false' | 'image';
}

export interface QuizGenerationResponse {
  quiz_id: string;
  title: string;
  questions: Question[];
  difficulty: string;
  estimated_time: number;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  image_url?: string;
}

export interface ContentFetchRequest {
  url: string;
  topic?: string;
}

export interface ContentFetchResponse {
  content: string;
  summary: string;
  topics: string[];
}

export interface DifficultyEstimationRequest {
  content: string;
  topic: string;
}

export interface DifficultyEstimationResponse {
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
  reasoning: string;
}

export interface TopicClassificationRequest {
  content: string;
}

export interface TopicClassificationResponse {
  topics: string[];
  confidence: number;
}

// Quiz Generation API
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

// Content Fetching API
export const fetchContent = async (request: ContentFetchRequest): Promise<ContentFetchResponse> => {
  try {
    const response = await axiosInstance.post('/scraper/fetch-content', request);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw new Error('Failed to fetch content');
  }
};

// Difficulty Estimation API
export const estimateDifficulty = async (request: DifficultyEstimationRequest): Promise<DifficultyEstimationResponse> => {
  try {
    const response = await axiosInstance.post('/scraper/estimate-difficulty', request);
    return response.data;
  } catch (error) {
    console.error('Error estimating difficulty:', error);
    throw new Error('Failed to estimate difficulty');
  }
};

// Topic Classification API
export const classifyTopics = async (request: TopicClassificationRequest): Promise<TopicClassificationResponse> => {
  try {
    const response = await axiosInstance.post('/scraper/classify-topics', request);
    return response.data;
  } catch (error) {
    console.error('Error classifying topics:', error);
    throw new Error('Failed to classify topics');
  }
};

// Cache Management
export const getCachedContent = async (url: string): Promise<ContentFetchResponse | null> => {
  try {
    const response = await axiosInstance.get(`/scraper/cache/${encodeURIComponent(url)}`);
    return response.data;
  } catch (error) {
    return null; // Cache miss
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/scraper/cache/clear');
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw new Error('Failed to clear cache');
  }
};

// Health Check
export const checkOpenAIHealth = async (): Promise<{ status: string; message: string }> => {
  try {
    const response = await axiosInstance.get('/health/openai');
    return response.data;
  } catch (error) {
    console.error('Error checking OpenAI health:', error);
    throw new Error('Failed to check OpenAI health');
  }
};

export default {
  generateQuiz,
  generateQuizFromURL,
  fetchContent,
  estimateDifficulty,
  classifyTopics,
  getCachedContent,
  clearCache,
  checkOpenAIHealth,
};