/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, ArrowUpRight, Calendar, Landmark, MapPin, 
  Bookmark, Share2, Printer, Search, ArrowRight, ShieldCheck, 
  Award, Briefcase, ChevronRight, TrendingUp, Filter, Sparkles, CheckCircle2,
  Play, Video
} from 'lucide-react';
import { Job } from '../types';
import CVLoomLogo from './CVLoomLogo';
import { SketchJobSearch, SketchPostJob, SketchEmptyState } from './SketchIllustrations';

interface JobListingsProps {
  jobs: Job[];
  onSelectJob: (id: string) => void;
  onSelectVideo?: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  searchTerm?: string;
  onNavigate: (view: string) => void;
  onOpenPostJob?: () => void;
  globalSettings?: { [key: string]: string };
}

export default function JobListings({ 
  jobs, 
  onSelectJob, 
  onSelectVideo,
  bookmarks, 
  onToggleBookmark,
  searchTerm: parentSearch = '',
  onNavigate,
  onOpenPostJob,
  globalSettings
}: JobListingsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'jobs' | 'cards-results' | 'education' | 'alternatives'>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Dynamic homepage contents from Admin
  const heroBadge = globalSettings?.home_hero_badge || '100% Verified Career & Govt Opportunities';
  const heroTitle = globalSettings?.home_hero_title || 'Discover Meaningful Career Openings';
  const heroSubtitle = globalSettings?.home_hero_subtitle || 'Verified opportunities across NGOs, CSR Foundations, Government Departments, and Fellowships. Never any charges for applications or interview processes.';

  const defaultRecruiters = ['Sarvam Foundation', 'Social Alpha', 'Lend A Hand', 'UPSC', 'NITI Aayog', 'BECIL', 'Swades', 'Plastics For Change'];
  const recruitersList = globalSettings?.verified_recruiters 
    ? globalSettings.verified_recruiters.split(',').map(r => r.trim()).filter(Boolean)
    : defaultRecruiters;

  // Unified searches
  const query = (localSearch || parentSearch).toLowerCase();

  // Categories mapping
  const CATEGORIES = {
    jobs: ['Latest Job', 'Walk-in Interview', 'Private Job', 'NGO Job'],
    cardsResults: ['Admit Card', 'Result', 'Answer Key'],
    education: ['Admission', 'Scholarship', 'Syllabus', 'Government Scheme'],
    alternatives: ['Internship', 'Fellowship', 'Outsourcing Job']
  };

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query) || 
                         job.organization.toLowerCase().includes(query) || 
                         job.category.toLowerCase().includes(query);
    const matchesState = selectedState === 'all' || job.state === selectedState;
    const matchesType = selectedType === 'all' || job.jobType === selectedType;
    
    if (!matchesQuery || !matchesState || !matchesType) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'jobs') return CATEGORIES.jobs.includes(job.category);
    if (activeTab === 'cards-results') return CATEGORIES.cardsResults.includes(job.category);
    if (activeTab === 'education') return CATEGORIES.education.includes(job.category);
    if (activeTab === 'alternatives') return CATEGORIES.alternatives.includes(job.category);

    return true;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Latest Job': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Admit Card': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Result': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Government Scheme': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Internship': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Fellowship': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'NGO Job': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Private Job': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Walk-in Interview': return 'bg-rose-50 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const states = Array.from(new Set(jobs.map(j => j.state))).filter(Boolean);

  const getRecentUpdates = () => {
    return [...jobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  };

  const getJobsByCategory = (cat: string) => {
    return jobs.filter(j => j.category === cat && j.status === 'Published').slice(0, 5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8" id="job-listings-section">
      
      {/* PurposeHire Hero Section with Sketch Illustration */}
      <div className="bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] rounded-3xl p-6 sm:p-8 md:p-10 text-white mb-10 shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{heroBadge}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
              {heroTitle}
            </h1>
            
            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              {onOpenPostJob && (
                <button
                  onClick={onOpenPostJob}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Post a Free Job</span>
                  <span className="text-[10px] bg-emerald-700/80 px-1.5 py-0.5 rounded text-emerald-100">Zero Fee</span>
                </button>
              )}
              <button
                onClick={() => {
                  const input = document.getElementById('search-jobs-input');
                  if (input) input.focus();
                }}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer"
              >
                Explore {jobs.length} Openings
              </button>
            </div>
          </div>

          {/* Sketch illustration */}
          <div className="shrink-0 hidden md:block">
            <SketchJobSearch className="w-56 h-44 drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Quick Category Bento Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 mb-8">
        {[
          { id: 'all', label: 'All Openings', icon: '✨', count: jobs.length },
          { id: 'NGO Job', label: 'NGO & Impact', icon: '🌱', count: jobs.filter(j => j.category === 'NGO Job' || j.jobType === 'NGO').length },
          { id: 'Latest Job', label: 'Govt & PSU', icon: '🏛️', count: jobs.filter(j => j.category === 'Latest Job' || j.category === 'Govt Jobs').length },
          { id: 'Fellowship', label: 'Fellowships', icon: '🌟', count: jobs.filter(j => j.category === 'Fellowship').length },
          { id: 'Scholarship', label: 'Scholarships', icon: '🎓', count: jobs.filter(j => j.category === 'Scholarship').length },
          { id: 'Internship', label: 'Internships', icon: '🚀', count: jobs.filter(j => j.category === 'Internship').length },
          { id: 'Admit Card', label: 'Admit & Results', icon: '🎫', count: jobs.filter(j => j.category === 'Admit Card' || j.category === 'Result').length }
        ].map(bento => (
          <div 
            key={bento.id}
            onClick={() => {
              if (bento.id === 'all') {
                setActiveTab('all');
                setLocalSearch('');
              } else {
                setActiveTab('all');
                setLocalSearch(bento.id);
              }
            }}
            className="bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 border border-stone-200 dark:border-stone-800 p-3.5 rounded-2xl cursor-pointer shadow-xs hover:shadow-md hover:border-emerald-400 transition text-center flex flex-col items-center justify-center group"
          >
            <span className="text-2xl group-hover:scale-110 transition mb-1">{bento.icon}</span>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 font-serif">{bento.label}</span>
            <span className="text-[10px] px-2 py-0.5 bg-[#EAF6E9] text-emerald-800 font-bold rounded-full mt-1.5">
              {bento.count} Active
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Feed Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Section Heading & Search Filter Bar */}
          <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-4">
            
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-jobs-input"
                type="text"
                placeholder="Search by role title, organisation, sector or keyword..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-100 outline-none focus:border-emerald-600 transition"
              />
              {localSearch && (
                <button 
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills and Dropdowns */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              
              {/* Tab navigation */}
              <div className="flex flex-wrap gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                {[
                  { id: 'all', label: 'All Postings' },
                  { id: 'jobs', label: 'Careers & Jobs' },
                  { id: 'cards-results', label: 'Admit Cards & Results' },
                  { id: 'education', label: 'Scholarships & Schemes' },
                  { id: 'alternatives', label: 'Fellowships & Internships' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as any); setLocalSearch(''); }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-[#132E22] text-white shadow-xs' 
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* In-feed filters */}
              <div className="flex items-center gap-2">
                <select 
                  value={selectedState} 
                  onChange={e => setSelectedState(e.target.value)}
                  className="px-3 py-1.5 border border-stone-200 dark:border-stone-700 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300 outline-none"
                >
                  <option value="all">📍 All Locations</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select 
                  value={selectedType} 
                  onChange={e => setSelectedType(e.target.value)}
                  className="px-3 py-1.5 border border-stone-200 dark:border-stone-700 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300 outline-none"
                >
                  <option value="all">🏢 All Sectors</option>
                  <option value="NGO">NGO / Non-Profit</option>
                  <option value="Central">Central Govt</option>
                  <option value="State Gov">State Govt</option>
                  <option value="Contract">Samvida / Contract</option>
                  <option value="Private">Private</option>
                </select>
              </div>

            </div>

          </div>

          {/* Unified PurposeHire Card Grid */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-stone-500 font-bold uppercase px-2 tracking-wider">
                <span>Displaying {filteredJobs.length} Verified Openings</span>
                <span>Sorted by Active Closing Date</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map(job => {
                  const isSaved = bookmarks.includes(job.id);
                  const orgInitial = job.organization?.trim().charAt(0) || 'P';

                  return (
                    <div 
                      key={job.id}
                      onClick={() => onSelectJob(job.id)}
                      className="bg-white dark:bg-stone-900 hover:bg-[#FAF9F5]/80 dark:hover:bg-stone-800/60 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-600/60 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group space-y-3.5 relative overflow-hidden cursor-pointer"
                      id={`job-card-${job.id}`}
                    >
                      {/* Top Accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600" />

                      {job.isFeatured && (
                        <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-widest rounded-full shadow-xs">
                          VERIFIED
                        </span>
                      )}

                      <div className="space-y-3 pt-1">
                        
                        {/* Org Row with Avatar & Verified Stamp */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {job.logoUrl ? (
                              <img 
                                src={job.logoUrl} 
                                alt={`${job.organization} Logo`} 
                                className="w-11 h-11 object-contain rounded-xl border border-stone-200 bg-white p-1 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold font-serif text-lg flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0 shadow-xs">
                                {orgInitial}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-stone-700 dark:text-stone-300 line-clamp-1">
                                  {job.organization}
                                </p>
                                <span className="inline-flex text-[10px] text-emerald-700 dark:text-emerald-400 font-bold" title="Verified Posting">
                                  ✓
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                                <span>{job.location || job.state || 'All India'}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const shareUrl = `https://cvloom.online/jobs?jobId=${job.id}`;
                                const shareText = `🏛️ *CVLOOM OFFICIAL RECRUITMENT ALERT*\n` +
                                  `═══════════════════════════\n` +
                                  `📌 *${job.title}*\n` +
                                  `🏢 *Organization:* ${job.organization}\n` +
                                  `⏳ *Last Date to Apply:* ${job.applicationEndDate}\n` +
                                  `📍 *Location:* ${job.location || job.state || 'All India'}\n\n` +
                                  `👉 *View Notification & Apply Online:*\n${shareUrl}\n\n` +
                                  `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
                                  `_Shared via CVLoom (cvloom.online)_`;
                                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
                              }}
                              title="Share on WhatsApp"
                              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 transition cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onToggleBookmark(job.id); }}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isSaved 
                                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-stone-600'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>
                        </div>

                        {/* Job Title in EB Garamond */}
                        <div>
                          <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition leading-snug line-clamp-2">
                            {job.title}
                          </h3>
                        </div>

                        {/* PurposeHire Orange / Amber Sector Tag */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="tag-orange">
                            {job.subCategory || job.department || job.category}
                          </span>
                          {job.experience && (
                            <span className="text-[11px] text-stone-500 font-medium">
                              · {job.experience}
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Card Footer: Deadline, How to Apply Video button, and Apply Arrow */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs gap-2">
                        <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>by <strong className="text-stone-800 dark:text-stone-200">{job.applicationEndDate}</strong></span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectVideo) onSelectVideo(job.id);
                              else onSelectJob(job.id);
                            }}
                            title="See How to Apply Video Tutorial"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/60 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-900/60 transition cursor-pointer shadow-xs"
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>Video Guide</span>
                          </button>

                          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition font-serif text-sm">
                            <span>Apply</span>
                            <span>→</span>
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* In-feed "Post a Free Job" Banner with Sketch Illustration */}
              {onOpenPostJob && (
                <div className="bg-[#FAF9F5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 my-6 shadow-xs">
                  <div className="flex items-center gap-5">
                    <SketchPostJob className="w-24 h-24 shrink-0 hidden sm:block" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-[#EAF6E9] px-2.5 py-0.5 rounded-full">
                        For Organisations & Recruiters
                      </span>
                      <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-white mt-1">
                        Hiring for your Organisation or Project?
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-lg leading-relaxed">
                        List verified openings for free. Connect with verified skilled professionals across administration, field operations, education, and social development.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenPostJob}
                    className="shrink-0 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Post a Free Job Now</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl space-y-4">
              <div className="flex justify-center">
                <SketchEmptyState className="w-40 h-32" />
              </div>
              <p className="text-stone-800 dark:text-stone-200 font-bold font-serif text-lg">No openings match your query</p>
              <p className="text-stone-500 text-xs max-w-sm mx-auto leading-relaxed">
                Try widening your location filter to "All Locations", selecting "All Sectors", or clearing your search term.
              </p>
              <button 
                onClick={() => { setLocalSearch(''); setSelectedState('all'); setSelectedType('all'); setActiveTab('all'); }} 
                className="mt-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* SARKARI RESULT CLASSIC TABULAR STRUCTURE - UPGRADED WITH PURPOSEHIRE THEME */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
              <div className="flex items-center gap-3.5">
                {/* Hiring Icon with Pulse Badge */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#132E22] to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/25 relative">
                  <Briefcase className="w-6 h-6 text-emerald-200" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAF6E9] text-emerald-800 border border-emerald-200">
                      ⚡ Active Recruitment Boards
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">Verified 2026</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white tracking-tight mt-0.5">
                    Recruitment & Category Directories
                  </h3>
                  <p className="text-stone-500 text-xs">Direct categorized folders & recruitment tables with instant links</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>VERIFIED RECRUITMENT</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Latest Jobs', cat: 'Latest Job' },
                { name: 'Admit Cards', cat: 'Admit Card' },
                { name: 'Results Table', cat: 'Result' },
                { name: 'NGO Jobs', cat: 'NGO Job' },
                { name: 'Private Jobs', cat: 'Private Job' },
                { name: 'Walk-in Interviews', cat: 'Walk-in Interview' },
                { name: 'Admissions Table', cat: 'Admission' },
                { name: 'Scholarships Desk', cat: 'Scholarship' },
                { name: 'Answer Keys Desk', cat: 'Answer Key' },
                { name: 'Syllabus Desk', cat: 'Syllabus' },
                { name: 'Govt Schemes Desk', cat: 'Government Scheme' },
                { name: 'Internship Desk', cat: 'Internship' }
              ].map(column => {
                const columnJobs = getJobsByCategory(column.cat);
                return (
                  <div key={column.name} className="border border-stone-200/80 dark:border-stone-800 rounded-xl p-4 bg-stone-50/50 dark:bg-stone-800/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-stone-700/50 pb-2">
                      <h4 className="text-xs font-bold uppercase text-stone-800 dark:text-stone-200 tracking-wider flex items-center gap-1.5 font-serif">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {column.name}
                      </h4>
                      <span className="text-[9px] font-bold text-stone-400 font-mono">({columnJobs.length})</span>
                    </div>
                    <div className="divide-y divide-stone-100 dark:divide-stone-800">
                      {columnJobs.length > 0 ? (
                        columnJobs.map(job => (
                          <div 
                            key={job.id} 
                            onClick={() => onSelectJob(job.id)}
                            className="py-2.5 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-medium text-stone-700 dark:text-stone-300 line-clamp-1 flex items-center gap-1 group transition"
                          >
                            <span className="text-stone-400 group-hover:text-emerald-600 transition">▸</span>
                            <span className="truncate">{job.title}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] text-stone-400 italic py-4 text-center">No postings listed yet</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sidebar Columns */}
        <div className="space-y-6">

          {/* Quick Stats & Features */}
          <div className="bg-[#132E22] text-white p-5 rounded-2xl border border-[#1B3B2B] space-y-4 shadow-md">
            <h3 className="font-bold text-sm tracking-wide uppercase flex items-center gap-1.5 border-b border-emerald-900 pb-2 font-serif">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Latest Updates Timeline
            </h3>
            <div className="space-y-3.5">
              {getRecentUpdates().map(up => (
                <div 
                  key={up.id} 
                  onClick={() => onSelectJob(up.id)}
                  className="cursor-pointer group flex items-start gap-2.5 text-xs border-b border-emerald-950/60 pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 group-hover:scale-125 transition"></span>
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-300 block">{up.category}</span>
                    <p className="font-bold text-stone-200 group-hover:text-emerald-300 transition line-clamp-2 leading-tight mt-0.5">{up.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-white text-xs tracking-wide uppercase font-serif">Verified Recruiters</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              {recruitersList.map(org => (
                <button
                  key={org}
                  onClick={() => { setActiveTab('all'); setLocalSearch(org); }}
                  className="p-2 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:bg-emerald-50/30 text-[10px] font-bold text-stone-700 dark:text-stone-300 rounded-lg transition"
                >
                  {org}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#EAF6E9] dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 p-5 rounded-2xl text-center space-y-3">
            <span className="text-2xl block">🌱</span>
            <h3 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm font-serif">CVLoom Job Alerts</h3>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
              Receive verified notifications of social sector openings, scholarships, and civil service dates directly in your inbox.
            </p>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full text-xs p-2.5 border border-emerald-300 dark:border-emerald-700 rounded-lg outline-none bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            />
            <button className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition">
              Subscribe Free
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
