import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjects } from '../services/supabaseApi';
import { Subject } from '../types';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

const Subjects: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        toast.error('Failed to load subjects');
      } finally {
        setIsLoading(false);
      }
    };
    loadSubjects();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 bg-theme-primary">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="glass-card-static overflow-hidden mb-6 animate-fade-in-up">
          <div className="px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden rounded-t-3xl" style={{ background: 'var(--gradient-primary)' }}>
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1), transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            <div className="relative z-10">
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                My Subjects
              </h1>
              <p className="text-white/70 text-sm mt-1">Welcome back, {user?.name} ✨</p>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-panel p-6 rounded-xl">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : subjects.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-xl animate-fade-in">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(var(--color-accent-rgb),0.1)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No subjects available</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Check back later for your enrolled subjects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="glass-panel p-5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  background: subject.color ? `${subject.color}20` : 'var(--glass)',
                  borderColor: subject.color || 'var(--glass-border)'
                }}
              >
                {/* Color Indicator */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
                    style={{ background: subject.color || 'var(--gradient-primary)' }}
                  >
                    {subject.id.charAt(0)}
                  </div>
                </div>

                {/* Subject Info */}
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                  {subject.id}
                </h3>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {subject.name}
                </p>

                {/* Description if available */}
                {subject.description && (
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {subject.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Card */}
        <div className="glass-panel p-5 rounded-xl mt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(var(--color-accent-rgb),0.1)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>How it works</h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Each subject has a dedicated folder in the system. When you upload assignments, 
                they are automatically organized by subject and assignment title. 
                Click on "Upload Assignment" to submit your work for any subject.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
