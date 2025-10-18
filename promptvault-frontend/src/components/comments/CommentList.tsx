// promptvault-frontend/src/components/comments/CommentList.tsx
'use client';

import { format } from 'date-fns'; // We'll need to install this library

export const CommentList = ({ comments }: { comments: any[] }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full"></div> {/* Placeholder for avatar */}
                <p className="font-bold">{comment.author.username || 'Anonymous'}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <p className="mt-2 text-gray-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};