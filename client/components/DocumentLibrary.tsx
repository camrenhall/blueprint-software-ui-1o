import { useState } from "react";

// Types for document library
export interface Document {
  name: string;
  optional: boolean;
}

export interface Template {
  name: string;
  documents: string[];
}

interface DocumentLibraryProps {
  availableDocuments: string[];
  selectedDocuments: Document[];
  onAddDocument: (docName: string) => void;
  onRemoveDocument: (docName: string) => void;
  onToggleOptional: (docName: string) => void;
  onLoadTemplate?: (template: Template) => void;
  onSaveTemplate?: () => void;
  onClearAll?: () => void;
  savedTemplates?: Template[];
  showTemplates?: boolean;
}

export default function DocumentLibrary({
  availableDocuments,
  selectedDocuments,
  onAddDocument,
  onRemoveDocument,
  onToggleOptional,
  onLoadTemplate,
  onSaveTemplate,
  onClearAll,
  savedTemplates = [],
  showTemplates = true,
}: DocumentLibraryProps) {
  const [documentSearch, setDocumentSearch] = useState("");
  const [selectedDocumentSearch, setSelectedDocumentSearch] = useState("");
  const [isDocLibrarySearchVisible, setIsDocLibrarySearchVisible] =
    useState(false);
  const [isSelectedDocsSearchVisible, setIsSelectedDocsSearchVisible] =
    useState(false);
  const [showTemplatesInline, setShowTemplatesInline] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [editingDocuments, setEditingDocuments] = useState<string[]>([]);
  const [showConflictResolution, setShowConflictResolution] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Filter available documents (exclude already selected and apply search)
  const filteredAvailableDocuments = availableDocuments.filter(
    (doc) =>
      doc.toLowerCase().includes(documentSearch.toLowerCase()) &&
      !selectedDocuments.find((selectedDoc) => selectedDoc.name === doc),
  );

  // Filter selected documents by search
  const filteredSelectedDocuments = selectedDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(selectedDocumentSearch.toLowerCase()),
  );

  // Handle template edit/view action (combined)
  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setEditingDocuments([...template.documents]);
  };

  // Handle template load action
  const handleLoadTemplate = (template: Template) => {
    if (selectedDocuments.length > 0) {
      setPendingTemplate(template);
      setShowConflictResolution(true);
    } else {
      onLoadTemplate?.(template);
    }
  };

  // Handle conflict resolution actions
  const handleReplaceSelection = async () => {
    if (pendingTemplate) {
      setIsLoading(true);
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));
        onLoadTemplate?.(pendingTemplate);
        setActionFeedback({ message: `Replaced selection with ${pendingTemplate.name}`, type: 'success' });
        setShowConflictResolution(false);
        setPendingTemplate(null);
        // Clear feedback after 3 seconds
        setTimeout(() => setActionFeedback(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddToSelection = async () => {
    if (pendingTemplate) {
      setIsLoading(true);
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));
        const newDocs = pendingTemplate.documents.filter(docName =>
          !selectedDocuments.find(doc => doc.name === docName)
        );
        pendingTemplate.documents.forEach(docName => {
          if (!selectedDocuments.find(doc => doc.name === docName)) {
            onAddDocument(docName);
          }
        });
        setActionFeedback({ message: `Added ${newDocs.length} documents from ${pendingTemplate.name}`, type: 'success' });
        setShowConflictResolution(false);
        setPendingTemplate(null);
        // Clear feedback after 3 seconds
        setTimeout(() => setActionFeedback(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelConflict = () => {
    setShowConflictResolution(false);
    setPendingTemplate(null);
  };

  // Handle adding/removing documents in template editing
  const handleToggleDocumentInTemplate = (docName: string) => {
    setEditingDocuments(prev => {
      if (prev.includes(docName)) {
        return prev.filter(name => name !== docName);
      } else {
        return [...prev, docName];
      }
    });
  };

  // Save template changes
  const handleSaveTemplate = async () => {
    if (editingTemplate) {
      setIsLoading(true);
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 800));
        // In a real app, this would save to backend
        console.log('Saving template:', editingTemplate.name, 'with documents:', editingDocuments);
        setActionFeedback({ message: `Saved changes to ${editingTemplate.name}`, type: 'success' });
        closeTemplateViews();
        // Clear feedback after 3 seconds
        setTimeout(() => setActionFeedback(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Close template views
  const closeTemplateViews = () => {
    setEditingTemplate(null);
    setEditingDocuments([]);
    setShowConflictResolution(false);
    setPendingTemplate(null);
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full max-h-full relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
          <div className="bg-white/90 border border-[#C1D9F6]/40 rounded-2xl p-6 shadow-xl shadow-[#C1D9F6]/20 flex items-center space-x-4">
            <div className="w-6 h-6 border-2 border-[#99C0F0] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[#0E315C] font-medium">Processing...</span>
          </div>
        </div>
      )}

      {/* Action feedback notification */}
      {actionFeedback && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className={`px-6 py-3 rounded-xl shadow-lg border flex items-center space-x-3 animate-in slide-in-from-top-4 duration-300 ${
            actionFeedback.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {actionFeedback.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <span className="font-medium">{actionFeedback.message}</span>
          </div>
        </div>
      )}

      {/* Document Library Panel - Left Side */}
      <div className="col-span-7 flex flex-col">
        <div className="bg-white/80 border border-[#C1D9F6]/40 rounded-3xl shadow-lg shadow-[#C1D9F6]/10 flex flex-col h-[43vh] mb-4 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#C1D9F6]/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-light text-[#0E315C] mb-1">
                    Document Library
                  </h3>
                  <p className="text-sm text-[#0E315C]/60">
                    {filteredAvailableDocuments.length} available documents
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    if (isDocLibrarySearchVisible && documentSearch) {
                      setDocumentSearch("");
                    } else {
                      setIsDocLibrarySearchVisible(!isDocLibrarySearchVisible);
                    }
                  }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/80 border border-[#C1D9F6]/30 backdrop-blur-sm shadow-sm"
                >
                  {isDocLibrarySearchVisible && documentSearch ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
                {showTemplates && (
                  <button
                    onClick={() => {
                      setShowTemplatesInline(!showTemplatesInline);
                      closeTemplateViews();
                    }}
                    className={`text-[#0E315C]/60 hover:text-[#0E315C] flex items-center space-x-2 text-sm font-light border border-[#C1D9F6]/30 hover:border-[#C5BFEE]/50 rounded-xl px-3 py-2 transition-all duration-300 backdrop-blur-sm shadow-sm ${
                      showTemplatesInline
                        ? "bg-[#C5BFEE]/20 border-[#C5BFEE]/50 text-[#0E315C]"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span>Templates</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out border-b border-[#C1D9F6]/20 ${isDocLibrarySearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 py-4">
              <input
                type="text"
                value={documentSearch}
                onChange={(e) => setDocumentSearch(e.target.value)}
                className="w-full p-3 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-[#99C0F0]/30 focus:border-[#99C0F0]/50 transition-all placeholder-[#0E315C]/40 text-[#0E315C] text-sm"
                placeholder="Search document library..."
              />
            </div>
          </div>

          {/* Document List, Templates with Actions, or Template Detail View */}
          <div className="flex-1 overflow-y-auto document-scroll px-6 py-4 rounded-b-3xl">
            {showConflictResolution && pendingTemplate ? (
              // Conflict Resolution UI
              <div className="space-y-6">
                {/* Header with back button and warning */}
                <div className="flex items-start space-x-4">
                  <button
                    onClick={handleCancelConflict}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 hover:bg-white border border-[#C1D9F6]/40 hover:border-[#99C0F0]/50 transition-all duration-200 hover:shadow-lg shadow-sm"
                  >
                    <svg className="w-5 h-5 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <h3 className="text-xl font-medium text-[#0E315C]">Template Conflict</h3>
                    </div>
                    <p className="text-[#0E315C]/70 leading-relaxed">
                      You have <span className="font-semibold text-[#0E315C]">{selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''}</span> already selected.
                      Choose how to handle the template documents.
                    </p>
                  </div>
                </div>

                {/* Current vs Template comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current selection */}
                  <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/70 border border-amber-200/40 rounded-2xl p-5 shadow-lg shadow-amber-100/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <h4 className="text-lg font-semibold text-amber-800">Current Selection</h4>
                    </div>
                    <p className="text-sm text-amber-700/80 mb-3">{selectedDocuments.length} documents currently selected</p>
                    <div className="bg-white/60 rounded-xl p-3 max-h-32 overflow-y-auto">
                      {selectedDocuments.length > 0 ? (
                        <div className="space-y-2">
                          {selectedDocuments.slice(0, 5).map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                              <span className="text-sm text-amber-800/80">{doc.name}</span>
                            </div>
                          ))}
                          {selectedDocuments.length > 5 && (
                            <div className="text-xs text-amber-700/60 mt-2">
                              +{selectedDocuments.length - 5} more documents
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-amber-700/60 italic">No documents selected</div>
                      )}
                    </div>
                  </div>

                  {/* Template preview */}
                  <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200/40 rounded-2xl p-5 shadow-lg shadow-blue-100/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-[#99C0F0] rounded-full"></div>
                      <h4 className="text-lg font-semibold text-[#0E315C]">{pendingTemplate.name}</h4>
                    </div>
                    <p className="text-sm text-[#0E315C]/70 mb-3">Template with {pendingTemplate.documents.length} documents</p>
                    <div className="bg-white/60 rounded-xl p-3 max-h-32 overflow-y-auto">
                      <div className="space-y-2">
                        {pendingTemplate.documents.slice(0, 5).map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#99C0F0] rounded-full flex-shrink-0" />
                            <span className="text-sm text-[#0E315C]/80">{doc}</span>
                          </div>
                        ))}
                        {pendingTemplate.documents.length > 5 && (
                          <div className="text-xs text-[#0E315C]/60 mt-2">
                            +{pendingTemplate.documents.length - 5} more documents
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons with clear outcomes */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Replace action */}
                    <div className="bg-white/50 rounded-2xl p-4 border border-[#C1D9F6]/30">
                      <button
                        onClick={handleReplaceSelection}
                        disabled={isLoading}
                        className={`group w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#8AB5ED] hover:to-[#BFB8EB] text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-medium shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:shadow-[#99C0F0]/30 hover:scale-[1.02] transform ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                        <span>Replace Current Selection</span>
                      </button>
                      <p className="text-xs text-[#0E315C]/60 mt-2 text-center">
                        Remove all {selectedDocuments.length} current document{selectedDocuments.length !== 1 ? 's' : ''} and load {pendingTemplate.documents.length} template document{pendingTemplate.documents.length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Add action */}
                    <div className="bg-white/50 rounded-2xl p-4 border border-[#C1D9F6]/30">
                      <button
                        onClick={handleAddToSelection}
                        disabled={isLoading}
                        className={`group w-full bg-white/80 hover:bg-white text-[#0E315C] px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 border border-[#C1D9F6]/50 hover:border-[#99C0F0]/50 font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transform ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-[#0E315C] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                        <span>Add to Current Selection</span>
                      </button>
                      <p className="text-xs text-[#0E315C]/60 mt-2 text-center">
                        Keep current {selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} and add {pendingTemplate.documents.filter(doc => !selectedDocuments.find(selected => selected.name === doc)).length} new document{pendingTemplate.documents.filter(doc => !selectedDocuments.find(selected => selected.name === doc)).length !== 1 ? 's' : ''} from template
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={handleCancelConflict}
                      className="text-sm text-[#0E315C]/60 hover:text-[#0E315C] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/40"
                    >
                      Cancel and go back
                    </button>
                  </div>
                </div>
              </div>
            ) : editingTemplate ? (
              // Template Edit/View Interface
              <div className="space-y-6">
                {/* Header with back button and save */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={closeTemplateViews}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 hover:bg-white border border-[#C1D9F6]/40 hover:border-[#99C0F0]/50 transition-all duration-200 hover:shadow-lg shadow-sm flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-[#0E315C]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-5 h-5 text-[#C5BFEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-[#0E315C]">{editingTemplate.name}</h3>
                      </div>
                      <p className="text-[#0E315C]/70">
                        <span className="font-medium text-[#0E315C]">{editingDocuments.length}</span> of {availableDocuments.length} documents selected
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveTemplate}
                    disabled={isLoading}
                    className={`px-6 py-3 bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#8AB5ED] hover:to-[#BFB8EB] text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:shadow-[#99C0F0]/30 hover:scale-105 transform flex items-center space-x-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                    )}
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

                {/* Document selection grid */}
                <div className="bg-gradient-to-br from-white/60 to-white/40 rounded-2xl p-5 border border-[#C1D9F6]/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-[#0E315C]">Documents</h4>
                    <div className="text-sm text-[#0E315C]/60">
                      {editingDocuments.length} selected
                    </div>
                  </div>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                    {availableDocuments.map((doc, index) => {
                      const isSelected = editingDocuments.includes(doc);
                      return (
                        <div
                          key={index}
                          className={`group flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#99C0F0]/15 to-[#C5BFEE]/10 border-[#99C0F0]/40 shadow-sm'
                              : 'bg-white/60 border-[#C1D9F6]/25 hover:bg-white/80 hover:border-[#C1D9F6]/40'
                          }`}
                          onClick={() => handleToggleDocumentInTemplate(doc)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`relative w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] border-[#99C0F0] shadow-sm'
                                : 'border-[#C1D9F6]/50 group-hover:border-[#99C0F0]/30'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium transition-colors ${
                              isSelected ? 'text-[#0E315C]' : 'text-[#0E315C]/70 group-hover:text-[#0E315C]/90'
                            }`}>
                              {doc}
                            </span>
                          </div>
                          <span className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#99C0F0]/20 text-[#99C0F0] border border-[#99C0F0]/20'
                              : 'bg-[#C1D9F6]/15 text-[#0E315C]/50 group-hover:bg-[#C1D9F6]/25'
                          }`}>
                            {isSelected ? 'Included' : 'Available'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="bg-white/50 rounded-2xl p-5 border border-[#C1D9F6]/30">
                  <button
                    onClick={() => handleLoadTemplate({ name: editingTemplate.name, documents: editingDocuments })}
                    className="w-full bg-white hover:bg-[#99C0F0]/5 text-[#0E315C] px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 border border-[#C1D9F6]/40 hover:border-[#99C0F0]/40 font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transform"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Load This Template</span>
                  </button>
                  <p className="text-center text-xs text-[#0E315C]/50 mt-3">
                    This will add the selected documents to your current selection
                  </p>
                </div>
              </div>
            ) : showTemplatesInline && showTemplates ? (
              // Templates List with Action Icons
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-[#0E315C]">Saved Templates</h4>
                  <span className="text-sm text-[#0E315C]/60">{savedTemplates.length} templates</span>
                </div>
                {savedTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="group p-4 bg-gradient-to-r from-white/70 to-white/50 border border-[#C1D9F6]/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#C1D9F6]/15 hover:scale-[1.01] transform"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <svg className="w-4 h-4 text-[#C5BFEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <div className="font-semibold text-[#0E315C]">
                            {template.name}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-[#99C0F0] bg-[#99C0F0]/15 px-2 py-1 rounded-full">
                            {template.documents.length} docs
                          </span>
                          <span className="text-xs text-[#0E315C]/50">
                            Click to edit or load
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Edit/View Template (Combined) */}
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 hover:bg-[#C5BFEE]/10 border border-[#C1D9F6]/40 hover:border-[#C5BFEE]/40 transition-all duration-200 hover:shadow-md shadow-sm group/btn"
                          title="View and edit template"
                        >
                          <svg className="w-5 h-5 text-[#0E315C]/70 group-hover/btn:text-[#C5BFEE] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Load Template */}
                        <button
                          onClick={() => handleLoadTemplate(template)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#99C0F0]/15 to-[#C5BFEE]/15 hover:from-[#99C0F0]/25 hover:to-[#C5BFEE]/25 border border-[#99C0F0]/30 hover:border-[#99C0F0]/40 transition-all duration-200 hover:shadow-md shadow-sm group/btn"
                          title="Load template to selected documents"
                        >
                          <svg className="w-5 h-5 text-[#99C0F0] group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Regular Document List
              <div className="space-y-1.5">
                {filteredAvailableDocuments.length > 0 ? (
                  filteredAvailableDocuments.map((doc, index) => (
                    <button
                      key={index}
                      onClick={() => onAddDocument(doc)}
                      className="w-full text-left p-3 bg-white/50 hover:bg-white/70 border border-[#C1D9F6]/30 hover:border-[#99C0F0]/50 rounded-lg transition-all duration-300 group hover:shadow-lg hover:shadow-[#99C0F0]/10 hover:scale-[1.01] transform"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-[#0E315C] group-hover:text-[#0E315C]">
                          {doc}
                        </span>
                        <svg
                          className="w-4 h-4 text-[#0E315C]/40 group-hover:text-[#99C0F0] transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-[#0E315C]/50 text-sm">
                      {documentSearch
                        ? "No documents match your search"
                        : "All documents have been selected"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Documents Panel - Right Side */}
      <div className="col-span-5 flex flex-col">
        <div className="bg-white/80 border border-[#C1D9F6]/40 rounded-3xl shadow-lg shadow-[#C1D9F6]/10 flex flex-col h-[43vh] mb-4 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#C1D9F6]/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-light text-[#0E315C] mb-1">
                  Selected Documents
                </h3>
                <p className="text-sm text-[#0E315C]/60">
                  {selectedDocuments.length} document
                  {selectedDocuments.length !== 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (isSelectedDocsSearchVisible && selectedDocumentSearch) {
                      setSelectedDocumentSearch("");
                    } else {
                      setIsSelectedDocsSearchVisible(
                        !isSelectedDocsSearchVisible,
                      );
                    }
                  }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/80 border border-[#C1D9F6]/30 backdrop-blur-sm shadow-sm"
                >
                  {isSelectedDocsSearchVisible && selectedDocumentSearch ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
                {onSaveTemplate && (
                  <button
                    onClick={onSaveTemplate}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-white/80 border border-[#C1D9F6]/30 backdrop-blur-sm shadow-sm"
                    title="Save as template"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                  </button>
                )}
                {onClearAll && selectedDocuments.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-red-500 hover:bg-red-50/80 border border-[#C1D9F6]/30 hover:border-red-200 backdrop-blur-sm shadow-sm"
                    title="Clear all selected documents"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out border-b border-[#C1D9F6]/20 ${isSelectedDocsSearchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 py-4">
              <input
                type="text"
                value={selectedDocumentSearch}
                onChange={(e) => setSelectedDocumentSearch(e.target.value)}
                className="w-full p-3 bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-[#99C0F0]/30 focus:border-[#99C0F0]/50 transition-all placeholder-[#0E315C]/40 text-[#0E315C] text-sm"
                placeholder="Search selected documents..."
              />
            </div>
          </div>

          {/* Selected Documents List */}
          <div className="flex-1 overflow-y-auto document-scroll px-6 py-4 rounded-b-3xl">
            <div className="space-y-2">
              {filteredSelectedDocuments.length > 0 ? (
                filteredSelectedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="p-2.5 bg-white/50 border border-[#C1D9F6]/30 rounded-lg backdrop-blur-sm group hover:shadow-lg hover:shadow-[#C5BFEE]/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light text-[#0E315C] flex-1 mr-3">
                        {doc.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onToggleOptional(doc.name)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 border backdrop-blur-sm ${
                            doc.optional
                              ? "bg-[#C5BFEE]/20 text-[#C5BFEE] border-[#C5BFEE]/30 hover:bg-[#C5BFEE]/30"
                              : "bg-white/60 text-[#0E315C]/60 border-[#C1D9F6]/30 hover:bg-white/80 hover:text-[#0E315C]/80"
                          }`}
                          title={doc.optional ? "Optional - Click to make required" : "Required - Click to make optional"}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onRemoveDocument(doc.name)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-red-500 hover:bg-red-50/80 border border-[#C1D9F6]/30 hover:border-red-200 backdrop-blur-sm"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-[#0E315C]/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-[#0E315C]/50 text-sm">
                    {selectedDocumentSearch
                      ? "No selected documents match your search"
                      : "No documents selected yet"}
                  </p>
                  {!selectedDocumentSearch && (
                    <p className="text-[#0E315C]/40 text-xs mt-2">
                      Add documents from the library to get started
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
