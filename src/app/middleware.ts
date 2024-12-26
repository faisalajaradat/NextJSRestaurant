// import { geolocation } from '@vercel/functions'
// import { type NextRequest, NextResponse } from 'next/server'

// // run only on /test route
// export const config = {
//   matcher: '/test',
// }

// export async function middleware(req: NextRequest) {
//   console.log('Middleware Executed'); // Log this line

//   const url = req.nextUrl.clone()
//   const geo = geolocation(req)

//   const country = geo.country || 'US'
//   const city = geo.city || 'San Francisco'
//   const region = geo.region || 'CA'

//   const latitude = geo.latitude ? geo.latitude.toString() : null
//   const longitude = geo.longitude ? geo.longitude.toString() : null

//   url.searchParams.set('country', country)
//   url.searchParams.set('city', city)
//   url.searchParams.set('region', region)
//   url.searchParams.set('latitude', latitude || 'null')
//   url.searchParams.set('longitude', longitude || 'null')

//   console.log('Rewriting URL with params:', url.toString()); // Log the rewritten URL
//   return NextResponse.rewrite(url)
// }