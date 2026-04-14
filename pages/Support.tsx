import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="glass-card overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none transition-all hover:bg-white/5"
      >
        <span className="text-base font-semibold pr-4" style={{ color: 'var(--text-primary)' }}>{question}</span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(59,130,246,0.15)' : 'var(--glass)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          <svg className="w-4 h-4" style={{ color: isOpen ? 'var(--accent-blue)' : 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 animate-accordion-down" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Support: React.FC = () => {
  const faqs = [
    {
      question: "I can't log in to my account.",
      answer: "Please ensure you are using your provided student ID and password. If you forgot your password, please contact the ADMIN to reset it."
    },
    {
      question: "My file upload failed. What should I do?",
      answer: "Check your internet connection first. Ensure your file size is under 50MB and is in a supported format (PDF, DOCX, PPTX). If the issue persists, try refreshing the page."
    },
    {
      question: "Can I resubmit or change an assignment file?",
      answer: "No. Once an assignment is submitted, it is locked. If you uploaded the wrong file by mistake, please contact Email Support immediately to request a reset."
    }
  ];

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-purple)' }}></span>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>24/7 Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text-cool">Support Center</span>
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Having trouble? We're here to help you with your assignment submissions.
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Platform Maintained & Developed by <span className="font-semibold gradient-text">NADEEM</span>
          </p>
        </div>

        {/* Contact Card */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="card-3d max-w-md w-full">
            <div className="card-3d-inner">
              <div className="glass-card p-8 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  📧
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Email Support</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  For general inquiries and account issues.
                </p>
                <a
                  href="mailto:nadeemuklevel3@gmail.com"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  nadeemuklevel3@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;