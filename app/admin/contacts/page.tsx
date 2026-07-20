'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string | null;
};

const STATUS_OPTIONS = ['Pending', 'Done', 'Completed', 'Resolved'];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    setErrorId(null);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
        setLoading(false);
        return;
      }

      setContacts(
        Array.isArray(data)
          ? data.map((c: any) => ({
              id: c.id,
              name: c.name || 'Anonymous',
              email: c.email || 'No Email',
              subject: c.subject || '—',
              message: c.message || '—',
              createdAt: c.createdAt,
              status: c.status || 'Pending',
            }))
          : []
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setContacts([]);
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdatingId(id);
    setSuccessId(null);
    setErrorId(null);

    // Update status in Supabase
    const { error } = await supabase
      .from('contacts')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      // Optimistically update local UI state immediately
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 1500);
    } else {
      console.error('Error updating status:', error);
      setErrorId(id);
      setTimeout(() => setErrorId(null), 2000);
    }
    setUpdatingId(null);
  }

  function renderStatus(status: string | null) {
    switch ((status || '').toLowerCase()) {
      case 'done':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
            Done
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-700">
            Completed
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-950 text-green-300 border border-green-700">
            Resolved
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-700">
            Pending
          </span>
        );
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Contact Queries</h1>
      {loading ? (
        <div className="text-gray-200">Loading queries...</div>
      ) : contacts.length === 0 ? (
        <div className="text-gray-400">No contact submissions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-800/60 border-b border-gray-800">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Subject
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Message
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-300 uppercase">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-800/40 transition"
                >
                  <td className="py-3 px-4 font-medium text-white text-sm">
                    {contact.name}
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-sm">
                    <a
                      href={`mailto:${(contact.email || '').replace(
                        /[^a-zA-Z0-9@._-]/g,
                        ''
                      )}`}
                      className="underline decoration-dotted hover:text-blue-300"
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-sm">
                    {contact.subject}
                  </td>
                  <td
                    className="py-3 px-4 max-w-xs truncate text-sm"
                    title={contact.message}
                  >
                    <span className="block text-gray-300 truncate">
                      {contact.message}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm whitespace-nowrap">
                    {contact.createdAt
                      ? new Date(contact.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )
                      : '—'}
                  </td>
                  <td className="py-3 px-4">{renderStatus(contact.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <select
                        className={`bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 border border-gray-700 focus:outline-none focus:border-blue-500 transition cursor-pointer ${
                          updatingId === contact.id
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        value={contact.status || 'Pending'}
                        disabled={updatingId === contact.id}
                        onChange={(e) =>
                          handleStatusChange(contact.id, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {updatingId === contact.id && (
                        <span className="text-xs text-blue-400 animate-pulse">
                          Saving...
                        </span>
                      )}
                      {successId === contact.id && (
                        <span className="text-xs text-emerald-400 font-bold">
                          ✓
                        </span>
                      )}
                      {errorId === contact.id && (
                        <span className="text-xs text-red-400">Failed!</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}