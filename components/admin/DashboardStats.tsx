import React from 'react';
import { DashboardStats as DashboardStatsType } from '../../types';

interface DashboardStatsProps {
    stats: DashboardStatsType | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
    const statItems = [
        { 
            label: 'Total Students', 
            value: stats?.totalStudents ?? 0, 
            icon: '👥', 
            color: 'var(--color-accent)',
            delay: 1
        },
        { 
            label: 'Submissions', 
            value: stats?.totalSubmissions ?? 0, 
            icon: '📄', 
            color: '#8b5cf6',
            delay: 2
        },
        { 
            label: 'Active Assignments', 
            value: stats?.activeAssignments ?? 0, 
            icon: '📋', 
            color: '#06b6d4',
            delay: 3
        },
        { 
            label: 'Submission Rate', 
            value: `${stats?.submissionRate ?? 0}%`, 
            icon: '📈', 
            color: '#10b981',
            delay: 4
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {statItems.map((stat) => (
                <div 
                    key={stat.label} 
                    className={`stat-card-modern animate-fade-in-up stagger-${stat.delay}`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div 
                            className="stat-icon" 
                            style={{ background: `${stat.color}15` }}
                        >
                            <span>{stat.icon}</span>
                        </div>
                    </div>
                    <p 
                        className="text-2xl sm:text-3xl font-extrabold" 
                        style={{ color: stat.color }}
                    >
                        {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
