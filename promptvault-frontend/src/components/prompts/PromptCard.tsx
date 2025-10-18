// promptvault-frontend/src/components/prompts/PromptCard.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { FollowButton } from '../users/FollowButton';
import { LikeButton } from './LikeButton';
import { ForkButton } from './ForkButton';
import Link from 'next/link';

export const PromptCard = ({ prompt }: { prompt: any }) => {
  const { user } = useAuth();

  const isAlreadyFollowing = false;
  const isAlreadyLiked = false;

  // Safely get the likes count, defaulting to 0 if it doesn't exist
  const likesCount = prompt._count?.likes ?? 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
      {/* Link the main body of the card to the detail page */}
      <Link href={`/prompts/${prompt.id}`} className="flex flex-col flex-grow">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{prompt.title}</h3>
            <p className="text-gray-500 mt-1 text-sm">
              by <span className="font-semibold text-gray-700">{prompt.author?.username || 'Unknown'}</span>
            </p>
          </div>
          {user && user.userId !== prompt.author.id && (
            <FollowButton authorId={prompt.author.id} isFollowingInitially={isAlreadyFollowing} />
          )}
        </div>

        {/* Prompt Description */}
        <p className="text-gray-700 my-4 flex-grow">{prompt.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag: string) => (
            <span key={tag} className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Card Footer with actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <LikeButton 
          promptId={prompt.id}
          initialLikesCount={likesCount} // Use the safe value here
          isInitiallyLiked={isAlreadyLiked}
        />
        {user && user.userId !== prompt.author.id && (
          <ForkButton promptId={prompt.id} />
        )}
      </div>
    </div>
  );
};