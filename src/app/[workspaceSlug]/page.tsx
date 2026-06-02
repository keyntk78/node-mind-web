import { WorkspaceHome } from '@/features/workspace/components/WorkspaceHome';

type WorkspacePageProps = {
  params: Promise<{
    workspaceSlug: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceSlug } = await params;

  return <WorkspaceHome workspaceSlug={workspaceSlug} />;
}
