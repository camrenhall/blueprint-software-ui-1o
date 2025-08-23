import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudBackground from "@/components/CloudBackground";

type LoginDesign = "ethereal" | "dynamic" | "corporate";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<LoginDesign>("ethereal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo: Allow any login to work
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(true);

      // Brief transition delay for fluid experience
      setTimeout(() => {
        navigate("/menu");
      }, 400);
    }, 600);
  };

  // Check if both fields are filled for enhanced button styling
  const isFormComplete = email.trim().length > 0 && password.trim().length > 2;

  // Design 1: Ethereal Minimalist
  const EtherealDesign = () => (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-white via-[#C1D9F6]/10 to-[#99C0F0]/5">
      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#99C0F0]/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-[#C5BFEE]/8 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#C1D9F6]/6 rounded-full blur-xl animate-drift"></div>

      <div className="relative z-10 min-h-screen flex items-center">
        {/* Hero section - Left side */}
        <div className="flex-1 pl-16 md:pl-24 lg:pl-32 pr-8 max-w-2xl">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-extralight text-[#0E315C] leading-none tracking-tight">
              Luceron
            </h1>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-[#0E315C]/90 leading-relaxed">
                Legal Discovery, Simplified
              </h2>
              <p className="text-lg text-[#0E315C]/70 leading-relaxed max-w-xl font-light">
                Transform your legal workflow with AI-powered document discovery and intelligent client communication.
              </p>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="w-12 h-px bg-gradient-to-r from-[#99C0F0] to-transparent"></div>
              <span className="text-sm text-[#0E315C]/50 font-medium">Trusted by Legal Professionals</span>
            </div>
          </div>
        </div>

        {/* Login form - Right side */}
        <div className="flex-shrink-0 w-full max-w-md pr-16 md:pr-24 lg:pr-32">
          <div className="relative">
            {/* Floating card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl shadow-[#99C0F0]/10 p-12 transform hover:scale-[1.01] transition-all duration-700">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-[#0E315C] mb-2">Welcome</h3>
                  <p className="text-[#0E315C]/60 text-sm">Sign in to continue</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#C1D9F6]/40 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] transition-all duration-300 text-lg font-light"
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#C1D9F6]/40 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] transition-all duration-300 text-lg font-light"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-2xl text-white font-medium transition-all duration-500 transform hover:scale-[1.02] ${
                    isFormComplete
                      ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-xl shadow-[#99C0F0]/30"
                      : "bg-gradient-to-r from-[#99C0F0]/80 to-[#C5BFEE]/70 shadow-lg shadow-[#99C0F0]/20"
                  }`}
                >
                  {isLoading ? "Signing In..." : "Continue"}
                </button>

                <div className="text-center">
                  <button type="button" className="text-[#99C0F0] hover:text-[#0E315C] transition-colors text-sm font-medium">
                    Forgot password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Design 2: Dynamic Gradient
  const DynamicDesign = () => (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#99C0F0]/20 via-[#C5BFEE]/15 to-[#C1D9F6]/25"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0E315C]/5 via-transparent to-[#99C0F0]/10"></div>
      
      {/* Animated elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-[#99C0F0]/30 to-[#C5BFEE]/20 rounded-full blur-2xl animate-drift"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-32 bg-gradient-to-r from-[#C5BFEE]/25 to-[#C1D9F6]/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-[#C1D9F6]/20 to-[#99C0F0]/15 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        {/* Hero section - Left side */}
        <div className="flex-1 pl-20 md:pl-32 lg:pl-40 pr-8">
          <div className="max-w-2xl space-y-10">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-[#99C0F0]/30">
                <span className="text-[#0E315C] font-medium text-sm">AI-Powered Legal Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-[#0E315C] leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] bg-clip-text text-transparent">
                  Legal Discovery
                </span>
              </h1>
              <p className="text-xl text-[#0E315C]/80 leading-relaxed">
                Streamline document collection, automate client follow-ups, and accelerate your discovery process with intelligent AI assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-[#0E315C] font-medium">AI Document Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#C5BFEE] to-[#C1D9F6] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[#0E315C] font-medium">Secure & Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login form - Right side */}
        <div className="flex-shrink-0 w-full max-w-lg pr-20 md:pr-32 lg:pr-40">
          <div className="relative">
            {/* Diagonal background element */}
            <div className="absolute -inset-8 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm transform rotate-2 rounded-3xl"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl shadow-[#99C0F0]/20 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#0E315C] mb-2">Get Started</h3>
                  <p className="text-[#0E315C]/70">Access your workspace</p>
                </div>

                <div className="space-y-5">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-white/80 border-2 border-[#C1D9F6]/40 rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:border-[#99C0F0] focus:bg-white transition-all duration-300"
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-white/80 border-2 border-[#C1D9F6]/40 rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:border-[#99C0F0] focus:bg-white transition-all duration-300"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
                    isFormComplete
                      ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-xl shadow-[#99C0F0]/40"
                      : "bg-gradient-to-r from-[#99C0F0]/80 to-[#C5BFEE]/70 shadow-lg shadow-[#99C0F0]/25"
                  }`}
                >
                  {isLoading ? "Launching..." : "Launch Platform"}
                </button>

                <div className="flex items-center justify-between text-sm pt-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-[#99C0F0] bg-white border-[#C1D9F6]/60 rounded focus:ring-[#99C0F0]" />
                    <span className="ml-2 text-[#0E315C]/70">Remember me</span>
                  </label>
                  <button type="button" className="text-[#99C0F0] hover:text-[#0E315C] transition-colors font-medium">
                    Need help?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Design 3: Professional Corporate
  const CorporateDesign = () => (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <CloudBackground />
      
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Hero section - Left side */}
        <div className="flex-1 pl-20 md:pl-32 lg:pl-40 pr-12">
          <div className="max-w-2xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-[#0E315C]/5 rounded-full border border-[#0E315C]/10">
                  <div className="w-2 h-2 bg-[#99C0F0] rounded-full mr-2"></div>
                  <span className="text-[#0E315C] font-semibold text-sm">Enterprise Legal Platform</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-semibold text-[#0E315C] leading-tight tracking-tight">
                  Luceron AI
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-medium text-[#0E315C]/80 leading-relaxed">
                  Professional Legal Discovery Solutions
                </h2>
                
                <p className="text-lg text-[#0E315C]/70 leading-relaxed">
                  Comprehensive document management, intelligent workflow automation, and advanced analytics for modern legal practices.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-6">
                <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#C1D9F6]/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#99C0F0] to-[#C5BFEE] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0E315C] mb-1">Document Intelligence</h4>
                    <p className="text-[#0E315C]/70 text-sm">AI-powered document analysis and categorization</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#C1D9F6]/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C5BFEE] to-[#C1D9F6] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0E315C] mb-1">Client Management</h4>
                    <p className="text-[#0E315C]/70 text-sm">Streamlined communication and follow-up automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login form - Right side */}
        <div className="flex-shrink-0 w-full max-w-md pr-20 md:pr-32 lg:pr-40">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-[#C1D9F6]/60 shadow-2xl shadow-[#99C0F0]/15 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0E315C] to-[#0E315C]/90 px-8 py-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-1">Access Portal</h3>
              <p className="text-white/80 text-sm">Sign in to your account</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0E315C] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#C1D9F6]/60 rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all duration-200"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0E315C] mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#C1D9F6]/60 rounded-lg text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-[#99C0F0] bg-white border-[#C1D9F6]/60 rounded focus:ring-[#99C0F0]" />
                    <span className="ml-2 text-[#0E315C]/70">Remember me</span>
                  </label>
                  <button type="button" className="text-[#99C0F0] hover:text-[#0E315C] transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-[1.01] ${
                    isFormComplete
                      ? "bg-gradient-to-r from-[#0E315C] to-[#0E315C]/90 shadow-lg shadow-[#0E315C]/25"
                      : "bg-gradient-to-r from-[#0E315C]/80 to-[#0E315C]/70 shadow-md shadow-[#0E315C]/15"
                  }`}
                >
                  {isLoading ? "Authenticating..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#C1D9F6]/30 text-center">
                <p className="text-xs text-[#0E315C]/60 mb-2">Secured by enterprise-grade encryption</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-[#0E315C]/50">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-[#0E315C]/50">SOC 2 Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const designs = {
    ethereal: EtherealDesign,
    dynamic: DynamicDesign,
    corporate: CorporateDesign,
  };

  const DesignComponent = designs[currentDesign];

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isTransitioning
          ? "opacity-0 transform scale-105"
          : "opacity-100 transform scale-100"
      }`}
    >
      {/* Design Switcher */}
      <div className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#C1D9F6]/40 shadow-lg shadow-[#99C0F0]/10 p-2">
        <div className="flex space-x-1">
          {(["ethereal", "dynamic", "corporate"] as LoginDesign[]).map((design) => (
            <button
              key={design}
              onClick={() => setCurrentDesign(design)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                currentDesign === design
                  ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] text-white shadow-md"
                  : "text-[#0E315C]/70 hover:bg-[#C1D9F6]/20"
              }`}
            >
              {design === "ethereal" && "Ethereal"}
              {design === "dynamic" && "Dynamic"}
              {design === "corporate" && "Corporate"}
            </button>
          ))}
        </div>
      </div>

      <DesignComponent />
    </div>
  );
}
