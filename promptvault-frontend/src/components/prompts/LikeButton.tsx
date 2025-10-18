// promptvault-frontend/src/components/prompts/LikeButton.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

// We need to know the prompt's ID, its initial like count,
// and whether the current user has already liked it.
interface LikeButtonProps {
  promptId: string;
  initialLikesCount: number;
  isInitiallyLiked: boolean;
}

export const LikeButton = ({ promptId, initialLikesCount, isInitiallyLiked }: LikeButtonProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!user) return alert('Please log in to like a prompt.');
    setIsLoading(true);
    try {
      await api.post(`/prompts/${promptId}/like`);
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to like prompt', error);
    }
    setIsLoading(false);
  };

  const handleUnlike = async () => {
    if (!user) return; // Should not happen if button is shown correctly
    setIsLoading(true);
    try {
      await api.delete(`/prompts/${promptId}/like`);
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } catch (error) {
      console.error('Failed to unlike prompt', error);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    if (isLiked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center space-x-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
        isLiked
          ? 'text-rose-500'
          : 'text-gray-500 hover:text-rose-500'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{likesCount}</span>
    </button>
  );
};