import React from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center glass-card-static animate-fade-in-up">
            {icon ? (
                <div className="mb-6 opacity-80" style={{ color: 'var(--accent-blue)' }}>
                    {icon}
                </div>
            ) : (
                <div className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center opacity-80" style={{ background: 'var(--glass)', border: '1px dashed var(--glass-border)' }}>
                    <span className="text-3xl">📭</span>
                </div>
            )}
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{description}</p>
            {action && <div>{action}</div>}
        </div>
    );
};

export default EmptyState;
