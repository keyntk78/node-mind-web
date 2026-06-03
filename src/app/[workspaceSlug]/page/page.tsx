import { redirect } from 'next/navigation';

type PageIndexProps = {
  params: Promise<{
    workspaceSlug: string;
  }>;
};

export default async function PageIndex({ params }: PageIndexProps) {
  const { workspaceSlug } = await params;

  redirect(`/${workspaceSlug}`);
}
