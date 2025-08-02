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
      <div className="relative z-10 min-h-screen flex items-center pl-12 md:pl-20">
        {/* Radial Scroller anchored to left */}
        <RadialScroller items={menuItems} className="h-full" />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full" />
    </div>
  );
}
