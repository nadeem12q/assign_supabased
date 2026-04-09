import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return '/login';
    return user.role === UserRole.ADMIN ? '/admin' : '/upload';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-theme-primary">

      {/* Floating Particles / Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full animate-float-delay" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full animate-float-delay-2" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)' }}></div>

        {/* Floating 3D shapes */}
        <div className="absolute top-20 right-1/4 w-6 h-6 rounded-md rotate-45 animate-float" style={{ background: 'var(--gradient-primary)', opacity: 0.3 }}></div>
        <div className="absolute top-40 left-1/5 w-4 h-4 rounded-full animate-float-delay" style={{ background: 'var(--accent-cyan)', opacity: 0.4 }}></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 rounded-md rotate-12 animate-float-delay-2" style={{ background: 'var(--gradient-cool)', opacity: 0.3 }}></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 rounded-full animate-float" style={{ background: 'var(--accent-pink)', opacity: 0.5 }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-64px)] gap-8 sm:gap-12 py-8 sm:py-12">

          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-green)' }}></span>
                <span className="text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>Platform is Live</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight animate-fade-in-up stagger-2">
              <span className="block text-theme-primary">Submit assignments</span>
              <span className="block gradient-text mt-1 sm:mt-2" style={{ lineHeight: 1.3 }}>with ease ✨</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 animate-fade-in-up stagger-3 text-theme-secondary shrink-0 leading-relaxed">
              The central hub for all your college coursework. Upload assignments, track deadlines, and never miss a submission — all in one beautifully designed platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up stagger-4">
              <Link to={getDashboardLink()} className="btn-primary text-lg px-8 py-4 group">
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              {!isAuthenticated && (
                <Link to="/support" className="btn-ghost text-lg px-8 py-4">
                  Learn More
                </Link>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-8 sm:mt-12 flex gap-6 sm:gap-8 justify-center lg:justify-start animate-fade-in-up stagger-5">
              <div>
                <div className="text-xl sm:text-2xl font-bold gradient-text">100+</div>
                <div className="text-xs sm:text-sm text-theme-muted">Active Students</div>
              </div>
              <div className="w-px bg-theme-secondary/50"></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold gradient-text-cool">50+</div>
                <div className="text-xs sm:text-sm text-theme-muted">Assignments</div>
              </div>
              <div className="w-px bg-theme-secondary/50"></div>
              <div>
                <div className="text-xl sm:text-2xl font-bold gradient-text-warm">99%</div>
                <div className="text-xs sm:text-sm text-theme-muted">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right — 3D Card Visual */}
          <div className="flex-1 flex justify-center animate-fade-in-up stagger-3">
            <div className="card-3d">
              <div className="card-3d-inner">
                <div className="glass-card p-5 sm:p-8 w-[280px] sm:w-[340px] md:w-[380px] relative animate-pulse-glow">
                  {/* Mini app preview */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }}></div>
                  </div>

                  {/* Fake content lines */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--gradient-primary)' }}>📚</div>
                      <div>
                        <div className="h-3 rounded-full w-32 mb-2 bg-theme-secondary"></div>
                        <div className="h-2 rounded-full w-20" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
                      </div>
                    </div>

                    <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent-blue)' }}>Assignment #1</span>
                        <span className="badge badge-success" style={{ fontSize: '10px' }}>Submitted</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="rounded-xl p-4" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent-purple)' }}>Assignment #2</span>
                        <span className="badge badge-warning" style={{ fontSize: '10px' }}>Pending</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div className="rounded-xl p-4" style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.1)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent-pink)' }}>Assignment #3</span>
                        <span className="badge badge-danger" style={{ fontSize: '10px' }}>Due Soon</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Glow decoration */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)', pointerEvents: 'none' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;