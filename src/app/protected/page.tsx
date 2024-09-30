'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Navbar from '@/components/NavBar';

export default function ProtectedPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/signin')
      }
    }

    checkUser()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>Welcome, {user.email}!</p>
      <button
        onClick={() => {
          supabase.auth.signOut()
          setUser(null)
          router.push('/signin')
        }}
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  )
}