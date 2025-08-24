import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

      <div className="relative z-10 min-h-screen flex items-center max-w-screen-2xl mx-auto">
        {/* Hero section - Left side */}
        <div className="flex-1 pl-8 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-32 2xl:pl-40 pr-6 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <div
            className={`space-y-12 transition-all duration-1000 ease-out ${
              isAnimated
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            {/* Main heading */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl font-extralight text-[#0E315C] leading-none tracking-tight">
                Luceron
              </h1>
              
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-light text-[#0E315C]/90 leading-relaxed">
                  Legal Discovery, Simplified
                </h2>
                <p className="text-lg text-[#0E315C]/70 leading-relaxed max-w-xl font-light">
                  Transform your legal workflow with AI-powered document discovery and intelligent client communication.
                </p>
              </div>

              {/* Elegant divider */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="w-16 h-px bg-gradient-to-r from-[#99C0F0] to-transparent"></div>
                <span className="text-sm text-[#0E315C]/50 font-medium">Trusted by Legal Professionals</span>
              </div>
            </div>

            {/* Security badges - subtly integrated */}
            <div
              className={`space-y-4 transition-all duration-1000 ease-out delay-300 ${
                isAnimated
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm shadow-green-400/30"></div>
                  <span className="text-xs text-[#0E315C]/60 font-medium tracking-wide">SSL SECURED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm shadow-blue-400/30"></div>
                  <span className="text-xs text-[#0E315C]/60 font-medium tracking-wide">SOC 2 COMPLIANT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#99C0F0] rounded-full shadow-sm shadow-[#99C0F0]/30"></div>
                  <span className="text-xs text-[#0E315C]/60 font-medium tracking-wide">ENTERPRISE READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login form - Right side */}
        <div className="flex-shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl pr-8 sm:pr-12 md:pr-16 lg:pr-24 xl:pr-32 2xl:pr-40">
          <div
            className={`relative transition-all duration-1000 ease-out delay-200 ${
              isAnimated
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            {/* Enhanced floating card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl shadow-[#99C0F0]/8 p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 transform hover:scale-[1.01] transition-all duration-700 hover:shadow-[#99C0F0]/12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#0E315C] mb-2 tracking-wide">Welcome</h3>
                  <p className="text-[#0E315C]/60 text-sm sm:text-base lg:text-lg font-light">Sign in to continue</p>
                </div>

                {/* Form fields */}
                <div className="space-y-8">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-0 py-4 lg:py-5 bg-transparent border-0 border-b border-[#C1D9F6]/30 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-0 focus:shadow-none transition-all duration-500 text-lg lg:text-xl font-light group-hover:border-[#C1D9F6]/50"
                      placeholder="Email address"
                      required
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] transition-all duration-500 group-focus-within:w-full"></div>
                  </div>

                  <div className="relative group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-0 py-4 lg:py-5 bg-transparent border-0 border-b border-[#C1D9F6]/30 text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-0 focus:shadow-none transition-all duration-500 text-lg lg:text-xl font-light group-hover:border-[#C1D9F6]/50"
                      placeholder="Password"
                      required
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                </div>

                {/* Enhanced submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 lg:py-5 px-6 lg:px-8 rounded-2xl text-white font-medium lg:font-semibold lg:text-lg transition-all duration-700 transform hover:scale-[1.02] relative overflow-hidden group ${
                    isFormComplete
                      ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-xl shadow-[#99C0F0]/25"
                      : "bg-gradient-to-r from-[#99C0F0]/80 to-[#C5BFEE]/70 shadow-lg shadow-[#99C0F0]/15"
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin w-5 h-5"
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
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </span>
                </button>

                {/* Forgot password */}
                <div className="text-center">
                  <button 
                    type="button" 
                    className="text-[#99C0F0] hover:text-[#0E315C] transition-all duration-300 text-sm font-medium hover:scale-105 transform"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>

              {/* Security footer - elegantly integrated */}
              <div className="mt-8 pt-6 border-t border-[#C1D9F6]/20 text-center">
                <p className="text-xs text-[#0E315C]/50 mb-3 font-light">
                  Protected by enterprise-grade security
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-[#0E315C]/60 font-medium">256-bit SSL</span>
                  </div>
                  <div className="w-px h-3 bg-[#C1D9F6]/30"></div>
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-[#0E315C]/60 font-medium">SOC 2 Type II</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating accent elements */}
            <div className="absolute -top-8 lg:-top-12 -left-8 lg:-left-12 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#99C0F0]/25 to-transparent rounded-full blur-xl opacity-60 animate-float"></div>
            <div className="absolute -bottom-6 lg:-bottom-8 -right-6 lg:-right-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#C5BFEE]/20 to-transparent rounded-full blur-lg opacity-50 animate-float-slow"></div>
            <div className="absolute -top-4 lg:-top-6 -right-4 lg:-right-6 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[#C1D9F6]/30 to-transparent rounded-full blur-md opacity-40 animate-drift"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
