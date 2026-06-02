import { Bot, FileText, Home, Network, Search, Settings } from 'lucide-react';

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  type: 'Personal' | 'Team';
  role: string;
  lastOpened: string;
  members?: number;
};

export const currentUser = {
  firstName: 'Kiet',
  workspaceName: "Kiet's Workspace",
  workspaceSlug: 'kiet',
};

export const workspaces: Workspace[] = [
  {
    id: 'personal',
    name: "Kiet's Workspace",
    slug: 'kiet',
    type: 'Personal',
    role: 'Owner',
    lastOpened: 'Today',
    members: 1,
  },
  {
    id: 'team-product',
    name: 'Product Systems',
    slug: 'product-systems',
    type: 'Team',
    role: 'Admin',
    lastOpened: 'Yesterday',
    members: 8,
  },
  {
    id: 'team-research',
    name: 'Research Lab',
    slug: 'research-lab',
    type: 'Team',
    role: 'Member',
    lastOpened: 'May 29',
    members: 4,
  },
];

export const sidebarItems = [
  { label: 'Home', href: '/kiet', icon: Home, active: true },
  { label: 'Notes', href: '/kiet/notes', icon: FileText },
  { label: 'Graph', href: '/kiet/graph', icon: Network },
  { label: 'AI Assistant', href: '/kiet/ai', icon: Bot },
  { label: 'Search', href: '/kiet/search', icon: Search },
  { label: 'Settings', href: '/kiet/settings', icon: Settings },
];

export const recentNotes = [
  {
    title: 'AI memory architecture',
    path: 'Research / LLM systems',
    updatedAt: 'Edited 18 minutes ago',
    tags: ['AI', 'Memory'],
    links: 12,
  },
  {
    title: 'Node Mind workspace model',
    path: 'Product / Platform',
    updatedAt: 'Edited yesterday',
    tags: ['Product', 'Architecture'],
    links: 8,
  },
  {
    title: 'Reading notes: graph retrieval',
    path: 'Library / Papers',
    updatedAt: 'Edited May 30',
    tags: ['Reading', 'Graph'],
    links: 15,
  },
  {
    title: 'Inbox synthesis',
    path: 'Daily / Capture',
    updatedAt: 'Edited Jun 1',
    tags: ['Inbox'],
    links: 5,
  },
];

export const pinnedNotes = [
  {
    title: 'Weekly planning',
    description: 'Open loops, decisions, and review notes for the week.',
  },
  {
    title: 'Knowledge system principles',
    description: 'How pages, references, and AI context should behave.',
  },
];

export const collections = [
  { name: 'Research', count: 24 },
  { name: 'Product', count: 18 },
  { name: 'Reading', count: 31 },
  { name: 'Daily Notes', count: 12 },
];

export const workspaceActivity = [
  { label: 'Notes edited this week', value: '18' },
  { label: 'Connected nodes', value: '142' },
  { label: 'AI conversations', value: '9' },
];

export const recentActivity = [
  'Linked AI memory architecture to Graph retrieval',
  'Updated Weekly planning',
  'Created Inbox synthesis from imported notes',
];

export const openTasks = [
  'Review graph retrieval notes',
  'Summarize product workspace model',
  'Tag uncategorized inbox items',
];
