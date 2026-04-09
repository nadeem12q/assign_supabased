import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Submission } from '../../types';

interface ActivityLineChartProps {
    submissions: Submission[];
}

const ActivityLineChart: React.FC<ActivityLineChartProps> = ({ submissions }) => {
    // Generate last 7 days data
    const generateLast7DaysData = () => {
        const data = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const displayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            // Count submissions for this date
            const count = submissions.filter(sub => {
                const subDate = new Date(sub.uploadedAt).toISOString().split('T')[0];
                return subDate === dateStr;
            }).length;
            
            data.push({
                date: displayDate,
                fullDate: dateStr,
                submissions: count,
            });
        }
        return data;
    };

    const data = generateLast7DaysData();
    const totalWeekSubmissions = data.reduce((sum, day) => sum + day.submissions, 0);

    return (
        <div className="glass-panel p-5 animate-fade-in-up stagger-1">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="text-lg">📈</span>
                    Activity (Last 7 Days)
                </h3>
                <span 
                    className="text-xs font-medium px-2 py-1 rounded-lg"
                    style={{ 
                        background: 'rgba(var(--color-accent-rgb),0.1)', 
                        color: 'var(--color-accent)' 
                    }}
                >
                    {totalWeekSubmissions} total
                </span>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="rgba(var(--color-accent-rgb),0.1)" 
                        />
                        <XAxis 
                            dataKey="date" 
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis 
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--text-primary)',
                            }}
                            labelStyle={{ color: 'var(--text-muted)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="submissions"
                            stroke="var(--color-accent)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#10b981' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActivityLineChart;
