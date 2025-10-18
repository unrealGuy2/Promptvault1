// promptvault-frontend/src/app/(main)/feed/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { PromptCard } from '@/components/prompts/PromptCard';

export default function FeedPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await api.get('/users/feed');
        setPrompts(response.data);
      } catch (err) {
        setError('Failed to fetch your feed. Try following some creators!');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) return <p>Loading your feed...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">My Feed</h1>
      {prompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt: any) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your feed is empty. Go to the "Discover" page to follow some prompt engineers!</p>
      )}
    </div>
  );
}