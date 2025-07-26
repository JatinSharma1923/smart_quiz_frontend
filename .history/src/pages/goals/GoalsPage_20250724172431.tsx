import { Target, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import axios from 'axios';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [streak, setStreak] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGoalsAndStreak = async () => {
      try {
        const goalsResponse = await axios.get('/api/goals');
        setGoals(goalsResponse.data);

        const streakResponse = await axios.get('/api/streak');
        setStreak(streakResponse.data);
      } catch (error) {
        setErrorMessage('Failed to fetch goals and streak data. Please try again later.');
        console.error('Error fetching goals and streak data:', error);
      }
    };

    fetchGoalsAndStreak();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker text-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <AnimatedHeadline />
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Target className="h-8 w-8 text-blue-500" aria-label="Goals Icon" /> Goals & Streaks
        </h1>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
        )}

        {/* Goals Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
          <div className="bg-brand-darkest/80 p-4 rounded-lg space-y-4 border-2 border-white/40">
            {goals.length === 0 ? (
              <div className="text-gray-400">No active goals. Set a new goal!</div>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="flex flex-col gap-1">
                  <span className="font-semibold">{goal.title}</span>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{goal.progress} / {goal.total} completed</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Streaks Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" aria-label="Streak Icon" /> Streaks
          </h2>
          <div className="bg-brand-darkest/80 p-4 rounded-lg flex items-center gap-4 border-2 border-white/40">
            <Flame className="h-10 w-10 text-orange-500 animate-pulse" aria-label="Flame Icon" />
            <div>
              <div className="text-2xl font-bold text-orange-400">{streak} days</div>
              <div className="text-xs text-gray-400">Current learning streak</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GoalsPage;