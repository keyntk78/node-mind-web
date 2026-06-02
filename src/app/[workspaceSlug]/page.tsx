type WorkspacePageProps = {
  params: Promise<{
    workspaceSlug: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  // const { workspaceSlug } = await params;

  return <>Hello</>;
}
