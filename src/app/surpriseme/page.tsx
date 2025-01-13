'use client';

import { useLocation } from '@/contexts/LocationContext';
import React from 'react'
import toast from 'react-hot-toast';



export default function Surpriseme (){
const {location,error,loading} = useLocation();
  // const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ lat: latitude, lng: longitude });
  //         toast.success('Location retrieved successfully!');
  //       },
  //       (error) => {
  //         toast.error('Unable to retrieve your location.');
  //       }
  //     );
  //   }
  // }, []);



  return (
    <div className='container '>
        <h2 className='text-2xl flex justify-center '>Find a reccomendation for your next meal!</h2>
        <p>{location?.longitude }, {location?.latitude}</p>

    </div>
  );
}



