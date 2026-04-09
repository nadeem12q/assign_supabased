import React, { useEffect, useState } from 'react';
import { User } from '../types';
import Skeleton, { SkeletonCard, SkeletonStat } from '../components/Skeleton';
import toast from 'react-hot-toast';

// Admin components
import DashboardStats from '../components/admin/DashboardStats';
import AssignmentProgress from '../components/admin/AssignmentProgress';
import RecentSubmissions from '../components/admin/RecentSubmissions';
import SearchSection from '../components/admin/SearchSection';
import SearchResults, { SearchResultData } from '../components/admin/SearchResults';
import QuickActions from '../components/admin/QuickActions';
import TabNavigation, { TabId } from '../components/admin/TabNavigation';
import StudentsTable from '../components/admin/StudentsTable';
import OverviewCharts from '../components/charts/OverviewCharts';

// Hooks
import { useAdminData } from '../hooks/useAdminData';

const Admin: React.FC = () => {
    const {
        loading, stats, progressData, recentSubmissions,
        rawStudents, rawAssignments, rawSubmissions,
        loadDashboard,
    } = useAdminData();

    // Tab & search — local UI state (fine to keep in page)
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [searchType, setSearchType] = useState<'subject' | 'student'>('subject');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResultData | null>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [expandedAssignments, setExpandedAssignments] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => setStatusMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    useEffect(() => {
        if (activeTab === 'students') setSearchType('student');
        if (activeTab === 'assignments') setSearchType('subject');
    }, [activeTab]);

    // Search
    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        if (searchType === 'subject') {
            const filtered = progressData.filter(p => p.subjectId.toLowerCase().includes(searchQuery.toLowerCase()));
            setSearchResult({ type: 'subject', data: filtered });
        } else {
            const foundStudents = rawStudents.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (foundStudents.length === 0) {
                setSearchResult({ type: 'student', data: [] });
            } else {
                const studentsWithHistory = foundStudents.map(student => {
                    const studentSubs = rawSubmissions.filter(sub => sub.studentUsername === student.username);
                    return { ...student, submissions: studentSubs };
                });
                setSearchResult({ type: 'student', data: studentsWithHistory });
            }
        }
    };

    const clearSearch = () => { setSearchQuery(''); setSearchResult(null); };

    const toggleAssignmentExpand = (key: string) => {
        setExpandedAssignments(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
    };

    const handleSendSingleReminder = (student: User, _subjectId: string, _assignmentTitle: string, _dueDate: string) => {
        if (!student.phone) { alert(`${student.name} ka phone number nahi hai.`); return; }
        setStatusMessage(`📱 UI Mode: Reminder simulated for ${student.name}`);
    };

    const handleToggleAssignmentStatus = async (assignmentId: string) => {
        try {
            const { toggleAssignmentStatus } = await import('../services/supabaseApi');
            const updated = await toggleAssignmentStatus(assignmentId);
            if (updated) {
                toast.success(`Assignment ${updated.manualStatus === 'active' ? 'activated' : 'deactivated'}!`);
                await loadDashboard();
            }
        } catch (error) {
            toast.error('Failed to toggle status. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <SkeletonStat /><SkeletonStat /><SkeletonStat /><SkeletonStat />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6"><SkeletonCard /><SkeletonCard /></div>
                    <div className="lg:col-span-1 space-y-6"><SkeletonCard /></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Hero Header */}
            <div className="admin-hero mb-8 animate-fade-in-up">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
                                📊
                            </div>
                            Admin Dashboard
                        </h1>
                        <p className="text-white/70 text-sm mt-2 ml-14">
                            Welcome back, Admin • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {statusMessage && (
                            <span className="inline-block text-white/90 text-sm px-4 py-2 rounded-xl font-medium" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                                {statusMessage}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <SearchSection
                searchType={searchType}
                setSearchType={setSearchType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                onClear={clearSearch}
                hasResults={!!searchResult}
            />

            {/* Search Results or Main Dashboard */}
            {searchResult ? (
                <SearchResults
                    searchQuery={searchQuery}
                    searchResult={searchResult}
                    rawAssignments={rawAssignments}
                    onClear={clearSearch}
                />
            ) : (
                <>
                    {/* Tab Navigation */}
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <>
                            <DashboardStats stats={stats} />
                            <OverviewCharts
                                stats={stats}
                                submissions={recentSubmissions}
                                progressData={progressData}
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                                <div className="lg:col-span-2">
                                    <RecentSubmissions submissions={recentSubmissions} />
                                </div>
                                <div className="space-y-6">
                                    <QuickActions />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'assignments' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            <div className="lg:col-span-2">
                                <AssignmentProgress
                                    progressData={progressData}
                                    rawAssignments={rawAssignments}
                                    expandedAssignments={expandedAssignments}
                                    onToggleExpand={toggleAssignmentExpand}
                                    onSendReminder={handleSendSingleReminder}
                                    onToggleStatus={handleToggleAssignmentStatus}
                                />
                            </div>
                            <div className="space-y-6">
                                <QuickActions />
                            </div>
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <StudentsTable
                            students={rawStudents}
                            submissions={rawSubmissions}
                            assignments={rawAssignments}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Admin;
