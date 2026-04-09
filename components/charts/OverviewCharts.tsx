import React from 'react';
import SubmissionPieChart from './SubmissionPieChart';
import ActivityLineChart from './ActivityLineChart';
import StudentBarChart from './StudentBarChart';
import { Submission } from '../../types';

interface OverviewChartsProps {
    stats: {
        totalStudents: number;
        totalSubmissions: number;
    } | null;
    submissions: Submission[];
    progressData: Array<{
        subjectId: string;
        title: string;
        percentage: number;
        submittedCount: number;
        totalStudents: number;
    }>;
}

const OverviewCharts: React.FC<OverviewChartsProps> = ({ stats, submissions, progressData }) => {
    const submitted = stats?.totalSubmissions || 0;
    const total = stats?.totalStudents || 0;
    // Estimate missing (this is simplified - real logic would calculate per assignment)
    const missing = Math.max(0, (progressData.length * total) - submitted);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <SubmissionPieChart submitted={submitted} missing={missing} />
            <ActivityLineChart submissions={submissions} />
            <StudentBarChart progressData={progressData} />
        </div>
    );
};

export default OverviewCharts;
