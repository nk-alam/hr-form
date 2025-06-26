import React, { useCallback, useState, useId } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud as CloudUpload, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  error?: string;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  error,
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  maxSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const uploadId = useId();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress with realistic timing
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsUploading(false);
            setUploadedFile(file);
            onFileChange(file);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 150);
    }
  }, [onFileChange]);

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div
              {...getRootProps()}
              className={`
                relative overflow-hidden cursor-pointer transition-all duration-300
                border-2 border-dashed rounded-2xl p-8 text-center
                ${isDragActive && !isDragReject 
                  ? 'border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-gold)]/5 scale-[1.02]' 
                  : isDragReject 
                  ? 'border-[var(--color-accent-red)] bg-red-50' 
                  : 'border-[var(--color-border)] bg-[var(--color-surface-variant)] hover:border-[var(--color-primary)] hover:bg-gradient-to-br hover:from-[var(--color-primary)]/5 hover:to-[var(--color-gold)]/5'
                }
              `}
              style={{
                background: isDragActive && !isDragReject 
                  ? 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(212, 160, 23, 0.05) 100%)'
                  : undefined
              }}
            >
              <input {...getInputProps()} id={uploadId} />
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-gold)]" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }} />
              </div>
              
              <motion.div
                animate={{
                  scale: isDragActive ? 1.1 : 1,
                  rotate: isDragActive ? 5 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <div className="mb-4">
                  <CloudUpload 
                    size={48} 
                    className={`mx-auto transition-colors duration-300 ${
                      isDragActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                  {isDragActive ? 'Drop your resume here' : 'Upload Resume'}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-4">
                  Drag & drop your resume here, or{' '}
                  <span className="text-[var(--color-primary)] font-medium underline">
                    click to browse
                  </span>
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 text-sm text-[var(--color-text-tertiary)]">
                  <span className="px-3 py-1 bg-[var(--color-surface)] rounded-full border">PDF</span>
                  <span className="px-3 py-1 bg-[var(--color-surface)] rounded-full border">DOC</span>
                  <span className="px-3 py-1 bg-[var(--color-surface)] rounded-full border">DOCX</span>
                  <span className="px-3 py-1 bg-[var(--color-surface)] rounded-full border">Max 5MB</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-green)] to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[var(--color-text)] truncate">
                  {uploadedFile.name}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {formatFileSize(uploadedFile.size)} • Uploaded successfully
                </p>
              </div>
              
              <button
                onClick={removeFile}
                className="flex-shrink-0 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-red)] hover:bg-red-50 rounded-lg transition-colors duration-200"
                aria-label="Remove file"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              Uploading... {Math.round(uploadProgress)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-[var(--color-accent-red)] flex-shrink-0" />
            <p className="text-sm text-[var(--color-accent-red)]">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};