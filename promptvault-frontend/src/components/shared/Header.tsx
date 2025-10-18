// promptvault-frontend/src/components/shared/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Searchbar } from './Searchbar';
import { MobileMenu } from './MobileMenu';
import { NotificationBell } from '../notifications/NotificationBell'; // <-- Import

export const Header = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo Placeholder */}
        <Link href="/" className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white font-bold text-xl rounded-md flex-shrink-0">
          P
        </Link>

        {/* Searchbar */}
        <div className="flex-grow hidden md:block px-4">
          <Searchbar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center flex-shrink-0">
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : user ? (
            <>
              {/* Notification Bell Added Here */}
              <NotificationBell />
              
              <p className="text-gray-700 hidden sm:block text-sm">
                Welcome, <span className="font-bold text-indigo-600">{user.username || user.email}</span>
              </p>
              <Link href={`/${user.username}`} className="text-sm font-medium text-gray-500 hover:text-indigo-600">
                View Profile
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-indigo-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-gray-500 hover:text-indigo-600 text-sm font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-md text-gray-500 hover:text-indigo-600 text-sm font-medium">
                Log In
              </Link>
              <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 text-sm font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu */}
        {!loading && <MobileMenu user={user} handleLogout={handleLogout} />}
      </div>
    </header>
  );
};