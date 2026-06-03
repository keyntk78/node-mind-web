// private-page-content.tsx
'use client';

import { PageEditor } from '@/features/page/components/page-editor';
import { PageHeader } from '@/features/page/components/page-header';
import { usePage } from '@/features/page/hooks/use-page';

type PrivatePageContentProps = {
  pageId: string;
};

export function PageContent({ pageId }: PrivatePageContentProps) {
  const { data: page, isLoading } = usePage(pageId);

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  if (!page) {
    return <div className="text-sm text-muted-foreground">Page not found</div>;
  }

  return (
    <>
      <PageHeader page={page} />
      <PageEditor pageId={pageId} initialBlocks={page.blocks ?? []} />
    </>
  );
}
