import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const authToken = cookie?.split('; ').find(c => c.startsWith('authToken='))?.split('=')[1];

    if (!authToken) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(authToken, JWT_SECRET);

    // Return user info
    return NextResponse.json({ message: 'Authenticated', user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
