// promptvault-frontend/src/app/(auth)/layout.tsx
'use client';

// AuthProvider is no longer needed here

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-400">
      {children}
    </div>
  );
}