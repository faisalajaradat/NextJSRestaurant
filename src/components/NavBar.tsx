'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-slate-300 p-4 ">
      <div className="h-[7vh] container mx-auto flex justify-between items-center">
        <Link href="/" className="text-black text-2xl font-bold">
          Restaurant Tracker
        </Link>
        
        <div>
          {loading ? (
            <span className="text-black">Loading...</span>
          ) : user ? (
            
            <>
                <Link href='/home' className='text-black font-bold'> Home </Link>
              <button
                onClick={handleSignOut}
                className="bg-blue-400 text-black px-4 py-2 rounded hover:bg-slate-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-black mr-4 hover:text-blue-200">
                Sign In
              </Link>
              <Link href="/signup" className="bg-blue-400 text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}