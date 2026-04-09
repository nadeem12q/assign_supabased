import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
    onCreateAssignment?: () => void;
    onManageSubjects?: () => void;
    onViewHistory?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
    onCreateAssignment,
    onManageSubjects,
    onViewHistory,
}) => {
    const navigate = useNavigate();

    const handleCreateAssignment = onCreateAssignment || (() => navigate('/admin/create-assignment'));
    const handleManageSubjects = onManageSubjects || (() => navigate('/admin/subjects'));
    const handleViewHistory = onViewHistory || (() => navigate('/admin/history'));

    return (
        <div className="glass-panel p-5 animate-fade-in-up stagger-4">
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span 
                    className="stat-icon" 
                    style={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: 8, 
                        background: 'rgba(var(--color-accent-rgb),0.1)', 
                        fontSize: '0.75rem' 
                    }}
                >
                    🎯
                </span>
                Quick Actions
            </h3>
            <div className="space-y-3">
                <button
                    onClick={handleCreateAssignment}
                    className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all hover:scale-[1.02] btn-primary"
                >
                    ➕ Create Assignment
                </button>
                <button
                    onClick={handleManageSubjects}
                    className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all hover:scale-[1.02] btn-ghost"
                >
                    📚 Manage Subjects
                </button>
                <button
                    onClick={handleViewHistory}
                    className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all hover:scale-[1.02] btn-ghost"
                    style={{ border: '1px dashed var(--glass-border)' }}
                >
                    📜 View Assignment History
                </button>
            </div>
        </div>
    );
};

export default QuickActions;
