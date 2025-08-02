import { useState } from 'react';
import CloudBackground from '@/components/CloudBackground';
import RadialScroller from '@/components/RadialScroller';
import Dashboard from '@/components/Dashboard';

export default function Index() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState('');
  const menuItems = [
    {
      id: 'explore',
      title: 'Explore',
      subItems: [
        {
          id: 'explore-worlds',
          title: 'New Worlds',
          action: () => {
            setDashboardTitle('New Worlds');
            setDashboardOpen(true);
          },
        },
        {
          id: 'explore-galaxies',
          title: 'Distant Galaxies',
          action: () => {
            setDashboardTitle('Distant Galaxies');
            setDashboardOpen(true);
          },
        },
        {
          id: 'explore-dimensions',
          title: 'Other Dimensions',
          action: () => {
            setDashboardTitle('Other Dimensions');
            setDashboardOpen(true);
          },
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
          action: () => {
            setDashboardTitle('New Project');
            setDashboardOpen(true);
          },
        },
        {
          id: 'create-design',
          title: 'Design Studio',
          action: () => {
            setDashboardTitle('Design Studio');
            setDashboardOpen(true);
          },
        },
        {
          id: 'create-experiment',
          title: 'Experiment Lab',
          action: () => {
            setDashboardTitle('Experiment Lab');
            setDashboardOpen(true);
          },
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
          action: () => {
            setDashboardTitle('Community Hub');
            setDashboardOpen(true);
          },
        },
        {
          id: 'connect-collaborate',
          title: 'Collaborate',
          action: () => {
            setDashboardTitle('Collaborate');
            setDashboardOpen(true);
          },
        },
        {
          id: 'connect-network',
          title: 'Network',
          action: () => {
            setDashboardTitle('Network');
            setDashboardOpen(true);
          },
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
          action: () => {
            setDashboardTitle('Tutorials');
            setDashboardOpen(true);
          },
        },
        {
          id: 'learn-courses',
          title: 'Courses',
          action: () => {
            setDashboardTitle('Courses');
            setDashboardOpen(true);
          },
        },
        {
          id: 'learn-documentation',
          title: 'Documentation',
          action: () => {
            setDashboardTitle('Documentation');
            setDashboardOpen(true);
          },
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
          action: () => {
            setDashboardTitle('Profile');
            setDashboardOpen(true);
          },
        },
        {
          id: 'settings-preferences',
          title: 'Preferences',
          action: () => {
            setDashboardTitle('Preferences');
            setDashboardOpen(true);
          },
        },
        {
          id: 'settings-security',
          title: 'Security',
          action: () => {
            setDashboardTitle('Security');
            setDashboardOpen(true);
          },
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

      {/* Dashboard Component */}
      <Dashboard
        isOpen={dashboardOpen}
        title={dashboardTitle}
        onClose={() => setDashboardOpen(false)}
      />
    </div>
  );
}
