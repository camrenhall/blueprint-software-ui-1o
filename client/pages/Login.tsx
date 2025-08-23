import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudBackground from "@/components/CloudBackground";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-500 ease-out ${
        isTransitioning
          ? "opacity-0 transform scale-105"
          : "opacity-100 transform scale-100"
      }`}
    >
      {/* Atmospheric Background */}
      <CloudBackground />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {/* Centered Login Card */}
        <div className="w-full max-w-md relative">
          {/* Enhanced Background Gradient */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-[#C1D9F6]/15 to-[#99C0F0]/10 blur-2xl" />
          <div className="absolute inset-0 rounded-3xl bg-white/20 backdrop-blur-sm" />

          {/* Main Login Card */}
          <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl border border-[#C1D9F6]/60 shadow-2xl shadow-[#99C0F0]/20 p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-[#0E315C] mb-3 tracking-wide">
                Luceron AI
              </h1>
              <h2 className="text-xl font-light text-[#0E315C] mb-2">
                Welcome Back
              </h2>
              <p className="text-[#0E315C]/70 text-sm leading-relaxed">
                Sign in to access your legal discovery workspace
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0E315C] mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#C1D9F6]/60 rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] focus:bg-white transition-all duration-200 shadow-sm"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-[#0E315C]/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#0E315C] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#C1D9F6]/60 rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] focus:bg-white transition-all duration-200 shadow-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-[#0E315C]/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#99C0F0] bg-white/80 border-[#C1D9F6]/60 rounded focus:ring-[#99C0F0]/50 focus:ring-2"
                  />
                  <span className="ml-2 text-[#0E315C]/70">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-[#99C0F0] hover:text-[#0E315C] transition-colors duration-200 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full relative overflow-hidden bg-gradient-to-r ${
                  isFormComplete 
                    ? "from-[#99C0F0] to-[#C5BFEE] border-[#99C0F0] shadow-xl shadow-[#99C0F0]/30" 
                    : "from-[#99C0F0]/75 to-[#C5BFEE]/65 border-[#99C0F0]/50 shadow-lg shadow-[#99C0F0]/20"
                } backdrop-blur-md border text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#99C0F0]/40 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
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
                    "Sign In to Luceron"
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#C1D9F6]/30 text-center">
              <p className="text-xs text-[#0E315C]/60">
                Secure legal discovery platform
              </p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#99C0F0] rounded-full opacity-60"></div>
                  <span className="text-xs text-[#0E315C]/50">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#C5BFEE] rounded-full opacity-60"></div>
                  <span className="text-xs text-[#0E315C]/50">Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#C1D9F6] rounded-full opacity-60"></div>
                  <span className="text-xs text-[#0E315C]/50">Efficient</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating accent elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#99C0F0]/30 to-transparent rounded-full blur-xl opacity-60 animate-float"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-[#C5BFEE]/25 to-transparent rounded-full blur-lg opacity-50 animate-float-slow"></div>
        </div>
      </div>
    </div>
  );
}
