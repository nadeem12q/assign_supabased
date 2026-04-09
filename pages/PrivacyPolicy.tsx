import React from 'react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to the College Assignment Portal (the \"Service\"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and upload assignments."
    },
    {
      title: "2. Data We Collect",
      content: "We may collect, use, store and transfer different kinds of personal data about you:",
      list: [
        { label: "Identity Data", desc: "Includes first name, last name, username or similar identifier." },
        { label: "Contact Data", desc: "Includes email address and telephone numbers." },
        { label: "Academic Data", desc: "Includes assignment submissions, grades, and subject enrollment." },
        { label: "Technical Data", desc: "Includes internet protocol (IP) address, your login data, browser type and version." },
      ]
    },
    {
      title: "3. How We Use Your Data",
      content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
      list: [
        { desc: "To manage your registration as a student." },
        { desc: "To process and grade your assignment submissions." },
        { desc: "To notify you about changes to our terms or privacy policy." },
        { desc: "To provide academic support and feedback." },
      ]
    },
    {
      title: "4. Data Security",
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Access to your data is limited to authorized college faculty and administrators."
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
      title: "6. Third-Party Services",
      content: "We may employ third-party companies and individuals to facilitate our Service (\"Service Providers\"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used."
    },
    {
      title: "7. Contact Us",
      content: "If you have any questions about this privacy policy or our privacy practices, please contact the IT Administration department."
    }
  ];

  return (
    <div className="min-h-screen py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <svg className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>Your Privacy Matters</span>
          </div>
          <h1 className="text-4xl font-extrabold gradient-text mb-2">Privacy Policy</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>
        </div>

        {/* Content */}
        <div className="glass-card-static p-5 sm:p-8 md:p-10 animate-fade-in-up stagger-2">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent-blue)' }}>{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.content}</p>
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent-blue)' }}></span>
                        <span>
                          {'label' in item && item.label && <strong style={{ color: 'var(--text-primary)' }}>{item.label}: </strong>}
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>This Privacy Policy is effective as of {new Date().getFullYear()}.</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Platform Developed and Maintained by <span className="font-semibold gradient-text">NADEEM</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;