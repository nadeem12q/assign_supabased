import React from 'react';

type TabId = 'overview' | 'assignments' | 'students';

interface Tab {
    id: TabId;
    label: string;
    icon: string;
}

interface TabNavigationProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

const TABS: Tab[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'students', label: 'Students', icon: '👥' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="glass-panel p-2 mb-6 sm:mb-8 animate-fade-in-up">
            <div className="flex flex-wrap gap-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'text-white'
                                : 'text-theme-secondary hover:text-theme-primary'
                        }`}
                        style={{
                            background: activeTab === tab.id 
                                ? 'var(--gradient-primary)' 
                                : 'transparent',
                            transform: activeTab === tab.id ? 'scale(1.02)' : 'scale(1)',
                        }}
                    >
                        <span>{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;
export type { TabId };
