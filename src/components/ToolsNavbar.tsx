/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { 
  Wrench, Image, FileText, Calculator, Briefcase, Award, 
  QrCode, Percent, FileCode, Sparkles, ChevronLeft, ChevronRight,
  ExternalLink, Layers
} from 'lucide-react';

interface ToolsNavbarProps {
  currentView: string;
  currentToolId: string | null;
  onSelectTool: (id: string | null) => void;
}

export interface QuickToolItem {
  id: string;
  name: string;
  shortLabel: string;
  badge?: string;
  icon: React.ReactNode;
  category: 'image-pdf' | 'calculators' | 'dev-text' | 'careers';
}

export const QUICK_TOOLS: QuickToolItem[] = [
  {
    id: 'image-resizer',
    name: 'Photo & Signature Resizer',
    shortLabel: '📸 Photo Resizer',
    badge: 'Popular',
    icon: <Image className="w-3.5 h-3.5" />,
    category: 'image-pdf'
  },
  {
    id: 'pdf-converter',
    name: 'PDF to JPG & Image to PDF',
    shortLabel: '📄 PDF ↔ JPG',
    badge: 'Hot',
    icon: <FileText className="w-3.5 h-3.5" />,
    category: 'image-pdf'
  },
  {
    id: 'age-calculator',
    name: 'Sarkari Age Calculator',
    shortLabel: '🎂 Age Calculator',
    badge: 'UPSC/SSC',
    icon: <Calculator className="w-3.5 h-3.5" />,
    category: 'calculators'
  },
  {
    id: 'resume-builder',
    name: 'ATS Resume Builder',
    shortLabel: '💼 Resume Maker',
    badge: 'ATS Score',
    icon: <Briefcase className="w-3.5 h-3.5" />,
    category: 'careers'
  },
  {
    id: 'job-eligibility',
    name: 'Job Eligibility Checker',
    shortLabel: '⚡ Eligibility',
    icon: <Award className="w-3.5 h-3.5" />,
    category: 'careers'
  },
  {
    id: 'qr-generator',
    name: 'QR & Barcode Generator',
    shortLabel: '📱 QR Code',
    icon: <QrCode className="w-3.5 h-3.5" />,
    category: 'image-pdf'
  },
  {
    id: 'gst-emi-calc',
    name: 'GST & Loan EMI Calculator',
    shortLabel: '🧾 GST / EMI',
    icon: <Percent className="w-3.5 h-3.5" />,
    category: 'calculators'
  },
  {
    id: 'text-case-counter',
    name: 'Word Counter & Case Converter',
    shortLabel: '🔤 Word Counter',
    icon: <FileCode className="w-3.5 h-3.5" />,
    category: 'dev-text'
  },
  {
    id: 'cover-letter-gen',
    name: 'Cover Letter Generator',
    shortLabel: '✉️ Cover Letter',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    category: 'careers'
  },
  {
    id: 'json-formatter',
    name: 'JSON / Dev Helper',
    shortLabel: '💻 Dev Formatter',
    icon: <FileCode className="w-3.5 h-3.5" />,
    category: 'dev-text'
  },
  {
    id: 'seo-generator',
    name: 'Meta Tag SEO Generator',
    shortLabel: '🔍 SEO Meta',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    category: 'dev-text'
  }
];

export default function ToolsNavbar({ currentView, currentToolId, onSelectTool }: ToolsNavbarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isToolsView = currentView === 'tools';

  return (
    <div className="bg-[#0f241a] dark:bg-stone-900 border-b border-[#1b3d2c] dark:border-stone-800 shadow-md transition-all sticky top-16 md:top-18 z-40" id="tools-quick-navbar">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-2 py-1.5 md:py-2">
          
          {/* Left Brand Badge for Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectTool(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition cursor-pointer group"
              title="View all free utilities"
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline font-mono tracking-wide text-[11px] uppercase">Free Tools</span>
              <span className="sm:hidden font-mono text-[10px]">Tools</span>
              <span className="text-[9px] bg-emerald-400 text-[#0f241a] font-black px-1.5 py-0.2 rounded-full hidden md:inline">
                11+ Free
              </span>
            </button>
            <div className="hidden lg:block w-px h-4 bg-emerald-800/80" />
          </div>

          {/* Left Scroll Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden sm:flex items-center justify-center p-1 rounded-md text-emerald-300/70 hover:text-white hover:bg-emerald-800/50 transition cursor-pointer shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Scrollable Tools Horizontal List */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {QUICK_TOOLS.map((tool) => {
              const isActive = isToolsView && currentToolId === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-emerald-400 text-stone-950 border-emerald-300 font-bold shadow-sm ring-1 ring-emerald-300'
                      : 'bg-emerald-950/40 text-stone-200 border-emerald-900/60 hover:bg-emerald-900/70 hover:text-white hover:border-emerald-700'
                  }`}
                  title={tool.name}
                >
                  <span className="opacity-90">{tool.icon}</span>
                  <span className="text-[11px] md:text-xs font-medium">{tool.shortLabel}</span>
                  {tool.badge && !isActive && (
                    <span className="text-[8px] bg-amber-400 text-stone-950 font-black px-1 rounded-full uppercase leading-tight hidden lg:inline">
                      {tool.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden sm:flex items-center justify-center p-1 rounded-md text-emerald-300/70 hover:text-white hover:bg-emerald-800/50 transition cursor-pointer shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Right Action: All Tools Hub Button */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onSelectTool(null)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                isToolsView && !currentToolId
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-black shadow-sm'
                  : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border-emerald-700/50 hover:text-white'
              }`}
              title="Browse all 11+ Free Tools"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] whitespace-nowrap font-semibold">
                {isToolsView && !currentToolId ? '📁 All Tools' : 'All Tools →'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
