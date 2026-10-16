/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Briefcase, Building2, User, Mail, Phone, Globe, 
  MapPin, Calendar, DollarSign, FileText, CheckCircle2, 
  AlertCircle, ShieldCheck, Sparkles, Send, ArrowRight
} from 'lucide-react';
import { Job } from '../types';
import { SketchPostJob, SketchVerifiedBadge } from './SketchIllustrations';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitJob: (jobData: Job) => void;
}

export default function PostJobModal({ isOpen, onClose, onSubmitJob }: PostJobModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State modeled after purposehire.org/post-a-free-job/
  const [formData, setFormData] = useState({
    // Organization
    legalOrgName: '',
    orgType: 'NGO / Non-Profit',
    registrationNumber: '',
    primarySector: 'Administration & Project Operations',
    orgWebsite: '',
    
    // Contact
    contactName: '',
    contactDesignation: '',
    contactEmail: '',
    contactPhone: '',

    // Job Details
    postingTitle: '',
    category: 'NGO Jobs',
    employmentType: 'Full-time / Permanent',
    numberOfPositions: '1',
    experienceRequired: '1 - 3 Years',
    applicationCloseDate: '',
    ctcMinimum: '₹3,60,000 P.A.',
    ctcMaximum: '₹6,00,000 P.A.',
    workMode: 'On-site',
    city: 'New Delhi',
    state: 'Delhi',
    jobDescription: '',
    candidateRequirements: '',
    benefitsOffered: 'Health insurance, annual learning allowance, PF',
    
    // Apply Link
    applicationUrl: '',
    ageLimit: '21 to 35 Years',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.legalOrgName.trim()) errs.legalOrgName = 'Legal organization name is required';
    if (!formData.contactName.trim()) errs.contactName = 'Contact person name is required';
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      errs.contactEmail = 'Please provide a valid official email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.postingTitle.trim()) errs.postingTitle = 'Posting title is required';
    if (!formData.applicationCloseDate) errs.applicationCloseDate = 'Application deadline is required';
    if (!formData.jobDescription.trim()) errs.jobDescription = 'Job description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicationUrl.trim()) {
      formData.applicationUrl = formData.orgWebsite || 'https://cvloom.online';
    }

    const newJob: Job = {
      id: `job-post-${Date.now()}`,
      title: formData.postingTitle,
      postName: formData.postingTitle,
      organization: formData.legalOrgName,
      department: formData.primarySector,
      advertisementNumber: `PH-${Math.floor(1000 + Math.random() * 9000)}/2026`,
      totalVacancies: parseInt(formData.numberOfPositions, 10) || 1,
      salary: `${formData.ctcMinimum} - ${formData.ctcMaximum}`,
      ageLimit: formData.ageLimit,
      qualification: formData.candidateRequirements || 'Graduate or equivalent professional qualification',
      selectionProcess: 'Resume Shortlisting -> Technical Interview -> Final Offer',
      applicationFees: [{ category: 'All Candidates', fee: '₹0 (Free / No Fee Charged)' }],
      applicationStartDate: new Date().toISOString().split('T')[0],
      applicationEndDate: formData.applicationCloseDate || '2026-11-30',
      state: formData.state,
      category: formData.category,
      subCategory: formData.primarySector,
      jobType: formData.employmentType.includes('Contract') ? 'Contractual' : 'NGO',
      location: `${formData.city}, ${formData.state} (${formData.workMode})`,
      experience: formData.experienceRequired,
      applicationMode: 'Online',
      officialWebsite: formData.orgWebsite || 'https://cvloom.online',
      shortDescription: formData.jobDescription.slice(0, 180) + '...',
      detailedDescription: formData.jobDescription,
      eligibility: formData.candidateRequirements,
      vacancyDetailsTable: [
        {
          post: formData.postingTitle,
          total: parseInt(formData.numberOfPositions, 10) || 1,
          eligibility: formData.candidateRequirements || 'As specified in notice'
        }
      ],
      documentsRequired: [
        'Updated Professional CV / Resume',
        'Cover Letter explaining purpose & sector alignment',
        'Educational & Experience Certificates',
        'Valid Photo ID Proof'
      ],
      howToApply: `1. Visit the verified apply link: ${formData.applicationUrl}\n2. Fill out candidate contact and portfolio details.\n3. Attach resume and answer alignment questionnaire.\n4. Submit before the closing date.`,
      importantInstructions: 'Purpose-driven recruitment. Never pay any fee for interview calls or test scheduling.',
      faqs: [
        {
          question: `Is there any fee to apply for ${formData.postingTitle}?`,
          answer: 'No. Our portal strictly forbids charging candidates any application, interview or recruitment fees.'
        }
      ],
      seoTitle: `${formData.postingTitle} at ${formData.legalOrgName} - Apply Online`,
      seoKeywords: `${formData.postingTitle}, ${formData.legalOrgName}, jobs in ${formData.city}`,
      seoDescription: `Apply for ${formData.postingTitle} at ${formData.legalOrgName}. Location: ${formData.city}. Deadline: ${formData.applicationCloseDate}.`,
      status: 'Published',
      isFeatured: true,
      buttons: [
        {
          label: 'Apply Directly →',
          url: formData.applicationUrl,
          variant: 'primary'
        },
        {
          label: 'Visit Organisation Website',
          url: formData.orgWebsite || 'https://cvloom.online',
          variant: 'outline'
        }
      ],
      createdAt: new Date().toISOString(),
      views: 1
    };

    onSubmitJob(newJob);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FAFAF7] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden relative animate-fade-in my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#132E22] text-white px-6 py-5 flex items-center justify-between border-b border-[#1B3B2B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white font-serif">Post a Job Opening</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  100% Free
                </span>
              </div>
              <p className="text-stone-300 text-xs">Publish verified opportunities to India's dedicated talent community.</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Guarantee Banner inspired by PurposeHire */}
        <div className="bg-[#EAF6E9] dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-900/50 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span><strong>Zero Charges:</strong> We never charge employers or candidates for job postings or applications.</span>
          </div>
          <span className="hidden sm:inline text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Verified Talent Platform</span>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="flex justify-center">
              <SketchVerifiedBadge className="w-32 h-32" />
            </div>
            
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white font-serif">
                Job Posting Published Successfully!
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                Your role for <strong>{formData.postingTitle}</strong> at <strong>{formData.legalOrgName}</strong> has been verified and listed live on the portal. Candidates can now view details and apply directly.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1B3B2B] hover:bg-[#132E22] text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                View on Job Openings Board →
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Step Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-[#1B3B2B] text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  1
                </span>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">Organization & Contact</span>
              </div>

              <div className="w-8 h-px bg-stone-300 dark:bg-stone-700" />

              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-[#1B3B2B] text-white' : step > 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}>
                  2
                </span>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">Job Opening Details</span>
              </div>

              <div className="w-8 h-px bg-stone-300 dark:bg-stone-700" />

              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-[#1B3B2B] text-white' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}>
                  3
                </span>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">Preferences & Link</span>
              </div>
            </div>

            {/* STEP 1: Organisation & Contact */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">Official Organisation Verification</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-0.5">
                      Please use your organisation's registered legal name and official domain email (e.g. info@yourorg.org) for faster verification.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Legal Name of Organisation *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarvam Foundation / Social Alpha"
                      value={formData.legalOrgName}
                      onChange={e => handleChange('legalOrgName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none transition ${
                        errors.legalOrgName ? 'border-red-500 ring-2 ring-red-200' : 'border-stone-300 dark:border-stone-700 focus:border-emerald-600'
                      }`}
                    />
                    {errors.legalOrgName && <p className="text-red-600 text-xs mt-1">{errors.legalOrgName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Organisation Type
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={e => handleChange('orgType', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                      <option value="NGO / Non-Profit">NGO / Non-Profit / Trust</option>
                      <option value="CSR Foundation">CSR Foundation</option>
                      <option value="Government Department">Government Department / PSU</option>
                      <option value="Autonomous Institute">Autonomous Research / Educational Institute</option>
                      <option value="Social Enterprise">Social Enterprise / Section 8 Company</option>
                      <option value="Private Corporation">Private Organisation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Trust/NGO Registration No. / CIN (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. 12A / 80G / CSR00012345"
                      value={formData.registrationNumber}
                      onChange={e => handleChange('registrationNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                    </input>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Organisation Website
                    </label>
                    <input 
                      type="url"
                      placeholder="https://yourorganisation.org"
                      value={formData.orgWebsite}
                      onChange={e => handleChange('orgWebsite', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    />
                  </div>
                </div>

                <div className="border-t border-stone-200 dark:border-stone-800 pt-4 mt-2">
                  <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3">
                    Primary Contact Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Contact Person Name *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={formData.contactName}
                        onChange={e => handleChange('contactName', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none ${
                          errors.contactName ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.contactName && <p className="text-red-600 text-xs mt-1">{errors.contactName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Designation
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Head of Talent / Program Lead"
                        value={formData.contactDesignation}
                        onChange={e => handleChange('contactDesignation', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Official Email *
                      </label>
                      <input 
                        type="email"
                        placeholder="hr@yourorganisation.org"
                        value={formData.contactEmail}
                        onChange={e => handleChange('contactEmail', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none ${
                          errors.contactEmail ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.contactEmail && <p className="text-red-600 text-xs mt-1">{errors.contactEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input 
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.contactPhone}
                        onChange={e => handleChange('contactPhone', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Job Opening Details */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Posting Title *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Head of Administration / CSR Fundraising Manager / Project Associate"
                      value={formData.postingTitle}
                      onChange={e => handleChange('postingTitle', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none ${
                        errors.postingTitle ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                      }`}
                    />
                    {errors.postingTitle && <p className="text-red-600 text-xs mt-1">{errors.postingTitle}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Category / Sector
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => handleChange('category', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                      <option value="NGO Jobs">NGO & Social Impact Jobs</option>
                      <option value="Govt Jobs">Government & Public Sector</option>
                      <option value="Fellowship">Fellowships & Grants</option>
                      <option value="Scholarship">Scholarships & Education</option>
                      <option value="Internship">Internships</option>
                      <option value="Walk-in Interview">Walk-in Interview / Direct Hiring</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={e => handleChange('employmentType', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                      <option value="Full-time / Permanent">Full-time / Permanent</option>
                      <option value="Contractual / Samvida">Contractual / Samvida (Fixed Term)</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Fellowship">Fellowship (1-2 Years)</option>
                      <option value="Internship">Internship (3-6 Months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Work Mode
                    </label>
                    <select
                      value={formData.workMode}
                      onChange={e => handleChange('workMode', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                      <option value="On-site">On-site (Office / Field)</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">100% Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Number of Positions
                    </label>
                    <input 
                      type="number"
                      min="1"
                      value={formData.numberOfPositions}
                      onChange={e => handleChange('numberOfPositions', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Primary Work City
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. DLF Gurugram / New Delhi / Mumbai"
                      value={formData.city}
                      onChange={e => handleChange('city', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      State / Province
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Delhi / Haryana / Maharashtra / All India"
                      value={formData.state}
                      onChange={e => handleChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Application Close Date *
                    </label>
                    <input 
                      type="date"
                      value={formData.applicationCloseDate}
                      onChange={e => handleChange('applicationCloseDate', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none ${
                        errors.applicationCloseDate ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                      }`}
                    />
                    {errors.applicationCloseDate && <p className="text-red-600 text-xs mt-1">{errors.applicationCloseDate}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      CTC Range / Remuneration
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Min (e.g. ₹3.5 Lakh)"
                        value={formData.ctcMinimum}
                        onChange={e => handleChange('ctcMinimum', e.target.value)}
                        className="w-1/2 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800 outline-none"
                      />
                      <input 
                        type="text"
                        placeholder="Max (e.g. ₹6 Lakh)"
                        value={formData.ctcMaximum}
                        onChange={e => handleChange('ctcMaximum', e.target.value)}
                        className="w-1/2 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800 outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Job Description & Scope of Work *
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Outline core responsibilities, mission goals, and day-to-day duties..."
                      value={formData.jobDescription}
                      onChange={e => handleChange('jobDescription', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white dark:bg-stone-800 outline-none leading-relaxed ${
                        errors.jobDescription ? 'border-red-500' : 'border-stone-300 dark:border-stone-700'
                      }`}
                    />
                    {errors.jobDescription && <p className="text-red-600 text-xs mt-1">{errors.jobDescription}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Candidate Preferences & Application URL */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Candidate Requirements & Eligibility
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Bachelor's/Master's degree in Social Work, Development Studies, or Management. Minimum 2 years experience in project coordination."
                    value={formData.candidateRequirements}
                    onChange={e => handleChange('candidateRequirements', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Experience Required
                    </label>
                    <select
                      value={formData.experienceRequired}
                      onChange={e => handleChange('experienceRequired', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    >
                      <option value="Fresher / 0-1 Year">Fresher / 0 - 1 Year</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5 - 8 Years">5 - 8 Years</option>
                      <option value="8+ Years (Leadership)">8+ Years (Leadership)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Age Limit (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. 21 to 35 Years"
                      value={formData.ageLimit}
                      onChange={e => handleChange('ageLimit', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Direct Application URL or Google Form / Portal Link
                  </label>
                  <input 
                    type="url"
                    placeholder="https://yourorganisation.org/careers/apply-now"
                    value={formData.applicationUrl}
                    onChange={e => handleChange('applicationUrl', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                  />
                  <p className="text-stone-400 text-[11px] mt-1">
                    When candidates click "Apply →", they will be taken directly to this official link.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Additional Benefits Offered (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Medical insurance, Flexible hours, Field travel allowance"
                    value={formData.benefitsOffered}
                    onChange={e => handleChange('benefitsOffered', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-sm bg-white dark:bg-stone-800 outline-none"
                  />
                </div>

                {/* Review summary preview */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✨</span>
                    <div>
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        {formData.postingTitle || 'Your Job Title'}
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                        {formData.legalOrgName || 'Organisation'} · {formData.city} · {formData.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-stone-800 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                    Ready to Publish
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-800 pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => (prev - 1) as any)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  ← Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#1B3B2B] hover:bg-[#132E22] text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Job Opening Now</span>
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
