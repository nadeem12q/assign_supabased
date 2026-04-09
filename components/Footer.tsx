import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto relative overflow-hidden bg-theme-primary border-t border-theme border-solid">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-primary)' }}></div>

      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left — Logo + Copyright */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: 'var(--gradient-primary)' }}>
              🎓
            </div>
            <span className="font-bold text-sm gradient-text">AssignPortal</span>
            <span className="text-xs hidden sm:inline text-theme-muted">|</span>
            <span className="text-xs text-theme-muted">
              © {new Date().getFullYear()} College Assignment Portal
            </span>
          </div>

          {/* Right — Links + Made with ❤️ — always one line, never wraps */}
          <div className="flex items-center gap-2 sm:gap-4 flex-nowrap whitespace-nowrap justify-center">
            <Link
              to="/privacy"
              className="text-[10px] sm:text-xs font-medium transition-all hover:translate-y-[-1px] text-theme-muted hover:text-accent-blue"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-[10px] sm:text-xs font-medium transition-all hover:translate-y-[-1px] text-theme-muted hover:text-accent-purple"
            >
              Terms
            </Link>
            <Link
              to="/support"
              className="text-[10px] sm:text-xs font-medium transition-all hover:translate-y-[-1px] text-theme-muted hover:text-accent-pink"
            >
              Support
            </Link>
            <span className="text-[10px] sm:text-xs text-theme-muted">
              Made with ❤️ by <span className="font-semibold gradient-text-cool">NADEEM</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;