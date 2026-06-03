import { SidebarLeft } from '@/features/workspace/components/layout/sidebar-left';
import { LocaleThemeControls } from '@/shared/components/LocaleThemeControls';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/components/ui/breadcrumb';
import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Node Mind',
  description:
    'Authentication screens for Node Mind, an AI-powered note-taking and knowledge graph platform.',
};

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('common');

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {t('workspaceTitle')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-3">
            <LocaleThemeControls />
          </div>
        </header>
        <main className="">{children}</main>
      </SidebarInset>
      {/* <SidebarRight /> */}
    </SidebarProvider>
  );
}
