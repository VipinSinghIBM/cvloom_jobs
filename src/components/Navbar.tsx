/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, Search, Briefcase, Bookmark, FileText, 
  Settings, Bell, ExternalLink, GraduationCap, Award, ChevronDown,
  Phone, Globe, Sparkles, Wrench
} from 'lucide-react';
import { Job, Notification, NavItem, SiteLogoConfig } from '../types';
import CVLoomLogo from './CVLoomLogo';

interface NavbarProps {
  currentView: string;
  activeSubNav?: string;
  onNavigate: (view: string, subCategory?: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarksCount: number;
  notifications: Notification[];
  navItems: NavItem[];
  onSelectJob: (id: string) => void;
  logoConfig?: SiteLogoConfig;
  onOpenPostJob?: () => void;
  onSelectTool?: (id: string | null) => void;
  currentToolId?: string | null;
}

const TOOLS_NAV_ITEM: NavItem = {
  id: 'tools',
  label: 'Free Tools',
  path: 'tools',
  subnavs: [
    { id: 'image-resizer', label: '📸 Photo & Sign Resizer', description: 'Resize photo & sign in px, cm, inch & KB' },
    { id: 'pdf-converter', label: '📄 PDF & Image Converter', description: 'PDF to JPG, JPG to PDF & compressor' },
    { id: 'age-calculator', label: '🎂 Sarkari Age Calculator', description: 'Exact age relative to cut-off date' },
    { id: 'resume-builder', label: '💼 ATS Resume Builder', description: 'ATS score checker & resume maker' },
    { id: 'job-eligibility', label: '⚡ Job Eligibility Checker', description: 'Find matching govt & state openings' },
    { id: 'qr-generator', label: '📱 QR & Barcode Generator', description: 'Generate document barcodes & QR codes' },
    { id: 'gst-emi-calc', label: '🧾 GST & EMI Calculator', description: 'Loan EMIs and CGST/SGST breakdown' },
    { id: 'text-case-counter', label: '🔤 Word Counter & Case', description: 'Convert case & count words' }
  ]
};

export default function Navbar({ 
  currentView, 
  activeSubNav,
  onNavigate, 
  darkMode, 
  onToggleDarkMode, 
  bookmarksCount,
  notifications,
  navItems,
  onSelectJob,
  logoConfig,
  onOpenPostJob,
  onSelectTool,
  currentToolId
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({});
  const [istTime, setIstTime] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live IST Clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        } as const;
        const formatter = new Intl.DateTimeFormat('en-IN', options);
        setIstTime(formatter.format(new Date()));
      } catch (err) {
        setIstTime(new Date().toLocaleTimeString());
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: string, subCategory?: string) => {
    if (view === 'tools') {
      if (onSelectTool) {
        onSelectTool(subCategory || null);
      } else {
        onNavigate('tools');
      }
    } else {
      onNavigate(view, subCategory);
    }
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileCategory = (id: string) => {
    setMobileExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Ensure Free Tools is always present in top navigation
  const itemsToRender = [...navItems];
  if (!itemsToRender.some(item => item.id === 'tools' || item.path === 'tools')) {
    const blogIndex = itemsToRender.findIndex(item => item.id === 'blogs' || item.path === 'blogs');
    if (blogIndex !== -1) {
      itemsToRender.splice(blogIndex, 0, TOOLS_NAV_ITEM);
    } else {
      itemsToRender.push(TOOLS_NAV_ITEM);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs" id="app-header">
      
      {/* Top Utility Bar (IST Clock, Official Verification badge - 100% CVLoom, Zero external links) */}
      <div className="bg-[#0b1f16] text-stone-200 text-[11px] font-medium py-1.5 px-3 sm:px-4 border-b border-emerald-950/80">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-white font-bold tracking-wide">CVLoom Verified Career Portal</span>
            <span className="hidden sm:inline text-emerald-700/60">|</span>
            <span className="hidden md:inline text-stone-300">100% Free Verified Govt, NGO &amp; Public Opportunities</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-stone-300 font-mono text-[10px]">
            <span className="flex items-center gap-1">
              <span>🕒 IST:</span>
              <strong className="text-white font-semibold">{istTime || 'Live'}</strong>
            </span>
            <span className="hidden sm:inline text-emerald-800">|</span>
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span>100% Free Public Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-18 gap-2 lg:gap-3">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group py-1 shrink-0"
            id="brand-logo-btn"
          >
            <CVLoomLogo size="md" customConfig={logoConfig} />
          </div>

          {/* Desktop Navigation Links - Guaranteed No Wrapping (whitespace-nowrap & overflow-x-auto no-scrollbar) */}
          <nav 
            ref={dropdownRef} 
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 flex-nowrap shrink min-w-0 overflow-x-auto no-scrollbar py-1" 
            id="desktop-main-navigation"
          >
            {itemsToRender.map(item => {
              const hasSubnavs = item.subnavs && item.subnavs.length > 0;
              const isTools = item.id === 'tools' || item.path === 'tools';
              const isActive = isTools 
                ? currentView === 'tools'
                : (currentView === item.path || currentView === item.id);
              const isDropdownOpen = openDropdown === item.id;

              if (hasSubnavs) {
                return (
                  <div key={item.id} className="relative group shrink-0">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-semibold tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#132E22] text-white dark:bg-emerald-700 dark:text-white shadow-xs font-bold ring-1 ring-emerald-900/30'
                          : 'text-stone-700 dark:text-stone-200 hover:text-emerald-900 dark:hover:text-emerald-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/70'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {isTools && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold px-1 rounded-full uppercase tracking-wider hidden 2xl:inline-block">
                          Free
                        </span>
                      )}
                      <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 shrink-0 opacity-70 group-hover:opacity-100 ${isDropdownOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div 
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 top-full pt-1.5 z-50 w-64 animate-fade-in"
                      >
                        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-2xl p-2 space-y-1 ring-1 ring-black/5">
                          {/* Main Category Link */}
                          <button
                            onClick={() => handleNavClick(item.path, '')}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-black text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition flex items-center justify-between cursor-pointer"
                          >
                            <span>All {item.label}</span>
                            <span className="text-[10px] text-emerald-600 font-normal">View All →</span>
                          </button>
                          
                          <div className="border-t border-stone-100 dark:border-stone-800 my-1" />

                          {/* Subnav items */}
                          {item.subnavs?.map(sub => {
                            const isSubActive = isTools ? currentToolId === sub.id : activeSubNav === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleNavClick(item.path, sub.id)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex flex-col cursor-pointer ${
                                  isSubActive
                                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-emerald-700'
                                }`}
                              >
                                <span className="font-bold">{sub.label}</span>
                                {sub.description && (
                                  <span className="text-[10px] text-stone-400 dark:text-stone-500 truncate font-normal">
                                    {sub.description}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Simple nav item (Home, Blog, Contact)
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-semibold tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#132E22] text-white dark:bg-emerald-700 dark:text-white shadow-xs font-bold ring-1 ring-emerald-900/30'
                      : 'text-stone-700 dark:text-stone-200 hover:text-emerald-900 dark:hover:text-emerald-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/70'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities (Post a Job, Dark Mode, Bookmarks, Admin) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Post a Free Job CTA */}
            {onOpenPostJob && (
              <button
                onClick={onOpenPostJob}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs rounded-xl transition shadow-xs hover:shadow-md cursor-pointer tracking-wide whitespace-nowrap shrink-0 ring-1 ring-emerald-600/40"
                title="Post a free job opening"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-200" />
                <span>Post a Job</span>
                <span className="text-[10px] bg-emerald-900/90 px-1.5 py-0.2 rounded text-emerald-200 font-mono">Free</span>
              </button>
            )}

            {/* Bookmarks Shelf */}
            <button
              onClick={() => handleNavClick('bookmarks')}
              title="Saved Bookmarks"
              className="relative p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer shrink-0"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer shrink-0"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0 ${
                currentView === 'admin'
                  ? 'bg-[#132E22] text-white ring-2 ring-emerald-500'
                  : 'bg-stone-800 text-white hover:bg-stone-900 dark:bg-stone-800 dark:hover:bg-stone-700'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Accordion Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2 max-h-[80vh] overflow-y-auto animate-fade-in shadow-2xl">
          {itemsToRender.map(item => {
            const hasSubnavs = item.subnavs && item.subnavs.length > 0;
            const isExpanded = mobileExpanded[item.id];

            if (hasSubnavs) {
              return (
                <div key={item.id} className="border-b border-slate-100 dark:border-slate-800 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="text-left font-bold text-sm text-slate-800 dark:text-slate-200 py-2.5 flex-1"
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => toggleMobileCategory(item.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pl-4 pb-2 space-y-1">
                      <button
                        onClick={() => handleNavClick(item.path, '')}
                        className="w-full text-left py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400"
                      >
                        All {item.label}
                      </button>
                      {item.subnavs?.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(item.path, sub.id)}
                          className="w-full text-left py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 block"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className="w-full text-left py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
}
