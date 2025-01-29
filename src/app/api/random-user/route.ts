import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';

export async function GET() {
  try {
    // Connect to the database
    const membersCollection = await getMembersCollection();

    // Fetch all users
    const users = await membersCollection.find({}).toArray();

    // If no users found, return 404
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'No users found.' },
        { status: 404 }
      );
    }

    // Get random user
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];

    // Serialize MongoDB's ObjectId
    const serializedUser = {
      ...randomUser,
      _id: randomUser._id.toString(),
    };

    return NextResponse.json(serializedUser);
  } catch (error) {
    console.error('Error fetching random user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random user.' },
      { status: 500 }
    );
  }
}