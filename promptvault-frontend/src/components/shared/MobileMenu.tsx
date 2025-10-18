// promptvault-frontend/src/components/shared/MobileMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export const MobileMenu = ({ user, handleLogout }: { user: any, handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-20">
          <div className="flex flex-col items-center space-y-4 py-4">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                <Link href="/prompts" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-indigo-600">Discover</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500 hover:text-red-700">Log Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 w-3/4 text-center rounded-md text-gray-700 hover:bg-gray-100">Log In</Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="px-4 py-2 w-3/4 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};