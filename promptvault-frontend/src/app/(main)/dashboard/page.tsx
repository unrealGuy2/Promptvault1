// promptvault-frontend/src/app/(main)/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth(); // Get the logged-in user

  // Check if the user is a Prompt Engineer
  const isPromptEngineer = user && user.role === 'PROMPT_ENGINEER';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
        {/* Conditionally render the button here */}
        {isPromptEngineer && (
          <Link href="/prompts/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
            + New Prompt
          </Link>
        )}
      </div>
      <p className="text-gray-500 mt-2">
        Welcome to your dashboard. Your personalized prompt feed will appear here soon.
      </p>
    </div>
  );
}