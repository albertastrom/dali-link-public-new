import React from "react";

type RoleType = "Developer" | "Project Manager" | "Designer" | "Core" | "Mentor";

interface RoleBadgeProps {
  role: RoleType;
}

const getRoleStyles = (role: RoleType): string => {
  switch (role) {
    case "Developer":
      return "bg-[#6366f1] text-white hover:bg-[#4f46e5]"; //  indigo
    case "Project Manager":
      return "bg-[#0ea5e9] text-white hover:bg-[#0284c7]"; //  sky blue
    case "Designer":
      return "bg-[#ec4899] text-white hover:bg-[#db2777]"; //  pink
    case "Core":
      return "bg-[#f59e0b] text-white hover:bg-[#d97706]"; //  amber
    case "Mentor":
      return "bg-[#8b5cf6] text-white hover:bg-[#7c3aed]"; //  purple
    default:
      return "bg-gray-500 text-white hover:bg-gray-600";
  }
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${getRoleStyles(role)}`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;