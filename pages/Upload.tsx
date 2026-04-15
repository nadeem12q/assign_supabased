import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import AssignmentSelector from '../components/AssignmentSelector';
import FileUploader from '../components/FileUploader';
import { getAssignments, getSubjects, getStudentSubmissions, submitAssignment } from '../services/supabaseApi';
import { Assignment, Submission, Subject } from '../types';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../utils/audio';
import Skeleton, { SkeletonCard } from '../components/Skeleton';

const Upload: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [existingSubmissions, setExistingSubmissions] = useState<Submission[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [assignmentsData, subjectsData] = await Promise.all([
          getAssignments(),
          getSubjects()
        ]);
        setAssignments(assignmentsData);
        setSubjects(subjectsData);

        // Load submissions for this student
        const subs = await getStudentSubmissions(user.uid);
        setExistingSubmissions(subs);

        const state = location.state as { assignmentId?: string } | null;
        if (state?.assignmentId) {
          const preSelected = assignmentsData.find(a => a.id === state.assignmentId);
          if (preSelected) {
            setSelectedAssignmentId(preSelected.id);
          }
        }
      } catch (err) {
        console.error("Failed to load data");
      } finally {
        setIsLoadingAssignments(false);
      }
    };
    fetchData();
  }, [location.state, user]);

  const isCurrentAssignmentSubmitted = () => {
    if (!selectedAssignmentId) return false;
    const currentAssignment = assignments.find(a => a.id === selectedAssignmentId);
    if (!currentAssignment) return false;
    return existingSubmissions.some(s =>
      s.assignmentTitle === currentAssignment.title &&
      s.subjectId === currentAssignment.subjectId
    );
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadStatus('idle');
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedAssignmentId || !user) return;

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStatus('idle');

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) return prev;
        if (prev >= 80) return prev + 1;
        return prev + 10;
      });
    }, 500);

    try {
      const selectedAssignment = assignments.find(a => a.id === selectedAssignmentId);
      if (!selectedAssignment) throw new Error("Assignment not found");

      if (isCurrentAssignmentSubmitted()) {
        toast.error("You have already submitted this assignment.");
        clearInterval(progressInterval);
        setIsUploading(false);
        return;
      }

      // Upload to Supabase Storage and create submission record
      // Note: uploadFile() handles file naming (prepends student name)
      const newSubmission = await submitAssignment(
        selectedFile,
        selectedAssignmentId,
        selectedAssignment.subjectId,
        user
      );

      setExistingSubmissions(prev => [...prev, newSubmission]);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      setSelectedFile(null);

      // Micro-interactions!
      playSuccessSound();
      toast.success('Assignment uploaded successfully!');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f472b6']
      });

      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus('idle');
      }, 3000);

    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      setUploadStatus('error');
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const submittedView = isCurrentAssignmentSubmitted();

  return (
    <div className="min-h-screen py-8 px-4 bg-theme-primary">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card-static animate-fade-in-up">

          {/* Header bar */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden rounded-t-3xl" style={{ background: 'var(--gradient-primary)' }}>
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1), transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            <div className="relative z-10">
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                Upload Assignment
              </h1>
              <p className="text-white/70 text-sm mt-1 ml-13">Welcome back, {user?.name} ✨</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {isLoadingAssignments ? (
              <div className="space-y-6">
                <Skeleton className="h-4 w-32 mb-2 bg-transparent border-none" pulse={false} />
                <Skeleton className="h-12 w-full mb-6" />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <>
                <AssignmentSelector
                  assignments={assignments}
                  subjects={subjects}
                  selectedId={selectedAssignmentId}
                  onSelect={setSelectedAssignmentId}
                  isLoading={isLoadingAssignments}
                  existingSubmissions={existingSubmissions}
                />

                <div className="my-6 border-t border-theme border-solid"></div>

                {submittedView ? (
                  <div className="text-center p-8 rounded-2xl animate-scale-in" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(16,185,129,0.15)' }}>
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: '#34d399' }}>Assignment Submitted! 🎉</h3>
                    <p className="mt-2 text-sm text-theme-secondary">
                      You have already uploaded a file for this assignment.
                    </p>
                    <p className="mt-4 text-xs text-theme-muted">
                      Uploaded the wrong file? <Link to="/support" className="font-medium hover:underline" style={{ color: 'var(--accent-blue)' }}>Contact Support</Link>
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-theme-primary">
                      <svg className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      Submit your work
                    </h3>

                    <FileUploader
                      onFileSelect={handleFileSelect}
                      maxSizeMB={50}
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      isUploading={isUploading}
                    />

                    {isUploading && (
                      <div className="mb-6 animate-fade-in">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--accent-blue)' }}>
                            <span className="inline-block animate-pulse mr-2">◉</span>
                            Uploading...
                          </span>
                          <span className="text-sm font-bold gradient-text">{uploadProgress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {uploadStatus === 'error' && (
                      <div className="mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-in" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.15)' }}>
                          <svg className="h-4 w-4" style={{ color: '#f87171' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#f87171' }}>Upload failed</p>
                          <p className="text-xs text-theme-muted">Please check permissions and try again.</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                      <button
                        onClick={handleUpload}
                        disabled={!selectedFile || !selectedAssignmentId || isUploading}
                        className="btn-primary text-base py-3 px-8"
                        style={{
                          opacity: (!selectedFile || !selectedAssignmentId || isUploading) ? 0.4 : 1,
                          cursor: (!selectedFile || !selectedAssignmentId || isUploading) ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Assignment
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;