import { SettingRow } from '@/features/workspace/components/workspace-settings/setting-row';

export function AccountSecuritySettings() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Security</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage password, sessions, and account protection.
      </p>

      <div className="mt-8">
        <SettingRow
          title="Password"
          description="Update your password regularly to keep your account safe."
        >
          <button className="h-9 rounded-md border px-3 text-sm hover:bg-accent">
            Change password
          </button>
        </SettingRow>

        <SettingRow
          title="Two-factor authentication"
          description="Add an extra layer of security to your account."
        >
          <button className="h-9 rounded-md border px-3 text-sm hover:bg-accent">
            Enable
          </button>
        </SettingRow>
      </div>
    </section>
  );
}
