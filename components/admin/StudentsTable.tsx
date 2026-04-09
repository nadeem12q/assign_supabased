import React, { useState } from 'react';
import { User, Submission, Assignment } from '../../types';
import EmptyState from '../EmptyState';

interface StudentsTableProps {
    students: User[];
    submissions: Submission[];
    assignments: Assignment[];
}

const ITEMS_PER_PAGE = 10;

const StudentsTable: React.FC<StudentsTableProps> = ({ students, submissions, assignments }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedStudents = students.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel overflow-hidden">
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
                            👥
                        </span>
                        All Students
                    </h2>
                    <span className="badge badge-info text-[10px]">{students.length} total</span>
                </div>
                {students.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>#</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Name</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Username</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Phone</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Submissions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedStudents.map((student, index) => {
                                        const studentSubs = submissions.filter(sub => sub.studentUsername === student.username);
                                        const globalIndex = startIndex + index;
                                        return (
                                            <tr 
                                                key={student.username} 
                                                className="transition-colors"
                                                style={{ borderBottom: '1px solid var(--glass-border)' }}
                                            >
                                                <td className="px-5 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{globalIndex + 1}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span 
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" 
                                                            style={{ background: 'var(--gradient-accent)' }}
                                                        >
                                                            {student.name.charAt(0).toUpperCase()}
                                                        </span>
                                                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                            {student.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>@{student.username}</td>
                                                <td className="px-5 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{student.phone || '—'}</td>
                                                <td className="px-5 py-3">
                                                    <span 
                                                        className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                        style={{ 
                                                            color: studentSubs.length > 0 ? '#34d399' : '#f87171',
                                                            background: studentSubs.length > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'
                                                        }}
                                                    >
                                                        {studentSubs.length} / {assignments.length}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--glass-border)' }}>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, students.length)} of {students.length}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all"
                                        style={{ 
                                            background: 'var(--bg-secondary)',
                                            color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                                            opacity: currentPage === 1 ? 0.5 : 1,
                                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all"
                                        style={{ 
                                            background: 'var(--bg-secondary)',
                                            color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                                            opacity: currentPage === totalPages ? 0.5 : 1,
                                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-6">
                        <EmptyState
                            title="No Students Found"
                            description="No students have been registered yet."
                            icon={<span className="text-4xl">🧑‍🎓</span>}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsTable;
