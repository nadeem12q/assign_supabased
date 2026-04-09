import React from 'react';
import { User, Assignment, AssignmentProgressItem } from '../../types';
import { getDisplayStatus, isExpired } from '../../services/supabaseApi';
import { getProgressColor, statusConfig } from '../../utils/adminHelpers';



interface AssignmentProgressProps {
    progressData: AssignmentProgressItem[];
    rawAssignments: Assignment[];
    expandedAssignments: Set<string>;
    onToggleExpand: (key: string) => void;
    onSendReminder: (student: User, subjectId: string, assignmentTitle: string, dueDate: string) => void;
    onToggleStatus: (assignmentId: string) => void;
}

const AssignmentProgress: React.FC<AssignmentProgressProps> = ({
    progressData,
    rawAssignments,
    expandedAssignments,
    onToggleExpand,
    onSendReminder,
    onToggleStatus,
}) => {
    const statusColors = {
        active: { bg: statusConfig.active.color, text: statusConfig.active.text, label: statusConfig.active.label },
        inactive: { bg: statusConfig.inactive.color, text: statusConfig.inactive.text, label: statusConfig.inactive.label },
        expired: { bg: statusConfig.expired.color, text: statusConfig.expired.text, label: statusConfig.expired.label },
    };

    return (
        <div className="glass-panel overflow-hidden animate-fade-in-up stagger-3">
            <div 
                className="px-5 py-4 flex justify-between items-center" 
                style={{ borderBottom: '1px solid var(--glass-border)' }}
            >
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span 
                        className="stat-icon" 
                        style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 10, 
                            background: 'rgba(var(--color-accent-rgb),0.1)', 
                            fontSize: '0.85rem' 
                        }}
                    >
                        📈
                    </span>
                    Assignment Progress
                </h2>
                <span className="badge badge-info text-[10px]">Live</span>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
                {progressData.map((item) => {
                    const assignment = rawAssignments.find(
                        a => a.subjectId === item.subjectId && a.title === item.title
                    );
                    const displayStatus = assignment ? getDisplayStatus(assignment) : 'active';
                    const expired = assignment ? isExpired(assignment) : false;
                    const colors = statusColors[displayStatus];
                    const expandKey = item.subjectId + item.title;

                    return (
                        <div key={item.subjectId + item.title} className="assignment-card relative">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-2">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span 
                                            className="text-xs font-bold px-2 py-0.5 rounded" 
                                            style={{ 
                                                color: 'var(--color-accent)', 
                                                background: 'rgba(var(--color-accent-rgb),0.1)' 
                                            }}
                                        >
                                            {item.subjectId}
                                        </span>
                                        <span
                                            className="text-xs font-bold px-2 py-0.5 rounded cursor-pointer transition-all hover:scale-105"
                                            style={{ 
                                                color: colors.text, 
                                                background: `${colors.bg}20`, 
                                                border: `1px solid ${colors.bg}40` 
                                            }}
                                            onClick={() => assignment && onToggleStatus(assignment.id)}
                                            title="Click to toggle status"
                                        >
                                            {colors.label}
                                        </span>
                                    </div>
                                    <h3 className="text-md font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        Due: {item.dueDate}
                                    </p>
                                    {expired && displayStatus !== 'inactive' && (
                                        <p className="text-xs mt-1" style={{ color: '#fbbf24' }}>
                                            ⚠️ Due date has passed
                                        </p>
                                    )}
                                </div>
                                <div className="text-left sm:text-right">
                                    <span 
                                        className="text-xl sm:text-2xl font-bold" 
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {item.percentage}%
                                    </span>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {item.submittedCount}/{item.totalStudents} submitted
                                    </p>
                                </div>
                            </div>
                            <div className="progress-modern mb-3">
                                <div 
                                    className="progress-modern-fill" 
                                    style={{ 
                                        width: `${item.percentage}%`, 
                                        background: getProgressColor(item.percentage) 
                                    }}
                                />
                            </div>
                            {item.missingStudents.length > 0 ? (
                                <div 
                                    className="rounded-xl overflow-hidden" 
                                    style={{ 
                                        background: 'rgba(245,158,11,0.06)', 
                                        border: '1px solid rgba(245,158,11,0.12)' 
                                    }}
                                >
                                    <button
                                        onClick={() => onToggleExpand(expandKey)}
                                        className="w-full px-4 py-3 flex justify-between items-center transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-2">⚠️</span>
                                            <span className="text-sm font-bold" style={{ color: '#fbbf24' }}>
                                                Missing ({item.missingStudents.length})
                                            </span>
                                        </div>
                                        <svg 
                                            className={`w-5 h-5 transform transition-transform duration-200 ${
                                                expandedAssignments.has(expandKey) ? 'rotate-180' : ''
                                            }`} 
                                            style={{ color: '#fbbf24' }} 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M19 9l-7 7-7-7" 
                                            />
                                        </svg>
                                    </button>
                                    {expandedAssignments.has(expandKey) && (
                                        <div 
                                            className="animate-accordion-down" 
                                            style={{ borderTop: '1px solid rgba(245,158,11,0.12)' }}
                                        >
                                            {item.missingStudents.map((student) => (
                                                <div 
                                                    key={student.username} 
                                                    className="px-4 py-3 flex justify-between items-center" 
                                                    style={{ borderBottom: '1px solid rgba(245,158,11,0.06)' }}
                                                >
                                                    <div className="flex items-center">
                                                        <span 
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mr-3 text-white" 
                                                            style={{ background: 'var(--gradient-accent)' }}
                                                        >
                                                            {student.name.charAt(0).toUpperCase()}
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                                {student.name}
                                                            </p>
                                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                                {student.phone || 'No phone'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => onSendReminder(student, item.subjectId, item.title, item.dueDate)}
                                                        disabled={!student.phone}
                                                        className={`text-xs font-bold py-2 px-3 rounded-lg flex items-center transition-colors ${
                                                            student.phone ? 'text-white cursor-pointer' : 'cursor-not-allowed'
                                                        }`}
                                                        style={{ 
                                                            background: student.phone ? 'var(--gradient-accent)' : 'var(--glass)', 
                                                            opacity: student.phone ? 1 : 0.4 
                                                        }}
                                                    >
                                                        📱 Send
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div 
                                    className="p-3 rounded-xl" 
                                    style={{ 
                                        background: 'rgba(16,185,129,0.06)', 
                                        border: '1px solid rgba(16,185,129,0.12)' 
                                    }}
                                >
                                    <p className="text-sm font-bold" style={{ color: '#34d399' }}>
                                        ✅ All Caught Up!
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                {progressData.length === 0 && (
                    <p className="text-center" style={{ color: 'var(--text-muted)' }}>
                        No assignments found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AssignmentProgress;
