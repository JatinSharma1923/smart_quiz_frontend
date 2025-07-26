import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import Button from '../../components/common/Button';

const NotFound = () => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/'; // Fallback to home page
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-white mb-4">404</div>
        <AnimatedHeadline />
        <p className="text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. Don't worry, you can still explore our amazing quiz platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 border-2 border-white/40"
            aria-label="Go to Home Page"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            to="/quiz"
            className="bg-brand-darkest text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 border-2 border-white/40"
            aria-label="Take a Quiz"
          >
            <Search className="h-5 w-5" />
            Take Quiz
          </Link>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="text-white transition-colors flex items-center gap-2 mx-auto"
            icon={<ArrowLeft className="h-4 w-4" />}
            aria-label="Go Back to Previous Page"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
