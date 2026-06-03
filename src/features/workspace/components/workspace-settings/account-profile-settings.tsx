import { SettingRow } from '@/features/workspace/components/workspace-settings/setting-row';

export function AccountProfileSettings() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your personal profile in Node Mind.
      </p>

      <div className="mt-8">
        <SettingRow
          title="Display name"
          description="This name is shown to other workspace members."
        >
          <input
            defaultValue="Tuấn Kiệt Nguyễn"
            className="h-9 w-72 rounded-md border bg-background px-3 text-sm"
          />
        </SettingRow>

        <SettingRow
          title="Email"
          description="Used for login and notifications."
        >
          <input
            disabled
            defaultValue="tuankiet@example.com"
            className="h-9 w-72 rounded-md border bg-muted px-3 text-sm text-muted-foreground"
          />
        </SettingRow>
      </div>
    </section>
  );
}
