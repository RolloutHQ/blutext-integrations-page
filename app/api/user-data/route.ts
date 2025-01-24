import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server';

interface UserData {
  [appName: string]: string;
}

const redis = new Redis({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_TOKEN,
})

// Initialize empty linked accounts for a user
export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    // Check if user data already exists
    const existingData = await redis.get(userId);
    if (existingData) {
      return NextResponse.json(existingData);
    }

    await redis.set(userId, {});
    const data = await redis.get(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error storing user data:', error);
    return NextResponse.json({ error: 'Failed to store user data' }, { status: 500 });
  }
}

// Get user's linked accounts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const data = await redis.get(userId);
    if (!data) {
      return NextResponse.json({}, { status: 200 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

// Update user's linked accounts
export async function PATCH(request: Request) {
  try {
    const { userId, appName, credentialId } = await request.json();
    
    if (!userId || !appName || !credentialId) {
      return NextResponse.json({ error: 'userId, appName, and credentialId are required' }, { status: 400 });
    }

    // Get existing data
    const existingData: UserData = JSON.parse(await redis.get(userId) || '{}');
    
    // Update with new data
    const updatedData: UserData = {
      ...existingData,
      [appName]: credentialId
    };

    await redis.set(userId, updatedData);
    const data = await redis.get(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}
