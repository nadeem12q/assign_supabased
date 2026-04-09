import React, { useState } from 'react';
import { Assignment, Submission, Subject } from '../types';

interface AssignmentSelectorProps {
  assignments: Assignment[];
  subjects: Subject[];
  selectedId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
  existingSubmissions: Submission[];
}

const AssignmentSelector: React.FC<AssignmentSelectorProps> = ({ 
  assignments, 
  subjects,
  selectedId, 
  onSelect, 
  isLoading, 
  existingSubmissions 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isSubmitted = (assignment: Assignment) => {
    return existingSubmissions.some(s =>
      s.subjectId === assignment.subjectId && s.assignmentTitle === assignment.title
    );
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.color || 'var(--color-accent)';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || subjectId;
  };

  const selectedAssignment = assignments.find(a => a.id === selectedId);

  return (
    <div className="mb-6 animate-fade-in-up relative z-[60]">
      <label className="block text-sm font-semibold mb-3 text-theme-secondary">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Select Assignment
        </span>
      </label>

      {/* Custom Glassmorphic Dropdown */}
      <div className="relative z-50">
        <button
          type="button"
          onClick={() => !isLoading && setIsOpen(!isOpen)}
          className="select-modern w-full text-left flex items-center justify-between"
          disabled={isLoading}
        >
          <span className="flex items-center gap-3">
            {selectedAssignment ? (
              <>
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: getSubjectColor(selectedAssignment.subjectId) }}
                />
                <span className="truncate">
                  {selectedAssignment.title}
                  {isSubmitted(selectedAssignment) && (
                    <span className="ml-2 text-xs" style={{ color: '#10b981' }}>✅ Submitted</span>
                  )}
                </span>
              </>
            ) : (
              <span className="opacity-50">-- Choose an assignment --</span>
            )}
          </span>
          <svg 
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu - Opaque Background */}
        {isOpen && (
          <div 
            className="absolute z-[100] w-full mt-2 rounded-xl overflow-hidden animate-fade-in"
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              maxHeight: '300px',
              overflowY: 'auto'
            }}
          >
            {assignments.length === 0 ? (
              <div className="px-4 py-3 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
                No assignments available
              </div>
            ) : (
              assignments.map((assignment, index) => {
                const submitted = isSubmitted(assignment);
                const subjectColor = getSubjectColor(assignment.subjectId);
                const subjectName = getSubjectName(assignment.subjectId);
                const isSelected = selectedId === assignment.id;

                return (
                  <button
                    key={assignment.id}
                    type="button"
                    onClick={() => {
                      onSelect(assignment.id);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left transition-all hover:scale-[1.01]"
                    style={{
                      borderBottom: index < assignments.length - 1 ? '1px solid var(--glass-border)' : 'none',
                      background: isSelected ? 'rgba(var(--color-accent-rgb),0.15)' : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Subject Color Dot */}
                      <span 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: subjectColor }}
                      />
                      
                      {/* Assignment Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                            {subjectName}: {assignment.title}
                          </span>
                          {submitted && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                              ✅ Submitted
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                      </div>

                      {/* Checkmark for selected */}
                      {isSelected && (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-y-0 right-10 flex items-center">
            <svg className="animate-spin h-5 w-5" style={{ color: 'var(--accent-blue)' }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Selected Assignment Info */}
      {selectedAssignment && (
        <div className="mt-4 p-4 rounded-xl animate-fade-in-down" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="flex items-start gap-3">
            <span 
              className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: getSubjectColor(selectedAssignment.subjectId) }}
            />
            <div className="flex-1">
              <h4 className="text-sm font-bold" style={{ color: 'var(--accent-blue)' }}>
                {selectedAssignment.title}
              </h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Subject: {getSubjectName(selectedAssignment.subjectId)} • Due: {selectedAssignment.dueDate}
              </p>
              <p className="text-sm mt-2 whitespace-pre-wrap text-theme-secondary">
                {selectedAssignment.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentSelector;