import React, { useState } from 'react';

interface SearchBarProps {
  searchTerm:string;
  setSearchTerm: (term:string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {



    return (        
        <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-auto"
        />

    );
}