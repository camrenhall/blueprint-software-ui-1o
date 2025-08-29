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

  return (
    <div className="grid grid-cols-12 gap-6 h-full max-h-full">
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
                    onClick={() => setShowTemplatesInline(!showTemplatesInline)}
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

          {/* Templates Section */}
          {showTemplatesInline && showTemplates && (
            <div className="border-b border-[#C1D9F6]/20 px-6 py-4 bg-[#C5BFEE]/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-[#0E315C]/80">
                  Quick Templates
                </h4>
                <button
                  onClick={() => setShowTemplatesInline(false)}
                  className="text-[#0E315C]/50 hover:text-[#0E315C] transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-1.5">
                {savedTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => onLoadTemplate?.(template)}
                    className="w-full text-left p-3 bg-white/50 hover:bg-white/70 border border-[#C1D9F6]/30 hover:border-[#C5BFEE]/50 rounded-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#0E315C] group-hover:text-[#0E315C]">
                          {template.name}
                        </div>
                        <div className="text-xs text-[#0E315C]/60 mt-1">
                          {template.documents.length} documents
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-[#0E315C]/40 group-hover:text-[#C5BFEE] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Document List */}
          <div className="flex-1 overflow-y-auto document-scroll px-6 py-4 rounded-b-3xl">
            <div className="space-y-2">
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
                    className="p-3 bg-white/50 border border-[#C1D9F6]/30 rounded-lg backdrop-blur-sm group hover:shadow-lg hover:shadow-[#C5BFEE]/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-3">
                        <span className="text-sm font-light text-[#0E315C] block">
                          {doc.name}
                        </span>
                        <div className="flex items-center mt-1.5">
                          <button
                            onClick={() => onToggleOptional(doc.name)}
                            className={`flex items-center space-x-2 text-xs px-3 py-1 rounded-full transition-all duration-300 ${
                              doc.optional
                                ? "bg-[#C5BFEE]/20 text-[#C5BFEE] border border-[#C5BFEE]/30"
                                : "bg-[#99C0F0]/20 text-[#99C0F0] border border-[#99C0F0]/30"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${doc.optional ? "bg-[#C5BFEE]" : "bg-[#99C0F0]"}`}
                            />
                            <span>
                              {doc.optional ? "Optional" : "Required"}
                            </span>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveDocument(doc.name)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 bg-white/60 text-[#0E315C]/60 hover:text-red-500 hover:bg-red-50/80 border border-[#C1D9F6]/30 hover:border-red-200 backdrop-blur-sm"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
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
