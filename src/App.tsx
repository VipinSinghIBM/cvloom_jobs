/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import JobListings from './components/JobListings';
import JobDetail from './components/JobDetail';
import CategoryPage from './components/CategoryPage';
import BlogSystem from './components/BlogSystem';
import FreeTools from './components/FreeTools';
import ContactPage from './components/ContactPage';
import AdminPanel from './components/AdminPanel';
import PostJobModal from './components/PostJobModal';
import WelcomePopupModal from './components/WelcomePopupModal';
import VideoTutorialPage from './components/VideoTutorialPage';
import * as storage from './utils/storage';
import { apiGetAll, apiSyncJobs, apiSyncBlogs, apiSyncNotifications, apiSyncSettings } from './utils/apiClient';
import { Job, Blog, Notification, HeroSlide, NavItem, SiteLogoConfig } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeSubNav, setActiveSubNav] = useState<string>('');
  const [previousNavigation, setPreviousNavigation] = useState<{ view: string; subNav?: string }>({
    view: 'home',
    subNav: ''
  });
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videoSourceType, setVideoSourceType] = useState<'job' | 'blog'>('job');
  const [isPostJobOpen, setIsPostJobOpen] = useState<boolean>(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sarkari_global_dark_mode');
    return saved === 'true';
  });

  // State loaded from localStorage storage helpers
  const [jobs, setJobs] = useState<Job[]>(() => storage.getJobs());
  const [blogs, setBlogs] = useState<Blog[]>(() => storage.getBlogs());
  const [notifications, setNotifications] = useState<Notification[]>(() => storage.getNotifications());
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => storage.getHeroSlides());
  const [navItems, setNavItems] = useState<NavItem[]>(() => storage.getNavItems());
  const [bookmarks, setBookmarks] = useState<string[]>(() => storage.getBookmarks());
  const [logoConfig, setLogoConfig] = useState<SiteLogoConfig>(() => storage.getLogoConfig());
  const [globalSettings, setGlobalSettings] = useState<{ [key: string]: string }>(() => storage.getGlobalSettings());
  const [searchFilters, setSearchFilters] = useState<any>({
    title: '',
    state: '',
    qualification: '',
    organization: ''
  });

  // Update browser URL query string without reloading page
  const updateBrowserUrl = (params: {
    view: string;
    jobId?: string | null;
    blogId?: string | null;
    toolId?: string | null;
    videoId?: string | null;
    videoType?: 'job' | 'blog';
    subNav?: string;
  }) => {
    try {
      const url = new URL(window.location.href);
      // Clean previous parameters
      ['jobId', 'job', 'id', 'blogId', 'blog', 'tool', 'toolId', 'video', 'videoId', 'videoType', 'category', 'subnav', 'view'].forEach(k => {
        url.searchParams.delete(k);
      });

      if (params.view === 'job-detail' && params.jobId) {
        url.searchParams.set('jobId', params.jobId);
      } else if (params.view === 'video-tutorial' && params.videoId) {
        url.searchParams.set('video', params.videoId);
        if (params.videoType) url.searchParams.set('videoType', params.videoType);
      } else if (params.view === 'tools') {
        if (params.toolId) url.searchParams.set('tool', params.toolId);
        else url.searchParams.set('view', 'tools');
      } else if (params.view === 'blogs') {
        if (params.blogId) url.searchParams.set('blogId', params.blogId);
        else url.searchParams.set('view', 'blogs');
      } else if (['admin', 'contact', 'bookmarks', 'all-jobs'].includes(params.view)) {
        url.searchParams.set('view', params.view);
      } else if (params.view !== 'home') {
        url.searchParams.set('category', params.view);
        if (params.subNav) url.searchParams.set('subnav', params.subNav);
      }

      window.history.pushState(
        {
          view: params.view,
          jobId: params.jobId,
          blogId: params.blogId,
          toolId: params.toolId,
          videoId: params.videoId,
          videoType: params.videoType,
          subNav: params.subNav
        },
        '',
        url.toString()
      );
    } catch (e) {
      console.log('Error updating browser URL:', e);
    }
  };

  // Check URL query parameters and Hash on initial load AND on browser back/forward (popstate)
  useEffect(() => {
    const parseUrlRoute = (e?: PopStateEvent) => {
      try {
        const state = e?.state || window.history.state;
        const searchParams = new URLSearchParams(window.location.search);
        const urlVideo = searchParams.get('video') || searchParams.get('videoId') || state?.videoId;
        const urlVideoType = ((searchParams.get('videoType') as 'job' | 'blog') || state?.videoType || 'job');
        const urlJobId = searchParams.get('jobId') || searchParams.get('job') || searchParams.get('id') || state?.jobId;
        const urlBlogId = searchParams.get('blogId') || searchParams.get('blog') || state?.blogId;
        const urlToolId = searchParams.get('tool') || searchParams.get('toolId') || state?.toolId;
        const urlCategory = searchParams.get('category') || (state?.view && !['home', 'tools', 'blogs', 'contact', 'admin', 'bookmarks', 'job-detail', 'video-tutorial', 'all-jobs'].includes(state.view) ? state.view : null);
        const urlSubNav = searchParams.get('subnav') || state?.subNav;
        const urlView = searchParams.get('view') || state?.view;

        // Hash navigation support
        const hash = window.location.hash;
        if (hash.startsWith('#video/')) {
          const vId = hash.replace('#video/', '');
          if (vId) {
            setSelectedVideoId(vId);
            setVideoSourceType('job');
            setSelectedJobId(null);
            setSelectedBlogId(null);
            setSelectedToolId(null);
            setCurrentView('video-tutorial');
            return;
          }
        }
        if (hash.startsWith('#job-detail/') || hash.startsWith('#job/')) {
          const jId = hash.replace(/#(?:job-detail|job)\//, '');
          if (jId) {
            setSelectedJobId(jId);
            setSelectedVideoId(null);
            setSelectedBlogId(null);
            setSelectedToolId(null);
            setCurrentView('job-detail');
            return;
          }
        }
        if (hash.startsWith('#tool/')) {
          const tId = hash.replace('#tool/', '');
          if (tId) {
            setSelectedToolId(tId);
            setSelectedJobId(null);
            setSelectedBlogId(null);
            setSelectedVideoId(null);
            setCurrentView('tools');
            return;
          }
        }
        if (hash.startsWith('#blog/')) {
          const bId = hash.replace('#blog/', '');
          if (bId) {
            setSelectedBlogId(bId);
            setSelectedJobId(null);
            setSelectedVideoId(null);
            setSelectedToolId(null);
            setCurrentView('blogs');
            return;
          }
        }

        if (urlVideo) {
          setSelectedVideoId(urlVideo);
          setVideoSourceType(urlVideoType);
          setSelectedJobId(null);
          setSelectedBlogId(null);
          setSelectedToolId(null);
          setCurrentView('video-tutorial');
          return;
        }
        if (urlJobId) {
          setSelectedJobId(urlJobId);
          setSelectedVideoId(null);
          setSelectedBlogId(null);
          setSelectedToolId(null);
          setCurrentView('job-detail');
          return;
        }
        if (urlToolId) {
          setSelectedToolId(urlToolId);
          setSelectedJobId(null);
          setSelectedBlogId(null);
          setSelectedVideoId(null);
          setCurrentView('tools');
          return;
        }
        if (urlBlogId) {
          setSelectedBlogId(urlBlogId);
          setSelectedJobId(null);
          setSelectedVideoId(null);
          setSelectedToolId(null);
          setCurrentView('blogs');
          return;
        }
        if (urlCategory) {
          setCurrentView(urlCategory);
          setActiveSubNav(urlSubNav || '');
          setSelectedJobId(null);
          setSelectedBlogId(null);
          setSelectedVideoId(null);
          setSelectedToolId(null);
          return;
        }
        if (urlView) {
          setCurrentView(urlView);
          setSelectedJobId(null);
          setSelectedBlogId(null);
          setSelectedVideoId(null);
          if (urlView === 'tools') {
            setSelectedToolId(null);
          } else if (urlView === 'blogs') {
            setSelectedBlogId(null);
          }
          return;
        }

        // CRITICAL FIX: If no search query / home URL, reset view cleanly to home!
        setCurrentView('home');
        setSelectedJobId(null);
        setSelectedBlogId(null);
        setSelectedVideoId(null);
        setSelectedToolId(null);
        setActiveSubNav('');
      } catch (err) {
        console.log('Error parsing URL parameters:', err);
      }
    };

    // Run on initial load
    parseUrlRoute();

    // Listen for browser Back/Forward buttons
    window.addEventListener('popstate', parseUrlRoute);
    return () => window.removeEventListener('popstate', parseUrlRoute);
  }, []);

  // Update document title and SEO meta tags dynamically for Google crawler discovery
  useEffect(() => {
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    let title = 'Sarkari Global by CVLoom - Latest Government & NGO Jobs, Scholarships 2026';
    let description = 'Discover latest government jobs, active NGO careers, Samvida recruitments, and merit scholarships with instant application links on CVLoom.';
    let path = '';

    const activeJob = jobs.find(j => j.id === selectedJobId);
    const activeBlog = blogs.find(b => b.id === selectedBlogId || b.slug === selectedBlogId);
    const activeJobVideo = jobs.find(j => j.id === selectedVideoId);
    const activeBlogVideo = blogs.find(b => b.id === selectedVideoId || b.slug === selectedVideoId);

    if (currentView === 'home') {
      title = 'Sarkari Global by CVLoom - Latest Sarkari Results, Jobs & Scholarships';
      description = 'Official verified recruitment portal indexing UPSC, SSC, Railways, State Govt, NGO and CSR openings with direct apply links.';
      path = '';
    } else if (currentView === 'video-tutorial') {
      if (videoSourceType === 'job' && activeJobVideo) {
        title = activeJobVideo.videoTutorialTitle || `How to Apply for ${activeJobVideo.title} - Video Tutorial | CVLoom`;
        description = `Watch complete step-by-step form filling video tutorial for ${activeJobVideo.title}. Direct official apply link included.`;
        path = `?video=${activeJobVideo.id}&videoType=job`;
      } else if (videoSourceType === 'blog' && activeBlogVideo) {
        title = activeBlogVideo.videoTutorialTitle || `Tutorial: ${activeBlogVideo.title} | CVLoom`;
        description = `Watch application video guide for ${activeBlogVideo.title}.`;
        path = `?video=${activeBlogVideo.id}&videoType=blog`;
      } else {
        title = 'How to Apply Video Tutorial & Application Walkthrough - CVLoom';
        description = 'Watch verified recruitment and fellowship application video tutorials with direct apply links.';
        path = '?view=video';
      }
    } else if (currentView === 'job-detail' && activeJob) {
      title = activeJob.seoTitle || `${activeJob.title} - Apply Online | CVLoom`;
      description = activeJob.seoDescription || activeJob.shortDescription || `Apply Online for ${activeJob.totalVacancies} vacancies of ${activeJob.postName} at ${activeJob.organization}.`;
      path = `?jobId=${activeJob.id}`;
    } else if (currentView === 'tools') {
      if (selectedToolId) {
        title = `Free ${selectedToolId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Tool - Sarkari Global by CVLoom`;
        description = `Free online ${selectedToolId.replace('-', ' ')} tool for application forms, image resizing, age calculations, and document conversions.`;
        path = `?tool=${selectedToolId}`;
      } else {
        title = 'Free Online Career & Document Utilities - Sarkari Global by CVLoom';
        description = 'Free official utility tools: Image resizer, Age calculator, PDF converter, ATS resume builder and eligibility checkers.';
        path = '?view=tools';
      }
    } else if (currentView === 'blogs') {
      if (activeBlog) {
        title = activeBlog.seoTitle || `${activeBlog.title} - Career Insights & Study Guides`;
        description = activeBlog.seoDescription || activeBlog.content.slice(0, 155);
        path = `?blogId=${activeBlog.id}`;
      } else {
        title = 'Career Guidance, Exam Strategies & Study Guides - CVLoom';
        path = '?view=blogs';
      }
    } else if (currentView === 'contact') {
      title = 'Contact Official Helpdesk & Support - CVLoom';
      path = '?view=contact';
    } else if (currentView === 'admin') {
      title = 'Dynamic Admin Control Panel - CVLoom';
      path = '?view=admin';
    } else if (currentView === 'bookmarks') {
      title = 'My Saved Bookmarks - CVLoom';
      path = '?view=bookmarks';
    } else {
      const matchedNav = navItems.find(n => n.id === currentView || n.path === currentView);
      title = `${matchedNav?.label || currentView.replace('-', ' ')} - Sarkari Global`;
      path = `?category=${currentView}`;
    }

    document.title = title;
    setMetaTag('description', description);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', `https://cvloom.online/jobs${path ? '/' + path : ''}`, true);
  }, [currentView, selectedJobId, selectedBlogId, selectedVideoId, videoSourceType, selectedToolId, jobs, blogs]);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sarkari_global_dark_mode', String(darkMode));
  }, [darkMode]);

  // Synchronously fetch and load live dynamic data from MySQL database if hosted
  useEffect(() => {
    apiGetAll()
      .then(data => {
        if (data.success) {
          if (Array.isArray(data.jobs) && data.jobs.length > 0) {
            setJobs(data.jobs);
            storage.saveJobs(data.jobs);
          }
          if (Array.isArray(data.blogs) && data.blogs.length > 0) {
            setBlogs(data.blogs);
            storage.saveBlogs(data.blogs);
          }
          if (Array.isArray(data.notifications) && data.notifications.length > 0) {
            setNotifications(data.notifications);
            storage.saveNotifications(data.notifications);
          }
          if (data.settings) {
            setGlobalSettings(prev => ({ ...prev, ...data.settings }));
            if (data.settings.logo_config) {
              try {
                const parsedLogo = typeof data.settings.logo_config === 'string'
                  ? JSON.parse(data.settings.logo_config)
                  : data.settings.logo_config;
                if (parsedLogo) {
                  setLogoConfig(parsedLogo);
                  storage.saveLogoConfig(parsedLogo);
                }
              } catch {}
            }
            if (data.settings.hero_slides) {
              try {
                const parsed = JSON.parse(data.settings.hero_slides);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  setHeroSlides(parsed);
                  storage.saveHeroSlides(parsed);
                }
              } catch {}
            }
            if (data.settings.nav_categories) {
              try {
                const parsedNavs = JSON.parse(data.settings.nav_categories);
                if (Array.isArray(parsedNavs) && parsedNavs.length > 0) {
                  setNavItems(parsedNavs);
                  storage.saveNavItems(parsedNavs);
                }
              } catch {}
            }
          }
          if (data.admin_password) {
            localStorage.setItem('sarkari_global_admin_password', data.admin_password);
          }
          console.log('[MySQL API Sync] Connected to MySQL and loaded dynamic content live!');
        } else {
          console.log('[MySQL API Sync] Server notice:', data.error || 'Running in local fallback mode');
        }
      })
      .catch((err) => {
        console.log('[MySQL API Sync] Local preview mode. LocalStorage fallback active.', err);
      });
  }, []);

  // Check if first-time visitor welcome alert popup should be shown
  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem('cvloom_welcome_popup_dismissed');
      const isEnabled = globalSettings?.popup_enabled !== 'false';
      if (!isDismissed && isEnabled) {
        const timer = setTimeout(() => {
          setIsWelcomePopupOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.log('Error checking welcome popup status', e);
    }
  }, [globalSettings]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    setCurrentView('all-jobs');
    setSelectedJobId(null);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSelectJob = (id: string) => {
    // Record where user came from so back button returns to the exact category/listing
    if (currentView !== 'job-detail') {
      setPreviousNavigation({
        view: currentView,
        subNav: activeSubNav
      });
    }
    setSelectedJobId(id);
    setSelectedBlogId(null);
    setSelectedVideoId(null);
    setCurrentView('job-detail');
    updateBrowserUrl({ view: 'job-detail', jobId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromJob = () => {
    if (previousNavigation.view && previousNavigation.view !== 'job-detail') {
      handleNavigate(previousNavigation.view, previousNavigation.subNav || '');
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      handleNavigate('home');
    }
  };

  const handleSelectVideo = (id: string, type: 'job' | 'blog' = 'job') => {
    setSelectedVideoId(id);
    setVideoSourceType(type);
    setSelectedJobId(null);
    setSelectedBlogId(null);
    setCurrentView('video-tutorial');
    updateBrowserUrl({ view: 'video-tutorial', videoId: id, videoType: type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (id: string | null) => {
    setSelectedToolId(id);
    setCurrentView('tools');
    if (id) {
      updateBrowserUrl({ view: 'tools', toolId: id });
    } else {
      updateBrowserUrl({ view: 'tools' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (id: string | null) => {
    setSelectedBlogId(id);
    setSelectedJobId(null);
    setSelectedVideoId(null);
    setCurrentView('blogs');
    updateBrowserUrl({ view: 'blogs', blogId: id || undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string) => {
    const updated = storage.toggleBookmark(id);
    setBookmarks(updated);
  };

  const handleNavigate = (view: string, subCategory: string = '') => {
    setCurrentView(view);
    setActiveSubNav(subCategory);
    setSelectedJobId(null);
    setSelectedBlogId(null);
    setSelectedVideoId(null);
    updateBrowserUrl({ view, subNav: subCategory });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateJobs = (updatedJobs: Job[]) => {
    storage.saveJobs(updatedJobs);
    setJobs(updatedJobs);

    // Sync with MySQL Database dynamically
    apiSyncJobs(updatedJobs)
      .then(res => {
        if (res.success) {
          console.log('[MySQL API Sync] Jobs successfully synced to MySQL!');
        } else {
          console.warn('[MySQL API Sync] Jobs sync notice:', res.error);
        }
      })
      .catch(err => console.warn('[MySQL API Sync] Offline/Local save only:', err));
  };

  const handleEmployerJobPost = (newJob: Job) => {
    const updated = [newJob, ...jobs];
    handleUpdateJobs(updated);
  };

  const handleUpdateBlogs = (updatedBlogs: Blog[]) => {
    storage.saveBlogs(updatedBlogs);
    setBlogs(updatedBlogs);

    apiSyncBlogs(updatedBlogs)
      .then(res => {
        if (res.success) {
          console.log('[MySQL API Sync] Blogs successfully synced to MySQL!');
        } else {
          console.warn('[MySQL API Sync] Blogs sync notice:', res.error);
        }
      })
      .catch(err => console.warn('[MySQL API Sync] Offline/Local save only:', err));
  };

  const handleUpdateNotifications = (updatedNotifs: Notification[]) => {
    storage.saveNotifications(updatedNotifs);
    setNotifications(updatedNotifs);

    apiSyncNotifications(updatedNotifs)
      .then(res => {
        if (res.success) {
          console.log('[MySQL API Sync] Notifications successfully synced to MySQL!');
        } else {
          console.warn('[MySQL API Sync] Notifications sync notice:', res.error);
        }
      })
      .catch(err => console.warn('[MySQL API Sync] Offline/Local save only:', err));
  };

  const handleUpdateHeroSlides = (newSlides: HeroSlide[]) => {
    storage.saveHeroSlides(newSlides);
    setHeroSlides(newSlides);
    handleUpdateSettings({ hero_slides: JSON.stringify(newSlides) });
  };

  const handleUpdateNavItems = (newNavs: NavItem[]) => {
    storage.saveNavItems(newNavs);
    setNavItems(newNavs);
    handleUpdateSettings({ nav_categories: JSON.stringify(newNavs) });
  };

  const handleUpdateLogoConfig = (newConfig: SiteLogoConfig) => {
    storage.saveLogoConfig(newConfig);
    setLogoConfig(newConfig);
    handleUpdateSettings({ logo_config: JSON.stringify(newConfig) });
  };

  const handleUpdateSettings = (newSettings: { [key: string]: string }) => {
    setGlobalSettings(prev => ({ ...prev, ...newSettings }));
    apiSyncSettings(newSettings)
      .then(res => {
        if (res.success) {
          console.log('[MySQL API Sync] Settings successfully synced to MySQL!');
        } else {
          console.warn('[MySQL API Sync] Settings sync notice:', res.error);
        }
      })
      .catch(err => console.warn('[MySQL API Sync] Offline/Local save only:', err));
  };

  const handleResetAllSeeds = () => {
    localStorage.removeItem('sarkari_global_jobs');
    localStorage.removeItem('sarkari_global_blogs');
    localStorage.removeItem('sarkari_global_notifications');
    localStorage.removeItem('sarkari_global_hero_slides');
    localStorage.removeItem('sarkari_global_nav_items');
    
    setJobs(storage.getJobs());
    setBlogs(storage.getBlogs());
    setNotifications(storage.getNotifications());
    setHeroSlides(storage.getHeroSlides());
    setNavItems(storage.getNavItems());
    setBookmarks([]);
    storage.saveBookmarks([]);
    setCurrentView('home');
  };

  // Find active job detailed object
  const activeJob = jobs.find(j => j.id === selectedJobId);

  // Check if currentView is a Category or Subcategory Page
  const isCategoryView = !['home', 'blogs', 'contact', 'tools', 'admin', 'bookmarks', 'job-detail', 'all-jobs'].includes(currentView) && (
    ['govt-jobs', 'scholarships', 'ngo-jobs', 'fellowships', 'internship'].includes(currentView) ||
    navItems.some(n => (n.id === currentView || n.path === currentView) && Boolean(n.categoryFilter))
  );

  // Render correct body content based on selected state views
  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="space-y-6">
          {/* Professional 4-5 Image Slider with floating text & slow marquee */}
          <HeroSlider 
            slides={heroSlides}
            notifications={notifications}
            onNavigate={handleNavigate}
            onSelectJob={handleSelectJob}
            onSearch={handleSearch}
            jobs={jobs}
            onOpenPostJob={() => setIsPostJobOpen(true)}
          />

          {/* Quick Categories Bar */}
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {(globalSettings?.quick_categories ? (() => {
                try {
                  const p = JSON.parse(globalSettings.quick_categories);
                  return Array.isArray(p) && p.length > 0 ? p : [
                    { id: 'govt-jobs', title: 'Govt Jobs', icon: '🏛️', desc: 'Central & State' },
                    { id: 'govt-jobs', sub: 'govt-samvida', title: 'Samvida Jobs', icon: '📋', desc: 'NHM & Contract' },
                    { id: 'ngo-jobs', title: 'NGO Careers', icon: '🤝', desc: 'Non-Profit & UN' },
                    { id: 'scholarships', title: 'Scholarships', icon: '🎓', desc: 'Govt & CSR Grants' },
                    { id: 'fellowships', title: 'Fellowships', icon: '🏆', desc: 'Research & Policy' },
                    { id: 'internship', title: 'Internships', icon: '💡', desc: 'Tech & Govt' }
                  ];
                } catch {
                  return [
                    { id: 'govt-jobs', title: 'Govt Jobs', icon: '🏛️', desc: 'Central & State' },
                    { id: 'govt-jobs', sub: 'govt-samvida', title: 'Samvida Jobs', icon: '📋', desc: 'NHM & Contract' },
                    { id: 'ngo-jobs', title: 'NGO Careers', icon: '🤝', desc: 'Non-Profit & UN' },
                    { id: 'scholarships', title: 'Scholarships', icon: '🎓', desc: 'Govt & CSR Grants' },
                    { id: 'fellowships', title: 'Fellowships', icon: '🏆', desc: 'Research & Policy' },
                    { id: 'internship', title: 'Internships', icon: '💡', desc: 'Tech & Govt' }
                  ];
                }
              })() : [
                { id: 'govt-jobs', title: 'Govt Jobs', icon: '🏛️', desc: 'Central & State' },
                { id: 'govt-jobs', sub: 'govt-samvida', title: 'Samvida Jobs', icon: '📋', desc: 'NHM & Contract' },
                { id: 'ngo-jobs', title: 'NGO Careers', icon: '🤝', desc: 'Non-Profit & UN' },
                { id: 'scholarships', title: 'Scholarships', icon: '🎓', desc: 'Govt & CSR Grants' },
                { id: 'fellowships', title: 'Fellowships', icon: '🏆', desc: 'Research & Policy' },
                { id: 'internship', title: 'Internships', icon: '💡', desc: 'Tech & Govt' }
              ]).map((item: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(item.id, item.sub)}
                  className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 rounded-2xl text-left transition group shadow-xs hover:shadow-md cursor-pointer flex items-center gap-3"
                >
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <div className="min-w-0">
                    <strong className="block text-xs font-bold font-serif text-stone-900 dark:text-white truncate group-hover:text-emerald-700 transition">
                      {item.title}
                    </strong>
                    <span className="text-[10px] text-stone-400 block truncate">{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Core Job Listings Tabs */}
          <JobListings 
            jobs={jobs} 
            onSelectJob={handleSelectJob}
            onSelectVideo={(id) => handleSelectVideo(id, 'job')}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handleNavigate}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            globalSettings={globalSettings}
          />
        </div>
      );
    }

    if (currentView === 'all-jobs') {
      const activeSearchJobs = jobs.filter(job => {
        const titleMatch = !searchFilters.title || job.title.toLowerCase().includes(searchFilters.title.toLowerCase());
        const stateMatch = !searchFilters.state || job.state === searchFilters.state;
        const qualMatch = !searchFilters.qualification || job.qualification.toLowerCase().includes(searchFilters.qualification.toLowerCase());
        const deptMatch = !searchFilters.organization || job.organization.toLowerCase().includes(searchFilters.organization.toLowerCase());
        return titleMatch && stateMatch && qualMatch && deptMatch;
      });

      return (
        <JobListings 
          jobs={activeSearchJobs} 
          onSelectJob={handleSelectJob}
          onSelectVideo={(id) => handleSelectVideo(id, 'job')}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          searchTerm={searchFilters.title}
          onNavigate={handleNavigate}
          onOpenPostJob={() => setIsPostJobOpen(true)}
          globalSettings={globalSettings}
        />
      );
    }

    // Dedicated Full-Length Category & Subnavbar Page
    if (isCategoryView) {
      return (
        <CategoryPage 
          currentCategory={currentView}
          activeSubNav={activeSubNav}
          jobs={jobs}
          navItems={navItems}
          onSelectJob={handleSelectJob}
          onSelectVideo={(id) => handleSelectVideo(id, 'job')}
          onSelectSubNav={(subId) => setActiveSubNav(subId)}
          onNavigate={handleNavigate}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    // Dedicated Full-Length How to Apply Video Tutorial Page
    if (currentView === 'video-tutorial') {
      const activeJobVideo = jobs.find(j => j.id === selectedVideoId);
      const activeBlogVideo = blogs.find(b => b.id === selectedVideoId || b.slug === selectedVideoId);

      return (
        <VideoTutorialPage 
          sourceType={videoSourceType}
          job={activeJobVideo}
          blog={activeBlogVideo}
          allJobs={jobs}
          allBlogs={blogs}
          onBack={() => handleNavigate(videoSourceType === 'blog' ? 'blogs' : 'home')}
          onSelectJobDetail={handleSelectJob}
          onSelectBlogDetail={handleSelectBlog}
          onSelectJobVideo={(id) => handleSelectVideo(id, 'job')}
          onSelectBlogVideo={(id) => handleSelectVideo(id, 'blog')}
          onSelectTool={handleSelectTool}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentView === 'job-detail') {
      if (activeJob) {
        return (
          <JobDetail 
            job={activeJob} 
            onBack={handleBackFromJob}
            onToggleBookmark={handleToggleBookmark}
            isSaved={bookmarks.includes(activeJob.id)}
            allJobs={jobs}
            onSelectJob={handleSelectJob}
            onSelectVideo={(id) => handleSelectVideo(id, 'job')}
            onNavigateToCategory={handleNavigate}
            onNavigateToTools={() => handleNavigate('tools')}
            onSelectTool={handleSelectTool}
            globalSettings={globalSettings}
          />
        );
      }
      return (
        <div className="max-w-md mx-auto text-center py-20">
          <p className="text-slate-500 font-bold">Selected job posting could not be found or was removed.</p>
          <button onClick={() => handleNavigate('home')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Back to Home</button>
        </div>
      );
    }

    if (currentView === 'contact') {
      return <ContactPage onBackToHome={() => handleNavigate('home')} />;
    }

    if (currentView === 'tools') {
      return (
        <FreeTools 
          currentToolId={selectedToolId} 
          onSelectTool={handleSelectTool} 
          jobs={jobs}
          onBackToHome={() => handleNavigate('home')}
        />
      );
    }

    if (currentView === 'blogs') {
      return (
        <BlogSystem 
          blogs={blogs} 
          onBackToHome={() => handleNavigate('home')}
          onSelectBlogId={selectedBlogId}
          onSelectBlog={handleSelectBlog}
          onSelectVideo={(id) => handleSelectVideo(id, 'blog')}
          onUpdateBlogs={handleUpdateBlogs}
        />
      );
    }

    if (currentView === 'admin') {
      return (
        <AdminPanel 
          jobs={jobs}
          onUpdateJobs={handleUpdateJobs}
          blogs={blogs}
          onUpdateBlogs={handleUpdateBlogs}
          notifications={notifications}
          onUpdateNotifications={handleUpdateNotifications}
          heroSlides={heroSlides}
          onUpdateHeroSlides={handleUpdateHeroSlides}
          navItems={navItems}
          onUpdateNavItems={handleUpdateNavItems}
          onResetAllSeeds={handleResetAllSeeds}
          globalSettings={globalSettings}
          onUpdateSettings={handleUpdateSettings}
          logoConfig={logoConfig}
          onUpdateLogoConfig={handleUpdateLogoConfig}
        />
      );
    }

    if (currentView === 'bookmarks') {
      const bookmarkedJobs = jobs.filter(j => bookmarks.includes(j.id));
      return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase">My Saved Bookmarks</h2>
            <p className="text-slate-500 text-xs">Track active recruitment statuses of bookmarked postings here.</p>
          </div>
          {bookmarkedJobs.length > 0 ? (
            <JobListings 
              jobs={bookmarkedJobs} 
              onSelectJob={handleSelectJob}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg mx-auto">
              <span className="text-4xl mb-4 block">🔖</span>
              <p className="text-slate-800 dark:text-slate-200 font-black">Your Bookmarks Shelf is Empty</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed px-4">
                Save important notifications, admit cards, or scholarship alerts to track them easily.
              </p>
              <button 
                onClick={() => handleNavigate('home')} 
                className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-500/20"
              >
                Explore Job Postings
              </button>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col justify-between ${darkMode ? 'dark' : ''}`} id="app-root-container">
      <div>
        <Navbar 
          currentView={currentView} 
          activeSubNav={activeSubNav}
          onNavigate={handleNavigate} 
          darkMode={darkMode} 
          onToggleDarkMode={handleToggleDarkMode} 
          bookmarksCount={bookmarks.length}
          notifications={notifications}
          navItems={navItems}
          onSelectJob={handleSelectJob}
          logoConfig={logoConfig}
          onOpenPostJob={() => setIsPostJobOpen(true)}
          onSelectTool={handleSelectTool}
          currentToolId={selectedToolId}
        />
        
        <main className="flex-grow pb-12">
          {renderContent()}
        </main>
      </div>

      <Footer 
        onNavigate={handleNavigate} 
        onSelectTool={handleSelectTool} 
        globalSettings={globalSettings}
      />

      {/* First-Time Visitor Alert & Video Guide Popup Modal (Admin Controlled) */}
      <WelcomePopupModal
        isOpen={isWelcomePopupOpen}
        onClose={() => setIsWelcomePopupOpen(false)}
        globalSettings={globalSettings}
        onNavigate={handleNavigate}
      />

      {/* Dedicated PurposeHire "Post a Job" Modal */}
      <PostJobModal 
        isOpen={isPostJobOpen} 
        onClose={() => setIsPostJobOpen(false)} 
        onSubmitJob={handleEmployerJobPost} 
      />
    </div>
  );
}
