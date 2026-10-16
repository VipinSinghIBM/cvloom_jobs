/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Landmark, MapPin, Bookmark, Share2, 
  Printer, ShieldCheck, Download, ExternalLink, HelpCircle, 
  FileText, Briefcase, ChevronRight, AlertCircle, Sparkles, CheckCircle,
  Clock, Award, Users, ChevronDown, ChevronUp, Check, Copy, MessageCircle,
  Play, Video
} from 'lucide-react';
import { Job } from '../types';
import CVLoomLogo from './CVLoomLogo';
import { getLogoConfig } from '../utils/storage';
import { SketchJobSearch } from './SketchIllustrations';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onToggleBookmark: (id: string) => void;
  isSaved: boolean;
  allJobs: Job[];
  onSelectJob: (id: string) => void;
  onSelectVideo?: (id: string) => void;
  onNavigateToCategory: (category: string, subCategory?: string) => void;
  onNavigateToTools: () => void;
  onSelectTool: (id: string) => void;
  globalSettings?: { [key: string]: string };
}

export default function JobDetail({ 
  job, 
  onBack, 
  onToggleBookmark, 
  isSaved, 
  allJobs, 
  onSelectJob,
  onSelectVideo,
  onNavigateToCategory,
  onNavigateToTools,
  onSelectTool,
  globalSettings
}: JobDetailProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Set page meta details dynamically for SEO
  useEffect(() => {
    document.title = job.seoTitle || `${job.title} - Sarkari Global by CVLoom`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', job.seoDescription || job.shortDescription);
    }
  }, [job]);

  const handleBack = () => {
    // Always navigate back to the exact listing/category screen where the user came from
    onBack();
  };

  const getDirectJobUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}${window.location.pathname}?jobId=${job.id}`;
    }
    return `https://cvloom.online/jobs?jobId=${job.id}`;
  };

  // WhatsApp share handler with official CVLoom logo & branding
  const handleWhatsAppShare = () => {
    const directUrl = getDirectJobUrl();
    const message = `🏛️ *CVLOOM OFFICIAL RECRUITMENT ALERT*\n` +
      `═══════════════════════════\n` +
      `📌 *${job.title}*\n\n` +
      `🏢 *Organization:* ${job.organization}\n` +
      `💼 *Post Name:* ${job.postName || job.title}\n` +
      `👥 *Total Vacancies:* ${job.totalVacancies > 0 ? job.totalVacancies.toLocaleString() : 'Multiple Positions'}\n` +
      `📅 *Notification Date:* ${job.notificationDate || job.applicationStartDate}\n` +
      `⏳ *Last Date to Apply:* ${job.applicationEndDate}\n` +
      `💰 *Salary / Pay Scale:* ${job.salary || 'As per government norms'}\n` +
      `📍 *Location:* ${job.state || 'All India'}\n` +
      `🎓 *Eligibility:* ${job.qualification || job.eligibility || 'Check notification details'}\n\n` +
      `👉 *View Full Notification & Direct Apply Link:*\n${directUrl}\n\n` +
      `🌐 *CVLoom Portal:* https://cvloom.online/jobs\n` +
      `_Verified 100% Free Public Career Portal by CVLoom_`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    const directUrl = getDirectJobUrl();
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generatePrintableHtml = () => {
    const directUrl = getDirectJobUrl();
    const formattedDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const feeRows = (job.applicationFees || []).map(f => 
      `<tr><td style="padding:6px 10px;border:1px solid #cbd5e1;font-weight:600;">${f.category}</td><td style="padding:6px 10px;border:1px solid #cbd5e1;color:#15803d;font-weight:bold;">${f.fee}</td></tr>`
    ).join('') || '<tr><td colspan="2" style="padding:6px 10px;border:1px solid #cbd5e1;">Zero Recruitment Fee / Free Application</td></tr>';

    const vacancyRows = (job.vacancyDetailsTable || []).map(v => 
      `<tr><td style="padding:6px 10px;border:1px solid #cbd5e1;font-weight:600;">${v.post}</td><td style="padding:6px 10px;border:1px solid #cbd5e1;text-align:center;font-weight:bold;color:#0f766e;">${v.total}</td><td style="padding:6px 10px;border:1px solid #cbd5e1;">${v.eligibility}</td></tr>`
    ).join('') || `<tr><td style="padding:6px 10px;border:1px solid #cbd5e1;">${job.postName || job.title}</td><td style="padding:6px 10px;border:1px solid #cbd5e1;text-align:center;">${job.totalVacancies}</td><td style="padding:6px 10px;border:1px solid #cbd5e1;">${job.qualification || job.eligibility}</td></tr>`;

    const docsList = (job.documentsRequired || []).map(d => `<li style="margin-bottom:4px;">${d}</li>`).join('') || '<li>Educational Degree / 10th & 12th Marksheets</li><li>Aadhaar Card / Government Photo ID</li><li>Passport size photograph & Signature</li>';

    const logoConfig = getLogoConfig();
    const logoHtml = logoConfig.logoUrl ? `
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${logoConfig.logoUrl}" alt="${logoConfig.brandText || 'CVLoom'}" style="height:44px;max-width:180px;object-fit:contain;border-radius:8px;" />
        <div>
          <span class="badge">✓ Official Verified Summary</span>
          <div class="brand-sub">${logoConfig.subtitle || 'Recruitment & Career Portal'} · cvloom.online</div>
        </div>
      </div>
    ` : `
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg, #1d4ed8, #4f46e5);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,0.15);flex-shrink:0;">
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14C10 11.7909 11.7909 10 14 10H26C28.2091 10 30 11.7909 30 14V18C30 24.6274 24.6274 30 18 30H14C11.7909 30 10 28.2091 10 26V14Z" stroke="white" stroke-width="3" />
            <path d="M15 17L20 22L25 17" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:24px;font-weight:900;color:#0f172a;font-family:serif;letter-spacing:-0.5px;">${logoConfig.brandText === 'CVLoom' ? 'CV<span style="color:#2563eb;">Loom</span>' : (logoConfig.brandText || 'CVLoom')}</span>
            <span class="badge">✓ Official Verified Summary</span>
          </div>
          <div class="brand-sub">${logoConfig.subtitle || 'Recruitment & Career Portal'} · cvloom.online</div>
        </div>
      </div>
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${job.title} - Official CVLoom Summary</title>
  <style>
    @page { size: A4; margin: 12mm; }
    body { font-family: "EB Garamond", Garamond, Georgia, serif; color: #1e293b; line-height: 1.4; margin: 0; padding: 18px; background: #fff; }
    a { color: #0284c7; text-decoration: underline; cursor: pointer; }
    a:hover { color: #0369a1; }
    .no-print { display: block; }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0 !important; }
      a { text-decoration: underline !important; color: #0284c7 !important; }
    }
    .header-box { border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
    .center-heading-box { text-align: center; margin: 10px 0 16px 0; padding: 10px 18px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; }
    .center-heading-title { margin: 0; font-size: 20px; font-weight: 900; color: #14532d; letter-spacing: 0.5px; text-transform: uppercase; font-family: serif; }
    .center-heading-subtitle { font-size: 11px; color: #15803d; margin-top: 3px; font-weight: 700; }
    .brand-title { font-size: 24px; font-weight: 900; color: #132E22; margin: 0; }
    .brand-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #047857; font-weight: bold; margin-top: 2px; }
    .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: bold; text-transform: uppercase; border-radius: 4px; background: #EAF6E9; color: #166534; border: 1px solid #BBF7D0; }
    h2 { font-size: 15px; color: #132E22; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 14px; margin-bottom: 8px; text-transform: uppercase; font-family: sans-serif; letter-spacing: 0.5px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 12px; }
    th { background: #f8fafc; padding: 6px 10px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700; color: #0f172a; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 12px; }
    .meta-item { border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 6px; background: #fafaf9; }
    .meta-label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; }
    .meta-value { font-size: 13px; font-weight: bold; color: #0f172a; }
    .footer-box { border-top: 2px solid #0f766e; margin-top: 20px; padding-top: 10px; font-size: 11px; color: #64748b; text-align: center; }
    .print-btn { background: #132E22; color: #fff; padding: 10px 20px; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .print-btn:hover { background: #1B3B2B; }
    .link-row { background: #f8fafc; }
    .link-row:hover { background: #f1f5f9; }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 18px; padding: 12px; background: #f1f5f9; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong style="color: #0f172a; font-size: 14px;">🖨️ Official CVLoom Printable Job Summary Ready</strong>
      <span style="display: block; font-size: 11px; color: #475569;">All links inside this document are active &amp; clickable. Click below to print or save as PDF:</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()" class="print-btn">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background:#e2e8f0;color:#334155;border:none;padding:10px 14px;border-radius:8px;font-weight:bold;cursor:pointer;">✕ Close</button>
    </div>
  </div>

  <div class="header-box">
    <div>
      ${logoHtml}
    </div>
    <div style="text-align: right; font-size: 11px; color: #475569;">
      <div><strong>Job ID:</strong> <a href="${directUrl}" target="_blank" style="color: #0284c7; font-weight: bold; text-decoration: underline;">#${job.id} (Click to View Online)</a></div>
      <div><strong>Category:</strong> ${job.category} ${job.subCategory ? `(${job.subCategory})` : ''}</div>
      <div><strong>Generated:</strong> ${formattedDate}</div>
    </div>
  </div>

  <!-- Centered Prominent Heading -->
  <div class="center-heading-box">
    <h1 class="center-heading-title">Full Job Details</h1>
    <div class="center-heading-subtitle">Official Notification &amp; Application Criteria • All Links Activated for Direct Tap/Click in PDF</div>
  </div>

  <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0f766e; padding: 10px 14px; border-radius: 6px; margin-bottom: 14px;">
    <h1 style="font-size: 18px; color: #0f172a; margin: 0 0 4px 0; font-family: serif;">${job.title}</h1>
    <div style="font-size: 12px; color: #334155;">
      <strong>Organization:</strong> ${job.organization} | <strong>Post Name:</strong> ${job.postName || job.title}
    </div>
  </div>

  <div class="meta-grid">
    <div class="meta-item"><span class="meta-label">Total Vacancies</span><span class="meta-value">${job.totalVacancies > 0 ? job.totalVacancies.toLocaleString() + ' Posts' : 'Multiple Vacancies'}</span></div>
    <div class="meta-item"><span class="meta-label">Pay Scale / Salary</span><span class="meta-value">${job.salary || 'As per government norms'}</span></div>
    <div class="meta-item"><span class="meta-label">Job Location / State</span><span class="meta-value">${job.location || job.state || 'All India'}</span></div>
    <div class="meta-item"><span class="meta-label">Age Limit</span><span class="meta-value">${job.ageLimit || 'As per departmental norms'}</span></div>
    <div class="meta-item"><span class="meta-label">Selection Process</span><span class="meta-value">${job.selectionProcess || 'Written Exam / Merit / Interview'}</span></div>
    <div class="meta-item"><span class="meta-label">Minimum Eligibility</span><span class="meta-value">${job.qualification || job.eligibility || 'Check notification'}</span></div>
  </div>

  <h2>📅 Important Application Dates</h2>
  <table>
    <thead><tr><th>Event / Notification Stage</th><th>Scheduled Date</th></tr></thead>
    <tbody>
      <tr><td>Notification Release Date</td><td>${job.notificationDate || job.applicationStartDate}</td></tr>
      <tr><td>Application Submission Begins</td><td>${job.applicationStartDate}</td></tr>
      <tr style="background:#fef2f2;"><td><strong>Last Date to Apply Online</strong></td><td><strong style="color:#b91c1c;">${job.applicationEndDate}</strong></td></tr>
      ${job.examDate ? `<tr><td>Examination Date</td><td>${job.examDate}</td></tr>` : ''}
      ${job.admitCardDate ? `<tr><td>Admit Card Release Date</td><td>${job.admitCardDate}</td></tr>` : ''}
    </tbody>
  </table>

  <h2>💰 Application Fee Structure</h2>
  <table>
    <thead><tr><th>Candidate Category</th><th>Prescribed Fee</th></tr></thead>
    <tbody>${feeRows}</tbody>
  </table>

  <h2>👥 Vacancy Distribution & Post Details</h2>
  <table>
    <thead><tr><th>Designation / Post Name</th><th style="text-align:center;">Vacancies</th><th>Educational Criteria</th></tr></thead>
    <tbody>${vacancyRows}</tbody>
  </table>

  <h2>📑 Documents Checklist for Application</h2>
  <ul style="font-size: 12px; color: #334155; padding-left: 20px; margin-top: 4px; margin-bottom: 12px;">
    ${docsList}
  </ul>

  <h2>🌐 Official Verification & Direct Access Links (Active Links in PDF)</h2>
  <table>
    <thead><tr><th style="width:38%;">Official Resource / Action</th><th>Direct Clickable Link (Tap/Click to Open)</th></tr></thead>
    <tbody>
      <tr class="link-row">
        <td><strong>Direct Online Application Form:</strong></td>
        <td>
          <a href="${job.buttons?.[0]?.url || job.applyUrl || job.officialWebsite || directUrl}" target="_blank" style="color: #059669; font-weight: bold; text-decoration: underline; word-break: break-all;">
            🔗 Click Here to Apply Online (${job.buttons?.[0]?.url || job.applyUrl || job.officialWebsite || directUrl})
          </a>
        </td>
      </tr>
      <tr class="link-row">
        <td><strong>Official Notification PDF:</strong></td>
        <td>
          <a href="${job.buttons?.[1]?.url || job.officialNotificationPdf || job.officialWebsite || directUrl}" target="_blank" style="color: #dc2626; font-weight: bold; text-decoration: underline; word-break: break-all;">
            📑 Click Here to Download Official Notification PDF
          </a>
        </td>
      </tr>
      <tr class="link-row">
        <td><strong>Official Department Portal:</strong></td>
        <td>
          <a href="${job.officialWebsite || directUrl}" target="_blank" style="color: #0284c7; font-weight: bold; text-decoration: underline; word-break: break-all;">
            🌐 Click Here to Visit Official Website (${job.officialWebsite || 'cvloom.online/jobs'})
          </a>
        </td>
      </tr>
      ${job.videoTutorialUrl ? `
      <tr class="link-row">
        <td><strong>Video Application Guide:</strong></td>
        <td>
          <a href="${job.videoTutorialUrl}" target="_blank" style="color: #e11d48; font-weight: bold; text-decoration: underline; word-break: break-all;">
            ▶️ Click Here to Watch Video Tutorial Guide
          </a>
        </td>
      </tr>
      ` : ''}
      <tr class="link-row">
        <td><strong>Permanent CVLoom Job URL:</strong></td>
        <td>
          <a href="${directUrl}" target="_blank" style="color: #4f46e5; font-weight: bold; text-decoration: underline; word-break: break-all;">
            📌 Click to Open Live Job Posting on CVLoom
          </a>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="footer-box">
    <div style="font-weight: bold; color: #132E22;">CVLoom Official Career Verification Portal (cvloom.online/jobs)</div>
    <div>100% Free Public Career Network • Zero Fees • Verified Opportunities</div>
    <div style="font-size: 10px; margin-top: 4px;">Notice: Candidates are advised to read the full official gazette notification before submitting application fees.</div>
  </div>
</body>
</html>`;
  };

  const handlePrint = () => {
    try {
      const htmlContent = generatePrintableHtml();
      const printWin = window.open('', '_blank', 'width=950,height=850,menubar=no,toolbar=no,location=no');
      if (printWin) {
        printWin.document.open();
        printWin.document.write(htmlContent);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => {
          try {
            printWin.print();
          } catch (e) {
            console.log('Direct print error in window', e);
          }
        }, 500);
      } else {
        // Fallback for pop-up blocked environments: trigger standard window.print() and show modal
        setShowPrintModal(true);
        setTimeout(() => {
          window.print();
        }, 300);
      }
    } catch (err) {
      console.log('Error triggering print, falling back to standard print', err);
      setShowPrintModal(true);
      window.print();
    }
  };

  // Find related jobs in same category or subcategory
  const relatedCategoryJobs = allJobs
    .filter(j => j.id !== job.id && (
      j.category === job.category || 
      (job.subCategory && j.subCategory === job.subCategory) ||
      j.jobType === job.jobType
    ))
    .slice(0, 6);

  // Button variant classes
  const getButtonClass = (variant: string = 'primary') => {
    switch (variant) {
      case 'primary': return 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md shadow-emerald-900/20 font-serif font-bold';
      case 'secondary': return 'bg-[#132E22] hover:bg-[#1B3B2B] text-white font-serif';
      case 'accent': return 'bg-amber-600 hover:bg-amber-500 text-white';
      case 'danger': return 'bg-red-600 hover:bg-red-500 text-white';
      case 'success': return 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md font-serif';
      case 'outline': return 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700 font-serif';
      default: return 'bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold';
    }
  };

  const otherCategories = [
    { id: 'govt-jobs', title: 'Govt Jobs', sub: 'Central, State & Defence Recruitments', count: '50k+ Posts', icon: '🏛️' },
    { id: 'govt-samvida', title: 'Govt Samvida', sub: 'NHM, Education & Contractual Posts', count: '12k+ Posts', icon: '📋' },
    { id: 'ngo-jobs', title: 'NGO Jobs', sub: 'Non-Profits, CSR & UN Agencies', count: '3.5k+ Posts', icon: '🤝' },
    { id: 'scholarships', title: 'Scholarships', sub: 'National, CSR & Merit Student Grants', count: '85k+ Grants', icon: '🎓' },
    { id: 'fellowships', title: 'Fellowships', sub: 'PMRF, Policy & Research Fellowships', count: '1.2k+ Seats', icon: '🏆' },
    { id: 'internship', title: 'Internship', sub: 'Tech, Research, NGO & Govt Interns', count: '4.8k+ Openings', icon: '💡' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8 animate-fade-in" id="full-length-job-page">
      
      {/* 0. Print-Only Official CVLoom Header with Official Brand Seal */}
      <div className="hidden print:block pb-5 mb-6 border-b-2 border-stone-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CVLoomLogo size="md" />
            <div className="border-l border-stone-300 pl-3">
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Official Verification Portal
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold mt-1">
                CVLoom Verified Career Portal (cvloom.online/jobs)
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-stone-700 space-y-0.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-black text-[10px] uppercase border border-emerald-400">
              ✓ Verified Job Summary
            </span>
            <p className="font-semibold text-stone-900">Govt, NGO &amp; Career Opportunities</p>
            <p className="text-[10px] text-stone-500">Printed: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Centered Heading */}
        <div className="text-center mt-3 p-2 bg-emerald-50 border border-emerald-300 rounded-lg">
          <h2 className="text-xl font-black text-emerald-950 uppercase tracking-wide font-serif">
            Full Job Details
          </h2>
          <p className="text-[10px] text-emerald-800 font-bold">
            ✓ Official Notification &amp; Criteria Summary • All Links Clickable in PDF
          </p>
        </div>
      </div>

      {/* 1. Breadcrumbs Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs no-print">
        <div className="flex items-center gap-2 overflow-hidden">
          <button 
            type="button"
            onClick={handleBack} 
            className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition flex items-center gap-1.5 font-bold cursor-pointer"
            id="job-back-btn"
            title="Return to the exact list or category you came from"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>← Back to {job.subCategory || job.category || 'Listings'}</span>
          </button>
          <span>/</span>
          <span className="text-slate-400">{job.category}</span>
          {job.subCategory && (
            <>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{job.subCategory}</span>
            </>
          )}
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">{job.title}</span>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition font-medium flex items-center gap-1 cursor-pointer"
            title="Share verified alert on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium cursor-pointer"
          >
            {copied ? '✓ Link Copied!' : 'Copy Link'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20 text-xs active:scale-95"
            title="Print or Save official verified job summary as PDF with CVLoom Logo"
            id="job-print-btn"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Print Summary (PDF)</span>
            <span className="text-[9px] bg-emerald-900/80 px-1.5 py-0.5 rounded text-emerald-100 font-mono">
              ✓ Active
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Left: Job Details, Right: Category Jobs Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full Job Details (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card with Clean Light Background & Recruiter / CVLoom Fallback Logo */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            
            {/* Top PurposeHire Executive Banner */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-[#132E22] via-[#1B3B2B] to-[#10241B] text-white border-b border-emerald-900/40 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-6">
                <SketchJobSearch className="w-72 h-56" />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  
                  {/* Recruiter Logo or Clean Monogram Card */}
                  <div className="w-20 h-20 rounded-2xl bg-white p-2.5 shrink-0 border border-emerald-900/30 shadow-md flex items-center justify-center">
                    {job.logoUrl ? (
                      <img 
                        src={job.logoUrl} 
                        alt={`${job.organization} Logo`} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-2xl font-serif font-bold text-[#132E22]">
                        {job.organization.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="tag-orange">
                        {job.category}
                      </span>
                      {job.subCategory && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          {job.subCategory}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-200/80">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Verified Opportunity
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white tracking-tight leading-snug">
                      {job.title}
                    </h1>

                    <p className="text-stone-300 text-sm font-medium flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{job.organization}</span>
                      {job.department && <span className="text-stone-400">({job.department})</span>}
                    </p>
                  </div>

                </div>

                {/* Notification Date & Last Date Ribbon */}
                <div className="pt-1">
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-xs text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/20">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-stone-300 block font-normal text-[11px]">Notification Issued</span>
                        <strong className="text-white text-sm font-bold font-serif">
                          {job.notificationDate || job.applicationStartDate || 'Recently Published'}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/20">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-stone-300 block font-normal text-[11px]">Application Last Date</span>
                        <strong className="text-amber-300 text-sm font-bold font-serif">
                          {job.applicationEndDate} (Closing Soon)
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button Strip (WhatsApp Share + Apply Online + Save) */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  
                  {/* WhatsApp Share Button */}
                  <button
                    onClick={handleWhatsAppShare}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold font-serif text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-950/40 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </button>

                  {/* How to Apply Video Tutorial Button */}
                  <button
                    onClick={() => {
                      if (onSelectVideo) onSelectVideo(job.id);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold font-serif text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-red-950/40 transition cursor-pointer"
                    title="Watch Step-by-Step Form Filling Video Tutorial"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>▶ How to Apply (Video)</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(job.id)}
                    className={`px-4 py-2.5 rounded-xl border font-bold font-serif text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                      isSaved
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{isSaved ? 'Saved to Shelf' : 'Save Notice'}</span>
                  </button>

                  {/* Official Action Buttons */}
                  {job.buttons && job.buttons.length > 0 && job.buttons.map((btn, idx) => (
                    <a
                      key={idx}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl font-bold font-serif text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md ${getButtonClass(btn.variant)}`}
                    >
                      <span>{btn.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  ))}

                </div>

              </div>
            </div>

            {/* Quick Metadata Highlights Matrix */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Vacancies</span>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  {job.totalVacancies > 0 ? job.totalVacancies.toLocaleString() : 'Multiple'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Salary Scale</span>
                <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {job.salary || 'As per norms'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Age Limit</span>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  {job.ageLimit || 'Check notification'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Job Location</span>
                <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {job.state || 'All India'}
                </p>
              </div>
            </div>

            {/* Comprehensive Detail Sections */}
            <div className="p-6 md:p-8 space-y-8">
              
              {/* 1. Overview */}
              <div className="space-y-3">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>{job.overviewHeading || 'Overview & Summary'}</span>
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {job.detailedDescription || job.shortDescription}
                </p>
              </div>

              {/* 2. Important Dates Matrix */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{job.datesHeading || 'Important Dates Schedule'}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Application Start</span>
                    <strong className="block text-sm text-slate-900 dark:text-white mt-0.5">{job.applicationStartDate}</strong>
                  </div>
                  <div className="p-3.5 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200/60 dark:border-red-900/40">
                    <span className="text-[11px] text-red-600 dark:text-red-400 font-bold uppercase">Application Last Date</span>
                    <strong className="block text-sm text-red-700 dark:text-red-300 mt-0.5">{job.applicationEndDate}</strong>
                  </div>
                  {job.examDate && (
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Examination Date</span>
                      <strong className="block text-sm text-slate-900 dark:text-white mt-0.5">{job.examDate}</strong>
                    </div>
                  )}
                  {job.admitCardDate && (
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Admit Card Release</span>
                      <strong className="block text-sm text-slate-900 dark:text-white mt-0.5">{job.admitCardDate}</strong>
                    </div>
                  )}
                  {job.resultDate && (
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Result Date</span>
                      <strong className="block text-sm text-slate-900 dark:text-white mt-0.5">{job.resultDate}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Application Fees */}
              {job.applicationFees && job.applicationFees.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {job.feesHeading || 'Application Fee Structure'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.applicationFees.map((fee, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60 text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{fee.category}</span>
                        <strong className="text-sm font-black text-slate-900 dark:text-white">{fee.fee}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Vacancy Details Table */}
              {job.vacancyDetailsTable && job.vacancyDetailsTable.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {job.vacancyHeading || 'Post-wise Vacancy Distribution & Qualification'}
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase">
                        <tr>
                          <th className="p-3.5">Post Designation</th>
                          <th className="p-3.5">Total Vacancies</th>
                          <th className="p-3.5">Eligibility Criteria</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {job.vacancyDetailsTable.map((vac, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white">{vac.post}</td>
                            <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">
                              {vac.total > 0 ? vac.total.toLocaleString() : 'N/A'}
                            </td>
                            <td className="p-3.5 leading-relaxed">{vac.eligibility}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. Eligibility & Selection Process */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {job.eligibilityHeading || 'Selection Procedure & Eligibility'}
                </h2>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <strong className="block text-slate-900 dark:text-white font-bold mb-1">Eligibility Criteria:</strong>
                    <p>{job.eligibility || job.qualification}</p>
                  </div>
                  {job.selectionProcess && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="block text-slate-900 dark:text-white font-bold mb-1">Selection Mode:</strong>
                      <p>{job.selectionProcess}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Documents Required Checklist */}
              {job.documentsRequired && job.documentsRequired.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {job.documentsHeading || 'Required Documents Checklist'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {job.documentsRequired.map((doc, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. How to Apply Step-by-Step */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {job.howToApplyHeading || 'How to Apply Step-by-Step'}
                </h2>
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                  {job.howToApply || '1. Visit official board website.\n2. Complete registration and fill online application.\n3. Pay applicable fee and download final acknowledgement slip.'}
                </div>
              </div>

              {/* 8. FAQs Accordion */}
              {job.faqs && job.faqs.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>{job.faqsHeading || 'Frequently Asked Questions'}</span>
                  </h2>
                  <div className="space-y-2.5">
                    {job.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div 
                          key={idx} 
                          className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. Official Verification Notice */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-bold">Official CVLoom Verification Guarantee:</strong>
                  <p className="leading-relaxed">
                    All notifications indexed on CVLoom are verified against authentic gazette releases and official government/NGO career portals. Applicants are strongly advised to verify final instructions on the official website before payment.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Sidebar: Other Jobs in This Category (lg:col-span-4) - Hidden in Print */}
        <div className="lg:col-span-4 space-y-6 no-print">
          
          {/* Card: Other Jobs in this Category */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                CATEGORY SPOTLIGHT
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                More in {job.category}
              </h3>
            </div>

            {relatedCategoryJobs.length > 0 ? (
              <div className="space-y-3">
                {relatedCategoryJobs.map(relJob => (
                  <div
                    key={relJob.id}
                    onClick={() => onSelectJob(relJob.id)}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group flex items-start gap-3"
                  >
                    {/* Tiny Logo */}
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      {relJob.logoUrl ? (
                        <img src={relJob.logoUrl} alt={relJob.organization} className="w-full h-full object-contain" />
                      ) : (
                        <CVLoomLogo iconOnly={true} size="sm" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold block truncate">
                        {relJob.organization}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition line-clamp-2">
                        {relJob.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                        <span>Last Date: {relJob.applicationEndDate}</span>
                        <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No other postings currently listed in this specific subcategory.</p>
            )}

            <button
              onClick={() => onNavigateToCategory(job.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
              className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View All {job.category} Posts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card: Free Career Tools on CVLoom */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-md text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>FREE FOR APPLICANTS</span>
            </div>
            
            <h3 className="text-lg font-black tracking-tight leading-snug">
              Boost Your Selection with CVLoom Tools
            </h3>

            <p className="text-slate-300 text-xs leading-relaxed">
              Create an ATS-compliant resume or verify your age eligibility instantly for {job.organization}.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onNavigateToTools();
                  onSelectTool('age-calculator');
                }}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold text-left transition flex items-center justify-between"
              >
                <span>📅 Age Eligibility Calculator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onNavigateToTools();
                  onSelectTool('photo-resizer');
                }}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold text-left transition flex items-center justify-between"
              >
                <span>🖼️ Photo & Signature Resizer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://cvloom.online"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-center block transition shadow-md shadow-blue-600/30"
              >
                Build Professional ATS Resume
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Section: Explore Other Job Categories (Full Width) - Hidden in Print */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4 no-print" id="other-job-categories-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore Other Job Categories
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Discover opportunities across other government, non-profit, scholarship and fellowship streams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {otherCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigateToCategory(cat.id)}
              className="p-4 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-left transition group shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between h-32"
            >
              <div>
                <span className="text-2xl mb-1 block">{cat.icon}</span>
                <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition leading-tight">
                  {cat.title}
                </h4>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                {cat.count}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Print-Only Official CVLoom Footer */}
      <div className="hidden print:block pt-6 mt-8 border-t-2 border-stone-800 text-xs text-stone-700">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <span className="font-bold">Official Verification Portal: cvloom.online/jobs</span>
          <span className="font-bold text-emerald-800">Zero Recruitment Fees • Authentic Opportunities</span>
          <span>Notification Ref: {job.id}</span>
        </div>
        <p className="text-[10px] text-stone-500 mt-2 text-center">
          This document summary is issued by CVLoom Official Recruitment Portal. For final apply links, admit card releases, and official updates, visit {job.officialWebsite || 'https://cvloom.online/jobs'}.
        </p>
      </div>

      {/* 5. In-Page Printable Summary Dialog */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print animate-fade-in">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <CVLoomLogo size="sm" />
                <div className="border-l border-stone-200 dark:border-stone-700 pl-3">
                  <h3 className="font-bold text-stone-900 dark:text-white text-base font-serif">
                    Official Printable Summary Ready
                  </h3>
                  <p className="text-stone-500 text-xs">Formatted with CVLoom official verification seal &amp; complete job criteria</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrintModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/60 text-xs space-y-2">
              <div className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                <span className="font-bold">{job.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">✓ 100% Verified</span>
              </div>
              <p className="text-stone-500">{job.organization} · {job.totalVacancies > 0 ? `${job.totalVacancies} Vacancies` : 'Multiple Posts'} · Last Date: {job.applicationEndDate}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document / Save as PDF Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
