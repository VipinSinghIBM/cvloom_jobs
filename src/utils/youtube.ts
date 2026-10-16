/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extracts a YouTube Video ID from any standard YouTube URL format:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - https://www.youtube.com/shorts/dQw4w9WgXcQ
 * - https://m.youtube.com/watch?v=dQw4w9WgXcQ
 */
export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Pattern covering youtube.com and youtu.be
  const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|(?:shorts)\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    return match[1];
  }

  // If user entered only the 11-char video ID directly
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Returns an embeddable YouTube URL for iframes.
 */
export function getYouTubeEmbedUrl(url?: string | null): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&enablejsapi=1`;
}

/**
 * Returns a high-res or standard YouTube video thumbnail image URL.
 */
export function getYouTubeThumbnail(url?: string | null, quality: 'hq' | 'max' = 'hq'): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return quality === 'max' 
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
