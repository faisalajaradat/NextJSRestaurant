'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';



const ProfilePage = () => {
  const { user, setUser, fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const getUser = async () => {
      if (!user) {
        router.push('/signin');
      }else{
        console.log(user);
        setEmail(user.email);
        setCurrentEmail(user.email);
      }
      setLoading(false);
    };
  
    getUser();
  }, [router,user]);

  const updateProfile = async () => {
    if (email === currentEmail) {
      toast('No changes to save.');
      return;
    }
    if (user) {
      try {
        // Automatically send the authenticated user's UUID along with the email update
        const response = await fetch('/api/update-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uuid: user?.uuid,
            email,
          }),
        });

        const result = await response.json();

        if (result.success) {
          await fetchUser();
          console.log(await fetchUser());
          // setUser({ ...user, email });
          // setCurrentEmail(email);
          toast.success('Profile updated successfully!');
        } else {
          toast.error('Failed to update profile. Please try again.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.');
      }
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
            User ID
          </label>
          <p className="text-gray-700">{user.uuid}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Update Email
          </label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
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