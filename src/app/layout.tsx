import type { Metadata } from 'next';
import { AppProvider } from '@/providers/AppProvider';
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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
