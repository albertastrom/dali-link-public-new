import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';


const SECRET_PASSWORD = process.env.SECRET_PASSWORD

export async function DELETE(request: Request) {
  try {
    // Get password from request headers
    const authHeader = request.headers.get('Authorization');

    // Check if password matches
    if (authHeader !== SECRET_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    const membersCollection = await getMembersCollection();

    // Delete all documents
    const result = await membersCollection.deleteMany({});

    return NextResponse.json({
      message: 'All entries deleted successfully',
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Error deleting entries:', error);
    return NextResponse.json(
      { error: 'Failed to delete entries' },
      { status: 500 }
    );
  }
}