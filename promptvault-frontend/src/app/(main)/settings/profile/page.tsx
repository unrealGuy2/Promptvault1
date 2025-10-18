// promptvault-frontend/src/app/(main)/settings/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Your Cloudinary details have been added here
  const CLOUDINARY_CLOUD_NAME = 'ddermyxva';
  const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setImageUrl(user.image || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    let finalImageUrl = user?.image || '';

    // Step 1: If there's a new image file, upload it to Cloudinary first
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
          finalImageUrl = data.secure_url; // Get the URL from Cloudinary
        } else {
          throw new Error('Image upload failed');
        }
      } catch (err) {
        setError('Failed to upload image.');
        setIsUploading(false);
        return;
      }
    }

    // Step 2: Save the new bio and the final image URL to our backend
    try {
      const response = await api.patch('/users/profile', {
        bio: bio,
        image: finalImageUrl,
      });
      setUser(response.data); // Update the user in our global context
      setImageUrl(response.data.image); // Update the preview image URL
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
    
    setIsUploading(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="mt-1 flex items-center space-x-4">
            <img 
              src={imageUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${user.username}`} 
              alt="Profile preview" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Tell us a little about yourself..."
          ></textarea>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button type="submit" disabled={isUploading} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 disabled:opacity-50">
          {isUploading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}