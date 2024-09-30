import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { useAuth } from '@/hooks/useAuth';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const authToken = cookie?.split('; ').find(c => c.startsWith('authToken='))?.split('=')[1];

    if (!authToken) {
      return NextResponse.json({ message: 'No auth token found' }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(authToken, JWT_SECRET);
    console.log('Decoded token:', decoded);
    // Return user info
    return NextResponse.json({ message: 'Authenticated', user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
