// curl -X POST \
//   -H "x-forwarded-for: 127.0.0.1" \
//   http://localhost:3000/api/load-users

import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';
import users from '@/data/members.json';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const requestMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const lastRequest = requestMap.get(clientIP);
    const now = Date.now();

    if (lastRequest && (now - lastRequest) < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in 1 hour.' },
        { status: 429 }
      );
    }
    requestMap.set(clientIP, now);

    const membersCollection = await getMembersCollection();

    const result = await membersCollection.insertMany(users);

    return NextResponse.json({
      message: `${result.insertedCount} users successfully inserted into the database!`,
    });
  } catch (error) {
    console.error('Error inserting users:', error);
    return NextResponse.json(
      { error: 'Failed to insert users.' },
      { status: 500 }
    );
  }
}