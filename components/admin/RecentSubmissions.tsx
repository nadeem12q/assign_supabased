import React from 'react';
import { Submission } from '../../types';
import { FileIcon } from '../FileIcon';

interface RecentSubmissionsProps {
    submissions: Submission[];
}

const RecentSubmissions: React.FC<RecentSubmissionsProps> = ({ submissions }) => {
    return (
        <div className="glass-panel overflow-hidden animate-fade-in-up stagger-5">
            <div 
                className="px-5 py-3 flex items-center justify-between" 
                style={{ borderBottom: '1px solid var(--glass-border)' }}
            >
                <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    📋 Recent
                </h3>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {submissions.length} total
                </span>
            </div>
            <ul>
                {submissions.length > 0 ? (
                    submissions.map((sub) => (
                        <li 
                            key={sub.submissionId} 
                            className="px-5 py-3 transition-all" 
                            style={{ borderBottom: '1px solid var(--glass-border)' }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-3">
                                    <div 
                                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold text-white" 
                                        style={{ background: 'var(--gradient-accent)' }}
                                    >
                                        {sub.studentName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            {sub.studentName}
                                        </p>
                                        <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            <FileIcon fileName={sub.fileName} />
                                            {sub.assignmentTitle}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span 
                                        className="text-xs font-bold px-1.5 py-0.5 rounded" 
                                        style={{ 
                                            color: 'var(--color-accent)', 
                                            background: 'rgba(var(--color-accent-rgb),0.1)' 
                                        }}
                                    >
                                        {sub.subjectId}
                                    </span>
                                    <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                                        {new Date(sub.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                        No submissions yet
                    </li>
                )}
            </ul>
        </div>
    );
};

export default RecentSubmissions;
