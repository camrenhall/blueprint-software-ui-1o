import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { 
  validateFiles, 
  formatFileSize, 
  getFileTypeIcon, 
  generateFileId,
  simulateUpload,
  ALLOWED_EXTENSIONS,
  type FileValidationError 
} from "@/lib/uploadUtils";
import { 
  X, Upload, FileText, AlertCircle, CheckCircle2, RotateCcw, 
  User, Plus, Trash2, ArrowRight, Cloud, Folder, Settings
} from "lucide-react";

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
  const [isAnimated, setIsAnimated] = useState(false);
  const [clientEmail, setClientEmail] = useState('');

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user is authenticated and get email
  useEffect(() => {
    const session = localStorage.getItem('clientSession');
    if (!session) {
      navigate('/client/login');
    } else {
      try {
        const sessionData = JSON.parse(session);
        setClientEmail(sessionData.email || '');
      } catch (error) {
        console.error('Failed to parse session data:', error);
        navigate('/client/login');
      }
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
    const uploadedFilesData = completedFiles.map(f => ({
      name: f.file.name,
      size: f.file.size,
      type: f.file.type
    }));
    
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFilesData));
    navigate('/client/confirmation');
  };

  const clearAllFiles = () => {
    setFiles([]);
    setValidationErrors([]);
  };

  return (
    <PageContainer variant="fullscreen" glassIntensity="light" className="p-6 h-screen overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ease-out ${
          isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-[#0E315C]">Document Upload Portal</h1>
              <p className="text-sm text-[#0E315C]/60">Secure document submission for legal review</p>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-[#0E315C]/40" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 h-full">
            {/* Left Sidebar */}
            <div className="col-span-1 space-y-4">
              {/* User Info */}
              <GlassPanel variant="light" radius="lg" className="p-4">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-full flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0E315C] text-sm">{clientEmail}</h3>
                    <p className="text-xs text-[#0E315C]/60">Client Portal</p>
                  </div>
                </div>
              </GlassPanel>

            {/* Quick Stats */}
            <GlassPanel variant="enhanced" radius="lg" className="p-4">
              <h3 className="font-medium text-[#0E315C] mb-3 text-sm">Upload Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#99C0F0]" />
                    <span className="text-sm text-[#0E315C]">Total</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0E315C]">{files.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#0E315C]">Ready</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0E315C]">{completedFiles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-4 h-4 text-[#C5BFEE]" />
                    <span className="text-sm text-[#0E315C]">Processing</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0E315C]">{uploadingFiles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-[#0E315C]">Errors</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0E315C]">{errorFiles.length}</span>
                </div>
              </div>
            </GlassPanel>

            </div>

            {/* Main Content */}
            <div className="col-span-3 space-y-6">

            {/* Upload Area */}
            <GlassPanel variant="enhanced" radius="lg" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#0E315C]">Document Upload</h3>
                <div className="text-sm text-[#0E315C]/60">
                  Supports: PDF, PNG, JPG, DOC, DOCX
                </div>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-xl h-32 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isDragOver ? "border-[#99C0F0] bg-[#99C0F0]/10" : "border-[#C1D9F6]/60 bg-white/20 hover:border-[#99C0F0] hover:bg-[#99C0F0]/5"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full ${isDragOver ? "bg-[#99C0F0]/20" : "bg-[#C1D9F6]/20"}`}>
                      <Upload className={`w-6 h-6 ${isDragOver ? "text-[#99C0F0]" : "text-[#0E315C]/60"}`} />
                    </div>
                  </div>
                  <h4 className="font-medium text-[#0E315C] mb-1">
                    {isDragOver ? "Drop your files here" : "Drag & drop files or browse"}
                  </h4>
                  <p className="text-xs text-[#0E315C]/60">Maximum 50MB per file</p>
                </div>
              </div>
            </GlassPanel>

            {/* File List */}
            <GlassPanel variant="heavy" radius="lg" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#0E315C] flex items-center space-x-2">
                  <Folder className="w-5 h-5" />
                  <span>Document Library ({files.length})</span>
                </h3>
              </div>

              {/* Constrained Document List */}
              <div className="h-[300px] overflow-hidden">
                {files.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Folder className="w-20 h-20 text-[#C1D9F6] mx-auto" />
                      <div>
                        <h4 className="text-xl font-medium text-[#0E315C]/60 mb-2">No documents uploaded</h4>
                        <p className="text-sm text-[#0E315C]/50 mb-4">
                          Upload your first document to get started with the review process
                        </p>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white px-6 py-2 rounded-lg"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Upload Files
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto pr-2 document-scroll">
                    <div className="space-y-3">
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center space-x-4 p-4 bg-white/30 rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                          <div className="flex-shrink-0">{getFileTypeIconSvg(file.file.name)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-[#0E315C] truncate">{file.file.name}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-[#0E315C]/60">{formatFileSize(file.file.size)}</span>
                                {file.status === 'completed' && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#99C0F0]/20 text-[#0E315C] border border-[#99C0F0]/30">
                                    <CheckCircle2 className="w-3 h-3 mr-1 text-[#99C0F0]" />
                                    Complete
                                  </span>
                                )}
                                {file.status === 'error' && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Error
                                  </span>
                                )}
                                {file.status === 'uploading' && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                    <Cloud className="w-3 h-3 mr-1" />
                                    {file.progress}%
                                  </span>
                                )}
                              </div>
                            </div>
                            {file.status === 'uploading' && (
                              <div className="w-full bg-[#C1D9F6]/30 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {file.status === 'error' && (
                              <Button size="sm" variant="ghost" onClick={() => retryFile(file.id)} className="h-8 w-8 p-0">
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)} className="h-8 w-8 p-0 text-red-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassPanel>

            {/* Action Buttons - Outside the Document Library */}
            <GlassPanel variant="light" radius="lg" className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-[#0E315C]/60">
                  {uploadingFiles.length > 0 && <span>Uploading {uploadingFiles.length} file(s)...</span>}
                  {errorFiles.length > 0 && <span className="text-red-600">{errorFiles.length} file(s) failed</span>}
                  {files.length === 0 && <span>No files selected</span>}
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={clearAllFiles}
                    disabled={files.length === 0}
                    className={files.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button
                    onClick={handleProceed}
                    disabled={!canProceed}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                      canProceed
                        ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Submit Documents
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
                        <p className="text-sm font-medium text-red-800 truncate">{error.file.name}</p>
                        <p className="text-xs text-red-600 mt-1">{error.error}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_EXTENSIONS.join(',')}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>
    </PageContainer>
  );
}
