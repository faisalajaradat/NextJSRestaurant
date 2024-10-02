import { NextResponse } from 'next/server';
import { updateUser, authenticateToken } from '@/lib/database';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  // Parse the request body to get the user details (uuid and email)
  const { uuid, email }: { uuid: string, email: string } = await req.json();

  console.log("req is ", req);

  // Retrieve authToken from the cookies
  const authToken = cookies().get('authToken')?.value;

  // Ensure authToken is present
  if (!authToken) {
    return NextResponse.json({ success: false, error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  // Authenticate the request using the token
  const authResult = authenticateToken(authToken);
  console.log('authResult', authResult);

  // If there is an error with the token, return the error
  if (authResult.error) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
  }

  // Ensure user exists (we already destructured uuid and email above)
  if (!uuid || !email) {
    return NextResponse.json({ success: false, error: 'Invalid user data' }, { status: 400 });
  }

  try {
    // Update the user's profile using their UUID
    const updatedUser = await updateUser(uuid, { email });

    // If the user is not found, return a 404 response
    if (!updatedUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Return the updated user data
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
  }
}
