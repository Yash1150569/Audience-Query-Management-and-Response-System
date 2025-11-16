import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Verity Response',
  description: 'Unified Audience Query Management & Response System',
};

const ThemeLoader = () => {
  const script = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {
        console.error('Failed to load theme from localStorage', e);
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <ThemeLoader />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full flex flex-col">
        <div className="flex-grow">{children}</div>
        <Toaster />
        <footer className="text-center p-4 text-xs text-muted-foreground bg-background">
          © {new Date().getFullYear()} Verity Response. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
