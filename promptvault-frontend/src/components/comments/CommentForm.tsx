// promptvault-frontend/src/components/comments/CommentForm.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';

export const CommentForm = ({ promptId, onCommentPosted }: { promptId: string, onCommentPosted: (newComment: any) => void }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post(`/prompts/${promptId}/comments`, { text });
      onCommentPosted(response.data); // Pass the new comment back to the parent page
      setText(''); // Clear the input field
    } catch (error) {
      console.error('Failed to post comment', error);
      alert('Failed to post comment. Please make sure you are logged in.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 disabled:bg-indigo-300"
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};