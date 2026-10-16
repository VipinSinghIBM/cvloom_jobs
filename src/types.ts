/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteLogoConfig {
  displayMode: 'logo_only' | 'logo_text' | 'text_only';
  logoUrl?: string;
  brandText: string;
  subtitle?: string;
}

export interface VacancyDetail {
  post: string;
  total: number;
  eligibility: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DynamicButton {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'outline';
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
}

export interface SubNavItem {
  id: string;
  label: string;
  filterCategory?: string;
  filterSubCategory?: string;
  filterJobType?: string;
  description?: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  categoryFilter?: string;
  subnavs?: SubNavItem[];
}

export interface Job {
  id: string;
  title: string; // e.g., "SSC CGL Recruitment 2026"
  postName: string;
  organization: string;
  department: string;
  advertisementNumber: string;
  totalVacancies: number;
  salary: string;
  ageLimit: string;
  qualification: string;
  selectionProcess: string;
  applicationFees: { category: string; fee: string }[];
  applicationStartDate: string;
  applicationEndDate: string;
  notificationDate?: string;
  examDate?: string;
  admitCardDate?: string;
  resultDate?: string;
  state: string;
  category: string; // "Govt Jobs" | "Scholarship" | "NGO Jobs" | "Fellowship" | "Internship" | "Latest Job" | "Admit Card" | "Result"
  subCategory?: string; // "Central Govt" | "State Govt" | "Govt Samvida" | "Contractual Base" | "Govt Scholarship" | "CSR Scholarship" | "NGO Supported Scholarship" | "Non-Profit" | "CSR Job" | "UN Jobs" etc.
  jobType: string; // e.g., "Central", "State Gov", "Private", "NGO", "Contractual", "Samvida"
  location: string;
  experience: string;
  applicationMode: 'Online' | 'Offline' | 'Hybrid';
  officialWebsite: string;
  shortDescription: string;
  detailedDescription: string;
  eligibility: string;
  vacancyDetailsTable: VacancyDetail[];
  documentsRequired: string[];
  howToApply: string;
  importantInstructions: string;
  // Custom section headings controlled by Admin
  overviewHeading?: string;
  datesHeading?: string;
  feesHeading?: string;
  vacancyHeading?: string;
  eligibilityHeading?: string;
  documentsHeading?: string;
  howToApplyHeading?: string;
  faqsHeading?: string;
  linksHeading?: string;
  faqs: FAQItem[];
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  isFeatured: boolean;
  buttons: DynamicButton[];
  applyUrl?: string;
  officialNotificationPdf?: string;
  logoUrl?: string;
  videoTutorialUrl?: string;
  videoTutorialTitle?: string;
  createdAt: string;
  views: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown supported
  category: string; // "Career Guidance" | "Government Jobs" | "Resume Tips" | "Interview Tips" | "Career News" etc.
  author: string;
  publishDate: string;
  featuredImage: string;
  tags: string[];
  readingTime: string;
  viewsCount: number;
  isTrending: boolean;
  isPopular: boolean;
  isRecent: boolean;
  comments: { id: string; author: string; content: string; date: string }[];
  seoTitle: string;
  seoDescription: string;
  videoTutorialUrl?: string;
  videoTutorialTitle?: string;
  applyUrl?: string;
}

export interface Notification {
  id: string;
  message: string;
  link: string;
  type: 'alert' | 'update' | 'scheme';
  isTicker: boolean;
  createdAt: string;
}

export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  position: 'header' | 'sidebar' | 'in-content' | 'footer' | 'homepage';
  isActive: boolean;
  impressions: number;
  clicks: number;
}
