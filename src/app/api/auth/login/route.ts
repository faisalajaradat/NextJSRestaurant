import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { initDatabase } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const sequelize = await initDatabase();
    User.initModel(sequelize);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const token = jwt.sign({ uuid: user.uuid, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return new NextResponse(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: {
        'Set-Cookie': `authToken=${token}; HttpOnly; Path=/; Max-Age=3600`, // Set the cookie with the token
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}