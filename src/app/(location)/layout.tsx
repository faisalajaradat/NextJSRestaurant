import React from 'react'
import LocationProvider from "@/contexts/LocationContext";

export default function layout({children}: {children:React.ReactNode}) {
  return (
        <LocationProvider>
            {children}
        </LocationProvider>
        
     
   )
}