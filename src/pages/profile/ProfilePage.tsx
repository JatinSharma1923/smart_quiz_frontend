import * as React from 'react';
import { User as LucideUser, Award, LogIn } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import { getUserProfile, getUserBadges, getUserSessions } from '../../services/userApi';
import type { UserBadge, UserSession, User } from '../../services/userApi';

const mockUserId = 'demo-user'; // Replace with real user ID from auth context

const ProfilePage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [badges, setBadges] = React.useState<UserBadge[]>([]);
  const [sessions, setSessions] = React.useState<UserSession[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userResponse, badgesResponse, sessionsResponse] = await Promise.all([
          getUserProfile(mockUserId),
          getUserBadges(mockUserId),
          getUserSessions(mockUserId),
        ]);
        setUser(userResponse);
        setBadges(badgesResponse);
        setSessions(sessionsResponse);
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-darkest to-brand-purple text-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <AnimatedHeadline />

        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {/* Profile Info Section */}
            {user && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-white relative">
                  <LucideUser className="h-6 w-6 text-white inline-block mr-2" /> Profile Info
                </h2>
                <div className="bg-brand-darkest/90 p-4 rounded-xl flex items-center gap-6 border border-white/40">
                  <div>
                    <div className="font-bold text-lg mb-1 text-white">{user.name}</div>
                    <div className="text-gray-400 mb-1">{user.email}</div>
                    <div className="text-gray-500 text-sm">Joined: {user.created_at}</div>
                  </div>
                </div>
              </section>
            )}

            {/* Badges Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-white relative">
                <Award className="h-6 w-6 text-white inline-block mr-2" /> Badges
              </h2>
              <div className="bg-brand-darkest/90 p-4 rounded-xl flex gap-4 border border-white/40">
                {badges.length === 0 ? (
                  <div className="text-gray-400">No badges earned yet.</div>
                ) : (
                  badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center group">
                      <img src={badge.icon} alt={badge.name} className="h-10 w-10 mb-1" />
                      <span className="text-xs mt-1 text-gray-300">{badge.name}</span>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Sessions Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-white relative">
                <LogIn className="h-6 w-6 text-white inline-block mr-2" /> Login Sessions
              </h2>
              <div className="bg-brand-darkest/90 p-4 rounded-xl border border-white/40">
                {sessions.length === 0 ? (
                  <div className="text-gray-400">No recent sessions.</div>
                ) : (
                  <ul className="divide-y divide-gray-700">
                    {sessions.map((session) => (
                      <li key={session.id} className="flex items-center gap-4 py-2 group rounded-lg">
                        <LogIn className="h-5 w-5 text-white" />
                        <span className="flex-1 text-white">{session.device}</span>
                        <span className="text-gray-400 text-xs">{session.created_at}</span>
                        <span className="text-gray-500 text-xs">{session.location}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

