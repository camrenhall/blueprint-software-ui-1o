import CloudBackground from '@/components/CloudBackground';
import RadialScroller from '@/components/RadialScroller';

export default function Index() {
  const menuItems = [
    {
      id: 'explore',
      title: 'Explore',
      subItems: [
        {
          id: 'explore-worlds',
          title: 'New Worlds',
          action: () => console.log('Navigate to New Worlds'),
        },
        {
          id: 'explore-galaxies',
          title: 'Distant Galaxies',
          action: () => console.log('Navigate to Distant Galaxies'),
        },
        {
          id: 'explore-dimensions',
          title: 'Other Dimensions',
          action: () => console.log('Navigate to Other Dimensions'),
        },
      ],
    },
    {
      id: 'create',
      title: 'Create',
      subItems: [
        {
          id: 'create-project',
          title: 'New Project',
          action: () => console.log('Navigate to New Project'),
        },
        {
          id: 'create-design',
          title: 'Design Studio',
          action: () => console.log('Navigate to Design Studio'),
        },
        {
          id: 'create-experiment',
          title: 'Experiment Lab',
          action: () => console.log('Navigate to Experiment Lab'),
        },
      ],
    },
    {
      id: 'connect',
      title: 'Connect',
      subItems: [
        {
          id: 'connect-community',
          title: 'Community Hub',
          action: () => console.log('Navigate to Community Hub'),
        },
        {
          id: 'connect-collaborate',
          title: 'Collaborate',
          action: () => console.log('Navigate to Collaborate'),
        },
        {
          id: 'connect-network',
          title: 'Network',
          action: () => console.log('Navigate to Network'),
        },
      ],
    },
    {
      id: 'learn',
      title: 'Learn',
      subItems: [
        {
          id: 'learn-tutorials',
          title: 'Tutorials',
          action: () => console.log('Navigate to Tutorials'),
        },
        {
          id: 'learn-courses',
          title: 'Courses',
          action: () => console.log('Navigate to Courses'),
        },
        {
          id: 'learn-documentation',
          title: 'Documentation',
          action: () => console.log('Navigate to Documentation'),
        },
      ],
    },
    {
      id: 'settings',
      title: 'Settings',
      subItems: [
        {
          id: 'settings-profile',
          title: 'Profile',
          action: () => console.log('Navigate to Profile'),
        },
        {
          id: 'settings-preferences',
          title: 'Preferences',
          action: () => console.log('Navigate to Preferences'),
        },
        {
          id: 'settings-security',
          title: 'Security',
          action: () => console.log('Navigate to Security'),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <CloudBackground />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center pl-20 md:pl-32 lg:pl-40">
        {/* Radial Scroller anchored to left but more centered */}
        <RadialScroller items={menuItems} className="h-full" />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full" />
    </div>
  );
}
