import { useState, useEffect, useCallback } from "react";
import DocumentLibrary from "./DocumentLibrary";
import CaseInfoForm, { CaseInfoFormData } from "./CaseInfoForm";
import { useDocumentSelection } from "../hooks/useDocumentSelection";
import { Button } from "@/components/ui/button";
import { EmailPreview } from "./EmailPreview";

interface InlineCreateProps {
  onClose?: () => void;
}

export default function InlineCreate({ onClose }: InlineCreateProps) {
  const [createStep, setCreateStep] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const [createMethod, setCreateMethod] = useState<
    "ai" | "manual" | "questionnaire" | null
  >(null);
  const documentSelection = useDocumentSelection();
  const [caseInfo, setCaseInfo] = useState<CaseInfoFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    priority: "medium",
    description: "",
  });
  const [isCaseInfoFormValid, setIsCaseInfoFormValid] = useState(false);
  const [emailDraft, setEmailDraft] = useState({
    subject: "",
    content: "",
    to: [] as string[],
    cc: [] as string[]
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleMethodSelect = (method: "ai" | "manual" | "questionnaire") => {
    setCreateMethod(method);
    setCreateStep(2);
  };

  const handleStepTransition = (newStep: number) => {
    setCreateStep(newStep);
  };

  const getDefaultEmailContent = useCallback(() => {
    const requiredDocs = documentSelection.selectedDocuments.filter(doc => !doc.isOptional);
    const optionalDocs = documentSelection.selectedDocuments.filter(doc => doc.isOptional);

    let content = `Dear ${caseInfo.firstName},\n\nThank you for choosing our firm for your legal needs. To proceed with your case, we need you to provide the following documents:\n\n`;

    if (requiredDocs.length > 0) {
      content += "Required Documents:\n";
      requiredDocs.forEach(doc => {
        content += `• ${doc.name}\n`;
      });
      content += "\n";
    }

    if (optionalDocs.length > 0) {
      content += "Optional Documents (if available):\n";
      optionalDocs.forEach(doc => {
        content += `• ${doc.name}\n`;
      });
      content += "\n";
    }

    content += `Please upload these documents at your earliest convenience. If you have any questions or need assistance, please don't hesitate to contact us.\n\nBest regards,\nLuceron AI Legal Team`;

    return content;
  }, [caseInfo.firstName, documentSelection.selectedDocuments]);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  // Initialize email draft when entering review step
  useEffect(() => {
    if (createStep === 4 && caseInfo.email && !emailDraft.subject) {
      setEmailDraft({
        subject: `Document Request - ${caseInfo.firstName} ${caseInfo.lastName}`,
        content: getDefaultEmailContent(),
        to: [caseInfo.email],
        cc: []
      });
    }
  }, [createStep, caseInfo.email, caseInfo.firstName, caseInfo.lastName, emailDraft.subject, getDefaultEmailContent]);

  const steps = [
    { number: 1, label: "Method" },
    { number: 2, label: "Documents" },
    { number: 3, label: "Case Info" },
    { number: 4, label: "Review" },
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col px-8 pt-8 pb-4"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Header */}
      <div className="text-center mb-8 flex-shrink-0">
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
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
        className={`mb-12 transition-all duration-800 ease-out delay-500 ${isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-3"}`}
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
      <div className="flex-1 overflow-y-auto overflow-x-visible">
        {/* Step 1: Method Selection */}
        {createStep === 1 && (
          <div
            className={`space-y-8 transition-all duration-1000 ease-out delay-700 ${isAnimated && createStep === 1 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
          >
            <div className="text-center mb-8">
              <p className="text-[#0E315C]/60 text-sm leading-relaxed max-w-sm mx-auto font-light">
                Choose your preferred method for creating a new case and
                requesting documents from your client
              </p>
            </div>

            <div className="space-y-4 px-2 py-2">
              {/* Manual Select - Active */}
              <button
                onClick={() => handleMethodSelect("manual")}
                className="w-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:border-[#C5BFEE]/60 hover:bg-white/50 hover:shadow-xl hover:shadow-[#C5BFEE]/5 transition-all duration-500 p-4 rounded-2xl text-left group hover:scale-[1.02] transform"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C5BFEE]/80 to-[#C1D9F6]/60 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                    <svg
                      className="w-5 h-5 text-white"
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
                    <h3 className="text-base font-light text-[#0E315C] mb-1">
                      Manual Select
                    </h3>
                    <p className="text-[#0E315C]/60 text-sm leading-relaxed font-light">
                      Manually choose documents from your organized document
                      library
                    </p>
                  </div>
                </div>
              </button>

              {/* AI Assist - Inactive */}
              <button
                disabled
                className="w-full bg-white/10 backdrop-blur-md border border-[#C1D9F6]/20 p-4 rounded-2xl text-left cursor-not-allowed opacity-50"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300/50 to-gray-400/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                    <h3 className="text-base font-light text-gray-400 mb-1">
                      AI Assist
                      <span className="ml-2 text-xs text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </h3>
                    <p className="text-gray-400/70 text-sm leading-relaxed font-light">
                      Describe your case and let AI suggest the most relevant
                      documents to request
                    </p>
                  </div>
                </div>
              </button>

              {/* Questionnaire - Inactive */}
              <button
                disabled
                className="w-full bg-white/10 backdrop-blur-md border border-[#C1D9F6]/20 p-4 rounded-2xl text-left cursor-not-allowed opacity-50"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300/50 to-gray-400/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                    <h3 className="text-base font-light text-gray-400 mb-1">
                      Questionnaire
                      <span className="ml-2 text-xs text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </h3>
                    <p className="text-gray-400/70 text-sm leading-relaxed font-light">
                      Send one of your firm's own questionnaires to a client and automatically monitor its completion
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Document Selection */}
        {createStep === 2 && (
          <div className="h-full flex flex-col min-h-0">
            {/* Document Library Interface - Flexible with max height */}
            <div className="flex-1 min-h-0 max-h-[calc(100%-6rem)]">
              <DocumentLibrary
                availableDocuments={documentSelection.availableDocuments}
                selectedDocuments={documentSelection.selectedDocuments}
                onAddDocument={documentSelection.handleAddDocument}
                onRemoveDocument={documentSelection.handleRemoveDocument}
                onToggleOptional={documentSelection.handleToggleOptional}
                onLoadTemplate={documentSelection.handleLoadTemplate}
                onClearAll={documentSelection.handleClearAllDocuments}
                savedTemplates={documentSelection.savedTemplates}
                showTemplates={true}
              />
            </div>

            {/* Compact Navigation Bar - Fixed at bottom */}
            <div className="mt-4 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Back Button */}
                <button
                  onClick={() => handleStepTransition(1)}
                  className="group flex items-center space-x-3 px-6 py-3 bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/60 hover:border-[#C1D9F6]/80 hover:bg-white/60 rounded-2xl transition-all duration-300 hover:scale-105 transform hover:shadow-lg shadow-[#C1D9F6]/10"
                >
                  <svg
                    className="w-4 h-4 text-[#0E315C]/60 group-hover:text-[#0E315C] transition-colors duration-300"
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
                  <span className="text-[#0E315C]/70 group-hover:text-[#0E315C] font-light transition-colors duration-300">
                    Back
                  </span>
                </button>

                {/* Document Status Indicator - Center */}
                {documentSelection.selectedDocuments.length > 0 ? (
                  <div className="bg-white/90 border border-[#C1D9F6]/40 rounded-xl px-4 py-2 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#99C0F0] rounded-full" />
                        <span className="text-[#0E315C]/70">
                          {documentSelection.getDocumentCounts().required}{" "}
                          required
                        </span>
                      </div>
                      {documentSelection.getDocumentCounts().optional > 0 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#C5BFEE] rounded-full" />
                          <span className="text-[#0E315C]/70">
                            {documentSelection.getDocumentCounts().optional}{" "}
                            optional
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : createMethod === "ai" ? (
                  <p className="text-[#0E315C]/50 text-sm font-light">
                    AI suggestions will appear here
                  </p>
                ) : (
                  <p className="text-[#0E315C]/40 text-xs font-light">
                    Select at least one document to continue
                  </p>
                )}

                {/* Next Button */}
                <button
                  onClick={() => handleStepTransition(3)}
                  disabled={documentSelection.selectedDocuments.length === 0}
                  className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#99C0F0]/90 to-[#C5BFEE]/90 hover:from-[#99C0F0] hover:to-[#C5BFEE] disabled:from-[#C1D9F6]/40 disabled:to-[#C1D9F6]/40 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 hover:scale-105 transform shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:shadow-[#99C0F0]/30 disabled:shadow-none backdrop-blur-sm"
                >
                  <span className="font-light group-disabled:text-white/60">
                    Next
                  </span>
                  <svg
                    className="w-4 h-4 group-disabled:text-white/60 transition-transform duration-300 group-hover:translate-x-0.5"
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
          </div>
        )}

        {/* Step 3: Case Information */}
        {createStep === 3 && (
          <div className="h-full flex flex-col min-h-0">
            {/* Form Content - Flexible with max height */}
            <div className="flex-1 min-h-0 max-h-[calc(100%-4rem)]">
              <CaseInfoForm
                initialData={caseInfo}
                onSubmit={(data) => {
                  setCaseInfo(data);
                  handleStepTransition(4);
                }}
                isSubmitting={false}
                onFormValidityChange={setIsCaseInfoFormValid}
              />
            </div>

            {/* Compact Navigation Bar - Fixed at bottom */}
            <div className="mt-4 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Back Button */}
                <button
                  onClick={() => handleStepTransition(2)}
                  className="group flex items-center space-x-3 px-6 py-3 bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/60 hover:border-[#C1D9F6]/80 hover:bg-white/60 rounded-2xl transition-all duration-300 hover:scale-105 transform hover:shadow-lg shadow-[#C1D9F6]/10"
                >
                  <svg
                    className="w-4 h-4 text-[#0E315C]/60 group-hover:text-[#0E315C] transition-colors duration-300"
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
                  <span className="text-[#0E315C]/70 group-hover:text-[#0E315C] font-light transition-colors duration-300">
                    Back
                  </span>
                </button>

                {/* Center spacer */}
                <div></div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    // Trigger form submission
                    const form = document.querySelector(
                      "form",
                    ) as HTMLFormElement;
                    if (form) {
                      form.requestSubmit();
                    }
                  }}
                  disabled={!isCaseInfoFormValid}
                  className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#99C0F0]/90 to-[#C5BFEE]/90 hover:from-[#99C0F0] hover:to-[#C5BFEE] disabled:from-[#C1D9F6]/40 disabled:to-[#C1D9F6]/40 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 hover:scale-105 transform shadow-lg shadow-[#99C0F0]/20 hover:shadow-xl hover:shadow-[#99C0F0]/30 disabled:shadow-none backdrop-blur-sm"
                >
                  <span className="font-light group-disabled:text-white/60">
                    Next
                  </span>
                  <svg
                    className="w-4 h-4 group-disabled:text-white/60 transition-transform duration-300 group-hover:translate-x-0.5"
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
          </div>
        )}

        {/* Step 4: Review & Create */}
        {createStep === 4 && (
          <div className="h-full flex flex-col min-h-0">
            {/* Review Content - Flexible with max height */}
            <div className="flex-1 min-h-0 max-h-[calc(100%-4rem)] overflow-y-auto">
              <div className="space-y-6">
                {/* Case Summary Container - SEPARATE */}
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
                    {caseInfo.description && (
                      <div className="flex justify-between">
                        <span className="text-[#0E315C]/70">Description:</span>
                        <span className="text-[#0E315C] max-w-xs text-right">
                          {caseInfo.description.length > 50
                            ? `${caseInfo.description.substring(0, 50)}...`
                            : caseInfo.description}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#0E315C]/70">Documents:</span>
                      <span className="text-[#0E315C]">
                        {documentSelection.getDocumentCounts().total} selected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Email Container - COMPLETELY SEPARATE */}
                <div className="bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-[#0E315C] mb-1">Client Email</h3>
                      <p className="text-xs text-[#0E315C]/60">Review and customize the email that will be sent to your client</p>
                    </div>
                    <button
                      onClick={() => setIsEditingEmail(!isEditingEmail)}
                      className="flex items-center space-x-2 text-xs px-4 py-2 bg-[#99C0F0]/20 hover:bg-[#99C0F0]/30 text-[#0E315C] rounded-lg transition-colors duration-200 font-medium"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isEditingEmail ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        )}
                      </svg>
                      <span>{isEditingEmail ? 'Preview' : 'Edit'}</span>
                    </button>
                  </div>

                  {isEditingEmail ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#0E315C] mb-2">Subject Line</label>
                        <input
                          type="text"
                          value={emailDraft.subject || `Document Request - ${caseInfo.firstName} ${caseInfo.lastName}`}
                          onChange={(e) => setEmailDraft(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full px-4 py-3 text-sm border border-[#C1D9F6]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/20 focus:border-[#99C0F0] bg-white/50"
                          placeholder="Enter email subject..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0E315C] mb-2">Email Message</label>
                        <textarea
                          value={emailDraft.content || getDefaultEmailContent()}
                          onChange={(e) => setEmailDraft(prev => ({ ...prev, content: e.target.value }))}
                          rows={12}
                          className="w-full px-4 py-3 text-sm border border-[#C1D9F6]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/20 focus:border-[#99C0F0] resize-none bg-white/50 font-mono"
                          placeholder="Enter your message..."
                        />
                      </div>
                      <div className="bg-[#99C0F0]/10 rounded-lg p-4 border border-[#99C0F0]/20">
                        <div className="flex items-start space-x-3">
                          <svg className="w-4 h-4 text-[#99C0F0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-[#0E315C] mb-1">Email Preview</p>
                            <p className="text-xs text-[#0E315C]/70">Click "Preview" to see how this email will appear to your client before sending.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <EmailPreview
                      subject={emailDraft.subject || `Document Request - ${caseInfo.firstName} ${caseInfo.lastName}`}
                      content={emailDraft.content || getDefaultEmailContent()}
                      to={[caseInfo.email]}
                      senderName="Luceron AI"
                      senderType="firm"
                      className="border-0 bg-transparent p-0"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Compact Navigation Bar - Fixed at bottom */}
            <div className="mt-4 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Back Button */}
                <button
                  onClick={() => handleStepTransition(3)}
                  className="group flex items-center space-x-3 px-6 py-3 bg-white/40 backdrop-blur-sm border border-[#C1D9F6]/60 hover:border-[#C1D9F6]/80 hover:bg-white/60 rounded-2xl transition-all duration-300 hover:scale-105 transform hover:shadow-lg shadow-[#C1D9F6]/10"
                >
                  <svg
                    className="w-4 h-4 text-[#0E315C]/60 group-hover:text-[#0E315C] transition-colors duration-300"
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
                  <span className="text-[#0E315C]/70 group-hover:text-[#0E315C] font-light transition-colors duration-300">
                    Back
                  </span>
                </button>

                {/* Center spacer */}
                <div></div>

                {/* Create Case Button */}
                <button
                  onClick={() => {
                    // Here you would typically send the email via API
                    const emailPayload = {
                      to: emailDraft.to.length > 0 ? emailDraft.to : [caseInfo.email],
                      cc: emailDraft.cc,
                      subject: emailDraft.subject || `Document Request - ${caseInfo.firstName} ${caseInfo.lastName}`,
                      content: emailDraft.content || getDefaultEmailContent(),
                      caseInfo,
                      documents: documentSelection.selectedDocuments
                    };

                    console.log("Creating case and sending email:", emailPayload);
                    alert(`Case created successfully! Email sent to ${caseInfo.email}`);

                    // Reset form or navigate away
                    setCreateStep(1);
                    setCreateMethod(null);
                    setCaseInfo({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      caseType: "",
                      priority: "medium",
                      description: "",
                    });
                    documentSelection.setSelectedDocuments([]);
                    setEmailDraft({
                      subject: "",
                      content: "",
                      to: [],
                      cc: []
                    });
                    setIsEditingEmail(false);
                  }}
                  className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#C5BFEE]/90 to-[#99C0F0]/90 hover:from-[#C5BFEE] hover:to-[#99C0F0] text-white rounded-2xl transition-all duration-300 hover:scale-105 transform shadow-lg shadow-[#C5BFEE]/20 hover:shadow-xl hover:shadow-[#C5BFEE]/30 backdrop-blur-sm"
                >
                  <span className="font-light">Create & Send Email</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
