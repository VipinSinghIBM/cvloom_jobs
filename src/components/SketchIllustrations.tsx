import React from 'react';

/**
 * Hand-drawn, organic, editorial vector sketch illustrations inspired by PurposeHire.
 * Clean, lightweight, scalable SVG illustrations with organic line work and warm earth accents.
 */

interface SketchProps {
  className?: string;
  size?: number | string;
}

// 1. Job Search & Career Exploration Sketch (Binoculars, Map, Road, Green Sprout)
export const SketchJobSearch: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Soft organic watercolor backdrop blotch */}
    <path 
      d="M30 110 C 20 60, 80 20, 160 30 C 230 40, 260 90, 240 140 C 220 180, 150 190, 90 180 C 40 170, 40 140, 30 110 Z" 
      fill="#EAF6E9" 
      opacity="0.85"
    />
    <path 
      d="M170 60 C 210 50, 250 80, 240 120 C 230 160, 190 170, 160 150 C 130 130, 140 70, 170 60 Z" 
      fill="#FEF3C7" 
      opacity="0.7"
    />

    {/* Hand-drawn Roadmap lines */}
    <path 
      d="M 50 160 Q 100 120, 150 140 T 230 100" 
      stroke="#1B3B2B" 
      strokeWidth="2.5" 
      strokeDasharray="6 4" 
      strokeLinecap="round" 
    />
    <circle cx="230" cy="100" r="5" fill="#D97706" stroke="#1B3B2B" strokeWidth="2" />
    <circle cx="50" cy="160" r="4" fill="#16A34A" stroke="#1B3B2B" strokeWidth="2" />

    {/* Hand-drawn Desk/Book */}
    <rect x="70" y="85" width="85" height="55" rx="6" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2.5" />
    <line x1="85" y1="102" x2="140" y2="102" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    <line x1="85" y1="114" x2="125" y2="114" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    <line x1="85" y1="126" x2="135" y2="126" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />

    {/* Bookmark ribbon */}
    <path d="M 130 85 L 130 108 L 136 102 L 142 108 L 142 85 Z" fill="#D97706" stroke="#1B3B2B" strokeWidth="1.5" />

    {/* Hand-drawn Binoculars / Lens */}
    <g transform="translate(145, 55)">
      {/* Left lens */}
      <circle cx="28" cy="30" r="22" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2.5" />
      <circle cx="28" cy="30" r="16" fill="#EAF6E9" stroke="#16A34A" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="3" fill="#FFFFFF" />
      
      {/* Right lens */}
      <circle cx="68" cy="30" r="22" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2.5" />
      <circle cx="68" cy="30" r="16" fill="#EAF6E9" stroke="#16A34A" strokeWidth="1.5" />
      <circle cx="64" cy="26" r="3" fill="#FFFFFF" />

      {/* Bridge */}
      <path d="M 49 26 Q 48 20, 48 26" stroke="#1B3B2B" strokeWidth="3" strokeLinecap="round" />
      <rect x="46" y="27" width="4" height="6" rx="1" fill="#D97706" stroke="#1B3B2B" strokeWidth="1.5" />
    </g>

    {/* Sprouting Seedling (Purpose / Social impact) */}
    <g transform="translate(195, 125)">
      <path d="M 20 40 Q 20 25, 25 15" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M 22 25 C 10 20, 8 10, 20 12 C 22 17, 22 22, 22 25 Z" fill="#22C55E" stroke="#1B3B2B" strokeWidth="1.5" />
      {/* Right leaf */}
      <path d="M 24 18 C 36 12, 38 4, 26 6 C 24 10, 24 14, 24 18 Z" fill="#16A34A" stroke="#1B3B2B" strokeWidth="1.5" />
    </g>

    {/* Floating stars/doodles */}
    <path d="M 45 65 L 47 70 L 52 72 L 47 74 L 45 79 L 43 74 L 38 72 L 43 70 Z" fill="#D97706" />
    <path d="M 240 45 L 241 48 L 245 49 L 241 50 L 240 54 L 239 50 L 235 49 L 239 48 Z" fill="#16A34A" />
    <circle cx="215" cy="30" r="2.5" fill="#D97706" />
    <circle cx="65" cy="40" r="2" fill="#1B3B2B" />
  </svg>
);

// 2. Post a Job / Employer Recruitment Sketch (Megaphone, Clipboard, Verified Stamp, Handshake)
export const SketchPostJob: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Warm backdrop */}
    <path 
      d="M40 90 C 30 40, 90 20, 170 25 C 240 30, 260 80, 250 135 C 240 180, 160 190, 100 175 C 50 160, 45 130, 40 90 Z" 
      fill="#FEF3C7" 
      opacity="0.8"
    />
    <path 
      d="M50 120 C 30 160, 80 185, 140 180 C 120 140, 80 100, 50 120 Z" 
      fill="#EAF6E9" 
      opacity="0.9"
    />

    {/* Hand-drawn Clipboard */}
    <g transform="translate(60, 45)">
      {/* Board */}
      <rect x="0" y="15" width="95" height="120" rx="8" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2.5" />
      {/* Clip top */}
      <rect x="25" y="5" width="45" height="18" rx="4" fill="#E2E8F0" stroke="#1B3B2B" strokeWidth="2" />
      <circle cx="47.5" cy="10" r="3" fill="#1B3B2B" />

      {/* Checkmarks & job lines */}
      <circle cx="18" cy="42" r="6" fill="#EAF6E9" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M 15 42 L 17 44 L 21 39" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="30" y1="42" x2="80" y2="42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      <circle cx="18" cy="62" r="6" fill="#EAF6E9" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M 15 62 L 17 64 L 21 59" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="30" y1="62" x2="72" y2="62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      <circle cx="18" cy="82" r="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <path d="M 15 82 L 17 84 L 21 79" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="30" y1="82" x2="85" y2="82" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      {/* Verified Stamp */}
      <g transform="translate(35, 96) rotate(-8)">
        <rect x="0" y="0" width="55" height="22" rx="3" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="7" y="15" fill="#16A34A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">VERIFIED</text>
      </g>
    </g>

    {/* Hand-drawn Megaphone / Broadcast */}
    <g transform="translate(155, 60)">
      <path 
        d="M 15 35 L 55 15 L 55 65 L 15 45 Z" 
        fill="#16A34A" 
        stroke="#1B3B2B" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
      <rect x="5" y="32" width="12" height="16" rx="2" fill="#D97706" stroke="#1B3B2B" strokeWidth="2" />
      <ellipse cx="55" cy="40" rx="6" ry="25" fill="#22C55E" stroke="#1B3B2B" strokeWidth="2.5" />
      {/* Handle */}
      <path d="M 22 45 L 20 68 L 30 68 L 30 43" fill="#D97706" stroke="#1B3B2B" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Sound waves doodle */}
      <path d="M 68 28 C 76 34, 76 46, 68 52" stroke="#1B3B2B" strokeWidth="2" strokeLinecap="round" />
      <path d="M 76 20 C 88 30, 88 50, 76 60" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 84 14 C 100 28, 100 52, 84 66" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Stars & Doodles */}
    <circle cx="45" cy="40" r="3" fill="#D97706" />
    <path d="M 240 140 L 242 145 L 247 147 L 242 149 L 240 154 L 238 149 L 233 147 L 238 145 Z" fill="#16A34A" />
  </svg>
);

// 3. Blog & Editorial Writing Sketch (Quill Pen, Open Journal, Idea Spark, Coffee)
export const SketchBlogArticle: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Editorial organic backdrop */}
    <path 
      d="M35 100 C 25 50, 75 25, 150 25 C 220 25, 255 70, 245 130 C 235 180, 175 190, 110 180 C 50 170, 45 140, 35 100 Z" 
      fill="#EAF6E9" 
      opacity="0.8"
    />
    <path 
      d="M170 50 C 220 50, 250 85, 235 130 C 210 170, 160 160, 140 130 C 130 90, 140 60, 170 50 Z" 
      fill="#FEF3C7" 
      opacity="0.8"
    />

    {/* Hand-drawn Open Book / Journal */}
    <g transform="translate(65, 75)">
      {/* Left page */}
      <path 
        d="M 10 10 Q 40 5, 70 12 L 70 75 Q 40 68, 10 73 Z" 
        fill="#FFFFFF" 
        stroke="#1B3B2B" 
        strokeWidth="2.5" 
      />
      {/* Right page */}
      <path 
        d="M 70 12 Q 100 5, 130 10 L 130 73 Q 100 68, 70 75 Z" 
        fill="#FFFFFF" 
        stroke="#1B3B2B" 
        strokeWidth="2.5" 
      />
      {/* Spine */}
      <line x1="70" y1="12" x2="70" y2="75" stroke="#D97706" strokeWidth="2.5" />

      {/* Text lines on left page */}
      <line x1="22" y1="26" x2="58" y2="28" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="36" x2="54" y2="38" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="22" y1="46" x2="60" y2="48" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="22" y1="56" x2="48" y2="58" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />

      {/* Text lines on right page */}
      <line x1="82" y1="28" x2="118" y2="26" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="38" x2="114" y2="36" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="82" y1="48" x2="118" y2="46" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="82" y1="58" x2="100" y2="56" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
    </g>

    {/* Hand-drawn Feather Quill Pen */}
    <g transform="translate(160, 25) rotate(22)">
      <path 
        d="M 20 100 Q 25 50, 40 10 C 25 25, 10 50, 16 80 L 15 105 Z" 
        fill="#FFFFFF" 
        stroke="#1B3B2B" 
        strokeWidth="2" 
      />
      {/* Quill stem */}
      <line x1="16" y1="105" x2="38" y2="15" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      {/* Quill nib */}
      <path d="M 16 105 L 14 116 L 19 116 Z" fill="#1B3B2B" />
      {/* Ink drip */}
      <circle cx="13" cy="122" r="2.5" fill="#1B3B2B" />
    </g>

    {/* Coffee Mug Sketch */}
    <g transform="translate(40, 105)">
      <rect x="0" y="10" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      {/* Handle */}
      <path d="M 22 14 C 28 14, 28 26, 22 26" stroke="#1B3B2B" strokeWidth="2" fill="none" />
      {/* Warm Steam */}
      <path d="M 6 4 Q 8 0, 6 -4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 14 4 Q 16 0, 14 -4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Idea Lightbulb Spark */}
    <g transform="translate(130, 28)">
      <circle cx="15" cy="15" r="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
      <path d="M 12 25 L 18 25" stroke="#1B3B2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="0" x2="15" y2="3" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="7" x2="25" y2="9" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="7" x2="5" y2="9" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 4. Government & Civil Services Classic Architecture Pillars Sketch
export const SketchGovtCareer: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Background aura */}
    <circle cx="140" cy="100" r="75" fill="#EAF6E9" opacity="0.9" />
    <path d="M 90 40 C 130 20, 200 40, 220 90 C 230 140, 170 170, 120 160 Z" fill="#FEF3C7" opacity="0.6" />

    {/* Classical Pediment (Triangle Top) */}
    <g transform="translate(75, 45)">
      <polygon points="65,5 10,35 120,35" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Emblem circle inside pediment */}
      <circle cx="65" cy="24" r="7" fill="#FEF3C7" stroke="#16A34A" strokeWidth="1.5" />
      <line x1="65" y1="19" x2="65" y2="29" stroke="#16A34A" strokeWidth="1.2" />
      <line x1="60" y1="24" x2="70" y2="24" stroke="#16A34A" strokeWidth="1.2" />

      {/* Architrave Beam */}
      <rect x="5" y="35" width="120" height="10" rx="2" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />

      {/* 4 Pillars */}
      <rect x="14" y="45" width="14" height="60" rx="1" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      <rect x="42" y="45" width="14" height="60" rx="1" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      <rect x="74" y="45" width="14" height="60" rx="1" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      <rect x="102" y="45" width="14" height="60" rx="1" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />

      {/* Pillar flutes */}
      <line x1="21" y1="48" x2="21" y2="102" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="49" y1="48" x2="49" y2="102" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="81" y1="48" x2="81" y2="102" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="109" y1="48" x2="109" y2="102" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Plinth / Steps */}
      <rect x="0" y="105" width="130" height="10" rx="2" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      <rect x="-8" y="115" width="146" height="8" rx="2" fill="#E2E8F0" stroke="#1B3B2B" strokeWidth="2" />
    </g>

    {/* Laurel wreath branches */}
    <g transform="translate(45, 90)">
      <path d="M 15 50 Q 5 25, 20 0" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="8" cy="35" r="3" fill="#22C55E" />
      <circle cx="7" cy="20" r="3" fill="#22C55E" />
      <circle cx="14" cy="8" r="3" fill="#22C55E" />
    </g>
    <g transform="translate(215, 90)">
      <path d="M 5 50 Q 15 25, 0 0" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="35" r="3" fill="#22C55E" />
      <circle cx="13" cy="20" r="3" fill="#22C55E" />
      <circle cx="6" cy="8" r="3" fill="#22C55E" />
    </g>
  </svg>
);

// 5. Scholarship & Education Sketch (Mortarboard, Diploma Scroll, Rising Stars)
export const SketchScholarship: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    <path 
      d="M40 90 C 30 40, 90 20, 160 25 C 230 30, 260 70, 240 120 C 220 170, 150 185, 90 170 C 40 150, 45 120, 40 90 Z" 
      fill="#FEF3C7" 
      opacity="0.8"
    />
    <circle cx="190" cy="130" r="50" fill="#EAF6E9" opacity="0.9" />

    {/* Mortarboard Graduation Cap */}
    <g transform="translate(80, 50)">
      {/* Cap diamond */}
      <polygon points="60,10 5,35 60,60 115,35" fill="#1B3B2B" stroke="#1B3B2B" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Skull cap base */}
      <path d="M 25 45 Q 60 70, 95 45 L 95 65 Q 60 90, 25 65 Z" fill="#163829" stroke="#1B3B2B" strokeWidth="2" />
      
      {/* Tassel button */}
      <circle cx="60" cy="35" r="4" fill="#D97706" />
      {/* Hanging Tassel */}
      <path d="M 60 35 Q 90 40, 105 55" stroke="#D97706" strokeWidth="2" fill="none" />
      <rect x="102" y="55" width="6" height="12" rx="1" fill="#D97706" stroke="#1B3B2B" strokeWidth="1" />
    </g>

    {/* Diploma Scroll with Ribbon */}
    <g transform="translate(70, 120)">
      <rect x="20" y="10" width="85" height="26" rx="4" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />
      <ellipse cx="20" cy="23" rx="5" ry="13" fill="#F8FAFC" stroke="#1B3B2B" strokeWidth="2" />
      <ellipse cx="105" cy="23" rx="5" ry="13" fill="#E2E8F0" stroke="#1B3B2B" strokeWidth="2" />
      
      {/* Red Ribbon */}
      <rect x="55" y="8" width="12" height="30" rx="2" fill="#DC2626" stroke="#1B3B2B" strokeWidth="1.5" />
      <path d="M 57 38 L 54 48 L 61 44 L 67 48 L 65 38 Z" fill="#DC2626" stroke="#1B3B2B" strokeWidth="1" />
    </g>

    {/* Rising Stars of Achievement */}
    <g transform="translate(180, 45)">
      <path d="M 20 5 L 23 15 L 33 16 L 25 23 L 28 33 L 20 27 L 12 33 L 15 23 L 7 16 L 17 15 Z" fill="#F59E0B" stroke="#1B3B2B" strokeWidth="1.5" />
    </g>
    <g transform="translate(225, 80)">
      <path d="M 15 4 L 17 11 L 24 12 L 18 17 L 20 24 L 15 20 L 10 24 L 12 17 L 6 12 L 13 11 Z" fill="#16A34A" stroke="#1B3B2B" strokeWidth="1.2" />
    </g>
    <circle cx="65" cy="60" r="3" fill="#D97706" />
    <circle cx="215" cy="35" r="2.5" fill="#16A34A" />
  </svg>
);

// 6. Ethical Hiring Stamp / Handshake (100% Free & Verified - inspired by PurposeHire's guarantee)
export const SketchVerifiedBadge: React.FC<SketchProps> = ({ className = 'w-36 h-36', size }) => (
  <svg 
    viewBox="0 0 160 160" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Circular scalloped hand-drawn seal */}
    <circle cx="80" cy="80" r="70" fill="#EAF6E9" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="5 3" />
    <circle cx="80" cy="80" r="58" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="2" />

    {/* Center checkmark badge */}
    <circle cx="80" cy="70" r="26" fill="#16A34A" />
    <path d="M 68 70 L 76 78 L 92 62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

    {/* Curved Banner */}
    <rect x="25" y="108" width="110" height="24" rx="6" fill="#1B3B2B" stroke="#1B3B2B" strokeWidth="1.5" />
    <text x="80" y="124" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
      100% VERIFIED
    </text>
  </svg>
);

// 7. Empty State Sketch (Searching / No items found)
export const SketchEmptyState: React.FC<SketchProps> = ({ className = 'w-48 h-48', size }) => (
  <svg 
    viewBox="0 0 240 180" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    <ellipse cx="120" cy="140" rx="80" ry="16" fill="#E2E8F0" opacity="0.6" />
    <path d="M 60 70 C 40 40, 90 20, 150 25 C 200 30, 220 80, 190 120 C 160 150, 100 140, 70 120 Z" fill="#FEF3C7" opacity="0.7" />
    
    {/* Magnifying Glass */}
    <g transform="translate(75, 30)">
      <circle cx="45" cy="45" r="35" fill="#FFFFFF" stroke="#1B3B2B" strokeWidth="3" />
      <circle cx="45" cy="45" r="26" fill="#EAF6E9" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Question mark doodle */}
      <path d="M 40 38 Q 45 32, 50 38 Q 45 44, 45 48" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="45" cy="54" r="2" fill="#D97706" />

      {/* Handle */}
      <line x1="72" y1="72" x2="105" y2="105" stroke="#1B3B2B" strokeWidth="7" strokeLinecap="round" />
      <line x1="74" y1="74" x2="100" y2="100" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Little flying leaf */}
    <g transform="translate(170, 40)">
      <path d="M 10 20 C 0 10, 10 0, 20 5 C 25 15, 20 25, 10 20 Z" fill="#22C55E" stroke="#1B3B2B" strokeWidth="1.5" />
    </g>
    <circle cx="50" cy="90" r="3" fill="#D97706" />
    <circle cx="190" cy="110" r="2" fill="#1B3B2B" />
  </svg>
);
