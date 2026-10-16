/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, Blog, Notification, Advertisement, HeroSlide, NavItem, SiteLogoConfig } from '../types';
import { INITIAL_JOBS, INITIAL_BLOGS, INITIAL_NOTIFICATIONS, INITIAL_ADS, INITIAL_HERO_SLIDES, INITIAL_NAV_ITEMS } from '../data/seedData';

const KEYS = {
  JOBS: 'sarkari_global_jobs',
  BLOGS: 'sarkari_global_blogs',
  NOTIFICATIONS: 'sarkari_global_notifications',
  ADS: 'sarkari_global_ads',
  HERO_SLIDES: 'sarkari_global_hero_slides',
  NAV_ITEMS: 'sarkari_global_nav_items',
  BOOKMARKS: 'sarkari_global_bookmarks',
  DARK_MODE: 'sarkari_global_dark_mode',
  RECENT_SEARCHES: 'sarkari_global_recent_searches',
  LOGO_CONFIG: 'sarkari_global_logo_config',
  GLOBAL_SETTINGS: 'sarkari_global_settings'
};

export const DEFAULT_LOGO_CONFIG: SiteLogoConfig = {
  displayMode: 'logo_text',
  logoUrl: '',
  brandText: 'CVLoom',
  subtitle: 'Recruitment Portal'
};

export const getLogoConfig = (): SiteLogoConfig => {
  const data = localStorage.getItem(KEYS.LOGO_CONFIG);
  if (!data) {
    saveLogoConfig(DEFAULT_LOGO_CONFIG);
    return DEFAULT_LOGO_CONFIG;
  }
  try {
    return { ...DEFAULT_LOGO_CONFIG, ...JSON.parse(data) };
  } catch {
    return DEFAULT_LOGO_CONFIG;
  }
};

export const saveLogoConfig = (config: SiteLogoConfig) => {
  localStorage.setItem(KEYS.LOGO_CONFIG, JSON.stringify(config));
};

export const getHeroSlides = (): HeroSlide[] => {
  const data = localStorage.getItem(KEYS.HERO_SLIDES);
  if (!data) {
    saveHeroSlides(INITIAL_HERO_SLIDES);
    return INITIAL_HERO_SLIDES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_HERO_SLIDES;
  }
};

export const saveHeroSlides = (slides: HeroSlide[]) => {
  localStorage.setItem(KEYS.HERO_SLIDES, JSON.stringify(slides));
};

export const getNavItems = (): NavItem[] => {
  const data = localStorage.getItem(KEYS.NAV_ITEMS);
  let navs: NavItem[] = INITIAL_NAV_ITEMS;
  if (!data) {
    saveNavItems(INITIAL_NAV_ITEMS);
    return INITIAL_NAV_ITEMS;
  }
  try {
    navs = JSON.parse(data);
  } catch {
    navs = INITIAL_NAV_ITEMS;
  }

  // Ensure 'tools' nav item is present
  if (!navs.some(n => n.id === 'tools' || n.path === 'tools')) {
    const toolsNav = INITIAL_NAV_ITEMS.find(n => n.id === 'tools');
    if (toolsNav) {
      const blogIdx = navs.findIndex(n => n.id === 'blogs' || n.path === 'blogs');
      if (blogIdx !== -1) {
        navs.splice(blogIdx, 0, toolsNav);
      } else {
        navs.push(toolsNav);
      }
      saveNavItems(navs);
    }
  }
  return navs;
};

export const saveNavItems = (navs: NavItem[]) => {
  localStorage.setItem(KEYS.NAV_ITEMS, JSON.stringify(navs));
};

export const getJobs = (): Job[] => {
  const data = localStorage.getItem(KEYS.JOBS);
  let loadedJobs: Job[] = [];
  if (!data) {
    loadedJobs = INITIAL_JOBS;
    saveJobs(INITIAL_JOBS);
  } else {
    try {
      loadedJobs = JSON.parse(data);
    } catch {
      loadedJobs = INITIAL_JOBS;
    }
  }

  // Guarantee all jobs have video tutorial link
  return loadedJobs.map(job => {
    if (!job.videoTutorialUrl) {
      const match = INITIAL_JOBS.find(j => j.id === job.id);
      return {
        ...job,
        videoTutorialUrl: match?.videoTutorialUrl || 'https://www.youtube.com/watch?v=k3_tw44QsZQ',
        videoTutorialTitle: job.videoTutorialTitle || match?.videoTutorialTitle || `How to Apply for ${job.title} - Step by Step Online Guide`
      };
    }
    return job;
  });
};

export const saveJobs = (jobs: Job[]) => {
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
};

export const getBlogs = (): Blog[] => {
  const data = localStorage.getItem(KEYS.BLOGS);
  let loadedBlogs: Blog[] = [];
  if (!data) {
    loadedBlogs = INITIAL_BLOGS;
    saveBlogs(INITIAL_BLOGS);
  } else {
    try {
      loadedBlogs = JSON.parse(data);
    } catch {
      loadedBlogs = INITIAL_BLOGS;
    }
  }

  // Guarantee all blogs have video tutorial link
  return loadedBlogs.map(blog => {
    if (!blog.videoTutorialUrl) {
      const match = INITIAL_BLOGS.find(b => b.id === blog.id);
      return {
        ...blog,
        videoTutorialUrl: match?.videoTutorialUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoTutorialTitle: blog.videoTutorialTitle || match?.videoTutorialTitle || `For More Info: ${blog.title} - Video Guidance`,
        applyUrl: blog.applyUrl || match?.applyUrl || ''
      };
    }
    return blog;
  });
};

export const saveBlogs = (blogs: Blog[]) => {
  localStorage.setItem(KEYS.BLOGS, JSON.stringify(blogs));
};

export const getNotifications = (): Notification[] => {
  const data = localStorage.getItem(KEYS.NOTIFICATIONS);
  if (!data) {
    saveNotifications(INITIAL_NOTIFICATIONS);
    return INITIAL_NOTIFICATIONS;
  }
  return JSON.parse(data);
};

export const saveNotifications = (notifs: Notification[]) => {
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
};

export const getAds = (): Advertisement[] => {
  const data = localStorage.getItem(KEYS.ADS);
  if (!data) {
    saveAds(INITIAL_ADS);
    return INITIAL_ADS;
  }
  return JSON.parse(data);
};

export const saveAds = (ads: Advertisement[]) => {
  localStorage.setItem(KEYS.ADS, JSON.stringify(ads));
};

export const getBookmarks = (): string[] => {
  const data = localStorage.getItem(KEYS.BOOKMARKS);
  return data ? JSON.parse(data) : [];
};

export const saveBookmarks = (bookmarks: string[]) => {
  localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
};

export const toggleBookmark = (jobId: string): string[] => {
  const current = getBookmarks();
  let updated;
  if (current.includes(jobId)) {
    updated = current.filter(id => id !== jobId);
  } else {
    updated = [...current, jobId];
  }
  saveBookmarks(updated);
  return updated;
};

export const getRecentSearches = (): string[] => {
  const data = localStorage.getItem(KEYS.RECENT_SEARCHES);
  return data ? JSON.parse(data) : [];
};

export const addRecentSearch = (term: string) => {
  if (!term || term.trim() === '') return;
  const current = getRecentSearches();
  const filtered = current.filter(t => t.toLowerCase() !== term.toLowerCase());
  const updated = [term.trim(), ...filtered].slice(0, 8);
  localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(updated));
};

export const clearRecentSearches = () => {
  localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify([]));
};

export const DEFAULT_GLOBAL_SETTINGS: { [key: string]: string } = {
  // Social Links
  social_telegram: 'https://t.me/sarkariglobal',
  social_whatsapp: 'https://chat.whatsapp.com/sarkariglobal',
  social_youtube: 'https://youtube.com/@sarkariglobal',
  social_facebook: 'https://facebook.com/sarkariglobal',
  social_instagram: 'https://instagram.com/sarkariglobal',
  social_twitter: 'https://twitter.com/sarkariglobal',

  // Footer Settings & Appearance
  footer_theme: 'light', // 'light' (clean modern light stone) | 'dark' | 'slate'
  footer_brand_title: 'CVLoom',
  footer_brand_subtitle: 'Verified Career & Govt Opportunities',
  footer_about: "India's trusted, verified career & public notification portal. Empowering millions of aspirants with fast recruitment updates, eligibility checkers, free document tools, and ATS resume builders with zero fees.",
  footer_email: 'support@cvloom.online',
  footer_phone: '+91 11-4562-7890',
  footer_address: 'Connaught Place, New Delhi, India',
  footer_disclaimer: 'CVLoom is an independent career & educational portal. We do not represent any government ministry or agency. All updates are curated from official recruitment notifications.',
  footer_copyright: '© 2026 CVLoom Portal. All Rights Reserved.',

  // First-Time Visitor Popup Alert / Modal Settings
  popup_enabled: 'true',
  popup_mode: 'video', // 'video' | 'image' | 'both'
  popup_youtube_url: 'https://www.youtube.com/watch?v=k3_tw44QsZQ',
  popup_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  popup_title: 'Welcome to CVLoom Official Portal!',
  popup_badge: '⚡ Quick Portal Tour & Video Guide',
  popup_description: 'Watch our quick video guide to learn how to search 50,000+ verified government & NGO openings, generate ATS resumes, check eligibility, and resize application documents 100% free!',
  popup_btn_text: 'Start Exploring Now',
  popup_btn_link: 'home'
};

export const getGlobalSettings = (): { [key: string]: string } => {
  const data = localStorage.getItem(KEYS.GLOBAL_SETTINGS);
  if (!data) {
    saveGlobalSettings(DEFAULT_GLOBAL_SETTINGS);
    return DEFAULT_GLOBAL_SETTINGS;
  }
  try {
    return { ...DEFAULT_GLOBAL_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_GLOBAL_SETTINGS;
  }
};

export const saveGlobalSettings = (settings: { [key: string]: string }) => {
  localStorage.setItem(KEYS.GLOBAL_SETTINGS, JSON.stringify(settings));
};

