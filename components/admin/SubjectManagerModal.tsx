import React, { useState } from 'react';
import { Subject } from '../../types';
import toast from 'react-hot-toast';
import { createSubject, deleteSubject } from '../../services/supabaseApi';

interface SubjectManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    subjects: Subject[];
    onSubjectsChanged: () => void;
}

const COLORS = ['#8b5cf6', '#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#ec4899'];

const SubjectManagerModal: React.FC<SubjectManagerModalProps> = ({
    isOpen,
    onClose,
    subjects,
    onSubjectsChanged,
}) => {
    // Local form state — owned by the modal, not the parent
    const [subjectFormData, setSubjectFormData] = useState({
        id: '',
        name: '',
        color: '#8b5cf6'
    });
    const [subjectErrors, setSubjectErrors] = useState<Record<string, string>>({});
    const [isSubjectSubmitting, setIsSubjectSubmitting] = useState(false);

    const handleFormChange = (field: string, value: string) => {
        setSubjectFormData(prev => ({ ...prev, [field]: value }));
        if (subjectErrors[field]) setSubjectErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateSubjectForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!subjectFormData.id.trim()) newErrors.id = 'Subject ID is required';
        else if (!/^[a-zA-Z0-9-_]{3,10}$/.test(subjectFormData.id)) newErrors.id = 'Subject ID must be 3-10 alphanumeric characters';
        if (!subjectFormData.name.trim()) newErrors.name = 'Subject name is required';
        else if (subjectFormData.name.length < 3 || subjectFormData.name.length > 50) newErrors.name = 'Subject name must be 3-50 characters';
        setSubjectErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateSubjectForm()) return;
        setIsSubjectSubmitting(true);
        try {
            await createSubject({
                id: subjectFormData.id.toUpperCase(),
                name: subjectFormData.name,
                color: subjectFormData.color
            });
            toast.success('Subject created successfully!');
            setSubjectFormData({ id: '', name: '', color: '#8b5cf6' });
            onSubjectsChanged();
        } catch (error: any) {
            toast.error(error.message || 'Failed to create subject. Please try again.');
        } finally {
            setIsSubjectSubmitting(false);
        }
    };

    const handleDeleteSubject = async (subjectId: string) => {
        if (!confirm(`Are you sure you want to delete subject "${subjectId}"?`)) return;
        try {
            await deleteSubject(subjectId);
            toast.success('Subject deleted successfully!');
            onSubjectsChanged();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete subject. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="glass-panel animate-scale-in w-full max-w-lg mx-2 sm:mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                {/* Modal Header */}
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'var(--gradient-primary)' }}
                >
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        Manage Subjects
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Existing Subjects List */}
                    <div>
                        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                            Active Subjects ({subjects.length})
                        </h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {subjects.length === 0 ? (
                                <div className="text-center py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                                    No subjects yet. Add your first subject below.
                                </div>
                            ) : (
                                subjects.map((subject) => (
                                    <div
                                        key={subject.id}
                                        className="flex items-center justify-between p-3 rounded-xl"
                                        style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{ background: subject.color || 'var(--color-accent)' }}
                                            />
                                            <div>
                                                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                                    {subject.id}
                                                </span>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                    {subject.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteSubject(subject.id)}
                                            className="p-3 rounded-xl transition-all hover:bg-red-500/20 hover:text-red-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                            style={{ color: 'var(--text-muted)' }}
                                            title="Delete subject"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Add New Subject Form */}
                    <div style={{ borderTop: '1px solid var(--glass-border)' }} className="pt-4">
                        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                            Add New Subject
                        </h3>
                        <form onSubmit={handleCreateSubject} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                                        Subject ID *
                                    </label>
                                    <input
                                        type="text"
                                        value={subjectFormData.id}
                                        onChange={(e) => handleFormChange('id', e.target.value.toUpperCase())}
                                        placeholder="e.g., CS101"
                                        className={`input-modern text-sm ${subjectErrors.id ? 'border-red-500' : ''}`}
                                        disabled={isSubjectSubmitting}
                                    />
                                    {subjectErrors.id && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{subjectErrors.id}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                                        Color
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => handleFormChange('color', color)}
                                                className={`w-10 h-10 rounded-full transition-all min-w-[44px] min-h-[44px] ${subjectFormData.color === color ? 'ring-2 ring-white scale-110' : 'hover:scale-105'}`}
                                                style={{ background: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                                    Subject Name *
                                </label>
                                <input
                                    type="text"
                                    value={subjectFormData.name}
                                    onChange={(e) => handleFormChange('name', e.target.value)}
                                    placeholder="e.g., Data Structures"
                                    className={`input-modern text-sm ${subjectErrors.name ? 'border-red-500' : ''}`}
                                    disabled={isSubjectSubmitting}
                                />
                                {subjectErrors.name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{subjectErrors.name}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 text-sm"
                                disabled={isSubjectSubmitting}
                            >
                                {isSubjectSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <span>➕</span>
                                        Add Subject
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubjectManagerModal;
