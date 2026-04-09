import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StudentBarChartProps {
    progressData: Array<{
        subjectId: string;
        title: string;
        percentage: number;
        submittedCount: number;
        totalStudents: number;
    }>;
}

const StudentBarChart: React.FC<StudentBarChartProps> = ({ progressData }) => {
    // Take top 5 assignments by submission rate for cleaner display
    const chartData = progressData
        .map(item => ({
            name: item.subjectId,
            fullTitle: item.title,
            submitted: item.submittedCount,
            total: item.totalStudents,
            percentage: item.percentage,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

    const getBarColor = (percentage: number) => {
        if (percentage >= 80) return '#10b981';
        if (percentage >= 50) return 'var(--color-accent)';
        return '#f59e0b';
    };

    return (
        <div className="glass-panel p-5 animate-fade-in-up stagger-2">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="text-lg">📊</span>
                    Top Assignment Submission Rates
                </h3>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="rgba(var(--color-accent-rgb),0.1)" 
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="name" 
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--text-primary)',
                            }}
                            labelStyle={{ color: 'var(--text-muted)' }}
                            formatter={(value: any, _name: any, props: any) => {
                                const data = props.payload;
                                if (typeof value === 'number' && data) {
                                    return [`${data.submitted}/${data.total} (${value}%)`, 'Submitted'];
                                }
                                return ['', ''];
                            }}
                        />
                        <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>≥80%</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ background: 'var(--color-accent)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>50-79%</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>&lt;50%</span>
                </div>
            </div>
        </div>
    );
};

export default StudentBarChart;
