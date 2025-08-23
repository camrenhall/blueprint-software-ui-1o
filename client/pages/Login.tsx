import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-500 ease-out ${
        isTransitioning
          ? "opacity-0 transform scale-105"
          : "opacity-100 transform scale-100"
      }`}
    >
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Hero section - Left side */}
        <div className="flex-1 pl-20 md:pl-32 lg:pl-40 pr-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-light text-[#0E315C] mb-6 tracking-wide leading-tight">
              Luceron AI
            </h1>
            <p className="text-xl md:text-2xl text-[#0E315C] mb-8 leading-relaxed opacity-90">
              Streamline your legal discovery process with intelligent
              automation. Luceron simplifies document collection, client
              follow-ups, and discovery auditing.
            </p>
            <div className="space-y-4 text-[#0E315C]">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#99C0F0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Automated document collection</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#C5BFEE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span>Intelligent client follow-ups</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#99C0F0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Comprehensive discovery auditing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login form - Right side */}
        <div className="flex-shrink-0 w-full max-w-lg pr-20 md:pr-32 lg:pr-40">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#C1D9F6]/60 shadow-2xl p-10 shadow-[#99C0F0]/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-[#0E315C] mb-2">
                Sign In
              </h2>
              <p className="text-[#0E315C]/70">Access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0E315C] mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-[#C1D9F6] rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-[#0E315C]/40"
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
                    className="w-full px-4 py-3 bg-white/80 border border-[#C1D9F6] rounded-xl text-[#0E315C] placeholder-[#0E315C]/50 focus:outline-none focus:ring-2 focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <svg
                    className="absolute right-3 top-3.5 w-5 h-5 text-[#0E315C]/40"
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

              {/* Forgot password */}
              <div className="flex justify-end text-sm">
                <button
                  type="button"
                  className="text-[#99C0F0] hover:text-[#0E315C] transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#99C0F0]/80 to-[#C5BFEE]/70 backdrop-blur-md border border-[#99C0F0]/60 hover:border-[#99C0F0]/90 hover:from-[#99C0F0]/90 hover:to-[#C5BFEE]/80 hover:shadow-xl hover:shadow-[#99C0F0]/25 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-[#99C0F0]/80 disabled:hover:to-[#C5BFEE]/70 disabled:hover:border-[#99C0F0]/60 disabled:hover:shadow-none disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
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
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Elegant corner accents with new palette */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C1D9F6]/30 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#C5BFEE]/30 to-transparent rounded-tl-full" />

      {/* Additional floating accents */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-[#99C0F0]/20 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-1/3 left-1/5 w-20 h-20 bg-gradient-to-br from-[#C5BFEE]/15 to-transparent rounded-full blur-xl" />
    </div>
  );
}
