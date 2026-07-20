'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Users as UsersIcon,
  Clock as ClockIcon,
  CheckCircle2 as CheckCircleIcon,
  Award as AwardIcon,
} from 'lucide-react';

type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string | null;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const [pendingQueries, setPendingQueries] = useState<number | null>(null);
  const [resolvedQueries, setResolvedQueries] = useState<number | null>(null);
  const [completedQueries, setCompletedQueries] = useState<number | null>(null);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  function formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  useEffect(() => {
    const fetchContactStatsAndRecent = async () => {
      setLoading(true);

      // Fetch counts from Supabase
      const [totalRes, pendingRes, resolvedRes, completedRes] = await Promise.all([
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .or('status.is.null,status.ilike.pending'),
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .ilike('status', 'resolved'),
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .or('status.ilike.done,status.ilike.completed'),
      ]);

      setTotalContacts(totalRes.count ?? 0);
      setPendingQueries(pendingRes.count ?? 0);
      setResolvedQueries(resolvedRes.count ?? 0);
      setCompletedQueries(completedRes.count ?? 0);

      // Fetch recent contact submissions using exact column name 'createdAt'
      const { data: recent, error } = await supabase
        .from('contacts')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(6);

      if (!error && Array.isArray(recent)) {
        const mapped: Contact[] = recent.map((c) => ({
          id: c.id,
          name: c.name || 'Anonymous',
          email: c.email || 'No Email',
          subject: c.subject || '—',
          message: c.message || '',
          status: c.status || 'Pending',
          createdAt: c.createdAt,
        }));
        setRecentContacts(mapped);
      } else {
        console.error('Error fetching recent contacts:', error);
      }

      setLoading(false);
    };

    fetchContactStatsAndRecent();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 p-6 shadow mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome, Admin!</h1>
        <p className="text-gray-200 mt-2">
          Here is an overview of your contact queries. Have a productive day!
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Contacts"
          value={loading ? '-' : totalContacts}
          icon={<UsersIcon size={26} className="text-white" />}
          bgColor="bg-slate-800 border-slate-700"
          iconBg="bg-slate-700"
        />
        <StatCard
          title="Pending Queries"
          value={loading ? '-' : pendingQueries}
          icon={<ClockIcon size={26} className="text-amber-300" />}
          bgColor="bg-amber-950/60 border-amber-800/80"
          iconBg="bg-amber-900/80"
        />
        <StatCard
          title="Resolved Queries"
          value={loading ? '-' : resolvedQueries}
          icon={<CheckCircleIcon size={26} className="text-emerald-300" />}
          bgColor="bg-emerald-950/60 border-emerald-800/80"
          iconBg="bg-emerald-900/80"
        />
        <StatCard
          title="Completed Queries"
          value={loading ? '-' : completedQueries}
          icon={<AwardIcon size={26} className="text-blue-300" />}
          bgColor="bg-blue-950/60 border-blue-800/80"
          iconBg="bg-blue-900/80"
        />
      </div>

      {/* Recent Contacts Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Recent Contact Submissions
        </h2>
        <div className="rounded-lg bg-gray-900 border border-gray-800 shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-400">
              Loading recent contacts...
            </div>
          ) : recentContacts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {recentContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="py-3 px-4 text-gray-200 text-sm font-medium">
                      {contact.name}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {contact.email}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {contact.subject}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={contact.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-400">
              No recent contacts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  bgColor,
  iconBg,
}: {
  title: string;
  value: number | string | null;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
}) {
  return (
    <div
      className={`rounded-xl p-5 flex items-center shadow-lg border ${bgColor}`}
    >
      <div
        className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mr-4 shrink-0`}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm font-medium text-gray-300">{title}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string | null }) {
  const val = (status || 'Pending').toLowerCase();

  let style = 'bg-amber-950 text-amber-300 border-amber-700';
  let label = 'Pending';

  if (val === 'resolved') {
    style = 'bg-emerald-950 text-emerald-300 border-emerald-700';
    label = 'Resolved';
  } else if (val === 'done' || val === 'completed') {
    style = 'bg-blue-950 text-blue-300 border-blue-700';
    label = 'Completed';
  }

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${style}`}
    >
      {label}
    </span>
  );
}