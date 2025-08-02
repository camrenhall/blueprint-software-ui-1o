import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WelcomeLoaderProps {
  userName: string;
}

export default function WelcomeLoader({ userName }: WelcomeLoaderProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'loading' | 'welcome' | 'fadeOut'>('loading');

  useEffect(() => {
    // Stage 1: Loading animation (1.5 seconds)
    const loadingTimer = setTimeout(() => {
      setStage('welcome');
    }, 1500);

    // Stage 2: Welcome message (2 seconds)
    const welcomeTimer = setTimeout(() => {
      setStage('fadeOut');
    }, 3500);

    // Stage 3: Fade out and navigate (1 second)
    const navigateTimer = setTimeout(() => {
      navigate('/menu');
    }, 4500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      {/* Loading stage */}
      {stage === 'loading' && (
        <div
          className="relative z-10 min-h-screen flex items-center justify-center animate-fadeIn"
          style={{
            animation: 'fadeIn 0.8s ease-out'
          }}
        >
          <div className="relative">
            {/* Circular loading spinner */}
            <div className="w-20 h-20 relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-blue-300 rounded-full animate-spin" />

              {/* Inner pulsing circle */}
              <div className="absolute inset-2 bg-gradient-to-br from-blue-400/20 to-white/10 rounded-full animate-pulse" />

              {/* Center dot */}
              <div className="absolute inset-6 bg-gradient-to-br from-white/60 to-blue-200/40 rounded-full" />
            </div>

            {/* Floating particles around spinner */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-2 left-1/2 w-1 h-1 bg-blue-300/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-blue-200/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Welcome stage */}
      {stage === 'welcome' && (
        <div 
          className="relative z-10 min-h-screen flex items-center justify-center animate-fadeIn"
          style={{
            animation: 'fadeIn 0.8s ease-out'
          }}
        >
          <div className="text-center">
            {/* Welcome message */}
            <div className="relative">
              {/* Glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-purple-400/20 blur-2xl scale-150" />
              
              <h1 className="relative text-5xl md:text-7xl font-light text-white tracking-wide">
                <span className="bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
                  Welcome back
                </span>
              </h1>
            </div>
            
            {/* Floating elements around welcome text */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-purple-300/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Fade out stage */}
      {stage === 'fadeOut' && (
        <div
          className="relative z-10 min-h-screen flex items-center justify-center animate-fadeOut"
          style={{
            animation: 'fadeOut 1s ease-out'
          }}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-light tracking-wide">
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent opacity-50">
                Welcome back
              </span>
            </h1>
          </div>
        </div>
      )}

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full" />
    </div>
  );
}
