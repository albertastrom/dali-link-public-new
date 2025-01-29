import { Member } from '@/interfaces/Member';

export const mockMembers: Member[] = [
  {
    name: 'Test User',
    year: '2025',
    dev: true,
    des: false,
    pm: true,
    core: true,
    mentor: false,
    major: 'Computer Science',
    minor: 'Human-Centered Design',
    birthday: '06-22',
    home: 'San Diego, CA',
    quote: '“How can I possibly be expected to handle school on a day like this?” - Ferris Bueller',
    favoriteThings: [
      'FOCO tender queso (ask me about it)',
      'FOCO milkshake (ask me about it)',
      'Back of the Napkin Hot Dogs',
    ],
    favoriteDartmouthTradition: 'The Bonfire',
    funFact: "I don't eat fruit!",
    picture: 'https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png',
    interest1: 'sports',
    interest2: 'learning',
  },
  // Add more members as needed
];
