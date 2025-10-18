// promptvault-frontend/src/app/layout.tsx
'use client'; // This is now a client component to support context

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

// Metadata is removed because it's not supported in client root layouts.
// It can be added to individual page.tsx files instead.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* The single, global provider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}