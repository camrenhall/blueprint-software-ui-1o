import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { 
  validateFiles, 
  formatFileSize, 
  getFileTypeIcon, 
  getFileTypeColor,
  generateFileId,
  simulateUpload,
  MAX_FILES,
  ALLOWED_EXTENSIONS,
  type FileValidationError 
} from "@/lib/uploadUtils";
import { X, Upload, FileText, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function ClientUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationErrors, setValidationErrors] = useState<FileValidationError[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const session = localStorage.getItem('clientSession');
    if (!session) {
      navigate('/client/login');
    }
  }, [navigate]);

  const handleFileSelect = (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const existingFiles = files.map(f => f.file);
    const validation = validateFiles(fileArray, existingFiles);
    
    setValidationErrors(validation.errors);
    
    if (validation.validFiles.length > 0) {
      const newFiles: UploadedFile[] = validation.validFiles.map(file => ({
        id: generateFileId(),
        file,
        progress: 0,
        status: 'uploading' as const
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Start upload simulation for each new file
      newFiles.forEach(uploadFile => {
        simulateUpload(uploadFile.file, (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, progress } : f
          ));
        }).then(() => {
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, status: 'completed', progress: 100 } : f
          ));
        }).catch(() => {
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, status: 'error', error: 'Upload failed' } : f
          ));
        });
      });
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setValidationErrors(prev => prev.filter(error => {
      const fileToRemove = files.find(f => f.id === fileId);
      return fileToRemove ? error.file !== fileToRemove.file : true;
    }));
  };

  const retryFile = (fileId: string) => {
    const fileToRetry = files.find(f => f.id === fileId);
    if (fileToRetry) {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
      ));
      
      simulateUpload(fileToRetry.file, (progress) => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }).then(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
        ));
      }).catch(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'error', error: 'Upload failed' } : f
        ));
      });
    }
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const uploadingFiles = files.filter(f => f.status === 'uploading');
  const errorFiles = files.filter(f => f.status === 'error');
  const canProceed = completedFiles.length > 0 && uploadingFiles.length === 0;

  const handleProceed = () => {
    // Store uploaded files info for confirmation page
    const uploadedFilesData = completedFiles.map(f => ({
      name: f.file.name,
      size: f.file.size,
      type: f.file.type
    }));
    
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFilesData));
    navigate('/client/confirmation');
  };

  return (
    <PageContainer variant="fullscreen" glassIntensity="light" className="p-4 sm:p-6 lg:p-8 h-screen overflow-hidden">
      <div
        className={`max-w-4xl mx-auto h-full flex flex-col transition-all duration-1000 ease-out ${
          isAnimated
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6 flex-shrink-0">
          <h1 className="text-3xl sm:text-4xl font-light text-[#0E315C] mb-4 tracking-wide">
            Upload Your Documents
          </h1>
          <p className="text-[#0E315C]/70 text-lg mb-2">
            Securely upload your legal documents for review
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-[#0E315C]/60">
            <span>Max {MAX_FILES} files</span>
            <span>•</span>
            <span>PDF, PNG, JPG, DOC, DOCX</span>
            <span>•</span>
            <span>50MB per file</span>
          </div>
        </div>

        <div className="flex-1 grid gap-4 lg:gap-6 overflow-hidden">
          {/* Upload Area */}
          <GlassPanel variant="enhanced" radius="lg" className="p-6 sm:p-8">
            <div
              className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 p-6 sm:p-8 text-center ${
                isDragOver
                  ? "border-[#99C0F0] bg-[#99C0F0]/10"
                  : files.length > 0
                  ? "border-[#C1D9F6]/40 bg-white/20"
                  : "border-[#C1D9F6]/60 bg-white/30 hover:border-[#99C0F0] hover:bg-[#99C0F0]/5"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full transition-all duration-300 ${
                    isDragOver ? "bg-[#99C0F0]/20" : "bg-[#C1D9F6]/20"
                  }`}>
                    <Upload className={`w-6 h-6 transition-colors duration-300 ${
                      isDragOver ? "text-[#99C0F0]" : "text-[#0E315C]/60"
                    }`} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0E315C] mb-1">
                    {isDragOver ? "Drop files here" : "Drag & drop your files here"}
                  </h3>
                  <p className="text-[#0E315C]/60 mb-3 text-sm">
                    Or click to browse and select files
                  </p>
                </div>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#99C0F0]/90 hover:to-[#C5BFEE]/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Browse Files
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ALLOWED_EXTENSIONS.join(',')}
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          </GlassPanel>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <GlassPanel variant="light" radius="lg" className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="font-medium">Upload Issues</h4>
                </div>
                {validationErrors.map((error, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50/50 rounded-lg border border-red-200/50">
                    <div className="flex-shrink-0 text-red-500 mt-0.5">
                      {getFileTypeIcon(error.file.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-red-800 truncate">
                        {error.file.name}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        {error.error}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          )}

          {/* File List */}
          {files.length > 0 && (
            <GlassPanel variant="heavy" radius="lg" className="p-6 flex-1 min-h-0">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[#0E315C] flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Uploaded Files ({files.length}/{MAX_FILES})</span>
                  </h3>
                  {completedFiles.length > 0 && (
                    <div className="text-sm text-[#0E315C]/60">
                      {completedFiles.length} completed
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto document-scroll">
                  {files.map((uploadFile) => (
                    <div
                      key={uploadFile.id}
                      className="flex items-center space-x-3 p-3 bg-white/30 rounded-lg border border-white/20"
                    >
                      {/* File Icon */}
                      <div className="flex-shrink-0 text-lg">
                        {getFileTypeIcon(uploadFile.file.name)}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-3">
                          <p className="text-sm font-medium text-[#0E315C] truncate">
                            {uploadFile.file.name}
                          </p>
                          {/* Progress Bar - inline for uploading status */}
                          {uploadFile.status === 'uploading' && (
                            <div className="w-full bg-[#C1D9F6]/30 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadFile.progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* File Size */}
                        <div className="flex items-center space-x-2 text-xs text-[#0E315C]/60">
                          <span>{formatFileSize(uploadFile.file.size)}</span>
                        </div>

                        {/* Status Messages - compact */}
                        <div className="flex items-center space-x-2 ml-3">
                          {uploadFile.status === 'completed' && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle2 className="w-3 h-3" />
                              <span className="text-xs">Done</span>
                            </div>
                          )}

                          {uploadFile.status === 'error' && (
                            <div className="flex items-center space-x-1 text-red-600">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-xs">Error</span>
                            </div>
                          )}

                          {uploadFile.status === 'uploading' && (
                            <span className="text-xs text-[#99C0F0]">{uploadFile.progress}%</span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-2">
                        {uploadFile.status === 'error' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => retryFile(uploadFile.id)}
                            className="h-6 w-6 p-0 text-[#99C0F0] hover:text-[#0E315C] hover:bg-[#99C0F0]/10"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(uploadFile.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          )}

          {/* Action Buttons */}
          {files.length > 0 && (
            <div className="flex items-center justify-between flex-shrink-0 mt-4">
              <div className="text-sm text-[#0E315C]/60">
                {uploadingFiles.length > 0 && (
                  <span>Uploading {uploadingFiles.length} file(s)...</span>
                )}
                {errorFiles.length > 0 && (
                  <span className="text-red-600">
                    {errorFiles.length} file(s) failed to upload
                  </span>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setValidationErrors([]);
                  }}
                  className="border-[#C1D9F6] text-[#0E315C] hover:bg-[#C1D9F6]/10"
                >
                  Clear All
                </Button>
                
                <Button
                  onClick={handleProceed}
                  disabled={!canProceed}
                  className={`px-8 py-2 rounded-xl font-medium transition-all duration-300 ${
                    canProceed
                      ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue to Review
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
