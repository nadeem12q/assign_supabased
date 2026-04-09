import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
    setProfileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-card-static" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'var(--gradient-primary)' }}>
              🎓
            </div>
            <span className="font-bold text-xl gradient-text tracking-tight">
              AssignPortal
            </span>
          </Link>

          {/* Desktop Nav + User */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user && (
              <>
                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-1">
                  {user.role === UserRole.STUDENT && (
                    <>
                      <Link
                        to="/upload"
                        className={`nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/upload') ? 'active text-accent-blue bg-theme-secondary/50' : 'text-theme-secondary hover:text-theme-primary'}`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          Upload
                        </span>
                      </Link>
                    </>
                  )}
                  {user.role === UserRole.ADMIN && (
                    <Link
                      to="/admin"
                      className={`nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive('/admin') ? 'active text-accent-blue bg-theme-secondary/50' : 'text-theme-secondary hover:text-theme-primary'}`}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Dashboard
                      </span>
                    </Link>
                  )}
                </nav>

                {/* Divider */}
                <div className="hidden md:block w-px h-8 border-theme" style={{ borderLeftWidth: '1px' }}></div>

                {/* Profile Avatar + Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl transition-all hover:bg-theme-secondary/50"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                      <p className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                    </div>
                    <svg className={`w-4 h-4 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="profile-dropdown">
                      {/* User Info */}
                      <div className="px-3 py-2 mb-1">
                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@{user.username}</p>
                      </div>
                      <div className="profile-dropdown-divider" />

                      {/* History Link */}
                      <Link
                        to="/history"
                        onClick={() => setProfileOpen(false)}
                        className="profile-dropdown-item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        History
                      </Link>

                      {/* Subjects Link - Only for Students */}
                      {user.role === UserRole.STUDENT && (
                        <Link
                          to="/subjects"
                          onClick={() => setProfileOpen(false)}
                          className="profile-dropdown-item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          My Subjects
                        </Link>
                      )}

                      {/* Settings Link */}
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="profile-dropdown-item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>

                      <div className="profile-dropdown-divider" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="profile-dropdown-item danger"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-white/5 transition"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && user && (
          <div className="md:hidden pb-4 animate-fade-in-down">
            <div className="flex flex-col gap-1" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
              {/* User info in mobile menu */}
              <div className="flex items-center gap-3 px-4 py-3 mb-1 rounded-xl" style={{ background: 'var(--glass)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ background: 'var(--gradient-primary)' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                </div>
              </div>

              {user.role === UserRole.STUDENT && (
                <>
                  <Link to="/upload" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${isActive('/upload') ? 'text-accent-blue bg-theme-secondary/50' : 'text-theme-secondary hover:text-theme-primary'}`}>
                    📤 Upload
                  </Link>
                </>
              )}
              {user.role === UserRole.ADMIN && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${isActive('/admin') ? 'text-accent-blue bg-theme-secondary/50' : 'text-theme-secondary hover:text-theme-primary'}`}>
                  📊 Dashboard
                </Link>
              )}

              {/* Settings Link */}
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${isActive('/settings') ? 'text-accent-blue bg-theme-secondary/50' : 'text-theme-secondary hover:text-theme-primary'}`}>
                ⚙️ Settings
              </Link>

              {/* Logout */}
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--glass-border)' }}>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-3"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;