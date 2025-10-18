// promptvault-frontend/src/app/(auth)/signup/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Step 1: Just create the user account
      await api.post('/users/signup', { email: email, pass: password });

      // Step 2: Redirect to the login page with a success message
      router.push('/login?signup=success'); // Use a query param for the message

    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signup.');
      setIsLoading(false);
    }
    // No need to set isLoading to false on success as we navigate away
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Create Your Account</h1>
      <p className="text-gray-500 text-center mt-2 mb-6">Join the PromptVault community.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md disabled:opacity-50" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md disabled:opacity-50" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 disabled:opacity-50">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-indigo-600">Log In</Link>
      </p>
    </div>
  );
}