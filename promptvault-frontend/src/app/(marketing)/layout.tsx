// promptvault-frontend/src/app/(marketing)/layout.tsx
'use client';

import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

// AuthProvider is no longer needed here

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}