import React, { useRef, useState } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  maxSizeMB: number;
  accept: string;
  isUploading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, maxSizeMB, accept, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="mb-6 animate-fade-in-up stagger-2">
      <div
        className={`drop-zone relative flex flex-col items-center justify-center w-full h-64 cursor-pointer transition-all duration-300
          ${dragActive ? 'active' : ''}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? onButtonClick : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center text-center relative z-10 px-6">
          {fileName ? (
            <>
              {/* Success state */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 animate-bounce-in" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <svg className="w-8 h-8" fill="none" stroke="#34d399" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-semibold mb-1 text-theme-primary">{fileName}</p>
              <p className="text-xs" style={{ color: 'var(--accent-green)' }}>✨ Ready to upload</p>
            </>
          ) : (
            <>
              {/* Empty state */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all" style={{
                background: dragActive ? 'rgba(59,130,246,0.15)' : 'var(--glass)',
                border: `1px solid ${dragActive ? 'rgba(59,130,246,0.3)' : 'var(--glass-border)'}`,
              }}>
                <svg className="w-8 h-8 transition-colors" style={{ color: dragActive ? 'var(--accent-blue)' : 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm mb-1 text-theme-secondary">
                <span className="font-semibold" style={{ color: 'var(--accent-blue)' }}>Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-theme-muted">PDF, DOC, PPT up to {maxSizeMB}MB</p>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl animate-fade-in" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#f87171' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm" style={{ color: '#f87171' }}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;