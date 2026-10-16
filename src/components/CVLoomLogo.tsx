/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteLogoConfig } from '../types';
import { getLogoConfig } from '../utils/storage';

interface CVLoomLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
  lightMode?: boolean;
  customConfig?: SiteLogoConfig;
}

export default function CVLoomLogo({ 
  className = '', 
  size = 'md', 
  iconOnly = false,
  lightMode = false,
  customConfig
}: CVLoomLogoProps) {
  // If customConfig is passed use it, otherwise get from storage
  const activeConfig = customConfig || getLogoConfig();
  const displayMode = activeConfig.displayMode || 'logo_text';
  const customLogoUrl = activeConfig.logoUrl;
  const brandText = activeConfig.brandText || 'CVLoom';
  const subtitle = activeConfig.subtitle !== undefined ? activeConfig.subtitle : 'Recruitment Portal';

  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 md:w-10 md:h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const titleSizes = {
    sm: 'text-sm font-black',
    md: 'text-lg md:text-xl font-black',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black'
  };

  // If icon-only is requested (for job card avatars / fallback thumbnails)
  if (iconOnly) {
    if (customLogoUrl) {
      return (
        <img 
          src={customLogoUrl} 
          alt={brandText} 
          className={`object-contain rounded-xl ${iconSizes[size]} ${className}`}
          referrerPolicy="no-referrer"
        />
      );
    }
    return (
      <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-sm flex items-center justify-center text-white shrink-0 font-black tracking-tight ${className}`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 14C10 11.7909 11.7909 10 14 10H26C28.2091 10 30 11.7909 30 14V18C30 24.6274 24.6274 30 18 30H14C11.7909 30 10 28.2091 10 26V14Z" stroke="white" strokeWidth="3" />
          <path d="M15 17L20 22L25 17" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  // 1. Text Only Mode ("Kewal text rakhna hai")
  if (displayMode === 'text_only') {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <span className={`${titleSizes[size]} tracking-tight leading-none ${lightMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          {brandText === 'CVLoom' ? (
            <>CV<span className="text-blue-600 dark:text-blue-400">Loom</span></>
          ) : (
            brandText
          )}
        </span>
        {subtitle && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-400 mt-1">
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  // 2. Logo Only Mode ("Kewal logo rakhna hai")
  if (displayMode === 'logo_only') {
    if (customLogoUrl) {
      return (
        <div className={`flex items-center select-none ${className}`}>
          <img 
            src={customLogoUrl} 
            alt={brandText} 
            className={`object-contain rounded-xl max-h-11 w-auto ${className}`}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-sm flex items-center justify-center text-white shrink-0`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14C10 11.7909 11.7909 10 14 10H26C28.2091 10 30 11.7909 30 14V18C30 24.6274 24.6274 30 18 30H14C11.7909 30 10 28.2091 10 26V14Z" stroke="white" strokeWidth="3" />
            <path d="M15 17L20 22L25 17" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }

  // 3. Logo + Text Mode ("Logo and text rakhna hai") - Default
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Logo Graphic or Uploaded Image */}
      {customLogoUrl ? (
        <img 
          src={customLogoUrl} 
          alt={brandText} 
          className={`object-contain rounded-xl ${iconSizes[size]} shrink-0`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-sm flex items-center justify-center text-white shrink-0`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14C10 11.7909 11.7909 10 14 10H26C28.2091 10 30 11.7909 30 14V18C30 24.6274 24.6274 30 18 30H14C11.7909 30 10 28.2091 10 26V14Z" stroke="white" strokeWidth="3" />
            <path d="M15 17L20 22L25 17" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span className={`${titleSizes[size]} tracking-tight ${lightMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          {brandText === 'CVLoom' ? (
            <>CV<span className="text-blue-600 dark:text-blue-400">Loom</span></>
          ) : (
            brandText
          )}
        </span>
        {subtitle && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-400 mt-1">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
