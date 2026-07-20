'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { loginAction } from '@/lib/auth-actions';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Get reCAPTCHA v3 token from window
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        recaptchaToken = await (window as any).grecaptcha.execute(SITE_KEY, {
          action: 'login',
        });
      }

      // 2. Prepare FormData for server action
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('recaptchaToken', recaptchaToken);

      // 3. Call server action (handles Rate Limit + reCAPTCHA Verification + Supabase Auth)
      const result = await loginAction(null, formData);

      if (!result.success) {
        setError(result.error || 'Authentication failed.');
        setLoading(false);
        return;
      }

      // Login successful -> Redirect to Admin Dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load Google reCAPTCHA v3 script */}
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}

      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-white">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-gray-850 p-8 shadow-xl border border-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to manage your portfolio
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-200 border border-red-800">
              ⚠️ {error}
            </div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="admin@portfolio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}