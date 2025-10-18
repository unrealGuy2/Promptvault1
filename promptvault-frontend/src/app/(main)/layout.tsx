// promptvault-frontend/src/app/(main)/layout.tsx
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

// AuthProvider is no longer needed here

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}