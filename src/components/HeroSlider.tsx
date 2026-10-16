/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Search, 
  MapPin, GraduationCap, Flame, Sparkles
} from 'lucide-react';
import { HeroSlide, Notification, Job } from '../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  notifications: Notification[];
  onNavigate: (view: string, subCategory?: string) => void;
  onSelectJob: (jobId: string) => void;
  onSearch: (filters: { title: string; state: string; qualification: string; organization: string }) => void;
  jobs: Job[];
  onOpenPostJob?: () => void;
}

export default function HeroSlider({
  slides,
  notifications,
  onNavigate,
  onSelectJob,
  onSearch,
  jobs,
  onOpenPostJob
}: HeroSliderProps) {
  const activeSlides = slides.filter(s => s.isActive !== false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Search state
  const [keyword, setKeyword] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedQual, setSelectedQual] = useState('');

  // Extract unique filters from jobs
  const states = Array.from(new Set(jobs.map(j => j.state))).filter(Boolean);
  const qualifications = ['10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'ITI / Diploma', 'B.Tech / BE', 'MBBS / Nursing', 'B.Ed / CTET'];

  // Auto-slide effect (every 5.5s, pause on hover)
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
  };

  const handleSlideCta = (link: string) => {
    if (!link) return;
    if (link.startsWith('#job-detail/')) {
      const id = link.replace('#job-detail/', '');
      onSelectJob(id);
    } else if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(link);
    }
  };

  const handleTickerClick = (link: string) => {
    if (!link) return;
    if (link.startsWith('#job-detail/')) {
      const id = link.replace('#job-detail/', '');
      onSelectJob(id);
    } else if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(link);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      title: keyword,
      state: selectedState,
      qualification: selectedQual,
      organization: ''
    });
  };

  const tickerItems = notifications.filter(n => n.isTicker);

  if (activeSlides.length === 0) return null;

  return (
    <div className="w-full">
      {/* 1. Slow Marquee Ticker Header (Direct Link Support & Slow Smooth Speed) */}
      {tickerItems.length > 0 && (
        <div className="bg-[#132E22] border-b border-[#1B3B2B] text-white py-2 px-4 shadow-xs overflow-hidden flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
            {/* Ticker Badge */}
            <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>UPDATES</span>
            </div>

            {/* Marquee Wrapper */}
            <div className="overflow-hidden flex-1 relative">
              <div className="animate-marquee-slow flex items-center whitespace-nowrap gap-12 text-xs md:text-sm font-medium text-stone-200">
                {tickerItems.concat(tickerItems).map((notif, idx) => (
                  <button
                    key={`${notif.id}-${idx}`}
                    onClick={() => handleTickerClick(notif.link)}
                    className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors group cursor-pointer text-left"
                  >
                    <span className="text-amber-400 group-hover:scale-110 transition-transform">⚡</span>
                    <span className="hover:underline underline-offset-4">{notif.message}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Full-Width Edge-to-Edge Image Slider */}
      <div 
        className="w-full relative overflow-hidden bg-stone-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-[400px] sm:h-[440px] md:h-[480px] lg:h-[500px]">
          {/* Slides Stack with Smooth Fade */}
          {activeSlides.map((slide, index) => {
            const isCurrent = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
                  loading="lazy"
                />

                {/* Subtle gradient so text is clear */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent w-full md:w-3/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Pure Floating Text */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16">
                    <div className="max-w-2xl text-white space-y-3.5">
                      
                      {/* Floating Badge */}
                      {slide.badge && (
                        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse ring-2 ring-amber-400/50" />
                          <span>{slide.badge}</span>
                        </div>
                      )}

                      {/* Main Headline */}
                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
                        {slide.title}
                      </h1>

                      {/* Subtitle / Description */}
                      <p className="text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-3">
                        {slide.subtitle}
                      </p>

                      {/* Floating CTA Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleSlideCta(slide.buttonLink)}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-900/40 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>{slide.buttonText || 'Explore Openings'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        {onOpenPostJob && (
                          <button
                            onClick={onOpenPostJob}
                            className="px-5 py-3 bg-[#EAF6E9]/90 hover:bg-[#EAF6E9] text-[#132E22] font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Post a Free Job</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => {
                            const searchInput = document.getElementById('search-jobs-input');
                            if (searchInput) searchInput.focus();
                          }}
                          className="px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm rounded-xl border border-white/30 transition-all drop-shadow-md cursor-pointer"
                        >
                          Search Vacancies
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}

          {/* Navigation Controls: Chevrons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            {activeSlides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlideIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentSlideIndex
                    ? 'w-7 h-2 bg-emerald-500'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/90'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* 3. Search and Quick Filter Bar (Floating clean card anchored below the slider) */}
      <div className="max-w-6xl mx-auto px-4 -mt-7 sm:-mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Keyword Input */}
            <div className="sm:col-span-5 flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                id="portal-keyword-input"
                type="text"
                placeholder="Search job title, board, department..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
            </div>

            {/* State Select */}
            <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="">All States & UTs</option>
                {states.map(st => (
                  <option key={st} value={st} className="text-slate-800 dark:text-slate-900">{st}</option>
                ))}
              </select>
            </div>

            {/* Qualification Select */}
            <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedQual}
                onChange={e => setSelectedQual(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="">Qualification</option>
                {qualifications.map(q => (
                  <option key={q} value={q} className="text-slate-800 dark:text-slate-900">{q}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
