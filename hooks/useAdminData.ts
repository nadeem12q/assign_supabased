import useSWR from 'swr';
import { AssignmentProgressItem, DashboardStats } from '../types';
import { getAssignments, getAllSubmissions, getAllUsers, getAllSubjects, getDashboardStats } from '../services/supabaseApi';

/**
 * Hook that manages all admin dashboard data fetching and state.
 * Refactored to use SWR for caching and `getDashboardStats` for optimized backend counting.
 */
export function useAdminData() {
    // SWR takes care of initial fetching and caching automatically.
    // revalidateOnFocus is set to false so it doesn't refetch on every window focus.
    const { data: statsData, isLoading: isLoadingStats, mutate: mutateStats } = useSWR('dashboardStats', getDashboardStats, { revalidateOnFocus: false });
    const { data: assignments = [], isLoading: isLoadingAssignments, mutate: mutateAssignments } = useSWR('assignments', getAssignments, { revalidateOnFocus: false });
    const { data: submissions = [], isLoading: isLoadingSubmissions, mutate: mutateSubmissions } = useSWR('submissions', getAllSubmissions, { revalidateOnFocus: false });
    const { data: students = [], isLoading: isLoadingStudents, mutate: mutateStudents } = useSWR('users', getAllUsers, { revalidateOnFocus: false });
    const { data: subjects = [], isLoading: isLoadingSubjects, mutate: mutateSubjects } = useSWR('subjects', getAllSubjects, { revalidateOnFocus: false });

    // The entire dashboard is loading if any core piece is loading
    const loading = isLoadingStats || isLoadingAssignments || isLoadingSubmissions || isLoadingStudents || isLoadingSubjects;

    let stats: DashboardStats | null = null;
    if (statsData) {
        stats = {
            totalStudents: statsData.totalStudents,
            totalSubmissions: statsData.totalSubmissions,
            activeAssignments: statsData.activeAssignments,
            submissionRate: assignments.length > 0 ? Math.round((statsData.totalSubmissions / assignments.length) * 100) : 0
        };
    }

    const progressData: AssignmentProgressItem[] = assignments.map(a => {
        const subs = submissions.filter(s => s.subjectId === a.subjectId && s.assignmentTitle === a.title);
        const submittedUsernames = new Set(subs.map(s => s.studentUsername));
        const studentList = students.filter(st => st.role === 'student');
        const missing = studentList.filter(st => !submittedUsernames.has(st.username));
        return {
            subjectId: a.subjectId,
            title: a.title,
            dueDate: a.dueDate,
            totalStudents: studentList.length || 1,
            submittedCount: subs.length,
            percentage: studentList.length > 0 ? Math.round((subs.length / studentList.length) * 100) : (subs.length > 0 ? 100 : 0),
            missingStudents: missing,
            submittedStudents: subs.map(s => s.studentName),
        };
    });

    const recentSubmissions = submissions;
    const rawStudents = students.filter(s => s.role === 'student');
    const rawAssignments = assignments;
    const rawSubmissions = submissions;

    // Functions to explicitly reload parts of the dashboard
    const loadDashboard = async () => {
        await Promise.all([
            mutateStats(),
            mutateAssignments(),
            mutateSubmissions(),
            mutateStudents()
        ]);
    };

    const loadSubjects = async () => {
        await mutateSubjects();
    };

    return {
        loading,
        stats,
        progressData,
        recentSubmissions,
        rawStudents,
        rawAssignments,
        rawSubmissions,
        subjects,
        loadDashboard,
        loadSubjects,
    };
}
