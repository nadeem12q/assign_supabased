import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAssignments, getStudentSubmissions } from '../services/supabaseApi';
import { Submission, Assignment } from '../types';
import Skeleton, { SkeletonCard, SkeletonStat } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { FileIcon } from '../components/FileIcon';

const History: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [activeAssignments, setActiveAssignments] = useState<Assignment[]>([]);
    const [stats, setStats] = useState({ totalSubmissions: 0, onTime: 0, late: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const assignmentsData = await getAssignments();
                    setActiveAssignments(assignmentsData);
                    
                    const subs = await getStudentSubmissions(user.uid);
                    setSubmissions(subs.reverse());
                    const onTime = subs.filter(s => s.status === 'submitted').length;
                    const late = subs.filter(s => s.status === 'late').length;
                    const pending = assignmentsData.length - subs.length;
                    setStats({ totalSubmissions: subs.length, onTime, late, pending: Math.max(0, pending) });
                } catch (error) {
                    console.error("Error loading history:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    const isSubmitted = (assignment: Assignment) => 
        submissions.some(s => s.assignmentTitle === assignment.title && s.subjectId === assignment.subjectId);

    const getDueDateStatus = (dueDateStr: string) => {
        const today = new Date();
        const due = new Date(dueDateStr);
        due.setHours(23, 59, 59);
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return { text: `Overdue by ${Math.abs(diffDays)} days`, color: '#f87171', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' };
        if (diffDays === 0) return { text: 'Due Today', color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' };
        return { text: `Due in ${diffDays} days`, color: 'var(--text-muted)', bg: 'transparent', border: 'transparent' };
    };

    const handleUploadRedirect = (assignmentId: string) => {
        navigate('/upload', { state: { assignmentId } });
    };

    if (loading) {
        return (
            <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 sm:mb-8">
                        <Skeleton className="h-8 sm:h-10 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <SkeletonStat /><SkeletonStat /><SkeletonStat /><SkeletonStat />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-4"><SkeletonCard /><SkeletonCard /></div>
                        <div className="space-y-4"><SkeletonCard /></div>
                    </div>
                </div>
            </div>
        );
    }

    const statItems = [
        { label: 'Total Submissions', value: stats.totalSubmissions, icon: '📋', color: 'var(--color-accent)', glowRgb: 'var(--color-accent-rgb)' },
        { label: 'On Time', value: stats.onTime, icon: '✅', color: '#10b981', glowRgb: '16,185,129' },
        { label: 'Late', value: stats.late, icon: '⏰', color: '#f59e0b', glowRgb: '245,158,11' },
        { label: 'Pending', value: stats.pending, icon: '⚠️', color: '#ef4444', glowRgb: '239,68,68' },
    ];

    return (
        <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-6 sm:mb-8 animate-fade-in-up">
                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                        <span className="gradient-text">My Submissions</span>
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>Track your assignments and deadlines ⏰</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {statItems.map((stat, idx) => (
                        <div
                            key={stat.label}
                            className={`stat-card-modern animate-fade-in-up stagger-${idx + 1}`}
                            style={{ borderTop: `3px solid ${stat.color}` }}
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="stat-icon" style={{ background: `rgba(${stat.glowRgb},0.12)` }}>
                                    <span>{stat.icon}</span>
                                </div>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                            <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

                    {/* Left Column: Submission History */}
                    <div className="animate-slide-left">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span className="badge badge-info">HISTORY</span>
                            Recent Submissions
                        </h2>
                        <div className="glass-panel overflow-hidden">
                            <ul>
                                {submissions.length === 0 ? (
                                    <div className="p-4">
                                        <EmptyState
                                            title="No submissions yet"
                                            description="You haven't uploaded any assignments. Get started on your active tasks!"
                                            icon={<span className="text-4xl" style={{ color: 'var(--color-accent)' }}>📥</span>}
                                        />
                                    </div>
                                ) : (
                                    submissions.map((sub, index) => (
                                        <li
                                            key={sub.submissionId}
                                            className="px-5 py-4 transition-all animate-fade-in-up"
                                            style={{
                                                animationDelay: `${index * 0.05}s`,
                                                borderBottom: '1px solid var(--glass-border)',
                                                borderLeft: `3px solid ${sub.status === 'submitted' ? '#10b981' : '#f59e0b'}`,
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-sm" style={{ color: 'var(--color-accent)' }}>{sub.subjectId}</span>
                                                <span className={`badge ${sub.status === 'submitted' ? 'badge-success' : 'badge-warning'}`}>
                                                    {sub.status === 'submitted' ? '✓ Submitted' : '⏰ Late'}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{sub.assignmentTitle}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <FileIcon fileName={sub.fileName} />
                                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub.fileName} ({sub.fileSize})</span>
                                            </div>
                                            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                                📅 {new Date(sub.uploadedAt).toLocaleDateString()} at {new Date(sub.uploadedAt).toLocaleTimeString()}
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Pending Assignments */}
                    <div className="animate-slide-right">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span className="badge badge-danger">TODO</span>
                            Pending Assignments
                        </h2>
                        <div className="space-y-4">
                            {activeAssignments.filter(a => !isSubmitted(a)).length === 0 ? (
                                <EmptyState
                                    title="All caught up!"
                                    description="You have no pending assignments right now. Great job!"
                                    icon={<span className="text-4xl text-green-500">🎉</span>}
                                />
                            ) : (
                                activeAssignments.filter(a => !isSubmitted(a)).map((assignment, index) => {
                                    const dueStatus = getDueDateStatus(assignment.dueDate);
                                    return (
                                        <div
                                            key={assignment.id}
                                            className="glass-panel p-5 transition-all hover:-translate-y-1 animate-fade-in-up group"
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                                borderLeft: `3px solid var(--color-accent)`,
                                            }}
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                                <div>
                                                    <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>{assignment.id}</span>
                                                    <h3 className="text-md font-semibold" style={{ color: 'var(--text-primary)' }}>{assignment.title}</h3>
                                                </div>
                                                <span
                                                    className="text-xs font-bold px-3 py-1 rounded-full"
                                                    style={{ color: dueStatus.color, background: dueStatus.bg, border: `1px solid ${dueStatus.border}` }}
                                                >
                                                    {dueStatus.text}
                                                </span>
                                            </div>
                                            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>📅 Due: {assignment.dueDate}</span>
                                                <button
                                                    onClick={() => handleUploadRedirect(assignment.id)}
                                                    className="btn-primary text-xs py-2 px-4"
                                                >
                                                    Upload Now →
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;