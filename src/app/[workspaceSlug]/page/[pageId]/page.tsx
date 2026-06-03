import { PageContent } from '@/features/page/components/page-content';

type PrivatePageProps = {
  params: Promise<{
    workspaceSlug: string;
    pageId: string;
  }>;
};

export default async function PrivatePage({ params }: PrivatePageProps) {
  const { pageId } = await params;

  return (
    <div className="w-full px-16 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <PageContent pageId={pageId} />
      </div>
    </div>
  );
}
