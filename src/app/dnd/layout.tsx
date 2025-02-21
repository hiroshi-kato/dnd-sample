import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function DndLayout({ children }: LayoutProps) {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex space-x-6">
          <Link href="/dnd/case1" className="hover:underline">
            Case 1
          </Link>
          <Link href="/dnd/case2" className="hover:underline">
            Case 2
          </Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
