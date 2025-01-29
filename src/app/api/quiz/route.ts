import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';

interface Member {
  name: string;
  year: string;
  dev: boolean;
  des: boolean;
  pm: boolean;
  core: boolean;
  mentor: boolean;
  major: string;
  minor?: string | null;
  birthday: string;
  home: string;
  quote: string;
  favoriteThings: string[];
  favoriteDartmouthTradition?: string | null;
  funFact?: string | null;
  picture?: string | null;
  interest1?: string | null;
  interest2?: string | null;
}

interface QuizResponse {
  users: Array<{
    name: string;
    picture: string | null;
  }>;
  correctUserIndex: number;
  userInfo: string[];
}

const getRandomInfo = (member: Member): string[] => {
  const possibleInfo = [
    member.major && `Major: ${member.major}`,
    member.minor && `Minor: ${member.minor}`,
    member.home && `Hometown: ${member.home}`,
    member.year && `Class Year: ${member.year}`,
    member.funFact && `Fun Fact: ${member.funFact}`,
    member.favoriteDartmouthTradition && `Favorite Dartmouth Tradition: ${member.favoriteDartmouthTradition}`,
    member.favoriteThings?.[0] && `One of their favorite things: ${member.favoriteThings[0]}`,
    member.interest1 && `Interest: ${member.interest1}`,
    member.interest2 && `Another Interest: ${member.interest2}`,
    member.quote && `Their quote: "${member.quote}"`,
  ].filter(Boolean) as string[];

  const numInfo = Math.floor(Math.random() * 2) + 3; // 3 or 4
  return possibleInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(numInfo, possibleInfo.length));
};

const getRoleInfo = (member: Member): string | null => {
  const roles: string[] = [];
  if (member.dev) roles.push('Developer');
  if (member.des) roles.push('Designer');
  if (member.pm) roles.push('Project Manager');
  if (member.core) roles.push('Core Team');
  if (member.mentor) roles.push('Mentor');
  return roles.length > 0 ? `Role(s): ${roles.join(', ')}` : null;
};

export async function GET(): Promise<NextResponse<QuizResponse | { error: string }>> {
  try {
    const membersCollection = await getMembersCollection();
    const users = await membersCollection.find({}).toArray() as Member[];
    
    const shuffled = users
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    const correctUserIndex = Math.floor(Math.random() * 4);
    const correctUser = shuffled[correctUserIndex];
    
    const roleInfo = getRoleInfo(correctUser);
    const personalInfo = getRandomInfo(correctUser);
    
    const userInfo = roleInfo 
      ? [roleInfo, ...personalInfo]
      : personalInfo;

    return NextResponse.json({
      users: shuffled.map(user => ({
        name: user.name,
        picture: user.picture || null
      })),
      correctUserIndex,
      userInfo
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz.' },
      { status: 500 }
    );
  }
}