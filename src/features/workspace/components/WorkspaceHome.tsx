'use client';

import Link from 'next/link';
import {
  AppWindow,
  Bell,
  Bot,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  Folder,
  Home,
  LogOut,
  Network,
  NotebookPen,
  PanelLeft,
  Pin,
  Search,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { NodeMindMark } from '@/features/workspace/components/NodeMindMark';
import {
  collections,
  currentUser,
  openTasks,
  pinnedNotes,
  recentActivity,
  recentNotes,
  workspaceActivity,
  workspaces,
} from '@/features/workspace/mock-data';
import { cn } from '@/shared/lib/utils';

type WorkspaceHomeProps = {
  workspaceSlug: string;
};

const primaryNav = [
  { label: 'Home', href: '/kiet', icon: Home, active: true },
  { label: 'Notes', href: '/kiet/notes', icon: FileText },
  { label: 'Graph', href: '/kiet/graph', icon: Network },
  { label: 'AI Assistant', href: '/kiet/ai', icon: Bot },
  { label: 'Search', href: '/kiet/search', icon: Search },
];

const statIcons = [NotebookPen, Network, Bot];

export function WorkspaceHome({ workspaceSlug }: WorkspaceHomeProps) {
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const currentWorkspace =
    workspaces.find((workspace) => workspace.slug === workspaceSlug) ??
    workspaces[0];

  return (
    <main className="h-screen overflow-hidden bg-[linear-gradient(135deg,#f8faff_0%,#ffffff_44%,#eef5ff_100%)] text-slate-950">
      <div className="pointer-events-none fixed right-[-14%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,67,200,0.12),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-18%] left-[16%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(66,82,104,0.10),transparent_70%)] blur-3xl" />

      <aside className="fixed left-0 top-0 z-50 hidden h-full w-60 flex-col border-r border-blue-950/10 bg-white/50 px-3 py-4 shadow-[0_18px_70px_rgba(0,67,200,0.06)] backdrop-blur-2xl lg:flex">
        <div className="mb-7 px-2">
          <NodeMindMark />
          <p className="mt-3 truncate text-xs font-medium text-slate-500">
            {currentWorkspace.name}
          </p>
        </div>

        <nav className="node-mind-scrollbar flex-1 overflow-y-auto pr-1">
          <div className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition',
                    item.active
                      ? 'bg-blue-100/70 text-blue-900 shadow-sm shadow-blue-950/[0.04] ring-1 ring-white/70'
                      : 'text-slate-600 hover:bg-white/55 hover:text-blue-800',
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <SidebarSection title="Favorites">
            {pinnedNotes.map((note) => (
              <SidebarLink
                href={`/${workspaceSlug}/notes/${slugify(note.title)}`}
                icon={Pin}
                key={note.title}
                label={note.title}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="Collections">
            {collections.slice(0, 2).map((collection) => (
              <Link
                href={`/${workspaceSlug}/collections/${slugify(collection.name)}`}
                key={collection.name}
                className="group flex h-8 items-center justify-between rounded-lg px-3 text-sm transition hover:bg-white/55"
              >
                <span className="flex min-w-0 items-center gap-3 text-slate-600 group-hover:text-blue-800">
                  <Folder className="h-4 w-4 shrink-0" />
                  <span className="truncate">{collection.name}</span>
                </span>
                <span className="text-xs text-slate-400">
                  {collection.count}
                </span>
              </Link>
            ))}
          </SidebarSection>
        </nav>

        <div className="mt-auto border-t border-blue-950/10 px-3 pt-4">
          <p className="text-xs font-medium text-slate-500">Deep work mode</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-400">
            Search, notes, and graph stay one step away.
          </p>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-blue-950/10 bg-white/55 px-4 shadow-sm shadow-blue-950/[0.03] backdrop-blur-2xl lg:left-60 lg:px-6">
        <button className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/55 lg:hidden">
          <PanelLeft className="h-5 w-5" />
        </button>

        <label className="relative flex h-11 w-full max-w-2xl items-center rounded-full border border-transparent bg-slate-200/35 px-4 text-sm text-slate-500 shadow-inner shadow-slate-950/[0.02] transition focus-within:border-blue-300/80 focus-within:bg-white/65 focus-within:ring-2 focus-within:ring-blue-100/80">
          <Search className="h-5 w-5 text-slate-400 transition group-focus-within:text-blue-700" />
          <input
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
            placeholder="Search or ask AI across your workspace..."
          />
          <span className="hidden items-center gap-1 text-[10px] font-bold text-slate-400 sm:flex">
            <kbd className="rounded border border-slate-400/30 px-1.5 py-0.5">
              ⌘
            </kbd>
            <kbd className="rounded border border-slate-400/30 px-1.5 py-0.5">
              K
            </kbd>
          </span>
        </label>

        <div className="ml-4 flex items-center gap-3">
          <button className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/55 sm:grid">
            <Bell className="h-5 w-5" />
          </button>
          <button className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/55 sm:grid">
            <AppWindow className="h-5 w-5" />
          </button>
          <div className="relative hidden items-center gap-3 border-l border-blue-950/10 pl-4 sm:flex">
            <div className="text-right">
              <p className="text-sm font-bold leading-none text-slate-950">
                Kiet Nguyen
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                Pro Plan
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAvatarMenuOpen((open) => !open)}
              className="rounded-full outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-200"
              aria-label="Open user menu"
            >
              <UserAvatar />
            </button>
            {avatarMenuOpen && <AvatarMenu workspaceSlug={workspaceSlug} />}
          </div>
          <div className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setAvatarMenuOpen((open) => !open)}
              className="rounded-full outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-200"
              aria-label="Open user menu"
            >
              <UserAvatar />
            </button>
            {avatarMenuOpen && <AvatarMenu workspaceSlug={workspaceSlug} />}
          </div>
        </div>
      </header>

      <section className="node-mind-scrollbar ml-0 h-screen overflow-y-auto pt-16 lg:ml-60">
        <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-8 sm:px-8 lg:px-10">
          <section className="space-y-5">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-700">
                {currentWorkspace.name}
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Good afternoon, {currentUser.firstName}
              </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workspaceActivity.map((item, index) => {
                const Icon = statIcons[index] ?? Circle;

                return (
                  <div
                    className="group rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_10px_35px_rgba(0,67,200,0.055)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_18px_45px_rgba(0,67,200,0.08)]"
                    key={item.label}
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-700/10 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-3xl font-black leading-none text-slate-950">
                          {item.value}
                        </span>
                        <span className="mt-1 block text-sm text-slate-500">
                          {item.label}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-8">
              <section>
                <SectionHeader
                  icon={Circle}
                  title="Continue Working"
                  href={`/${workspaceSlug}/notes`}
                  action="Open All"
                />
                <div className="mt-4 space-y-3">
                  {recentNotes.slice(0, 3).map((note, index) => (
                    <NoteRow
                      href={`/${workspaceSlug}/notes/${slugify(note.title)}`}
                      iconIndex={index}
                      key={note.title}
                      note={note}
                    />
                  ))}
                </div>
              </section>

              <GraphTeaser workspaceSlug={workspaceSlug} />
            </div>

            <aside className="space-y-4 lg:col-span-4">
              <RightCard icon={Pin} title="Pinned Notes">
                <div className="space-y-2">
                  {pinnedNotes.map((note) => (
                    <Link
                      href={`/${workspaceSlug}/notes/${slugify(note.title)}`}
                      key={note.title}
                      className="group block rounded-xl border border-white/40 bg-white/35 p-3 shadow-inner shadow-slate-950/[0.02] transition hover:bg-white/60"
                    >
                      <p className="text-base font-bold text-slate-950 group-hover:text-blue-700">
                        {note.title}
                      </p>
                      <p className="mt-1 text-[13px] leading-5 text-slate-500">
                        {note.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </RightCard>

              <RightCard icon={Clock} title="Recent Activity">
                <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-px before:bg-blue-950/10">
                  {recentActivity.map((activity, index) => (
                    <div className="relative" key={activity}>
                      <span
                        className={cn(
                          'absolute -left-[1.35rem] top-1.5 h-3 w-3 rounded-full ring-4',
                          index === 0 && 'bg-blue-700 ring-blue-700/10',
                          index === 1 && 'bg-slate-500 ring-slate-500/10',
                          index === 2 && 'bg-indigo-500 ring-indigo-500/10',
                        )}
                      />
                      <p className="text-sm font-semibold leading-5 text-slate-800">
                        {activity}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {index === 0
                          ? '2 hours ago'
                          : index === 1
                            ? '5 hours ago'
                            : 'Yesterday'}
                      </p>
                    </div>
                  ))}
                </div>
              </RightCard>

              <RightCard icon={CheckCircle2} title="Open Tasks">
                <div className="space-y-2">
                  {openTasks.slice(0, 2).map((task) => (
                    <label
                      className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-white/45"
                      key={task}
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-slate-300 bg-white/50 group-hover:border-blue-700" />
                      <span className="text-sm text-slate-700">{task}</span>
                    </label>
                  ))}
                </div>
                <button className="mt-3 h-10 w-full rounded-xl bg-slate-200/55 text-sm font-medium text-slate-600 transition hover:bg-white/60">
                  + Add New Task
                </button>
              </RightCard>
            </aside>
          </div>

          <footer className="flex flex-col items-center justify-between gap-4 border-t border-blue-950/10 bg-white/35 px-4 py-6 text-sm text-slate-500 backdrop-blur-xl md:flex-row">
            <p>© 2026 Node Mind AI. Precise. Luminous. Expansive.</p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'API Docs'].map((item) => (
                <Link
                  href="#"
                  key={item}
                  className="text-xs font-medium hover:text-blue-700 hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          </footer>
        </div>
      </section>

      <button className="fixed bottom-8 right-8 z-50 grid h-14 w-14 place-items-center rounded-full bg-blue-700 text-white shadow-2xl shadow-blue-700/35 transition hover:scale-105 hover:bg-blue-800 active:scale-95">
        <Bot className="h-7 w-7" />
      </button>
    </main>
  );
}

type Note = (typeof recentNotes)[number];

function NoteRow({
  href,
  iconIndex,
  note,
}: {
  href: string;
  iconIndex: number;
  note: Note;
}) {
  const icons = [FileText, Network, NotebookPen];
  const Icon = icons[iconIndex] ?? FileText;

  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_10px_35px_rgba(0,67,200,0.045)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_18px_45px_rgba(0,67,200,0.075)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-200/65 text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-bold text-slate-950 group-hover:text-blue-700">
            {note.title}
          </span>
          <span className="mt-1 block truncate text-sm text-slate-500">
            {note.path}
          </span>
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <div className="flex gap-2">
          {note.tags.map((tag) => (
            <span
              className="rounded-full bg-slate-200/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="min-w-28 text-right">
          <p className="text-sm font-medium text-slate-800">
            {note.links} nodes
          </p>
          <p className="mt-1 text-[11px] text-slate-400">{note.updatedAt}</p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-300 md:hidden" />
    </Link>
  );
}

function GraphTeaser({ workspaceSlug }: { workspaceSlug: string }) {
  return (
    <section className="group relative h-[300px] overflow-hidden rounded-3xl border border-white/60 bg-slate-950 shadow-[0_18px_55px_rgba(0,67,200,0.10)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.34),transparent_35%),linear-gradient(135deg,#0f172a,#1e3a8a_52%,#f8fafc_130%)] opacity-95" />
      <div className="absolute inset-0 opacity-60">
        <span className="absolute left-[18%] top-[24%] h-px w-52 rotate-12 bg-blue-200/35" />
        <span className="absolute left-[36%] top-[46%] h-px w-64 -rotate-12 bg-blue-200/30" />
        <span className="absolute left-[30%] top-[62%] h-px w-48 rotate-[28deg] bg-blue-200/25" />
        <GraphNode className="left-[14%] top-[19%]" label="Research" />
        <GraphNode className="left-[42%] top-[38%]" label="Memory" />
        <GraphNode className="right-[18%] top-[24%]" label="AI" />
        <GraphNode className="bottom-[22%] left-[26%]" label="Product" />
        <GraphNode className="bottom-[20%] right-[24%]" label="Graph" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/92 via-white/55 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Knowledge Graph
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Visualize how your thoughts interconnect
          </p>
        </div>
        <Link
          href={`/${workspaceSlug}/graph`}
          className="hidden rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-800 sm:inline-flex"
        >
          Explore Graph
        </Link>
      </div>
    </section>
  );
}

function GraphNode({ className, label }: { className: string; label: string }) {
  return (
    <span
      className={cn(
        'absolute rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-xl',
        className,
      )}
    >
      {label}
    </span>
  );
}

function SectionHeader({
  action,
  href,
  icon: Icon,
  title,
}: {
  action: string;
  href: string;
  icon: typeof Circle;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
        {title}
        <Icon className="h-5 w-5 fill-blue-700 text-blue-700" />
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
      >
        {action}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SidebarSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="mt-8 px-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof FileText;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-8 items-center gap-3 rounded-lg px-3 text-sm text-slate-600 transition hover:bg-white/55 hover:text-blue-800"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
}

function RightCard({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof Pin;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-[0_10px_35px_rgba(0,67,200,0.055)] backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-700" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function AvatarMenu({ workspaceSlug }: { workspaceSlug: string }) {
  return (
    <div className="absolute right-0 top-12 z-[70] w-64 rounded-2xl border border-white/70 bg-white/80 p-2 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl">
      <div className="flex items-center gap-3 border-b border-blue-950/10 px-3 py-3">
        <UserAvatar />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-950">
            Kiet Nguyen
          </p>
          <p className="truncate text-xs text-slate-500">
            {currentUser.workspaceName}
          </p>
        </div>
      </div>
      <div className="py-1">
        <Link
          href={`/${workspaceSlug}/settings`}
          className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <Link
          href="/login"
          className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </div>
    </div>
  );
}

function UserAvatar() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-black text-blue-800 ring-2 ring-blue-700/15 ring-offset-2 ring-offset-white/40">
      K
    </span>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}
