/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Youtube, Sparkles, ExternalLink, Play, CheckCircle } from 'lucide-react';

interface WelcomePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  globalSettings?: { [key: string]: string };
  onNavigate?: (view: string) => void;
}

export function getYouTubeEmbedUrl(urlStr: string): string {
  if (!urlStr) return '';
  if (urlStr.includes('/embed/')) return urlStr;
  try {
    // Check for youtu.be/ID
    const shortMatch = urlStr.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=0&rel=0`;
    }
    // Check for watch?v=ID
    const watchMatch = urlStr.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=0&rel=0`;
    }
    return urlStr;
  } catch {
    return urlStr;
  }
}

export default function WelcomePopupModal({ 
  isOpen, 
  onClose, 
  globalSettings,
  onNavigate 
}: WelcomePopupModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const mode = globalSettings?.popup_mode || 'video'; // 'video' | 'image' | 'both' | 'text_only'
  const title = globalSettings?.popup_title || 'Welcome to CVLoom Official Portal!';
  const badge = globalSettings?.popup_badge || '⚡ Quick Portal Tour & Video Guide';
  const description = globalSettings?.popup_description || 
    'Watch our quick video guide to learn how to search 50,000+ verified government & NGO openings, generate ATS resumes, check eligibility, and resize application documents 100% free!';
  const youtubeUrl = globalSettings?.popup_youtube_url || 'https://www.youtube.com/watch?v=k3_tw44QsZQ';
  const imageUrl = globalSettings?.popup_image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop';
  const btnText = globalSettings?.popup_btn_text || 'Start Exploring Now';
  const btnLink = globalSettings?.popup_btn_link || 'home';

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem('cvloom_welcome_popup_dismissed', 'true');
    }
    onClose();
  };

  const handleActionClick = () => {
    handleDismiss();
    if (onNavigate && btnLink) {
      onNavigate(btnLink);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto"
        id="welcome-announcement-popup"
      >
        {/* Large Prominent Close Button in Top-Right Corner */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white dark:bg-stone-800/90 dark:hover:bg-stone-700 shadow-xl flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer active:scale-95"
          aria-label="Close Announcement Popup"
          title="Close Popup (Esc)"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Media Section: YouTube Frame or Image Banner */}
        {(mode === 'video' || mode === 'both') && embedUrl && (
          <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-stone-200 dark:border-stone-800">
            <iframe
              src={embedUrl}
              title="Portal Guide & Video Walkthrough"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {(mode === 'image' || (mode === 'both' && !embedUrl)) && imageUrl && (
          <div className="relative w-full max-h-72 bg-stone-950 overflow-hidden border-b border-stone-200 dark:border-stone-800">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover max-h-72" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Content Section */}
        <div className="p-5 sm:p-7 space-y-4 text-center sm:text-left">
          
          {/* Badge & Official Verification Pill */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{badge}</span>
            </span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Official Notification Alert
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-black font-serif text-stone-900 dark:text-white leading-tight">
            {title}
          </h2>

          {/* Description / Announcement */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {description}
          </p>

          {/* Actions & Checkbox */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100 dark:border-stone-800">
            
            <label className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={e => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
              />
              <span>Don't show this announcement again</span>
            </label>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDismiss}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                Explore Website
              </button>
              
              <button
                type="button"
                onClick={handleActionClick}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{btnText}</span>
                <span className="text-emerald-200">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
