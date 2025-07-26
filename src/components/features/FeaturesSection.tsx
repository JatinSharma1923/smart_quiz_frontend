import * as React from 'react';
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Rocket, Atom, Medal, Flag } from "lucide-react";
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <Brain className="h-10 w-10 text-blue-500" />,
    title: "AI-Generated Quizzes",
    description: "Generate topic-wise quizzes with accurate explanations and difficulty levels.",
    details: [
      "Covers multiple subjects and formats",
      "Instant feedback with explanations",
      "Adaptive difficulty for all levels"
    ],
    color: "blue-500"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
    title: "Secure & Reliable",
    description: "Built with FastAPI, OpenAI, and advanced caching for performance and safety.",
    details: [
      "Data privacy & encryption",
      "99.9% uptime with cloud hosting",
      "Regular security audits"
    ],
    color: "green-500"
  },
  {
    icon: <Rocket className="h-10 w-10 text-purple-500" />,
    title: "Career-Ready",
    description: "Prepare for UPSC, SSC, and MNC interviews with real-world trivia and facts.",
    details: [
      "Curated for competitive exams",
      "Real interview questions",
      "Track your progress"
    ],
    color: "purple-500"
  },
  {
    icon: <Atom className="h-10 w-10 text-orange-400" />,
    title: "AI Quiz Demo",
    description: "Experience advanced quiz generation using AI technology.",
    details: [
      "Topic-wise & adaptive quizzes",
      "Instant feedback",
      "Detailed explanations"
    ],
    color: "orange-400"
  },
  {
    icon: <Medal className="h-10 w-10 text-yellow-300" />,
    title: "Leaderboard",
    description: "See how you rank against other players.",
    details: [
      "Global & local rankings",
      "Weekly challenges",
      "Earn badges & rewards"
    ],
    color: "yellow-300"
  },
  {
    icon: <Flag className="h-10 w-10 text-teal-400" />,
    title: "Goals",
    description: "Set and achieve your learning goals.",
    details: [
      "Custom milestones",
      "Progress tracking",
      "Personalized insights"
    ],
    color: "teal-400"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-brand-darker/90 backdrop-blur-md border-t border-brand-darkest relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-brand-cyan neon-glow-soft"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Unlock Your Learning Journey
        </motion.h2>
        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;