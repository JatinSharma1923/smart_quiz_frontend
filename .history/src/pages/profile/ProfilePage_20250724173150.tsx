import React, { useEffect, useState } from 'react';
import { User, Award, LogIn } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import axios from 'axios';

interface UserProfile {
  name: string;
  email: string;
  joined: string;
  avatar: string;
}

interface Badge {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface Session {
  id: number;
  device: string;
  date: string;
  location: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userResponse, badgesResponse, sessionsResponse] = await Promise.all([
          axios.get('/api/user-profile'), // Replace with actual API endpoint
          axios.get('/api/user-badges'), // Replace with actual API endpoint
          axios.get('/api/user-sessions'), // Replace with actual API endpoint
        ]);
        setUser(userResponse.data);
        setBadges(badgesResponse.data);
        setSessions(sessionsResponse.data);
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
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
                  <User className="h-6 w-6 text-white inline-block mr-2" /> Profile Info
                </h2>
                <div className="bg-brand-darkest/90 p-4 rounded-xl flex items-center gap-6 border border-white/40">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-lg mb-1 text-white">{user.name}</div>
                    <div className="text-gray-400 mb-1">{user.email}</div>
                    <div className="text-gray-500 text-sm">Joined: {user.joined}</div>
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
                      <span>{badge.icon}</span>
                      <span className="text-xs mt-1 text-gray-300">{badge.label}</span>
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
                        <span className="text-gray-400 text-xs">{session.date}</span>
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

