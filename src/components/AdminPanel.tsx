/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Check, RefreshCw, FileText, Briefcase, 
  Settings, Award, Bell, Eye, EyeOff, Save, Trash, ArrowLeft,
  Calendar, CheckCircle, HelpCircle, AlertCircle, Lock, Unlock,
  Sliders, Navigation, Download, Upload, ExternalLink, Globe, Sparkles,
  Database, Server, Copy, Share2, Megaphone, Layout, Link as LinkIcon,
  Video, Play, MessageSquare, Palette, Youtube
} from 'lucide-react';
import { Job, Blog, Notification, HeroSlide, NavItem, SubNavItem, SiteLogoConfig, Advertisement } from '../types';
import { generatePhpMyAdminSql, downloadSqlFile } from '../utils/sqlExporter';
import CVLoomLogo from './CVLoomLogo';
import { getYouTubeEmbedUrl } from './WelcomePopupModal';
import { getLogoConfig, saveLogoConfig, getAds, saveAds } from '../utils/storage';
import { getApiUrl, apiCheckDb, apiSyncJobs, apiSyncBlogs, apiSyncNotifications, apiSyncSettings, getApiBaseUrl } from '../utils/apiClient';
import { SketchVerifiedBadge, SketchJobSearch } from './SketchIllustrations';

interface AdminPanelProps {
  jobs: Job[];
  onUpdateJobs: (jobs: Job[]) => void;
  blogs: Blog[];
  onUpdateBlogs: (blogs: Blog[]) => void;
  notifications: Notification[];
  onUpdateNotifications: (notifs: Notification[]) => void;
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  navItems: NavItem[];
  onUpdateNavItems: (navs: NavItem[]) => void;
  onResetAllSeeds: () => void;
  globalSettings?: { [key: string]: string };
  onUpdateSettings?: (settings: { [key: string]: string }) => void;
  logoConfig?: SiteLogoConfig;
  onUpdateLogoConfig?: (config: SiteLogoConfig) => void;
}

export default function AdminPanel({
  jobs,
  onUpdateJobs,
  blogs,
  onUpdateBlogs,
  notifications,
  onUpdateNotifications,
  heroSlides,
  onUpdateHeroSlides,
  navItems,
  onUpdateNavItems,
  onResetAllSeeds,
  globalSettings,
  onUpdateSettings,
  logoConfig: propLogoConfig,
  onUpdateLogoConfig
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sarkari_global_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'homepage' | 'popup' | 'footer' | 'ads' | 'cpanel' | 'branding' | 'slider' | 'navs' | 'jobs' | 'blogs' | 'notifications' | 'settings'>('overview');
  
  // Footer settings state
  const [footerTheme, setFooterTheme] = useState(globalSettings?.footer_theme || 'light-cream');
  const [footerBrandTitle, setFooterBrandTitle] = useState(globalSettings?.footer_brand_title || 'CVLoom');
  const [footerBrandSubtitle, setFooterBrandSubtitle] = useState(globalSettings?.footer_brand_subtitle || 'Verified Career & Govt Recruitment Portal');
  const [footerAbout, setFooterAbout] = useState(globalSettings?.footer_about || "India's trusted, verified career & public notification portal. Empowering millions of aspirants with fast recruitment updates, eligibility checkers, free document tools, and ATS resume builders with zero fees.");
  const [footerEmail, setFooterEmail] = useState(globalSettings?.footer_email || 'support@cvloom.online');
  const [footerPhone, setFooterPhone] = useState(globalSettings?.footer_phone || '+91 11-4562-7890');
  const [footerAddress, setFooterAddress] = useState(globalSettings?.footer_address || 'Connaught Place, New Delhi, India');
  const [footerDisclaimer, setFooterDisclaimer] = useState(globalSettings?.footer_disclaimer || "CVLoom is an independent career & educational portal. We do not represent any government ministry or agency. All updates are curated from official recruitment notifications.");
  const [footerCopyright, setFooterCopyright] = useState(globalSettings?.footer_copyright || '© 2026 CVLoom Portal. All Rights Reserved.');
  const [footerLinksTitle, setFooterLinksTitle] = useState(globalSettings?.footer_links_title || 'Explore Openings');
  const [footerToolsTitle, setFooterToolsTitle] = useState(globalSettings?.footer_tools_title || 'Free Document Tools');
  const [footerPolicyTitle, setFooterPolicyTitle] = useState(globalSettings?.footer_policy_title || 'Verification & Policy');

  // Welcome Alert Popup state
  const [popupEnabled, setPopupEnabled] = useState(globalSettings?.popup_enabled !== 'false');
  const [popupMode, setPopupMode] = useState<'video' | 'image' | 'both' | 'text_only'>(
    (globalSettings?.popup_mode as any) || 'video'
  );
  const [popupTitle, setPopupTitle] = useState(globalSettings?.popup_title || 'Welcome to CVLoom Official Portal!');
  const [popupBadge, setPopupBadge] = useState(globalSettings?.popup_badge || '⚡ Quick Portal Tour & Video Guide');
  const [popupDescription, setPopupDescription] = useState(
    globalSettings?.popup_description || 
    'Watch our quick video guide to learn how to search 50,000+ verified government & NGO openings, generate ATS resumes, check eligibility, and resize application documents 100% free!'
  );
  const [popupYoutubeUrl, setPopupYoutubeUrl] = useState(globalSettings?.popup_youtube_url || 'https://www.youtube.com/watch?v=k3_tw44QsZQ');
  const [popupImageUrl, setPopupImageUrl] = useState(globalSettings?.popup_image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop');
  const [popupBtnText, setPopupBtnText] = useState(globalSettings?.popup_btn_text || 'Start Exploring Now');
  const [popupBtnLink, setPopupBtnLink] = useState(globalSettings?.popup_btn_link || 'home');
  const [showPopupPreview, setShowPopupPreview] = useState(false);
  const [testingDb, setTestingDb] = useState(false);
  const [dbTestResult, setDbTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingNavItem, setEditingNavItem] = useState<NavItem | null>(null);

  // Advertisements state
  const [ads, setAds] = useState<Advertisement[]>(() => getAds());
  const [editingAd, setEditingAd] = useState<Partial<Advertisement> | null>(null);
  const [isCreatingAd, setIsCreatingAd] = useState(false);

  // Homepage custom recruiters state
  const defaultRecruiters = ['Sarvam Foundation', 'Social Alpha', 'Lend A Hand', 'UPSC', 'NITI Aayog', 'BECIL', 'Swades', 'Plastics For Change'];
  const [recruiters, setRecruiters] = useState<string[]>(() => {
    if (globalSettings?.verified_recruiters) {
      return globalSettings.verified_recruiters.split(',').map(r => r.trim()).filter(Boolean);
    }
    return defaultRecruiters;
  });
  const [newRecruiterInput, setNewRecruiterInput] = useState('');

  // Homepage Hero banner text state
  const [homeHeroBadge, setHomeHeroBadge] = useState(globalSettings?.home_hero_badge || '100% Verified Career & Govt Opportunities');
  const [homeHeroTitle, setHomeHeroTitle] = useState(globalSettings?.home_hero_title || 'Discover Meaningful Career Openings');
  const [homeHeroSubtitle, setHomeHeroSubtitle] = useState(globalSettings?.home_hero_subtitle || 'Verified opportunities across NGOs, CSR Foundations, Government Departments, and Fellowships. Never any charges for applications or interview processes.');

  // Quick Share Link generator search
  const [shareLinkJobSearch, setShareLinkJobSearch] = useState('');
  const [copiedShareLink, setCopiedShareLink] = useState<string | null>(null);

  // Logo & Branding state
  const initialLogoConfig = propLogoConfig || getLogoConfig();
  const [logoMode, setLogoMode] = useState<'logo_only' | 'logo_text' | 'text_only'>(initialLogoConfig.displayMode || 'logo_text');
  const [logoUrl, setLogoUrl] = useState<string>(initialLogoConfig.logoUrl || '');
  const [brandText, setBrandText] = useState<string>(initialLogoConfig.brandText || 'CVLoom');
  const [brandSubtitle, setBrandSubtitle] = useState<string>(initialLogoConfig.subtitle !== undefined ? initialLogoConfig.subtitle : 'Recruitment Portal');
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);

  // New subnav state
  const [newSubNavLabel, setNewSubNavLabel] = useState('');
  const [newSubNavFilter, setNewSubNavFilter] = useState('');
  const [newSubNavDesc, setNewSubNavDesc] = useState('');
  const [selectedParentNavId, setSelectedParentNavId] = useState('govt-jobs');

  const [newTickerText, setNewTickerText] = useState('');
  const [tickerIsActive, setTickerIsActive] = useState(true);
  const [newTickerLink, setNewTickerLink] = useState('');
  const [selectedJobToLink, setSelectedJobToLink] = useState('');
  const [adminJobSearch, setAdminJobSearch] = useState('');

  // Temporary state variables for dynamically adding complex sub-elements to a job
  const [newButtonLabel, setNewButtonLabel] = useState('');
  const [newButtonUrl, setNewButtonUrl] = useState('');
  const [newButtonVariant, setNewButtonVariant] = useState<'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'outline'>('primary');

  const [newFeeCategory, setNewFeeCategory] = useState('');
  const [newFeeAmount, setNewFeeAmount] = useState('');

  const [newVacancyPost, setNewVacancyPost] = useState('');
  const [newVacancyTotal, setNewVacancyTotal] = useState('');
  const [newVacancyEligibility, setNewVacancyEligibility] = useState('');

  const [newRequiredDoc, setNewRequiredDoc] = useState('');

  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUploadMsg, setLogoUploadMsg] = useState<string | null>(null);

  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncAllMsg, setSyncAllMsg] = useState<{ success: boolean; message: string } | null>(null);

  // 1-Click Master Push: Sync all local jobs, blogs, tickers & settings directly to MySQL Database
  const handleForceSyncToMySQL = async () => {
    setIsSyncingAll(true);
    setSyncAllMsg(null);
    try {
      const [resJobs, resBlogs, resNotifs, resSettings] = await Promise.all([
        apiSyncJobs(jobs),
        apiSyncBlogs(blogs),
        apiSyncNotifications(notifications),
        apiSyncSettings({
          ...globalSettings,
          hero_slides: JSON.stringify(heroSlides),
          nav_categories: JSON.stringify(navItems),
          logo_config: JSON.stringify({
            displayMode: logoMode,
            logoUrl: logoUrl.trim(),
            brandText: brandText.trim() || 'CVLoom',
            subtitle: brandSubtitle.trim()
          })
        })
      ]);

      const allOk = resJobs.success && resBlogs.success && resNotifs.success && resSettings.success;
      if (allOk) {
        setSyncAllMsg({
          success: true,
          message: `✓ Mubarak ho! ${jobs.length} Jobs, ${blogs.length} Blogs, ${notifications.length} Blinker Tickers aur Settings sabhi MySQL Database me successfully save ho gaye hain! Ab dusre browser me check karein, update turant dikhega!`
        });
      } else {
        const errorList = [resJobs.error, resBlogs.error, resNotifs.error, resSettings.error].filter(Boolean).join(' | ');
        setSyncAllMsg({
          success: false,
          message: `⚠️ Sync Notice: ${errorList || 'Kuch tables sync nahi ho paye. Kripya check karein ki cPanel me api.php updated file upload ho chuki hai.'}`
        });
      }
    } catch (err: any) {
      setSyncAllMsg({
        success: false,
        message: `❌ Sync Error: ${err?.message || 'Server api.php tak request nahi pahuch payi'}`
      });
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Logo file upload handler (Uploads to server / api.php, with optimized canvas fallback)
  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB! Please select a smaller logo file.');
      return;
    }

    setIsUploadingLogo(true);
    setLogoUploadMsg('Uploading logo...');

    // 1. Try uploading to PHP backend if available
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const res = await fetch(getApiUrl('upload_logo'), {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setLogoUrl(data.url);
        setLogoUploadMsg('✓ Logo uploaded successfully to server folder (/uploads/)!');
        setIsUploadingLogo(false);
        setTimeout(() => setLogoUploadMsg(null), 4000);
        return;
      }
    } catch (err) {
      // api.php not reachable or running in local dev preview - use optimized local compression fallback
    }

    // 2. High-performance Canvas Compression Fallback (Converts to tiny 200x60 base64 so localStorage NEVER overflows)
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 320;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/png', 0.85);
            setLogoUrl(compressed);
            setLogoUploadMsg('✓ Logo processed and optimized for immediate display!');
            setTimeout(() => setLogoUploadMsg(null), 4000);
          }
          setIsUploadingLogo(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsUploadingLogo(false);
      alert('Could not process image file. Please enter an image URL instead.');
    }
  };

  // Logo settings save handler
  const handleSaveLogoSettings = () => {
    const newConfig: SiteLogoConfig = {
      displayMode: logoMode,
      logoUrl: logoUrl.trim(),
      brandText: brandText.trim() || 'CVLoom',
      subtitle: brandSubtitle.trim()
    };
    if (onUpdateLogoConfig) {
      onUpdateLogoConfig(newConfig);
    } else {
      saveLogoConfig(newConfig);
    }
    // Explicit sync to MySQL
    apiSyncSettings({ logo_config: JSON.stringify(newConfig) })
      .catch(() => {});

    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('sarkari_global_admin_password') || 'sarkari2026';
    if (username.trim() === 'admin' && password === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sarkari_global_admin_auth', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Username or Password! Please use correct admin credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sarkari_global_admin_auth');
    setUsername('');
    setPassword('');
  };

  // Stats calculation
  const totalJobs = jobs.length;
  const publishedJobs = jobs.filter(j => j.status === 'Published').length;
  const draftJobs = jobs.filter(j => j.status === 'Draft').length;
  const totalViews = jobs.reduce((sum, j) => sum + (j.views || 0), 0);
  const totalBlogs = blogs.length;

  const handleToggleJobStatus = (id: string) => {
    const updated = jobs.map(j => {
      if (j.id === id) {
        return { ...j, status: j.status === 'Published' ? 'Draft' : 'Published' as any };
      }
      return j;
    });
    onUpdateJobs(updated);
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      onUpdateJobs(jobs.filter(j => j.id !== id));
    }
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.organization) return;

    if (editingJob.id) {
      // Edit mode
      const updated = jobs.map(j => (j.id === editingJob.id ? { ...j, ...editingJob } as Job : j));
      onUpdateJobs(updated);
    } else {
      // Create mode
      const newJob: Job = {
        ...editingJob,
        id: `job-custom-${Date.now()}`,
        views: 0,
        createdAt: new Date().toISOString(),
        status: editingJob.status || 'Published',
        category: editingJob.category || 'Latest Job',
        jobType: editingJob.jobType || 'Central',
        applicationMode: editingJob.applicationMode || 'Online',
        vacancyDetailsTable: editingJob.vacancyDetailsTable || [],
        documentsRequired: editingJob.documentsRequired || [],
        applicationFees: editingJob.applicationFees || [],
        faqs: editingJob.faqs || [],
        buttons: editingJob.buttons || []
      } as Job;
      onUpdateJobs([newJob, ...jobs]);
    }
    setEditingJob(null);
  };

  const handleToggleBlogStatus = (id: string) => {
    const updated = blogs.map(b => {
      if (b.id === id) {
        return { ...b, isTrending: !b.isTrending };
      }
      return b;
    });
    onUpdateBlogs(updated);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      onUpdateBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) return;

    if (editingBlog.id) {
      const updated = blogs.map(b => (b.id === editingBlog.id ? { ...b, ...editingBlog } as Blog : b));
      onUpdateBlogs(updated);
    } else {
      const newBlog: Blog = {
        ...editingBlog,
        id: `blog-custom-${Date.now()}`,
        viewsCount: 0,
        publishDate: new Date().toISOString().split('T')[0],
        comments: [],
        tags: editingBlog.tags || ['career', 'tips'],
        featuredImage: editingBlog.featuredImage || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
      } as Blog;
      onUpdateBlogs([newBlog, ...blogs]);
    }
    setEditingBlog(null);
  };

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;

    let finalLink = newTickerLink.trim() || '#';
    if (selectedJobToLink) {
      finalLink = `#job-detail/${selectedJobToLink}`;
    }

    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      message: newTickerText.trim(),
      isTicker: tickerIsActive,
      link: finalLink,
      type: 'alert',
      createdAt: new Date().toISOString()
    };

    onUpdateNotifications([newNotif, ...notifications]);
    setNewTickerText('');
    setNewTickerLink('');
    setSelectedJobToLink('');
  };

  const handleDeleteNotification = (id: string) => {
    onUpdateNotifications(notifications.filter(n => n.id !== id));
  };

  const handleResetSystem = () => {
    if (window.confirm('Warning: This will clear your custom jobs and restore original database presets. Proceed?')) {
      onResetAllSeeds();
      alert('System successfully restored to default database seeds!');
    }
  };

  const handleDownloadJobsCsv = () => {
    const headers = ['ID', 'Title', 'Organization', 'Post Name', 'Category', 'Job Type', 'Vacancies', 'Salary', 'Qualification', 'Start Date', 'End Date', 'Location', 'Official Website'];
    const rows = jobs.map(j => [
      `"${j.id}"`,
      `"${(j.title || '').replace(/"/g, '""')}"`,
      `"${(j.organization || '').replace(/"/g, '""')}"`,
      `"${(j.postName || '').replace(/"/g, '""')}"`,
      `"${(j.category || '').replace(/"/g, '""')}"`,
      `"${(j.jobType || '').replace(/"/g, '""')}"`,
      j.totalVacancies || 0,
      `"${(j.salary || '').replace(/"/g, '""')}"`,
      `"${(j.qualification || '').replace(/"/g, '""')}"`,
      `"${j.applicationStartDate || ''}"`,
      `"${j.applicationEndDate || ''}"`,
      `"${(j.location || '').replace(/"/g, '""')}"`,
      `"${(j.officialWebsite || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sarkari_job_listings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJobsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jobs, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `sarkari_job_listings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadBlogsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogs, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `career_blogs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadFullBackup = () => {
    const backupData = {
      jobs,
      blogs,
      notifications,
      heroSlides,
      navItems,
      globalSettings,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `portal_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 px-4" id="admin-login-screen">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Admin Gatekeeper</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Access authorized system configurations & updates.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1.5 uppercase">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="w-full px-4 py-2.5 border border-stone-200 dark:border-stone-800 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="relative">
              <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1.5 uppercase">Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2.5 border border-stone-200 dark:border-stone-800 rounded-xl text-xs bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#132E22] hover:bg-[#1B3B2B] text-white font-bold rounded-xl shadow-lg transition cursor-pointer font-serif text-sm tracking-wide"
            >
              Verify Credentials & Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8" id="admin-panel-component">
      
      {/* PurposeHire Admin Header Banner */}
      <div className="bg-gradient-to-r from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Portal Master Control</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-tight leading-tight">Dynamic Management & Publishing Hub</h1>
          <p className="text-stone-300 text-xs md:text-sm mt-1.5 max-w-xl leading-relaxed font-normal">
            Control all content, job postings, candidate submissions, blogs, navbar categories, branding texts, and database backups.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-2.5">
          <button 
            onClick={handleForceSyncToMySQL}
            disabled={isSyncingAll}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg cursor-pointer border border-emerald-400/40"
            title="Click to push all local jobs, blogs, notifications, logo and settings directly to MySQL database"
          >
            <Database className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'Syncing to MySQL...' : '⚡ Push All to MySQL'}</span>
          </button>
          <button 
            onClick={handleResetSystem}
            className="bg-red-700/80 hover:bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer border border-red-500/30"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-Seed Database
          </button>
          <button 
            onClick={handleLogout}
            className="bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md border border-stone-700/50 cursor-pointer"
          >
            <Unlock className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {syncAllMsg && (
        <div className={`mb-6 p-4 rounded-2xl text-xs font-semibold flex items-center justify-between gap-3 shadow-md animate-fade-in ${
          syncAllMsg.success 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800' 
            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
        }`}>
          <div className="flex items-center gap-2">
            {syncAllMsg.success ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
            <span>{syncAllMsg.message}</span>
          </div>
          <button onClick={() => setSyncAllMsg(null)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs px-2 py-1 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation tabs */}
        <div className="space-y-2">
          {[
            { id: 'overview', label: '📊 Dashboard Overview', count: null },
            { id: 'homepage', label: '🏠 Homepage Sections & Recruiters', count: 'Live' },
            { id: 'popup', label: '🔔 Welcome Alert & Video Modal', count: popupEnabled ? 'Active' : 'Off' },
            { id: 'footer', label: '🦶 Footer Design & Colors', count: 'Full Control' },
            { id: 'ads', label: '📢 Ad Banners & Promotions', count: ads.length },
            { id: 'cpanel', label: '🚀 cPanel & PHP Migration', count: 'Live' },
            { id: 'branding', label: '🎨 Logo & Brand Identity', count: null },
            { id: 'slider', label: 'Hero Image Slider', count: heroSlides.length },
            { id: 'navs', label: 'Navbar & Categories', count: navItems.length },
            { id: 'jobs', label: 'Manage Job Listings', count: totalJobs },
            { id: 'blogs', label: 'Articles & Career Guides', count: totalBlogs },
            { id: 'notifications', label: 'Announcements & Ticker', count: notifications.length },
            { id: 'settings', label: 'Portal Settings & Share Links', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setEditingJob(null); setEditingBlog(null); }}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold transition-all flex justify-between items-center cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-[#132E22] text-white shadow-md border border-emerald-700/40' 
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
            >
              <span className="font-serif">{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                  activeTab === tab.id ? 'bg-emerald-500/30 text-emerald-300' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action / Data View panel */}
        <div className="lg:col-span-3">

          {/* OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Indexing', value: totalJobs, color: 'bg-blue-600' },
                  { label: 'Published Feed', value: publishedJobs, color: 'bg-green-600' },
                  { label: 'Sarkari Drafts', value: draftJobs, color: 'bg-amber-500' },
                  { label: 'Total Page Views', value: totalViews.toLocaleString(), color: 'bg-indigo-600' }
                ].map((st, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{st.label}</span>
                    <strong className="text-3xl font-black text-slate-900 mt-2 block">{st.value}</strong>
                    <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
                      <div className={`h-full ${st.color}`} style={{ width: '60%' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fast Activity Monitor */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-3">
                  <Eye className="w-4 h-4 text-blue-600" /> Recent Post Performance
                </h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {jobs.slice(0, 5).map(jb => (
                    <div key={jb.id} className="py-3.5 flex justify-between items-center">
                      <div className="truncate max-w-md">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{jb.category}</span>
                        <p className="font-bold text-slate-800 hover:text-blue-600 cursor-pointer truncate mt-0.5">{jb.title}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 font-mono text-slate-500">
                        <span>👁️ {jb.views?.toLocaleString() || 0} reads</span>
                        <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          jb.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {jb.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Change Admin Password Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-3">
                  <Lock className="w-4 h-4 text-blue-600" /> Security Settings & Password Update
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const currentPwd = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
                  const newPwd = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
                  const confirmPwd = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
                  
                  const savedPwd = localStorage.getItem('sarkari_global_admin_password') || 'sarkari2026';
                  
                  if (currentPwd !== savedPwd) {
                    alert('Error: Current password is incorrect!');
                    return;
                  }
                  if (newPwd.length < 6) {
                    alert('Error: New password must be at least 6 characters long!');
                    return;
                  }
                  if (newPwd !== confirmPwd) {
                    alert('Error: New passwords do not match!');
                    return;
                  }
                  
                  localStorage.setItem('sarkari_global_admin_password', newPwd);
                  
                  // Sync password to MySQL database dynamically if hosted
                  fetch(getApiUrl('save_password'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: newPwd })
                  })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success) {
                      console.log('Admin password successfully synchronized with MySQL.');
                    }
                  })
                  .catch(() => {
                    // Fail silently in development/offline mode
                    console.log('Local/offline mode detected. Saved to browser storage.');
                  });

                  alert('Success: Admin password successfully updated!');
                  form.reset();
                }} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">Current Password</label>
                    <input 
                      type="password" 
                      name="currentPassword" 
                      required 
                      placeholder="Enter Current Password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">New Password</label>
                    <input 
                      type="password" 
                      name="newPassword" 
                      required 
                      placeholder="Enter New Password (min 6 chars)"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase">Confirm Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        placeholder="Re-enter New Password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-md shadow-blue-500/10 cursor-pointer h-10 flex items-center justify-center shrink-0 self-end"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

              {/* Export & Download Job Listings and Portal Data */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-600">
                      <Download className="w-4 h-4" />
                      <span>Data Downloads &amp; Export Center</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Download Job Listings &amp; System Backups
                    </h4>
                    <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
                      Easily download your active job listings in Excel/CSV or JSON formats for offline review, reports, or candidate records.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                    {totalJobs} Jobs Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <button
                    type="button"
                    onClick={handleDownloadJobsCsv}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-105 transition-transform">
                      CSV
                    </div>
                    <strong className="block text-xs font-black text-slate-900 group-hover:text-blue-700">
                      Download Jobs (CSV)
                    </strong>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      For Microsoft Excel &amp; Google Sheets
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJobsJson}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 transition text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-105 transition-transform">
                      JSON
                    </div>
                    <strong className="block text-xs font-black text-slate-900 group-hover:text-indigo-700">
                      Download Jobs (JSON)
                    </strong>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Complete raw database format
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBlogsJson}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-105 transition-transform">
                      DOC
                    </div>
                    <strong className="block text-xs font-black text-slate-900 group-hover:text-emerald-700">
                      Download Blogs (JSON)
                    </strong>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      All published guides &amp; study articles
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadFullBackup}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 transition text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-105 transition-transform">
                      ZIP
                    </div>
                    <strong className="block text-xs font-black text-slate-900 group-hover:text-amber-700">
                      Full Portal Backup
                    </strong>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Jobs, blogs, banners &amp; nav settings
                    </span>
                  </button>
                </div>

                {/* Secondary Technical SQL option */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Server database migration script:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const sql = generatePhpMyAdminSql(jobs, blogs, notifications, heroSlides, navItems, globalSettings);
                      downloadSqlFile('sarkari_database.sql', sql);
                    }}
                    className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download phpMyAdmin .SQL Script</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HOMEPAGE SECTIONS & RECRUITERS PANEL */}
          {activeTab === 'homepage' && (
            <div className="space-y-8 animate-fade-in">
              {/* Top Intro */}
              <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl border border-emerald-900/40 relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                    <Layout className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Homepage Management</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif">Configure Homepage Content &amp; Verified Recruiters</h2>
                  <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                    Control every visible text block, recruiter name, and quick category shortcut on the homepage. Changes take effect across the entire portal immediately.
                  </p>
                </div>
              </div>

              {/* 1. Hero Banner Content */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">🎯 Homepage Hero Headline &amp; Subtitle</h3>
                    <p className="text-xs text-slate-500 mt-0.5">The primary welcoming banner right above the job search and listings feed.</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (onUpdateSettings) {
                      onUpdateSettings({
                        ...globalSettings,
                        home_hero_badge: homeHeroBadge,
                        home_hero_title: homeHeroTitle,
                        home_hero_subtitle: homeHeroSubtitle
                      });
                      alert('Success: Homepage Hero Banner updated live!');
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wide">Hero Badge Pill</label>
                    <input 
                      type="text" 
                      value={homeHeroBadge} 
                      onChange={e => setHomeHeroBadge(e.target.value)}
                      placeholder="e.g. 100% Verified Career Opportunities"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wide">Main Hero Headline</label>
                    <input 
                      type="text" 
                      value={homeHeroTitle} 
                      onChange={e => setHomeHeroTitle(e.target.value)}
                      placeholder="e.g. Discover Meaningful Career Openings"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wide">Intro Description</label>
                    <textarea 
                      rows={3}
                      value={homeHeroSubtitle} 
                      onChange={e => setHomeHeroSubtitle(e.target.value)}
                      placeholder="e.g. Verified opportunities across NGOs, CSR Foundations, Government Departments, and Fellowships..."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Save Hero Content Live
                  </button>
                </form>
              </div>

              {/* 2. Top Verified Recruiters in Sidebar */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">🏢 Top Verified Recruiters / Departments</h3>
                    <p className="text-xs text-slate-500 mt-0.5">These recruiter tags appear on the homepage sidebar for 1-click candidate filtering.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const defaults = ['Sarvam Foundation', 'Social Alpha', 'Lend A Hand', 'UPSC', 'NITI Aayog', 'BECIL', 'Swades', 'Plastics For Change'];
                      setRecruiters(defaults);
                      if (onUpdateSettings) {
                        onUpdateSettings({
                          ...globalSettings,
                          verified_recruiters: defaults.join(', ')
                        });
                      }
                      alert('Reset to default recruiters!');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                  >
                    Reset Defaults
                  </button>
                </div>

                {/* Active Recruiters List */}
                <div className="space-y-3">
                  <label className="block text-slate-700 font-bold uppercase tracking-wide text-xs">Currently Displayed ({recruiters.length} Recruiters):</label>
                  <div className="flex flex-wrap gap-2">
                    {recruiters.map((rec, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs border border-stone-200"
                      >
                        <span>{rec}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = recruiters.filter((_, i) => i !== idx);
                            setRecruiters(updated);
                            if (onUpdateSettings) {
                              onUpdateSettings({
                                ...globalSettings,
                                verified_recruiters: updated.join(', ')
                              });
                            }
                          }}
                          className="hover:text-red-600 transition ml-1 cursor-pointer font-black"
                          title="Remove recruiter"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add New Recruiter Form */}
                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="text" 
                    value={newRecruiterInput}
                    onChange={e => setNewRecruiterInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newRecruiterInput.trim()) {
                          const updated = [...recruiters, newRecruiterInput.trim()];
                          setRecruiters(updated);
                          setNewRecruiterInput('');
                          if (onUpdateSettings) {
                            onUpdateSettings({
                              ...globalSettings,
                              verified_recruiters: updated.join(', ')
                            });
                          }
                        }
                      }
                    }}
                    placeholder="Type organization / recruiter name (e.g. Tata Trusts, ISRO, CBSE)"
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newRecruiterInput.trim()) {
                        const updated = [...recruiters, newRecruiterInput.trim()];
                        setRecruiters(updated);
                        setNewRecruiterInput('');
                        if (onUpdateSettings) {
                          onUpdateSettings({
                            ...globalSettings,
                            verified_recruiters: updated.join(', ')
                          });
                        }
                      }
                    }}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer shrink-0"
                  >
                    ➕ Add Recruiter
                  </button>
                </div>
              </div>

              {/* 3. Recruitment Directory Tables Status */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase">⚡ 12 Active Recruitment Directory Tables</h3>
                  <p className="text-xs text-slate-500 mt-0.5">These 12 categorized directory folders feed the classic tabular grid at the bottom of the homepage.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  {[
                    { cat: 'Latest Job', label: 'Latest Jobs' },
                    { cat: 'Admit Card', label: 'Admit Cards' },
                    { cat: 'Result', label: 'Results' },
                    { cat: 'NGO Job', label: 'NGO Careers' },
                    { cat: 'Private Job', label: 'Private Jobs' },
                    { cat: 'Walk-in Interview', label: 'Walk-ins' },
                    { cat: 'Admission', label: 'Admissions' },
                    { cat: 'Scholarship', label: 'Scholarships' },
                    { cat: 'Answer Key', label: 'Answer Keys' },
                    { cat: 'Syllabus', label: 'Syllabus' },
                    { cat: 'Government Scheme', label: 'Govt Schemes' },
                    { cat: 'Internship', label: 'Internships' }
                  ].map(item => {
                    const count = jobs.filter(j => j.category === item.cat && j.status === 'Published').length;
                    return (
                      <div key={item.cat} className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 flex justify-between items-center">
                        <div>
                          <strong className="block text-stone-900">{item.label}</strong>
                          <span className="text-[10px] text-stone-500 font-mono">{count} Live Posts</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('jobs');
                            setAdminJobSearch(item.cat);
                          }}
                          className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded-lg text-[10px] font-bold text-stone-700 transition cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ADVERTISEMENTS & BANNER PROMOTIONS PANEL */}
          {activeTab === 'ads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl border border-emerald-900/40 relative overflow-hidden shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                      <Megaphone className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Promotion &amp; Monetization Engine</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-serif">Manage Banner Advertisements &amp; Sponsors</h2>
                    <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                      Insert custom banners, partner schemes, educational advertisements, and affiliate links across header, homepage, and sidebars.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAd({
                        id: `ad-${Date.now()}`,
                        title: '',
                        imageUrl: '',
                        targetUrl: '',
                        position: 'homepage',
                        isActive: true,
                        impressions: 0,
                        clicks: 0
                      });
                      setIsCreatingAd(true);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer self-start md:self-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Ad Banner</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Ad Modal / Form */}
              {(isCreatingAd || editingAd) && (
                <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-md space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <h3 className="font-bold text-stone-900 text-sm">
                      {isCreatingAd ? '➕ Create New Advertisement Banner' : '✏️ Edit Advertisement Banner'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => { setIsCreatingAd(false); setEditingAd(null); }}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      ✕ Cancel
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!editingAd?.title || !editingAd?.targetUrl) {
                        alert('Error: Banner title and Target URL are required!');
                        return;
                      }
                      const updatedAd: Advertisement = {
                        id: editingAd.id || `ad-${Date.now()}`,
                        title: editingAd.title || 'Sponsor Banner',
                        imageUrl: editingAd.imageUrl || 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800',
                        targetUrl: editingAd.targetUrl,
                        position: (editingAd.position as any) || 'homepage',
                        isActive: editingAd.isActive !== false,
                        impressions: editingAd.impressions || 0,
                        clicks: editingAd.clicks || 0
                      };

                      let updatedList: Advertisement[];
                      if (ads.some(a => a.id === updatedAd.id)) {
                        updatedList = ads.map(a => a.id === updatedAd.id ? updatedAd : a);
                      } else {
                        updatedList = [updatedAd, ...ads];
                      }
                      setAds(updatedList);
                      saveAds(updatedList);
                      setIsCreatingAd(false);
                      setEditingAd(null);
                      alert('Success: Ad Banner successfully saved!');
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 uppercase">Banner Title / Campaign Name *</label>
                        <input 
                          type="text" 
                          required
                          value={editingAd?.title || ''}
                          onChange={e => setEditingAd(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Free UPSC Mock Test 2026"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 uppercase">Placement Position *</label>
                        <select 
                          value={editingAd?.position || 'homepage'}
                          onChange={e => setEditingAd(prev => ({ ...prev, position: e.target.value as any }))}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                        >
                          <option value="homepage">Homepage Main Feed</option>
                          <option value="header">Site Header Banner</option>
                          <option value="sidebar">Right Sidebar</option>
                          <option value="footer">Site Footer</option>
                          <option value="in-content">Inside Job Details</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 uppercase">Target Click URL (Destination) *</label>
                        <input 
                          type="url" 
                          required
                          value={editingAd?.targetUrl || ''}
                          onChange={e => setEditingAd(prev => ({ ...prev, targetUrl: e.target.value }))}
                          placeholder="e.g. https://example.com/apply-now"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 uppercase">Banner Image URL</label>
                        <input 
                          type="url" 
                          value={editingAd?.imageUrl || ''}
                          onChange={e => setEditingAd(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                        <input 
                          type="checkbox"
                          checked={editingAd?.isActive !== false}
                          onChange={e => setEditingAd(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                        />
                        <span>Active / Published Live</span>
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingAd(false); setEditingAd(null); }}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition cursor-pointer"
                      >
                        Save Advertisement
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Ads Table */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-stone-900 text-sm">Configured Banners ({ads.length})</h3>
                </div>

                {ads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase">
                        <tr>
                          <th className="p-3">Banner Title</th>
                          <th className="p-3">Placement</th>
                          <th className="p-3">Target Destination</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {ads.map(ad => (
                          <tr key={ad.id} className="hover:bg-stone-50/50">
                            <td className="p-3 font-bold text-stone-900 flex items-center gap-2">
                              {ad.imageUrl && (
                                <img src={ad.imageUrl} alt="" className="w-10 h-6 object-cover rounded border border-stone-200 shrink-0" />
                              )}
                              <span>{ad.title}</span>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] uppercase font-bold">
                                {ad.position}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-stone-500 truncate max-w-xs">{ad.targetUrl}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                ad.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                              }`}>
                                {ad.isActive ? 'Active' : 'Disabled'}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = ads.map(a => a.id === ad.id ? { ...a, isActive: !a.isActive } : a);
                                  setAds(updated);
                                  saveAds(updated);
                                }}
                                className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[10px] cursor-pointer"
                              >
                                {ad.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingAd(ad)}
                                className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete banner "${ad.title}"?`)) {
                                    const updated = ads.filter(a => a.id !== ad.id);
                                    setAds(updated);
                                    saveAds(updated);
                                  }
                                }}
                                className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px] cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-stone-400 text-xs">
                    No advertisement banners configured yet. Click "Create New Ad Banner" above to add your first promotion.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CPANEL & PHP DEPLOYMENT / MIGRATION PANEL */}
          {activeTab === 'cpanel' && (
            <div className="space-y-6 animate-fade-in">
              {/* Top Banner */}
              <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl border border-emerald-900/40 relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide mb-3">
                    <Database className="w-3.5 h-3.5 text-emerald-300" />
                    <span>cPanel &amp; MySQL One-Click Setup</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif tracking-tight">
                    cPanel, PHP &amp; MySQL Database Migration Package
                  </h2>
                  <p className="text-stone-300 text-xs md:text-sm mt-2 max-w-2xl leading-relaxed">
                    Aapko cPanel me alag se koi code likhne ki zarurat nahi hai. Niche diye gaye sabhi files (Database SQL, db.php config, REST API backend) ready hain. Aapko sirf cPanel me database create karke import karna hai!
                  </p>
                </div>
              </div>

              {/* Download Center Grid */}
              <div className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>All Deployment Files (One-Click Downloads)</span>
                  </h3>
                  <p className="text-stone-500 text-xs mt-1">
                    Apni hosting ke liye jaruri sabhi files yahan se 1-click me download karein:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* SQL Dump */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">
                        SQL
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        database.sql
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        phpMyAdmin me 1-click import ke liye complete schema + jobs, blogs aur settings seed data.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const sql = generatePhpMyAdminSql(jobs, blogs, notifications, heroSlides, navItems, globalSettings);
                        downloadSqlFile('database.sql', sql);
                      }}
                      className="mt-4 w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .SQL</span>
                    </button>
                  </div>

                  {/* db.php */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs mb-3">
                        PHP
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        config/db.php
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        PDO Database connection file. Isme sirf apna database name, user aur password likhna hai.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const dbPhp = `<?php\\ndefine('DB_HOST', 'localhost');\\ndefine('DB_NAME', 'YOUR_DATABASE_NAME');\\ndefine('DB_USER', 'YOUR_DATABASE_USER');\\ndefine('DB_PASS', 'YOUR_DATABASE_PASS');\\n\\nheader("Access-Control-Allow-Origin: *");\\nheader("Access-Control-Allow-Headers: Content-Type, Authorization");\\nheader("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");\\nheader("Content-Type: application/json; charset=UTF-8");\\n\\ntry {\\n    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [\\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\\n    ]);\\n} catch (PDOException $e) {\\n    http_response_code(500);\\n    echo json_encode(['success' => false, 'error' => $e->getMessage()]);\\n    exit;\\n}\\n`;
                        const blob = new Blob([dbPhp], { type: 'application/x-php;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'db.php';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download db.php</span>
                    </button>
                  </div>

                  {/* api.php */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs mb-3">
                        API
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        api.php (REST API)
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        Jobs, Blogs, Settings, Notifications aur Candidate Applications ka complete backend router.
                      </p>
                    </div>
                    <a
                      href="./api.php"
                      download="api.php"
                      className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download api.php</span>
                    </a>
                  </div>

                  {/* Tar.gz Bundle */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs mb-3">
                        ZIP
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        public_html Ready Zip
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        Complete Frontend + PHP Backend + SQL. cPanel File Manager me upload karke Extract karein!
                      </p>
                    </div>
                    <a
                      href="./public_html_ready.tar.gz"
                      download="public_html_ready.tar.gz"
                      className="mt-4 w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Full Site</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Guide in Hindi */}
              <div className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span>cPanel Me Setup Karne Ka Step-by-Step Aasan Tareeka</span>
                  </h3>
                  <p className="text-stone-500 text-xs mt-1">
                    Kewal ye 4 aasan steps follow karein aur aapki website MySQL database ke sath live ho jayegi:
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          cPanel me MySQL Database aur User Banayein
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          1. Apne cPanel me login karein aur <strong>"MySQL Database Wizard"</strong> par click karein.<br />
                          2. Database Name likhein (jaise: <code className="bg-stone-200 dark:bg-stone-700 px-1 py-0.5 rounded text-[11px]">sarkaridb</code>) aur Next karein.<br />
                          3. Database User banayein aur ek Strong Password set karein.<br />
                          4. <strong>"ALL PRIVILEGES"</strong> box par check karein aur "Make Changes" dabayein.<br />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                            👉 Note kar lein: Database Name, User Name aur Password.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          phpMyAdmin me "database.sql" Import Karein
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          1. cPanel dashboard se <strong>"phpMyAdmin"</strong> open karein.<br />
                          2. Left side menu me se apna banaya hua database select karein.<br />
                          3. Top bar me <strong>"Import"</strong> tab par click karein.<br />
                          4. "Choose File" me upar download ki hui <strong>database.sql</strong> file select karein.<br />
                          5. Niche <strong>"Go" / "Import"</strong> button daba dein. Sabhi tables aur initial jobs/blogs data turant add ho jayenge!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            "config/db.php" me Database Details Dalein
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const snippet = `define('DB_HOST', 'localhost');\\ndefine('DB_NAME', 'your_cpanel_database');\\ndefine('DB_USER', 'your_cpanel_user');\\ndefine('DB_PASS', 'your_cpanel_password');`;
                              navigator.clipboard.writeText(snippet);
                              setCopiedCodeSnippet('db_config');
                              setTimeout(() => setCopiedCodeSnippet(null), 2500);
                            }}
                            className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedCodeSnippet === 'db_config' ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          cPanel File Manager me jakar <code className="bg-stone-200 dark:bg-stone-700 px-1 py-0.5 rounded text-[11px]">public_html/config/db.php</code> file open karein aur ye 3 details replace karein:
                        </p>
                        <pre className="p-3 bg-stone-900 text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto">
{`define('DB_HOST', 'localhost');
define('DB_NAME', 'your_cpanel_database');  // Aapka database name
define('DB_USER', 'your_cpanel_user');      // Aapka database user
define('DB_PASS', 'your_cpanel_password');  // Aapka user password`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        4
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          cPanel File Manager (public_html) me Files Upload Karein
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          cPanel File Manager me <code className="bg-stone-200 dark:bg-stone-700 px-1 py-0.5 rounded text-[11px]">public_html</code> folder me apni sabhi files (index.html, assets, api.php, config/ folder aur .htaccess) ko upload kar dein.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Tables Cheatsheet & Directory */}
                <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📋</span>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                      MySQL Database Tables Directory (Kounsa Table Kis Kaam Ka Hai?)
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    Database me sabhi features ke alag-alag tables hote hain. Aapke database me ye tables maujood hain:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>⚡</span>
                        <code>sarkari_notifications</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Yehi Blinker / News Ticker hai!</strong> Top header me ghumne wale latest alerts is table me store hote hain.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400">
                        <span>📝</span>
                        <code>sarkari_blogs</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Yehi Blog Section hai!</strong> Career preparation articles, guide posts, comments aur reading time is table me hain.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        <span>💼</span>
                        <code>sarkari_jobs</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Sari Jobs &amp; Vacancies!</strong> UPSC, SSC, Samvida, NGO jobs, dates, eligibility aur fees is table me hain.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400">
                        <span>🎨</span>
                        <code>sarkari_settings</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Logo, Slider &amp; Brand!</strong> Website logo config, hero slider images, navbar menu items aur admin password.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400">
                        <span>📥</span>
                        <code>sarkari_applications</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Online Applications!</strong> Candidates dwara website se submit ki gayi job application forms ka record.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-amber-200 dark:border-stone-700">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                        <span>📧</span>
                        <code>sarkari_subscribers</code>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1">
                        <strong>Job Alert Newsletter!</strong> Candidates ki email IDs jo latest job notifications ke liye subscribe karte hain.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connection Test Box */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      MySQL Connection Health Check
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Check karein ki hosting server par MySQL database successfully connect ho gaya ya nahi.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={testingDb}
                    onClick={async () => {
                      setTestingDb(true);
                      setDbTestResult(null);
                      try {
                        const data = await apiCheckDb();
                        if (data.success) {
                          setDbTestResult({ success: true, message: data.message || 'Mubarak ho! Database successfully connected hai!' });
                        } else {
                          setDbTestResult({ success: false, message: data.error || data.hint || 'Database connection error' });
                        }
                      } catch (err: any) {
                        setDbTestResult({ success: false, message: 'Server check: api.php offline or local preview mode. cPanel me upload hone ke baad ye live MySQL se connect hoga.' });
                      } finally {
                        setTestingDb(false);
                      }
                    }}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingDb ? 'animate-spin' : ''}`} />
                    <span>{testingDb ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                </div>

                {dbTestResult && (
                  <div className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    dbTestResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                  }`}>
                    {dbTestResult.success ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
                    <span>{dbTestResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LOGO & BRAND IDENTITY MANAGER PANEL */}
          {activeTab === 'branding' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase flex items-center gap-2">
                    <span>🎨</span>
                    <span>Website Logo & Brand Identity Settings</span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Customize your portal logo: Choose between "Kewal Logo", "Logo & Text", or "Kewal Text", and upload a custom logo image with live preview.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveLogoSettings}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Settings</span>
                </button>
              </div>

              {logoSaveSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>✓ Logo and brand settings saved successfully! Changes are live across the website.</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Controls (lg:col-span-7) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
                  
                  {/* 1. Logo Display Mode */}
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                      1. Logo Display Mode (Header & Navbar)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Choose how the logo should appear in the navigation bar:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {/* Option A: Logo Only */}
                      <div
                        onClick={() => setLogoMode('logo_only')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center gap-2 ${
                          logoMode === 'logo_only'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          Logo
                        </div>
                        <div>
                          <strong className="text-xs block font-bold">Kewal Logo</strong>
                          <span className="text-[10px] text-slate-500">Logo Image Only</span>
                        </div>
                      </div>

                      {/* Option B: Logo & Text */}
                      <div
                        onClick={() => setLogoMode('logo_text')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center gap-2 ${
                          logoMode === 'logo_text'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                            CV
                          </div>
                          <span className="text-xs font-black text-slate-800">Loom</span>
                        </div>
                        <div>
                          <strong className="text-xs block font-bold">Logo & Text</strong>
                          <span className="text-[10px] text-slate-500">Image + Brand Text</span>
                        </div>
                      </div>

                      {/* Option C: Text Only */}
                      <div
                        onClick={() => setLogoMode('text_only')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center gap-2 ${
                          logoMode === 'text_only'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="text-base font-black text-slate-900 tracking-tight py-1">
                          CVLoom
                        </div>
                        <div>
                          <strong className="text-xs block font-bold">Kewal Text</strong>
                          <span className="text-[10px] text-slate-500">Brand Name Only</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Logo Upload & URL Options */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                      2. Custom Logo Graphic / Image
                    </label>

                    {/* File Upload Button */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <strong className="text-xs font-bold text-slate-800 block">Upload Logo File</strong>
                          <span className="text-[11px] text-slate-500">Supports PNG, SVG, JPG, WebP format (Max 2MB)</span>
                        </div>
                        <label className={`px-4 py-2 ${isUploadingLogo ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'} text-white text-xs font-bold rounded-xl cursor-pointer transition shadow-xs flex items-center justify-center gap-1.5 shrink-0`}>
                          <Upload className={`w-3.5 h-3.5 ${isUploadingLogo ? 'animate-bounce' : ''}`} />
                          <span>{isUploadingLogo ? 'Processing...' : 'Choose Logo File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingLogo}
                            onChange={handleLogoFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {logoUploadMsg && (
                        <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-[11px] font-semibold">
                          {logoUploadMsg}
                        </div>
                      )}

                      {/* Or image URL input */}
                      <div className="pt-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Or Enter Logo Image URL:
                        </label>
                        <input
                          type="url"
                          value={logoUrl}
                          onChange={e => setLogoUrl(e.target.value)}
                          placeholder="https://example.com/logo.png"
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Reset button if custom logo is set */}
                      {logoUrl && (
                        <div className="pt-1 flex items-center justify-between text-xs">
                          <span className="text-slate-500 text-[11px]">✓ Custom logo image loaded</span>
                          <button
                            type="button"
                            onClick={() => setLogoUrl('')}
                            className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove & Reset to Default Vector Logo</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. Brand Text & Tagline */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                      3. Brand Text & Subtitle
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Brand / Website Title:
                        </label>
                        <input
                          type="text"
                          value={brandText}
                          onChange={e => setBrandText(e.target.value)}
                          placeholder="e.g. CVLoom"
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 outline-none focus:border-blue-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Tagline / Subtitle (Optional):
                        </label>
                        <input
                          type="text"
                          value={brandSubtitle}
                          onChange={e => setBrandSubtitle(e.target.value)}
                          placeholder="e.g. Recruitment Portal"
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleSaveLogoSettings}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save and Apply Logo Across Entire Portal</span>
                    </button>
                  </div>

                </div>

                {/* Live Real-Time Preview (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Live Preview Card Light Mode */}
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Live Preview (Standard Navbar)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold uppercase">
                        {logoMode}
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-center min-h-[90px]">
                      <CVLoomLogo 
                        size="md"
                        customConfig={{
                          displayMode: logoMode,
                          logoUrl: logoUrl,
                          brandText: brandText,
                          subtitle: brandSubtitle
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">
                      This is how visitors see your logo in the desktop and mobile header.
                    </p>
                  </div>

                  {/* Live Preview Card Dark Mode */}
                  <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Live Preview (Dark Mode Header)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold uppercase">
                        Dark
                      </span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[90px]">
                      <CVLoomLogo 
                        size="md"
                        lightMode={true}
                        customConfig={{
                          displayMode: logoMode,
                          logoUrl: logoUrl,
                          brandText: brandText,
                          subtitle: brandSubtitle
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">
                      Tested against high contrast dark background.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* SLIDER MANAGER PANEL */}
          {activeTab === 'slider' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase">
                    🖼️ Hero Image Slider Manager ({heroSlides.length} Slides)
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Customize the 4-5 hero slides. Update floating titles (Govt Jobs, NGO Jobs, Samvida, Scholarships), descriptions, and upload new images or paste image URLs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = `slide-${Date.now()}`;
                    const newSlide: HeroSlide = {
                      id: newId,
                      badge: 'NEW RECRUITMENT',
                      title: 'New Featured Category',
                      subtitle: 'Add a compelling description of upcoming notifications and opportunities.',
                      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
                      buttonText: 'Explore Openings',
                      buttonLink: 'govt-jobs',
                      isActive: true,
                      order: heroSlides.length + 1
                    };
                    setEditingSlide(newSlide);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              {/* Editing Slide Form Modal/Inline */}
              {editingSlide ? (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-black text-slate-900 text-sm uppercase">
                      ✏️ Edit Slide Details: {editingSlide.title}
                    </h4>
                    <button
                      onClick={() => setEditingSlide(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-600 font-bold mb-1 uppercase">Floating Badge Text</label>
                      <input
                        type="text"
                        value={editingSlide.badge}
                        onChange={e => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                        placeholder="e.g. CENTRAL & STATE GOVT"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1 uppercase">Floating Main Title *</label>
                      <input
                        type="text"
                        required
                        value={editingSlide.title}
                        onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
                        placeholder="e.g. Govt Jobs 2026 / NGO Jobs / Samvida Jobs"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-bold"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-slate-600 font-bold mb-1 uppercase">Floating Subtitle / Description *</label>
                      <textarea
                        rows={2}
                        value={editingSlide.subtitle}
                        onChange={e => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                        placeholder="e.g. Access 50,000+ verified vacancies across UPSC, SSC, Railways..."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1 uppercase">Button Text</label>
                      <input
                        type="text"
                        value={editingSlide.buttonText}
                        onChange={e => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                        placeholder="e.g. Explore Govt Jobs"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1 uppercase">Button Target Route / Link</label>
                      <input
                        type="text"
                        value={editingSlide.buttonLink}
                        onChange={e => setEditingSlide({ ...editingSlide, buttonLink: e.target.value })}
                        placeholder="e.g. govt-jobs, ngo-jobs, scholarships, or #job-detail/job-1"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-mono"
                      />
                    </div>

                    {/* Image Selector: Upload or Paste URL */}
                    <div className="col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                      <label className="block text-slate-800 font-bold uppercase text-[11px]">
                        🖼️ Slide Image (File Upload or URL)
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2 space-y-2">
                          <input
                            type="text"
                            value={editingSlide.imageUrl}
                            onChange={e => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                            placeholder="Paste image URL (https://...)"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">OR</span>
                            <label className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition cursor-pointer border border-blue-200 flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Image from Computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setEditingSlide({ ...editingSlide, imageUrl: reader.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Live Image Thumbnail Preview */}
                        <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative">
                          {editingSlide.imageUrl ? (
                            <img src={editingSlide.imageUrl} alt="Slide Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-slate-400 text-[10px] flex items-center justify-center h-full">No Image Selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const existingIdx = heroSlides.findIndex(s => s.id === editingSlide.id);
                        let updated: HeroSlide[];
                        if (existingIdx >= 0) {
                          updated = heroSlides.map(s => s.id === editingSlide.id ? editingSlide : s);
                        } else {
                          updated = [...heroSlides, editingSlide];
                        }
                        onUpdateHeroSlides(updated);
                        setEditingSlide(null);
                        alert('Slide saved successfully!');
                      }}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
                    >
                      Save Slide
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Slides List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-36 bg-slate-900 overflow-hidden">
                      <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end text-white">
                        <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">{slide.badge}</span>
                        <h4 className="text-base font-black leading-tight">{slide.title}</h4>
                      </div>
                      <span className={`absolute top-2 right-2 text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        slide.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {slide.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="text-slate-400 font-mono text-[10px] truncate max-w-[150px]">
                          Target: {slide.buttonLink}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = heroSlides.map(s => s.id === slide.id ? { ...s, isActive: !s.isActive } : s);
                              onUpdateHeroSlides(updated);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${
                              slide.isActive ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {slide.isActive ? 'Deactivate' : 'Activate'}
                          </button>

                          <button
                            onClick={() => setEditingSlide(slide)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('Delete this slide?')) {
                                onUpdateHeroSlides(heroSlides.filter(s => s.id !== slide.id));
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NAVBAR & SUBNAVS MANAGER PANEL */}
          {activeTab === 'navs' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-2">
                <h3 className="text-base font-black text-slate-900 uppercase">
                  🧭 Navigation Bar & Sub-Navs Controller
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  All navbar categories (Govt Jobs, Scholarships, NGO Jobs, Fellowships, Internship, Blog, Contact) and their nested sub-nav dropdowns are completely dynamic and admin-controlled.
                </p>
              </div>

              {/* Add New SubNav Form */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">
                  ➕ Add New Subnav Category to Navbar
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs items-end">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1 uppercase">Parent Menu Item</label>
                    <select
                      value={selectedParentNavId}
                      onChange={e => setSelectedParentNavId(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                    >
                      {navItems.filter(n => n.subnavs).map(n => (
                        <option key={n.id} value={n.id}>{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1 uppercase">Subnav Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Police Recruitment"
                      value={newSubNavLabel}
                      onChange={e => setNewSubNavLabel(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1 uppercase">Short Description</label>
                    <input
                      type="text"
                      placeholder="e.g. State & Central Constables"
                      value={newSubNavDesc}
                      onChange={e => setNewSubNavDesc(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newSubNavLabel.trim()) return;
                      const subId = newSubNavLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const newSub: SubNavItem = {
                        id: subId,
                        label: newSubNavLabel.trim(),
                        filterCategory: selectedParentNavId,
                        filterSubCategory: newSubNavLabel.trim(),
                        description: newSubNavDesc.trim() || undefined
                      };

                      const updated = navItems.map(nav => {
                        if (nav.id === selectedParentNavId) {
                          const existingSubs = nav.subnavs || [];
                          return { ...nav, subnavs: [...existingSubs, newSub] };
                        }
                        return nav;
                      });

                      onUpdateNavItems(updated);
                      setNewSubNavLabel('');
                      setNewSubNavDesc('');
                      alert(`Subnav "${newSub.label}" added to ${selectedParentNavId}!`);
                    }}
                    className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-md shadow-blue-600/20 cursor-pointer h-10 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Subnav</span>
                  </button>
                </div>
              </div>

              {/* Current Nav Items & Subnavs Tree View */}
              <div className="space-y-4">
                {navItems.map(nav => (
                  <div key={nav.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-slate-900">{nav.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                          Route: /{nav.path}
                        </span>
                      </div>
                      <span className="text-xs text-blue-600 font-bold">
                        {nav.subnavs ? `${nav.subnavs.length} Subnav items` : 'Direct Page'}
                      </span>
                    </div>

                    {nav.subnavs && nav.subnavs.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                        {nav.subnavs.map(sub => (
                          <div
                            key={sub.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <strong className="block text-slate-800 font-bold truncate">{sub.label}</strong>
                              {sub.description && (
                                <span className="text-[10px] text-slate-400 block truncate">{sub.description}</span>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                if (confirm(`Remove subnav "${sub.label}"?`)) {
                                  const updated = navItems.map(n => {
                                    if (n.id === nav.id) {
                                      return { ...n, subnavs: (n.subnavs || []).filter(s => s.id !== sub.id) };
                                    }
                                    return n;
                                  });
                                  onUpdateNavItems(updated);
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-1 shrink-0"
                              title="Delete subnav"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JOBS MANAGER PANEL */}
          {activeTab === 'jobs' && (
            <div className="space-y-6 animate-fade-in">
              
              {!editingJob ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Indexed Government Jobs</h3>
                      <p className="text-slate-500 text-xs">Create, edit, and toggle live visibility of sarkari notices.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                      <input 
                        type="text" 
                        placeholder="Search posts by keyword..."
                        value={adminJobSearch}
                        onChange={e => setAdminJobSearch(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 bg-white"
                      />
                      <button 
                        onClick={() => setEditingJob({})}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-blue-600/10 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add New Job Post
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 border-b border-slate-200/80 font-bold uppercase tracking-wider">
                          <th className="p-3.5">Designation / Post</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Vacancies</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {jobs.filter(jb => 
                          jb.title.toLowerCase().includes(adminJobSearch.toLowerCase()) || 
                          jb.organization.toLowerCase().includes(adminJobSearch.toLowerCase()) ||
                          jb.category.toLowerCase().includes(adminJobSearch.toLowerCase())
                        ).map(jb => (
                          <tr key={jb.id} className="hover:bg-slate-50/50">
                            <td className="p-3.5">
                              <strong className="text-slate-900 block font-bold">{jb.title}</strong>
                              <span className="text-[10px] text-slate-400 font-semibold">{jb.organization}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold font-mono text-[9px] uppercase tracking-wider">
                                {jb.category}
                              </span>
                            </td>
                            <td className="p-3.5 font-bold text-slate-700">
                              {jb.totalVacancies > 0 ? jb.totalVacancies.toLocaleString() : 'N/A'}
                            </td>
                            <td className="p-3.5">
                              <button 
                                onClick={() => handleToggleJobStatus(jb.id)}
                                className={`px-2 py-1 rounded-full font-bold uppercase text-[9px] flex items-center gap-1.5 transition ${
                                  jb.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {jb.status === 'Published' ? <Check className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                {jb.status}
                              </button>
                            </td>
                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button 
                                onClick={() => setEditingJob(jb)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                                title="Edit Job"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteJob(jb.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                                title="Delete Job"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Job edit / create form
                <form onSubmit={handleSaveJob} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 space-y-6 shadow-xs animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 uppercase">
                        {editingJob.id ? '✏️ Edit Job Posting Details' : '✨ Index Fresh Job Notice'}
                      </h3>
                      <p className="text-slate-500 text-xs">Fill in accurate recruitment metrics, schedules, fees, FAQs, and custom buttons for candidates.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setEditingJob(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* SECTION 1: BASIC INFORMATION */}
                    <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">📋 Basic Details &amp; Agency Info</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Job Notification Title *</label>
                          <input 
                            type="text" 
                            required
                            value={editingJob.title || ''} 
                            onChange={e => setEditingJob({ ...editingJob, title: e.target.value })}
                            placeholder="e.g. UPSC IAS Civil Services Exam 2026 Notification"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Recruiter Organisation *</label>
                          <input 
                            type="text" 
                            required
                            value={editingJob.organization || ''} 
                            onChange={e => setEditingJob({ ...editingJob, organization: e.target.value })}
                            placeholder="e.g. Union Public Service Commission"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Department / Division</label>
                          <input 
                            type="text" 
                            value={editingJob.department || ''} 
                            onChange={e => setEditingJob({ ...editingJob, department: e.target.value })}
                            placeholder="e.g. Department of Personnel &amp; Training"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Designation / Post Name *</label>
                          <input 
                            type="text" 
                            required
                            value={editingJob.postName || ''} 
                            onChange={e => setEditingJob({ ...editingJob, postName: e.target.value })}
                            placeholder="e.g. IAS, IPS, IFS Officers"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Advertisement Number</label>
                          <input 
                            type="text" 
                            value={editingJob.advertisementNumber || ''} 
                            onChange={e => setEditingJob({ ...editingJob, advertisementNumber: e.target.value })}
                            placeholder="e.g. 05/2026-CSP"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Job Location</label>
                          <input 
                            type="text" 
                            value={editingJob.location || ''} 
                            onChange={e => setEditingJob({ ...editingJob, location: e.target.value })}
                            placeholder="e.g. Anywhere in India"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Job State / Region</label>
                          <input 
                            type="text" 
                            value={editingJob.state || 'All India'} 
                            onChange={e => setEditingJob({ ...editingJob, state: e.target.value })}
                            placeholder="e.g. All India, Uttar Pradesh, Delhi"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Experience Needed</label>
                          <input 
                            type="text" 
                            value={editingJob.experience || 'Fresher'} 
                            onChange={e => setEditingJob({ ...editingJob, experience: e.target.value })}
                            placeholder="e.g. Fresher / No Experience Required"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Sarkari Category *</label>
                          <select 
                            value={editingJob.category || 'Latest Job'} 
                            onChange={e => setEditingJob({ ...editingJob, category: e.target.value as any })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          >
                            <option value="Latest Job">Latest Job</option>
                            <option value="Admit Card">Admit Card</option>
                            <option value="Result">Result</option>
                            <option value="NGO Job">NGO Job</option>
                            <option value="Private Job">Private Job</option>
                            <option value="Walk-in Interview">Walk-in Interview</option>
                            <option value="Government Scheme">Government Scheme</option>
                            <option value="Scholarship">Scholarship</option>
                            <option value="Admission">Admission</option>
                            <option value="Syllabus">Syllabus</option>
                            <option value="Answer Key">Answer Key</option>
                            <option value="Internship">Internship</option>
                            <option value="Fellowship">Fellowship</option>
                            <option value="Outsourcing Job">Outsourcing Job</option>
                            <option value="Indian Govt Ministry">Indian Govt Ministry</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Sector Type</label>
                          <select 
                            value={editingJob.jobType || 'Central'} 
                            onChange={e => setEditingJob({ ...editingJob, jobType: e.target.value as any })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          >
                            <option value="Central">Central Govt</option>
                            <option value="State">State Govt</option>
                            <option value="Private">Private</option>
                            <option value="Contract">Contract</option>
                            <option value="NGO">NGO</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Gig Worker">Gig Worker</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Application Mode</label>
                          <select 
                            value={editingJob.applicationMode || 'Online'} 
                            onChange={e => setEditingJob({ ...editingJob, applicationMode: e.target.value as any })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          >
                            <option value="Online">Online Form</option>
                            <option value="Offline">Offline Form</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>

                        <div className="col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Official Recruitment Website</label>
                          <input 
                            type="url" 
                            value={editingJob.officialWebsite || ''} 
                            onChange={e => setEditingJob({ ...editingJob, officialWebsite: e.target.value })}
                            placeholder="e.g. https://www.upsc.gov.in"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION: YOUTUBE APPLICATION VIDEO TUTORIAL */}
                    <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black text-red-700 uppercase tracking-widest flex items-center gap-1.5">
                          <span>🎬 YouTube How to Apply Video Tutorial</span>
                        </h4>
                        {editingJob.videoTutorialUrl && (
                          <button
                            type="button"
                            onClick={() => setEditingJob({ ...editingJob, videoTutorialUrl: '', videoTutorialTitle: '' })}
                            className="text-red-500 hover:text-red-600 text-[10px] font-bold cursor-pointer"
                          >
                            Remove Video Link
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Paste any YouTube video or shorts link. When users click &quot;▶ How to Apply (Video)&quot;, a dedicated page will open with a large video player, a direct official apply button right below the video, and a slow marquee ticker of other forms!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">YouTube Video URL</label>
                          <input 
                            type="url" 
                            value={editingJob.videoTutorialUrl || ''} 
                            onChange={e => setEditingJob({ ...editingJob, videoTutorialUrl: e.target.value })}
                            placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Video Tutorial Title (Optional)</label>
                          <input 
                            type="text" 
                            value={editingJob.videoTutorialTitle || ''} 
                            onChange={e => setEditingJob({ ...editingJob, videoTutorialTitle: e.target.value })}
                            placeholder="e.g. How to Fill Online Form Step by Step"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                      </div>

                      {editingJob.videoTutorialUrl && (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-red-200 flex items-center gap-3">
                          <span className="text-xs font-bold text-red-600">✓ Video Link Detected:</span>
                          <span className="text-xs font-mono text-slate-600 truncate max-w-sm">{editingJob.videoTutorialUrl}</span>
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: RECRUITER LOGO UPLOADER */}
                    <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">🏢 Recruiter Logo (Image File or URL)</h4>
                        {editingJob.logoUrl && (
                          <button
                            type="button"
                            onClick={() => setEditingJob({ ...editingJob, logoUrl: '' })}
                            className="text-red-500 hover:text-red-600 text-[10px] font-bold cursor-pointer"
                          >
                            Remove Logo Image
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start text-xs">
                        <div className="md:col-span-3 space-y-3">
                          <div>
                            <label className="block text-slate-500 font-semibold mb-1">Paste Logo Image URL</label>
                            <input 
                              type="url" 
                              value={editingJob.logoUrl && !editingJob.logoUrl.startsWith('data:image/') ? editingJob.logoUrl : ''} 
                              onChange={e => setEditingJob({ ...editingJob, logoUrl: e.target.value })}
                              placeholder="Enter image link (e.g., https://yourdomain.com/logos/upsc.png)"
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                            />
                          </div>
                          
                          <div className="flex items-center gap-2 py-0.5">
                            <span className="h-[1px] bg-slate-200 flex-1"></span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Or Upload File Directly</span>
                            <span className="h-[1px] bg-slate-200 flex-1"></span>
                          </div>

                          <div 
                            className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 bg-white text-center cursor-pointer transition"
                            onClick={() => {
                              const fileInput = document.createElement('input');
                              fileInput.type = 'file';
                              fileInput.accept = 'image/*';
                              fileInput.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (re) => {
                                    if (re.target?.result) {
                                      setEditingJob({ ...editingJob, logoUrl: re.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              fileInput.click();
                            }}
                          >
                            <span className="text-slate-500 font-bold text-[11px] block">📂 Click to choose/upload a Logo image file</span>
                            <span className="text-slate-400 text-[9px] block">Supports PNG, JPG, JPEG, WEBP, SVG</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center border border-slate-200 rounded-xl bg-white p-2 h-36 w-full shadow-xs">
                          {editingJob.logoUrl ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
                              <img 
                                src={editingJob.logoUrl} 
                                alt="Logo Preview" 
                                className="max-h-24 max-w-full object-contain rounded"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[8px] text-green-600 font-mono font-bold uppercase tracking-wide">✓ Image Selected</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold italic text-center leading-tight">No Logo Selected<br/>(Defaults to category icon)</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: RECRUITMENT METRICS & DATES */}
                    <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">⚡ Recruitment Metrics &amp; Dates</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Total Vacancies</label>
                          <input 
                            type="number" 
                            value={editingJob.totalVacancies || ''} 
                            onChange={e => setEditingJob({ ...editingJob, totalVacancies: Number(e.target.value) })}
                            placeholder="e.g. 1056"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Salary / Pay Scale</label>
                          <input 
                            type="text" 
                            value={editingJob.salary || ''} 
                            onChange={e => setEditingJob({ ...editingJob, salary: e.target.value })}
                            placeholder="e.g. Pay level 10, ₹56,100"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Age Criteria</label>
                          <input 
                            type="text" 
                            value={editingJob.ageLimit || ''} 
                            onChange={e => setEditingJob({ ...editingJob, ageLimit: e.target.value })}
                            placeholder="e.g. 21 to 32 Years as on 01/08/2026"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Applications Opening Date</label>
                          <input 
                            type="date" 
                            value={editingJob.applicationStartDate || ''} 
                            onChange={e => setEditingJob({ ...editingJob, applicationStartDate: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Application Closing Date</label>
                          <input 
                            type="date" 
                            value={editingJob.applicationEndDate || ''} 
                            onChange={e => setEditingJob({ ...editingJob, applicationEndDate: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Exam Date (Optional)</label>
                          <input 
                            type="text" 
                            value={editingJob.examDate || ''} 
                            onChange={e => setEditingJob({ ...editingJob, examDate: e.target.value })}
                            placeholder="e.g. September 2026"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Admit Card Date (Optional)</label>
                          <input 
                            type="text" 
                            value={editingJob.admitCardDate || ''} 
                            onChange={e => setEditingJob({ ...editingJob, admitCardDate: e.target.value })}
                            placeholder="e.g. August 2026"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Result Date (Optional)</label>
                          <input 
                            type="text" 
                            value={editingJob.resultDate || ''} 
                            onChange={e => setEditingJob({ ...editingJob, resultDate: e.target.value })}
                            placeholder="e.g. October 2026"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Job Visibility status</label>
                          <select 
                            value={editingJob.status || 'Published'} 
                            onChange={e => setEditingJob({ ...editingJob, status: e.target.value as any })}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold text-blue-600"
                          >
                            <option value="Published">🟢 Published (Live)</option>
                            <option value="Draft">🟡 Draft (Invisible)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: DETAILED PARAGRAPHS */}
                    <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">📄 Recruitment Description &amp; Detailed Guidelines</h4>
                      <div className="grid grid-cols-1 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Short Description (Summary Card) *</label>
                          <textarea 
                            rows={2}
                            required
                            value={editingJob.shortDescription || ''} 
                            onChange={e => setEditingJob({ ...editingJob, shortDescription: e.target.value })}
                            placeholder="A concise, high-impact summary displayed on list pages and cards."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Prerequisite Qualifications (Summary Statement)</label>
                          <input 
                            type="text" 
                            value={editingJob.qualification || ''} 
                            onChange={e => setEditingJob({ ...editingJob, qualification: e.target.value })}
                            placeholder="e.g. Bachelor Degree in any Stream from a Recognized University"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Selection Pipeline Process (Summary Statement)</label>
                          <input 
                            type="text" 
                            value={editingJob.selectionProcess || ''} 
                            onChange={e => setEditingJob({ ...editingJob, selectionProcess: e.target.value })}
                            placeholder="e.g. Preliminary Exam, Main Exam, and Interview / Physical Standard Test"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Detailed Eligibility criteria Statement (Optional box)</label>
                          <textarea 
                            rows={3}
                            value={editingJob.eligibility || ''} 
                            onChange={e => setEditingJob({ ...editingJob, eligibility: e.target.value })}
                            placeholder="Describe gender conditions, reservation, specific qualifications or visual requirements here..."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Detailed Recruitment Description &amp; Guidelines *</label>
                          <textarea 
                            rows={6}
                            required
                            value={editingJob.detailedDescription || ''} 
                            onChange={e => setEditingJob({ ...editingJob, detailedDescription: e.target.value })}
                            placeholder="Fully detailed official guidelines regarding posts, vacancies, exam patterns, etc."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">How to Apply Step-by-Step guidelines</label>
                          <textarea 
                            rows={5}
                            value={editingJob.howToApply || ''} 
                            onChange={e => setEditingJob({ ...editingJob, howToApply: e.target.value })}
                            placeholder="Provide clear step-by-step guidance for candidates to submit applications online safely."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Important instructions / remarks</label>
                          <textarea 
                            rows={3}
                            value={editingJob.importantInstructions || ''} 
                            onChange={e => setEditingJob({ ...editingJob, importantInstructions: e.target.value })}
                            placeholder="Important advice, alert deadlines, warning about documents or payment modes..."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4.5: POST SECTION HEADINGS & TITLES (100% ADMIN CONTROLLED) */}
                    <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">
                          🏷️ Custom Section Headings &amp; Titles (Admin Controlled)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Customize and rename any section heading in this post. Leave blank to use standard default titles.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">1. Overview Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.overviewHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, overviewHeading: e.target.value })}
                            placeholder="Default: Overview &amp; Summary"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">2. Dates Schedule Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.datesHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, datesHeading: e.target.value })}
                            placeholder="Default: Important Dates Schedule"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">3. Application Fees Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.feesHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, feesHeading: e.target.value })}
                            placeholder="Default: Application Fee Structure"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">4. Vacancy Table Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.vacancyHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, vacancyHeading: e.target.value })}
                            placeholder="Default: Post-wise Vacancy Distribution"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">5. Selection &amp; Eligibility Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.eligibilityHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, eligibilityHeading: e.target.value })}
                            placeholder="Default: Selection Procedure &amp; Eligibility"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">6. Documents Checklist Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.documentsHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, documentsHeading: e.target.value })}
                            placeholder="Default: Required Documents Checklist"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">7. How to Apply Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.howToApplyHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, howToApplyHeading: e.target.value })}
                            placeholder="Default: How to Apply Step-by-Step"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold mb-1 uppercase text-[10px]">8. FAQs Heading</label>
                          <input 
                            type="text" 
                            value={editingJob.faqsHeading || ''} 
                            onChange={e => setEditingJob({ ...editingJob, faqsHeading: e.target.value })}
                            placeholder="Default: Frequently Asked Questions"
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: INTERACTIVE SUB-ELEMENTS LISTS MANAGERS */}
                    <div className="border-t border-slate-100 pt-6 space-y-6">
                      
                      {/* 1. DYNAMIC QUICK ACTION LINKS (BUTTONS) */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">🔗 Configure Dynamic Quick Action Links (Buttons)</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">Customize interactive action keys such as "Apply Online", "Download Brochure", "Selection List" for the candidate dashboard.</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5 bg-white p-4 rounded-xl border border-slate-200/60">
                          {(editingJob.buttons || []).length > 0 ? (
                            (editingJob.buttons || []).map((btn, idx) => (
                              <div key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-2 font-bold shadow-xs">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                  btn.variant === 'primary' ? 'bg-blue-600' :
                                  btn.variant === 'success' ? 'bg-green-600' :
                                  btn.variant === 'danger' ? 'bg-red-600' :
                                  btn.variant === 'accent' ? 'bg-amber-600' : 'bg-slate-500'
                                }`}></span>
                                <span className="text-slate-800">{btn.label}</span>
                                <span className="text-[10px] text-slate-400 font-mono font-medium max-w-[120px] truncate" title={btn.url}>({btn.url})</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const filtered = (editingJob.buttons || []).filter((_, bIdx) => bIdx !== idx);
                                    setEditingJob({ ...editingJob, buttons: filtered });
                                  }}
                                  className="text-red-500 hover:text-red-600 font-black text-xs hover:bg-red-50 p-1 rounded cursor-pointer"
                                  title="Remove button"
                                >
                                  ✕
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400 italic">No custom buttons added yet. Candidates will only see standard eligibility calculator.</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-white p-4 rounded-xl border border-slate-200/60 text-xs">
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Button Label</label>
                            <input
                              type="text"
                              value={newButtonLabel}
                              onChange={e => setNewButtonLabel(e.target.value)}
                              placeholder="e.g. Apply Online"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Button Redirect URL</label>
                            <input
                              type="url"
                              value={newButtonUrl}
                              onChange={e => setNewButtonUrl(e.target.value)}
                              placeholder="e.g. https://upsconline.nic.in"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-mono"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Theme Color</label>
                            <select
                              value={newButtonVariant}
                              onChange={e => setNewButtonVariant(e.target.value as any)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                            >
                              <option value="primary">Primary (Blue)</option>
                              <option value="success">Success (Green)</option>
                              <option value="danger">Danger (Red)</option>
                              <option value="accent">Accent (Amber)</option>
                              <option value="outline">Outline (Grey)</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newButtonLabel.trim() || !newButtonUrl.trim()) {
                                  alert('Please fill out both button label and redirect URL!');
                                  return;
                                }
                                const currentButtons = editingJob.buttons || [];
                                setEditingJob({
                                  ...editingJob,
                                  buttons: [...currentButtons, { label: newButtonLabel.trim(), url: newButtonUrl.trim(), variant: newButtonVariant }]
                                });
                                setNewButtonLabel('');
                                setNewButtonUrl('');
                                setNewButtonVariant('primary');
                              }}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition text-xs shadow-md cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Button
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 2. APPLICATION PROCESSING FEES */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">💳 Application Processing Fees</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">Define category-wise payments candidates must settle to apply.</p>
                        </div>

                        <div className="flex flex-wrap gap-2.5 bg-white p-4 rounded-xl border border-slate-200/60">
                          {(editingJob.applicationFees || []).length > 0 ? (
                            (editingJob.applicationFees || []).map((fee, idx) => (
                              <div key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-2 font-bold shadow-xs">
                                <span className="text-slate-600">{fee.category}:</span>
                                <strong className="text-blue-700 font-black">{fee.fee}</strong>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const filtered = (editingJob.applicationFees || []).filter((_, fIdx) => fIdx !== idx);
                                    setEditingJob({ ...editingJob, applicationFees: filtered });
                                  }}
                                  className="text-red-500 hover:text-red-600 font-black text-xs hover:bg-red-50 p-1 rounded cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400 italic">No category fee details configured yet.</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-white p-4 rounded-xl border border-slate-200/60 text-xs">
                          <div className="md:col-span-5">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Candidate Category</label>
                            <input
                              type="text"
                              value={newFeeCategory}
                              onChange={e => setNewFeeCategory(e.target.value)}
                              placeholder="e.g. General / OBC / EWS"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="md:col-span-5">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Fee Amount</label>
                            <input
                              type="text"
                              value={newFeeAmount}
                              onChange={e => setNewFeeAmount(e.target.value)}
                              placeholder="e.g. ₹100 or Free / Exempted"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newFeeCategory.trim() || !newFeeAmount.trim()) {
                                  alert('Please fill out both category and fee amount!');
                                  return;
                                }
                                const currentFees = editingJob.applicationFees || [];
                                setEditingJob({
                                  ...editingJob,
                                  applicationFees: [...currentFees, { category: newFeeCategory.trim(), fee: newFeeAmount.trim() }]
                                });
                                setNewFeeCategory('');
                                setNewFeeAmount('');
                              }}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition text-xs shadow-md cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Fee
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 3. VACANCY BREAKDOWN DETAILS TABLE */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">📊 Vacancy Breakdown details Table</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">Map multiple recruitment designations, specific seat counts, and custom prerequisites in a visual grid.</p>
                        </div>

                        {(editingJob.vacancyDetailsTable || []).length > 0 ? (
                          <div className="overflow-hidden border border-slate-200 rounded-xl bg-white">
                            <table className="w-full text-left border-collapse text-[11px]">
                              <thead>
                                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200/80 font-bold uppercase tracking-wider">
                                  <th className="p-2.5">Post / Designation Name</th>
                                  <th className="p-2.5">Total Seats</th>
                                  <th className="p-2.5">Post Specific Eligibility</th>
                                  <th className="p-2.5 text-right">Delete</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {(editingJob.vacancyDetailsTable || []).map((vac, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50 text-slate-700 font-semibold">
                                    <td className="p-2.5 font-bold text-slate-900">{vac.post}</td>
                                    <td className="p-2.5 text-blue-600 font-black">{vac.total > 0 ? vac.total.toLocaleString() : 'N/A'}</td>
                                    <td className="p-2.5 leading-snug">{vac.eligibility}</td>
                                    <td className="p-2.5 text-right">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const filtered = (editingJob.vacancyDetailsTable || []).filter((_, vIdx) => vIdx !== idx);
                                          setEditingJob({ ...editingJob, vacancyDetailsTable: filtered });
                                        }}
                                        className="text-red-500 hover:text-red-600 font-black text-xs hover:bg-red-50 p-1 rounded cursor-pointer"
                                      >
                                        ✕
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic bg-white p-4 rounded-xl border border-slate-200/50">No specific breakdown vacancies mapped yet. Will display overall vacancies count.</p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-white p-4 rounded-xl border border-slate-200/60 text-xs">
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Post Name / Designation</label>
                            <input
                              type="text"
                              value={newVacancyPost}
                              onChange={e => setNewVacancyPost(e.target.value)}
                              placeholder="e.g. Assistant Commandant (Executive)"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-bold"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Seats Count</label>
                            <input
                              type="number"
                              value={newVacancyTotal}
                              onChange={e => setNewVacancyTotal(e.target.value)}
                              placeholder="e.g. 75"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                            />
                          </div>
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Seat Eligibility Rules</label>
                            <input
                              type="text"
                              value={newVacancyEligibility}
                              onChange={e => setNewVacancyEligibility(e.target.value)}
                              placeholder="e.g. Bachelor Degree in Law / LLB with 50% Marks"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newVacancyPost.trim()) {
                                  alert('Please specify the designation post name!');
                                  return;
                                }
                                const currentVacancies = editingJob.vacancyDetailsTable || [];
                                setEditingJob({
                                  ...editingJob,
                                  vacancyDetailsTable: [...currentVacancies, {
                                    post: newVacancyPost.trim(),
                                    total: Number(newVacancyTotal) || 0,
                                    eligibility: newVacancyEligibility.trim() || 'Refer guidelines below'
                                  }]
                                });
                                setNewVacancyPost('');
                                setNewVacancyTotal('');
                                setNewVacancyEligibility('');
                              }}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition text-xs shadow-md cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Row
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 4. REQUIRED DOCUMENT UPLOAD CHECKLIST */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">📁 Required Document Upload Checklist</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">List crucial scanned certificates and credentials candidates must assemble prior to filling the form.</p>
                        </div>

                        <div className="flex flex-wrap gap-2 bg-white p-4 rounded-xl border border-slate-200/60">
                          {(editingJob.documentsRequired || []).length > 0 ? (
                            (editingJob.documentsRequired || []).map((doc, idx) => (
                              <div key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-2 font-bold shadow-xs">
                                <span className="text-slate-700 font-medium">{doc}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const filtered = (editingJob.documentsRequired || []).filter((_, dIdx) => dIdx !== idx);
                                    setEditingJob({ ...editingJob, documentsRequired: filtered });
                                  }}
                                  className="text-red-500 hover:text-red-600 font-black text-xs hover:bg-red-50 p-0.5 rounded cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400 italic">No required certificates listed yet.</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-white p-4 rounded-xl border border-slate-200/60 text-xs">
                          <div className="md:col-span-10">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Document Item / Requirement Description</label>
                            <input
                              type="text"
                              value={newRequiredDoc}
                              onChange={e => setNewRequiredDoc(e.target.value)}
                              placeholder="e.g. Matriculation 10th Certificate for Age Proof (Scan PDF up to 200KB)"
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (!newRequiredDoc.trim()) return;
                                  const currentDocs = editingJob.documentsRequired || [];
                                  setEditingJob({
                                    ...editingJob,
                                    documentsRequired: [...currentDocs, newRequiredDoc.trim()]
                                  });
                                  setNewRequiredDoc('');
                                }
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newRequiredDoc.trim()) {
                                  alert('Please define a document requirement first!');
                                  return;
                                }
                                const currentDocs = editingJob.documentsRequired || [];
                                setEditingJob({
                                  ...editingJob,
                                  documentsRequired: [...currentDocs, newRequiredDoc.trim()]
                                });
                                setNewRequiredDoc('');
                              }}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition text-xs shadow-md cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Doc
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 5. FREQUENTLY ASKED QUESTIONS */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">❓ Frequently Asked Questions (FAQ)</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">Answer candidate queries regarding age criteria, syllabus, dates or criteria changes directly.</p>
                        </div>

                        {(editingJob.faqs || []).length > 0 ? (
                          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/60 max-h-80 overflow-y-auto">
                            {(editingJob.faqs || []).map((faq, idx) => (
                              <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-150 text-xs space-y-1 relative pr-8 shadow-xs">
                                <strong className="text-slate-900 block font-black">Q: {faq.question}</strong>
                                <p className="text-slate-600 font-semibold leading-relaxed">A: {faq.answer}</p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const filtered = (editingJob.faqs || []).filter((_, fIdx) => fIdx !== idx);
                                    setEditingJob({ ...editingJob, faqs: filtered });
                                  }}
                                  className="absolute top-3 right-3 text-red-500 hover:text-red-600 font-bold text-xs p-0.5 rounded cursor-pointer"
                                  title="Delete FAQ"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic bg-white p-4 rounded-xl border border-slate-200/60">No FAQ entries registered yet.</p>
                        )}

                        <div className="bg-white p-4 rounded-xl border border-slate-200/60 space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Frequently Asked Question</label>
                              <input
                                type="text"
                                value={newFaqQuestion}
                                onChange={e => setNewFaqQuestion(e.target.value)}
                                placeholder="e.g., Can final year students apply online?"
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-bold focus:bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-semibold">Answer to the Question</label>
                              <textarea
                                rows={2}
                                value={newFaqAnswer}
                                onChange={e => setNewFaqAnswer(e.target.value)}
                                placeholder="e.g., Yes, final year students are fully eligible to apply provided they obtain degree prior to document verification."
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-semibold focus:bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
                                  alert('Both FAQ Question & Answer are mandatory!');
                                  return;
                                }
                                const currentFaqs = editingJob.faqs || [];
                                setEditingJob({
                                  ...editingJob,
                                  faqs: [...currentFaqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }]
                                });
                                setNewFaqQuestion('');
                                setNewFaqAnswer('');
                              }}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition text-xs shadow-md cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add FAQ Item
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* SECTION 6: SEARCH ENGINE OPTIMIZATION */}
                    <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">🔍 Search Engine Optimization (SEO) &amp; Meta-Tags</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">Optimize indexing and how this recruitment displays on Google Search results.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const genTitle = `${editingJob.title || 'Sarkari Job'} 2026 - Apply Online for ${editingJob.postName || 'Vacancy'} at ${editingJob.organization || 'Official Portal'}`;
                            const genKeywords = `${editingJob.postName || 'job'}, ${editingJob.organization || 'government'}, apply online, sarkari job, sarkari result, ${editingJob.category || 'jobs'}, 2026, details, vacancies, eligibility`;
                            const genDesc = editingJob.shortDescription || `Latest recruitment announcement for ${editingJob.title || 'multiple posts'} by ${editingJob.organization || 'authority'}. Read full eligibility criteria, age limits, and how to apply online.`;
                            setEditingJob({
                              ...editingJob,
                              seoTitle: genTitle,
                              seoKeywords: genKeywords,
                              seoDescription: genDesc
                            });
                          }}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold border border-blue-100 cursor-pointer transition flex items-center gap-1 shrink-0"
                        >
                          <span>✨ Auto-Generate Meta Tags</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">SEO Title Tag</label>
                          <input 
                            type="text" 
                            value={editingJob.seoTitle || ''} 
                            onChange={e => setEditingJob({ ...editingJob, seoTitle: e.target.value })}
                            placeholder="Page title displayed in search tabs"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">SEO Meta Keywords</label>
                          <input 
                            type="text" 
                            value={editingJob.seoKeywords || ''} 
                            onChange={e => setEditingJob({ ...editingJob, seoKeywords: e.target.value })}
                            placeholder="sarkari exam, bank recruitment, etc."
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">SEO Meta Description</label>
                          <textarea 
                            rows={2}
                            value={editingJob.seoDescription || ''} 
                            onChange={e => setEditingJob({ ...editingJob, seoDescription: e.target.value })}
                            placeholder="A brief snippet of the page summary for search engine snippets"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                    <button 
                      type="button" 
                      onClick={() => setEditingJob(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Discard &amp; Back
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-blue-600/10 cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> Save Job Details &amp; Broadcast Live
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* BLOGS PANEL */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-fade-in">
              {!editingBlog ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Career & Exam Prep Blogs</h3>
                      <p className="text-slate-500 text-xs">Write guides, book list advices, and preparation strategies.</p>
                    </div>
                    <button 
                      onClick={() => setEditingBlog({})}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-md shadow-blue-600/10 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Draft Career Article
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map(bg => (
                      <div key={bg.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between h-44">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                              {bg.category}
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium font-mono">{bg.publishDate}</span>
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-800 line-clamp-2 mt-2 leading-snug">{bg.title}</h4>
                          <p className="text-slate-500 text-xs line-clamp-1 mt-1">Written by: {bg.author}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                          <button
                            onClick={() => handleToggleBlogStatus(bg.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase transition ${
                              bg.isTrending ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            ⚡ {bg.isTrending ? 'Trending' : 'Standard'}
                          </button>
                          <div className="space-x-1 whitespace-nowrap">
                            <button 
                              onClick={() => setEditingBlog(bg)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition text-xs font-bold inline-flex items-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteBlog(bg.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveBlog} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 space-y-6 shadow-xs animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <h3 className="text-base font-black text-slate-900 uppercase">
                      {editingBlog.id ? 'Edit Article Details' : 'Write Career Guide Article'}
                    </h3>
                    <button 
                      type="button" 
                      onClick={() => setEditingBlog(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase">Article Title *</label>
                      <input 
                        type="text" 
                        required
                        value={editingBlog.title || ''} 
                        onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        placeholder="e.g. Top 5 Reference Books for UPSC Prelims 2026 Preparation"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1.5 uppercase">Author Name</label>
                        <input 
                          type="text" 
                          value={editingBlog.author || 'Sarkari Global Team'} 
                          onChange={e => setEditingBlog({ ...editingBlog, author: e.target.value })}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1.5 uppercase">Domain Category</label>
                        <input 
                          type="text" 
                          value={editingBlog.category || 'Career Guidance'} 
                          onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          placeholder="e.g. Exam Prep, Career Advice"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase">SEO Description (Summary)</label>
                      <input 
                        type="text" 
                        value={editingBlog.seoDescription || ''} 
                        onChange={e => setEditingBlog({ ...editingBlog, seoDescription: e.target.value })}
                        placeholder="Short summary displayed on cards"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>

                    {/* BLOG FEATURED COVER IMAGE UPLOADER */}
                    <div className="bg-slate-50/50 p-4.5 rounded-2xl border border-slate-150 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <label className="block text-slate-600 font-semibold uppercase tracking-wide">Featured Cover Image (Upload or Link)</label>
                        {editingBlog.featuredImage && (
                          <button
                            type="button"
                            onClick={() => setEditingBlog({ ...editingBlog, featuredImage: '' })}
                            className="text-red-500 hover:text-red-600 text-[10px] font-bold cursor-pointer"
                          >
                            Remove Cover Image
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start text-xs">
                        <div className="md:col-span-3 space-y-2">
                          <input 
                            type="url" 
                            value={editingBlog.featuredImage && !editingBlog.featuredImage.startsWith('data:image/') ? editingBlog.featuredImage : ''} 
                            onChange={e => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                            placeholder="Enter cover image URL (e.g. https://images.unsplash.com/...)"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-mono"
                          />
                          <div className="flex items-center gap-2">
                            <span className="h-[1px] bg-slate-200 flex-1"></span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Or Upload Cover File</span>
                            <span className="h-[1px] bg-slate-200 flex-1"></span>
                          </div>
                          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-3 bg-white text-center cursor-pointer transition"
                            onClick={() => {
                              const fileInput = document.createElement('input');
                              fileInput.type = 'file';
                              fileInput.accept = 'image/*';
                              fileInput.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (re) => {
                                    if (re.target?.result) {
                                      setEditingBlog({ ...editingBlog, featuredImage: re.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              fileInput.click();
                            }}
                          >
                            <span className="text-slate-500 font-bold text-[11px] block">📂 Choose cover image file or drag here</span>
                            <span className="text-slate-400 text-[9px] block">PNG, JPG, WEBP, SVG</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center border border-slate-200 rounded-xl bg-white p-2 h-28 w-full shadow-xs">
                          {editingBlog.featuredImage ? (
                            <img 
                              src={editingBlog.featuredImage} 
                              alt="Cover Preview" 
                              className="max-h-full max-w-full object-contain rounded-lg"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold italic text-center">No Cover Selected</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* BLOG VIDEO TUTORIAL & DIRECT APPLY URL */}
                    <div className="bg-red-50/50 p-4.5 rounded-2xl border border-red-100 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <label className="block text-red-700 font-bold uppercase tracking-wide flex items-center gap-1.5">
                          <span>🎬 YouTube Video Guidance (For More Information Watch Video)</span>
                        </label>
                        {editingBlog.videoTutorialUrl && (
                          <button
                            type="button"
                            onClick={() => setEditingBlog({ ...editingBlog, videoTutorialUrl: '', videoTutorialTitle: '' })}
                            className="text-red-500 hover:text-red-600 text-[10px] font-bold cursor-pointer"
                          >
                            Remove Video
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Paste any YouTube video link for this article (e.g. subject tutorial, exam strategy, or fellowship application guide). When candidates click &quot;For More Information Watch Video&quot;, this video will open in a large YouTube frame with official apply links and related guides!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">YouTube Video Link</label>
                          <input 
                            type="url" 
                            value={editingBlog.videoTutorialUrl || ''} 
                            onChange={e => setEditingBlog({ ...editingBlog, videoTutorialUrl: e.target.value })}
                            placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Direct Application Portal Link</label>
                          <input 
                            type="url" 
                            value={editingBlog.applyUrl || ''} 
                            onChange={e => setEditingBlog({ ...editingBlog, applyUrl: e.target.value })}
                            placeholder="e.g. Official apply portal URL for fellowship/scheme"
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-mono text-xs"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-slate-600 font-semibold mb-1 uppercase">Video Guide Title (Optional)</label>
                          <input 
                            type="text" 
                            value={editingBlog.videoTutorialTitle || ''} 
                            onChange={e => setEditingBlog({ ...editingBlog, videoTutorialTitle: e.target.value })}
                            placeholder="e.g. Fellowship Application Walkthrough & Essay Writing Tips"
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs"
                          />
                        </div>
                      </div>
                      {editingBlog.videoTutorialUrl && (
                        <div className="mt-2 p-2.5 bg-white rounded-xl border border-red-200 flex items-center gap-2">
                          <span className="text-[11px] font-bold text-red-600">✓ Video Link Detected:</span>
                          <span className="text-[11px] font-mono text-slate-600 truncate max-w-sm">{editingBlog.videoTutorialUrl}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase">Article Core Body Content (Markdown Supported) *</label>
                      <textarea 
                        required
                        rows={10}
                        value={editingBlog.content || ''} 
                        onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-slate-50 pt-5">
                    <button 
                      type="button" 
                      onClick={() => setEditingBlog(null)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      Discard
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-blue-600/10"
                    >
                      <Save className="w-4 h-4" /> Save Article Post
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ANNOUNCEMENTS & TICKERS PANEL */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase">Publish Live Announcement</h3>
                <form onSubmit={handleAddTicker} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1.5">Announcement Ticker Text</label>
                    <input 
                      type="text" 
                      required
                      value={newTickerText}
                      onChange={e => setNewTickerText(e.target.value)}
                      placeholder="e.g. SSC CGL Tier 1 Exam Dates Announced! Download Call Letters now."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Link to an Indexed Job / Post (Recommended)</label>
                      <select
                        value={selectedJobToLink}
                        onChange={e => {
                          setSelectedJobToLink(e.target.value);
                          if (e.target.value) {
                            setNewTickerLink('');
                          }
                        }}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      >
                        <option value="">-- No linked job (Use custom link instead) --</option>
                        {jobs.map(j => (
                          <option key={j.id} value={j.id}>{j.title} ({j.organization})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Custom Redirection URL / External Link (Alternative)</label>
                      <input 
                        type="text"
                        value={newTickerLink}
                        onChange={e => {
                          setNewTickerLink(e.target.value);
                          if (e.target.value) {
                            setSelectedJobToLink('');
                          }
                        }}
                        disabled={!!selectedJobToLink}
                        placeholder="e.g. https://cvloom.online/special-page or leave empty"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="is-ticker-chk"
                      checked={tickerIsActive}
                      onChange={e => setTickerIsActive(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="is-ticker-chk" className="font-semibold text-slate-700">Display this announcement in the top scrolling ticker bar</label>
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-600/10 transition"
                  >
                    Broadcast Announcement
                  </button>
                </form>
              </div>

              {/* Announcements feed list */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase">Active Alerts Timeline</h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {notifications.map(not => (
                    <div key={not.id} className="py-4 flex justify-between items-start gap-4">
                      <div>
                        <p className="font-bold text-slate-800 leading-normal">{not.message}</p>
                        <div className="flex gap-4 text-[9px] text-slate-400 mt-1 font-mono">
                          <span>📅 {new Date(not.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className={not.isTicker ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                            {not.isTicker ? '✓ Scroller Ticker Active' : 'Bell Drops Only'}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteNotification(not.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition shrink-0"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GLOBAL SETTINGS PANEL */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase">📢 Configure Global Social Media &amp; Alert Channels</h3>
                  <p className="text-xs text-slate-500 mt-1">These social channel invites show up across the site, in job details, and in footer communities so candidates can join your alerts network.</p>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const tg = (form.elements.namedItem('social_telegram') as HTMLInputElement).value;
                    const wa = (form.elements.namedItem('social_whatsapp') as HTMLInputElement).value;
                    const yt = (form.elements.namedItem('social_youtube') as HTMLInputElement).value;
                    const fb = (form.elements.namedItem('social_facebook') as HTMLInputElement).value;
                    const insta = (form.elements.namedItem('social_instagram') as HTMLInputElement).value;
                    const tw = (form.elements.namedItem('social_twitter') as HTMLInputElement).value;
                    
                    if (onUpdateSettings) {
                      onUpdateSettings({
                        ...globalSettings,
                        social_telegram: tg,
                        social_whatsapp: wa,
                        social_youtube: yt,
                        social_facebook: fb,
                        social_instagram: insta,
                        social_twitter: tw
                      });
                      alert('Success: Social channel communities successfully updated & synced live!');
                    }
                  }} 
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">WhatsApp Alerts Channel/Group URL</label>
                      <input 
                        type="url" 
                        name="social_whatsapp"
                        defaultValue={globalSettings?.social_whatsapp || ''}
                        placeholder="e.g. https://chat.whatsapp.com/yourgroup"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Telegram Alert Channel URL</label>
                      <input 
                        type="url" 
                        name="social_telegram"
                        defaultValue={globalSettings?.social_telegram || ''}
                        placeholder="e.g. https://t.me/yourchannel"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">YouTube Tutorial Channel URL</label>
                      <input 
                        type="url" 
                        name="social_youtube"
                        defaultValue={globalSettings?.social_youtube || ''}
                        placeholder="e.g. https://youtube.com/@yourchannel"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Instagram Profile / Channel URL</label>
                      <input 
                        type="url" 
                        name="social_instagram"
                        defaultValue={globalSettings?.social_instagram || ''}
                        placeholder="e.g. https://instagram.com/cvloom_official"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Twitter / X Profile URL</label>
                      <input 
                        type="url" 
                        name="social_twitter"
                        defaultValue={globalSettings?.social_twitter || ''}
                        placeholder="e.g. https://x.com/cvloom"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5">Facebook Page URL</label>
                      <input 
                        type="url" 
                        name="social_facebook"
                        defaultValue={globalSettings?.social_facebook || ''}
                        placeholder="e.g. https://facebook.com/yourpage"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-600/10 transition cursor-pointer"
                  >
                    Save &amp; Broadcast Social Channels
                  </button>
                </form>
              </div>

              {/* UNIVERSAL SHAREABLE LINKS & URLS GENERATOR */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs">URL</span>
                    <h3 className="text-sm font-black text-slate-900 uppercase">🔗 Universal Shareable Links Generator</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Generate and copy direct shareable links to any individual job post, tool, or category for WhatsApp broadcast, Telegram, or social media sharing.
                  </p>
                </div>

                {/* Direct Job Link Picker */}
                <div className="space-y-3">
                  <label className="block text-slate-700 font-bold uppercase text-xs">1. Quick Share Any Job Post:</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={shareLinkJobSearch}
                      onChange={e => setShareLinkJobSearch(e.target.value)}
                      placeholder="Search job by title or organization to generate share link..."
                      className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50/50">
                    {jobs.filter(j => 
                      !shareLinkJobSearch || 
                      j.title.toLowerCase().includes(shareLinkJobSearch.toLowerCase()) ||
                      j.organization.toLowerCase().includes(shareLinkJobSearch.toLowerCase())
                    ).slice(0, 6).map(j => {
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://cvloom.online';
                      const jobUrl = `${origin}${window.location.pathname}?jobId=${j.id}`;
                      const isCopied = copiedShareLink === j.id;

                      return (
                        <div key={j.id} className="p-3 flex items-center justify-between gap-3 hover:bg-white transition text-xs">
                          <div className="min-w-0">
                            <strong className="block text-slate-800 truncate">{j.title}</strong>
                            <span className="text-[10px] text-slate-400 font-mono">{jobUrl}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(jobUrl);
                                setCopiedShareLink(j.id);
                                setTimeout(() => setCopiedShareLink(null), 2000);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition cursor-pointer flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const text = encodeURIComponent(
                                  `🏛️ *CVLOOM OFFICIAL RECRUITMENT ALERT*\n` +
                                  `📌 *${j.title}*\n` +
                                  `🏢 *Org:* ${j.organization}\n` +
                                  `⏳ *Last Date:* ${j.applicationEndDate}\n\n` +
                                  `👉 *Official Link:* ${jobUrl}\n\n` +
                                  `🌐 *Portal:* https://cvloom.online/jobs`
                                );
                                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                              }}
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
                              title="Share on WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Tools & Category Links */}
                <div className="pt-2 space-y-3">
                  <label className="block text-slate-700 font-bold uppercase text-xs">2. Direct Tools &amp; Key Portal Links:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {[
                      { name: 'All Free Tools Directory', path: '?view=tools' },
                      { name: 'Image Resizer & Compressor', path: '?tool=image-resizer' },
                      { name: 'PDF to JPG Converter', path: '?tool=pdf-to-jpg' },
                      { name: 'Age Calculator & Eligibility', path: '?tool=age-calculator' },
                      { name: 'Free CV & Resume Builder', path: '?tool=resume-builder' },
                      { name: 'QR Code & Barcode Gen', path: '?tool=qr-generator' },
                      { name: 'GST & EMI Calculator', path: '?tool=gst-emi-calculator' },
                      { name: 'Govt Samvida Jobs', path: '?category=govt-jobs&subnav=govt-samvida' },
                      { name: 'Scholarships Portal', path: '?category=scholarships' },
                      { name: 'NGO & Impact Careers', path: '?category=ngo-jobs' },
                      { name: 'Fellowships Portal', path: '?category=fellowships' },
                      { name: 'Internships Portal', path: '?category=internship' }
                    ].map(item => {
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://cvloom.online';
                      const linkUrl = `${origin}${window.location.pathname}${item.path}`;
                      const isCopied = copiedShareLink === item.path;

                      return (
                        <div key={item.path} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-bold text-stone-800 block truncate">{item.name}</span>
                            <span className="text-[10px] text-stone-400 font-mono block truncate">{item.path}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(linkUrl);
                              setCopiedShareLink(item.path);
                              setTimeout(() => setCopiedShareLink(null), 2000);
                            }}
                            className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-bold shrink-0 cursor-pointer"
                          >
                            {isCopied ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Password update also accessible here for ease of access */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase">🔒 Update Admin Access Password</h3>
                  <p className="text-xs text-slate-500 mt-1">This updates the credentials required to log into this administrative portal.</p>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const currentPwd = (form.elements.namedItem('currentPasswordSettings') as HTMLInputElement).value;
                  const newPwd = (form.elements.namedItem('newPasswordSettings') as HTMLInputElement).value;
                  const confirmPwd = (form.elements.namedItem('confirmPasswordSettings') as HTMLInputElement).value;
                  
                  const savedPwd = localStorage.getItem('sarkari_global_admin_password') || 'sarkari2026';
                  
                  if (currentPwd !== savedPwd) {
                    alert('Error: Current password is incorrect!');
                    return;
                  }
                  if (newPwd.length < 6) {
                    alert('Error: New password must be at least 6 characters long!');
                    return;
                  }
                  if (newPwd !== confirmPwd) {
                    alert('Error: New passwords do not match!');
                    return;
                  }
                  
                  localStorage.setItem('sarkari_global_admin_password', newPwd);
                  
                  // Sync password to MySQL database dynamically if hosted
                  fetch(getApiUrl('save_password'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: newPwd })
                  })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success) {
                      console.log('Admin password successfully synchronized with MySQL.');
                    }
                  })
                  .catch(() => {
                    console.log('Local/offline mode detected. Saved to browser storage.');
                  });

                  alert('Success: Admin password successfully updated!');
                  form.reset();
                }} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase tracking-wide">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPasswordSettings" 
                        required 
                        placeholder="Enter Current Password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase tracking-wide">New Password</label>
                      <input 
                        type="password" 
                        name="newPasswordSettings" 
                        required 
                        placeholder="Enter New Password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1.5 uppercase tracking-wide">Confirm Password</label>
                      <input 
                        type="password" 
                        name="confirmPasswordSettings" 
                        required 
                        placeholder="Re-enter New Password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 cursor-pointer h-10 flex items-center justify-center shrink-0"
                  >
                    Update Access Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'popup' && (
            <div className="space-y-6 animate-fade-in" id="admin-welcome-popup-tab">
              {/* Top Banner */}
              <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl border border-emerald-900/40 relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                    <Video className="w-3.5 h-3.5 text-emerald-300" />
                    <span>First-Time Visitor Welcome Alert &amp; Tutorial Card</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif">
                    Configure First-Visit Announcement &amp; YouTube Video Guide
                  </h2>
                  <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                    When a new visitor arrives at CVLoom, an engaging welcome card can greet them with a YouTube tutorial video, breaking news alert, or poster image. Control whether it displays a video frame or image, customize all text, and test the preview live.
                  </p>
                </div>
              </div>

              {/* Status & Quick Action Controls */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${
                    popupEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {popupEnabled ? '🔔' : '🔕'}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">
                      Popup Alert Status: {popupEnabled ? <span className="text-emerald-700">Active (Showing to New Visitors)</span> : <span className="text-stone-500">Disabled</span>}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Toggle to instantly show or hide this alert popup across the website.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !popupEnabled;
                      setPopupEnabled(next);
                      if (onUpdateSettings) {
                        onUpdateSettings({
                          ...globalSettings,
                          popup_enabled: String(next)
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      popupEnabled
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs'
                    }`}
                  >
                    {popupEnabled ? 'Pause / Turn Off Popup' : 'Turn On Popup Now'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('cvloom_welcome_popup_dismissed');
                      alert('✓ Browser visitor status reset! Refresh or visit homepage to test the popup appearing again.');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                    title="Clear dismissed flag from localStorage so you can test it on your current device"
                  >
                    🔄 Reset Visitor Status (Test Again)
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPopupPreview(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Card Modal</span>
                  </button>
                </div>
              </div>

              {/* Popup Configuration Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onUpdateSettings) {
                    onUpdateSettings({
                      ...globalSettings,
                      popup_enabled: String(popupEnabled),
                      popup_mode: popupMode,
                      popup_title: popupTitle,
                      popup_badge: popupBadge,
                      popup_description: popupDescription,
                      popup_youtube_url: popupYoutubeUrl,
                      popup_image_url: popupImageUrl,
                      popup_btn_text: popupBtnText,
                      popup_btn_link: popupBtnLink
                    });
                    alert('✓ Success: First-time visitor welcome popup settings saved & synced live!');
                  }
                }}
                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6 text-xs"
              >
                {/* 1. Media Mode Selector */}
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-2">
                    1. Card Media Display Type (YouTube Video Frame vs Image Banner)
                  </label>
                  <p className="text-slate-500 text-xs mb-3">
                    Choose what visitors see in the top media header of the welcome card.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'video', label: 'YouTube Video Frame', icon: '📹', desc: 'Embed YouTube video player' },
                      { id: 'image', label: 'Announcement Image', icon: '🖼️', desc: 'Show poster / notice banner' },
                      { id: 'both', label: 'Both Video & Details', icon: '⚡', desc: 'Video first, image fallback' },
                      { id: 'text_only', label: 'Text & Notice Only', icon: '📝', desc: 'No media banner' }
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPopupMode(m.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                          popupMode === m.id
                            ? 'bg-[#132E22] text-white border-emerald-900 shadow-md font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="text-xl block mb-1">{m.icon}</span>
                        <div className="text-xs font-bold leading-tight">{m.label}</div>
                        <div className={`text-[10px] mt-0.5 ${popupMode === m.id ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {m.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Media Links: YouTube and Image URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 text-red-600" />
                      <span>YouTube Video URL or Share Link:</span>
                    </label>
                    <input
                      type="url"
                      value={popupYoutubeUrl}
                      onChange={e => setPopupYoutubeUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=k3_tw44QsZQ"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                    />
                    <p className="text-[11px] text-slate-400">
                      Standard watch links, shorts, or youtu.be links are automatically converted to playable embedded frames.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase flex items-center gap-1.5">
                      <span>🖼️</span>
                      <span>Card Image / Poster Banner URL:</span>
                    </label>
                    <input
                      type="url"
                      value={popupImageUrl}
                      onChange={e => setPopupImageUrl(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                    />
                    <p className="text-[11px] text-slate-400">
                      Used when Display Mode is set to "Announcement Image" or as background graphic.
                    </p>
                  </div>
                </div>

                {/* 3. Text Headlines and Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase">
                      Popup Card Title / Heading:
                    </label>
                    <input
                      type="text"
                      value={popupTitle}
                      onChange={e => setPopupTitle(e.target.value)}
                      placeholder="e.g. Welcome to CVLoom Official Portal!"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase">
                      Top Pill Badge Text:
                    </label>
                    <input
                      type="text"
                      value={popupBadge}
                      onChange={e => setPopupBadge(e.target.value)}
                      placeholder="e.g. ⚡ Quick Portal Tour & Video Guide"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* 4. Description Text */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <label className="block text-slate-700 font-bold uppercase">
                    Detailed Announcement / Guide Description:
                  </label>
                  <textarea
                    rows={3}
                    value={popupDescription}
                    onChange={e => setPopupDescription(e.target.value)}
                    placeholder="Enter what you want new visitors to learn..."
                    className="w-full p-4 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-400">
                    Supports up to 400 characters. Keep it concise, helpful, and welcoming.
                  </p>
                </div>

                {/* 5. Call To Action Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase">
                      Action Button Label:
                    </label>
                    <input
                      type="text"
                      value={popupBtnText}
                      onChange={e => setPopupBtnText(e.target.value)}
                      placeholder="e.g. Start Exploring Now"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold uppercase">
                      Button Destination Link / Category:
                    </label>
                    <select
                      value={popupBtnLink}
                      onChange={e => setPopupBtnLink(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-semibold cursor-pointer"
                    >
                      <option value="home">Homepage</option>
                      <option value="govt-jobs">Central &amp; State Govt Jobs</option>
                      <option value="scholarships">Scholarships &amp; Fellowships</option>
                      <option value="ngo-jobs">NGO &amp; Social Development Careers</option>
                      <option value="tools">Free Document &amp; Resume Tools</option>
                      <option value="blogs">Exam Prep Guides &amp; Articles</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-slate-500 text-xs">
                    Visitors can close the card anytime using the large close button in the top-right corner.
                  </p>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Popup Configuration Live</span>
                  </button>
                </div>
              </form>

              {/* IN-ADMIN LIVE PREVIEW MODAL */}
              {showPopupPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
                  <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto">
                    {/* Large Close Button */}
                    <button
                      type="button"
                      onClick={() => setShowPopupPreview(false)}
                      className="absolute top-3.5 right-3.5 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white shadow-xl flex items-center justify-center transition cursor-pointer"
                      title="Close Preview"
                    >
                      ✕
                    </button>

                    {/* Media Frame */}
                    {(popupMode === 'video' || popupMode === 'both') && popupYoutubeUrl && (
                      <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-stone-200 dark:border-stone-800">
                        <iframe
                          src={getYouTubeEmbedUrl(popupYoutubeUrl)}
                          title="YouTube Video Guide Preview"
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {(popupMode === 'image' || (popupMode === 'both' && !popupYoutubeUrl)) && popupImageUrl && (
                      <div className="relative w-full max-h-72 bg-stone-950 overflow-hidden border-b border-stone-200">
                        <img 
                          src={popupImageUrl} 
                          alt={popupTitle} 
                          className="w-full h-full object-cover max-h-72" 
                        />
                      </div>
                    )}

                    {/* Text Details */}
                    <div className="p-6 space-y-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{popupBadge}</span>
                      </span>

                      <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white">
                        {popupTitle}
                      </h2>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {popupDescription}
                      </p>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-stone-400">Preview Mode: Close with top-right button</span>
                        <button
                          type="button"
                          onClick={() => setShowPopupPreview(false)}
                          className="px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                        >
                          {popupBtnText} →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-6 animate-fade-in" id="admin-footer-management-tab">
              {/* Top Banner */}
              <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 md:p-8 rounded-3xl border border-emerald-900/40 relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                    <Palette className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Footer Control &amp; Color Palette</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif">
                    Complete Administrative Control Over Website Footer
                  </h2>
                  <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                    Modify the footer theme colors, brand information, bio, official contact helpline, office address, and copyright notices. Change dark styling to light high-contrast themes anytime.
                  </p>
                </div>
              </div>

              {/* Main Footer Settings Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onUpdateSettings) {
                    onUpdateSettings({
                      ...globalSettings,
                      footer_theme: footerTheme,
                      footer_brand_title: footerBrandTitle,
                      footer_brand_subtitle: footerBrandSubtitle,
                      footer_about: footerAbout,
                      footer_email: footerEmail,
                      footer_phone: footerPhone,
                      footer_address: footerAddress,
                      footer_disclaimer: footerDisclaimer,
                      footer_copyright: footerCopyright,
                      footer_links_title: footerLinksTitle,
                      footer_tools_title: footerToolsTitle,
                      footer_policy_title: footerPolicyTitle
                    });
                    alert('✓ Success: Footer styling, colors, and content updated & synced live!');
                  }
                }}
                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6 text-xs"
              >
                {/* 1. Theme and Color Scheme Selector */}
                <div>
                  <label className="block text-slate-800 font-bold uppercase mb-2">
                    1. Footer Color Scheme &amp; Theme (Light / High Contrast Colors)
                  </label>
                  <p className="text-slate-500 text-xs mb-3">
                    Switch away from dark backgrounds to soft, readable light tones that clearly display all text and links.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { id: 'light-cream', name: 'Warm Cream (Default)', bg: 'bg-[#FAF8F5]', border: 'border-stone-300', text: 'text-stone-800', desc: 'Light, warm & very readable' },
                      { id: 'light-slate', name: 'Cool Slate Light', bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800', desc: 'Government & academic look' },
                      { id: 'light-mint', name: 'Soft Mint Emerald', bg: 'bg-[#F2FAF6]', border: 'border-emerald-300', text: 'text-emerald-950', desc: 'Fresh & verified identity' },
                      { id: 'dark-forest', name: 'Dark Forest Emerald', bg: 'bg-[#0f241a]', border: 'border-emerald-900', text: 'text-stone-200', desc: 'Deep signature green' },
                      { id: 'dark-slate', name: 'Charcoal Dark', bg: 'bg-stone-900', border: 'border-stone-800', text: 'text-stone-300', desc: 'Classic dark mode' }
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFooterTheme(t.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                          footerTheme === t.id
                            ? 'border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className={`w-full h-8 rounded-lg ${t.bg} border ${t.border} mb-2 flex items-center justify-center font-bold text-[11px] ${t.text}`}>
                            Aa Sample
                          </div>
                          <strong className="block text-xs font-bold text-slate-900">{t.name}</strong>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{t.desc}</span>
                        </div>
                        {footerTheme === t.id && (
                          <span className="mt-2 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Brand and About Bio */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="text-slate-800 font-bold uppercase">
                    2. Brand Identity &amp; Portal About Bio
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={footerBrandTitle}
                        onChange={e => setFooterBrandTitle(e.target.value)}
                        placeholder="e.g. CVLoom"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Brand Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={footerBrandSubtitle}
                        onChange={e => setFooterBrandSubtitle(e.target.value)}
                        placeholder="e.g. Verified Career & Govt Recruitment Portal"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">About Text / Mission Statement</label>
                    <textarea
                      rows={3}
                      value={footerAbout}
                      onChange={e => setFooterAbout(e.target.value)}
                      placeholder="Enter description of your portal..."
                      className="w-full p-4 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs leading-relaxed"
                    />
                  </div>
                </div>

                {/* 3. Direct Contact Info */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="text-slate-800 font-bold uppercase">
                    3. Official Helpline, Support Email &amp; Office Address
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Support Email</label>
                      <input
                        type="email"
                        value={footerEmail}
                        onChange={e => setFooterEmail(e.target.value)}
                        placeholder="support@cvloom.online"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Helpdesk Phone / Helpline</label>
                      <input
                        type="text"
                        value={footerPhone}
                        onChange={e => setFooterPhone(e.target.value)}
                        placeholder="+91 11-4562-7890"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Office / Location Address</label>
                      <input
                        type="text"
                        value={footerAddress}
                        onChange={e => setFooterAddress(e.target.value)}
                        placeholder="Connaught Place, New Delhi, India"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Column Headings */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="text-slate-800 font-bold uppercase">
                    4. Footer Column Headings
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Column 2 Heading</label>
                      <input
                        type="text"
                        value={footerLinksTitle}
                        onChange={e => setFooterLinksTitle(e.target.value)}
                        placeholder="Explore Openings"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Column 3 Heading</label>
                      <input
                        type="text"
                        value={footerToolsTitle}
                        onChange={e => setFooterToolsTitle(e.target.value)}
                        placeholder="Free Document Tools"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Column 4 Heading</label>
                      <input
                        type="text"
                        value={footerPolicyTitle}
                        onChange={e => setFooterPolicyTitle(e.target.value)}
                        placeholder="Verification & Policy"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Disclaimer & Copyright */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="text-slate-800 font-bold uppercase">
                    5. Disclaimer, Verification Badge &amp; Copyright Notice
                  </h4>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Official Disclaimer Notice</label>
                    <textarea
                      rows={2}
                      value={footerDisclaimer}
                      onChange={e => setFooterDisclaimer(e.target.value)}
                      placeholder="Enter legal disclaimer..."
                      className="w-full p-4 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Copyright Line</label>
                    <input
                      type="text"
                      value={footerCopyright}
                      onChange={e => setFooterCopyright(e.target.value)}
                      placeholder="© 2026 CVLoom Portal. All Rights Reserved."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-slate-500 text-xs">
                    Updates will immediately apply to the live footer at the bottom of all pages.
                  </p>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings Live</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
