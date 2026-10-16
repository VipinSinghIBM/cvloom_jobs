/**
 * ====================================================================
 * Sarkari Global & PurposeHire - Unified API Client
 * ====================================================================
 * Automatically handles subfolder (e.g. /jobs/) and subdomain paths.
 * Prevents browser caching and ensures reliable MySQL syncing across all browsers.
 */

import { Job, Blog, Notification } from '../types';

/**
 * Returns the exact absolute URL of `api.php`.
 * Handles both https://cvloom.online/jobs and https://cvloom.online/jobs/ seamlessly.
 */
export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'api.php';
  }

  const origin = window.location.origin;
  let pathname = window.location.pathname;

  // Strip file names like index.html or admin.html
  pathname = pathname.replace(/\/[^/]*\.(html|php)$/i, '/');

  // Guarantee trailing slash so subfolder /jobs/ is preserved
  if (!pathname.endsWith('/')) {
    pathname = pathname + '/';
  }

  return `${origin}${pathname}api.php`;
}

/**
 * Generates an API URL with the specified action and cache-busting timestamp.
 */
export function getApiUrl(action: string, cacheBust = true): string {
  const base = getApiBaseUrl();
  const sep = base.includes('?') ? '&' : '?';
  const url = `${base}${sep}action=${encodeURIComponent(action)}`;
  if (cacheBust) {
    return `${url}&_t=${Date.now()}`;
  }
  return url;
}

/**
 * Common fetch helper with strict error handling, JSON parsing, and no-cache policy.
 */
export async function apiFetch<T = any>(
  action: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; [key: string]: any }> {
  const url = getApiUrl(action);

  try {
    const res = await fetch(url, {
      ...options,
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const errorText = await res.text();
      let errorMsg = `Server returned HTTP ${res.status}`;
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.error) errorMsg = parsed.error;
      } catch {}
      return { success: false, error: errorMsg };
    }

    if (!contentType.includes('application/json')) {
      const text = await res.text();
      // If server returned HTML (e.g., 404 page from parent site)
      return {
        success: false,
        error: `Invalid response format from ${url}. Expected JSON, got ${contentType || 'text'}. Make sure api.php exists at this location.`,
        rawResponse: text.slice(0, 200),
      };
    }

    const json = await res.json();
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network request failed (api.php offline or unreachable)',
    };
  }
}

/**
 * Check MySQL Database connection status
 */
export async function apiCheckDb() {
  return apiFetch('check_db');
}

/**
 * Fetch all data from MySQL (Jobs, Blogs, Notifications, Settings)
 */
export async function apiGetAll() {
  return apiFetch('get_all');
}

/**
 * Sync entire jobs array to MySQL
 */
export async function apiSyncJobs(jobs: Job[]) {
  return apiFetch('save_jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobs),
  });
}

/**
 * Sync entire blogs array to MySQL
 */
export async function apiSyncBlogs(blogs: Blog[]) {
  return apiFetch('save_blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogs),
  });
}

/**
 * Sync notifications (Blinker / Ticker) to MySQL
 */
export async function apiSyncNotifications(notifications: Notification[]) {
  return apiFetch('save_notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notifications),
  });
}

/**
 * Sync site settings to MySQL
 */
export async function apiSyncSettings(settings: Record<string, string>) {
  return apiFetch('save_settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
}
