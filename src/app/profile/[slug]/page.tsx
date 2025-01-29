import { notFound } from 'next/navigation';
import { getMembersCollection } from '@/lib/db';
import { Member } from '@/interfaces/Member';
import ProfileDisplay from '@/components/profile/profile';
import { parseSlug } from '@/utils/slugs';
import Link from 'next/link';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const { firstName, year } = parseSlug(slug);
  
  const membersCollection = await getMembersCollection();
  const member = await membersCollection.findOne({
    $and: [
      { name: { $regex: `^${firstName}\\b`, $options: 'i' } }, // Match first name at start of string
      { year: year }
    ]
  });

  if (!member) {
    return notFound();
  }

  const plainMember: Member = {
    name: member.name,
    year: member.year,
    dev: member.dev,
    des: member.des,
    pm: member.pm,
    core: member.core,
    mentor: member.mentor,
    major: member.major,
    minor: member.minor || null,
    birthday: member.birthday,
    home: member.home,
    quote: member.quote,
    favoriteThings: member.favoriteThings,
    favoriteDartmouthTradition: member.favoriteDartmouthTradition || null,
    funFact: member.funFact || null,
    picture: member.picture,
    interest1: member.interest1 || null,
    interest2: member.interest2 || null,
  };

  return (
    <div>
      <nav className="mb-8">
          <Link href="/profile" className="text-mutedRed hover:underline">
            ← Back to Member List
          </Link>
        </nav>
      <ProfileDisplay member={plainMember} />
    </div>
  );
}