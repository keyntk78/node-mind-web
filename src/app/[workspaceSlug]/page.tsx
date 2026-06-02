import { WorkspaceHome } from '@/features/workspace/components/WorkspaceHome';
import { workspaces } from '@/features/workspace/mock-data';
import { notFound } from 'next/navigation';

type WorkspacePageProps = {
  params: Promise<{
    workspaceSlug: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceSlug } = await params;

  if (!workspaces.some((workspace) => workspace.slug === workspaceSlug)) {
    notFound();
  }

  return <WorkspaceHome workspaceSlug={workspaceSlug} />;
}
