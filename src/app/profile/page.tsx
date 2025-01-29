import { getMembersCollection } from '@/lib/db';
import { Member } from '@/interfaces/Member';
import ProfileCard from '@/components/profile/profile_card';

export default async function ProfileListPage() {
  const membersCollection = await getMembersCollection();
  const members = await membersCollection.find({}).toArray();

  const serializedMembers: Member[] = members.map((member) => ({
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
    picture: member.picture || null,
    interest1: member.interest1 || null,
    interest2: member.interest2 || null,
  }));

  // Group members by year and sort within each year
  const membersByYear = serializedMembers.reduce<Record<string, Member[]>>((acc, member) => {
    if (!acc[member.year]) {
      acc[member.year] = [];
    }
    acc[member.year].push(member);
    return acc;
  }, {});

  // Sort members alphabetically within each year
  Object.keys(membersByYear).forEach((year) => {
    membersByYear[year].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Sort years in ascending order
  const sortedYears = Object.keys(membersByYear).sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
            Our Members
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our community members across different years
          </p>
        </div>

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                {year === "GR" ? "Graduate Students" : `Class of ${year}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {membersByYear[year].map((member) => (
                  <ProfileCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}