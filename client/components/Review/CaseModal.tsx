import { Case } from './types';

interface CaseModalProps {
  case: Case | null;
  onClose: () => void;
}

export function CaseModal({ case: selectedCase, onClose }: CaseModalProps) {
  if (!selectedCase) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" 
      onClick={onClose}
    >
      <div 
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-[#C1D9F6]/30" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-2xl flex items-center justify-center text-white font-light text-lg mx-auto mb-6 shadow-lg">
            {selectedCase.avatar}
          </div>
          <h3 className="text-xl font-light text-[#0E315C] mb-2">{selectedCase.name}</h3>
          <p className="text-[#0E315C]/60 text-sm font-light mb-6">{selectedCase.caseId}</p>
          <button
            onClick={onClose}
            className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-3 rounded-2xl transition-all text-sm font-light shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:scale-105"
          >
            Open Case Details
          </button>
        </div>
      </div>
    </div>
  );
}
