// promptvault-frontend/src/app/(main)/prompts/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { PromptCard } from '@/components/prompts/PromptCard';
import { CommentList } from '@/components/comments/CommentList';
import { CommentForm } from '@/components/comments/CommentForm';
import { useAuth } from '@/contexts/AuthContext';

export default function SinglePromptPage() {
  const params = useParams();
  const promptId = params.id as string;
  const { user } = useAuth();

  const [prompt, setPrompt] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (promptId) {
      const fetchPromptAndComments = async () => {
        try {
          // In a real app, you might have a single endpoint to get all this data
          const promptRes = await api.get(`/prompts`); // This is not ideal, we need a single prompt endpoint
          const foundPrompt = promptRes.data.find((p: any) => p.id === promptId);
          setPrompt(foundPrompt);

          const commentsRes = await api.get(`/prompts/${promptId}/comments`);
          setComments(commentsRes.data);
        } catch (err) {
          setError('Failed to load prompt details.');
        } finally {
          setLoading(false);
        }
      };
      fetchPromptAndComments();
    }
  }, [promptId]);

  const handleNewComment = (newComment: any) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (loading) return <p>Loading prompt...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!prompt) return <p>Prompt not found.</p>;

  return (
    <div>
      <PromptCard prompt={prompt} />
      <div className="mt-8">
        {user ? (
          <CommentForm promptId={promptId} onCommentPosted={handleNewComment} />
        ) : (
          <p className="text-gray-500">You must be logged in to comment.</p>
        )}
        <CommentList comments={comments} />
      </div>
    </div>
  );
}