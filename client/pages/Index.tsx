import CloudBackground from '@/components/CloudBackground';
import RadialScroller from '@/components/RadialScroller';

export default function Index() {
  const menuItems = [
    {
      id: 'explore',
      title: 'Explore',
      subtitle: 'Discover new worlds',
      action: () => {
        console.log('Navigate to Explore');
        // Navigation logic here
      },
    },
    {
      id: 'create',
      title: 'Create',
      subtitle: 'Build something amazing',
      action: () => {
        console.log('Navigate to Create');
        // Navigation logic here
      },
    },
    {
      id: 'connect',
      title: 'Connect',
      subtitle: 'Join the community',
      action: () => {
        console.log('Navigate to Connect');
        // Navigation logic here
      },
    },
    {
      id: 'learn',
      title: 'Learn',
      subtitle: 'Expand your knowledge',
      action: () => {
        console.log('Navigate to Learn');
        // Navigation logic here
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Customize experience',
      action: () => {
        console.log('Navigate to Settings');
        // Navigation logic here
      },
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <CloudBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Welcome
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Navigate through space with elegance and purpose
          </p>
        </div>
        
        {/* Radial Scroller */}
        <RadialScroller items={menuItems} className="flex-1" />
      </div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full" />
    </div>
  );
}
