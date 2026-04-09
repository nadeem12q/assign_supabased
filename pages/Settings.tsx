import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme, ACCENT_OPTIONS } from '../context/ThemeContext';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { theme, accent, cursorSpotlight, spotlightIntensity, toggleTheme, setAccent, toggleCursorSpotlight, setSpotlightIntensity } = useTheme();

    return (
        <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Page Header */}
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                        <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                        Customize your experience ✨
                    </p>
                </div>

                <div className="space-y-6">

                    {/* Profile Section */}
                    <div className="settings-section animate-fade-in-up stagger-1">
                        <h2 className="settings-section-title">
                            <span style={{ fontSize: '1.3rem' }}>👤</span>
                            Profile
                        </h2>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                                style={{ background: 'var(--gradient-primary)' }}
                            >
                                {user?.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{user?.name || 'User'}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>@{user?.username || 'unknown'}</p>
                                <span className="badge badge-info mt-1 capitalize">{user?.role || 'student'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Appearance Section */}
                    <div className="settings-section animate-fade-in-up stagger-2">
                        <h2 className="settings-section-title">
                            <span style={{ fontSize: '1.3rem' }}>🎨</span>
                            Appearance
                        </h2>

                        {/* Dark/Light Toggle */}
                        <div className="settings-card flex items-center justify-between mb-6">
                            <div>
                                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Dark Mode</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Switch between light and dark themes</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span style={{ fontSize: '1.1rem' }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
                                <button
                                    className={`mode-switch ${theme === 'dark' ? 'active' : ''}`}
                                    onClick={toggleTheme}
                                    aria-label="Toggle dark mode"
                                >
                                    <div className="mode-switch-knob" />
                                </button>
                            </div>
                        </div>

                        {/* Accent Colors */}
                        <div>
                            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Accent Color</p>
                            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Choose your preferred color theme</p>
                            <div className="flex flex-wrap gap-4">
                                {ACCENT_OPTIONS.map((option) => (
                                    <div key={option.id} className="flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => setAccent(option.id)}
                                            className={`accent-swatch ${accent === option.id ? 'active' : ''}`}
                                            style={{ background: option.color }}
                                            title={option.label}
                                        >
                                            {accent === option.id && (
                                                <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <span
                                            className="text-xs px-2 py-1 rounded-lg cursor-pointer transition-all whitespace-nowrap"
                                            style={{
                                                background: accent === option.id ? `${option.color}20` : 'transparent',
                                                color: accent === option.id ? option.color : 'var(--text-muted)',
                                                border: accent === option.id ? `1px solid ${option.color}30` : '1px solid transparent',
                                                fontWeight: accent === option.id ? 600 : 400,
                                            }}
                                            onClick={() => setAccent(option.id)}
                                        >
                                            {option.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Effects Section */}
                    <div className="settings-section animate-fade-in-up stagger-3">
                        <h2 className="settings-section-title">
                            <span style={{ fontSize: '1.3rem' }}>✨</span>
                            Effects
                        </h2>

                        {/* Cursor Spotlight Toggle */}
                        <div className="settings-card flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Cursor Spotlight</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Glow effect that follows your mouse</p>
                            </div>
                            <button
                                className={`mode-switch ${cursorSpotlight ? 'active' : ''}`}
                                onClick={toggleCursorSpotlight}
                                aria-label="Toggle cursor spotlight"
                            >
                                <div className="mode-switch-knob" />
                            </button>
                        </div>

                        {/* Spotlight Intensity Slider - only show when spotlight is enabled */}
                        {cursorSpotlight && (
                            <div className="settings-card mt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                                        Spotlight Intensity
                                    </p>
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                                        {Math.round(spotlightIntensity * 100)}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.30"
                                    step="0.01"
                                    value={spotlightIntensity}
                                    onChange={(e) => setSpotlightIntensity(parseFloat(e.target.value))}
                                    className="w-full accent-slider"
                                />
                                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                    <span>Subtle</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preview Section */}
                    <div className="settings-section animate-fade-in-up stagger-4">
                        <h2 className="settings-section-title">
                            <span style={{ fontSize: '1.3rem' }}>👁️</span>
                            Preview
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="stat-card-modern">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="stat-icon" style={{ background: `rgba(var(--color-accent-rgb), 0.15)` }}>
                                        📊
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold" style={{ color: 'var(--color-accent)' }}>42</p>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sample Stat</p>
                                    </div>
                                </div>
                                <div className="progress-modern">
                                    <div className="progress-modern-fill" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div className="settings-card p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="badge badge-success">✓ Active</span>
                                    <span className="badge badge-warning">⏰ Pending</span>
                                </div>
                                <button className="btn-primary text-sm w-full">
                                    Sample Button
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
