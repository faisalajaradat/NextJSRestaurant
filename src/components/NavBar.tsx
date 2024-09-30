'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();

  const linkStyle = (path: string) => {
    const baseStyle = 'font-bold hover:text-blue-500 transition-colors duration-200';
    const activeStyle = 'text-blue-500 underline underline-offset-4';
    return pathname === path ? `${baseStyle} ${activeStyle}` : `${baseStyle} text-black`;
  };

  return (
    <nav className="bg-slate-300 p-4 ">
      <div className="h-[7vh] container mx-auto flex justify-between items-center ">
        <div className='flex-nowrap flex items-center'>
          <Link href="/" className="text-black text-2xl mr-10 font-bold hover:text-blue-500">
            Restaurant Tracker
          </Link>
          <div className='space-x-4'>
            <Link href='/home' className={linkStyle('/home')}> Home </Link>
            <Link href='/restaurants' className={linkStyle('/restaurants')}> Restaurants </Link>
          </div>
        </div>
        <div>
          {loading ? (
            <span className="text-black">Loading...</span>
          ) : user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none'>
                  <Image
                    src="/profile_pic.webp"
                    width={30}
                    height={30}
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
            <>
              <Link href="/signin" className="text-black mr-4 hover:text-blue-200">
                Sign In
              </Link>
              <Link href="/signup" className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-100">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
