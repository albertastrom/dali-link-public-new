import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { Member } from '@/interfaces/Member';
import { generateSlug } from '@/utils/slugs';
import RoleBadge from '../role_badge';

type RoleType = "Developer" | "Project Manager" | "Designer" | "Core" | "Mentor";

interface ProfileCardProps {
  member: Member;
}

const getRoles = (member: Member): RoleType[] => {
  const roles: RoleType[] = [];
  if (member.dev) roles.push('Developer');
  if (member.des) roles.push('Designer');
  if (member.pm) roles.push('Project Manager');
  if (member.core) roles.push('Core');
  if (member.mentor) roles.push('Mentor');
  return roles;
};

export default function ProfileCard({ member }: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${generateSlug(member.name.split(' ')[0], member.year)}`}
      className="group"
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="h-48 bg-slate-100 flex items-center justify-center">
          {member.picture ? (
            <img
              src={member.picture}
              alt={member.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <UserCircle className="h-24 w-24 text-slate-300" />
          )}
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              {member.name}
            </h3>
            <p className="text-sm text-slate-500">
              {member.major}
              {member.minor && ` • Minor in ${member.minor}`}
            </p>
            <p className="text-sm text-slate-500">
              From {member.home}
            </p>
          </div>

          {/* Roles */}
          {getRoles(member).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getRoles(member).map((role) => (
                
                <RoleBadge key={role} role={role} />
                
              ))}
            </div>
          )}

          
        </div>
      </div>
    </Link>
  );
}