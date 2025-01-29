import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';

export async function GET() {
  try {
    // Connect to the database
    const membersCollection = await getMembersCollection();

    // Fetch all users
    const users = await membersCollection.find({}).toArray();

    // Serialize MongoDB's ObjectId for JSON compatibility
    const serializedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
    }));

    return NextResponse.json(serializedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users.' },
      { status: 500 }
    );
  }
}
