import { Trophy, User, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';

interface Leader {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

interface UserStats {
  rank: number;
  score: number;
  quizzesTaken: number;
  correctAnswers: number;
  accuracy: number;
}

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const [leadersResponse, statsResponse] = await Promise.all([
          axios.get('/api/leaderboard'), // Replace with actual API endpoint
          axios.get('/api/user-stats'), // Replace with actual API endpoint
        ]);
        setLeaders(leadersResponse.data);
        setUserStats(statsResponse.data);
      } catch (err) {
        setError('Failed to load leaderboard data. Please try again later.');
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-brand-dark to-black text-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeadline />

        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {/* Leaderboard Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-white relative">
                <Trophy className="h-6 w-6 text-white inline-block mr-2" /> Top Users
              </h2>
              <div className="bg-brand-darkest/90 p-4 rounded-xl border border-white/40">
                <ol className="space-y-3">
                  {leaders.map((leader, idx) => (
                    <li
                      key={leader.id}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 group ${idx === 0 ? 'bg-white/10 border-white' : 'bg-gray-900/60 border-white/30'}`}
                    >
                      <span className="text-2xl font-bold w-8 text-center text-white">{idx + 1}</span>
                      <span className="relative">
                        <img src={leader.avatar} alt={`${leader.name}'s avatar`} className="h-12 w-12 rounded-full border-2 border-white" />
                        {idx === 0 && <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 text-white h-6 w-6" />}
                      </span>
                      <span className="flex-1 font-semibold text-white">{leader.name}</span>
                      <span className="text-white font-bold">{leader.score} pts</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Stats Section */}
            {userStats && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-white relative">
                  <User className="h-6 w-6 text-white inline-block mr-2" /> Your Stats
                </h2>
                <div className="bg-brand-darkest/90 p-4 rounded-xl flex flex-col md:flex-row gap-6 items-center border border-white/40">
                  <div className="flex items-center gap-3">
                    <User className="h-10 w-10 text-white" />
                    <div>
                      <div className="font-bold text-lg text-white">Your Rank: <span className="text-white">#{userStats.rank}</span></div>
                      <div className="text-gray-400">Score: <span className="text-white font-bold">{userStats.score} pts</span></div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4 mt-4 md:mt-0">
                    <div className="bg-gray-900 rounded-lg p-4 text-center border border-white/40">
                      <div className="text-2xl font-bold text-white">{userStats.quizzesTaken}</div>
                      <div className="text-xs text-gray-400">Quizzes Taken</div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 text-center border border-white/40">
                      <div className="text-2xl font-bold text-white">{userStats.correctAnswers}</div>
                      <div className="text-xs text-gray-400">Correct Answers</div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 text-center col-span-2 border border-white/40">
                      <div className="text-2xl font-bold text-white">{userStats.accuracy}%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
