import React from 'react';

interface SearchSectionProps {
    searchType: 'subject' | 'student';
    setSearchType: (type: 'subject' | 'student') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
    onClear: () => void;
    hasResults: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
    searchType,
    setSearchType,
    searchQuery,
    setSearchQuery,
    onSearch,
    onClear,
    hasResults,
}) => {
    return (
        <div className="glass-panel p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 animate-fade-in-up stagger-1">
            <div className="flex flex-col gap-3 w-full">
                {/* Segmented Toggle - Full width on mobile */}
                <div className="search-toggle flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                    <button
                        className={`search-toggle-btn flex-1 sm:flex-initial ${searchType === 'subject' ? 'active' : ''}`}
                        onClick={() => setSearchType('subject')}
                    >
                        📚 Subject
                    </button>
                    <button
                        className={`search-toggle-btn flex-1 sm:flex-initial ${searchType === 'student' ? 'active' : ''}`}
                        onClick={() => setSearchType('student')}
                    >
                        👤 Student
                    </button>
                </div>

                {/* Search Input - Stacked on mobile, row on larger screens */}
                <div className="flex flex-col sm:flex-row w-full gap-2">
                    <div className="flex-1 relative min-w-0">
                        <svg 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex-shrink-0" 
                            style={{ color: 'var(--text-muted)' }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                            placeholder={searchType === 'subject' 
                                ? "Search by Subject ID..." 
                                : "Search by Student Name..."
                            }
                            className="input-modern pl-10 w-full"
                        />
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <button 
                            onClick={onSearch} 
                            className="btn-primary text-sm px-4 sm:px-5 flex-1 sm:flex-initial min-h-[44px]"
                        >
                            Search
                        </button>
                        {hasResults && (
                            <button 
                                onClick={onClear} 
                                className="btn-ghost text-sm px-3 sm:px-4 flex-shrink-0 min-h-[44px]"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
