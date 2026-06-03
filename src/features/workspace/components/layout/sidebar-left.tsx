'use client';

import {
  AudioWaveform,
  Command,
  Home,
  Network,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import * as React from 'react';

import { useAuthStore } from '@/features/auth/stores/auth.store';
import { NavMain } from '@/features/workspace/components/layout/nav-main';
import { NavPrivate } from '@/features/workspace/components/layout/nav-private';
import { NavSecondary } from '@/features/workspace/components/layout/nav-secondary';
import { TeamSwitcher } from '@/features/workspace/components/layout/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/shared/components/ui/sidebar';

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: Command,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '#',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: Sparkles,
    },
    {
      title: 'Graph',
      url: '#',
      icon: Network,
      badge: '10',
    },
  ],
  navSecondary: [
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const workspace = useAuthStore((state) => state.workspace);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavPrivate
          workspaceId={workspace?.id}
          workspaceSlug={workspace?.slug}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
