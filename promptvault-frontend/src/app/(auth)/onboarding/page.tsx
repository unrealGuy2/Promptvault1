// promptvault-frontend/src/app/(auth)/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext'; // <-- Import useAuth

export default function OnboardingPage() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('EXPLORER');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth(); // <-- Get the setUser function from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Save the profile to the backend
      const response = await api.patch('/users/profile',
        { username, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // CRITICAL FIX: Update the user state in AuthContext with the response
      setUser(response.data);

      router.push('/dashboard'); // Redirect after successful save and context update

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save profile. Username might be taken.');
      console.error("Error during onboarding save:", err);
      setIsLoading(false);
    }
    // No need to set isLoading to false on success as we navigate away
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Complete Your Profile
      </h1>
      <p className="text-gray-500 text-center mt-2 mb-6">
        Choose a unique username and your role.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              promptvault.app/
            </span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 disabled:opacity-50"
              placeholder="your-username"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose Your Role</label>
          <div className="mt-2 space-y-2">
            <div onClick={() => !isLoading && setRole('PROMPT_ENGINEER')} className={`p-4 border rounded-lg cursor-pointer ${role === 'PROMPT_ENGINEER' ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <h3 className="font-bold">Prompt Engineer</h3>
              <p className="text-sm text-gray-500">Create, publish, and collaborate on prompts.</p>
            </div>
            <div onClick={() => !isLoading && setRole('EXPLORER')} className={`p-4 border rounded-lg cursor-pointer ${role === 'EXPLORER' ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <h3 className="font-bold">Explorer</h3>
              <p className="text-sm text-gray-500">Browse, like, comment, and use prompts.</p>
            </div>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save and Continue'}
        </button>
      </form>
    </div>
  );
}