//Axios wrapper for FastAPI calls
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/quiz", // change after deploy
});

export const fetchQuiz = (topic, difficulty = "medium", q_type = "mcq") =>
  api.get("/generate", {
    params: { topic, difficulty, q_type },
  });

export const fetchDashboardData = async () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userName: 'Alex',
        recentActivity: [
          'Completed "React Basics" quiz',
          'Scored 85% on "JavaScript Advanced"',
        ],
        suggestedQuizzes: [
          { id: 1, title: 'Python Fundamentals', description: 'Test your Python basics!' },
          { id: 2, title: 'CSS Mastery', description: 'How well do you know CSS?' },
        ],
        progressSummary: 'You have completed 5 quizzes and earned 2 badges.',
        motivation: 'Every day is a chance to learn something new! 🚀',
      });
    }, 1200);
  });
};
