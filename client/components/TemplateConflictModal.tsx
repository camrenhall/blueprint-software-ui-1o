import { Template } from "../hooks/useDocumentSelection";

interface TemplateConflictModalProps {
  isOpen: boolean;
  template: Template | null;
  selectedCount: number;
  onReplace: () => void;
  onAdd: () => void;
  onCancel: () => void;
}

export default function TemplateConflictModal({
  isOpen,
  template,
  selectedCount,
  onReplace,
  onAdd,
  onCancel,
}: TemplateConflictModalProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0E315C]/20 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white/80 backdrop-blur-md border border-[#C1D9F6]/40 rounded-3xl shadow-2xl shadow-[#C1D9F6]/20 p-8 max-w-md w-full mx-4 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#C5BFEE]/20 to-[#99C0F0]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-[#C1D9F6]/30">
            <svg className="w-8 h-8 text-[#C5BFEE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-light text-[#0E315C] mb-2">
            Load Template
          </h3>
          <p className="text-[#0E315C]/60 text-sm">
            You already have {selectedCount} document{selectedCount !== 1 ? "s" : ""} selected
          </p>
        </div>

        {/* Template Info */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#0E315C]">{template.name}</h4>
            <span className="text-xs text-[#0E315C]/60 bg-[#C1D9F6]/20 px-2 py-1 rounded-full">
              {template.documents.length} docs
            </span>
          </div>
          <div className="space-y-2">
            {template.documents.slice(0, 3).map((doc, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#99C0F0] rounded-full" />
                <span className="text-sm text-[#0E315C]/70">{doc}</span>
              </div>
            ))}
            {template.documents.length > 3 && (
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#C1D9F6] rounded-full" />
                <span className="text-sm text-[#0E315C]/50">
                  +{template.documents.length - 3} more documents
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onReplace}
            className="w-full bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#0E315C] hover:to-[#0E315C] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:shadow-[#0E315C]/20 font-light"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Replace Current Selection</span>
          </button>
          
          <button
            onClick={onAdd}
            className="w-full bg-white/60 hover:bg-white/80 text-[#0E315C] px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-[#C1D9F6]/40 hover:border-[#99C0F0]/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:shadow-[#99C0F0]/10 font-light"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add to Current Selection</span>
          </button>
          
          <button
            onClick={onCancel}
            className="w-full text-[#0E315C]/60 hover:text-[#0E315C] px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#C1D9F6]/10 font-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
