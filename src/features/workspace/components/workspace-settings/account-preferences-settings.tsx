import { SettingRow } from '@/features/workspace/components/workspace-settings/setting-row';

export function AccountPreferencesSettings() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Preferences</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Customize how Node Mind looks and behaves.
      </p>

      <div className="mt-8">
        <SettingRow title="Theme" description="Choose your preferred theme.">
          <select className="h-9 w-72 rounded-md border bg-background px-3 text-sm">
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </SettingRow>

        <SettingRow title="Language" description="Choose application language.">
          <select className="h-9 w-72 rounded-md border bg-background px-3 text-sm">
            <option>English</option>
            <option>Tiếng Việt</option>
          </select>
        </SettingRow>
      </div>
    </section>
  );
}
