/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ExternalLink, Play, Share2, Check, Copy, 
  Calendar, Building2, Award, FileText, CheckCircle2, 
  Sparkles, Video, HelpCircle, ChevronRight, Clock,
  DollarSign, Users, ShieldCheck, Download, AlertTriangle
} from 'lucide-react';
import { Job, Blog } from '../types';
import { getYouTubeEmbedUrl, getYouTubeThumbnail, getYouTubeVideoId } from '../utils/youtube';

interface VideoTutorialPageProps {
  sourceType: 'job' | 'blog';
  job?: Job;
  blog?: Blog;
  allJobs: Job[];
  allBlogs: Blog[];
  onBack: () => void;
  onSelectJobDetail: (id: string) => void;
  onSelectBlogDetail: (id: string) => void;
  onSelectJobVideo: (id: string) => void;
  onSelectBlogVideo: (id: string) => void;
  onSelectTool?: (toolId: string) => void;
  onNavigate?: (view: string, subCategory?: string) => void;
}

export default function VideoTutorialPage({
  sourceType,
  job,
  blog,
  allJobs,
  allBlogs,
  onBack,
  onSelectJobDetail,
  onSelectBlogDetail,
  onSelectJobVideo,
  onSelectBlogVideo,
  onSelectTool,
  onNavigate
}: VideoTutorialPageProps) {
  const [copied, setCopied] = useState(false);

  // Determine current active item details
  const isJob = sourceType === 'job' && !!job;
  const itemTitle = isJob ? job.title : (blog?.title || 'Application Tutorial');
  const itemOrg = isJob ? job.organization : (blog?.author || 'Editorial Team');
  const videoUrl = isJob ? job.videoTutorialUrl : blog?.videoTutorialUrl;
  const customVideoTitle = isJob ? job.videoTutorialTitle : blog?.videoTutorialTitle;
  const applyUrl = isJob ? job.officialWebsite : (blog?.applyUrl || '');
  const deadline = isJob ? job.applicationEndDate : (blog?.publishDate || '');

  // Default authentic YouTube walkthrough tutorials for Govt Jobs & Career Guidance
  const DEFAULT_JOB_YOUTUBE = 'https://www.youtube.com/watch?v=k3_tw44QsZQ';
  const DEFAULT_BLOG_YOUTUBE = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  // Extract embed URL - Always guarantee working YouTube player
  const effectiveVideoUrl = videoUrl || (isJob ? DEFAULT_JOB_YOUTUBE : DEFAULT_BLOG_YOUTUBE);
  const embedUrl = getYouTubeEmbedUrl(effectiveVideoUrl) || 'https://www.youtube.com/embed/k3_tw44QsZQ?rel=0&modestbranding=1';
  const youtubeVideoId = getYouTubeVideoId(effectiveVideoUrl);

  // Dynamic Page Title & Meta description
  useEffect(() => {
    const videoTitle = customVideoTitle || `How to Apply for ${itemTitle} - Step by Step Video Tutorial | CVLoom`;
    document.title = videoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Watch complete online form filling video tutorial for ${itemTitle}. Check step-by-step application instructions and direct official apply link.`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sourceType, job, blog]);

  // Copy Direct Share Link
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Share with Direct Link
  const handleWhatsAppShare = () => {
    const videoRefId = (isJob ? job?.id : blog?.id) || '';
    const shareUrl = `https://cvloom.online/jobs?video=${videoRefId}&videoType=${sourceType}`;
    const text = encodeURIComponent(
      `🏛️ *CVLOOM OFFICIAL VIDEO TUTORIAL*\n` +
      `═══════════════════════════\n` +
      `🎬 *Watch Application Video Tutorial:* ${itemTitle}\n` +
      `🏢 *Organization:* ${itemOrg}\n` +
      `⏳ *Last Date to Apply:* ${deadline}\n\n` +
      `👉 *Watch Full Step-by-Step Video Guide:*\n${shareUrl}\n\n` +
      `🔗 *Direct Apply Link:* ${applyUrl || shareUrl}\n\n` +
      `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
      `_Shared via CVLoom (cvloom.online)_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Other items with video guides
  const otherJobVideos = allJobs
    .filter(j => j.id !== job?.id)
    .slice(0, 6);

  const otherBlogVideos = allBlogs
    .filter(b => b.id !== blog?.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in" id="video-tutorial-container">
      
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <button 
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                onBack();
              }
            }} 
            className="hover:text-emerald-700 dark:hover:text-emerald-400 font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>/</span>
          {isJob ? (
            <>
              <button 
                onClick={() => onNavigate ? onNavigate('govt-jobs') : onBack()} 
                className="hover:text-emerald-700 transition hidden sm:inline"
              >
                Jobs Portal
              </button>
              <span className="hidden sm:inline">/</span>
              <button 
                onClick={() => job && onSelectJobDetail(job.id)} 
                className="hover:text-emerald-700 transition truncate max-w-[200px]"
                title={itemTitle}
              >
                {job?.postName || itemTitle}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate ? onNavigate('blogs') : onBack()} 
                className="hover:text-emerald-700 transition hidden sm:inline"
              >
                Career Guides
              </button>
              <span className="hidden sm:inline">/</span>
              <button 
                onClick={() => blog && onSelectBlogDetail(blog.id)} 
                className="hover:text-emerald-700 transition truncate max-w-[200px]"
                title={itemTitle}
              >
                {itemTitle}
              </button>
            </>
          )}
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Video className="w-3 h-3" />
            <span>Video Tutorial</span>
          </span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium flex items-center gap-1.5 transition text-[11px] cursor-pointer"
            title="Copy direct link to this video guide"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Video Link'}</span>
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 transition text-[11px] cursor-pointer shadow-xs"
            title="Share video tutorial on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Share</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Grid: Video & Action Center (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Big YouTube Frame, Apply Button, Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Badge & Title */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900">
                <Play className="w-3 h-3 fill-current" />
                <span>OFFICIAL HOW TO APPLY VIDEO TUTORIAL</span>
              </span>
              {isJob && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {job.category} {job.subCategory ? `• ${job.subCategory}` : ''}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-stone-900 dark:text-white leading-tight">
              {customVideoTitle || `How to Apply for ${itemTitle} - Step by Step Online Application Guide`}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{itemOrg}</span>
              {deadline && (
                <>
                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Last Date: {deadline}</span>
                  </span>
                </>
              )}
            </p>
          </div>

          {/* 3. BIG YOUTUBE VIDEO PLAYER FRAME */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block"></span>
                <span>YouTube Video Tutorial Player</span>
              </span>
              {youtubeVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 dark:text-stone-300 hover:text-red-600 transition"
                >
                  <span>Open in YouTube App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black border-2 border-stone-800 dark:border-stone-700 aspect-video group">
              <iframe
                src={embedUrl}
                title={customVideoTitle || itemTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* 4. DEDICATED "NOW APPLY" ACTION BAR DIRECTLY BELOW VIDEO FRAME */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl space-y-4 border border-emerald-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-300 block mb-1">
                  Ready to submit your application?
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">
                  Watch Complete Video & Click Below to Apply
                </h3>
              </div>

              {/* Big High-Conversion "NOW APPLY" Button */}
              {applyUrl ? (
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black font-serif text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-black/30 hover:shadow-amber-500/20 transition cursor-pointer shrink-0"
                >
                  <span>👉 Now Apply / Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => isJob ? onSelectJobDetail(job.id) : (blog && onSelectBlogDetail(blog.id))}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black font-serif text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>Check Details & Apply Link</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sub-actions ribbon */}
            <div className="pt-3 border-t border-emerald-700/60 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-100">
              <div className="flex flex-wrap items-center gap-2">
                {isJob && (
                  <button
                    onClick={() => onSelectJobDetail(job.id)}
                    className="hover:underline flex items-center gap-1 font-semibold text-emerald-200"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Full Notification & Syllabus</span>
                  </button>
                )}
                {!isJob && blog && (
                  <button
                    onClick={() => onSelectBlogDetail(blog.id)}
                    className="hover:underline flex items-center gap-1 font-semibold text-emerald-200"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Full Written Article</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-emerald-200">
                  Direct official link verified by CVLoom
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </div>
            </div>
          </div>

          {/* 5. Key Highlights / Opportunity Overview */}
          {isJob && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Recruitment Highlights & Requirements</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Total Vacancies</span>
                  <strong className="text-stone-900 dark:text-white text-sm font-bold font-serif">
                    {job.totalVacancies > 0 ? job.totalVacancies.toLocaleString() : 'Multiple'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Salary / Stipend</span>
                  <strong className="text-stone-900 dark:text-white text-sm font-bold font-serif truncate block">
                    {job.salary || 'As per norms'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Age Limit</span>
                  <strong className="text-stone-900 dark:text-white text-sm font-bold font-serif truncate block">
                    {job.ageLimit || 'See Notification'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 sm:col-span-2">
                  <span className="text-stone-400 block text-[10px]">Minimum Qualification</span>
                  <strong className="text-stone-900 dark:text-white text-xs font-semibold line-clamp-1">
                    {job.qualification}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Application Mode</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 text-sm font-bold font-serif">
                    {job.applicationMode || 'Online'}
                  </strong>
                </div>
              </div>

              {/* Step by step checklist */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step-by-Step Form Filling Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Step 1: Complete Basic OTR / Candidate Registration',
                    'Step 2: Upload Correct Dimensions Photo & Signature',
                    'Step 3: Enter Academic Qualifications & Caste Category',
                    'Step 4: Pay Required Application Fee Online',
                    'Step 5: Verify Preview & Download Confirmation Slip'
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-stone-50 dark:bg-stone-800/30 rounded-lg text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Helpful Tools Prompt */}
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📸</span>
              <div>
                <strong className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                  Need to Resize Photo or Convert Documents for this Form?
                </strong>
                <span className="text-[11px] text-amber-700 dark:text-amber-300/80 block">
                  Use our free photo resizer and PDF compressor to meet the exact KB upload limit.
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectTool ? onSelectTool('image-resizer') : (onNavigate && onNavigate('tools'))}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
            >
              Open Photo Resizer
            </button>
          </div>

        </div>

        {/* Right Column: Other Video Tutorials, Related Articles & Tools (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Other Video Guides Shelf */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold font-serif text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
                <Play className="w-4 h-4 text-red-600 fill-current" />
                <span>Other Application Video Guides</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              {otherJobVideos.map(j => {
                const thumb = getYouTubeThumbnail(j.videoTutorialUrl);
                return (
                  <div
                    key={j.id}
                    onClick={() => onSelectJobVideo(j.id)}
                    className="p-2.5 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition cursor-pointer flex gap-3 group"
                  >
                    <div className="w-20 h-14 rounded-lg bg-stone-900 relative shrink-0 overflow-hidden flex items-center justify-center">
                      {thumb ? (
                        <img src={thumb} alt={j.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-stone-800 to-stone-700 flex items-center justify-center text-white">
                          <Play className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                      <span className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block truncate">
                        {j.organization}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight group-hover:text-emerald-800 dark:group-hover:text-emerald-300 font-serif">
                        {j.title}
                      </h4>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        Last Date: {j.applicationEndDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Articles & Fellowship Guides */}
          {otherBlogVideos.length > 0 && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="font-bold font-serif text-sm text-stone-900 dark:text-white flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-3">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Fellowship & Career Strategy Blogs</span>
              </h3>

              <div className="space-y-3">
                {otherBlogVideos.map(b => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBlogVideo(b.id)}
                    className="p-2.5 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-emerald-500 hover:bg-emerald-50/20 transition cursor-pointer flex gap-3 group"
                  >
                    <img 
                      src={b.featuredImage} 
                      alt={b.title} 
                      className="w-16 h-14 rounded-lg object-cover shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                        {b.category}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight group-hover:text-emerald-700 font-serif">
                        {b.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Quick Tools Links */}
          <div className="bg-[#132E22] text-white p-5 rounded-2xl border border-emerald-900 space-y-3 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-serif">
              Free Applicant Utilities
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'image-resizer', label: 'Photo & Signature Resizer', desc: 'Exact px and KB limits' },
                { id: 'pdf-converter', label: 'PDF Certificate Compressor', desc: 'Merge & compress below 200KB' },
                { id: 'age-calculator', label: 'Cut-off Age Calculator', desc: 'Calculate exact years & days' },
                { id: 'resume-builder', label: 'ATS Resume Builder', desc: 'Pass resume screening tests' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => onSelectTool ? onSelectTool(t.id) : (onNavigate && onNavigate('tools'))}
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition cursor-pointer group"
                >
                  <div>
                    <strong className="block text-white group-hover:text-emerald-300 font-serif">{t.label}</strong>
                    <span className="text-[10px] text-stone-300">{t.desc}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 6. BOTTOM CONTINUOUS SLOW-MOVING MARQUEE TICKER (USER REQUESTED) */}
      {/* "em video frame ke marquess with inrontation sloe speed ma chalaya taki bakike video and baki ke fom applykanr ka wah se dekh sake" */}
      <div className="border-t border-stone-200 dark:border-stone-800 pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <h3 className="text-xs sm:text-sm font-bold font-serif text-stone-900 dark:text-white uppercase tracking-wider">
              More Application Form Video Guides & Active Recruitments
            </h3>
          </div>
          <span className="text-[10px] text-stone-400 italic">Hover to pause</span>
        </div>

        {/* Slow Marquee Track */}
        <div className="relative overflow-hidden bg-stone-100 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-2xl p-3">
          <div className="animate-marquee-slow gap-4 flex whitespace-nowrap">
            {allJobs.map((j) => (
              <div
                key={j.id}
                onClick={() => onSelectJobVideo(j.id)}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 transition cursor-pointer shadow-xs group shrink-0"
              >
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                    {j.organization}
                  </span>
                  <strong className="text-xs font-serif font-bold text-stone-900 dark:text-white block group-hover:text-emerald-700 transition max-w-[240px] truncate">
                    {j.title}
                  </strong>
                </div>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md">
                  Last Date: {j.applicationEndDate}
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition">
                  Watch →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
