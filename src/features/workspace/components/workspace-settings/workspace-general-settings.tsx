import { SettingRow } from '@/features/workspace/components/workspace-settings/setting-row';

export function WorkspaceGeneralSettings() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Workspace General</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage basic information for your Node Mind workspace.
      </p>

      <div className="mt-8">
        <SettingRow
          title="Workspace name"
          description="This name is visible to all workspace members."
        >
          <input
            defaultValue="Node Mind"
            className="h-9 w-72 rounded-md border bg-background px-3 text-sm"
          />
        </SettingRow>

        <SettingRow
          title="Workspace slug"
          description="Used in your workspace URL."
        >
          <input
            defaultValue="node-mind"
            className="h-9 w-72 rounded-md border bg-background px-3 text-sm"
          />
        </SettingRow>

        <SettingRow
          title="Default visibility"
          description="Choose how new pages are created by default."
        >
          <select className="h-9 w-72 rounded-md border bg-background px-3 text-sm">
            <option>Private</option>
            <option>Workspace</option>
          </select>
        </SettingRow>
      </div>
    </section>
  );
}
