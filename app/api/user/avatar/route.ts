import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, updateUserAvatar } from '@/backend/user/user.service'
import { authorizeUser } from '@/lib/auth'

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('Handling PUT request for user avatar...');
    const { email } = await authorizeUser();
    const requestData = await request.json();
    const { avatarUrl } = requestData;
  
    if (!avatarUrl) {
      console.error('Error: Invalid avatarUrl');
      return new NextResponse('Error: Invalid avatarUrl', { status: 400 });
    }
  
    const updatedUser = await updateUserAvatar(email, avatarUrl);
    console.log('Updated user data:', updatedUser);
    return NextResponse.json({
      message: 'Success',
      updatedUser,
    });
  } catch (error) {
    console.error('Error during PUT request for user avatar:', error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('Handling GET request for user avatar...');
    const { email } = await authorizeUser();
    const user = await findUserByEmail(email);
  
    if (!user) {
      console.error('Error: User not found');
      return new NextResponse('User not found', { status: 404 });
    }
    console.log('Found user data:', user);
    return new NextResponse(
      JSON.stringify({
        avatarUrl: user.avatarUrl,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error during GET request for user avatar:', error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
