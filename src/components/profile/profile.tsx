'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Member } from '@/interfaces/Member';
import { useDistance } from '@/utils/useDistance';
import { MapPin, Calendar, Quote, Sparkles, School, Star, Lightbulb } from 'lucide-react';
import RoleBadge from '../role_badge';

type RoleType = 'Developer' | 'Designer' | 'Project Manager' | 'Core' | 'Mentor';

interface ProfileDisplayProps {
  member: Member;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ member }) => {
  const { distance, loading, error } = useDistance(member.home);
  const getRoles = (): RoleType[] => {
    const roles: RoleType[] = [];
    if (member.dev) roles.push('Developer');
    if (member.des) roles.push('Designer');
    if (member.pm) roles.push('Project Manager'); // Changed from 'PM' to 'Project Manager'
    if (member.core) roles.push('Core');
    if (member.mentor) roles.push('Mentor');
    return roles;
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={member.picture || "/dali_lab_logo.jpeg"}
              alt={member.name}
              className="h-36 w-36 rounded-full object-cover ring-2 ring-gray-200"
            />
          </div>

          {/* Name, Year, and Roles */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-gray-600 text-lg">Class of {member.year}</p>
              <p className="text-gray-600 text-lg">
                {member.major}
                {member.minor && ` • Minor in ${member.minor}`}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {getRoles().map((role) => (
                  <RoleBadge key={role} role={role} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Details Section */}
        <div className="space-y-6">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-gray-900">
              {member.home}
              {!loading && !error && distance !== null && 
                <span className="text-gray-500 text-sm ml-2">
                  ({distance.toFixed(1)} miles from Hanover)
                </span>
              }
            </span>
          </div>

          {/* Birthday */}
          <div className="flex gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Birthday</p>
              <span className=" text-gray-600">{member.birthday}</span>
            </div>
            
          </div>

          {/* Quote */}
          {member.quote && (
            <div className="flex gap-2">
              <Quote className="h-5 w-5 text-gray-500" />
              <div>
              <p className="font-medium text-gray-900">Quote</p>
              <p className="text-gray-600">"{member.quote}"</p>
              </div>
              
            </div>
          )}

          {/* Favorites */}
          {member.favoriteThings.length > 0 && (
            <div className="flex gap-2">
              <Sparkles className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Favorite Things</p>
                <p className="text-gray-600">{member.favoriteThings.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Dartmouth Tradition */}
          {member.favoriteDartmouthTradition && (
            <div className="flex gap-2">
              <Star className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Favorite Dartmouth Tradition</p>
                <p className="text-gray-600">{member.favoriteDartmouthTradition}</p>
              </div>
            </div>
          )}

          {/* Fun Fact */}
          {member.funFact && (
            <div className="flex gap-2">
              <Lightbulb className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Fun Fact</p>
                <p className="text-gray-600">{member.funFact}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;