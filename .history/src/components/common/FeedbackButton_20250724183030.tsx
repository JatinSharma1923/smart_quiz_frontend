import React, { useState } from 'react';
import Button from './Button';

const FeedbackButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setFeedback('');
      setSubmitted(false);
    }, 1500);
  };

  return (
    <>
      <Button
        variant="gradient"
        className="fixed bottom-6 right-6 z-50"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
      >
        💬
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
              aria-label="Close feedback form"
            >
              ×
            </Button>
            <h2 className="text-lg font-bold mb-2 text-indigo-700 dark:text-indigo-300">Send Feedback</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Your suggestion or issue..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
                aria-label="Feedback message"
              />
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={submitted}
                aria-label="Submit feedback"
              >
                {submitted ? 'Thank you!' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
