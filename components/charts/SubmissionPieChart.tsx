import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SubmissionPieChartProps {
    submitted: number;
    missing: number;
}

const SubmissionPieChart: React.FC<SubmissionPieChartProps> = ({ submitted, missing }) => {
    const data = [
        { name: 'Submitted', value: submitted, color: '#10b981' },
        { name: 'Missing', value: missing, color: '#ef4444' },
    ];

    const total = submitted + missing;
    const submittedPercent = total > 0 ? Math.round((submitted / total) * 100) : 0;

    return (
        <div className="glass-panel p-5 animate-fade-in-up">
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="text-lg">📊</span>
                Submission Rate
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--text-primary)',
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{
                                color: 'var(--text-primary)',
                                fontSize: '12px',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
                <p className="text-2xl font-bold" style={{ color: '#10b981' }}>
                    {submittedPercent}%
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {submitted} of {total} students submitted
                </p>
            </div>
        </div>
    );
};

export default SubmissionPieChart;
