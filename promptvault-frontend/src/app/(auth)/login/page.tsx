// promptvault-frontend/src/app/(auth)/login/page.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react'; // Added useEffect
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For the signup success message
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read query params

  // Show signup success message if redirected from signup
  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setSuccessMessage('Signup successful! Please log in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      // Step 1: Log the user in
      const response = await api.post('/users/login', {
        email: email,
        pass: password,
      });
      const { access_token } = response.data;

      // Step 2: Update the AuthContext (which also fetches the user profile)
      await login(access_token);

      // Step 3: Fetch the user profile *again* directly here to check for username
      // We do this immediately after login to ensure we have the latest user data
      const profileResponse = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${access_token}` } // Ensure token is sent
      });
      const userProfile = profileResponse.data;

      // Step 4: Redirect based on whether the username exists
      if (!userProfile.username) {
        router.push('/onboarding'); // Needs onboarding
      } else {
        router.push('/dashboard'); // Already onboarded
      }

    } catch (err: any)      {
      setError(err.response?.data?.message || 'An error occurred during login.');
      setIsLoading(false);
    }
     // No need to set isLoading to false on success as we navigate away
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome Back</h1>
      <p className="text-gray-500 text-center mt-2 mb-6">Log in to access your vault.</p>

      {successMessage && <p className="mb-4 text-center text-sm text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md disabled:opacity-50"
          />
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 disabled:opacity-50">
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-indigo-600">Sign Up</Link>
      </p>
    </div>
  );
}