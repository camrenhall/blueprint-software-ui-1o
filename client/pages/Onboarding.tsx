import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface OnboardingData {
  name: string;
  role: string;
  company: string;
  experience: string;
  preferences: {
    notifications: boolean;
    autoSync: boolean;
    theme: string;
  };
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    role: "",
    company: "",
    experience: "",
    preferences: {
      notifications: true,
      autoSync: true,
      theme: "system",
    },
  });

  const totalSteps = 5;

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const updateData = (field: keyof OnboardingData | string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof OnboardingData] as any),
          [child]: value,
        },
      }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const completeOnboarding = () => {
    // Save onboarding data (could be to localStorage, API, etc.)
    localStorage.setItem('onboardingData', JSON.stringify(data));
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/menu");
    }, 400);
  };

  const getStepValidation = () => {
    switch (currentStep) {
      case 1:
        return data.name.trim().length > 1;
      case 2:
        return data.role !== "";
      case 3:
        return data.company.trim().length > 1;
      case 4:
        return data.experience !== "";
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-white via-[#C1D9F6]/8 to-[#99C0F0]/4 transition-all duration-700 ease-out ${
        isTransitioning
          ? "opacity-0 transform scale-105"
          : "opacity-100 transform scale-100"
      }`}
    >
      {/* Ethereal floating elements */}
      <div className="absolute top-28 left-10 w-32 h-32 bg-[#99C0F0]/4 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-[#C5BFEE]/6 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#C1D9F6]/5 rounded-full blur-xl animate-drift"></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#99C0F0]/3 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/6 w-14 h-14 bg-[#C5BFEE]/4 rounded-full blur-xl animate-drift"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 sm:px-8">
        <div className="w-full max-w-2xl">
          <div
            className={`transition-all duration-1000 ease-out ${
              isAnimated
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#0E315C]/60">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-[#0E315C]/60">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-[#C1D9F6]/30 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl shadow-[#99C0F0]/8 p-8 sm:p-12 transform hover:scale-[1.01] transition-all duration-700 hover:shadow-[#99C0F0]/12">
              
              {/* Step 1: Welcome & Name */}
              {currentStep === 1 && <WelcomeStep data={data} updateData={updateData} />}
              
              {/* Step 2: Role Selection */}
              {currentStep === 2 && <RoleStep data={data} updateData={updateData} />}
              
              {/* Step 3: Company Information */}
              {currentStep === 3 && <CompanyStep data={data} updateData={updateData} />}
              
              {/* Step 4: Experience Level */}
              {currentStep === 4 && <ExperienceStep data={data} updateData={updateData} />}
              
              {/* Step 5: Final Setup */}
              {currentStep === 5 && <FinalStep data={data} updateData={updateData} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#C1D9F6]/20">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="text-[#0E315C]/60 hover:text-[#0E315C] hover:bg-[#C1D9F6]/20 disabled:opacity-30"
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!getStepValidation()}
                    className={`px-8 py-3 rounded-2xl text-white font-medium transition-all duration-700 transform hover:scale-[1.02] ${
                      getStepValidation()
                        ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-xl shadow-[#99C0F0]/25"
                        : "bg-gradient-to-r from-[#99C0F0]/60 to-[#C5BFEE]/50 shadow-lg shadow-[#99C0F0]/10"
                    }`}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={completeOnboarding}
                    className="px-8 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-xl shadow-[#99C0F0]/25 transition-all duration-700 transform hover:scale-[1.02]"
                  >
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>

            {/* Enhanced floating accent elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-[#99C0F0]/25 to-transparent rounded-full blur-xl opacity-60 animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#C5BFEE]/20 to-transparent rounded-full blur-lg opacity-50 animate-float-slow"></div>
            <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-[#C1D9F6]/30 to-transparent rounded-full blur-md opacity-40 animate-drift"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
const WelcomeStep = ({ data, updateData }: { data: OnboardingData; updateData: (field: string, value: any) => void }) => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-extralight text-[#0E315C] leading-none tracking-tight">
        Welcome to Luceron
      </h1>
      <p className="text-lg text-[#0E315C]/70 font-light max-w-md mx-auto">
        Let's personalize your experience to help you get the most out of our platform.
      </p>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0E315C]/80">
          What should we call you?
        </label>
        <div className="relative group">
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('name', e.target.value)}
            className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#C1D9F6]/30 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-0 focus:shadow-none transition-all duration-500 text-lg font-light group-hover:border-[#C1D9F6]/50"
            placeholder="Enter your full name"
            required
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] transition-all duration-500 group-focus-within:w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const RoleStep = ({ data, updateData }: { data: OnboardingData; updateData: (field: string, value: any) => void }) => {
  const roles = [
    { id: 'attorney', label: 'Attorney / Lawyer', description: 'Legal practitioner representing clients' },
    { id: 'paralegal', label: 'Paralegal', description: 'Legal assistant supporting attorneys' },
    { id: 'legal-admin', label: 'Legal Administrator', description: 'Managing legal office operations' },
    { id: 'compliance', label: 'Compliance Officer', description: 'Ensuring regulatory compliance' },
    { id: 'other', label: 'Other', description: 'Different role in legal field' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-light text-[#0E315C] leading-none">
          What's your role?
        </h2>
        <p className="text-lg text-[#0E315C]/70 font-light max-w-md mx-auto">
          This helps us customize your workflow and recommend the best features for you.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => updateData('role', role.id)}
            className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 transform hover:scale-[1.02] ${
              data.role === role.id
                ? 'bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 border-[#99C0F0]/50 shadow-lg shadow-[#99C0F0]/10'
                : 'bg-white/50 border-[#C1D9F6]/30 hover:border-[#99C0F0]/30 hover:bg-white/70'
            }`}
          >
            <div className="space-y-1">
              <div className="font-medium text-[#0E315C]">{role.label}</div>
              <div className="text-sm text-[#0E315C]/60">{role.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const CompanyStep = ({ data, updateData }: { data: OnboardingData; updateData: (field: string, value: any) => void }) => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl md:text-4xl font-light text-[#0E315C] leading-none">
        Company Information
      </h2>
      <p className="text-lg text-[#0E315C]/70 font-light max-w-md mx-auto">
        Tell us about your organization to help us tailor your experience.
      </p>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#0E315C]/80">
          Company or Firm Name
        </label>
        <div className="relative group">
          <input
            type="text"
            value={data.company}
            onChange={(e) => updateData('company', e.target.value)}
            className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#C1D9F6]/30 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-0 focus:shadow-none transition-all duration-500 text-lg font-light group-hover:border-[#C1D9F6]/50"
            placeholder="Enter your company name"
            required
          />
          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] transition-all duration-500 group-focus-within:w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const ExperienceStep = ({ data, updateData }: { data: OnboardingData; updateData: (field: string, value: any) => void }) => {
  const experiences = [
    { id: 'beginner', label: 'New to Legal Tech', description: 'Just getting started with legal technology' },
    { id: 'intermediate', label: 'Some Experience', description: '1-3 years using legal software' },
    { id: 'experienced', label: 'Experienced User', description: '3+ years with various legal tools' },
    { id: 'expert', label: 'Technology Expert', description: 'Advanced user comfortable with new tech' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-light text-[#0E315C] leading-none">
          Experience Level
        </h2>
        <p className="text-lg text-[#0E315C]/70 font-light max-w-md mx-auto">
          How familiar are you with legal technology and document management systems?
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <button
            key={exp.id}
            onClick={() => updateData('experience', exp.id)}
            className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 transform hover:scale-[1.02] ${
              data.experience === exp.id
                ? 'bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 border-[#99C0F0]/50 shadow-lg shadow-[#99C0F0]/10'
                : 'bg-white/50 border-[#C1D9F6]/30 hover:border-[#99C0F0]/30 hover:bg-white/70'
            }`}
          >
            <div className="space-y-1">
              <div className="font-medium text-[#0E315C]">{exp.label}</div>
              <div className="text-sm text-[#0E315C]/60">{exp.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const FinalStep = ({ data, updateData }: { data: OnboardingData; updateData: (field: string, value: any) => void }) => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl md:text-4xl font-light text-[#0E315C] leading-none">
        Final Setup
      </h2>
      <p className="text-lg text-[#0E315C]/70 font-light max-w-md mx-auto">
        Configure your preferences to optimize your workflow.
      </p>
    </div>

    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-[#C1D9F6]/30 cursor-pointer transition-all duration-300 hover:bg-white/70 hover:border-[#99C0F0]/30">
          <div>
            <div className="font-medium text-[#0E315C]">Email Notifications</div>
            <div className="text-sm text-[#0E315C]/60">Receive updates on document processing and case progress</div>
          </div>
          <input
            type="checkbox"
            checked={data.preferences.notifications}
            onChange={(e) => updateData('preferences.notifications', e.target.checked)}
            className="w-5 h-5 text-[#99C0F0] bg-white border-[#C1D9F6]/50 rounded focus:ring-[#99C0F0] focus:ring-2"
          />
        </label>

        <label className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-[#C1D9F6]/30 cursor-pointer transition-all duration-300 hover:bg-white/70 hover:border-[#99C0F0]/30">
          <div>
            <div className="font-medium text-[#0E315C]">Auto-Sync Documents</div>
            <div className="text-sm text-[#0E315C]/60">Automatically sync documents across all your devices</div>
          </div>
          <input
            type="checkbox"
            checked={data.preferences.autoSync}
            onChange={(e) => updateData('preferences.autoSync', e.target.checked)}
            className="w-5 h-5 text-[#99C0F0] bg-white border-[#C1D9F6]/50 rounded focus:ring-[#99C0F0] focus:ring-2"
          />
        </label>
      </div>

      <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#99C0F0]/5 to-[#C5BFEE]/5 border border-[#99C0F0]/20">
        <div className="text-[#0E315C] font-medium mb-2">🎉 You're all set!</div>
        <div className="text-sm text-[#0E315C]/70">
          Welcome aboard, {data.name}! Let's start exploring Luceron together.
        </div>
      </div>
    </div>
  </div>
);
