/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, Blog, Notification, HeroSlide, NavItem } from '../types';
import { getLogoConfig } from './storage';

export function generatePhpMyAdminSql(
  jobs: Job[],
  blogs: Blog[],
  notifications: Notification[],
  slides: HeroSlide[],
  navItems: NavItem[],
  settings: { [key: string]: string } = {}
): string {
  const escapeSql = (str: any): string => {
    if (str === null || str === undefined) return "''";
    return "'" + String(str).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": case "'": case "\\": case "%":
          return "\\" + char;
        default: return char;
      }
    }) + "'";
  };

  let sql = `-- ========================================================\n`;
  sql += `-- Sarkari Global by CVLoom - phpMyAdmin SQL Import Dump\n`;
  sql += `-- Generated: ${new Date().toISOString()}\n`;
  sql += `-- Target: MySQL 5.7+ / MariaDB 10.3+\n`;
  sql += `-- ========================================================\n\n`;

  sql += `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n`;
  sql += `START TRANSACTION;\n`;
  sql += `SET time_zone = "+05:30";\n\n`;

  // 1. Settings Table
  sql += `-- --------------------------------------------------------\n`;
  sql += `-- Table structure for table \`sarkari_settings\`\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_settings\` (\n`;
  sql += `  \`key_name\` VARCHAR(50) NOT NULL PRIMARY KEY,\n`;
  sql += `  \`key_value\` LONGTEXT NOT NULL\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  const allSettings = {
    ...settings,
    hero_slides: JSON.stringify(slides),
    nav_categories: JSON.stringify(navItems),
    logo_config: settings.logo_config || JSON.stringify(getLogoConfig()),
    admin_password: settings.admin_password || 'sarkari2026'
  };

  sql += `TRUNCATE TABLE \`sarkari_settings\`;\n`;
  for (const [k, v] of Object.entries(allSettings)) {
    sql += `INSERT INTO \`sarkari_settings\` (\`key_name\`, \`key_value\`) VALUES (${escapeSql(k)}, ${escapeSql(v)});\n`;
  }
  sql += `\n`;

  // 2. Notifications Table (Blinker / Marquee Ticker)
  sql += `-- --------------------------------------------------------\n`;
  sql += `-- Table: \`sarkari_notifications\` (BLINKER / UPDATES TICKER)\n`;
  sql += `-- Note: Yehi table website ke top par chalne wale Blinker / Marquee News Ticker ko control karti hai.\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_notifications\` (\n`;
  sql += `  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,\n`;
  sql += `  \`message\` TEXT NOT NULL,\n`;
  sql += `  \`link\` TEXT NOT NULL,\n`;
  sql += `  \`type\` VARCHAR(20) NOT NULL DEFAULT 'update',\n`;
  sql += `  \`isTicker\` TINYINT(1) NOT NULL DEFAULT 1,\n`;
  sql += `  \`createdAt\` VARCHAR(50) NOT NULL\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  sql += `TRUNCATE TABLE \`sarkari_notifications\`;\n`;
  for (const n of notifications) {
    sql += `INSERT INTO \`sarkari_notifications\` (\`id\`, \`message\`, \`link\`, \`type\`, \`isTicker\`, \`createdAt\`) VALUES (${escapeSql(n.id)}, ${escapeSql(n.message)}, ${escapeSql(n.link)}, ${escapeSql(n.type)}, ${n.isTicker ? 1 : 0}, ${escapeSql(n.createdAt)});\n`;
  }
  sql += `\n`;

  // 3. Blogs Table (Career Guidance & Articles)
  sql += `-- --------------------------------------------------------\n`;
  sql += `-- Table: \`sarkari_blogs\` (CAREER ARTICLES & BLOG SYSTEM)\n`;
  sql += `-- Note: Yehi table website ke Blog page, career guidance aur exam preparation articles ko store karti hai.\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_blogs\` (\n`;
  sql += `  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,\n`;
  sql += `  \`title\` TEXT NOT NULL,\n`;
  sql += `  \`slug\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`content\` LONGTEXT NOT NULL,\n`;
  sql += `  \`excerpt\` TEXT,\n`;
  sql += `  \`category\` VARCHAR(100) NOT NULL,\n`;
  sql += `  \`author\` VARCHAR(100) NOT NULL,\n`;
  sql += `  \`publishDate\` VARCHAR(50) NOT NULL,\n`;
  sql += `  \`featuredImage\` LONGTEXT,\n`;
  sql += `  \`tags\` TEXT,\n`;
  sql += `  \`readingTime\` VARCHAR(50),\n`;
  sql += `  \`viewsCount\` INT DEFAULT 0,\n`;
  sql += `  \`isTrending\` TINYINT(1) DEFAULT 0,\n`;
  sql += `  \`isPopular\` TINYINT(1) DEFAULT 0,\n`;
  sql += `  \`isRecent\` TINYINT(1) DEFAULT 0,\n`;
  sql += `  \`comments\` LONGTEXT,\n`;
  sql += `  \`seoTitle\` TEXT,\n`;
  sql += `  \`seoDescription\` TEXT,\n`;
  sql += `  \`videoTutorialUrl\` TEXT DEFAULT NULL,\n`;
  sql += `  \`videoTutorialTitle\` TEXT DEFAULT NULL,\n`;
  sql += `  \`applyUrl\` TEXT DEFAULT NULL,\n`;
  sql += `  INDEX (\`slug\`)\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  sql += `TRUNCATE TABLE \`sarkari_blogs\`;\n`;
  for (const b of blogs) {
    sql += `INSERT INTO \`sarkari_blogs\` (\`id\`, \`title\`, \`slug\`, \`content\`, \`excerpt\`, \`category\`, \`author\`, \`publishDate\`, \`featuredImage\`, \`tags\`, \`readingTime\`, \`viewsCount\`, \`isTrending\`, \`isPopular\`, \`isRecent\`, \`comments\`, \`seoTitle\`, \`seoDescription\`, \`videoTutorialUrl\`, \`videoTutorialTitle\`, \`applyUrl\`) VALUES (${escapeSql(b.id)}, ${escapeSql(b.title)}, ${escapeSql(b.slug)}, ${escapeSql(b.content)}, ${escapeSql(b.content.slice(0, 200))}, ${escapeSql(b.category)}, ${escapeSql(b.author)}, ${escapeSql(b.publishDate)}, ${escapeSql(b.featuredImage)}, ${escapeSql(b.tags.join(','))}, ${escapeSql(b.readingTime)}, ${b.viewsCount || 0}, ${b.isTrending ? 1 : 0}, ${b.isPopular ? 1 : 0}, ${b.isRecent ? 1 : 0}, ${escapeSql(JSON.stringify(b.comments || []))}, ${escapeSql(b.seoTitle)}, ${escapeSql(b.seoDescription)}, ${escapeSql(b.videoTutorialUrl || '')}, ${escapeSql(b.videoTutorialTitle || '')}, ${escapeSql(b.applyUrl || '')});\n`;
  }
  sql += `\n`;

  // 4. Jobs Table
  sql += `-- --------------------------------------------------------\n`;
  sql += `-- Table structure for table \`sarkari_jobs\`\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_jobs\` (\n`;
  sql += `  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,\n`;
  sql += `  \`title\` TEXT NOT NULL,\n`;
  sql += `  \`postName\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`organization\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`department\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`advertisementNumber\` VARCHAR(100) DEFAULT NULL,\n`;
  sql += `  \`totalVacancies\` INT DEFAULT 0,\n`;
  sql += `  \`salary\` VARCHAR(100) DEFAULT NULL,\n`;
  sql += `  \`ageLimit\` VARCHAR(255) DEFAULT NULL,\n`;
  sql += `  \`qualification\` TEXT NOT NULL,\n`;
  sql += `  \`selectionProcess\` TEXT,\n`;
  sql += `  \`applicationFees\` LONGTEXT,\n`;
  sql += `  \`applicationStartDate\` VARCHAR(50) NOT NULL,\n`;
  sql += `  \`applicationEndDate\` VARCHAR(50) NOT NULL,\n`;
  sql += `  \`notificationDate\` VARCHAR(50) DEFAULT NULL,\n`;
  sql += `  \`examDate\` VARCHAR(50) DEFAULT NULL,\n`;
  sql += `  \`admitCardDate\` VARCHAR(50) DEFAULT NULL,\n`;
  sql += `  \`resultDate\` VARCHAR(50) DEFAULT NULL,\n`;
  sql += `  \`state\` VARCHAR(100) NOT NULL,\n`;
  sql += `  \`category\` VARCHAR(100) NOT NULL,\n`;
  sql += `  \`subCategory\` VARCHAR(100) DEFAULT NULL,\n`;
  sql += `  \`jobType\` VARCHAR(100) NOT NULL,\n`;
  sql += `  \`location\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`experience\` VARCHAR(100) DEFAULT NULL,\n`;
  sql += `  \`applicationMode\` VARCHAR(20) NOT NULL,\n`;
  sql += `  \`officialWebsite\` TEXT,\n`;
  sql += `  \`shortDescription\` TEXT,\n`;
  sql += `  \`detailedDescription\` LONGTEXT,\n`;
  sql += `  \`eligibility\` TEXT,\n`;
  sql += `  \`vacancyDetailsTable\` LONGTEXT,\n`;
  sql += `  \`documentsRequired\` LONGTEXT,\n`;
  sql += `  \`howToApply\` LONGTEXT,\n`;
  sql += `  \`importantInstructions\` LONGTEXT,\n`;
  sql += `  \`faqs\` LONGTEXT,\n`;
  sql += `  \`seoTitle\` TEXT,\n`;
  sql += `  \`seoKeywords\` TEXT,\n`;
  sql += `  \`seoDescription\` TEXT,\n`;
  sql += `  \`status\` VARCHAR(20) NOT NULL DEFAULT 'Published',\n`;
  sql += `  \`isFeatured\` TINYINT(1) NOT NULL DEFAULT 0,\n`;
  sql += `  \`buttons\` LONGTEXT,\n`;
  sql += `  \`logoUrl\` LONGTEXT DEFAULT NULL,\n`;
  sql += `  \`videoTutorialUrl\` TEXT DEFAULT NULL,\n`;
  sql += `  \`videoTutorialTitle\` TEXT DEFAULT NULL,\n`;
  sql += `  \`createdAt\` VARCHAR(50) NOT NULL,\n`;
  sql += `  \`views\` INT DEFAULT 0\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  sql += `TRUNCATE TABLE \`sarkari_jobs\`;\n`;
  for (const j of jobs) {
    sql += `INSERT INTO \`sarkari_jobs\` (\n`;
    sql += `  \`id\`, \`title\`, \`postName\`, \`organization\`, \`department\`, \`advertisementNumber\`,\n`;
    sql += `  \`totalVacancies\`, \`salary\`, \`ageLimit\`, \`qualification\`, \`selectionProcess\`,\n`;
    sql += `  \`applicationFees\`, \`applicationStartDate\`, \`applicationEndDate\`, \`notificationDate\`, \`examDate\`,\n`;
    sql += `  \`admitCardDate\`, \`resultDate\`, \`state\`, \`category\`, \`subCategory\`, \`jobType\`, \`location\`,\n`;
    sql += `  \`experience\`, \`applicationMode\`, \`officialWebsite\`, \`shortDescription\`,\n`;
    sql += `  \`detailedDescription\`, \`eligibility\`, \`vacancyDetailsTable\`, \`documentsRequired\`,\n`;
    sql += `  \`howToApply\`, \`importantInstructions\`, \`faqs\`, \`seoTitle\`, \`seoKeywords\`,\n`;
    sql += `  \`seoDescription\`, \`status\`, \`isFeatured\`, \`buttons\`, \`logoUrl\`,\n`;
    sql += `  \`videoTutorialUrl\`, \`videoTutorialTitle\`, \`createdAt\`, \`views\`\n`;
    sql += `) VALUES (\n`;
    sql += `  ${escapeSql(j.id)}, ${escapeSql(j.title)}, ${escapeSql(j.postName)}, ${escapeSql(j.organization)}, ${escapeSql(j.department)}, ${escapeSql(j.advertisementNumber)},\n`;
    sql += `  ${j.totalVacancies || 0}, ${escapeSql(j.salary)}, ${escapeSql(j.ageLimit)}, ${escapeSql(j.qualification)}, ${escapeSql(j.selectionProcess)},\n`;
    sql += `  ${escapeSql(JSON.stringify(j.applicationFees || []))}, ${escapeSql(j.applicationStartDate)}, ${escapeSql(j.applicationEndDate)}, ${escapeSql(j.notificationDate || j.applicationStartDate)}, ${escapeSql(j.examDate)},\n`;
    sql += `  ${escapeSql(j.admitCardDate)}, ${escapeSql(j.resultDate)}, ${escapeSql(j.state)}, ${escapeSql(j.category)}, ${escapeSql(j.subCategory)}, ${escapeSql(j.jobType)}, ${escapeSql(j.location)},\n`;
    sql += `  ${escapeSql(j.experience)}, ${escapeSql(j.applicationMode)}, ${escapeSql(j.officialWebsite)}, ${escapeSql(j.shortDescription)},\n`;
    sql += `  ${escapeSql(j.detailedDescription)}, ${escapeSql(j.eligibility)}, ${escapeSql(JSON.stringify(j.vacancyDetailsTable || []))}, ${escapeSql(JSON.stringify(j.documentsRequired || []))},\n`;
    sql += `  ${escapeSql(j.howToApply)}, ${escapeSql(j.importantInstructions)}, ${escapeSql(JSON.stringify(j.faqs || []))}, ${escapeSql(j.seoTitle)}, ${escapeSql(j.seoKeywords)},\n`;
    sql += `  ${escapeSql(j.seoDescription)}, ${escapeSql(j.status)}, ${j.isFeatured ? 1 : 0}, ${escapeSql(JSON.stringify(j.buttons || []))}, ${escapeSql(j.logoUrl)},\n`;
    sql += `  ${escapeSql(j.videoTutorialUrl || '')}, ${escapeSql(j.videoTutorialTitle || '')}, ${escapeSql(j.createdAt)}, ${j.views || 0}\n`;
    sql += `);\n`;
  }

  // 5. Job Applications Table
  sql += `\n-- --------------------------------------------------------\n`;
  sql += `-- Table: \`sarkari_applications\` (CANDIDATE APPLICATIONS)\n`;
  sql += `-- Note: Job seekers dwara website par bhare gaye online form isme aate hain.\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_applications\` (\n`;
  sql += `  \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n`;
  sql += `  \`job_id\` VARCHAR(50) NOT NULL,\n`;
  sql += `  \`job_title\` VARCHAR(255) NOT NULL,\n`;
  sql += `  \`applicant_name\` VARCHAR(120) NOT NULL,\n`;
  sql += `  \`applicant_email\` VARCHAR(120) NOT NULL,\n`;
  sql += `  \`applicant_phone\` VARCHAR(30) NOT NULL,\n`;
  sql += `  \`qualification\` VARCHAR(255) DEFAULT NULL,\n`;
  sql += `  \`experience_years\` VARCHAR(50) DEFAULT NULL,\n`;
  sql += `  \`resume_link\` TEXT DEFAULT NULL,\n`;
  sql += `  \`cover_message\` TEXT DEFAULT NULL,\n`;
  sql += `  \`status\` VARCHAR(30) DEFAULT 'Pending',\n`;
  sql += `  \`applied_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  // 6. Newsletter Subscribers Table
  sql += `-- --------------------------------------------------------\n`;
  sql += `-- Table: \`sarkari_subscribers\` (EMAIL JOB ALERTS)\n`;
  sql += `-- Note: Email se subscribe karne wale users is table me aate hain.\n`;
  sql += `-- --------------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS \`sarkari_subscribers\` (\n`;
  sql += `  \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n`;
  sql += `  \`email\` VARCHAR(150) NOT NULL UNIQUE,\n`;
  sql += `  \`status\` VARCHAR(20) DEFAULT 'Active',\n`;
  sql += `  \`subscribed_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  sql += `COMMIT;\n`;
  return sql;
}

export function downloadSqlFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
