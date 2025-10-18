// promptvault-frontend/src/app/(main)/search/[query]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { PromptCard } from '@/components/prompts/PromptCard';

export default function SearchResultsPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const [results, setResults] = useState<{ prompts: any[]; users: any[] }>({ prompts: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const response = await api.get(`/search?q=${query}`);
          setResults(response.data);
        } catch (err) {
          setError('Failed to fetch search results.');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);

  if (loading) return <p>Searching...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Search Results for "{query}"
      </h1>

      {/* User Results */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        {results.users.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.users.map((user) => (
              <Link href={`/${user.username}`} key={user.id} className="text-center p-4 bg-white rounded-lg shadow-md border hover:border-indigo-500">
                 {/* Placeholder for image */}
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-gray-800">{user.username}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </section>

      {/* Prompt Results */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Prompts</h2>
        {results.prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No prompts found.</p>
        )}
      </section>
    </div>
  );
}