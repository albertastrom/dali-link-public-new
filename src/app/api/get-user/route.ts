// Usage
// curl -G 'http://localhost:3000/api/get-user' --data-urlencode 'fullName=John Doe' --data-urlencode 'year=2023'

import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fullName = searchParams.get('fullName');
  const year = searchParams.get('year');

  if (!fullName || !year) {
    return NextResponse.json(
      { error: 'Missing fullName or year query parameter.' },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    const membersCollection = await getMembersCollection();

    // Fetch the specific user
    const user = await membersCollection.findOne({ fullName, year });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      );
    }

    // Serialize MongoDB's ObjectId for JSON compatibility
    const serializedUser = {
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
    };

    return NextResponse.json(serializedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user.' },
      { status: 500 }
    );
  }
}