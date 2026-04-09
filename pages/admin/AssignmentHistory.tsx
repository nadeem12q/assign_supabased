import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Assignment, Subject } from '../../types';
import EmptyState from '../../components/EmptyState';
import { getDisplayStatus, getAssignments, getAllSubjects } from '../../services/supabaseApi';
import { statusConfig } from '../../utils/adminHelpers';

type HistoryFilter = 'all' | 'active' | 'expired' | 'inactive';

const AssignmentHistory: React.FC = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            const [data, subjectsData] = await Promise.all([
                getAssignments(),
                getAllSubjects()
            ]);
            setAssignments(data);
            setSubjects(subjectsData);
        } catch (error) {
            console.error('Failed to load assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupedAssignments = useMemo(() => {
        const filtered = assignments.filter((assignment) => {
            if (historyFilter === 'all') return true;
            const displayStatus = getDisplayStatus(assignment);
            if (historyFilter === 'active') return displayStatus === 'active';
            if (historyFilter === 'expired') return displayStatus === 'expired';
            if (historyFilter === 'inactive') return displayStatus === 'inactive';
            return true;
        });

        const grouped = filtered.reduce((acc, assignment) => {
            if (!acc[assignment.subjectId]) acc[assignment.subjectId] = [];
            acc[assignment.subjectId].push(assignment);
            return acc;
        }, {} as Record<string, Assignment[]>);

        Object.keys(grouped).forEach((subject) => {
            grouped[subject].sort((a, b) => new Date(b.assignDate).getTime() - new Date(a.assignDate).getTime());
        });

        const sortedSubjects = Object.keys(grouped).sort();
        const sortedGrouped: Record<string, Assignment[]> = {};
        sortedSubjects.forEach((subject) => {
            sortedGrouped[subject] = grouped[subject];
        });

        return sortedGrouped;
    }, [assignments, historyFilter]);

    const subjectIds = Object.keys(groupedAssignments);

    const getSubjectName = (subjectId: string) => {
        const subject = subjects.find(s => s.id === subjectId);
        return subject ? subject.name : subjectId;
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-700 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
            <div className="glass-panel animate-fade-in-up rounded-2xl overflow-hidden">
                <div
                    className="px-4 sm:px-6 py-4 flex items-center justify-between"
                    style={{ background: 'var(--gradient-primary)' }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-2xl">📜</span>
                        Assignment History
                    </h2>
                    <button
                        onClick={() => navigate('/admin')}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all min-w-[44px] min-h-[44px]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div 
                    className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" 
                    style={{ borderBottom: '1px solid var(--glass-border)' }}
                >
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                        View all assignments organized by subject
                    </p>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={historyFilter}
                            onChange={(e) => setHistoryFilter(e.target.value as HistoryFilter)}
                            className="select-modern text-xs sm:text-sm py-2 sm:py-2.5 pr-10 w-full sm:w-auto"
                            style={{ minWidth: 'auto' }}
                        >
                            <option value="all">📋 All Status</option>
                            <option value="active">🟢 Active</option>
                            <option value="expired">🔴 Expired</option>
                            <option value="inactive">⚪ Inactive</option>
                        </select>
                        <svg 
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" 
                            style={{ color: 'var(--text-muted)' }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                    {subjectIds.length === 0 ? (
                        <EmptyState
                            title="No Assignments Found"
                            description={historyFilter === 'all' ? "No assignments have been created yet." : `No ${historyFilter} assignments found.`}
                            icon={<span className="text-4xl">📚</span>}
                        />
                    ) : (
                        subjectIds.map((subjectId) => {
                            const subjectAssignments = groupedAssignments[subjectId];
                            return (
                                <div
                                    key={subjectId}
                                    className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                                    style={{
                                        background: 'var(--glass)',
                                        border: '1px solid var(--glass-border)',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(var(--color-accent-rgb), 0.4)';
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(var(--color-accent-rgb), 0.15), 0 0 0 1px rgba(var(--color-accent-rgb), 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                                    }}
                                >
                                    <div
                                        className="px-4 py-3 flex items-center gap-2"
                                        style={{
                                            background: 'rgba(var(--color-accent-rgb),0.12)',
                                            borderBottom: '1px solid var(--glass-border)'
                                        }}
                                    >
                                        <span className="text-lg">📁</span>
                                        <span
                                            className="text-sm font-bold px-2.5 py-1 rounded-lg"
                                            style={{
                                                color: 'var(--color-accent)',
                                                background: 'rgba(var(--color-accent-rgb),0.2)',
                                                border: '1px solid rgba(var(--color-accent-rgb),0.3)'
                                            }}
                                        >
                                            {getSubjectName(subjectId)}
                                        </span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                                            ({subjectAssignments.length} assignments)
                                        </span>
                                    </div>
                                    <div className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
                                        {subjectAssignments.map((assignment) => {
                                            const displayStatus = getDisplayStatus(assignment);
                                            const config = statusConfig[displayStatus];

                                            return (
                                                <div
                                                    key={assignment.id + assignment.title}
                                                    className="px-4 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all duration-200 hover:bg-white/5"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                                            {assignment.title}
                                                        </h4>
                                                        <p className="text-xs mt-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                                                            <span>📅 Assigned: {new Date(assignment.assignDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                            <span>→</span>
                                                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 self-start sm:self-center transition-all duration-200 hover:scale-105"
                                                        style={{
                                                            color: config.color,
                                                            background: config.bg,
                                                            border: `1px solid ${config.border}`,
                                                            boxShadow: config.glow
                                                        }}
                                                    >
                                                        {config.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid var(--glass-border)' }}>
                    <button
                        onClick={() => navigate('/admin')}
                        className="btn-primary px-6 py-2"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentHistory;
