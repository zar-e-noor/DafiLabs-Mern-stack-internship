'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Contact Queries', href: '/admin/contacts' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-gray-900 border-r border-gray-800 px-6 py-8 min-h-screen">
        <div className="font-extrabold text-2xl mb-10 text-white tracking-wide select-none">
          Admin
        </div>
        <nav className="flex-1 space-y-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md transition-all
                ${
                  pathname === link.href
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'hover:bg-gray-800 hover:text-white text-gray-300'
                }
              `}
            >
              {link.name}
            </a>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-all font-semibold text-white"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-950 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}