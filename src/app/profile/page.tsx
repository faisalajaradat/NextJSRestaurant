'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { UUID } from 'crypto';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [currentName, setCurrentName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      // const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Fetch profile data
        // const { data: profileData, error } = await supabase
          // .from('profiles')
          // .select('username')
          // .eq('id', user.id as UUID)
          // .single();
        
        // if (profileData) {
        //   setName(profileData.username || '');
        //   setCurrentName(profileData.username || '');
        // } else if (error) {
        //   console.error('Error fetching profile:', error);
        // }
      } else {
        router.push('/signin');
      }
      setLoading(false);
    };
  
    getUser();
  }, [router]);

  const updateProfile = async () => {
    if (name === currentName) {
      toast('No changes to save.');
      return;
    }

    // const { error } = await supabase
    //   .from('profiles')
    //   .update({ username: name })
    //   .eq('id', user?.id);
    
    // if (error) {
    //   console.error('Error updating profile:', error);
    //   toast.error('Failed to update profile. Please try again.');
    // } else {
    //   setCurrentName(name);
    //   toast.success('Profile updated successfully!');
    // }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // This shouldn't happen due to the redirect, but just in case
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User name
          </label>
          <p className="text-gray-700">{currentName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User ID
          </label>
          <p className="text-gray-700">{user.uuid}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button 
          onClick={updateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;