import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User'; // Ensure correct path to User model
import { initDatabase } from '@/lib/database'; // Ensure correct path to your database initialization

// The POST handler function for registration
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Initialize the database and model
    const sequelize = await initDatabase(); // Ensure DB connection is initialized
    User.initModel(sequelize); // Initialize the User model

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,  // Save the hashed password
    });

    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
