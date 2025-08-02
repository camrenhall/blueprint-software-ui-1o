import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloudBackground from './CloudBackground';

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
      <CloudBackground />
      
      {/* Loading stage */}
      {stage === 'loading' && (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            {/* Floating cloud loader */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto relative">
                {/* Main cloud shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-white/20 rounded-full blur-md animate-pulse" />
                <div className="absolute top-2 left-2 w-16 h-16 bg-gradient-to-br from-white/40 to-blue-200/30 rounded-full blur-sm animate-float" />
                <div className="absolute top-4 right-2 w-12 h-12 bg-gradient-to-br from-blue-100/50 to-white/30 rounded-full blur-sm animate-float" style={{ animationDelay: '0.5s' }} />
                
                {/* Floating particles around cloud */}
                <div className="absolute -top-2 left-8 w-2 h-2 bg-blue-300/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-6 -left-2 w-1.5 h-1.5 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-200/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
              </div>
            </div>
            
            {/* Loading text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-white/90 tracking-wide">
                Connecting to the cloud...
              </h2>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
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
              
              <h1 className="relative text-5xl md:text-7xl font-light text-white mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
                  Welcome back,
                </span>
              </h1>
              <h2 className="relative text-4xl md:text-6xl font-light tracking-wide">
                <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                  {userName}
                </span>
              </h2>
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
            <h2 className="text-3xl font-light tracking-wide">
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent opacity-50">
                {userName}
              </span>
            </h2>
          </div>
        </div>
      )}

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full" />
    </div>
  );
}
