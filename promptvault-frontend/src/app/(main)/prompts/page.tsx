// promptvault-frontend/src/app/(main)/prompts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { PromptCard } from '@/components/prompts/PromptCard';
import Link from 'next/link';

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await api.get('/prompts');
        setPrompts(response.data);
      } catch (err) {
        setError('Failed to fetch prompts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  if (loading) return <p>Loading prompts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Discover Prompts</h1>
        <Link href="/prompts/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
          + New Prompt
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt: any) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}