import React from 'react';

interface SkeletonProps {
    className?: string;
    pulse?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', pulse = true }) => {
    return (
        <div
            className={`rounded-lg ${pulse ? 'animate-pulse' : ''} ${className}`}
            style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
            }}
        />
    );
};

export const SkeletonCard: React.FC = () => (
    <div className="glass-card-static p-6 flex flex-col gap-4 w-full animate-pulse-glow">
        <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
    </div>
);

export const SkeletonStat: React.FC = () => (
    <div className="stat-card animate-pulse-glow">
        <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-6 w-2/3" />
        </div>
        <Skeleton className="h-8 w-1/3 mb-1" />
        <Skeleton className="h-4 w-1/2" />
    </div>
);

export default Skeleton;
