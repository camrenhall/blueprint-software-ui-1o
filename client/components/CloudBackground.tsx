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
          <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent animate-drift opacity-80"
               style={{ animationDelay: '0s', animationDuration: '8s' }} />
          <div className="absolute top-1/3 right-0 w-2/3 h-1.5 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent animate-float"
               style={{ animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-2/3 left-1/4 w-1/2 h-2 bg-gradient-to-r from-transparent via-indigo-300/55 to-transparent animate-drift"
               style={{ animationDelay: '4s', animationDuration: '12s' }} />

          {/* Diagonal cirrus streaks */}
          <div className="absolute top-1/6 left-1/3 w-80 h-1 bg-gradient-to-r from-transparent via-blue-400/45 to-transparent transform rotate-12 animate-float opacity-70"
               style={{ animationDelay: '1s', animationDuration: '9s' }} />
          <div className="absolute top-3/4 right-1/4 w-60 h-1 bg-gradient-to-l from-transparent via-purple-400/40 to-transparent transform -rotate-6 animate-drift opacity-65"
               style={{ animationDelay: '3s', animationDuration: '11s' }} />

          {/* Curved cirrus wisps */}
          <div className="absolute top-1/2 left-1/6 w-96 h-12 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent rounded-full blur-sm animate-float opacity-70"
               style={{ animationDelay: '5s', animationDuration: '13s' }} />
          <div className="absolute top-1/5 right-1/3 w-72 h-10 bg-gradient-to-l from-transparent via-purple-300/45 to-transparent rounded-full blur-sm animate-drift opacity-60"
               style={{ animationDelay: '7s', animationDuration: '15s' }} />

          {/* Additional flowing streaks */}
          <div className="absolute top-1/8 left-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent transform rotate-45 animate-float opacity-55"
               style={{ animationDelay: '6s', animationDuration: '14s' }} />
          <div className="absolute bottom-1/4 right-1/6 w-64 h-1 bg-gradient-to-l from-transparent via-blue-300/35 to-transparent transform -rotate-12 animate-drift opacity-50"
               style={{ animationDelay: '8s', animationDuration: '16s' }} />
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle, index) => (
            <div
              key={particle.id}
              className={`absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 ${
                index % 3 === 0 ? 'animate-drift' : index % 2 === 0 ? 'animate-float' : 'animate-float-slow'
              }`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration + (index % 2)}s`,
              }}
            />
          ))}
        </div>

        {/* Additional purple accent particles */}
        <div className="absolute inset-0">
          {particles.slice(0, 12).map((particle, index) => (
            <div
              key={`purple-${particle.id}`}
              className={`absolute w-2 h-2 bg-purple-300 rounded-full opacity-45 ${
                index % 2 === 0 ? 'animate-drift' : 'animate-float-slow'
              }`}
              style={{
                left: `${(particle.left + 25) % 100}%`,
                top: `${(particle.top + 35) % 100}%`,
                animationDelay: `${particle.animationDelay + 1}s`,
                animationDuration: `${particle.animationDuration + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Indigo accent particles for extra depth */}
        <div className="absolute inset-0">
          {particles.slice(0, 6).map((particle, index) => (
            <div
              key={`indigo-${particle.id}`}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-drift"
              style={{
                left: `${(particle.left + 50) % 100}%`,
                top: `${(particle.top + 60) % 100}%`,
                animationDelay: `${particle.animationDelay + 3}s`,
                animationDuration: `${particle.animationDuration + 4}s`,
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
