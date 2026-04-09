import React from 'react';
import { Assignment, Subject } from '../../types';
import EmptyState from '../EmptyState';
import { getDisplayStatus } from '../../services/supabaseApi';
import { statusConfig } from '../../utils/adminHelpers';

interface AssignmentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupedAssignments: Record<string, Assignment[]>;
    subjects: Subject[];
    historyFilter: 'all' | 'active' | 'expired' | 'inactive';
    onFilterChange: (filter: 'all' | 'active' | 'expired' | 'inactive') => void;
}

const AssignmentHistoryModal: React.FC<AssignmentHistoryModalProps> = ({
    isOpen,
    onClose,
    groupedAssignments,
    subjects: subjectsList,
    historyFilter,
    onFilterChange,
}) => {
    if (!isOpen) return null;

    const subjectIds = Object.keys(groupedAssignments);

    const getSubjectName = (subjectId: string) => {
        const subject = subjectsList.find(s => s.id === subjectId);
        return subject ? subject.name : subjectId;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="glass-panel animate-scale-in w-full max-w-2xl mx-3 sm:mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                {/* Modal Header */}
                <div
                    className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
                    style={{ background: 'var(--gradient-primary)' }}
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">📚</span>
                        <span className="truncate">Assignment History</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all min-w-[44px] min-h-[44px]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Filter Bar */}
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
                            onChange={(e) => onFilterChange(e.target.value as 'all' | 'active' | 'expired' | 'inactive')}
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

                {/* Content */}
                <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                    {subjectIds.length === 0 ? (
                        <EmptyState
                            title="No Assignments Found"
                            description={historyFilter === 'all' ? "No assignments have been created yet." : `No ${historyFilter} assignments found.`}
                            icon={<span className="text-4xl">📚</span>}
                        />
                    ) : (
                        subjectIds.map((subjectId) => {
                            const assignments = groupedAssignments[subjectId];
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
                                    {/* Subject Header */}
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
                                            ({assignments.length} assignments)
                                        </span>
                                    </div>
                                    {/* Assignments List */}
                                    <div className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
                                        {assignments.map((assignment) => {
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

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid var(--glass-border)' }}>
                    <button
                        onClick={onClose}
                        className="btn-primary px-6 py-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentHistoryModal;
