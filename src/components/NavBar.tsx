'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const linkStyle = (path: string) => {
    const baseStyle = 'font-bold hover:text-blue-500 transition-colors duration-200';
    const activeStyle = 'text-blue-500 underline underline-offset-4';
    return pathname === path ? `${baseStyle} ${activeStyle}` : `${baseStyle} text-black`;
  };

  return (
    <nav className="bg-slate-300 p-4">
      {loading ? <span>Loading...</span> : (
        <div className="h-[7vh] container mx-auto flex justify-between items-center px-0">
          <div className='flex-nowrap flex items-center'>
            <Link href="/" className="text-black text-2xl mr-10 font-bold hover:text-blue-500">
              Restaurant Tracker
            </Link>
            <div className='hidden md:flex space-x-4'>
              <Link href='/home' className={linkStyle('/home')}> Home </Link>
              <Link href='/restaurants/list' className={linkStyle('/restaurants')}> Restaurants </Link>
            </div>
          </div>
          <div>
            {user ? (
              <div className='hidden md:flex'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='focus:outline-none'>
                    <Image
                      src="/profile_pic.webp"
                      width={40}
                      height={40}
                      alt="default profile pic"
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      className='hover:border-solid hover:border-black hover:border rounded-full transition-all duration-200'
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/profile"> Profile </Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className='hidden md:flex'>
                <Link href="/signin" className="bg-slate-400 text-black mr-4 px-4 py-2 rounded hover:text-blue-200">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-100">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

           {/* Mobile Hamburger Menu */}
           <div className="md:hidden">
            <button
              className="text-black focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-slate-300 flex flex-col p-4 space-y-4 shadow-md">
              <Link href="/home" className={linkStyle('/home')} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/restaurants/list" className={linkStyle('/restaurants')} onClick={() => setMobileMenuOpen(false)}>
                Restaurants
              </Link>
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={signOut} className="text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <div className='flex space-x-2 justify-end w-100'>


                <Link href="/signin" className="bg-slate-400 text-black mr-4 hover:text-blue-200 px-4 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link href="/signup" className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-100" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
                </div>
              )}
            </div>
          )}


        </div>
      )}
    </nav>
  );
}
