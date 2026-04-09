import React from 'react';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Portal, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service."
    },
    {
      title: "2. Academic Integrity",
      content: "You agree that all files and assignments uploaded to this portal are your own original work. Plagiarism or uploading another student's work is strictly prohibited and may result in disciplinary action according to college policy."
    },
    {
      title: "3. User Accounts",
      content: "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password."
    },
    {
      title: "4. Acceptable Use",
      content: "You agree not to use the portal to:",
      list: [
        "Upload malicious software or viruses.",
        "Harass, abuse, or harm another person.",
        "Upload content that is offensive, illegal, or inappropriate for an academic environment.",
        "Attempt to gain unauthorized access to the Service or related systems."
      ]
    },
    {
      title: "5. Intellectual Property",
      content: "The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of the college and its licensors. The Service is protected by copyright in the country and foreign countries."
    },
    {
      title: "6. Termination",
      content: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
    },
    {
      title: "7. Limitation of Liability",
      content: "In no event shall the college, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
    },
    {
      title: "8. Changes",
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion."
    }
  ];

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <svg className="w-4 h-4" style={{ color: 'var(--accent-purple)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>Legal Agreement</span>
          </div>
          <h1 className="text-4xl font-extrabold gradient-text-cool mb-2">Terms of Service</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Please read these terms carefully before using the College Assignment Portal.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card-static p-5 sm:p-8 md:p-10 animate-fade-in-up stagger-2">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent-purple)' }}>{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.content}</p>
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent-purple)' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Platform Developed by <span className="font-semibold gradient-text-cool">NADEEM</span>.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} College Assignment Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;