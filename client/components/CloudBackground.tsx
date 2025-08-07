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
        {/* Cloud formation 1 - Enhanced organic clusters */}
        <div className="absolute top-16 left-8 w-96 h-48 opacity-20">
          <div className="relative w-full h-full">
            <div className="absolute top-8 left-12 w-24 h-24 bg-blue-200/40 rounded-full blur-xl animate-float-slow" />
            <div
              className="absolute top-4 left-28 w-36 h-28 bg-purple-200/50 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-16 left-44 w-20 h-20 bg-indigo-200/60 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-2 left-16 w-16 h-16 bg-blue-300/30 rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "3.5s" }}
            />
          </div>
        </div>

        {/* Cloud formation 2 - Flowing ensemble */}
        <div className="absolute top-32 right-16 w-80 h-40 opacity-15">
          <div className="relative w-full h-full">
            <div className="absolute top-6 left-8 w-28 h-28 bg-blue-200/45 rounded-full blur-xl animate-drift" />
            <div
              className="absolute top-2 left-24 w-32 h-24 bg-white/40 rounded-full blur-xl animate-drift"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute top-12 left-40 w-24 h-24 bg-purple-200/35 rounded-full blur-xl animate-drift"
              style={{ animationDelay: "3s" }}
            />
            <div
              className="absolute top-0 left-12 w-18 h-18 bg-indigo-300/25 rounded-full blur-xl animate-drift"
              style={{ animationDelay: "4.5s" }}
            />
          </div>
        </div>

        {/* Cloud formation 3 - Ethereal cluster */}
        <div className="absolute bottom-24 left-1/4 w-72 h-36 opacity-12">
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-6 w-22 h-22 bg-purple-300/35 rounded-full blur-xl animate-float" />
            <div
              className="absolute top-0 left-20 w-28 h-22 bg-white/45 rounded-full blur-xl animate-float"
              style={{ animationDelay: "2.5s" }}
            />
            <div
              className="absolute top-8 left-36 w-20 h-20 bg-blue-300/30 rounded-full blur-xl animate-float"
              style={{ animationDelay: "4s" }}
            />
            <div
              className="absolute top-2 left-8 w-16 h-16 bg-indigo-200/40 rounded-full blur-xl animate-float"
              style={{ animationDelay: "5.5s" }}
            />
          </div>
        </div>

        {/* Organic floating cloud wisps */}
        <div className="absolute inset-0">
          {/* Large flowing cloud formations */}
          <div className="absolute top-1/6 left-1/4 w-80 h-32 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent rounded-full blur-lg animate-drift opacity-60"
               style={{ animationDelay: '0s', animationDuration: '18s' }} />
          <div className="absolute top-1/3 right-1/5 w-96 h-24 bg-gradient-to-l from-transparent via-purple-200/25 to-transparent rounded-full blur-lg animate-float opacity-50"
               style={{ animationDelay: '3s', animationDuration: '22s' }} />
          <div className="absolute bottom-1/3 left-1/6 w-72 h-28 bg-gradient-to-r from-transparent via-indigo-200/35 to-transparent rounded-full blur-lg animate-drift opacity-55"
               style={{ animationDelay: '6s', animationDuration: '20s' }} />

          {/* Medium cloud wisps */}
          <div className="absolute top-2/5 right-1/3 w-48 h-20 bg-gradient-to-l from-transparent via-blue-300/20 to-transparent rounded-full blur-md animate-float opacity-40"
               style={{ animationDelay: '2s', animationDuration: '16s' }} />
          <div className="absolute bottom-1/4 left-2/5 w-56 h-16 bg-gradient-to-r from-transparent via-purple-300/18 to-transparent rounded-full blur-md animate-drift opacity-45"
               style={{ animationDelay: '8s', animationDuration: '24s' }} />
          <div className="absolute top-3/4 right-1/6 w-64 h-18 bg-gradient-to-l from-transparent via-indigo-300/22 to-transparent rounded-full blur-md animate-float opacity-35"
               style={{ animationDelay: '12s', animationDuration: '19s' }} />

          {/* Small ethereal wisps */}
          <div className="absolute top-1/8 left-3/5 w-32 h-12 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent rounded-full blur-sm animate-drift opacity-30"
               style={{ animationDelay: '4s', animationDuration: '14s' }} />
          <div className="absolute bottom-1/5 right-2/5 w-40 h-10 bg-gradient-to-l from-transparent via-purple-400/12 to-transparent rounded-full blur-sm animate-float opacity-25"
               style={{ animationDelay: '10s', animationDuration: '17s' }} />
        </div>

        {/* Primary floating particles - varied sizes */}
        <div className="absolute inset-0">
          {particles.map((particle, index) => {
            const size = index % 4 === 0 ? 'w-2 h-2' : index % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1';
            const opacity = index % 4 === 0 ? 'opacity-50' : index % 3 === 0 ? 'opacity-40' : 'opacity-30';
            return (
              <div
                key={particle.id}
                className={`absolute ${size} bg-blue-300 rounded-full ${opacity} ${
                  index % 3 === 0 ? 'animate-drift' : index % 2 === 0 ? 'animate-float' : 'animate-float-slow'
                }`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${particle.animationDuration + (index % 3)}s`,
                }}
              />
            );
          })}
        </div>

        {/* Purple accent particles - organic distribution */}
        <div className="absolute inset-0">
          {particles.slice(0, 10).map((particle, index) => {
            const size = index % 3 === 0 ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';
            const opacity = index % 3 === 0 ? 'opacity-35' : 'opacity-25';
            return (
              <div
                key={`purple-${particle.id}`}
                className={`absolute ${size} bg-purple-300 rounded-full ${opacity} ${
                  index % 2 === 0 ? 'animate-drift' : 'animate-float-slow'
                }`}
                style={{
                  left: `${(particle.left + 30) % 100}%`,
                  top: `${(particle.top + 40) % 100}%`,
                  animationDelay: `${particle.animationDelay + 2}s`,
                  animationDuration: `${particle.animationDuration + 5}s`,
                }}
              />
            );
          })}
        </div>

        {/* Indigo shimmer particles - subtle accents */}
        <div className="absolute inset-0">
          {particles.slice(0, 8).map((particle, index) => (
            <div
              key={`indigo-${particle.id}`}
              className="absolute w-1 h-1 bg-indigo-300 rounded-full opacity-20 animate-drift"
              style={{
                left: `${(particle.left + 60) % 100}%`,
                top: `${(particle.top + 70) % 100}%`,
                animationDelay: `${particle.animationDelay + 4}s`,
                animationDuration: `${particle.animationDuration + 6}s`,
              }}
            />
          ))}
        </div>

        {/* Large ethereal orbs - rare but impactful */}
        <div className="absolute inset-0">
          {particles.slice(0, 3).map((particle, index) => (
            <div
              key={`orb-${particle.id}`}
              className="absolute w-4 h-4 bg-gradient-to-br from-blue-200/20 to-purple-200/15 rounded-full blur-sm opacity-15 animate-drift"
              style={{
                left: `${(particle.left + 15) % 100}%`,
                top: `${(particle.top + 25) % 100}%`,
                animationDelay: `${particle.animationDelay + 1}s`,
                animationDuration: `${particle.animationDuration + 8}s`,
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
