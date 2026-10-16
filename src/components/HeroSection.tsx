/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, GraduationCap, Building, Clipboard, ArrowRight } from 'lucide-react';
import { Job } from '../types';

interface HeroSectionProps {
  onSearch: (filters: any) => void;
  jobs: Job[];
}

export default function HeroSection({ onSearch, jobs }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedQual, setSelectedQual] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  // Extract unique filters from jobs for dropdowns
  const states = Array.from(new Set(jobs.map(j => j.state))).filter(Boolean);
  const qualifications = ['Graduate', '10th', '12th', 'ITI', 'Diploma', 'PG', 'Doctor'];
  const organizations = Array.from(new Set(jobs.map(j => j.organization))).filter(Boolean).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      title: searchTerm,
      state: selectedState,
      qualification: selectedQual,
      organization: selectedDept
    });
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    onSearch({ title: term, state: '', qualification: '', organization: '' });
  };

  // Stats calculation
  const totalVacanciesCount = jobs.reduce((sum, j) => sum + (j.totalVacancies || 0), 0);
  const activeJobsCount = jobs.filter(j => j.status === 'Published').length;

  return (
    <div className="bg-slate-900 text-white py-14 md:py-20 relative overflow-hidden px-4 md:px-6 rounded-b-3xl" id="hero-banner-section">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        <span className="text-xs font-bold px-3.5 py-1.5 bg-blue-500/10 text-blue-400 rounded-full uppercase tracking-widest border border-blue-500/20 inline-block animate-pulse">
          ⚡ India's Most Trusted Recruitment Portal
        </span>
        
        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
          Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Sarkari Job</span>
        </h1>
        
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Sarkari Global by CVLoom is a premium, high-speed portal indexing the latest central, state, public-sector, NGO, and private employment notifications instantly.
        </p>

        {/* Unified Search Engine bar */}
        <form onSubmit={handleSearchSubmit} className="bg-white/95 backdrop-blur-md p-2 rounded-2xl md:rounded-full shadow-xl max-w-4xl mx-auto border border-slate-700/30 text-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
          
          {/* Keyword Search */}
          <div className="flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Job, post, or board..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-800 font-medium placeholder-slate-400 text-xs md:text-sm"
              id="hero-job-keyword"
            />
          </div>

          {/* Qualification Filter */}
          <div className="flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
            <GraduationCap className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <select 
              value={selectedQual} 
              onChange={e => setSelectedQual(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-700 font-semibold text-xs md:text-sm cursor-pointer"
              id="hero-qualification-select"
            >
              <option value="">All Qualifications</option>
              {qualifications.map(q => <option key={q} value={q} className="text-slate-800">{q}</option>)}
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <select 
              value={selectedState} 
              onChange={e => setSelectedState(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-700 font-semibold text-xs md:text-sm cursor-pointer"
              id="hero-state-select"
            >
              <option value="">All India States</option>
              {states.map(s => <option key={s} value={s} className="text-slate-800">{s}</option>)}
            </select>
          </div>

          {/* Action Trigger Button */}
          <div className="p-1">
            <button 
              type="submit"
              className="w-full h-full py-3 md:py-0 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl md:rounded-full transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/15 cursor-pointer"
              id="hero-search-submit-btn"
            >
              <span>Search Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

        {/* Popular searches tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 mr-1">Trending Tags:</span>
          {['UPSC IAS', 'SSC CGL', 'Railway NTPC', 'Agniveer Rally', 'NITI Aayog', 'Banking PO'].map(tag => (
            <button
              key={tag}
              onClick={() => handlePopularSearch(tag)}
              className="px-3 py-1 bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-full transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Quick Portal Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-800/80 text-center text-slate-300">
          <div>
            <span className="text-2xl md:text-3xl font-black text-white block">10,000+</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">Active Postings</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-black text-white block">45,000+</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">Vacancies Listed</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-black text-white block">29 States</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">Coverage Pan-India</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-black text-white block">3 Minutes</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">Avg Notification Speed</span>
          </div>
        </div>

      </div>
    </div>
  );
}
