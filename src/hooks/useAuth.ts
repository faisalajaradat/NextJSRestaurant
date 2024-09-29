// import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { User } from '@supabase/supabase-js'

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     // Initial session check
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   return { user, loading }
// }'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the User interface
export interface User {
  uuid: string;
  email: string;
  // Add any other user properties you need here (e.g., name, role, etc.)
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);  // 'user' now has the type 'User | null'
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Ensures cookies (for sessions) are included in the request
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);  // Ensure the API returns a user object with 'uuid'
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      router.push('/signin');  // Redirect to the signin page after logout
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return { user, loading, signOut };
};
