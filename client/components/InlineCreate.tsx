import { useState } from "react";

interface InlineCreateProps {
  onClose?: () => void;
}

export default function InlineCreate({ onClose }: InlineCreateProps) {
  const [createStep, setCreateStep] = useState(1);
  const [createMethod, setCreateMethod] = useState<
    "ai" | "manual" | "questionnaire" | null
  >(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [caseInfo, setCaseInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
  });

  const handleMethodSelect = (method: "ai" | "manual" | "questionnaire") => {
    setCreateMethod(method);
    setCreateStep(2);
  };

  const handleStepTransition = (newStep: number) => {
    setCreateStep(newStep);
  };

  const steps = [
    { number: 1, label: "Method" },
    { number: 2, label: "Documents" },
    { number: 3, label: "Case Info" },
    { number: 4, label: "Review" },
  ];

  return (
    <div className="h-[85vh] max-h-[85vh] min-h-[85vh] overflow-hidden px-8 py-8 relative flex flex-col rounded-3xl">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-[#C1D9F6]/8 to-[#99C0F0]/6 blur-2xl" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 flex-shrink-0">
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${createStep ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
        >
          <h1 className="text-4xl font-light text-[#0E315C] mb-4 tracking-wide">
            Create New Case
          </h1>
          <p className="text-[#0E315C]/70 text-base leading-relaxed">
            Build a new case with intelligent document collection
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-[#0E315C]/50 hover:text-[#0E315C] hover:bg-[#C1D9F6]/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <svg
              className="w-5 h-5"
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
        )}
      </div>

      {/* Ethereal Step Indicator */}
      <div
        className={`relative z-10 mb-12 transition-all duration-800 ease-out delay-500 ${createStep ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-3"}`}
      >
        <div className="flex items-center justify-center space-x-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-light transition-all duration-700 backdrop-blur-sm ${
                    step.number < createStep
                      ? "bg-[#99C0F0]/80 text-white shadow-lg shadow-[#99C0F0]/20 scale-110"
                      : step.number === createStep
                        ? "bg-[#C5BFEE]/80 text-white shadow-lg shadow-[#C5BFEE]/20 scale-105"
                        : "bg-white/40 text-[#0E315C]/50 border border-[#C1D9F6]/40 backdrop-blur-sm"
                  }`}
                >
                  {step.number < createStep ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs font-light mt-2 transition-all duration-700 ${
                    step.number <= createStep
                      ? "text-[#0E315C]/80"
                      : "text-[#0E315C]/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-px mx-4 transition-all duration-700 ${
                    step.number < createStep
                      ? "bg-gradient-to-r from-[#99C0F0]/60 to-[#C5BFEE]/60"
                      : "bg-[#C1D9F6]/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Step 1: Method Selection */}
        {createStep === 1 && (
          <div
            className={`relative z-10 space-y-8 transition-all duration-1000 ease-out delay-700 ${createStep === 1 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
          >
            <div className="text-center mb-8">
              <p className="text-[#0E315C]/60 text-sm leading-relaxed max-w-sm mx-auto font-light">
                Choose your preferred method for creating a new case and
                requesting documents from your client
              </p>
            </div>

            <div className="space-y-5">
              <button
                onClick={() => handleMethodSelect("ai")}
                className="w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:border-[#99C0F0]/60 hover:bg-white/50 hover:shadow-xl hover:shadow-[#99C0F0]/5 transition-all duration-500 p-6 rounded-3xl text-left group hover:scale-[1.02] transform"
              >
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#99C0F0]/80 to-[#C5BFEE]/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-[#0E315C] mb-2">
                      AI Assist
                    </h3>
                    <p className="text-[#0E315C]/60 text-sm leading-relaxed font-light">
                      Describe your case and let AI suggest the most relevant
                      documents to request
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect("manual")}
                className="w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:border-[#C5BFEE]/60 hover:bg-white/50 hover:shadow-xl hover:shadow-[#C5BFEE]/5 transition-all duration-500 p-6 rounded-3xl text-left group hover:scale-[1.02] transform"
              >
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C5BFEE]/80 to-[#C1D9F6]/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-[#0E315C] mb-2">
                      Manual Select
                    </h3>
                    <p className="text-[#0E315C]/60 text-sm leading-relaxed font-light">
                      Manually choose documents from your organized document
                      library
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect("questionnaire")}
                className="w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:border-[#C1D9F6]/70 hover:bg-white/50 hover:shadow-xl hover:shadow-[#C1D9F6]/5 transition-all duration-500 p-6 rounded-3xl text-left group hover:scale-[1.02] transform"
              >
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C1D9F6]/80 to-[#99C0F0]/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-[#0E315C] mb-2">
                      Questionnaire
                    </h3>
                    <p className="text-[#0E315C]/60 text-sm leading-relaxed font-light">
                      Send a structured questionnaire tailored to your case type
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Document Selection */}
        {createStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-[#0E315C] mb-1">
                  Select Documents
                </h2>
                <p className="text-[#0E315C]/70 text-sm">
                  Choose documents to request from your client
                </p>
              </div>
              <button
                onClick={() => handleStepTransition(1)}
                className="flex items-center space-x-2 px-3 py-2 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-[#C1D9F6]/20 rounded-lg transition-all text-sm"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
            </div>

            <div className="bg-white/80 border border-[#C1D9F6]/40 rounded-2xl p-6">
              <div className="text-center text-[#0E315C]/60 py-8">
                <svg
                  className="w-12 h-12 mx-auto mb-4 opacity-40"
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
                <p className="text-sm">
                  Document selection interface will be implemented here
                </p>
                <p className="text-xs mt-2 opacity-60">
                  Selected method: {createMethod}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleStepTransition(3)}
                className="bg-[#99C0F0] hover:bg-[#0E315C] text-white px-6 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-[#99C0F0]/20"
              >
                <span>Continue</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Case Information */}
        {createStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-[#0E315C] mb-1">
                  Case Information
                </h2>
                <p className="text-[#0E315C]/70 text-sm">
                  Enter basic information for this case
                </p>
              </div>
              <button
                onClick={() => handleStepTransition(2)}
                className="flex items-center space-x-2 px-3 py-2 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-[#C1D9F6]/20 rounded-lg transition-all text-sm"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
            </div>

            <div className="bg-white/80 border border-[#C1D9F6]/40 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0E315C] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={caseInfo.firstName}
                    onChange={(e) =>
                      setCaseInfo((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/80 border border-[#C1D9F6] rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0E315C] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={caseInfo.lastName}
                    onChange={(e) =>
                      setCaseInfo((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/80 border border-[#C1D9F6] rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0E315C] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={caseInfo.email}
                  onChange={(e) =>
                    setCaseInfo((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-white/80 border border-[#C1D9F6] rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0E315C] mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={caseInfo.phone}
                  onChange={(e) =>
                    setCaseInfo((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-white/80 border border-[#C1D9F6] rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleStepTransition(4)}
                disabled={
                  !caseInfo.firstName || !caseInfo.lastName || !caseInfo.email
                }
                className="bg-[#99C0F0] hover:bg-[#0E315C] disabled:bg-[#C1D9F6]/50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-[#99C0F0]/20 disabled:shadow-none"
              >
                <span>Continue</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Create */}
        {createStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-[#0E315C] mb-1">
                  Review & Create
                </h2>
                <p className="text-[#0E315C]/70 text-sm">
                  Review all details before creating the case
                </p>
              </div>
              <button
                onClick={() => handleStepTransition(3)}
                className="flex items-center space-x-2 px-3 py-2 text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-[#C1D9F6]/20 rounded-lg transition-all text-sm"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl p-6">
                <h3 className="text-sm font-medium text-[#0E315C] mb-3">
                  Case Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#0E315C]/70">Method:</span>
                    <span className="text-[#0E315C] capitalize">
                      {createMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0E315C]/70">Client:</span>
                    <span className="text-[#0E315C]">
                      {caseInfo.firstName} {caseInfo.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0E315C]/70">Email:</span>
                    <span className="text-[#0E315C]">{caseInfo.email}</span>
                  </div>
                  {caseInfo.phone && (
                    <div className="flex justify-between">
                      <span className="text-[#0E315C]/70">Phone:</span>
                      <span className="text-[#0E315C]">{caseInfo.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  alert("Case created successfully!");
                  // Reset form or navigate away
                  setCreateStep(1);
                  setCreateMethod(null);
                  setCaseInfo({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    caseType: "",
                  });
                }}
                className="bg-[#C5BFEE] hover:bg-[#0E315C] text-white px-6 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-[#C5BFEE]/20"
              >
                <span>Create Case</span>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
