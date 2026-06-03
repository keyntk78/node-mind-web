import { MoreHorizontal, UserPlus } from 'lucide-react';

const members = [
  {
    id: '1',
    name: 'Tuấn Kiệt Nguyễn',
    email: 'tuankiet@example.com',
    role: 'Owner',
  },
  {
    id: '2',
    name: 'Demo Member',
    email: 'member@example.com',
    role: 'Member',
  },
];

export function WorkspaceMembersSettings() {
  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Invite and manage people in this workspace.
          </p>
        </div>

        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90">
          <UserPlus className="size-4" />
          Invite member
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border">
        <div className="grid grid-cols-[1fr_140px_48px] border-b bg-muted/40 px-4 py-3 text-xs font-medium text-muted-foreground">
          <div>Member</div>
          <div>Role</div>
          <div />
        </div>

        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-[1fr_140px_48px] items-center px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{member.name}</div>
              <div className="truncate text-sm text-muted-foreground">
                {member.email}
              </div>
            </div>

            <select
              defaultValue={member.role}
              className="h-8 rounded-md border bg-background px-2 text-sm"
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Member</option>
              <option>Guest</option>
            </select>

            <button className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
