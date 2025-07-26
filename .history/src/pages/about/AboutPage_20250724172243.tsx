import { Brain, Rocket, ShieldCheck } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Team Member 1', role: 'AI Engineer', avatar: 'https://ui-avatars.com/api/?name=Team+Member+1' },
    { name: 'Team Member 2', role: 'Frontend Developer', avatar: 'https://ui-avatars.com/api/?name=Team+Member+2' },
    { name: 'Team Member 3', role: 'Backend Developer', avatar: 'https://ui-avatars.com/api/?name=Team+Member+3' },
  ]);

  useEffect(() => {
    // Example API call to fetch team members dynamically
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/api/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker text-white py-16 px-4 relative overflow-hidden">
      {/* Remove overlays */}
      <div className="max-w-3xl mx-auto">
        <AnimatedHeadline />
        <p className="text-lg text-gray-300 mb-8 text-center text-white">
          Smart Quiz Master is an AI-powered quiz platform designed to help you master knowledge, prepare for competitive exams, and have fun learning. Our mission is to make learning engaging, personalized, and effective for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-brand-darkest/90 rounded-xl p-6 flex flex-col items-center text-center border border-white/40">
            <Brain className="h-10 w-10 text-white mb-2" />
            <div className="font-bold mb-1 text-white">AI-Generated Quizzes</div>
            <div className="text-gray-400 text-sm">Generate quizzes on any topic with instant feedback and explanations.</div>
          </div>
          <div className="bg-brand-darkest/90 rounded-xl p-6 flex flex-col items-center text-center border border-white/40">
            <ShieldCheck className="h-10 w-10 text-white mb-2" />
            <div className="font-bold mb-1 text-white">Secure & Reliable</div>
            <div className="text-gray-400 text-sm">Built with modern tech for performance, privacy, and reliability.</div>
          </div>
          <div className="bg-brand-darkest/90 rounded-xl p-6 flex flex-col items-center text-center border border-white/40">
            <Rocket className="h-10 w-10 text-white mb-2" />
            <div className="font-bold mb-1 text-white">Career-Ready</div>
            <div className="text-gray-400 text-sm">Prepare for UPSC, SSC, interviews, and more with real-world trivia.</div>
          </div>
        </div>
        <div className="bg-brand-darkest/90 rounded-xl p-8 text-center border border-white/40">
          <h2 className="text-2xl font-bold mb-4 text-white relative">
            Meet the Team
            <span className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full" />
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <img
                  src={member.avatar}
                  alt={`${member.name}, ${member.role}`}
                  className="h-16 w-16 rounded-full mb-2 border-2 border-white"
                />
                <div className="font-semibold text-white">{member.name}</div>
                <div className="text-xs text-gray-400">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
