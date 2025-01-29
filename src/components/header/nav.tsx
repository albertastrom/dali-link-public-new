import React from 'react';
import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav className="bg-white rounded-lg shadow-md p-3 m-4">
      <ul className="flex justify-around list-none m-0 p-0">
        <li>
          <Link href="/profile" className="text-gray-700 no-underline px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Members
          </Link>
        </li>
        <li>
          <Link href="/stats" className="text-gray-700 no-underline px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Stats
          </Link>
        </li>
        <li>
          <Link href="/quiz" className="text-gray-700 no-underline px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;