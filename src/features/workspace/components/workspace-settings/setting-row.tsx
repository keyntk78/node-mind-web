type SettingRowProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingRow({ title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-t py-5">
      <div className="min-w-0">
        <h3 className="text-sm font-medium">{title}</h3>

        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}
