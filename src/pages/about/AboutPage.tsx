import { Brain, Rocket, ShieldCheck } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';

const AboutPage = () => {
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
            <div className="flex flex-col items-center group">
              <img src="https://ui-avatars.com/api/?name=Team+Member+1" alt="Team Member 1" className="h-16 w-16 rounded-full mb-2 border-2 border-white" />
              <div className="font-semibold text-white">Team Member 1</div>
              <div className="text-xs text-gray-400">AI Engineer</div>
            </div>
            <div className="flex flex-col items-center group">
              <img src="https://ui-avatars.com/api/?name=Team+Member+2" alt="Team Member 2" className="h-16 w-16 rounded-full mb-2 border-2 border-white" />
              <div className="font-semibold text-white">Team Member 2</div>
              <div className="text-xs text-gray-400">Frontend Developer</div>
            </div>
            <div className="flex flex-col items-center group">
              <img src="https://ui-avatars.com/api/?name=Team+Member+3" alt="Team Member 3" className="h-16 w-16 rounded-full mb-2 border-2 border-white" />
              <div className="font-semibold text-white">Team Member 3</div>
              <div className="text-xs text-gray-400">Backend Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


import { Users, Brain, Rocket, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-blue-500" /> About Smart Quiz Master
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Smart Quiz Master is an AI-powered quiz platform designed to help you master knowledge, prepare for competitive exams, and have fun learning. Our mission is to make learning engaging, personalized, and effective for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
            <Brain className="h-10 w-10 text-blue-400 mb-2" />
            <div className="font-bold mb-1">AI-Generated Quizzes</div>
            <div className="text-gray-400 text-sm">Generate quizzes on any topic with instant feedback and explanations.</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
            <ShieldCheck className="h-10 w-10 text-green-400 mb-2" />
            <div className="font-bold mb-1">Secure & Reliable</div>
            <div className="text-gray-400 text-sm">Built with modern tech for performance, privacy, and reliability.</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
            <Rocket className="h-10 w-10 text-purple-400 mb-2" />
            <div className="font-bold mb-1">Career-Ready</div>
            <div className="text-gray-400 text-sm">Prepare for UPSC, SSC, interviews, and more with real-world trivia.</div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <img src="https://ui-avatars.com/api/?name=Team+Member+1" alt="Team Member 1" className="h-16 w-16 rounded-full mb-2" />
              <div className="font-semibold">Team Member 1</div>
              <div className="text-xs text-gray-400">AI Engineer</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://ui-avatars.com/api/?name=Team+Member+2" alt="Team Member 2" className="h-16 w-16 rounded-full mb-2" />
              <div className="font-semibold">Team Member 2</div>
              <div className="text-xs text-gray-400">Frontend Developer</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://ui-avatars.com/api/?name=Team+Member+3" alt="Team Member 3" className="h-16 w-16 rounded-full mb-2" />
              <div className="font-semibold">Team Member 3</div>
              <div className="text-xs text-gray-400">Backend Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

