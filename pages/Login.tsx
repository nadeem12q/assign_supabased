import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserRole } from '../types';

// Rate limiting constants
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 60;



const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Rate limiting state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const lockoutTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start lockout countdown timer
  const startLockoutTimer = useCallback((endTime: number) => {
    if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);

    lockoutTimerRef.current = setInterval(() => {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutEndTime(null);
        setLockoutRemaining(0);
        setFailedAttempts(0);
        if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);
      } else {
        setLockoutRemaining(remaining);
      }
    }, 1000);
  }, []);

  const isLockedOut = lockoutEndTime !== null && Date.now() < lockoutEndTime;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      toast.error(`Too many failed attempts. Please wait ${lockoutRemaining} seconds.`);
      return;
    }

    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!acceptedTerms) {
      toast.error('Please accept the Terms & Conditions to continue');
      return;
    }

    try {
      const user = await login(username, password);

      toast.success(`Welcome back, ${user.name}!`);

      if (user.role === UserRole.ADMIN) {
        navigate('/admin');
      } else {
        navigate('/upload');
      }
      setFailedAttempts(0);
    } catch (err) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        const endTime = Date.now() + LOCKOUT_DURATION_SECONDS * 1000;
        setLockoutEndTime(endTime);
        setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
        toast.error(`Account locked! Too many failed attempts. Please try again after ${LOCKOUT_DURATION_SECONDS} seconds.`);
        startLockoutTimer(endTime);
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        toast.error(`Invalid username or password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-theme-primary">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full animate-float-delay" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}></div>
        <div className="absolute top-10 right-1/4 w-4 h-4 rounded-md rotate-45 animate-float" style={{ background: 'var(--accent-blue)', opacity: 0.3 }}></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full animate-float-delay-2" style={{ background: 'var(--accent-pink)', opacity: 0.4 }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Card */}
        <div className="card-3d">
          <div className="card-3d-inner">
            <div className="glass-card-static p-5 sm:p-8 md:p-10 animate-scale-in">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 animate-bounce-in" style={{ background: 'var(--gradient-primary)' }}>
                  🎓
                </div>
                <h2 className="text-3xl font-extrabold gradient-text">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-theme-muted">
                  Sign in with your college credentials
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Username / Email */}
                <div className="animate-fade-in-up stagger-2">
                  <label htmlFor="username" className="block text-sm font-medium mb-2 text-theme-secondary">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-theme-muted">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isLockedOut}
                      className="input-modern pl-12"
                      placeholder="e.g. student@college.edu"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="animate-fade-in-up stagger-3">
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-theme-secondary">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-theme-muted">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      disabled={isLockedOut}
                      className="input-modern pl-12 pr-12"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 transition-colors text-theme-muted"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message has been moved to Toasts */}

                {/* Terms Checkbox */}
                <div className="flex items-start animate-fade-in-up stagger-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="checkbox-modern mt-0.5"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm cursor-pointer select-none text-theme-secondary">
                    I accept the{' '}
                    <Link to="/terms" className="font-medium hover:underline" style={{ color: 'var(--accent-blue)' }} target="_blank">
                      Terms & Conditions
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="animate-fade-in-up stagger-5">
                  <button
                    type="submit"
                    disabled={isLoading || !acceptedTerms || isLockedOut}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all relative overflow-hidden group"
                    style={{
                      background: (isLoading || !acceptedTerms || isLockedOut) ? 'rgba(59,130,246,0.3)' : 'var(--gradient-primary)',
                      cursor: (isLoading || !acceptedTerms || isLockedOut) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : isLockedOut ? (
                        <>🔒 Locked ({lockoutRemaining}s)</>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          Sign In
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;