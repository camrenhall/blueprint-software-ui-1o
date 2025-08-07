import { useMemo } from "react";

export default function CloudBackground() {
  // Generate stable particle positions that won't change on re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-100 to-purple-100" />

      {/* Enhanced purple/blue accent layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-100/20 to-transparent" />

      {/* Animated clouds */}
      <div className="absolute inset-0">
        {/* Cloud 1 */}
        <div className="absolute top-20 left-10 w-96 h-48 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-8 left-12 w-20 h-20 bg-blue-100/50 rounded-full blur-xl animate-float-slow" />
            <div
              className="absolute top-4 left-24 w-32 h-24 bg-purple-100/60 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-12 left-40 w-16 h-16 bg-indigo-100/70 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>

        {/* Cloud 2 */}
        <div className="absolute top-40 right-20 w-80 h-40 opacity-8">
          <div className="relative w-full h-full">
            <div className="absolute top-6 left-8 w-24 h-24 bg-blue-100/50 rounded-full blur-xl animate-float" />
            <div
              className="absolute top-2 left-20 w-28 h-20 bg-white/60 rounded-full blur-xl animate-float"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute top-8 left-36 w-20 h-20 bg-indigo-100/50 rounded-full blur-xl animate-float"
              style={{ animationDelay: "3s" }}
            />
          </div>
        </div>

        {/* Cloud 3 */}
        <div className="absolute bottom-32 left-1/4 w-72 h-36 opacity-6">
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-6 w-18 h-18 bg-purple-100/40 rounded-full blur-xl animate-float-slow" />
            <div
              className="absolute top-0 left-16 w-24 h-18 bg-white/50 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "2.5s" }}
            />
            <div
              className="absolute top-6 left-28 w-16 h-16 bg-blue-200/40 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "4s" }}
            />
          </div>
        </div>

        {/* Cirrus cloud streaks */}
        <div className="absolute inset-0">
          {/* Horizontal cirrus streaks */}
          <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent animate-float-slow opacity-60"
               style={{ animationDelay: '0s', animationDuration: '12s' }} />
          <div className="absolute top-1/3 right-0 w-2/3 h-0.5 bg-gradient-to-l from-transparent via-purple-200/30 to-transparent animate-float"
               style={{ animationDelay: '2s', animationDuration: '15s' }} />
          <div className="absolute top-2/3 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-200/35 to-transparent animate-float-slow"
               style={{ animationDelay: '4s', animationDuration: '18s' }} />

          {/* Diagonal cirrus streaks */}
          <div className="absolute top-1/6 left-1/3 w-80 h-0.5 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent transform rotate-12 animate-float"
               style={{ animationDelay: '1s', animationDuration: '14s' }} />
          <div className="absolute top-3/4 right-1/4 w-60 h-0.5 bg-gradient-to-l from-transparent via-purple-300/20 to-transparent transform -rotate-6 animate-float-slow"
               style={{ animationDelay: '3s', animationDuration: '16s' }} />

          {/* Curved cirrus wisps */}
          <div className="absolute top-1/2 left-1/6 w-96 h-8 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent rounded-full blur-sm animate-float opacity-50"
               style={{ animationDelay: '5s', animationDuration: '20s' }} />
          <div className="absolute top-1/5 right-1/3 w-72 h-6 bg-gradient-to-l from-transparent via-purple-200/25 to-transparent rounded-full blur-sm animate-drift opacity-40"
               style={{ animationDelay: '7s', animationDuration: '22s' }} />
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
              }}
            />
          ))}
        </div>

        {/* Additional purple accent particles */}
        <div className="absolute inset-0">
          {particles.slice(0, 8).map((particle, index) => (
            <div
              key={`purple-${particle.id}`}
              className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full opacity-25 animate-float-slow"
              style={{
                left: `${(particle.left + 20) % 100}%`,
                top: `${(particle.top + 30) % 100}%`,
                animationDelay: `${particle.animationDelay + 2}s`,
                animationDuration: `${particle.animationDuration + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/20 via-transparent to-white/10" />
    </div>
  );
}
