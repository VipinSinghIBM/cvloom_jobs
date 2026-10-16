/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Image, FileText, Calculator, Eye, Sparkles, Check, Copy, 
  RefreshCw, Download, FileCode, CheckCircle, Upload, AlertCircle, 
  Trash2, FileDown, Briefcase, Award, Zap, Shield, HelpCircle,
  Share2, MessageCircle
} from 'lucide-react';
import { Job } from '../types';
import {
  AgeCalculatorTool,
  ImageResizerTool,
  PdfConverterTool,
  QrGeneratorTool,
  GstEmiCalcTool,
  TextCaseCounterTool,
  JsonFormatterTool,
  SeoGeneratorTool,
  ResumeBuilderTool,
  CoverLetterGenTool,
  JobEligibilityTool
} from './SubTools';

interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: 'image-pdf' | 'calculators' | 'dev-text' | 'careers';
  icon: React.ReactNode;
  seoTitle: string;
  seoDesc: string;
}

interface FreeToolsProps {
  onBackToHome: () => void;
  jobs: Job[];
  currentToolId?: string | null;
  onSelectTool: (id: string | null) => void;
}

export default function FreeTools({ onBackToHome, jobs, currentToolId, onSelectTool }: FreeToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'image-pdf' | 'calculators' | 'dev-text' | 'careers'>('all');
  const [copiedToolUrl, setCopiedToolUrl] = useState(false);

  const tools: ToolItem[] = [
    {
      id: 'image-resizer',
      name: 'Image Resizer & Crop',
      description: 'Resize and crop photographs and signatures to exact dimensions (px/KB) required for online applications.',
      category: 'image-pdf',
      icon: <Image className="w-5 h-5" />,
      seoTitle: 'Online Photo Resizer for Government Job Applications - Sarkari Global',
      seoDesc: 'Resize passport photos, signatures, and document scans to exact width, height, and KB limit required by UPSC, SSC, and state exam portals.'
    },
    {
      id: 'pdf-converter',
      name: 'PDF & Image Converter',
      description: 'Convert JPG to PDF, PNG to JPG, PDF to JPG, and compress files below 100KB/200KB limit.',
      category: 'image-pdf',
      icon: <FileText className="w-5 h-5" />,
      seoTitle: 'Free Image and PDF Converter & Compressor - Sarkari Global',
      seoDesc: 'Convert JPG to PDF, PNG to JPG, PDF to JPG, and merge files instantly. Ideal for uploading educational certificates on job portals.'
    },
    {
      id: 'qr-generator',
      name: 'QR & Barcode Generator',
      description: 'Create custom QR codes or barcodes for application tracking links or document IDs instantly.',
      category: 'image-pdf',
      icon: <Zap className="w-5 h-5" />,
      seoTitle: 'Dynamic QR Code & Barcode Generator Online - Sarkari Global',
      seoDesc: 'Generate scannable barcodes and QR codes for web URLs, digital badges, and application tracking numbers. Fully responsive and free.'
    },
    {
      id: 'age-calculator',
      name: 'Age Calculator',
      description: 'Calculate your exact age in years, months, and days relative to job advertisement cut-off dates.',
      category: 'calculators',
      icon: <Calculator className="w-5 h-5" />,
      seoTitle: 'Sarkari Age Calculator for Job Cut-Off Dates - Sarkari Global',
      seoDesc: 'Check your exact age as of notification eligibility dates. Find out years, months, days, and countdown to your next birthday.'
    },
    {
      id: 'gst-emi-calc',
      name: 'GST & EMI Calculator',
      description: 'Calculate CGST/SGST breakdown or compute monthly loan EMIs with beautiful repayment stats.',
      category: 'calculators',
      icon: <Calculator className="w-5 h-5" />,
      seoTitle: 'GST & Loan EMI Calculator Online - Sarkari Global',
      seoDesc: 'Calculate GST rates or calculate bank loan EMIs, interest rates, tenure, and detailed repayment breakdowns instantly.'
    },
    {
      id: 'text-case-counter',
      name: 'Text Converter & Counter',
      description: 'Convert text case (UPPER, lower, Title Case) and count characters/words in real-time.',
      category: 'dev-text',
      icon: <FileCode className="w-5 h-5" />,
      seoTitle: 'Word Counter & Case Converter - Sarkari Global',
      seoDesc: 'Count words, characters, reading time and convert case format dynamically. Essential for essay preparation and resume descriptions.'
    },
    {
      id: 'json-formatter',
      name: 'JSON/HTML/CSS Dev Helper',
      description: 'Format JSON, clean HTML code, and minify CSS/JS files instantly for fast loading.',
      category: 'dev-text',
      icon: <FileCode className="w-5 h-5" />,
      seoTitle: 'JSON Formatter, HTML Cleaner & CSS/JS Minifier - Sarkari Global',
      seoDesc: 'Format, validate and compress code strings instantly. Free developer tools tailored for fast web performance.'
    },
    {
      id: 'seo-generator',
      name: 'Meta Tag & Robots.txt Generator',
      description: 'Generate SEO optimized Meta Tags, Sitemap templates, and Robots.txt files to boost indexing.',
      category: 'dev-text',
      icon: <Sparkles className="w-5 h-5" />,
      seoTitle: 'Meta Tag & Robots.txt SEO Code Generator - Sarkari Global',
      seoDesc: 'Create search engine optimized meta headers, sitemap lists, and robots instructions to rank first on search result indices.'
    },
    {
      id: 'resume-builder',
      name: 'ATS Resume Builder & Analyzer',
      description: 'Create a highly professional ATS-friendly resume and score its compatibility against job descriptions.',
      category: 'careers',
      icon: <Briefcase className="w-5 h-5" />,
      seoTitle: 'ATS Resume Builder & Score Analyzer - Sarkari Global',
      seoDesc: 'Build premium resumes styled for Applicant Tracking Systems (ATS). Analyze resume score against job requirements with AI-powered tips.'
    },
    {
      id: 'cover-letter-gen',
      name: 'Cover Letter Generator',
      description: 'Generate elegant, personalized cover letters matching the requirements of any organization.',
      category: 'careers',
      icon: <Sparkles className="w-5 h-5" />,
      seoTitle: 'Interactive Cover Letter Generator - Sarkari Global',
      seoDesc: 'Generate highly customized cover letters and application emails in seconds. Fill in job titles and download immediate text templates.'
    },
    {
      id: 'job-eligibility',
      name: 'Job Eligibility Checker',
      description: 'Enter your age, qualifications, and state to find matching central and state government jobs instantly.',
      category: 'careers',
      icon: <Award className="w-5 h-5" />,
      seoTitle: 'Government Job Eligibility Checker 2026 - Sarkari Global',
      seoDesc: 'Instantly find matching central and state PSC jobs matching your qualification, gender, category and age.'
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeTool = tools.find(t => t.id === currentToolId);

  // Set SEO Meta values when tool changes
  useEffect(() => {
    if (activeTool) {
      document.title = activeTool.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTool.seoDesc);
      }
    } else {
      document.title = 'Free Online Career & Document Utilities - Sarkari Global by CVLoom';
    }
  }, [currentToolId, activeTool]);

  const handleBack = () => {
    if (activeTool) {
      // Return to All Tools directory when inside an individual tool
      onSelectTool(null);
    } else {
      // Return to previous view or Home
      if (window.history.length > 1) {
        window.history.back();
      } else {
        onBackToHome();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 animate-fade-in" id="free-tools-page">
      {/* 1. Breadcrumbs & Single Unified Back Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-stone-400 mb-4 bg-slate-50 dark:bg-stone-900 p-3 rounded-2xl border border-slate-200 dark:border-stone-800">
        <div className="flex items-center space-x-2">
          {/* ONLY ONE PROMINENT BACK BUTTON */}
          <button 
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition cursor-pointer shadow-xs"
            title={activeTool ? "Back to All Tools Directory" : "Back to Home"}
            id="tool-single-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{activeTool ? '← Back to All Tools' : '← Back to Home'}</span>
          </button>

          <span className="text-stone-300 dark:text-stone-700">|</span>
          <button 
            type="button"
            onClick={onBackToHome} 
            className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          {activeTool ? (
            <>
              <button 
                type="button"
                onClick={() => onSelectTool(null)} 
                className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition cursor-pointer"
              >
                Free Tools
              </button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-bold">{activeTool.name}</span>
            </>
          ) : (
            <span className="text-slate-900 dark:text-white font-bold">Free Tools Directory</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 font-medium text-xs transition cursor-pointer"
          >
            <span>🏠 Home</span>
          </button>
        </div>
      </div>

      {/* 2. Direct Tools Horizontal Sub-Navbar */}
      <div className="mb-6 overflow-x-auto pb-1.5 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max bg-white dark:bg-stone-900 p-2 rounded-2xl border border-slate-200 dark:border-stone-800 shadow-xs">
          <button
            type="button"
            onClick={() => onSelectTool(null)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              !activeTool 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-700 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-stone-800'
            }`}
          >
            <span>📁 All Tools</span>
          </button>
          <div className="w-px h-5 bg-slate-200 dark:bg-stone-700 mx-1" />
          {tools.map(t => {
            const isCurrent = activeTool?.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTool(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTool ? (
        <div>
          {/* Active Tool View */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400 text-3xl shadow-xs border border-blue-100 dark:border-blue-900/40 shrink-0">
                {activeTool.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-full uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                    {activeTool.category.replace('-', ' & ')}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full uppercase">
                    100% Free Tool
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">{activeTool.name}</h1>
                <p className="text-slate-600 dark:text-stone-300 text-xs mt-0.5 max-w-xl">{activeTool.description}</p>
              </div>
            </div>

            {/* Direct Tool Share & Link Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => {
                  const url = `${window.location.origin}${window.location.pathname}?tool=${activeTool.id}`;
                  navigator.clipboard.writeText(url);
                  setCopiedToolUrl(true);
                  setTimeout(() => setCopiedToolUrl(false), 2500);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  copiedToolUrl
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                title="Copy Direct Tool URL for SEO & Sharing"
              >
                {copiedToolUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToolUrl ? 'Direct Link Copied!' : 'Copy Direct Tool Link'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = `https://cvloom.online/jobs?tool=${activeTool.id}`;
                  const text = encodeURIComponent(
                    `🏛️ *CVLOOM FREE RECRUITMENT UTILITY*\n` +
                    `═══════════════════════════\n` +
                    `🛠️ *${activeTool.name}*\n` +
                    `${activeTool.description}\n\n` +
                    `👉 *Free Instant Online Tool Link:*\n${url}\n\n` +
                    `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
                    `_100% Free • No Sign-up Needed • CVLoom (cvloom.online)_`
                  );
                  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                }}
                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition cursor-pointer shadow-xs"
                title="Share tool on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left/Main Tool Area */}
            <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <ToolEngine key={activeTool.id} toolId={activeTool.id} jobs={jobs} />
            </div>

            {/* Sidebar / Additional Info */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-5 rounded-2xl">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Premium CV Builder
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Transform your professional profile into a fully customized, ATS-vetted resume on the CVLoom ecosystem.
                </p>
                <a 
                  href="https://cvloom.online" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full py-2.5 text-center bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold transition shadow-md"
                >
                  Create Premium Resume
                </a>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                <h3 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Privacy & Trust Guaranteed
                </h3>
                <ul className="text-xs text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <span>All rendering and calculation is executed <strong>entirely client-side</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <span>No files, images, or resume documents are ever uploaded to a database or server.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <span>Sarkari Global by CVLoom operates under strict data safety mandates.</span>
                  </li>
                </ul>
              </div>

              {/* Other Quick Tools List */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                <h3 className="font-semibold text-slate-800 text-sm mb-3">Other Useful Tools</h3>
                <div className="space-y-2">
                  {tools.filter(t => t.id !== activeTool.id).slice(0, 5).map(t => (
                    <button
                      key={t.id}
                      onClick={() => onSelectTool(t.id)}
                      className="w-full text-left p-2.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-lg transition flex items-center space-x-3 text-xs font-medium text-slate-700"
                    >
                      <span className="p-1.5 bg-slate-100 text-slate-600 rounded">
                        {t.icon}
                      </span>
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tool specific SEO Details */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Frequently Asked Questions (FAQ) & General Guidance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1.5">How does the {activeTool.name} work?</h4>
                <p>
                  Sarkari Global integrates top-tier Javascript calculations that run instantly inside your browser. This provides secure, local, ultra-fast performance without risking data leaks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1.5">Are these tools accepted by UPSC & SSC portals?</h4>
                <p>
                  Yes! All resizers and converters are calibrated to generate sizes (such as exactly under 50KB or 200KB) and dimensions required by official Central & State government job platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation for Active Tool */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm group"
              id="bottom-back-btn"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>← Back to Previous Screen</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectTool(null)}
                className="px-3.5 py-2.5 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-slate-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs"
              >
                📁 Browse All 11+ Tools
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-sm"
              >
                🏠 Return to Home Portal
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div>
          {/* Quick Back to Home Button in Tools Directory */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 hover:border-emerald-500 rounded-xl font-bold text-xs text-slate-800 dark:text-stone-200 transition shadow-xs cursor-pointer group"
              id="directory-back-home-btn"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>← Back to Home Portal</span>
            </button>
            <span className="text-xs text-slate-500 dark:text-stone-400 font-mono">11 Free Online Tools Available</span>
          </div>

          {/* Hero Section */}
          <div className="text-center py-10 md:py-16 bg-slate-900 rounded-3xl text-white mb-12 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
 
            <span className="text-xs font-semibold px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full uppercase tracking-wider border border-blue-500/30">
              CVLoom Developer Tools
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">Free Online Career & Job Utilities</h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
              Instantly resize application photos, compress documents, analyze resume ATS compatibility, generate cover letters, and check eligibility completely free.
            </p>
 
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-xl mx-auto bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'image-pdf', label: 'Image & PDF' },
                { id: 'calculators', label: 'Calculators' },
                { id: 'dev-text', label: 'Dev & Text' },
                { id: 'careers', label: 'Careers' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
 
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search tools... e.g. age calculator, pdf, ATS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl bg-white text-slate-800 shadow-sm outline-none transition text-sm"
              id="tool-search-input"
            />
          </div>
 
          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <div 
                  key={tool.id} 
                  onClick={() => onSelectTool(tool.id)}
                  className="bg-white hover:bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition duration-300 cursor-pointer flex flex-col justify-between group"
                  id={`tool-card-${tool.id}`}
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                      {tool.icon}
                    </div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {tool.category.replace('-', ' & ')}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition">
                      {tool.name}
                    </h3>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Launch Utility</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition duration-300">→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No tools found matching your filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                className="text-blue-600 font-semibold text-sm mt-2 hover:underline"
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

/* ==========================================
   DEDICATED INTERACTIVE TOOL IMPLEMENTATIONS
   ========================================== */

function ToolEngine({ toolId, jobs }: { toolId: string; jobs: Job[]; key?: string }) {
  switch (toolId) {
    case 'age-calculator':
      return <AgeCalculatorTool key="age-calculator" />;
    case 'image-resizer':
      return <ImageResizerTool key="image-resizer" />;
    case 'pdf-converter':
      return <PdfConverterTool key="pdf-converter" />;
    case 'qr-generator':
      return <QrGeneratorTool key="qr-generator" />;
    case 'gst-emi-calc':
      return <GstEmiCalcTool key="gst-emi-calc" />;
    case 'text-case-counter':
      return <TextCaseCounterTool key="text-case-counter" />;
    case 'json-formatter':
      return <JsonFormatterTool key="json-formatter" />;
    case 'seo-generator':
      return <SeoGeneratorTool key="seo-generator" />;
    case 'resume-builder':
      return <ResumeBuilderTool key="resume-builder" />;
    case 'cover-letter-gen':
      return <CoverLetterGenTool key="cover-letter-gen" />;
    case 'job-eligibility':
      return <JobEligibilityTool key="job-eligibility" jobs={jobs} />;
    default:
      return (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-sm animate-pulse">
          <AlertCircle className="w-10 h-10 mx-auto text-slate-400 mb-2" />
          Interactive utility engine currently launching in background context...
        </div>
      );
  }
}
