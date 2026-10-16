/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CVLoomLogo from './CVLoomLogo';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Job Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10 animate-fade-in" id="contact-page-view">
      
      {/* Page Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-wider">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>OFFICIAL HELPDESK & SUPPORT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Get in Touch with CVLoom
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Have queries about a government recruitment notification, NGO vacancy, or scholarship application? Our editorial team and career counselors are here to help.
        </p>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Send Us a Direct Message
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Fill out the form below. We usually respond within 24-48 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-emerald-900 dark:text-emerald-200">
                Message Received Successfully!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto">
                Thank you for contacting CVLoom. Our support desk has logged your ticket and will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-slate-100 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-slate-100 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-slate-100 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Inquiry Subject</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-slate-100 focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Job Inquiry">Job Posting Clarification</option>
                    <option value="Scholarship Inquiry">Scholarship Application Help</option>
                    <option value="NGO Career">NGO / CSR Recruitment Query</option>
                    <option value="Recruiter Posting">Submit Vacancy / Advertise</option>
                    <option value="Technical Issue">Portal Bug / Technical Issue</option>
                    <option value="General">Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, recruitment reference, or query..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-slate-100 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

        </div>

        {/* Contact Info Sidebar (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Official Helpline Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10" />
            
            <div className="relative z-10 space-y-4">
              <CVLoomLogo size="md" lightMode={true} />

              <h3 className="text-xl font-black">Official Communications</h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-bold uppercase">Official Email</span>
                    <a href="mailto:support@cvloom.online" className="text-white font-semibold hover:underline">
                      support@cvloom.online
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-bold uppercase">WhatsApp Helpline</span>
                    <a 
                      href="https://api.whatsapp.com/send?phone=919876543210&text=Hello%20CVLoom%20Support" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-white font-semibold hover:underline"
                    >
                      +91 (Support WhatsApp Desk)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-bold uppercase">Operating Hours</span>
                    <span className="text-slate-300 font-medium">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-bold uppercase">Headquarters</span>
                    <span className="text-slate-300 font-medium">New Delhi, India (Pan-India Digital Portal)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Assurance Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICITY GUARANTEE</span>
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Zero Scam & Verified Postings Only
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              CVLoom verifies each vacancy against standard recruitment gazettes. We never charge job seekers for applications or tests. Beware of fraudulent agencies asking for money.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
