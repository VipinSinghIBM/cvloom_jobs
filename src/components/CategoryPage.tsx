/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Building2, MapPin, Calendar, Clock, ArrowRight, Share2, 
  Bookmark, CheckCircle, Search, Filter, Sparkles, ChevronRight,
  Play, Video
} from 'lucide-react';
import { Job, NavItem, SubNavItem } from '../types';
import CVLoomLogo from './CVLoomLogo';

interface CategoryPageProps {
  currentCategory: string; // e.g. "govt-jobs", "scholarships", "ngo-jobs", "fellowships", "internship"
  activeSubNav?: string; // e.g. "state-govt", "central-govt", "govt-samvida", "contractual-base"
  jobs: Job[];
  navItems: NavItem[];
  onSelectJob: (jobId: string) => void;
  onSelectVideo?: (jobId: string) => void;
  onSelectSubNav: (subnavId: string) => void;
  onNavigate: (view: string) => void;
  bookmarks: string[];
  onToggleBookmark: (jobId: string) => void;
}

export default function CategoryPage({
  currentCategory,
  activeSubNav,
  jobs,
  navItems,
  onSelectJob,
  onSelectVideo,
  onSelectSubNav,
  onNavigate,
  bookmarks,
  onToggleBookmark
}: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedQual, setSelectedQual] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'vacancies' | 'closingSoon'>('latest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Find matching nav item
  const currentNavItem = navItems.find(n => n.id === currentCategory || n.path === currentCategory);
  const subnavs = currentNavItem?.subnavs || [];
  const currentSubNavItem = subnavs.find(s => s.id === activeSubNav);

  // Determine Category title & subtitle
  const pageTitle = useMemo(() => {
    if (currentSubNavItem) {
      return currentSubNavItem.label;
    }
    if (currentNavItem) {
      return currentNavItem.label;
    }
    return 'Career & Recruitment Postings';
  }, [currentNavItem, currentSubNavItem]);

  const pageDescription = useMemo(() => {
    if (currentSubNavItem?.description) {
      return currentSubNavItem.description;
    }
    if (currentCategory === 'govt-jobs') {
      return 'Official notifications for Central, State Government, Samvida, and Contractual recruitments across India.';
    }
    if (currentCategory === 'scholarships') {
      return 'Comprehensive portal for Government, CSR, and NGO-supported merit scholarships for school, college, and university students.';
    }
    if (currentCategory === 'ngo-jobs') {
      return 'Vetted vacancies in prominent Non-Profit Organizations, Corporate CSR wings, and United Nations agencies in India.';
    }
    if (currentCategory === 'fellowships') {
      return 'Prestigious government, academic, policy, and young professional fellowships for high-impact careers.';
    }
    if (currentCategory === 'internship') {
      return 'Curated technology, policy research, government, and social sector internships for emerging talent.';
    }
    return 'Find verified recruitment notifications with direct application forms and official guidelines.';
  }, [currentCategory, currentSubNavItem]);

  // Filter jobs based on category and subCategory
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Primary Category Filter
      let matchCat = true;
      if (currentNavItem?.categoryFilter) {
        matchCat = job.category.toLowerCase().includes(currentNavItem.categoryFilter.toLowerCase()) ||
                   job.jobType.toLowerCase().includes(currentNavItem.categoryFilter.toLowerCase()) ||
                   (currentCategory === 'govt-jobs' && (job.jobType === 'Central' || job.jobType === 'State Gov' || job.category === 'Govt Jobs' || job.category === 'Latest Job'));
      }

      // 2. SubCategory Filter (if selected)
      let matchSubCat = true;
      if (currentSubNavItem) {
        const subLabel = currentSubNavItem.label.toLowerCase();
        const subFilter = (currentSubNavItem.filterSubCategory || '').toLowerCase();
        
        matchSubCat = (job.subCategory && job.subCategory.toLowerCase().includes(subLabel)) ||
                      (job.subCategory && job.subCategory.toLowerCase().includes(subFilter)) ||
                      job.title.toLowerCase().includes(subLabel) ||
                      job.qualification.toLowerCase().includes(subLabel) ||
                      job.jobType.toLowerCase().includes(subLabel) ||
                      (currentSubNavItem.id === 'state-govt' && (job.jobType === 'State Gov' || job.state !== 'All India')) ||
                      (currentSubNavItem.id === 'central-govt' && (job.jobType === 'Central' || job.state === 'All India')) ||
                      (currentSubNavItem.id === 'govt-samvida' && (job.title.toLowerCase().includes('samvida') || job.jobType.toLowerCase().includes('samvida') || (job.subCategory && job.subCategory.toLowerCase().includes('samvida')))) ||
                      (currentSubNavItem.id === 'contractual-base' && (job.title.toLowerCase().includes('contract') || job.jobType.toLowerCase().includes('contract') || (job.subCategory && job.subCategory.toLowerCase().includes('contract'))));
      }

      // 3. User search & filter controls
      const matchSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.postName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchState = !selectedState || job.state === selectedState;
      const matchQual = !selectedQual || job.qualification.toLowerCase().includes(selectedQual.toLowerCase());

      return matchCat && matchSubCat && matchSearch && matchState && matchQual;
    });
  }, [jobs, currentNavItem, currentCategory, currentSubNavItem, searchTerm, selectedState, selectedQual]);

  // Sort jobs
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === 'vacancies') {
        return (b.totalVacancies || 0) - (a.totalVacancies || 0);
      }
      if (sortBy === 'closingSoon') {
        return new Date(a.applicationEndDate).getTime() - new Date(b.applicationEndDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredJobs, sortBy]);

  // Unique states & qualifications
  const states = Array.from(new Set(jobs.map(j => j.state))).filter(Boolean);
  const qualifications = ['10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'ITI', 'Diploma', 'Engineering', 'Medical', 'Teacher'];

  // Total vacancies calculation
  const totalVacancies = sortedJobs.reduce((sum, j) => sum + (j.totalVacancies || 0), 0);

  // WhatsApp share handler
  const handleWhatsAppShare = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    const shareUrl = `https://cvloom.online/jobs?jobId=${job.id}`;
    const shareText = `🏛️ *CVLOOM OFFICIAL RECRUITMENT ALERT*\n` +
      `═══════════════════════════\n` +
      `📌 *${job.title}*\n` +
      `🏢 *Organization:* ${job.organization}\n` +
      `💼 *Vacancies:* ${job.totalVacancies > 0 ? job.totalVacancies.toLocaleString() : 'Multiple Positions'}\n` +
      `⏳ *Last Date to Apply:* ${job.applicationEndDate}\n` +
      `📍 *Location:* ${job.state || 'All India'}\n\n` +
      `👉 *View Full Notification & Apply Online:*\n${shareUrl}\n\n` +
      `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
      `_Verified 100% Free Career & Govt Opportunities Portal by CVLoom_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 animate-fade-in" id="category-page-view">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button onClick={() => onSelectSubNav('')} className={`hover:text-blue-600 transition ${!activeSubNav ? 'font-bold text-blue-600' : ''}`}>
          {currentNavItem?.label || 'Categories'}
        </button>
        {currentSubNavItem && (
          <>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-slate-900 dark:text-white truncate">{currentSubNavItem.label}</span>
          </>
        )}
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-10 overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20 -ml-16 -mb-16" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>VERIFIED RECRUITMENT NOTIFICATIONS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {pageTitle}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {pageDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-white text-base font-black">{sortedJobs.length}</span>
              <span className="text-slate-400">Active Postings</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-white text-base font-black">{totalVacancies.toLocaleString()}</span>
              <span className="text-slate-400">Total Positions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Navigation Pills (Admin-Controlled & Responsive) */}
      {subnavs.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectSubNav('')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              !activeSubNav
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            All {currentNavItem?.label} ({filteredJobs.length})
          </button>

          {subnavs.map(sub => {
            const isActive = activeSubNav === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubNav(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs sm:text-sm">
        
        {/* Search Input */}
        <div className="sm:col-span-5 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by post, department, board..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
          />
        </div>

        {/* State Filter */}
        <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
          >
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s} className="text-slate-900">{s}</option>)}
          </select>
        </div>

        {/* Qualification Filter */}
        <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <select
            value={selectedQual}
            onChange={e => setSelectedQual(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
          >
            <option value="">Qualification</option>
            {qualifications.map(q => <option key={q} value={q} className="text-slate-900">{q}</option>)}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="vacancies">Most Vacancies</option>
            <option value="closingSoon">Closing Soon</option>
          </select>
        </div>

      </div>

      {/* Main Job Postings Grid */}
      {sortedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
          {sortedJobs.map(job => {
            const isBookmarked = bookmarks.includes(job.id);
            const isClosingSoon = new Date(job.applicationEndDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;
            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job.id)}
                className="bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 border border-slate-200/90 dark:border-slate-800 p-5 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
              >
                {/* Subtle top category indicator line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  job.category.includes('Govt') ? 'bg-blue-600' :
                  job.category.includes('Scholarship') ? 'bg-amber-500' :
                  job.category.includes('NGO') ? 'bg-emerald-600' :
                  job.category.includes('Fellowship') ? 'bg-purple-600' : 'bg-indigo-600'
                }`} />

                {/* Top Row: Logo, Badges, Title, Organization */}
                <div className="flex items-start gap-3.5 pt-1">
                  {/* Recruiter Logo with CVloom clean vector fallback */}
                  <div className="w-13 h-13 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 shrink-0 shadow-xs flex items-center justify-center overflow-hidden">
                    {job.logoUrl ? (
                      <img
                        src={job.logoUrl}
                        alt={job.organization}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <CVLoomLogo iconOnly={true} size="sm" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                        {job.organization}
                      </span>
                      {job.subCategory && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-[10px] border border-blue-100 dark:border-blue-800">
                          {job.subCategory}
                        </span>
                      )}
                      {isClosingSoon && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 font-black text-[10px] border border-rose-200 dark:border-rose-800 animate-pulse">
                          Closing Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                </div>

                {/* Structured Metadata Badges (Salary, Posts, Qualification, Location) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Vacancies</span>
                    <strong className="text-slate-900 dark:text-white font-bold truncate block">
                      {job.totalVacancies > 0 ? `${job.totalVacancies.toLocaleString()} Posts` : 'Multiple'}
                    </strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Salary / Stipend</span>
                    <strong className="text-slate-900 dark:text-white font-bold truncate block">
                      {job.salary || 'As per norms'}
                    </strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Location</span>
                    <strong className="text-slate-900 dark:text-white font-bold truncate block">
                      {job.state || 'All India'}
                    </strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Eligibility</span>
                    <strong className="text-slate-900 dark:text-white font-bold truncate block">
                      {job.qualification}
                    </strong>
                  </div>
                </div>

                {/* Timeline & Quick Action Buttons */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Last Date: <strong className="text-slate-900 dark:text-slate-200 font-bold">{job.applicationEndDate}</strong></span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Video Guide Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectVideo) onSelectVideo(job.id);
                        else onSelectJob(job.id);
                      }}
                      title="See How to Apply Video Tutorial"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900 transition cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Video</span>
                    </button>

                    {/* WhatsApp Share Button */}
                    <button
                      onClick={(e) => handleWhatsAppShare(e, job)}
                      title="Share Notice on WhatsApp"
                      className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer border border-emerald-100 dark:border-emerald-800"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(job.id);
                      }}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        isBookmarked 
                          ? 'bg-amber-500 text-white border-amber-500' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* View Details */}
                    <button
                      onClick={() => onSelectJob(job.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs shadow-blue-600/20 active:scale-95 text-xs"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            No Notifications Match the Selected Filters
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Try resetting your search query or state/qualification dropdowns to explore all active recruitments.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedState('');
              setSelectedQual('');
              onSelectSubNav('');
            }}
            className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 transition shadow-md shadow-blue-600/20"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
