/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, User, Eye, Clock, Share2, 
  ChevronRight, ArrowLeft, Send, Sparkles, TrendingUp,
  Bookmark, CheckCircle, Copy, Check, MessageCircle, 
  Search, BookOpen, ExternalLink, Tag, Play, Video
} from 'lucide-react';
import { Blog } from '../types';
import { SketchBlogArticle, SketchEmptyState } from './SketchIllustrations';

interface BlogSystemProps {
  blogs: Blog[];
  onBackToHome: () => void;
  onSelectBlogId: string | null;
  onSelectBlog: (id: string | null) => void;
  onSelectVideo?: (id: string) => void;
  onUpdateBlogs: (blogs: Blog[]) => void;
}

export default function BlogSystem({ 
  blogs, 
  onBackToHome, 
  onSelectBlogId, 
  onSelectBlog,
  onSelectVideo,
  onUpdateBlogs
}: BlogSystemProps) {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'all', 
    'Career Guidance', 
    'Government Jobs', 
    'Resume Tips', 
    'Interview Tips', 
    'Scholarships', 
    'Education News', 
    'Skill Development'
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
    const matchesQuery = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const activeBlog = blogs.find(b => b.id === onSelectBlogId);

  // Other blogs for the right sidebar (all except active blog)
  const otherBlogs = blogs.filter(b => b.id !== onSelectBlogId);

  // Increment views and scroll to top on active blog change
  useEffect(() => {
    if (activeBlog) {
      document.title = activeBlog.seoTitle || `${activeBlog.title} - Sarkari Global`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeBlog.seoDescription || activeBlog.content.slice(0, 160));
      }

      const updated = blogs.map(b => {
        if (b.id === activeBlog.id) {
          return { ...b, viewsCount: (b.viewsCount || 0) + 1 };
        }
        return b;
      });
      onUpdateBlogs(updated);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.title = 'Career Guidance, Exam Strategies & Blogs - Sarkari Global';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onSelectBlogId]);

  const getBlogUrl = (blog: Blog) => {
    return `${window.location.origin}${window.location.pathname}?blogId=${blog.id}`;
  };

  const handleCopyLink = (blog: Blog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getBlogUrl(blog);
    navigator.clipboard.writeText(url);
    setCopiedId(blog.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareWhatsApp = (blog: Blog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getBlogUrl(blog);
    const text = encodeURIComponent(
      `🏛️ *CVLOOM CAREER & NOTIFICATION GUIDE*\n` +
      `═══════════════════════════\n` +
      `📖 *${blog.title}*\n\n` +
      `${blog.seoDescription ? blog.seoDescription + '\n\n' : ''}` +
      `👉 *Read Full Article & Step-by-Step Video:*\n${url}\n\n` +
      `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
      `_Shared via CVLoom (cvloom.online)_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTelegram = (blog: Blog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getBlogUrl(blog);
    const text = encodeURIComponent(`${blog.title}\n${url}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  };

  const handleShareNative = async (blog: Blog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}?blogId=${blog.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.seoDescription || blog.title,
          url: url,
        });
      } catch {
        handleCopyLink(blog);
      }
    } else {
      handleCopyLink(blog);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !activeBlog) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: commentName.trim(),
      content: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = blogs.map(b => {
      if (b.id === activeBlog.id) {
        return { ...b, comments: [...(b.comments || []), newComment] };
      }
      return b;
    });

    onUpdateBlogs(updated);
    setCommentName('');
    setCommentText('');
    setSuccessMsg('Thank you! Your response was published successfully.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Helper to format inline text cleanly with normal font weight (no bold body text)
  const renderFormattedInline = (text: string) => {
    // Strip any <b> or <strong> tags if present in the source content
    const cleanHtml = text.replace(/<\/?(strong|b)>/gi, '');
    
    // Split by markdown bold markers (**text**) and render them in normal weight
    const parts = cleanHtml.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const clean = part.slice(2, -2);
        return (
          <span 
            key={i} 
            className="font-normal text-stone-900 dark:text-stone-100" 
            style={{ fontWeight: 400 }}
          >
            {clean}
          </span>
        );
      }
      return (
        <span 
          key={i} 
          className="font-normal text-stone-700 dark:text-stone-300"
          style={{ fontWeight: 400 }}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 animate-fade-in" id="blog-system-section">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <button onClick={onBackToHome} className="hover:text-blue-600 transition font-medium cursor-pointer">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        {activeBlog ? (
          <>
            <button onClick={() => onSelectBlog(null)} className="hover:text-blue-600 transition font-medium cursor-pointer">Career Blogs</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs sm:max-w-md">{activeBlog.title}</span>
          </>
        ) : (
          <span className="text-slate-900 dark:text-white font-semibold">Career Blogs & Study Guides</span>
        )}
      </div>

      {activeBlog ? (
        /* ================= FULL PAGE BLOG ARTICLE VIEW WITH RIGHT SIDEBAR ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Full View (lg:col-span-8) */}
          <article 
            className="lg:col-span-8 bg-white dark:bg-stone-900 p-6 md:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 font-normal"
            style={{ fontWeight: 400 }}
          >
            
            {/* Back Button & Category Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <button 
                type="button"
                onClick={() => onSelectBlog(null)}
                className="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5 cursor-pointer font-serif"
                id="back-to-blogs-btn"
              >
                <ArrowLeft className="w-4 h-4" /> All Articles & Insights
              </button>

              <span className="tag-orange">
                {activeBlog.category}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-stone-900 dark:text-white leading-tight tracking-tight">
              {activeBlog.title}
            </h1>

            {/* Author, Date, Reading Time, and Reads Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-normal border-y border-stone-100 dark:border-stone-800 py-3.5">
              <span className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 font-medium">
                <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                {activeBlog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {activeBlog.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {activeBlog.readingTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                {activeBlog.viewsCount || 1} reads
              </span>
            </div>

            {/* Interactive Share Action Strip */}
            <div className="bg-[#EAF6E9] dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-serif text-emerald-950 dark:text-emerald-100 tracking-wide">Share This Article</h4>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-normal">Help fellow candidates & professionals prepare and grow</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => handleShareWhatsApp(activeBlog, e)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleCopyLink(activeBlog, e)}
                  className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                    copiedId === activeBlog.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                  title="Copy link to clipboard"
                >
                  {copiedId === activeBlog.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === activeBlog.id ? 'Copied!' : 'Copy Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleShareNative(activeBlog, e)}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs transition flex items-center justify-center shadow-sm cursor-pointer"
                  title="More share options"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dedicated 'For More Information Watch Video' Guidance Banner */}
            <div className="bg-gradient-to-r from-red-950 via-stone-900 to-stone-900 text-white p-4.5 rounded-2xl border border-red-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-md">
                  <Play className="w-5 h-5 fill-current text-white ml-0.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 block">
                    🔴 Subject Video Guidance Available
                  </span>
                  <h4 className="text-sm md:text-base font-bold font-serif text-white">
                    {activeBlog.videoTutorialTitle || `For More Information: Watch ${activeBlog.title} Video Guide`}
                  </h4>
                  <p className="text-[11px] text-stone-300">
                    Watch in-depth walkthrough on YouTube with official syllabus and direct apply links.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectVideo && onSelectVideo(activeBlog.id)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>▶ For More Information Watch Video</span>
                </button>

                {activeBlog.applyUrl && (
                  <a
                    href={activeBlog.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <span>👉 Now Apply</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {activeBlog.featuredImage && (
              <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs">
                <img 
                  src={activeBlog.featuredImage} 
                  alt={activeBlog.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}

            {/* Formatted Blog Body: Explicit font-normal and normal text-base size for clean reading */}
            <div 
              className="max-w-none text-stone-700 dark:text-stone-300 leading-relaxed text-base space-y-4 pt-2 font-normal"
              style={{ fontWeight: 400 }}
            >
              {activeBlog.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white mt-7 mb-3 pt-3.5 border-t border-stone-100 dark:border-stone-800 tracking-tight">
                      {trimmed.replace(/^##\s+/, '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg font-bold font-serif text-stone-800 dark:text-stone-100 mt-5 mb-2 tracking-tight">
                      {trimmed.replace(/^###\s+/, '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('*   ') || trimmed.startsWith('-   ')) {
                  const items = trimmed.split('\n').filter(Boolean).map(item => item.replace(/^[\*\-]\s+/, ''));
                  return (
                    <ul 
                      key={idx} 
                      className="list-disc list-inside space-y-2.5 pl-2 text-stone-700 dark:text-stone-300 font-normal leading-relaxed text-base"
                      style={{ fontWeight: 400 }}
                    >
                      {items.map((item, itemIdx) => (
                        <li 
                          key={itemIdx} 
                          className="font-normal text-stone-700 dark:text-stone-300"
                          style={{ fontWeight: 400 }}
                        >
                          {renderFormattedInline(item)}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p 
                    key={idx} 
                    className="whitespace-pre-line leading-relaxed font-normal text-stone-700 dark:text-stone-300 text-base"
                    style={{ fontWeight: 400 }}
                  >
                    {renderFormattedInline(paragraph)}
                  </p>
                );
              })}
            </div>

            {/* Tags Footer */}
            {activeBlog.tags && activeBlog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
                  <Tag className="w-3.5 h-3.5" /> Topics:
                </span>
                {activeBlog.tags.map(t => (
                  <span 
                    key={t} 
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-normal border border-slate-200/60 dark:border-slate-700/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Article Share Prompt */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
              <div>
                <strong className="block text-sm font-semibold text-slate-900 dark:text-white">Help other students prepare better</strong>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">Share this guide with study groups & exam circles</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleShareWhatsApp(activeBlog, e)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Share on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={(e) => handleCopyLink(activeBlog, e)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === activeBlog.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === activeBlog.id ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Interactive Comments Section */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Discussion & Questions</span>
                <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                  {activeBlog.comments?.length || 0}
                </span>
              </h3>
              
              <div className="space-y-3">
                {activeBlog.comments && activeBlog.comments.length > 0 ? (
                  activeBlog.comments.map(comment => (
                    <div key={comment.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5 text-xs">
                          <User className="w-3.5 h-3.5 text-blue-500" />
                          {comment.author}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{comment.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-normal pl-4 border-l-2 border-blue-500/30 mt-1 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">No comments yet. Be the first to start the discussion!</p>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Leave a Response</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Rahul Sharma)"
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your study question, insight, or advice here..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-blue-500 leading-relaxed font-normal"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Response
                </button>
              </form>

              {successMsg && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-center text-xs font-medium border border-emerald-200 dark:border-emerald-800 animate-fade-in">
                  {successMsg}
                </div>
              )}
            </div>

          </article>

          {/* ================= RIGHT SIDEBAR: OTHER BLOG LISTINGS ================= */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Other Blogs Listing Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Other Career Articles</span>
                </h3>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {otherBlogs.length}
                </span>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/80">
                {otherBlogs.map(otherBlog => (
                  <div 
                    key={otherBlog.id}
                    className="pt-4 first:pt-0 group flex flex-col gap-2 cursor-pointer"
                    onClick={() => {
                      onSelectBlog(otherBlog.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="flex gap-3">
                      {otherBlog.featuredImage && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                          <img 
                            src={otherBlog.featuredImage} 
                            alt={otherBlog.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                          {otherBlog.category}
                        </span>
                        <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug line-clamp-2 mt-0.5">
                          {otherBlog.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1 font-normal">
                          <span>{otherBlog.readingTime}</span>
                          <span>•</span>
                          <span>{otherBlog.publishDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Read + Share actions for sidebar item */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBlog(otherBlog.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        Read Article <ChevronRight className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleShareWhatsApp(otherBlog, e)}
                          title="Share on WhatsApp"
                          className="p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(otherBlog, e)}
                          title="Copy Link"
                          className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition cursor-pointer"
                        >
                          {copiedId === otherBlog.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Advice Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm tracking-wide uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Trending Study Tips</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Stay updated with official syllabus changes, exam dates, syllabus updates, and preparation blueprints from verified sources.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectBlog(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition text-center cursor-pointer"
                >
                  Browse All Categories
                </button>
              </div>
            </div>

          </aside>

        </div>
      ) : (
        /* ================= MAIN BLOG FEED & LISTING GRID ================= */
        <div className="space-y-8">
          
          {/* Header Banner with SketchBlogArticle */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white p-6 sm:p-10 overflow-hidden shadow-xl border border-emerald-900/40">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KNOWLEDGE & CAREER HUB</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
                  Career Guidance, Insights & Study Notes
                </h1>

                <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  Expert career strategies, exam blueprints, impact sector insights, and official interview preparation guides.
                </p>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                        activeCategory === cat 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40' 
                          : 'bg-white/10 text-stone-200 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      {cat === 'all' ? 'All Guides' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sketch Illustration */}
              <div className="shrink-0 hidden md:block">
                <SketchBlogArticle className="w-52 h-40 drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword (e.g. UPSC, Resume, Interview)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-xs sm:text-sm shadow-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950/40 transition font-normal"
                id="blog-search-input"
              />
            </div>
          </div>

          {/* Blog Cards Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => (
                <div 
                  key={blog.id}
                  onClick={() => {
                    onSelectBlog(blog.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white dark:bg-stone-900 hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-600 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 transition duration-200 cursor-pointer flex flex-col justify-between group"
                  id={`blog-card-${blog.id}`}
                >
                  <div className="space-y-3.5">
                    {/* Featured Image or Sketch Backdrop */}
                    {blog.featuredImage ? (
                      <div className="rounded-2xl overflow-hidden aspect-video border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 group-hover:scale-[1.01] transition duration-300">
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl overflow-hidden aspect-video border border-stone-200 bg-[#FAF9F5] flex items-center justify-center">
                        <SketchBlogArticle className="w-32 h-24" />
                      </div>
                    )}

                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="tag-orange">
                        {blog.category}
                      </span>
                      <span className="text-stone-400 font-normal">
                        {blog.publishDate}
                      </span>
                    </div>

                    {/* Title in EB Garamond */}
                    <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt with regular font weight and clear reading size */}
                    <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-3 leading-relaxed font-normal">
                      {blog.content.replace(/##|###|\*|\-/g, '').slice(0, 140)}...
                    </p>
                  </div>

                  {/* Card Bottom: Metrics + READ ARTICLE BUTTON + SHARE BUTTONS */}
                  <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-normal text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readingTime}
                    </span>

                    {/* Action buttons: Read + Share */}
                    <div className="flex items-center gap-1.5">
                      {/* WhatsApp Share */}
                      <button
                        type="button"
                        onClick={(e) => handleShareWhatsApp(blog, e)}
                        title="Share on WhatsApp"
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-xl text-xs font-semibold transition flex items-center justify-center cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy Share Link */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(blog, e)}
                        title="Copy Share Link"
                        className={`p-2 rounded-xl text-xs font-semibold transition flex items-center justify-center cursor-pointer ${
                          copiedId === blog.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {copiedId === blog.id ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* For More Info Watch Video Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectVideo) onSelectVideo(blog.id);
                          else onSelectBlog(blog.id);
                        }}
                        title={blog.videoTutorialTitle || `Watch Video Guidance for ${blog.title}`}
                        className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-current text-red-600" />
                        <span>Watch Video</span>
                      </button>

                      {/* Working Read Article Button in PurposeHire Style */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBlog(blog.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        id={`read-article-btn-${blog.id}`}
                        className="px-3.5 py-1.5 bg-[#1B3B2B] hover:bg-[#132E22] text-white rounded-xl text-xs font-bold font-serif transition flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span>Read →</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-lg mx-auto space-y-3">
              <div className="flex justify-center">
                <SketchEmptyState className="w-36 h-28" />
              </div>
              <p className="text-stone-700 dark:text-stone-300 font-bold font-serif text-lg">No articles match your search criteria</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                className="text-emerald-700 font-bold text-xs hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
