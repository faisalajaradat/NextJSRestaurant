import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await registerUser({ email, password: hashedPassword });
    const { password: _, ...userWithoutPassword } = user; // Exclude password from the response
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
