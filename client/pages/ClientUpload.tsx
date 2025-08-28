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
import { 
  X, Upload, FileText, AlertCircle, CheckCircle2, RotateCcw, 
  Grid3X3, List, Layout, User, Plus, Trash2, ArrowRight,
  Cloud, Folder, Settings
} from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

type LayoutType = 'horizontal' | 'compact' | 'dashboard';

export default function ClientUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationErrors, setValidationErrors] = useState<FileValidationError[]>([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('horizontal');

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

  // Layout Picker Component
  const LayoutPicker = () => (
    <div className="fixed top-4 right-4 z-50">
      <GlassPanel variant="light" radius="md" className="p-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-[#0E315C]/70">Layout:</span>
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={currentLayout === 'horizontal' ? 'default' : 'ghost'}
              onClick={() => setCurrentLayout('horizontal')}
              className="h-7 w-7 p-0"
            >
              <Grid3X3 className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={currentLayout === 'compact' ? 'default' : 'ghost'}
              onClick={() => setCurrentLayout('compact')}
              className="h-7 w-7 p-0"
            >
              <List className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={currentLayout === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentLayout('dashboard')}
              className="h-7 w-7 p-0"
            >
              <Layout className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );

  // Layout 1: Horizontal Split
  const HorizontalLayout = () => (
    <div className="h-full grid grid-cols-2 gap-6">
      {/* Left: Upload Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#0E315C]">Upload Documents</h2>
          <div className="flex items-center space-x-2 text-sm text-[#0E315C]/60">
            <User className="w-4 h-4" />
            <span>{clientEmail}</span>
          </div>
        </div>

        <GlassPanel variant="enhanced" radius="lg" className="p-8 h-96">
          <div
            className={`relative border-2 border-dashed rounded-2xl h-full transition-all duration-300 flex items-center justify-center ${
              isDragOver
                ? "border-[#99C0F0] bg-[#99C0F0]/10"
                : "border-[#C1D9F6]/60 bg-white/30 hover:border-[#99C0F0] hover:bg-[#99C0F0]/5"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`p-6 rounded-full transition-all duration-300 ${
                  isDragOver ? "bg-[#99C0F0]/20" : "bg-[#C1D9F6]/20"
                }`}>
                  <Upload className={`w-12 h-12 transition-colors duration-300 ${
                    isDragOver ? "text-[#99C0F0]" : "text-[#0E315C]/60"
                  }`} />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-[#0E315C] mb-2">
                  {isDragOver ? "Drop your files here" : "Drag & drop files"}
                </h3>
                <p className="text-[#0E315C]/60 mb-4">
                  Support for PDF, PNG, JPG, DOC, DOCX (50MB max)
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white px-6 py-3 rounded-xl"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        </GlassPanel>

        {validationErrors.length > 0 && (
          <GlassPanel variant="light" radius="lg" className="p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Upload Issues</span>
              </div>
              {validationErrors.map((error, index) => (
                <div key={index} className="text-xs text-red-600 bg-red-50/50 p-2 rounded">
                  {error.file.name}: {error.error}
                </div>
              ))}
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Right: File List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#0E315C]">Your Files ({files.length})</h2>
          {files.length > 0 && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="sm"
              variant="outline"
              className="border-[#99C0F0] text-[#99C0F0]"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add More
            </Button>
          )}
        </div>

        <GlassPanel variant="heavy" radius="lg" className="p-6 h-96">
          {files.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div className="space-y-3">
                <FileText className="w-16 h-16 text-[#C1D9F6] mx-auto" />
                <div>
                  <h4 className="text-lg font-medium text-[#0E315C]/60">No files uploaded</h4>
                  <p className="text-sm text-[#0E315C]/50">Your files will appear here</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 h-full overflow-y-auto">
              {files.map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 bg-white/30 rounded-lg border border-white/20">
                  <div className="text-lg">{getFileTypeIcon(file.file.name)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0E315C] truncate">{file.file.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-[#0E315C]/60">
                      <span>{formatFileSize(file.file.size)}</span>
                      {file.status === 'uploading' && <span>{file.progress}%</span>}
                      {file.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                      {file.status === 'error' && <AlertCircle className="w-3 h-3 text-red-600" />}
                    </div>
                    {file.status === 'uploading' && (
                      <div className="w-full bg-[#C1D9F6]/30 rounded-full h-1 mt-1">
                        <div
                          className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    {file.status === 'error' && (
                      <Button size="sm" variant="ghost" onClick={() => retryFile(file.id)} className="h-6 w-6 p-0">
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)} className="h-6 w-6 p-0 text-red-500">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="flex justify-between items-center pt-4 border-t border-white/20 mt-4">
              <Button variant="outline" onClick={clearAllFiles} className="text-sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
              <Button
                onClick={handleProceed}
                disabled={!canProceed}
                className={`${canProceed ? 'bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white' : 'bg-gray-300 text-gray-500'}`}
              >
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );

  // Layout 2: Compact Vertical
  const CompactLayout = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-light text-[#0E315C] mb-2">Document Upload</h1>
        <div className="flex items-center justify-center space-x-2 text-sm text-[#0E315C]/60">
          <User className="w-4 h-4" />
          <span>{clientEmail}</span>
        </div>
      </div>

      {/* Compact Upload Card */}
      <GlassPanel variant="enhanced" radius="lg" className="p-6">
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            isDragOver ? "border-[#99C0F0] bg-[#99C0F0]/10" : "border-[#C1D9F6]/60 bg-white/20"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className={`p-3 rounded-full ${isDragOver ? "bg-[#99C0F0]/20" : "bg-[#C1D9F6]/20"}`}>
              <Upload className={`w-6 h-6 ${isDragOver ? "text-[#99C0F0]" : "text-[#0E315C]/60"}`} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-[#0E315C]">
                {isDragOver ? "Drop files here" : "Upload Documents"}
              </h3>
              <p className="text-sm text-[#0E315C]/60">PDF, PNG, JPG, DOC, DOCX</p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white px-4 py-2 rounded-lg"
            >
              Browse
            </Button>
          </div>
        </div>

        {validationErrors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50/50 border border-red-200/50 rounded-lg">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Upload Issues</span>
            </div>
            {validationErrors.map((error, index) => (
              <div key={index} className="text-xs text-red-600">
                {error.file.name}: {error.error}
              </div>
            ))}
          </div>
        )}
      </GlassPanel>

      {/* File List */}
      <GlassPanel variant="heavy" radius="lg" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#0E315C] flex items-center space-x-2">
            <Folder className="w-5 h-5" />
            <span>Files ({files.length})</span>
          </h3>
          {completedFiles.length > 0 && (
            <span className="text-sm text-green-600">{completedFiles.length} ready</span>
          )}
        </div>

        {files.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-[#C1D9F6] mx-auto mb-3" />
            <p className="text-[#0E315C]/60">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 bg-white/30 rounded-lg">
                <div className="text-base">{getFileTypeIcon(file.file.name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#0E315C] truncate">{file.file.name}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-[#0E315C]/60">{formatFileSize(file.file.size)}</span>
                      {file.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                      {file.status === 'error' && <AlertCircle className="w-3 h-3 text-red-600" />}
                      {file.status === 'uploading' && <span className="text-[#99C0F0]">{file.progress}%</span>}
                    </div>
                  </div>
                  {file.status === 'uploading' && (
                    <div className="w-full bg-[#C1D9F6]/30 rounded-full h-1 mt-1">
                      <div
                        className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex space-x-1">
                  {file.status === 'error' && (
                    <Button size="sm" variant="ghost" onClick={() => retryFile(file.id)} className="h-6 w-6 p-0">
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)} className="h-6 w-6 p-0 text-red-500">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-white/20 mt-4">
            <div className="text-sm text-[#0E315C]/60">
              {uploadingFiles.length > 0 && `Uploading ${uploadingFiles.length}...`}
              {errorFiles.length > 0 && `${errorFiles.length} failed`}
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={clearAllFiles} size="sm">
                Clear All
              </Button>
              <Button
                onClick={handleProceed}
                disabled={!canProceed}
                size="sm"
                className={canProceed ? 'bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white' : 'bg-gray-300 text-gray-500'}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </GlassPanel>
    </div>
  );

  // Layout 3: Dashboard Style
  const DashboardLayout = () => (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-[#0E315C]">Document Upload Portal</h1>
          <p className="text-sm text-[#0E315C]/60">Secure document submission for legal review</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 bg-white/30 px-3 py-2 rounded-lg">
            <User className="w-4 h-4 text-[#99C0F0]" />
            <span className="text-[#0E315C]">{clientEmail}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <GlassPanel variant="light" radius="md" className="p-4 text-center">
          <div className="space-y-2">
            <FileText className="w-6 h-6 text-[#99C0F0] mx-auto" />
            <div className="text-lg font-semibold text-[#0E315C]">{files.length}</div>
            <div className="text-xs text-[#0E315C]/60">Total Files</div>
          </div>
        </GlassPanel>
        <GlassPanel variant="light" radius="md" className="p-4 text-center">
          <div className="space-y-2">
            <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
            <div className="text-lg font-semibold text-[#0E315C]">{completedFiles.length}</div>
            <div className="text-xs text-[#0E315C]/60">Completed</div>
          </div>
        </GlassPanel>
        <GlassPanel variant="light" radius="md" className="p-4 text-center">
          <div className="space-y-2">
            <Cloud className="w-6 h-6 text-[#C5BFEE] mx-auto" />
            <div className="text-lg font-semibold text-[#0E315C]">{uploadingFiles.length}</div>
            <div className="text-xs text-[#0E315C]/60">Uploading</div>
          </div>
        </GlassPanel>
        <GlassPanel variant="light" radius="md" className="p-4 text-center">
          <div className="space-y-2">
            <AlertCircle className="w-6 h-6 text-red-500 mx-auto" />
            <div className="text-lg font-semibold text-[#0E315C]">{errorFiles.length}</div>
            <div className="text-xs text-[#0E315C]/60">Errors</div>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="col-span-1">
          <GlassPanel variant="enhanced" radius="lg" className="p-6 h-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#0E315C]">Upload</h3>
              <Settings className="w-4 h-4 text-[#0E315C]/40" />
            </div>
            
            <div
              className={`border-2 border-dashed rounded-xl h-full transition-all duration-300 flex items-center justify-center ${
                isDragOver ? "border-[#99C0F0] bg-[#99C0F0]/10" : "border-[#C1D9F6]/60 bg-white/20"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-3">
                <div className={`p-4 rounded-full mx-auto w-fit ${isDragOver ? "bg-[#99C0F0]/20" : "bg-[#C1D9F6]/20"}`}>
                  <Upload className={`w-8 h-8 ${isDragOver ? "text-[#99C0F0]" : "text-[#0E315C]/60"}`} />
                </div>
                <div>
                  <h4 className="font-medium text-[#0E315C] mb-1">
                    {isDragOver ? "Drop here" : "Add Files"}
                  </h4>
                  <p className="text-xs text-[#0E315C]/60 mb-3">
                    PDF, PNG, JPG, DOC, DOCX
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="sm"
                    className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white px-4 py-2 rounded-lg"
                  >
                    Browse
                  </Button>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* File List */}
        <div className="col-span-2">
          <GlassPanel variant="heavy" radius="lg" className="p-6 h-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#0E315C]">Documents</h3>
              <div className="flex space-x-2">
                {files.length > 0 && (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="sm"
                    variant="outline"
                    className="border-[#99C0F0] text-[#99C0F0]"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            </div>

            {files.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Folder className="w-12 h-12 text-[#C1D9F6] mx-auto" />
                  <div>
                    <h4 className="font-medium text-[#0E315C]/60">No documents yet</h4>
                    <p className="text-sm text-[#0E315C]/50">Upload files to get started</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 h-full overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 bg-white/20 rounded-lg border border-white/20 hover:bg-white/30 transition-colors">
                    <div className="text-base">{getFileTypeIcon(file.file.name)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#0E315C] truncate">{file.file.name}</p>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-[#0E315C]/60">{formatFileSize(file.file.size)}</span>
                          <div className="flex items-center space-x-1">
                            {file.status === 'completed' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                Complete
                              </span>
                            )}
                            {file.status === 'error' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                Error
                              </span>
                            )}
                            {file.status === 'uploading' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                {file.progress}%
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            {file.status === 'error' && (
                              <Button size="sm" variant="ghost" onClick={() => retryFile(file.id)} className="h-6 w-6 p-0">
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)} className="h-6 w-6 p-0 text-red-500">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {file.status === 'uploading' && (
                        <div className="w-full bg-[#C1D9F6]/30 rounded-full h-1 mt-2">
                          <div
                            className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-1 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassPanel>
        </div>
      </div>

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

      {/* Action Bar */}
      {files.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#0E315C]/60">
            {uploadingFiles.length > 0 && <span>Uploading {uploadingFiles.length} file(s)...</span>}
            {errorFiles.length > 0 && <span className="text-red-600">{errorFiles.length} file(s) failed</span>}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={clearAllFiles}>
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
              Continue to Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <PageContainer variant="fullscreen" glassIntensity="light" className="p-6 h-screen overflow-hidden">
      <LayoutPicker />
      
      <div
        className={`h-full transition-all duration-1000 ease-out ${
          isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
        }`}
      >
        {currentLayout === 'horizontal' && <HorizontalLayout />}
        {currentLayout === 'compact' && <CompactLayout />}
        {currentLayout === 'dashboard' && <DashboardLayout />}

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
