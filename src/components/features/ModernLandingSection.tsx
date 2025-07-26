import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import MagneticButton from '../common/MagneticButton';
import useSound from 'use-sound';
// @ts-ignore
import confetti from 'canvas-confetti';
import successSfx from '../../assets/success.mp3';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaWhatsapp, FaCheckCircle, FaRegEnvelope, FaComments, FaBookOpen, FaHeadset } from 'react-icons/fa';


const POLICY_CONTENT: Record<string, { title: string; content: string }> = {
    privacy: {
      title: 'Privacy Policy',
      content: `Privacy Policy

            Effective Date: January 1, 2025
            
            1. Introduction
            Welcome to Smart Quiz Master. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            
            2. Information We Collect
            - Personal Data: Name, email address, contact information, and any other information you voluntarily provide.
            - Usage Data: Pages visited, time spent, browser type, device information, and IP address.
            - Cookies and Tracking: We use cookies and similar tracking technologies to monitor activity and store certain information.
            
            3. How We Use Your Information
            - To provide and maintain our service
            - To notify you about changes to our service
            - To allow you to participate in interactive features
            - To provide customer support
            - To gather analysis to improve our service
            - To monitor usage and detect/prevent technical issues
            
        4. Sharing Your Information
        We may share your information with:
        - Service providers who assist us in operating our website
        - Law enforcement or regulatory agencies if required by law
        - Other parties with your consent

        5. Data Security
        We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

        6. Your Data Rights
        You have the right to access, update, or delete your personal information. You may also opt out of certain data uses.

        7. Children’s Privacy
        Our service is not intended for children under 13. We do not knowingly collect information from children under 13.

        8. Changes to This Policy
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.

        9. Contact Us
        If you have any questions about this Privacy Policy, please contact us at privacy@smartquizmaster.com.

        ---

        [Page 2]

        10. International Data Transfers
        Your information may be transferred to and maintained on servers located outside your country. By using our service, you consent to such transfers.

        11. Third-Party Links
        Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites.

        12. Data Retention
        We retain your personal information only as long as necessary for the purposes set out in this policy.

        13. Automated Decision-Making
        We do not use your data for automated decision-making or profiling that produces legal effects concerning you.

        14. Consent
        By using our website, you consent to our Privacy Policy.

        15. Governing Law
        This Privacy Policy is governed by the laws of your jurisdiction.

        16. Complaints
        If you believe your privacy rights have been violated, you may file a complaint with the relevant authority.

        17. Updates and Notifications
        We will notify you of any significant changes to this policy via email or a prominent notice on our website.

        18. Contact Information
        For further information, please contact our Data Protection Officer at dpo@smartquizmaster.com.

        ---

        [Page 3]

        19. California Privacy Rights
        If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA).

        20. European Union Users
        If you are located in the EU, you have rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or erase your data.

        21. Data Breach Notification
        In the event of a data breach, we will notify affected users and relevant authorities as required by law.

        22. Do Not Track
        Our website does not respond to Do Not Track signals.

        23. Contact
        For any privacy-related questions, please email privacy@smartquizmaster.com.

        ---

        [Page 4]

        24. Additional Information
        For more details about our privacy practices, please visit our website or contact us directly.

        Thank you for trusting Smart Quiz Master with your information.`
    },
    terms: {
      title: 'Terms of Service',
      content: `Terms of Service

            Effective Date: January 1, 2025
            
            1. Acceptance of Terms
            By accessing or using Smart Quiz Master, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            
            2. Use of Service
            - You must be at least 13 years old to use our service.
            - You agree not to misuse the service or help anyone else do so.
            
            3. Account Registration
            - You may be required to create an account to access certain features.
            - You are responsible for maintaining the confidentiality of your account.
            
            4. User Content
            - You retain ownership of any content you submit.
            - You grant us a worldwide, royalty-free license to use, display, and distribute your content.
            
            5. Prohibited Conduct
            - You may not use the service for unlawful purposes.
            - You may not attempt to gain unauthorized access to our systems.
            
            6. Intellectual Property
            All content, trademarks, and logos are the property of Smart Quiz Master or its licensors.
            
            7. Termination
            We reserve the right to suspend or terminate your access at any time for any reason.
            
            8. Disclaimers
            The service is provided "as is" without warranties of any kind.
            
            9. Limitation of Liability
            We are not liable for any damages arising from your use of the service.
            
            10. Indemnification
            You agree to indemnify and hold harmless Smart Quiz Master from any claims arising from your use of the service.
            
            ---

            [Page 2]

            11. Third-Party Services
            We may provide links to third-party services. We are not responsible for their content or practices.

            12. Modifications to Service
            We reserve the right to modify or discontinue the service at any time.

            13. Governing Law
            These terms are governed by the laws of your jurisdiction.

            14. Dispute Resolution
            Any disputes will be resolved through binding arbitration or in the courts of your jurisdiction.

            15. Severability
            If any provision is found invalid, the remaining provisions will remain in effect.

            16. Entire Agreement
            These terms constitute the entire agreement between you and Smart Quiz Master.

            17. Waiver
            Our failure to enforce any right or provision does not constitute a waiver.

            18. Assignment
            You may not assign your rights under these terms without our consent.

            ---

            [Page 3]

            19. Notices
            We may provide notices to you via email or through the service.

            20. Feedback
            Any feedback you provide may be used without obligation to you.

            21. Contact
            For questions about these terms, contact us at terms@smartquizmaster.com.

            ---

            [Page 4]

            22. Updates to Terms
            We may update these terms from time to time. Continued use of the service constitutes acceptance of the new terms.

            Thank you for using Smart Quiz Master.`
        },
    cookie: {
        title: 'Cookie Policy',
        content: `Cookie Policy

        Effective Date: January 1, 2025
        
        1. What Are Cookies?
        Cookies are small text files stored on your device by your browser. They help us remember your preferences and improve your experience.
        
        2. Types of Cookies We Use
        - Essential Cookies: Necessary for the website to function.
        - Performance Cookies: Help us understand how visitors interact with the site.
        - Functional Cookies: Remember your preferences.
        - Targeting Cookies: Used to deliver relevant ads.
        
        3. How We Use Cookies
        - To keep you signed in
        - To remember your preferences
        - To analyze site usage
        - To personalize content and ads
        
        4. Managing Cookies
        You can control cookies through your browser settings. Disabling cookies may affect your experience.
        
        5. Third-Party Cookies
        We may allow third-party services to use cookies on our site.
        
        6. Changes to This Policy
        We may update this Cookie Policy from time to time. Changes will be posted on this page.
        
        ---
        
        [Page 2]
        
            7. Consent
            By using our website, you consent to our use of cookies.

            8. Contact
            For questions about our cookie policy, contact us at cookies@smartquizmaster.com.

            ---

            [Page 3]

            9. More Information
            For more details about cookies and how to manage them, visit www.allaboutcookies.org.

            10. Data Protection
            We are committed to protecting your data and privacy.

            ---

            [Page 4]

            11. Updates
            We will notify you of significant changes to this policy.

            Thank you for trusting Smart Quiz Master.`
    },
    refund: {
      title: 'Refund Policy',
      content: `Refund Policy

        Effective Date: January 1, 2025
        
        1. Eligibility for Refunds
        - Refunds are available for purchases made within 30 days.
        - To be eligible, you must provide proof of purchase.
        
        2. Non-Refundable Items
        - Downloadable products
        - Services already rendered
        
        3. How to Request a Refund
        - Contact us at refunds@smartquizmaster.com with your order details.
        - We will review your request and notify you of the outcome.
        
        4. Processing Refunds
        - Approved refunds will be processed to your original payment method.
        - Processing times may vary depending on your bank or payment provider.
        
        5. Late or Missing Refunds
        - If you haven’t received a refund, check your bank account first.
        - Then contact your credit card company and bank.
        - If you still have not received your refund, contact us at refunds@smartquizmaster.com.
        
        ---
    
        [Page 2]

        6. Exchanges
        We only replace items if they are defective or damaged.

        7. Sale Items
        Only regular-priced items may be refunded; sale items cannot be refunded.

        8. Changes to This Policy
        We reserve the right to update this policy at any time.

        ---

        [Page 3]

        9. Contact
        For questions about our refund policy, contact us at refunds@smartquizmaster.com.

        ---

        [Page 4]

        10. Thank You
        Thank you for choosing Smart Quiz Master. We value your satisfaction and strive to provide the best service possible.`
    },     
  };
  

const ModernLandingSection: React.FC = () => {
    // Newsletter state and logic
      // Newsletter state and logic (copied as-is from HomePage)
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [play] = useSound(successSfx, { volume: 0.5 });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPolicy, setModalPolicy] = useState<keyof typeof POLICY_CONTENT | null>(null);
  
    const handleNewsletterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setNewsletterLoading(true);
      // Simulate async subscribe
      setTimeout(() => {
        setNewsletterLoading(false);
        setNewsletterSuccess(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#6366f1', '#a21caf', '#fff']
        });
        play();
      }, 1200);
    };
  
    return (
      <section className="section-gradient py-20 relative">
        {/* Floating Particles */}
        <div className="floating-particles" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-particles" style={{ top: '20%', right: '15%', animationDelay: '1s' }} />
        <div className="floating-particles" style={{ bottom: '30%', left: '20%', animationDelay: '2s' }} />
        <div className="floating-particles" style={{ bottom: '10%', right: '10%', animationDelay: '3s' }} />
  
    <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                {/* Replace with Lucide/Heroicon */}
                <span className="text-2xl text-white">🧠</span>
              </div>
              <div className="pulse-ring w-16 h-16 absolute top-0 left-0"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">Smart Quiz Master</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing exam preparation with <span className="text-cyan-400 font-semibold">AI-powered learning solutions</span>
          </p>
          {/* Remove CTA Buttons here */}
        </div>
    </div>

        {/* Enhanced Pricing & Support */}
        <section className="w-full py-8">
          <div className="max-w-6xl mx-auto px-2">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Pricing Section - Modern Cards */}
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Free Plan */}
                  <div className="bg-[#23272f] rounded-2xl shadow-lg p-6 flex flex-col items-center border border-cyan-700/30 hover:shadow-cyan-400/20 transition-all">
                    <div className="text-cyan-400 text-2xl font-bold mb-2">Free</div>
                    <div className="text-3xl font-extrabold mb-2">$0</div>
                    <ul className="text-gray-300 text-sm mb-4 space-y-1 w-full">
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Basic Quizzes</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Leaderboard Access</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Community Support</li>
                    </ul>
                    <button className="w-full py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all">Get Started</button>
                  </div>
                  {/* Pro Plan */}
                  <div className="bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/20 rounded-2xl shadow-lg p-6 flex flex-col items-center border-2 border-cyan-400/60 hover:shadow-cyan-400/30 transition-all relative">
                    <div className="absolute -top-4 right-4 bg-cyan-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">Most Popular</div>
                    <div className="text-cyan-400 text-2xl font-bold mb-2">Pro</div>
                    <div className="text-3xl font-extrabold mb-2">$9<span className="text-lg font-normal">/mo</span></div>
                    <ul className="text-gray-300 text-sm mb-4 space-y-1 w-full">
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> All Free Features</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Unlimited Quizzes</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Advanced Analytics</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Priority Support</li>
                    </ul>
                    <button className="w-full py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all">Upgrade</button>
                  </div>
                  {/* Enterprise Plan */}
                  <div className="bg-[#23272f] rounded-2xl shadow-lg p-6 flex flex-col items-center border border-cyan-700/30 hover:shadow-cyan-400/20 transition-all">
                    <div className="text-cyan-400 text-2xl font-bold mb-2">Enterprise</div>
                    <div className="text-3xl font-extrabold mb-2">Custom</div>
                    <ul className="text-gray-300 text-sm mb-4 space-y-1 w-full">
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> All Pro Features</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Dedicated Manager</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Custom Integrations</li>
                      <li className="flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> SLA & Onboarding</li>
                    </ul>
                    <button className="w-full py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all">Contact Sales</button>
                  </div>
                </div>
              </div>

        {/* Enhanced Pricing & Support */}
        <section className="w-full py-8">
          <div className="max-w-6xl mx-auto px-2">
            {/* Pricing Section - Modern Cards */}
            <div className="flex flex-col gap-8 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-gradient-to-br from-[#0f172a] via-[#23272f] to-[#1e293b] p-6 rounded-3xl shadow-2xl">
                {/* ...pricing cards... */}
              </div>
            </div>
            {/* Newsletter and Social Links side by side (moved up) */}
            <div className="grid md:grid-cols-2 gap-8 mb-0 items-end">
              {/* ...newsletter and connect with us code... */}
            </div>
            {/* Divider Line */}
            <div className="w-full h-px bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-600/30 my-8" />


             {/* Support Section (now last) */}
             <div className="flex flex-col gap-6 justify-between h-full">
               <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Support</h2>
               <div className="bg-[#23272f] rounded-2xl shadow-lg p-6 flex flex-col items-center border border-cyan-700/30 w-full mb-6">
                 <div className="flex flex-wrap justify-center gap-6 mb-4">
                   <a href="#" className="flex flex-col items-center group">
                     <FaComments className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform" />
                     <span className="mt-2 text-sm text-gray-200">Live Chat</span>
                   </a>
                   <a href="mailto:support@smartquizmaster.com" className="flex flex-col items-center group">
                     <FaRegEnvelope className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform" />
                     <span className="mt-2 text-sm text-gray-200">Email</span>
                   </a>
                   <a href="#" className="flex flex-col items-center group">
                     <FaBookOpen className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform" />
                     <span className="mt-2 text-sm text-gray-200">FAQ</span>
                   </a>
                   <a href="#" className="flex flex-col items-center group">
                     <FaHeadset className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform" />
                     <span className="mt-2 text-sm text-gray-200">Docs</span>
                   </a>
                 </div>
                 <div className="text-gray-300 text-sm text-center mb-4">
                   <span className="font-semibold text-cyan-400">24/7 Support</span> &bull; Avg. response: 1 hour
                 </div>
               </div>
             </div>
         {/* Policies Section (now below support) */}
             <div className="text-center border-t border-gray-700 pt-6 w-full">
               <div className="flex flex-wrap justify-center gap-6 mb-4 text-gray-400">
                 <button
                   className="link-hover focus:outline-none"
                   onClick={() => { setModalPolicy('privacy'); setModalOpen(true); }}
                 >
                   Privacy Policy
                 </button>
                 <button
                   className="link-hover focus:outline-none"
                   onClick={() => { setModalPolicy('terms'); setModalOpen(true); }}
                 >
                   Terms of Service
                 </button>
                 <button
                   className="link-hover focus:outline-none"
                   onClick={() => { setModalPolicy('cookie'); setModalOpen(true); }}
                 >
                   Cookie Policy
                 </button>
                 <button
                   className="link-hover focus:outline-none"
                   onClick={() => { setModalPolicy('refund'); setModalOpen(true); }}
                 >
                   Refund Policy
                 </button>
               </div>
               <p className="text-gray-500">
                 © 2025 Smart Quiz Master. All rights reserved. 
                 <a
                   href="https://www.unesco.org/en/education"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-400 underline hover:text-blue-500 transition-colors"
                 >
                   Empowering learners worldwide.
                 </a>
               </p>
             </div>
            </div>
          </div>
        </section>


        {/* Legal Links */}
        <div className="text-center border-t border-gray-700 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-gray-400">
          <button
              className="link-hover focus:outline-none"
              onClick={() => { setModalPolicy('privacy'); setModalOpen(true); }}
            >
              Privacy Policy
            </button>
            <button
              className="link-hover focus:outline-none"
              onClick={() => { setModalPolicy('terms'); setModalOpen(true); }}
            >
              Terms of Service
            </button>
            <button
              className="link-hover focus:outline-none"
              onClick={() => { setModalPolicy('cookie'); setModalOpen(true); }}
            >
              Cookie Policy
            </button>
            <button
              className="link-hover focus:outline-none"
              onClick={() => { setModalPolicy('refund'); setModalOpen(true); }}
            >
              Refund Policy
            </button>
          </div>
          <p className="text-gray-500">
            © 2025 Smart Quiz Master. All rights reserved. 
            <a
              href="https://www.unesco.org/en/education"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-500 transition-colors"
            >
              Empowering learners worldwide.
            </a>
          </p>
export default ModernLandingSection;
        </div>
                {/* Modern Policy Modal */}
                <AnimatePresence>
          {modalOpen && modalPolicy && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#181A1B] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative flex flex-col items-center"
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-white text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {POLICY_CONTENT[modalPolicy].title}
                </h2>
                <div className="text-gray-300 text-base max-h-[60vh] overflow-y-auto w-full mb-6" style={{           whiteSpace: 'pre-line' }}>
                  {POLICY_CONTENT[modalPolicy].content}
                </div>
                <button
                  className="px-6 py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all duration-300 mt-2"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


// SuccessConfettiMessage component (copied as-is from HomePage)
const SuccessConfettiMessage = ({ onDismiss }: { onDismiss: () => void }) => {
  const [play] = useSound(successSfx, { volume: 0.5 });
  React.useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#a21caf', '#fff']
    });
    play();
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss, play]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1.2, rotate: 360 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="mb-4"
      >
        <span className="text-5xl">🎉</span>
      </motion.div>
      <div className="text-lg font-semibold text-cyan-400 mb-2">Subscribed!</div>
      <div className="text-gray-300 mb-4">You will now receive the latest updates.</div>
      <button
        className="px-6 py-2 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all duration-300"
        onClick={onDismiss}
      >
        Close
      </button>
    </motion.div>
  );
};

export default ModernLandingSection;
