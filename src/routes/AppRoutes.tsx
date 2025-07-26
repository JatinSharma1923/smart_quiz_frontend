import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import AuthPage from '../pages/auth/AuthPage';
import QuizPage from '../pages/quiz/QuizPage';
import ProfilePage from '../pages/profile/ProfilePage';
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage';
import AdminPage from '../pages/admin/AdminPage';
import GoalsPage from '../pages/goals/GoalsPage';
import AboutPage from '../pages/about/AboutPage';
import NotFound from '../pages/notfound/NotFound';
import SignInPage from '../pages/auth/SignInPage';
import SignUpPage from '../pages/auth/SignUpPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
