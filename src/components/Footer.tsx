/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Briefcase, Mail, Phone, MapPin, ExternalLink, 
  BookOpen, Calculator, Award, ShieldAlert, Heart,
  Send, MessageCircle, Youtube, Instagram, Twitter, Facebook, Sparkles
} from 'lucide-react';
import CVLoomLogo from './CVLoomLogo';

interface FooterProps {
  onNavigate: (view: string) => void;
  onSelectTool: (id: string) => void;
  globalSettings?: { [key: string]: string };
}

export default function Footer({ onNavigate, onSelectTool, globalSettings }: FooterProps) {
  const handleToolClick = (toolId: string) => {
    onNavigate('tools');
    onSelectTool(toolId);
  };

  // Dynamic values with clean fallbacks
  const brandTitle = globalSettings?.footer_brand_title || 'CVLoom';
  const brandSubtitle = globalSettings?.footer_brand_subtitle || 'Verified Career & Govt Recruitment Portal';
  const aboutText = globalSettings?.footer_about || 
    "India's trusted, verified career & public notification portal. Empowering millions of aspirants with fast recruitment updates, eligibility checkers, free document tools, and ATS resume builders with zero fees.";
  const email = globalSettings?.footer_email || 'support@cvloom.online';
  const phone = globalSettings?.footer_phone || '+91 11-4562-7890';
  const address = globalSettings?.footer_address || 'Connaught Place, New Delhi, India';
  const disclaimer = globalSettings?.footer_disclaimer || 
    "CVLoom is an independent career & educational portal. We do not represent any government ministry or agency. All updates are curated from official recruitment notifications.";
  const copyright = globalSettings?.footer_copyright || '© 2026 CVLoom Portal. All Rights Reserved.';
  const linksTitle = globalSettings?.footer_links_title || 'Explore Openings';
  const toolsTitle = globalSettings?.footer_tools_title || 'Free Document Tools';
  const policyTitle = globalSettings?.footer_policy_title || 'Verification & Policy';

  // Social Links
  const telegram = globalSettings?.social_telegram || 'https://t.me/sarkariglobal';
  const whatsapp = globalSettings?.social_whatsapp || 'https://chat.whatsapp.com/sarkariglobal';
  const youtube = globalSettings?.social_youtube || 'https://youtube.com/@sarkariglobal';
  const instagram = globalSettings?.social_instagram || '';
  const twitter = globalSettings?.social_twitter || '';
  const facebook = globalSettings?.social_facebook || '';

  // Theme styling (Refined lighter elegant default palette)
  const theme = globalSettings?.footer_theme || 'light-cream';
  let themeClasses = 'bg-[#FAF8F5] dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 shadow-xs';
  if (theme === 'light-slate') {
    themeClasses = 'bg-slate-50 dark:bg-stone-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-stone-800';
  } else if (theme === 'light-mint') {
    themeClasses = 'bg-[#F2FAF6] dark:bg-stone-900 text-emerald-950 dark:text-stone-300 border-emerald-200/70 dark:border-stone-800';
  } else if (theme === 'dark' || theme === 'dark-forest') {
    themeClasses = 'bg-[#0f241a] text-stone-200 border-emerald-950';
  } else if (theme === 'dark-slate') {
    themeClasses = 'bg-stone-900 text-stone-200 border-stone-800';
  }

  return (
    <footer 
      className={`border-t transition-colors duration-200 pt-14 pb-8 ${themeClasses}`} 
      id="app-footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-b border-stone-300 dark:border-stone-800 pb-12 mb-8">
          
          {/* Brand & About Column */}
          <div className="space-y-4">
            <div 
              className="cursor-pointer inline-block" 
              onClick={() => onNavigate('home')}
            >
              <CVLoomLogo size="md" />
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              {aboutText}
            </p>

            {/* Direct Contact Details */}
            <div className="pt-1 text-xs text-stone-700 dark:text-stone-300 space-y-2">
              {email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-emerald-800 dark:hover:text-emerald-300 font-medium">
                    {email}
                  </a>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-emerald-800 dark:hover:text-emerald-300 font-medium">
                    {phone}
                  </a>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span className="text-stone-600 dark:text-stone-400">{address}</span>
                </div>
              )}
            </div>

            {/* Social Media Connect Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {telegram && (
                <a 
                  href={telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors"
                  title="Telegram Updates"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {whatsapp && (
                <a 
                  href={whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                  title="WhatsApp Community"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {youtube && (
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-500/15 text-red-700 dark:text-red-300 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                  title="YouTube Guides"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-500/15 text-pink-700 dark:text-pink-300 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
                  title="Instagram Page"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {twitter && (
                <a 
                  href={twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-500/15 text-stone-700 dark:text-stone-300 hover:bg-stone-900 hover:text-white flex items-center justify-center transition-colors"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {facebook && (
                <a 
                  href={facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider border-l-2 border-emerald-700 dark:border-emerald-500 pl-2.5">
              {linksTitle}
            </h4>
            <ul className="text-xs space-y-2.5 text-stone-600 dark:text-stone-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('govt-jobs')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Central & State Govt Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scholarships')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <Award className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Scholarships & Grants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ngo-jobs')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> NGO & Social Impact Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fellowships')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <Award className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Fellowships & Internships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blogs')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline transition text-left flex items-center gap-1.5 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Career Guidance & Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Free Document Tools Column */}
          <div className="space-y-4">
            <h4 className="text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider border-l-2 border-emerald-700 dark:border-emerald-500 pl-2.5">
              {toolsTitle}
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-stone-600 dark:text-stone-300">
              <button onClick={() => handleToolClick('pdf-converter')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                📄 PDF Merger, Shrink & Split
              </button>
              <button onClick={() => handleToolClick('image-resizer')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                📸 Photo & Signature Resizer
              </button>
              <button onClick={() => handleToolClick('age-calculator')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                🎂 Sarkari Age Calculator
              </button>
              <button onClick={() => handleToolClick('resume-builder')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                💼 ATS Resume & Score Checker
              </button>
              <button onClick={() => handleToolClick('job-eligibility')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                ⚡ Job Eligibility Filter
              </button>
              <button onClick={() => handleToolClick('gst-emi-calc')} className="hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline text-left truncate cursor-pointer py-0.5">
                🧾 GST & EMI Calculator
              </button>
            </div>
          </div>

          {/* Legal, Disclaimer & Verification Column */}
          <div className="space-y-4">
            <h4 className="text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider border-l-2 border-emerald-700 dark:border-emerald-500 pl-2.5">
              {policyTitle}
            </h4>
            <div className="bg-white/80 dark:bg-stone-800/80 p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                100% Free Public Verification
              </span>
              <p>{disclaimer}</p>
            </div>

            <div className="pt-1">
              <button 
                onClick={() => onNavigate('admin')} 
                className="text-xs text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-stone-500" /> Admin Access Portal →
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-stone-500 dark:text-stone-400 text-xs gap-3 pt-2">
          <p className="text-center sm:text-left font-medium">
            {copyright}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-stone-600 dark:text-stone-400 text-xs">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-800 dark:hover:text-emerald-300 transition cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-800 dark:hover:text-emerald-300 transition cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-emerald-800 dark:hover:text-emerald-300 transition cursor-pointer">
              Help &amp; Contact
            </button>
          </div>

          <p className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
            Powered by <strong className="text-stone-800 dark:text-stone-200">CVLoom</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
