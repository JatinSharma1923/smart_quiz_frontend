import { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, ListChecks, UserCircle, Loader2 } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import Button from '../../components/common/Button';
import { getUserQuizzes, generateQuiz } from '../../services/quizApi';
import type { Quiz } from '../../services/quizApi';
import type { QuizGenerationRequest, QuizGenerationResponse } from '../../services/openaiApi';

const mockUserId = 'demo-user'; // Replace with real user ID from auth context

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [newQuizTopic, setNewQuizTopic] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserQuizzes(mockUserId);
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Handle quiz generation with real API
  const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newQuizTopic.trim()) return;
    setIsGenerating(true);
    setProgress(30);
    setError(null);
    try {
      const request: QuizGenerationRequest = {
        topic: newQuizTopic,
        difficulty: 'medium',
        questionType: 'mcq',
      };
      const response: QuizGenerationResponse = await generateQuiz(request);
      // Add the new quiz to the list (mapping response to Quiz type as best as possible)
      const newQuiz: Quiz = {
        id: response.quiz_id,
        title: response.title,
        difficulty: response.difficulty,
        question_count: response.questions.length,
        estimated_time: response.estimated_time,
        created_at: new Date().toISOString(),
        created_by: mockUserId,
        is_public: false,
      };
      setQuizzes(prev => [newQuiz, ...prev]);
      setNewQuizTopic('');
      setProgress(100);
      setTimeout(() => setProgress(0), 1500);
    } catch (err) {
      setError('Failed to generate quiz.');
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter quizzes based on status
  const filteredQuizzes = quizzes;

  // Helper functions for styling
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/40';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-brand-darkest to-brand-dark text-white py-16 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Neon Progress Bar */}
      <div className="w-full max-w-5xl mx-auto mb-8">
        <div className="h-3 w-full bg-brand-darkest/60 rounded-full overflow-hidden border-2 border-brand-cyan/40">
          <div
            className="h-full bg-gradient-to-r from-brand-pink to-brand-cyan transition-all duration-700 shadow-lg shadow-brand-cyan/50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedHeadline />
        
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-brand-cyan/40 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-cyan text-sm font-medium">Total Quizzes</p>
                <p className="text-2xl font-bold text-white">{quizzes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-brand-cyan" />
            </div>
          </div>
          
          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-green-500/40 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white">{quizzes.filter(q => q.status === 'completed').length}</p>
              </div>
              <ListChecks className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-brand-purple/40 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-purple text-sm font-medium">Average Score</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(quizzes.filter(q => q.score).reduce((acc, q) => acc + q.score, 0) / quizzes.filter(q => q.score).length) || 0}%
                </p>
              </div>
              <UserCircle className="h-8 w-8 text-brand-purple" />
            </div>
          </div>

          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-brand-pink/40 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-pink text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">{quizzes.filter(q => q.status === 'pending').length}</p>
              </div>
              <PlusCircle className="h-8 w-8 text-brand-pink" />
            </div>
          </div>
        </div>

        {/* Quiz List Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white relative">
              <ListChecks className="h-6 w-6 text-white" /> Your Quizzes
              <span className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full animate-ping" />
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'completed', 'pending'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === status 
                      ? 'bg-brand-cyan text-black shadow-lg shadow-brand-cyan/30' 
                      : 'bg-brand-darkest/70 text-gray-300 hover:bg-brand-pink/20 border border-white/20'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-darkest/90 p-4 rounded-xl border border-white/40 backdrop-blur-sm">
            {loading && (
              <div className="text-center py-10">
                <Loader2 className="h-12 w-12 text-brand-cyan animate-spin mx-auto mb-4" />
                <p className="text-lg text-gray-400">Loading your quizzes...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-10 text-red-400">
                <p className="text-lg">{error}</p>
                <p className="text-sm">Please try again later.</p>
              </div>
            )}
            {!loading && filteredQuizzes.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No quizzes found for "{filter}" status</p>
                <p className="text-sm">Generate a new quiz to get started!</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredQuizzes.map((quiz, index) => (
                  <li
                    key={quiz.id}
                    className={`flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all duration-300 border group ${
                      selectedQuiz?.id === quiz.id 
                        ? 'bg-white/20 border-white shadow-lg shadow-white/20' 
                        : 'hover:bg-brand-pink/10 border-brand-pink/40 hover:scale-105 hover:shadow-lg hover:shadow-brand-pink/20'
                    }`}
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setProgress(((index + 1) / quizzes.length) * 100);
                      setTimeout(() => setProgress(0), 2000);
                    }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="relative">
                        <UserCircle className="h-10 w-10 text-white" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-white group-hover:text-brand-cyan transition-colors">
                            {quiz.title}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{quiz.question_count} Questions</span>
                          <span>•</span>
                          <span>{quiz.estimated_time}</span>
                          <span>•</span>
                          <span className="capitalize">{quiz.created_by}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">{quiz.created_at}</span>
                    </div>
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
            <span className="absolute left-0 top-0 w-2 h-2 bg-brand-cyan rounded-full animate-ping" />
          </h2>
          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-brand-pink/40 min-h-[200px] backdrop-blur-sm">
            {selectedQuiz ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-2xl mb-2 text-brand-pink">{selectedQuiz.title}</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm border ${getDifficultyColor(selectedQuiz.difficulty)}`}>
                      {selectedQuiz.difficulty}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Questions</div>
                    <div className="font-semibold text-white">{selectedQuiz.question_count}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Duration</div>
                    <div className="font-semibold text-white">{selectedQuiz.estimated_time}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Category</div>
                    <div className="font-semibold text-white">{selectedQuiz.created_by}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Created At</div>
                    <div className="font-semibold text-white">{selectedQuiz.created_at}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-1 w-full bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-purple rounded-full" />
                
                <div className="text-white">
                  {`Ready to start this ${selectedQuiz.difficulty.toLowerCase()} level quiz with ${selectedQuiz.question_count} questions.`
                  }
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="gradient" className="flex-1">
                    Start Quiz
                  </Button>
                  <Button variant="secondary">
                    Share Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a quiz to view details</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quiz Generation Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white relative">
            <PlusCircle className="h-6 w-6 text-white" /> Generate New Quiz
            <span className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full animate-ping" />
          </h2>
          <div className="bg-brand-darkest/90 p-6 rounded-xl border border-white/40 backdrop-blur-sm">
            <form
              className="flex flex-col md:flex-row gap-4 items-center"
              onSubmit={handleGenerateQuiz}
            >
              <input
                type="text"
                value={newQuizTopic}
                onChange={(e) => setNewQuizTopic(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan/60 transition-all"
                placeholder="Enter topic or paste URL..."
                disabled={isGenerating}
              />
              <Button
                type="submit"
                variant="gradient"
                className="px-8 py-3 rounded-lg font-semibold transition-all"
                disabled={isGenerating || !newQuizTopic.trim()}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" /> 
                    Generating...
                  </span>
                ) : (
                  'Generate Quiz'
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
              <div className="text-gray-300 text-sm">
                <div className="font-semibold mb-2 text-brand-cyan">✨ AI-Powered Features:</div>
                <ul className="space-y-1 text-gray-400">
                  <li>• Smart question generation from any topic</li>
                  <li>• Adaptive difficulty based on your performance</li>
                  <li>• Real-time progress tracking and analytics</li>
                  <li>• Support for URLs, documents, and custom topics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizPage;