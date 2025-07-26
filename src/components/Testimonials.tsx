'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "Smart Quiz Master has completely transformed how I study for my medical exams. The AI-generated questions are incredibly relevant and have helped me improve my scores significantly!",
    name: "Dr. Sarah Johnson",
    role: "Medical Resident",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "As a high school teacher, I use Smart Quiz Master to create engaging quizzes for my students. The variety of topics and difficulty levels keeps them motivated and excited about learning.",
    name: "Michael Chen",
    role: "High School Teacher",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "At 65, I thought my learning days were behind me. Smart Quiz Master has rekindled my passion for knowledge with its fun, challenging quizzes on diverse subjects.",
    name: "Priya Patel",
    role: "Lifelong Learner",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4
  },
  {
    id: 4,
    content: "The adaptive learning technology is incredible. The platform actually learns what I struggle with and focuses on those areas. My retention has improved dramatically.",
    name: "James Wilson",
    role: "University Student",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5
  },
  {
    id: 5,
    content: "I've tried many quiz platforms, but Smart Quiz Master stands out with its intuitive interface and AI capabilities. It feels like having a personal tutor guiding my studies.",
    name: "Emma Rodriguez",
    role: "Language Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Thousands of learners have transformed their knowledge with Smart Quiz Master
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Featured testimonial */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
            <motion.div 
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-primary-100 overflow-hidden">
                    <img 
                      src={testimonials[activeIndex].avatar} 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
                    "{testimonials[activeIndex].content}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary-100 dark:text-gray-700">
                <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18V36H9C4.02944 36 0 31.9706 0 27V13.5C0 6.04416 6.04416 0 13.5 0ZM40.5 0C33.0442 0 27 6.04416 27 13.5C27 20.9558 33.0442 27 40.5 27H45V36H36C31.0294 36 27 31.9706 27 27V13.5C27 6.04416 33.0442 0 40.5 0Z" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          </div>
          
          {/* Testimonial navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary-600 w-6' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2">5M+</div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Quizzes Taken</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2">100K+</div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Active Users</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2">50+</div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2">4.9</div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 