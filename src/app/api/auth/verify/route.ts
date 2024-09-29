import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Ensure you have this set in your environment variables

export async function POST(req: Request) {
  try {
    // Get the Authorization header
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    // The token is expected to be in the format: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token missing' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Optionally, you could fetch the user from the database if needed
    // Assuming the token contains the user's ID and email
    const { id, email } = decoded as { id: number; email: string };

    // Respond with the user information
    return NextResponse.json({ user: { id, email } }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
