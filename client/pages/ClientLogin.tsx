import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function ClientLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger entrance animation and decode email from URL
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    
    // Get email from URL parameter (encoded but not encrypted)
    const encodedEmail = searchParams.get('email');
    if (encodedEmail) {
      try {
        const decodedEmail = decodeURIComponent(encodedEmail);
        setEmail(decodedEmail);
      } catch (error) {
        console.warn('Failed to decode email from URL parameter');
      }
    }
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication - in production, this would call a real API
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(true);

      // Store client session info
      localStorage.setItem('clientSession', JSON.stringify({
        email,
        loginTime: new Date().toISOString()
      }));

      // Brief transition delay for fluid experience
      setTimeout(() => {
        navigate("/client/upload");
      }, 400);
    }, 800);
  };

  const isFormComplete = email.trim().length > 0 && password.trim().length > 2;

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-700 ease-out ${
        isTransitioning
          ? "opacity-0 transform scale-105"
          : "opacity-100 transform scale-100"
      }`}
    >
      {/* Ethereal floating elements for client-specific aesthetic */}
      <div className="absolute top-20 left-12 w-28 h-28 bg-[#99C0F0]/6 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-24 right-16 w-32 h-32 bg-[#C5BFEE]/8 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-1/3 left-1/5 w-20 h-20 bg-[#C1D9F6]/7 rounded-full blur-xl animate-drift"></div>
      <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-[#99C0F0]/5 rounded-full blur-2xl animate-float"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div
            className={`transition-all duration-1000 ease-out ${
              isAnimated
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-[#0E315C] mb-2 tracking-wide">
                Document Upload
              </h1>
              <p className="text-[#0E315C]/70 text-lg font-light mb-4">
                Secure client portal
              </p>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#99C0F0]"></div>
                <div className="w-2 h-2 bg-[#99C0F0] rounded-full"></div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#99C0F0]"></div>
              </div>
            </div>

            {/* Login Form Card */}
            <GlassPanel variant="heavy" radius="lg" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-light text-[#0E315C] mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-[#0E315C]/60 text-sm">
                    Please enter your password to continue
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-[#0E315C]/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-2 focus:ring-[#99C0F0]/20 transition-all duration-300 text-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-[#0E315C]/70 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl text-[#0E315C] placeholder-[#0E315C]/40 focus:outline-none focus:border-[#99C0F0] focus:ring-2 focus:ring-[#99C0F0]/20 transition-all duration-300 text-sm"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormComplete}
                  className={`w-full py-3 px-6 rounded-xl text-white font-medium transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group ${
                    isFormComplete
                      ? "bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] shadow-lg shadow-[#99C0F0]/25 hover:shadow-xl hover:shadow-[#99C0F0]/30"
                      : "bg-gradient-to-r from-[#99C0F0]/60 to-[#C5BFEE]/50 shadow-md cursor-not-allowed"
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6l4-2-4-2z"
                          />
                        </svg>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      "Access Upload Portal"
                    )}
                  </span>
                </button>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-gradient-to-r from-[#99C0F0]/10 to-[#C5BFEE]/10 rounded-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-[#99C0F0]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#0E315C]/70 font-medium">
                        Your documents are protected with enterprise-grade encryption
                      </p>
                    </div>
                  </div>
                </div>

                {/* Help Text */}
                <div className="text-center">
                  <p className="text-xs text-[#0E315C]/50">
                    Having trouble? Contact your legal representative for assistance.
                  </p>
                </div>
              </form>
            </GlassPanel>

            {/* Floating accent elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#99C0F0]/30 to-transparent rounded-full blur-lg opacity-60 animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-[#C5BFEE]/25 to-transparent rounded-full blur-md opacity-50 animate-float-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
