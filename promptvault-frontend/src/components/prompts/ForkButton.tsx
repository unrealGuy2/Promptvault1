// promptvault-frontend/src/components/prompts/ForkButton.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export const ForkButton = ({ promptId }: { promptId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFork = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(`/prompts/${promptId}/fork`);
      // On success, redirect to the new forked prompt's detail page
      router.push(`/prompts/${response.data.id}`);
    } catch (error) {
      console.error('Failed to fork prompt', error);
      alert('Failed to fork prompt. You might not be logged in or you cannot fork your own prompt.');
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleFork}
      disabled={isLoading}
      className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
    >
      {/* A simple fork icon SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21m-5.25 0h5.25M9 21v-6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21m-5.25 0h5.25M15 21v-6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21m-5.25 0h5.25M9 3.75h6.375c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125H9.375a1.125 1.125 0 01-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125z" />
      </svg>
      <span>Fork</span>
    </button>
  );
};