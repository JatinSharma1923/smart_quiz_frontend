'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Learning Experience?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of learners who are expanding their knowledge with Smart Quiz Master today. Get started for free and experience the power of AI-driven learning.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-white text-indigo-700 hover:bg-indigo-50 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </Link>
            <Link 
              href="/demo" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-medium text-lg transition-colors duration-300"
            >
              Watch Demo
            </Link>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-indigo-200 mb-6 text-sm uppercase tracking-wider font-medium">Trusted by leading educational institutions</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="h-8 text-white/40 hover:text-white/70 transition-colors duration-300">
                <svg className="h-full w-auto" viewBox="0 0 124 24" fill="currentColor">
                  <path d="M11.7 5.3c-.2.1-.3.2-.5.2-.1.1-.2.3-.2.4s-.1.3-.1.5v10.8c0 .2 0 .3.1.5.1.1.1.3.2.4.1.1.3.2.5.2.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.3-.1.5-.2.1-.1.2-.3.3-.4.1-.1.1-.3.1-.5V6.5c0-.2 0-.3-.1-.5-.1-.1-.1-.3-.3-.4-.1-.1-.3-.2-.5-.2-.2-.1-.4-.1-.6-.1-.3 0-.5 0-.6.1zm9.9 0c-.2.1-.3.2-.5.2-.1.1-.2.3-.3.4-.1.1-.1.3-.1.5v10.8c0 .2 0 .3.1.5.1.1.1.3.3.4.1.1.3.2.5.2.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.3-.1.5-.2.1-.1.2-.3.3-.4.1-.1.1-.3.1-.5V6.5c0-.2 0-.3-.1-.5-.1-.1-.1-.3-.3-.4-.1-.1-.3-.2-.5-.2-.2-.1-.4-.1-.6-.1-.3 0-.5 0-.6.1zm-5 2.5c-.2.1-.3.2-.5.2-.1.1-.2.3-.3.4-.1.1-.1.3-.1.5v7.8c0 .2 0 .3.1.5.1.1.1.3.3.4.1.1.3.2.5.2.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.3-.1.5-.2.1-.1.2-.3.3-.4.1-.1.1-.3.1-.5V9c0-.2 0-.3-.1-.5-.1-.1-.1-.3-.3-.4-.1-.1-.3-.2-.5-.2-.2-.1-.4-.1-.6-.1-.3 0-.5 0-.6.1zM0 0v24h24V0H0zm19.6 21.8c-.4.4-.9.7-1.5.9-.6.2-1.3.3-2 .3s-1.4-.1-2-.3c-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.6-.3-1.3-.3-2.1V17c0-.3.1-.5.3-.7.2-.2.5-.3.8-.3.3 0 .5.1.8.3.2.2.3.4.3.7v1.1c0 .4.1.8.2 1.1.1.3.2.6.4.8.2.2.4.4.7.5.3.1.6.2 1 .2.3 0 .7-.1 1-.2.3-.1.5-.3.7-.5.2-.2.3-.5.4-.8.1-.3.2-.7.2-1.1v-7.5c0-.3.1-.5.3-.7.2-.2.5-.3.8-.3.3 0 .5.1.8.3.2.2.3.4.3.7V18c0 .8-.1 1.5-.3 2.1-.3.8-.6 1.3-1 1.7zm-10.9 0c-.4.4-.9.7-1.5.9-.6.2-1.3.3-2 .3s-1.4-.1-2-.3c-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.6-.3-1.3-.3-2.1V6.3c0-.3.1-.5.3-.7.2-.2.5-.3.8-.3.3 0 .5.1.8.3.2.2.3.4.3.7v11.8c0 .4.1.8.2 1.1.1.3.2.6.4.8.2.2.4.4.7.5.3.1.6.2 1 .2.3 0 .7-.1 1-.2.3-.1.5-.3.7-.5.2-.2.3-.5.4-.8.1-.3.2-.7.2-1.1V6.3c0-.3.1-.5.3-.7.2-.2.5-.3.8-.3.3 0 .5.1.8.3.2.2.3.4.3.7v11.8c0 .8-.1 1.5-.3 2.1-.3.8-.6 1.3-1 1.7z"/>
                </svg>
              </div>
              <div className="h-8 text-white/40 hover:text-white/70 transition-colors duration-300">
                <svg className="h-full w-auto" viewBox="0 0 124 24" fill="currentColor">
                  <path d="M6.2 10.8c-1.1 0-2.1.4-2.9 1.2-.8.8-1.2 1.7-1.2 2.9 0 1.1.4 2.1 1.2 2.9.8.8 1.7 1.2 2.9 1.2 1.1 0 2.1-.4 2.9-1.2.8-.8 1.2-1.7 1.2-2.9 0-1.1-.4-2.1-1.2-2.9-.8-.8-1.8-1.2-2.9-1.2zm16.3 0c-1.1 0-2.1.4-2.9 1.2-.8.8-1.2 1.7-1.2 2.9 0 1.1.4 2.1 1.2 2.9.8.8 1.7 1.2 2.9 1.2 1.1 0 2.1-.4 2.9-1.2.8-.8 1.2-1.7 1.2-2.9 0-1.1-.4-2.1-1.2-2.9-.8-.8-1.8-1.2-2.9-1.2zM0 0v24h24V0H0zm14.4 19.8c-1.3 0-2.5-.3-3.6-1-1.1-.6-2-1.5-2.6-2.6-.6-1.1-1-2.3-1-3.6 0-1.3.3-2.5 1-3.6.6-1.1 1.5-2 2.6-2.6 1.1-.6 2.3-1 3.6-1s2.5.3 3.6 1c1.1.6 2 1.5 2.6 2.6.6 1.1 1 2.3 1 3.6 0 1.3-.3 2.5-1 3.6-.6 1.1-1.5 2-2.6 2.6-1.1.7-2.3 1-3.6 1zm-8.2 0c-1.3 0-2.5-.3-3.6-1-1.1-.6-2-1.5-2.6-2.6-.6-1.1-1-2.3-1-3.6 0-1.3.3-2.5 1-3.6.6-1.1 1.5-2 2.6-2.6 1.1-.6 2.3-1 3.6-1s2.5.3 3.6 1c1.1.6 2 1.5 2.6 2.6.6 1.1 1 2.3 1 3.6 0 1.3-.3 2.5-1 3.6-.6 1.1-1.5 2-2.6 2.6-1.1.7-2.3 1-3.6 1z"/>
                </svg>
              </div>
              <div className="h-8 text-white/40 hover:text-white/70 transition-colors duration-300">
                <svg className="h-full w-auto" viewBox="0 0 124 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
                </svg>
              </div>
              <div className="h-8 text-white/40 hover:text-white/70 transition-colors duration-300">
                <svg className="h-full w-auto" viewBox="0 0 124 24" fill="currentColor">
                  <path d="M24 9.9C24 4.4 18.6 0 12 0S0 4.4 0 9.9c0 5 5.1 9.2 11.9 9.2.5 0 .9-.1 1.4-.1 2.2 1.2 4.7 1.9 7.3 2.1.3 0 .5-.2.5-.4v-.1c-1.1-.4-2-1.1-2.5-2.1-.2-.3-.3-.7-.3-1.1 3.5-1.7 5.7-4.5 5.7-7.5zm-9.7 3.4H7.7c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h6.6c.3 0 .5.2.5.5v7c0 .3-.2.5-.5.5zm-1.9-5.5h-2.8v4h2.8v-4z"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 