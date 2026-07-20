'use server';

import { headers } from 'next/headers';
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit';
import { supabase } from '@/lib/supabase';

// Helper to verify reCAPTCHA v3 token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is missing in environment variables.');
    return false;
  }

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json();
    // reCAPTCHA v3 score range: 0.0 (bot) to 1.0 (human)
    return data.success && (data.score ?? 1.0) >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const recaptchaToken = formData.get('recaptchaToken') as string;

  // Extract client IP address
  const reqHeaders = await headers();
  const clientIp =
    reqHeaders.get('x-forwarded-for')?.split(',')[0] ||
    reqHeaders.get('x-real-ip') ||
    '127.0.0.1';

  // 1. Check Rate Limit (IP based)
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Too many login attempts. Please try again in ${rateLimit.retryAfterMinutes} minutes.`,
    };
  }

  // 2. Verify reCAPTCHA Token
  if (!recaptchaToken) {
    return {
      success: false,
      error: 'Security verification token missing. Please refresh and try again.',
    };
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return {
      success: false,
      error: 'Suspicious activity detected by security check. Access denied.',
    };
  }

  // 3. Authenticate with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      // Generic friendly message to protect against user enumeration
      error: 'Invalid email address or password.',
    };
  }

  // Reset rate limiter count on success
  resetRateLimit(clientIp);

  return { success: true, error: null };
}