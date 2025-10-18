// promptvault-frontend/src/components/shared/Searchbar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Searchbar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for prompts or engineers..."
        className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </form>
  );
};