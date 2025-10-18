// promptvault-frontend/src/components/users/FollowButton.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';

// We'll need to know if the current user is already following this author
export const FollowButton = ({ authorId, isFollowingInitially }: { authorId: string, isFollowingInitially: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitially);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await api.post(`/users/${authorId}/follow`);
      setIsFollowing(true);
    } catch (error) {
      console.error('Failed to follow user', error);
      // Optional: Add user feedback here, like a toast notification
    }
    setIsLoading(false);
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/users/${authorId}/follow`);
      setIsFollowing(false);
    } catch (error) {
      console.error('Failed to unfollow user', error);
      // Optional: Add user feedback here
    }
    setIsLoading(false);
  };

  if (isFollowing) {
    return (
      <button 
        onClick={handleUnfollow} 
        disabled={isLoading} 
        className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
      >
        Following
      </button>
    );
  }

  return (
    <button 
      onClick={handleFollow} 
      disabled={isLoading} 
      className="px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors"
    >
      Follow
    </button>
  );
};