import React, { useState } from 'react';
import { Submission, Assignment, AssignmentProgressItem } from '../../types';
import EmptyState from '../EmptyState';
import { getProgressColor } from '../../utils/adminHelpers';



interface SearchResultData {
    type: 'subject' | 'student';
    data: any[];
}

interface SearchResultsProps {
    searchQuery: string;
    searchResult: SearchResultData;
    rawAssignments: Assignment[];
    onClear: () => void;
}



const SearchResults: React.FC<SearchResultsProps> = ({
    searchQuery,
    searchResult,
    rawAssignments,
    onClear,
}) => {
    const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set());

    const toggleStudentExpand = (uid: string) => {
        setExpandedStudents(prev => {
            const next = new Set(prev);
            if (next.has(uid)) next.delete(uid); else next.add(uid);
            return next;
        });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Results for "{searchQuery}"
                </h2>
                <button 
                    onClick={onClear} 
                    className="text-sm font-medium flex items-center gap-1" 
                    style={{ color: 'var(--color-accent)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>

            {/* Subject Results */}
            {searchResult.type === 'subject' && searchResult.data.length === 0 && (
                <EmptyState 
                    title="No Subject Found" 
                    description={`We couldn't find any subject matching '${searchQuery}'.`} 
                    icon={<span className="text-4xl" style={{ color: 'var(--color-accent)' }}>🔍</span>} 
                />
            )}
            {searchResult.type === 'subject' && searchResult.data.length > 0 && (
                <div className="space-y-6">
                    {searchResult.data.map((item: AssignmentProgressItem) => (
                        <div key={item.title} className="glass-panel overflow-hidden">
                            <div 
                                className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2" 
                                style={{ background: 'var(--gradient-primary)' }}
                            >
                                <div>
                                    <span 
                                        className="text-white/80 text-xs px-2 py-1 rounded uppercase font-bold tracking-wider" 
                                        style={{ background: 'rgba(255,255,255,0.2)' }}
                                    >
                                        {item.subjectId}
                                    </span>
                                    <h3 className="text-white text-xl font-bold mt-1">{item.title}</h3>
                                </div>
                                <div className="text-white text-right">
                                    <p className="text-sm opacity-90">Due: {item.dueDate}</p>
                                    <p className="text-2xl font-bold">{item.percentage}%</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="progress-modern mb-4">
                                    <div 
                                        className="progress-modern-fill" 
                                        style={{ width: `${item.percentage}%`, background: getProgressColor(item.percentage) }}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div 
                                        className="p-4 rounded-xl" 
                                        style={{ 
                                            background: 'rgba(16,185,129,0.08)', 
                                            border: '1px solid rgba(16,185,129,0.15)' 
                                        }}
                                    >
                                        <h4 className="font-bold text-sm mb-2 flex items-center" style={{ color: '#34d399' }}>
                                            ✅ Submitted ({item.submittedCount})
                                        </h4>
                                        <p className="text-sm leading-relaxed" style={{ color: '#6ee7b7' }}>
                                            {item.submittedStudents.length > 0 
                                                ? item.submittedStudents.join(', ') 
                                                : 'No submissions yet.'}
                                        </p>
                                    </div>
                                    <div 
                                        className="p-4 rounded-xl" 
                                        style={{ 
                                            background: 'rgba(239,68,68,0.08)', 
                                            border: '1px solid rgba(239,68,68,0.15)' 
                                        }}
                                    >
                                        <h4 className="font-bold text-sm flex items-center" style={{ color: '#f87171' }}>
                                            ❌ Missing ({item.missingStudents.length})
                                        </h4>
                                        <p className="text-sm mt-2 leading-relaxed" style={{ color: '#fca5a5' }}>
                                            {item.missingStudents.length > 0 
                                                ? item.missingStudents.map(s => s.name.split(' ')[0]).join(', ') 
                                                : 'All submitted!'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Student Results */}
            {searchResult.type === 'student' && searchResult.data.length === 0 && (
                <EmptyState 
                    title="No Student Found" 
                    description={`No student found matching '${searchQuery}'.`} 
                    icon={<span className="text-4xl">🧑‍🎓</span>} 
                />
            )}
            {searchResult.type === 'student' && searchResult.data.length > 0 && (
                <div className="space-y-4">
                    {searchResult.data.map((student: any) => {
                        const isExpanded = expandedStudents.has(student.uid);
                        const pendingCount = rawAssignments.length - student.submissions.length;
                        return (
                            <div key={student.uid} className="glass-panel overflow-hidden">
                                {/* Clickable Header - Always Visible */}
                                <button
                                    onClick={() => toggleStudentExpand(student.uid)}
                                    className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-left transition-all cursor-pointer"
                                    style={{ 
                                        background: isExpanded ? 'var(--gradient-primary)' : 'transparent',
                                        color: isExpanded ? 'white' : 'inherit'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span 
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" 
                                            style={{ background: isExpanded ? 'rgba(255,255,255,0.2)' : 'var(--gradient-accent)' }}
                                        >
                                            {student.name.charAt(0).toUpperCase()}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold" style={{ color: isExpanded ? 'white' : 'var(--text-primary)' }}>
                                                {student.name}
                                            </h3>
                                            <p className="text-xs" style={{ color: isExpanded ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                                                @{student.username} • {student.phone || 'No phone'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2">
                                            <span 
                                                className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                style={{ 
                                                    color: isExpanded ? 'white' : '#34d399',
                                                    background: isExpanded ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.1)'
                                                }}
                                            >
                                                ✅ {student.submissions.length}
                                            </span>
                                            {pendingCount > 0 && (
                                                <span 
                                                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                    style={{ 
                                                        color: isExpanded ? 'white' : '#f87171',
                                                        background: isExpanded ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.1)'
                                                    }}
                                                >
                                                    ❌ {pendingCount}
                                                </span>
                                            )}
                                        </div>
                                        <svg 
                                            className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                                            style={{ color: isExpanded ? 'white' : 'var(--text-muted)' }}
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expandable Details */}
                                {isExpanded && (
                                    <div className="animate-accordion-down" style={{ borderTop: '1px solid var(--glass-border)' }}>
                                        <div className="p-4 sm:p-6">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                                <div className="stat-card-modern text-center">
                                                    <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                                                        {student.submissions.length}
                                                    </p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Total</p>
                                                </div>
                                                <div className="stat-card-modern text-center">
                                                    <p className="text-2xl font-bold" style={{ color: '#10b981' }}>
                                                        {student.submissions.length}
                                                    </p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Completed</p>
                                                </div>
                                                <div className="stat-card-modern text-center">
                                                    <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                                                        {pendingCount}
                                                    </p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Pending</p>
                                                </div>
                                            </div>
                                            <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                                Submission Details
                                            </h3>
                                            <div className="space-y-3">
                                                {rawAssignments.map(assign => {
                                                    const sub = student.submissions.find(
                                                        (s: Submission) => s.subjectId === assign.id && s.assignmentTitle === assign.title
                                                    );
                                                    return (
                                                        <div 
                                                            key={assign.id + assign.title} 
                                                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 sm:p-4 rounded-xl" 
                                                            style={{ 
                                                                background: sub ? 'var(--glass)' : 'rgba(239,68,68,0.06)', 
                                                                border: `1px solid ${sub ? 'var(--glass-border)' : 'rgba(239,68,68,0.15)'}` 
                                                            }}
                                                        >
                                                            <div className="min-w-0">
                                                                <div className="flex flex-wrap items-center gap-1">
                                                                    <span 
                                                                        className="text-xs font-bold px-2 py-0.5 rounded" 
                                                                        style={{ 
                                                                            color: 'var(--color-accent)', 
                                                                            background: 'rgba(var(--color-accent-rgb),0.1)' 
                                                                        }}
                                                                    >
                                                                        {assign.id}
                                                                    </span>
                                                                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                                                                        {assign.title}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                                                    Due: {assign.dueDate}
                                                                </p>
                                                            </div>
                                                            <div className="text-right flex-shrink-0">
                                                                {sub ? (
                                                                    <div className="flex flex-col items-end">
                                                                        <span className="badge badge-success text-xs">✅ Submitted</span>
                                                                        <a 
                                                                            href={sub.fileUrl} 
                                                                            target="_blank" 
                                                                            rel="noreferrer" 
                                                                            className="text-xs hover:underline mt-1" 
                                                                            style={{ color: 'var(--color-accent)' }}
                                                                        >
                                                                            View File
                                                                        </a>
                                                                    </div>
                                                                ) : (
                                                                    <span className="badge badge-danger text-xs">❌ Missing</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
export type { SearchResultData };
