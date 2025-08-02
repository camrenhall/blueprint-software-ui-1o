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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

      {/* Animated clouds */}
      <div className="absolute inset-0">
        {/* Cloud 1 */}
        <div className="absolute top-20 left-10 w-96 h-48 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-8 left-12 w-20 h-20 bg-white rounded-full blur-xl animate-float-slow" />
            <div
              className="absolute top-4 left-24 w-32 h-24 bg-white rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-12 left-40 w-16 h-16 bg-white rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>

        {/* Cloud 2 */}
        <div className="absolute top-40 right-20 w-80 h-40 opacity-8">
          <div className="relative w-full h-full">
            <div className="absolute top-6 left-8 w-24 h-24 bg-white rounded-full blur-xl animate-float" />
            <div
              className="absolute top-2 left-20 w-28 h-20 bg-white rounded-full blur-xl animate-float"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute top-8 left-36 w-20 h-20 bg-white rounded-full blur-xl animate-float"
              style={{ animationDelay: "3s" }}
            />
          </div>
        </div>

        {/* Cloud 3 */}
        <div className="absolute bottom-32 left-1/4 w-72 h-36 opacity-6">
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-6 w-18 h-18 bg-white rounded-full blur-xl animate-float-slow" />
            <div
              className="absolute top-0 left-16 w-24 h-18 bg-white rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "2.5s" }}
            />
            <div
              className="absolute top-6 left-28 w-16 h-16 bg-white rounded-full blur-xl animate-float-slow"
              style={{ animationDelay: "4s" }}
            />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
    </div>
  );
}
