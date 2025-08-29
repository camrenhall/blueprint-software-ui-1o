import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { formatFileSize, getFileTypeIcon } from "@/lib/uploadUtils";
import { CheckCircle2, FileText, Upload, Download, LogOut, Clock, User } from "lucide-react";

interface UploadedFileData {
  name: string;
  size: number;
  type: string;
}

export default function ClientConfirmation() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileData[]>([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [clientEmail, setClientEmail] = useState("");

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Load uploaded files and client info
  useEffect(() => {
    const session = localStorage.getItem('clientSession');
    const files = localStorage.getItem('uploadedFiles');
    
    if (!session) {
      navigate('/client/login');
      return;
    }

    if (!files) {
      navigate('/client/upload');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      const filesData = JSON.parse(files);
      setClientEmail(sessionData.email);
      setUploadedFiles(filesData);
    } catch (error) {
      console.error('Failed to parse stored data:', error);
      navigate('/client/upload');
    }
  }, [navigate]);

  const handleUploadMore = () => {
    // Clear the uploaded files from storage so they don't interfere
    localStorage.removeItem('uploadedFiles');
    navigate('/client/upload');
  };

  const handleLogout = () => {
    // Clear all client session data
    localStorage.removeItem('clientSession');
    localStorage.removeItem('uploadedFiles');
    navigate('/client/login');
  };

  const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
  const uploadTime = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <PageContainer variant="fullscreen" glassIntensity="light" className="p-4 sm:p-6 lg:p-8">
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          isAnimated
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-[#0E315C] mb-4 tracking-wide">
            Upload Successful
          </h1>
          <p className="text-[#0E315C]/70 text-lg mb-2">
            Your documents have been securely uploaded and are ready for review
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Two-column layout for summary and documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Upload Summary */}
            <GlassPanel variant="enhanced" radius="lg" className="p-3 sm:p-4">
              <div className="space-y-3">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-white/30 rounded-lg border border-white/20">
                    <FileText className="w-6 h-6 text-[#99C0F0] mx-auto mb-1" />
                    <div className="text-xl font-semibold text-[#0E315C]">
                      {uploadedFiles.length}
                    </div>
                    <div className="text-xs text-[#0E315C]/60">
                      Files Uploaded
                    </div>
                  </div>

                  <div className="text-center p-2 bg-white/30 rounded-lg border border-white/20">
                    <Download className="w-6 h-6 text-[#C5BFEE] mx-auto mb-1" />
                    <div className="text-xl font-semibold text-[#0E315C]">
                      {formatFileSize(totalSize)}
                    </div>
                    <div className="text-xs text-[#0E315C]/60">
                      Total Size
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="p-2 bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-[#99C0F0]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#0E315C] font-medium text-sm">
                          {clientEmail.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0E315C]">
                        Uploaded by: {clientEmail}
                      </p>
                      <p className="text-xs text-[#0E315C]/60">
                        Upload completed on {uploadTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Right Column - File List */}
            <GlassPanel variant="heavy" radius="lg" className="p-3 sm:p-4">
              <div className="space-y-2 h-full">
                <h3 className="text-lg font-medium text-[#0E315C] flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Uploaded Documents</span>
                </h3>

                <div className="bg-white/20 rounded-lg border border-white/30 divide-y divide-white/20 max-h-44 overflow-y-auto document-scroll flex-1">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="flex-shrink-0 text-lg">
                          {getFileTypeIcon(file.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#0E315C] truncate">
                            {file.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-[#0E315C]/60">
                          {formatFileSize(file.size)}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Next Steps */}
          <GlassPanel variant="light" radius="lg" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#0E315C]">
                What happens next?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#99C0F0]/20 rounded-full flex items-center justify-center text-xs text-[#0E315C] font-medium mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E315C]">
                      Document Review
                    </p>
                    <p className="text-xs text-[#0E315C]/60">
                      Your legal team will review all uploaded documents within 2-3 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#C5BFEE]/20 rounded-full flex items-center justify-center text-xs text-[#0E315C] font-medium mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E315C]">
                      Follow-up Communication
                    </p>
                    <p className="text-xs text-[#0E315C]/60">
                      You'll receive an email confirmation and any follow-up questions if needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#C1D9F6]/20 rounded-full flex items-center justify-center text-xs text-[#0E315C] font-medium mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E315C]">
                      Case Progression
                    </p>
                    <p className="text-xs text-[#0E315C]/60">
                      Your documents will be incorporated into your case file and next steps will be communicated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="text-sm text-[#0E315C]/60 text-center sm:text-left">
              Need to upload additional documents? You can add more files or logout when finished.
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-[#C1D9F6] text-[#0E315C] hover:bg-[#C1D9F6]/10 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
              
              <Button
                onClick={handleUploadMore}
                className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload More Documents</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
