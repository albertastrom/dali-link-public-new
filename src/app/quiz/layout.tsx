import Link from 'next/link';
import Header from '@/components/header/header';

export default function ProfileDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`animatedGradient antialiased sm:px-2.5 sm:py-2.5 max-sm:border-t-4 max-sm:border-t-dali`}>
    <div className="bg-slate-50 sm:min-h-[calc(100vh-1.25rem)] sm:rounded-xl shadow-sm p-4 sm:pt-8">
      <div className="max-w-screen-lg mx-auto">
        <div className="">
          <Header />
        
        <div>{children}</div>
      </div>
    </div>
    </div>
    </div>
  );
}
