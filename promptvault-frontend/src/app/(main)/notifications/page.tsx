// promptvault-frontend/src/app/(main)/notifications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      // Handle case where user isn't logged in (shouldn't happen if route is protected)
      setLoading(false);
      setError('You must be logged in to view notifications.');
    }
  }, [user]);

  const handleMarkAllRead = async () => {
    try {
        await api.post('/notifications/read-all');
        // Update local state to reflect all are read
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
        console.error("Failed to mark all as read", error);
        alert("Failed to mark all notifications as read.");
    }
  };

  // Helper to render notification text
  const renderNotificationText = (notification: any) => {
    switch (notification.type) {
      case 'NEW_FOLLOWER':
        return (
          <>
            <Link href={`/${notification.actor.username}`} className="font-bold hover:underline">{notification.actor.username}</Link> started following you.
          </>
        );
      case 'PROMPT_LIKE':
        return (
          <>
            <Link href={`/${notification.actor.username}`} className="font-bold hover:underline">{notification.actor.username}</Link> liked your prompt:{' '}
            <Link href={`/prompts/${notification.prompt.id}`} className="font-semibold text-indigo-600 hover:underline">{notification.prompt.title}</Link>.
          </>
        );
      case 'PROMPT_COMMENT':
         return (
          <>
            <Link href={`/${notification.actor.username}`} className="font-bold hover:underline">{notification.actor.username}</Link> commented on your prompt:{' '}
            <Link href={`/prompts/${notification.prompt.id}`} className="font-semibold text-indigo-600 hover:underline">{notification.prompt.title}</Link>.
          </>
        );
      default:
        return 'Unknown notification type.';
    }
  };


  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
        {notifications.some(n => !n.read) && ( // Show button only if there are unread notifications
            <button
                onClick={handleMarkAllRead}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
                Mark all as read
            </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border flex items-start space-x-3 ${
                notification.read ? 'bg-white' : 'bg-indigo-50 border-indigo-200'
              }`}
            >
              {/* Actor Avatar Placeholder */}
              <img
                src={notification.actor.image || `https://api.dicebear.com/8.x/initials/svg?seed=${notification.actor.username}`}
                alt={notification.actor.username}
                className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
              />
              <div className="flex-grow">
                 <p className="text-sm text-gray-800">
                    {renderNotificationText(notification)}
                 </p>
                 <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                 </p>
              </div>
              {/* Unread Indicator */}
              {!notification.read && (
                <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">You have no notifications yet.</p>
      )}
    </div>
  );
}