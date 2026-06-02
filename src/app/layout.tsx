import type { Metadata } from 'next';
import { AppProvider } from '@/providers/AppProvider';
import { NavigationProgress } from '@/shared/components/NavigationProgress';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Node Mind Auth',
  description:
    'Authentication screens for Node Mind, an AI-powered note-taking and knowledge graph platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NavigationProgress />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
