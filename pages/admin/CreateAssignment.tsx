import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../../types';
import toast from 'react-hot-toast';
import { createAssignment, getSubjects } from '../../services/supabaseApi';


const CreateAssignment: React.FC = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        assignDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        description: '',
        status: 'active' as 'active' | 'inactive'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        try {
            const data = await getSubjects();
            setSubjects(data);
        } catch (error) {
            toast.error('Failed to load subjects');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.id.trim()) newErrors.id = 'Subject ID is required';
        else if (!/^[a-zA-Z0-9-_]{3,}$/.test(formData.id)) newErrors.id = 'Subject ID must be at least 3 alphanumeric characters (spaces not allowed)';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        else if (formData.title.length < 5 || formData.title.length > 100) newErrors.title = 'Title must be 5-100 characters';
        if (!formData.assignDate) newErrors.assignDate = 'Assign date is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        else if (formData.dueDate < formData.assignDate) newErrors.dueDate = 'Due date must be after assign date';
        if (formData.description.length > 500) newErrors.description = 'Description must be under 500 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSelectSubject = (subject: Subject) => {
        setSelectedSubject(subject);
        setFormData(prev => ({ ...prev, id: subject.id }));
        setIsSubjectDropdownOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            await createAssignment({
                subjectId: formData.id,
                title: formData.title,
                assignDate: formData.assignDate,
                dueDate: formData.dueDate,
                description: formData.description,
                status: formData.status,
                manualStatus: null,
            });
            toast.success('Assignment created successfully!');
            navigate('/admin');
        } catch (error) {
            toast.error('Failed to create assignment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-700 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
            <div className="glass-panel animate-fade-in-up rounded-2xl overflow-hidden">
                <div
                    className="px-4 sm:px-6 py-4 flex items-center justify-between"
                    style={{ background: 'var(--gradient-primary)' }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-2xl">📝</span>
                        Create Assignment
                    </h2>
                    <button
                        onClick={() => navigate('/admin')}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all min-w-[44px] min-h-[44px]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-5 space-y-5">
                    <div className="relative">
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Select Subject <span style={{ color: 'var(--accent-red)' }}>*</span>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                                className={`w-full input-modern pl-10 pr-10 text-left flex items-center justify-between ${errors.id ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            >
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🏷️</span>
                                <span className={selectedSubject ? '' : 'opacity-50'}>
                                    {selectedSubject ? `${selectedSubject.id} - ${selectedSubject.name}` : 'Choose a subject...'}
                                </span>
                                <svg
                                    className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isSubjectDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {isSubjectDropdownOpen && (
                            <div
                                className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden animate-fade-in"
                                style={{
                                    background: 'var(--glass)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    maxHeight: '250px',
                                    overflowY: 'auto'
                                }}
                            >
                                {subjects.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
                                        No subjects available. Create subjects first.
                                    </div>
                                ) : (
                                    subjects.map((subject, index) => (
                                        <button
                                            key={subject.id}
                                            type="button"
                                            onClick={() => handleSelectSubject(subject)}
                                            className="w-full px-4 py-3 text-left flex items-center gap-3 transition-all hover:scale-[1.01]"
                                            style={{
                                                borderBottom: index < subjects.length - 1 ? '1px solid var(--glass-border)' : 'none',
                                                background: selectedSubject?.id === subject.id ? 'rgba(var(--color-accent-rgb),0.15)' : 'transparent'
                                            }}
                                        >
                                            <span
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ background: subject.color || 'var(--color-accent)' }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <span className="font-medium text-sm block truncate" style={{ color: 'var(--text-primary)' }}>
                                                    {subject.id} - {subject.name}
                                                </span>
                                            </div>
                                            {selectedSubject?.id === subject.id && (
                                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent)' }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        )}

                        {errors.id && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.id}</p>}
                        <p className="text-xs mt-2 p-2 rounded-lg" style={{ background: 'rgba(var(--color-accent-rgb),0.08)', border: '1px solid rgba(var(--color-accent-rgb),0.15)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Folder: </span>
                            <span style={{ color: 'var(--color-accent)', fontFamily: 'monospace' }}>
                                {formData.id || 'SUBJECT'}/{formData.title ? `${formData.title.replace(/[^a-zA-Z0-9]/g, '_')}_${formData.assignDate || 'DATE'}` : 'Assignment_Title_Date'}/
                            </span>
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Assignment Title <span style={{ color: 'var(--accent-red)' }}>*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">📋</span>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleFormChange('title', e.target.value)}
                                placeholder="Enter assignment title"
                                className={`input-modern pl-10 ${errors.title ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.title && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.title}</p>}
                        <div className="flex justify-between mt-1">
                            <span></span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {formData.title.length}/100
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                Assign Date <span style={{ color: 'var(--accent-red)' }}>*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">📅</span>
                                <input
                                    type="date"
                                    value={formData.assignDate}
                                    onChange={(e) => handleFormChange('assignDate', e.target.value)}
                                    className={`input-modern pl-10 ${errors.assignDate ? 'border-red-500' : ''}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.assignDate && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.assignDate}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                Due Date <span style={{ color: 'var(--accent-red)' }}>*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">⏰</span>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => handleFormChange('dueDate', e.target.value)}
                                    className={`input-modern pl-10 ${errors.dueDate ? 'border-red-500' : ''}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.dueDate && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.dueDate}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Status
                        </label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => handleFormChange('status', 'active')}
                                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                    formData.status === 'active' ? 'btn-primary' : 'btn-ghost'
                                }`}
                                disabled={isSubmitting}
                            >
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                Active
                            </button>
                            <button
                                type="button"
                                onClick={() => handleFormChange('status', 'inactive')}
                                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                    formData.status === 'inactive' ? 'btn-primary' : 'btn-ghost'
                                }`}
                                disabled={isSubmitting}
                            >
                                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                Inactive
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Description / Instructions
                        </label>
                        <div className="relative">
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleFormChange('description', e.target.value)}
                                placeholder="Enter assignment instructions or description..."
                                rows={5}
                                className={`input-modern resize-none ${errors.description ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                                style={{ paddingTop: '12px' }}
                            />
                        </div>
                        {errors.description && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.description}</p>}
                        <div className="flex justify-between mt-1">
                            <span></span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {formData.description.length}/500
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="flex-1 btn-ghost py-3"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span>✨</span>
                                    Create Assignment
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignment;
