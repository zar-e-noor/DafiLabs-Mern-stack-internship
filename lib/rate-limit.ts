// lib/rate-limit.ts

type RateLimitRecord = {
    count: number;
    resetAt: number;
  };
  
  const attemptMap = new Map<string, RateLimitRecord>();
  
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15-minute window
  
  export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMinutes?: number } {
    const now = Date.now();
    const record = attemptMap.get(ip);
  
    if (!record || now > record.resetAt) {
      // Reset or initial record
      attemptMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      return { allowed: true };
    }
  
    if (record.count >= MAX_ATTEMPTS) {
      const remainingMs = record.resetAt - now;
      const retryAfterMinutes = Math.ceil(remainingMs / (1000 * 60));
      return { allowed: false, retryAfterMinutes };
    }
  
    record.count += 1;
    attemptMap.set(ip, record);
    return { allowed: true };
  }
  
  // Reset attempts on successful login
  export function resetRateLimit(ip: string) {
    attemptMap.delete(ip);
  }