'use client';

import { Settings, Shield, SlidersHorizontal, User } from 'lucide-react';
import * as React from 'react';

import { AccountPreferencesSettings } from '@/features/workspace/components/workspace-settings/account-preferences-settings';
import { AccountProfileSettings } from '@/features/workspace/components/workspace-settings/account-profile-settings';
import { AccountSecuritySettings } from '@/features/workspace/components/workspace-settings/account-security-settings';
import { WorkspaceGeneralSettings } from '@/features/workspace/components/workspace-settings/workspace-general-settings';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

type SettingsTab =
  | 'account-profile'
  | 'account-security'
  | 'account-preferences'
  | 'workspace-general';

type WorkspaceSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const settingGroups = [
  {
    title: 'Account',
    items: [
      { value: 'account-profile', label: 'Profile', icon: User },
      { value: 'account-security', label: 'Security', icon: Shield },
      {
        value: 'account-preferences',
        label: 'Preferences',
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    title: 'Workspace',
    items: [{ value: 'workspace-general', label: 'General', icon: Settings }],
  },
] satisfies {
  title: string;
  items: {
    value: SettingsTab;
    label: string;
    icon: React.ElementType;
  }[];
}[];

export function WorkspaceSettingsDialog({
  open,
  onOpenChange,
}: WorkspaceSettingsDialogProps) {
  const [activeTab, setActiveTab] =
    React.useState<SettingsTab>('account-profile');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[82vh] w-[calc(100vw-2rem)] max-w-none overflow-hidden p-0 sm:max-w-5xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>

        <div className="flex h-full">
          <aside className="w-64 border-r bg-muted/30 p-3">
            <div className="mb-5 px-2">
              <p className="text-xs font-medium text-muted-foreground">
                Node Mind
              </p>
              <h2 className="mt-1 text-sm font-semibold">Settings</h2>
            </div>

            <div className="space-y-5">
              {settingGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                    {group.title}
                  </p>

                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setActiveTab(item.value)}
                          className={cn(
                            'flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                            isActive &&
                              'bg-accent font-medium text-accent-foreground',
                          )}
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 flex-1 overflow-y-auto px-10 py-8">
            {activeTab === 'account-profile' && <AccountProfileSettings />}
            {activeTab === 'account-security' && <AccountSecuritySettings />}
            {activeTab === 'account-preferences' && (
              <AccountPreferencesSettings />
            )}
            {activeTab === 'workspace-general' && <WorkspaceGeneralSettings />}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
