import React, { useEffect, useState } from 'react';
import { BookOpen, PlusCircle, ListChecks, UserCircle, Loader2 } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import Button from '../../components/common/Button';
import axios from 'axios';
import './QuizPage.css'; // Import external CSS file

interface Quiz {
  id: number;
  title: string;
  questions: number;
  date: string;
}

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes'); // Replace with actual API endpoint
        setQuizzes(response.data);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const progressBar = document.querySelector<HTMLElement>('.progress-bar');
    if (progressBar) {
      progressBar.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [progress]);

  const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await axios.post('/api/generate-quiz', { topic: 'Sample Topic' }); // Replace with actual API endpoint and data
      setQuizzes([...quizzes, response.data]);
    } catch (err) {
      setError('Failed to generate quiz. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-brand-darkest to-brand-dark text-white py-16 px-4 relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto mb-8">
        <div className="progress-bar-container">
          <div className="progress-bar" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <AnimatedHeadline />

        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Quiz List Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white relative">
            <ListChecks className="h-6 w-6 text-white" /> Your Quizzes
          </h2>
          <div className="bg-brand-darkest/90 p-4 rounded-xl border border-white/40">
            {quizzes.length === 0 ? (
              <div className="text-gray-400">No quizzes found. Generate a new quiz!</div>
            ) : (
              <ul className="space-y-3">
                {quizzes.map((quiz) => (
                  <li
                    key={quiz.id}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all border group ${selectedQuiz === quiz.id ? 'bg-white/20 border-white' : 'hover:bg-brand-pink/10 border-brand-pink/40 hover:scale-105 hover:shadow-lg'}`}
                    onClick={() => {
                      setSelectedQuiz(quiz.id);
                      setProgress(((quiz.id) / quizzes.length) * 100);
                    }}
                    aria-label={`Select quiz: ${quiz.title}`}
                  >
                    <div className="flex items-center gap-3">
                      <UserCircle className="h-8 w-8 text-white" />
                      <span className="font-semibold text-white">{quiz.title}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{quiz.questions} Qs • {quiz.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Quiz Detail Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-brand-pink relative">
            <BookOpen className="h-6 w-6 text-brand-pink" /> Quiz Detail
          </h2>
          <div className="bg-brand-darkest/90 p-4 rounded-xl border border-brand-pink/40 min-h-[120px]">
            {selectedQuiz ? (
              <div>
                <div className="font-bold mb-2 text-brand-pink">{quizzes.find(q => q.id === selectedQuiz)?.title}</div>
                <div className="text-gray-400 mb-2">Questions: {quizzes.find(q => q.id === selectedQuiz)?.questions}</div>
                <div className="text-gray-500 text-sm">Date: {quizzes.find(q => q.id === selectedQuiz)?.date}</div>
                <div className="my-4 h-1 w-full bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-purple rounded-full" />
                <div className="mt-4 text-white">[Quiz questions and details will appear here]</div>
              </div>
            ) : (
              <div className="text-gray-400">Select a quiz to view details.</div>
            )}
          </div>
        </section>

        {/* Quiz Generation Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white relative">
            <PlusCircle className="h-6 w-6 text-white" /> Generate New Quiz
          </h2>
          <div className="bg-brand-darkest/90 p-4 rounded-xl border border-white/40">
            <form
              className="flex flex-col md:flex-row gap-4 items-center"
              onSubmit={handleGenerateQuiz}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan/60"
                placeholder="Enter topic or paste URL..."
                aria-label="Enter quiz topic or URL"
              />
              <Button
                type="submit"
                variant="gradient"
                className="px-6 py-2 rounded-lg font-semibold transition-colors"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin h-5 w-5" /> Generating...</span>
                ) : (
                  'Generate Quiz'
                )}
              </Button>
            </form>
            <div className="mt-4 text-gray-400 text-sm">[Quiz generation results will appear here]</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizPage;

