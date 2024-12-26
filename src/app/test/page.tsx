// src/app/test/page.tsx

import { Metadata } from 'next';

interface QueryParams {
  country?: string;
  city?: string;
  region?: string;
  latitude: string | null;
  longitude: string | null;
}
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  // Generate metadata here if needed
  return {
    title: 'Test Page',
    description: 'This is the test page.',
  };
}

export default async function TestPage(props) {
  const searchParams = await props.searchParams;
  const country = decodeURIComponent(searchParams.country || 'US');
  const city = decodeURIComponent(searchParams.city || 'San Francisco');
  const region = decodeURIComponent(searchParams.region || 'CA');
  const latitude = searchParams.latitude !== 'null' ? parseFloat(searchParams.latitude) : null;
  const longitude = searchParams.longitude !== 'null' ? parseFloat(searchParams.longitude) : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Latitude:</strong> {latitude !== null ? latitude.toFixed(6) : 'N/A'}</p>
      <p><strong>Longitude:</strong> {longitude !== null ? longitude.toFixed(6) : 'N/A'}</p>
    </div>
  );
}