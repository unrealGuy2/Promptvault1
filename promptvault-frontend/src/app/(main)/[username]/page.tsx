// promptvault-frontend/src/app/(main)/[username]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { PromptCard } from '@/components/prompts/PromptCard';

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: currentUser } = useAuth(); // Logged-in user's data from context

  const [profile, setProfile] = useState<any>(null); // Data for the profile being viewed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        setLoading(true); // Ensure loading is true when fetching
        try {
          const response = await api.get(`/users/profile/${username}`);
          setProfile(response.data);
          setError(''); // Clear previous errors
        } catch (err) {
          setError('User not found.');
          setProfile(null); // Clear profile data on error
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [username]); // Re-fetch if username changes

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!profile) return <p className="text-center mt-10">User not found.</p>;

  // Check if the currently logged-in user is viewing their own profile
  const isOwnProfile = currentUser && profile && currentUser.userId === profile.id;
  const isPromptEngineer = currentUser && currentUser.role === 'PROMPT_ENGINEER';

  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
        <img
          src={profile.image || `https://api.dicebear.com/8.x/initials/svg?seed=${profile.username}`}
          alt={`${profile.username}'s profile picture`}
          className="w-24 h-24 rounded-full flex-shrink-0 border-4 border-white shadow-md bg-gray-200" // Added bg-gray-200 for placeholder
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{profile.username}</h1>
            {isOwnProfile && ( // Button relies on this condition
                <Link href="/settings/profile" className="bg-gray-200 text-gray-800 px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300">
                  Edit Profile
                </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-500 text-sm sm:text-base">
            <span><span className="font-bold text-gray-900">{profile.prompts?.length ?? 0}</span> Prompts</span>
            <span><span className="font-bold text-gray-900">{profile._count?.followedBy ?? 0}</span> Followers</span>
            <span><span className="font-bold text-gray-900">{profile._count?.following ?? 0}</span> Following</span>
          </div>
          <p className="mt-4 text-gray-600">{profile.bio || 'No bio provided.'}</p>
        </div>
      </div>

      {/* User's Prompts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Prompts by {profile.username}</h2>
          {isOwnProfile && isPromptEngineer && (
            <Link href="/prompts/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              + New Prompt
            </Link>
          )}
        </div>
        {profile.prompts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.prompts.map((prompt: any) => (
              // Ensure author data passed to PromptCard is consistent
              <PromptCard key={prompt.id} prompt={{...prompt, author: { id: profile.id, username: profile.username }}} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">This user hasn't posted any prompts yet.</p>
        )}
      </div>
    </div>
  );
}