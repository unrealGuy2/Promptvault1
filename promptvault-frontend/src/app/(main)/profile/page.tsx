// promptvault-frontend/src/app/(main)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch profile. You might not be logged in.');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900">User Profile</h1>
      <button 
        onClick={fetchProfile} 
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
      >
        Fetch My Profile
      </button>

      {user && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}

      {error && <p className="mt-4 text-danger">{error}</p>}
    </div>
  );
}