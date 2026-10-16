/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, Blog, Notification, Advertisement, HeroSlide, NavItem } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'UPSC Civil Services Examination (CSE) 2026',
    postName: 'IAS, IFS, IPS, and Group A/B Services',
    organization: 'Union Public Service Commission',
    department: 'Department of Personnel and Training',
    advertisementNumber: '05/2026-CSP',
    totalVacancies: 1056,
    salary: '₹56,100 - ₹2,50,000 (Pay Level 10)',
    ageLimit: '21 to 32 Years (Relaxation as per rules)',
    qualification: 'Bachelor\'s Degree in any discipline from a recognized University',
    selectionProcess: 'Preliminary Examination (Objective) -> Main Examination (Written) -> Personality Test (Interview)',
    applicationFees: [
      { category: 'General / OBC / EWS', fee: '₹100' },
      { category: 'SC / ST / PH / Female', fee: '₹0 (Exempted)' }
    ],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-25',
    notificationDate: '2026-05-28',
    examDate: '2026-09-12',
    admitCardDate: '2026-08-28',
    resultDate: '2026-11-15',
    state: 'All India',
    category: 'Govt Jobs',
    subCategory: 'Central Govt',
    jobType: 'Central',
    location: 'Across India',
    experience: 'Fresher / No Experience Required',
    applicationMode: 'Online',
    officialWebsite: 'https://upsc.gov.in',
    shortDescription: 'Union Public Service Commission (UPSC) has released the notification for the prestigious Civil Services Examination 2026 for recruiting candidates to IAS, IPS, IFS, and various other civil services.',
    detailedDescription: 'The Union Public Service Commission (UPSC) conducts the Civil Services Examination annually. Candidates must check their eligibility carefully before applying online. The exam is conducted in three stages: Prelims, Mains, and Interview.',
    eligibility: 'Candidate must be a citizen of India. Must hold a graduate degree from any recognized university in India or equivalent qualification.',
    vacancyDetailsTable: [
      { post: 'Indian Administrative Service (IAS)', total: 180, eligibility: 'Graduate Degree' },
      { post: 'Indian Police Service (IPS)', total: 200, eligibility: 'Graduate Degree + Physical Standards' },
      { post: 'Indian Foreign Service (IFS)', total: 45, eligibility: 'Graduate Degree' },
      { post: 'Central Group A Services', total: 480, eligibility: 'Graduate Degree' },
      { post: 'Group B Services', total: 151, eligibility: 'Graduate Degree' }
    ],
    documentsRequired: [
      'Scanned Photograph (Passport size, white background)',
      'Scanned Signature (Black ink preferred)',
      'Valid Photo ID Proof (Aadhaar / Voter ID / PAN / Passport)',
      'Educational Certificates (Degree, Matriculation)',
      'Community / Caste Certificate (if applicable)'
    ],
    howToApply: '1. Visit the official UPSC application portal (upsconline.nic.in).\n2. Complete the One-Time Registration (OTR) process if not done already.\n3. Fill in the Part-I Registration details.\n4. Pay the required application fee online.\n5. Upload your photograph, signature, and photo ID card.\n6. Select your preferred examination center.\n7. Agree to the declaration and submit Part-II Registration.',
    importantInstructions: 'Make sure the photograph is taken recently and displays your name and the date of the photograph at the bottom. Do not upload blurred signatures or documents.',
    faqs: [
      { question: 'What is the age limit for UPSC CSE General Category?', answer: 'The age limit is 21 to 32 years. Candidate must not have been born earlier than 2nd August 1994 and not later than 1st August 2005.' },
      { question: 'How many attempts are permitted for General/OBC candidates?', answer: 'General category candidates are permitted 6 attempts, while OBC candidates are permitted 9 attempts. There is no limit for SC/ST candidates within the age eligibility.' }
    ],
    seoTitle: 'UPSC Civil Services Exam 2026 Notification - Apply for IAS IPS IFS 1056 Posts',
    seoKeywords: 'upsc cse 2026, ias registration 2026, upsc notification 2026, upsc syllabus, upsc online apply',
    seoDescription: 'UPSC CSE 2026 Online Application. Union Public Service Commission has announced 1056 vacancies for IAS, IPS, IFS. Check qualification, physical standards, dates, syllabus and fees.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply Online', url: 'https://upsconline.nic.in', variant: 'primary' },
      { label: 'Download Notification', url: 'https://upsc.gov.in/sites/default/files/Exam-Notif-CSE-26-Engl.pdf', variant: 'outline' },
      { label: 'Download Syllabus', url: 'https://upsc.gov.in/sites/default/files/Syllabus-CSE.pdf', variant: 'secondary' },
      { label: 'Official Website', url: 'https://upsc.gov.in', variant: 'outline' }
    ],
    videoTutorialUrl: 'https://www.youtube.com/watch?v=k3_tw44QsZQ',
    videoTutorialTitle: 'UPSC CSE 2026 Online Form Kaise Bhare - Step by Step Video Guide',
    createdAt: '2026-06-02T10:00:00Z',
    views: 12450
  },
  {
    id: 'job-state-1',
    title: 'UP Police Constable & SI Recruitment 2026',
    postName: 'Police Constable (Civil) & Sub Inspector',
    organization: 'Uttar Pradesh Police Recruitment Board (UPPRPB)',
    department: 'Home Police Department',
    advertisementNumber: 'PRPB-01/2026',
    totalVacancies: 60244,
    salary: '₹21,700 - ₹69,100 (Pay Scale Level 3)',
    ageLimit: '18 to 25 Years (Relaxation for OBC/SC/ST)',
    qualification: '10+2 (Intermediate) Exam Passed from Any Recognized Board in India',
    selectionProcess: 'Written Examination (OMR Based) -> Physical Standard Test (PST) -> Physical Efficiency Test (PET)',
    applicationFees: [
      { category: 'General / OBC', fee: '₹400' },
      { category: 'SC / ST', fee: '₹400' }
    ],
    applicationStartDate: '2026-05-15',
    applicationEndDate: '2026-07-20',
    notificationDate: '2026-05-10',
    state: 'Uttar Pradesh',
    category: 'Govt Jobs',
    subCategory: 'State Govt',
    jobType: 'State Gov',
    location: 'Uttar Pradesh (Various Districts)',
    experience: 'Fresher Eligible',
    applicationMode: 'Online',
    officialWebsite: 'https://uppbpb.gov.in',
    shortDescription: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) invites online applications for 60,244 vacancies of Police Constable.',
    detailedDescription: 'The Uttar Pradesh Police Recruitment Board has announced the direct recruitment for Constables in Civil Police. Candidates must ensure they meet the minimum physical running standards (4.8 km in 25 mins for male candidates).',
    eligibility: 'Intermediate (10+2) passed candidate with prescribed physical height and chest measurements.',
    vacancyDetailsTable: [
      { post: 'Police Constable (Civil Police)', total: 60244, eligibility: '10+2 Intermediate Pass' }
    ],
    documentsRequired: [
      'Class 10th and 12th Marksheet & Passing Certificate',
      'Domicile / Nativity Certificate of Uttar Pradesh',
      'OBC / SC / ST Caste Certificate (if applicable)',
      'Scanned Color Photograph and Signature'
    ],
    howToApply: '1. Visit official website uppbpb.gov.in.\n2. Complete Direct Recruitment candidate registration.\n3. Fill in educational and personal data.\n4. Pay application fee through SBI payment gateway.\n5. Upload signature and recent photograph.\n6. Print final submission page.',
    importantInstructions: 'Candidates must carry the identical photo uploaded during application to the examination center.',
    faqs: [
      { question: 'What is the running standard for Male Constables in UP Police?', answer: 'Male candidates must complete 4.8 kilometers run within 25 minutes.' }
    ],
    seoTitle: 'UP Police Constable Recruitment 2026 - Apply Online for 60244 Posts',
    seoKeywords: 'up police constable 2026, uppbpb online apply, up police vacancy, sarkari job up police',
    seoDescription: 'UP Police Constable Recruitment 2026 Notification. Apply online for 60244 posts. Check eligibility, syllabus, physical standards, and fee details.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply Online', url: 'https://uppbpb.gov.in', variant: 'primary' },
      { label: 'Download Notification', url: 'https://uppbpb.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-05-15T08:00:00Z',
    views: 34200
  },
  {
    id: 'job-samvida-1',
    title: 'NHM Samvida Community Health Officer (CHO) 2026',
    postName: 'Community Health Officer (CHO) Contractual',
    organization: 'National Health Mission (NHM)',
    department: 'State Health Society & Family Welfare',
    advertisementNumber: 'NHM/CHO-Samvida/2026',
    totalVacancies: 4800,
    salary: '₹25,000 + ₹15,000 Incentive per month',
    ageLimit: '21 to 40 Years',
    qualification: 'B.Sc Nursing / Post Basic B.Sc Nursing with CCH Integrated Course',
    selectionProcess: 'Merit-based Shortlisting based on B.Sc Nursing Marks & Document Verification',
    applicationFees: [
      { category: 'General / OBC', fee: '₹0 (Free)' },
      { category: 'SC / ST / PWD', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-05-01',
    applicationEndDate: '2026-06-30',
    notificationDate: '2026-04-28',
    state: 'All India',
    category: 'Govt Jobs',
    subCategory: 'Govt Samvida',
    jobType: 'Contractual',
    location: 'District Health Wellness Centers (HWCs)',
    experience: 'Fresher Nursing Graduates Eligible',
    applicationMode: 'Online',
    officialWebsite: 'https://nhm.gov.in',
    shortDescription: 'National Health Mission (NHM) invites online applications for Samvida Community Health Officers (CHO) on a contractual basis.',
    detailedDescription: 'The position is purely contractual for strengthening primary healthcare delivery at Sub-Health Centers converted into Ayushman Arogya Mandirs (Health & Wellness Centers). Honorarium is ₹25,000 fixed plus up to ₹15,000 performance incentive.',
    eligibility: 'Candidate must possess B.Sc Nursing or Post Basic B.Sc Nursing from an Indian Nursing Council recognized college with Certificate Course in Community Health (CCH).',
    vacancyDetailsTable: [
      { post: 'Samvida CHO (Health & Wellness Center)', total: 4800, eligibility: 'B.Sc Nursing with Integrated CCH' }
    ],
    documentsRequired: [
      'Nursing Registration Certificate (State or INC)',
      'B.Sc Nursing Marksheets of all years',
      'Certificate of Principal stating CCH integration',
      'Aadhaar Card'
    ],
    howToApply: '1. Register at state NHM official portal.\n2. Submit nursing registration number and year of passing.\n3. Upload scanned marksheets and CCH principal certificate.\n4. Submit district preference order.\n5. Download acknowledgment slip.',
    importantInstructions: 'No application fee is charged by NHM. Selected candidates will be assigned to HWCs based on district merit.',
    faqs: [
      { question: 'What is the monthly stipend / salary for NHM CHO?', answer: 'The monthly honorarium is ₹25,000 plus performance-based incentives up to ₹15,000 per month.' }
    ],
    seoTitle: 'NHM Samvida CHO Recruitment 2026 - Apply for 4800 Contractual Vacancies',
    seoKeywords: 'nhm samvida cho, nhm contractual recruitment, nursing jobs samvida, community health officer',
    seoDescription: 'National Health Mission Samvida Community Health Officer recruitment 2026. Apply for 4800 contractual CHO posts with official application link.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply Online', url: 'https://nhm.gov.in', variant: 'primary' },
      { label: 'Official Guidelines PDF', url: 'https://nhm.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-05-02T10:00:00Z',
    views: 18400
  },
  {
    id: 'job-contract-1',
    title: 'NITI Aayog Contractual Young Professional & Project Associate',
    postName: 'Young Professional / Consultant (Public Policy & Tech)',
    organization: 'NITI Aayog (National Institution for Transforming India)',
    department: 'Policy Research & Monitoring Division',
    advertisementNumber: 'NITI-YP/Cont/2026',
    totalVacancies: 45,
    salary: '₹70,000 - ₹1,45,000 Fixed per month',
    ageLimit: 'Below 32 Years as on date of application',
    qualification: 'Master’s Degree or B.Tech/BE in relevant discipline with 1 year experience',
    selectionProcess: 'Profile Screening -> Written Presentation / Case Study -> Technical Interview',
    applicationFees: [
      { category: 'All Applicants', fee: '₹0 (No Fee)' }
    ],
    applicationStartDate: '2026-06-10',
    applicationEndDate: '2026-07-31',
    notificationDate: '2026-06-08',
    state: 'New Delhi',
    category: 'Govt Jobs',
    subCategory: 'Contractual Base',
    jobType: 'Contractual',
    location: 'NITI Bhawan, New Delhi',
    experience: '1-3 Years Experience Preferred',
    applicationMode: 'Online',
    officialWebsite: 'https://niti.gov.in',
    shortDescription: 'NITI Aayog invites applications for contractual Young Professionals to contribute to policy formulation and flagship scheme monitoring.',
    detailedDescription: 'Young Professionals will be engaged on contractual basis for a period of 2 years (extendable up to 5 years). They will work closely with Vertical Heads in sectors including Health, Education, Agriculture, Electric Mobility, and Digital Governance.',
    eligibility: 'Master’s degree in Economics / Public Policy / Management / Development Studies or B.Tech with demonstrable policy or research aptitude.',
    vacancyDetailsTable: [
      { post: 'Young Professional (YP) Contractual', total: 30, eligibility: 'Post Graduate / B.Tech + 1 yr exp' },
      { post: 'Consultant Grade 1', total: 15, eligibility: 'Post Graduate + 3-5 yrs exp' }
    ],
    documentsRequired: [
      'Updated Curriculum Vitae (ATS format preferred)',
      'Degree Certificates & Transcripts',
      'Statement of Purpose (500 words)',
      'Past work sample / publication link'
    ],
    howToApply: '1. Visit workwithniti.gov.in portal.\n2. Fill online career profile with academic records.\n3. Upload ATS resume and Statement of Purpose.\n4. Submit before the closing deadline.',
    importantInstructions: 'Applications without a Statement of Purpose will be summarily rejected.',
    faqs: [
      { question: 'What is the contract tenure at NITI Aayog?', answer: 'The initial tenure is 2 years, extendable up to 5 years subject to performance review.' }
    ],
    seoTitle: 'NITI Aayog Contractual Young Professional Recruitment 2026 - Apply Online',
    seoKeywords: 'niti aayog young professional, niti aayog contractual jobs, public policy recruitment delhi',
    seoDescription: 'NITI Aayog invites applications for contractual Young Professionals with stipend of 70k to 1.45L per month. Apply online now.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on NITI Portal', url: 'https://niti.gov.in', variant: 'primary' },
      { label: 'Download Job Description', url: 'https://niti.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-06-11T09:00:00Z',
    views: 14200
  },
  {
    id: 'job-ngo-1',
    title: 'Goonj Social Development & State Program Lead 2026',
    postName: 'State Program Manager & Community Coordinator',
    organization: 'Goonj Non-Profit Organization',
    department: 'Disaster Relief & Rural Livelihoods Wing',
    advertisementNumber: 'GOONJ-DEV/2026-01',
    totalVacancies: 24,
    salary: '₹45,000 - ₹75,000 Per Month + Field Travel Allowances',
    ageLimit: '22 to 45 Years',
    qualification: 'Graduate / Post Graduate in Social Work (MSW), Development Studies or equivalent',
    selectionProcess: 'Application Review -> Field Work Assignment -> Personal Interview',
    applicationFees: [
      { category: 'All Candidates', fee: '₹0 (No Fee)' }
    ],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-28',
    notificationDate: '2026-05-25',
    state: 'All India',
    category: 'NGO Jobs',
    subCategory: 'Non-Profit',
    jobType: 'NGO',
    location: 'Offices in Delhi, Bihar, Odisha, Maharashtra, Karnataka',
    experience: '1-4 Years Grassroots / NGO Experience',
    applicationMode: 'Online',
    officialWebsite: 'https://goonj.org',
    shortDescription: 'Goonj, a leading Indian social enterprise, is hiring State Program Managers and Rural Development Leads across India.',
    detailedDescription: 'Join Goonj in its mission of turning discarded urban material into a development currency for rural India. The Program Manager will lead community mobilization, disaster mitigation, and cloth-for-work initiatives.',
    eligibility: 'Passionate individuals with grassroots community empathy, strong regional language fluency, and MSW or developmental qualification.',
    vacancyDetailsTable: [
      { post: 'State Program Manager', total: 8, eligibility: 'MSW / Masters + 3 yrs grassroots exp' },
      { post: 'Community Coordinator', total: 16, eligibility: 'Graduation + willingness for field stay' }
    ],
    documentsRequired: [
      'CV / Resume with grassroots experience highlighted',
      'Brief Cover Letter on Why Development Sector',
      'Two professional references from non-profit sector'
    ],
    howToApply: '1. Visit official Goonj careers page.\n2. Submit online registration form.\n3. Upload CV and Cover Letter in PDF format.\n4. Shortlisted candidates will be invited for field interaction.',
    importantInstructions: 'Frequent rural travel and overnight village stays are required for this role.',
    faqs: [
      { question: 'Is language proficiency required?', answer: 'Yes, proficiency in Hindi or local regional languages (Hindi, Odia, Marathi, Bengali) is essential for community engagement.' }
    ],
    seoTitle: 'Goonj NGO Recruitment 2026 - Apply for State Program Coordinator Posts',
    seoKeywords: 'goonj ngo jobs, non profit vacancies india, msw careers 2026, social work recruitment',
    seoDescription: 'Goonj Non-Profit Organization is hiring Program Managers and Coordinators across India. Check job descriptions, compensation, and apply online.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply to Goonj', url: 'https://goonj.org', variant: 'primary' },
      { label: 'About Goonj Initiatives', url: 'https://goonj.org', variant: 'outline' }
    ],
    createdAt: '2026-06-02T11:00:00Z',
    views: 11200
  },
  {
    id: 'job-ngo-csr',
    title: 'Tata Trusts CSR Regional Education Coordinator',
    postName: 'CSR Project Lead (Education & Skilling)',
    organization: 'Tata Trusts & Foundation',
    department: 'Corporate Social Responsibility (CSR) Division',
    advertisementNumber: 'TT-CSR/2026/EDU',
    totalVacancies: 18,
    salary: '₹60,000 - ₹95,000 Per Month',
    ageLimit: '24 to 45 Years',
    qualification: 'Post Graduation in Education / Social Sciences / Management',
    selectionProcess: 'Profile Evaluation -> Case Study Interview -> Final Board Discussion',
    applicationFees: [
      { category: 'All Applicants', fee: '₹0' }
    ],
    applicationStartDate: '2026-05-20',
    applicationEndDate: '2026-07-25',
    notificationDate: '2026-05-18',
    state: 'All India',
    category: 'NGO Jobs',
    subCategory: 'CSR Job',
    jobType: 'NGO',
    location: 'Mumbai, Ranchi, Ahmedabad, Guwahati',
    experience: '2-5 Years CSR / Project Management Experience',
    applicationMode: 'Online',
    officialWebsite: 'https://tatatrusts.org',
    shortDescription: 'Tata Trusts invites experienced CSR professionals to manage innovative education and skilling interventions in aspirational districts.',
    detailedDescription: 'The CSR Project Lead will collaborate with district administrations and partner schools to implement foundational literacy, digital classrooms, and teacher capacity development under Tata Trusts philanthropic portfolio.',
    eligibility: 'Demonstrated experience in CSR project planning, budget monitoring, and government school systems engagement.',
    vacancyDetailsTable: [
      { post: 'CSR Regional Coordinator', total: 18, eligibility: 'Post Graduate + 2 yrs CSR experience' }
    ],
    documentsRequired: [
      'Resume / CV',
      'Educational Degree Certificates',
      'Portfolio of past CSR impact reports'
    ],
    howToApply: '1. Access tatatrusts.org/careers.\n2. Select "CSR Regional Coordinator (Education)".\n3. Complete profile submission and attach updated CV.',
    importantInstructions: 'Please specify your preferred regional location in the application form.',
    faqs: [
      { question: 'What is the recruitment process?', answer: 'Shortlisted applicants complete a technical case study followed by a virtual interview with the Trust leadership.' }
    ],
    seoTitle: 'Tata Trusts CSR Job Vacancy 2026 - Regional Education Project Coordinator',
    seoKeywords: 'tata trusts jobs, csr vacancies india, corporate social responsibility careers, tata foundations',
    seoDescription: 'Apply online for Tata Trusts CSR Project Lead openings in education and social development. Excellent compensation and pan-India impact.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on Tata Trusts', url: 'https://tatatrusts.org', variant: 'primary' },
      { label: 'Program Portfolio PDF', url: 'https://tatatrusts.org', variant: 'outline' }
    ],
    createdAt: '2026-05-22T08:00:00Z',
    views: 15800
  },
  {
    id: 'job-ngo-un',
    title: 'UNICEF India Child Protection & Nutrition Specialist',
    postName: 'National Consultant / Child Protection Officer',
    organization: 'UNICEF India (United Nations Children\'s Fund)',
    department: 'Child Protection & Public Health Program',
    advertisementNumber: 'UNICEF-IND-2026-04',
    totalVacancies: 12,
    salary: 'UN Remuneration Scale (NO-B Grade: ₹1,20,000 - ₹1,85,000/mo)',
    ageLimit: '26 to 50 Years',
    qualification: 'Advanced University Degree (Master’s or higher) in Social Sciences, Public Health, Law or Human Rights',
    selectionProcess: 'UN Inspira / UN Careers Assessment -> Competency Based Interview',
    applicationFees: [
      { category: 'All Applicants', fee: '₹0 (UN does not charge any fee)' }
    ],
    applicationStartDate: '2026-06-05',
    applicationEndDate: '2026-07-26',
    notificationDate: '2026-06-01',
    state: 'All India',
    category: 'NGO Jobs',
    subCategory: 'UN Jobs',
    jobType: 'NGO',
    location: 'UNICEF India Country Office, New Delhi & Field Offices',
    experience: '3-5 Years of professional experience in child protection or public health',
    applicationMode: 'Online',
    officialWebsite: 'https://unicef.org/india',
    shortDescription: 'UNICEF India is recruiting National Officers and Child Protection Specialists to support state government child welfare systems.',
    detailedDescription: 'The Child Protection Specialist provides technical expertise, evidence generation, and policy advocacy for child protection systems strengthening, prevention of violence, and juvenile justice across India.',
    eligibility: 'Advanced university degree with relevant development experience in child rights, public health, or policy formulation.',
    vacancyDetailsTable: [
      { post: 'Child Protection Officer (NO-B)', total: 7, eligibility: 'Advanced Degree + 3 yrs UN/Dev exp' },
      { post: 'Nutrition Technical Specialist', total: 5, eligibility: 'Master’s in Public Health + 5 yrs exp' }
    ],
    documentsRequired: [
      'UN Personal History Profile (P11 Form)',
      'Certified Copies of Post-Graduate Degrees',
      'Passport / National ID Card Copy'
    ],
    howToApply: '1. Visit unicef.org/careers or jobs.unicef.org.\n2. Search Job ID "India Child Protection".\n3. Complete online UN P11 profile and motivation letter.\n4. Submit before 26 July 2026.',
    importantInstructions: 'UNICEF does not charge any fee at any stage of the recruitment process. Beware of fraudulent agencies.',
    faqs: [
      { question: 'Can Indian nationals apply for NO-B positions?', answer: 'Yes, National Officer (NO) posts in UNICEF India are exclusively reserved for Indian nationals.' }
    ],
    seoTitle: 'UNICEF India Recruitment 2026 - Child Protection Specialist UN Jobs',
    seoKeywords: 'unicef india jobs, un jobs delhi, united nations careers india, child protection specialist',
    seoDescription: 'Apply online for UNICEF India career openings. NO-B grade positions with international UN benefits and competitive compensation.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on UN Careers', url: 'https://unicef.org/india', variant: 'primary' },
      { label: 'UN P11 Guide', url: 'https://unicef.org', variant: 'outline' }
    ],
    createdAt: '2026-06-06T10:00:00Z',
    views: 22100
  },
  {
    id: 'job-sch-csr',
    title: 'Tata Capital Pankh Scholarship for Class 11, 12 & Higher Education',
    postName: 'Tata Capital Pankh Scholarship 2026-27',
    organization: 'Tata Capital CSR Foundation',
    department: 'Education Assistance Program',
    advertisementNumber: 'TCP-SCH/2026-27',
    totalVacancies: 15000,
    salary: 'Up to ₹50,000 or 80% of Tuition Fees',
    ageLimit: 'Open to School & College Students',
    qualification: 'Class 10th / 12th passed with minimum 60% marks',
    selectionProcess: 'Academic Merit + Document Verification + Telephonic Interview',
    applicationFees: [
      { category: 'All Categories', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-05-15',
    applicationEndDate: '2026-08-31',
    notificationDate: '2026-05-10',
    state: 'All India',
    category: 'Scholarship',
    subCategory: 'CSR Scholarship',
    jobType: 'Private',
    location: 'Pan-India Students',
    experience: 'Students Only',
    applicationMode: 'Online',
    officialWebsite: 'https://tatacapital.com',
    shortDescription: 'Tata Capital Pankh Scholarship provides financial aid up to ₹50,000 to meritorious students from economically weaker families.',
    detailedDescription: 'The scholarship aims to support deserving students enrolled in Class 11, 12, General Graduation, Diploma, or Professional degree courses (B.Tech, MBBS, BBA). Annual family income must not exceed ₹4,00,000.',
    eligibility: 'Must be studying in recognized institution with minimum 60% aggregate in preceding class. Family income under 4 Lakhs per annum.',
    vacancyDetailsTable: [
      { post: 'Class 11 & 12 Pankh Scholarship', total: 5000, eligibility: 'Enrolled in 11th/12th, 60% in 10th' },
      { post: 'Undergraduate Degree Scholarship', total: 6000, eligibility: 'Enrolled in BA, B.Sc, B.Com, B.Tech' },
      { post: 'Professional Diploma Scholarship', total: 4000, eligibility: 'Polytechnic / Diploma students' }
    ],
    documentsRequired: [
      'Photo Identity Proof (Aadhaar Card)',
      'Current Year Admission Receipt & College ID Card',
      'Previous Class Marksheet',
      'Family Income Proof (Salary slip, ITR or Ward Councillor cert)'
    ],
    howToApply: '1. Visit Tata Capital Pankh scholarship portal.\n2. Log in using Mobile/Email.\n3. Fill student educational details and family background.\n4. Upload fee receipt and previous marksheets.\n5. Submit online application before 31 August.',
    importantInstructions: 'Children of Tata Group employees are not eligible for this scholarship scheme.',
    faqs: [
      { question: 'What is the maximum scholarship amount?', answer: 'Selected students receive up to ₹50,000 or 80% of their actual tuition fees (whichever is lower).' }
    ],
    seoTitle: 'Tata Capital Pankh Scholarship 2026 - Apply for 50k Educational Grant',
    seoKeywords: 'tata pankh scholarship 2026, csr scholarships india, college student grants, free scholarship',
    seoDescription: 'Apply online for Tata Capital Pankh Scholarship 2026. Get up to 50,000 grant for Class 11, 12, and College students. Check eligibility and apply.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on Portal', url: 'https://tatacapital.com', variant: 'primary' },
      { label: 'Scholarship FAQ PDF', url: 'https://tatacapital.com', variant: 'outline' }
    ],
    createdAt: '2026-05-16T10:00:00Z',
    views: 19500
  },
  {
    id: 'job-sch-ngo',
    title: 'Smile Foundation & Vidyasaarathi Girl Child Scholarship 2026',
    postName: 'She Can Fly NGO Girl Child Education Grant',
    organization: 'Smile Foundation & Vidyasaarathi NGO Partner',
    department: 'Girl Child Empowerment Wing',
    advertisementNumber: 'SMILE-SCH/2026',
    totalVacancies: 5000,
    salary: '₹25,000 to ₹40,000 Per Annum Direct Bank Transfer',
    ageLimit: 'Open to Female Students',
    qualification: 'Girls studying in Class 9th to Post-Graduation',
    selectionProcess: 'Need-based Financial Assessment & Academic Records Check',
    applicationFees: [
      { category: 'All Girls', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-05-01',
    applicationEndDate: '2026-08-15',
    notificationDate: '2026-04-25',
    state: 'All India',
    category: 'Scholarship',
    subCategory: 'NGO Supported Scholarship',
    jobType: 'NGO',
    location: 'Across All Indian States',
    experience: 'Female Students Only',
    applicationMode: 'Online',
    officialWebsite: 'https://smilefoundationindia.org',
    shortDescription: 'Smile Foundation invites applications for non-profit educational grants for girl students from underprivileged backgrounds.',
    detailedDescription: 'The "She Can Fly" initiative by Smile Foundation ensures that meritorious girls do not drop out due to economic hardship. Grant amount is transferred directly to the candidate\'s savings bank account.',
    eligibility: 'Female candidates enrolled in recognized schools, ITIs, or colleges with family income below ₹3,00,000 per year.',
    vacancyDetailsTable: [
      { post: 'School Level Girl Grant (Class 9-12)', total: 3000, eligibility: 'Enrolled female students' },
      { post: 'Higher Education NGO Grant', total: 2000, eligibility: 'Girls in Degree / Diploma courses' }
    ],
    documentsRequired: [
      'Student Aadhaar Card',
      'School / College Bonafide Certificate',
      'Bank Account Passbook (In student\'s name)',
      'Parental Income Certificate'
    ],
    howToApply: '1. Visit vidyasaarathi.co.in or smilefoundationindia.org.\n2. Choose "Smile Foundation She Can Fly Scholarship".\n3. Fill in candidate personal, academic, and bank details.\n4. Upload scanned certificates and submit.',
    importantInstructions: 'Bank accounts must be Aadhaar-seeded for smooth DBT scholarship disbursement.',
    faqs: [
      { question: 'Is there any minimum percentage required?', answer: 'A minimum of 50% marks in the preceding final examination is required to qualify.' }
    ],
    seoTitle: 'Smile Foundation Girl Child Scholarship 2026 - Apply for 40k NGO Grant',
    seoKeywords: 'smile foundation scholarship, ngo girl scholarship, vidyasaarathi grants 2026',
    seoDescription: 'Apply online for Smile Foundation & Vidyasaarathi NGO Girl Child Scholarship 2026. Up to 40k direct financial aid for school and college girls.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Apply on Vidyasaarathi', url: 'https://vidyasaarathi.co.in', variant: 'primary' },
      { label: 'Smile Foundation Info', url: 'https://smilefoundationindia.org', variant: 'outline' }
    ],
    createdAt: '2026-05-02T09:00:00Z',
    views: 13400
  },
  {
    id: 'job-fel-govt',
    title: 'Prime Minister Research Fellowship (PMRF) 2026',
    postName: 'PM Research Fellow (Doctoral Ph.D. Scholars)',
    organization: 'Ministry of Education & IIT Council',
    department: 'Higher Education Department',
    advertisementNumber: 'MoE-PMRF-CYCLE-14',
    totalVacancies: 1000,
    salary: '₹70,000 - ₹80,000 per month + ₹2,00,000 Annual Research Contingency Grant',
    ageLimit: 'No Age Limit',
    qualification: 'B.Tech / M.Tech / M.Sc with high CGPA / GATE / NET in IITs, IISc, IISERs, NITs',
    selectionProcess: 'Direct Entry / Lateral Entry -> National Screening Committee Evaluation',
    applicationFees: [
      { category: 'All Applicants', fee: '₹0' }
    ],
    applicationStartDate: '2026-05-10',
    applicationEndDate: '2026-07-31',
    notificationDate: '2026-05-05',
    state: 'All India',
    category: 'Fellowship',
    subCategory: 'Govt Fellowship',
    jobType: 'Central',
    location: 'IITs, IISc Bangalore, and Central Research Labs',
    experience: 'Researchers & Ph.D. scholars',
    applicationMode: 'Online',
    officialWebsite: 'https://pmrf.in',
    shortDescription: 'The Prime Minister’s Research Fellowship (PMRF) offers India’s most prestigious doctoral fellowship with ₹80,000 stipend and ₹2 Lakh research grant.',
    detailedDescription: 'The PMRF scheme has been designed for improving the quality of research in higher educational institutions in India. Fellows receive ₹70,000/mo for first two years, ₹75,000/mo in third year, and ₹80,000/mo in fourth and fifth years.',
    eligibility: 'Completed or in final year of B.Tech/Integrated M.Tech/M.Sc with minimum 8.0 CGPA from eligible granting institutions and qualifying GATE/NET.',
    vacancyDetailsTable: [
      { post: 'Prime Minister Research Fellow (PMRF)', total: 1000, eligibility: 'Ph.D. admitted in IIT/IISc with >=8.0 CGPA' }
    ],
    documentsRequired: [
      'Research Proposal (Abstract & Methodology)',
      'Undergraduate and Master transcripts',
      'Recommendation letters from 2 Professors',
      'GATE / NET scorecard'
    ],
    howToApply: '1. Get recommended through your host institute (IIT, IISc, IISER).\n2. Register on the official portal pmrf.in.\n3. Upload research proposal and academic credentials.\n4. Complete national screening committee review.',
    importantInstructions: 'Fellows are also required to teach 1 hour per week in an ITI or polytechnic institution nearby.',
    faqs: [
      { question: 'What is the research contingency grant?', answer: 'Fellows receive ₹2,00,000 per year (total ₹10 Lakhs over 5 years) for international conference travel, lab consumables, and books.' }
    ],
    seoTitle: 'PMRF 2026 Fellowship - Apply for 80k Monthly Stipend & 2 Lakh Grant',
    seoKeywords: 'pmrf fellowship 2026, prime minister research fellowship, iit phd fellowship, government fellowship india',
    seoDescription: 'Apply online for Prime Minister Research Fellowship (PMRF) 2026. 80,000 monthly stipend plus 2 Lakh annual research grant for doctoral scholars.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on PMRF Portal', url: 'https://pmrf.in', variant: 'primary' },
      { label: 'Guidelines & Syllabus PDF', url: 'https://pmrf.in', variant: 'outline' }
    ],
    createdAt: '2026-05-11T12:00:00Z',
    views: 28900
  },
  {
    id: 'job-fel-ngo',
    title: 'Gandhi Fellowship 2026 for Youth Leadership & Social Transformation',
    postName: 'Gandhi Fellow (2-Year Residential Program)',
    organization: 'Piramal School of Leadership & Kaivalya Education Foundation',
    department: 'Youth Leadership & Social Development',
    advertisementNumber: 'GF-BATCH-18/2026',
    totalVacancies: 500,
    salary: '₹25,000 Per Month + Accommodation, Travel & Smartphone Allowance',
    ageLimit: 'Under 26 Years',
    qualification: 'Graduate / Post Graduate in any stream (Engineering, Humanities, Commerce, Science)',
    selectionProcess: 'Online Application -> Telephonic Round -> Group Discussion -> Personal Interview',
    applicationFees: [
      { category: 'All Candidates', fee: '₹0' }
    ],
    applicationStartDate: '2026-04-01',
    applicationEndDate: '2026-07-20',
    notificationDate: '2026-03-25',
    state: 'All India',
    category: 'Fellowship',
    subCategory: 'NGO Fellowship',
    jobType: 'NGO',
    location: 'District Headquarter Locations in 14 States',
    experience: 'Fresh Graduates & Young Professionals',
    applicationMode: 'Online',
    officialWebsite: 'https://gandhifellowship.net',
    shortDescription: 'The Gandhi Fellowship is a 2-year intensive youth leadership program working directly with headmasters and district education officials.',
    detailedDescription: 'Fellows work on grassroots transformation, mentoring 5 primary school headmasters, coordinating district educational workshops, and implementing scalable learning reforms.',
    eligibility: 'Young graduates with demonstrated leadership, empathy, and willingness to live and work in rural districts for 2 years.',
    vacancyDetailsTable: [
      { post: 'Gandhi Fellow (Batch 18)', total: 500, eligibility: 'Graduate in any discipline below 26 yrs' }
    ],
    documentsRequired: [
      'Resume / CV',
      'Personal Statement of Motivation',
      'Graduation Marksheets'
    ],
    howToApply: '1. Register at gandhifellowship.net.\n2. Complete application questionnaire.\n3. Attend video/telephonic interview rounds.\n4. Join induction bootcamp upon selection.',
    importantInstructions: 'Fellowship includes subsidized residential accommodation and mentorship by senior corporate & social leaders.',
    faqs: [
      { question: 'What career paths open after Gandhi Fellowship?', answer: 'Fellows pursue careers in public policy, civil services, UN organizations, founding NGOs, or joining CSR leadership roles.' }
    ],
    seoTitle: 'Gandhi Fellowship 2026 - Apply for 2-Year Leadership Program',
    seoKeywords: 'gandhi fellowship 2026, ngo fellowship india, piramal fellowship, youth leadership grant',
    seoDescription: 'Apply online for Gandhi Fellowship 2026. 25,000 monthly stipend plus housing and career mentorship for passionate young graduates.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on Official Site', url: 'https://gandhifellowship.net', variant: 'primary' },
      { label: 'Download Brochure', url: 'https://gandhifellowship.net', variant: 'outline' }
    ],
    createdAt: '2026-04-02T10:00:00Z',
    views: 17300
  },
  {
    id: 'job-int-govt',
    title: 'Ministry of External Affairs (MEA) Official Internship 2026',
    postName: 'MEA Intern (Policy, Diplomacy & Global Affairs)',
    organization: 'Ministry of External Affairs (MEA)',
    department: 'Territorial & Functional Divisions',
    advertisementNumber: 'MEA-INTERN/2026-TERM-2',
    totalVacancies: 60,
    salary: '₹10,000 Per Month Honorarium + Airfare for Selected Outstation Interns',
    ageLimit: 'Below 25 Years',
    qualification: 'Graduate in any discipline (Honours in International Relations, Law, Economics, History preferred)',
    selectionProcess: 'Academic Merit Screening -> Online Interactive Interview',
    applicationFees: [
      { category: 'All Students', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-25',
    notificationDate: '2026-05-25',
    state: 'New Delhi',
    category: 'Internship',
    subCategory: 'Govt Internship',
    jobType: 'Central',
    location: 'Jawaharlal Nehru Bhawan, New Delhi',
    experience: 'Enrolled College Students & Recent Graduates',
    applicationMode: 'Online',
    officialWebsite: 'https://internship.mea.gov.in',
    shortDescription: 'The Ministry of External Affairs (MEA) offers 60 internships annually for Indian youth to gain firsthand insight into Indian diplomacy.',
    detailedDescription: 'Interns are attached to various divisions such as UN Division, Disarmament, Neighboring Countries, Economic Diplomacy, and Public Diplomacy for a period of 1 to 3 months.',
    eligibility: 'Undergraduate or Post-Graduate student currently enrolled or graduated within the last 1 year from recognized Indian university.',
    vacancyDetailsTable: [
      { post: 'MEA Diplomatic Intern', total: 60, eligibility: 'Graduate / Enrolled student with >60% marks' }
    ],
    documentsRequired: [
      'No Objection Certificate (NOC) from College Dean/Principal',
      'Academic Transcripts and Marksheets',
      'Passport size Photograph and Aadhaar Card'
    ],
    howToApply: '1. Visit internship.mea.gov.in.\n2. Create candidate profile and upload college NOC.\n3. Indicate preferred functional divisions.\n4. Submit before the cutoff date.',
    importantInstructions: 'Interns must maintain strict diplomatic confidentiality during their tenure.',
    faqs: [
      { question: 'Does MEA provide travel allowance?', answer: 'Yes, basic air travel or train fare is reimbursed for outstation interns visiting New Delhi.' }
    ],
    seoTitle: 'MEA Internship 2026 - Apply for Ministry of External Affairs Internship',
    seoKeywords: 'mea internship 2026, government internship delhi, ministry of external affairs intern, diplomacy internship',
    seoDescription: 'Apply online for official MEA Internship Scheme 2026. Gain firsthand experience in Indian foreign policy and international diplomacy.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on MEA Portal', url: 'https://internship.mea.gov.in', variant: 'primary' },
      { label: 'Official Notice PDF', url: 'https://internship.mea.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-06-02T10:00:00Z',
    views: 24500
  },
  {
    id: 'job-int-tech',
    title: 'Google India & Infosys Software Tech Internship 2026',
    postName: 'Software Engineering & AI Research Intern',
    organization: 'Top Tech Innovations Partner Network',
    department: 'Cloud, AI & Full Stack Solutions',
    advertisementNumber: 'TECH-INTERN/2026-SUM',
    totalVacancies: 120,
    salary: '₹45,000 - ₹80,000 Per Month Stipend',
    ageLimit: 'Open to B.Tech, BE, MCA, M.Tech Students',
    qualification: 'Pursuing B.Tech / BE / MCA in Computer Science, IT, Electronics, AI/ML',
    selectionProcess: 'Online Coding Challenge (DSA) -> 2 Rounds of Technical Interviews',
    applicationFees: [
      { category: 'All Students', fee: '₹0' }
    ],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-30',
    notificationDate: '2026-05-28',
    state: 'All India',
    category: 'Internship',
    subCategory: 'Tech & Corporate',
    jobType: 'Private',
    location: 'Bangalore, Hyderabad, Pune, Gurugram (or Remote Hybrid)',
    experience: 'College Students (Pre-final & Final Year)',
    applicationMode: 'Online',
    officialWebsite: 'https://cvloom.online',
    shortDescription: 'Premier tech internship openings for college students interested in Cloud Computing, AI models, and scalable web engineering.',
    detailedDescription: 'Selected interns will work alongside senior software engineers building high-throughput web architectures, machine learning pipelines, and modern React/Node applications with full mentorship and Pre-Placement Offer (PPO) potential.',
    eligibility: 'Proficiency in Data Structures, Algorithms, and at least one programming language (TypeScript, Python, Java, or C++).',
    vacancyDetailsTable: [
      { post: 'Software Engineering Intern', total: 80, eligibility: 'B.Tech/MCA 3rd or 4th Year student' },
      { post: 'AI / Data Science Intern', total: 40, eligibility: 'Python, ML foundations, statistical analysis' }
    ],
    documentsRequired: [
      'ATS-Optimized Tech Resume with GitHub & Project links',
      'College ID Card',
      'Recent Semester Marksheets'
    ],
    howToApply: '1. Prepare your ATS resume using CVLoom.\n2. Submit online registration form with GitHub/Portfolio profile.\n3. Take the 90-minute online coding assessment.',
    importantInstructions: 'Ensure that your GitHub repositories contain clean code and proper README documentation.',
    faqs: [
      { question: 'Is this internship eligible for Pre-Placement Offers (PPOs)?', answer: 'Yes, top performing interns will receive full-time software engineering offers before graduation.' }
    ],
    seoTitle: 'Tech Software Internship 2026 - Apply for 80k Stipend SWE Openings',
    seoKeywords: 'tech internship 2026, software engineer intern bangalore, computer science internship india',
    seoDescription: 'Apply online for premier Software Engineering and AI internships. Lucrative stipend and PPO opportunities for engineering students.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on Portal', url: 'https://cvloom.online', variant: 'primary' },
      { label: 'Build ATS Resume Free', url: 'https://cvloom.online', variant: 'success' }
    ],
    createdAt: '2026-06-02T12:00:00Z',
    views: 31200
  },
  {
    id: 'job-2',
    title: 'SSC Combined Graduate Level (CGL) 2026 Admit Card',
    postName: 'Assistant Section Officer, Inspector of Income Tax, Sub Inspector, Auditor',
    organization: 'Staff Selection Commission',
    department: 'Various Ministries & Government Departments',
    advertisementNumber: 'SSC-CGL/2026-Tier1',
    totalVacancies: 17727,
    salary: '₹35,400 - ₹1,51,100 (Pay Level 5 to 8)',
    ageLimit: '18 to 30 Years (As on 01-08-2026)',
    qualification: 'Bachelor\'s Degree in any stream (Specific post criteria applies)',
    selectionProcess: 'Tier-I Computer Based Test (CBT) -> Tier-II CBT -> Document Verification',
    applicationFees: [
      { category: 'General / OBC / EWS', fee: '₹100' },
      { category: 'SC / ST / ESM / Females', fee: '₹0' }
    ],
    applicationStartDate: '2026-04-10',
    applicationEndDate: '2026-05-20',
    examDate: '2026-07-15',
    admitCardDate: '2026-07-05',
    resultDate: '2026-09-30',
    state: 'All India',
    category: 'Admit Card',
    jobType: 'Central',
    location: 'All India Centers',
    experience: 'Fresher',
    applicationMode: 'Online',
    officialWebsite: 'https://ssc.gov.in',
    shortDescription: 'Staff Selection Commission (SSC) has released the Admit Card and Status for the Combined Graduate Level Examination (CGL) 2026 Tier-I Exam.',
    detailedDescription: 'Candidates who successfully registered for the SSC CGL 2026 can now download their Tier-I exam status and admit card region-wise. Make sure to download the admit card at least 3 days before your examination date.',
    eligibility: 'Must have qualified the graduate examination from a recognized university. Candidates are required to enter their registration number and date of birth to check download link.',
    vacancyDetailsTable: [
      { post: 'Assistant Section Officer (CSS)', total: 980, eligibility: 'Graduate Degree' },
      { post: 'Income Tax Inspector', total: 450, eligibility: 'Graduate Degree' },
      { post: 'Central Excise Inspector', total: 2100, eligibility: 'Graduate Degree' },
      { post: 'Auditor / Accountant', total: 3200, eligibility: 'Graduate Degree' }
    ],
    documentsRequired: [
      'Printout of Admission Certificate (Admit Card)',
      'Two copies of recent passport size colored photographs',
      'Original valid Photo ID Proof having Date of Birth matching the Admit Card (Aadhaar / Voter ID / PAN / Driving License)'
    ],
    howToApply: '1. Select your respective SSC regional website (e.g., NR, CR, WR, SR, ER).\n2. Click on the "Download Admit Card for Combined Graduate Level Examination (Tier-I) 2026" link.\n3. Enter your Roll Number / Registration ID or Candidate\'s Name, Father\'s Name, and Date of Birth.\n4. Resolve the simple captcha/arithmetic question.\n5. Click on Search. Your Admit Card status will appear.\n6. Click "Print Admit Card" to save as PDF.',
    importantInstructions: 'No candidates will be allowed to enter the exam venue after the gate closure time specified in the admit card. Electronic devices, watches, and metallic ornaments are strictly prohibited.',
    faqs: [
      { question: 'Can I change my exam center allocated in the SSC CGL Admit Card?', answer: 'No, SSC does not entertain requests for shifting or changing the examination center once allocated.' },
      { question: 'What should I do if there is a discrepancy in my SSC CGL Admit Card?', answer: 'Immediately contact the regional office of the Staff Selection Commission with your registration details for rectification.' }
    ],
    seoTitle: 'SSC CGL Admit Card 2026 Tier 1 Status - Download Region-wise Hall Ticket',
    seoKeywords: 'ssc cgl admit card 2026, ssc cgl tier 1 status, ssc cgl admit card link, download ssc hall ticket',
    seoDescription: 'Download SSC CGL Admit Card 2026 for Tier 1 Online Exam. Region-wise status and direct admit card download links for NR, CR, MPR, WR, SR, ER, KKR.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Download Admit Card (NR)', url: 'https://sscnr.nic.in', variant: 'primary' },
      { label: 'Download Admit Card (CR)', url: 'https://ssc-cr.org', variant: 'primary' },
      { label: 'Check Application Status', url: 'https://ssc.gov.in', variant: 'success' },
      { label: 'Official Website', url: 'https://ssc.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-07-05T08:00:00Z',
    views: 25480
  },
  {
    id: 'job-3',
    title: 'IBPS PO XII Mains Written Exam Result 2026',
    postName: 'Probationary Officer (PO) / Management Trainee',
    organization: 'Institute of Banking Personnel Selection',
    department: 'Participating Public Sector Banks',
    advertisementNumber: 'CRP-PO/MT-XII',
    totalVacancies: 6432,
    salary: '₹36,000 - ₹63,840 (Plus Allowances)',
    ageLimit: '20 to 30 Years',
    qualification: 'Graduation in any stream from government approved University',
    selectionProcess: 'Preliminary Exam -> Mains Examination -> Interview & Group Discussion',
    applicationFees: [
      { category: 'General / OBC / EWS', fee: '₹850' },
      { category: 'SC / ST / PWBD', fee: '₹175' }
    ],
    applicationStartDate: '2025-08-01',
    applicationEndDate: '2025-08-22',
    examDate: '2025-11-26',
    admitCardDate: '2025-11-10',
    resultDate: '2026-07-01',
    state: 'All India',
    category: 'Result',
    jobType: 'Central',
    location: 'Banks across India',
    experience: 'Fresher',
    applicationMode: 'Online',
    officialWebsite: 'https://ibps.in',
    shortDescription: 'Institute of Banking Personnel Selection (IBPS) has declared the Mains Written Examination Result for the recruitment of Probationary Officers / Management Trainees (CRP PO/MT XII).',
    detailedDescription: 'The IBPS PO Mains Examination was held across various centers. Candidates can now check their qualifying status for the Phase III Interview round. Cutoff scores and individual scorecards will be released shortly.',
    eligibility: 'Candidate must have appeared in the Mains Examination and qualified both section-wise and overall cut-offs set by IBPS.',
    vacancyDetailsTable: [
      { post: 'Bank of India PO', total: 535, eligibility: 'Graduate' },
      { post: 'Canara Bank PO', total: 2500, eligibility: 'Graduate' },
      { post: 'Punjab National Bank PO', total: 500, eligibility: 'Graduate' },
      { post: 'Union Bank of India PO', total: 2094, eligibility: 'Graduate' }
    ],
    documentsRequired: [
      'Printout of Interview Call Letter',
      'IBPS PO Mains Online Application form printout',
      'Proof of Date of Birth (Birth certificate or Matriculation cert)',
      'Photo Identity Proof (PAN, Aadhaar, Passport)',
      'Graduation Marksheets and Degree Certificate'
    ],
    howToApply: '1. Go to the official website www.ibps.in.\n2. Click on "CRP PO/MT" on the left navigation pane.\n3. Click "Common Recruitment Process for Probationary Officers XII".\n4. Select "Click here to view status of Online Mains Exam for CRP-PO/MT-XII".\n5. Provide Registration Number/Roll Number and Password/DOB (DD-MM-YY).\n6. Enter the Verification Code/Captcha text.\n7. Check your qualifying status on the screen and take a printout.',
    importantInstructions: 'Candidates shortlisted for interview must keep all original eligibility certificates ready for physical verification. Any discrepancy will lead to immediate disqualification.',
    faqs: [
      { question: 'When will the IBPS PO Scorecard and Cut-off marks be released?', answer: 'The scorecards and section-wise cut-off marks for candidates who appeared in the Mains exam are typically uploaded within 7-10 days after the result declaration.' },
      { question: 'When are the Interviews scheduled?', answer: 'Shortlisted candidates will face interviews in July/August 2026. Precise venue, date, and time are indicated in the Interview Call Letters.' }
    ],
    seoTitle: 'IBPS PO Mains Result 2026 Out - Check Phase III Interview Shortlisted Status',
    seoKeywords: 'ibps po result 2026, ibps po mains result, ibps result link, ibps.in results',
    seoDescription: 'IBPS CRP PO MT XII Mains written exam results are out now. Check qualifying status for phase 3 interviews. Direct score and result link inside.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Download Result (Status)', url: 'https://ibps.in', variant: 'primary' },
      { label: 'Download Interview Letter', url: 'https://ibps.in', variant: 'success' },
      { label: 'Official Website', url: 'https://ibps.in', variant: 'outline' }
    ],
    createdAt: '2026-07-01T12:00:00Z',
    views: 31050
  },
  {
    id: 'job-4',
    title: 'Indian Army Agniveer Rally Admission 2026',
    postName: 'Agniveer (General Duty, Technical, Clerk, Tradesmen)',
    organization: 'Indian Army',
    department: 'Ministry of Defence',
    advertisementNumber: 'HQ-Rtg/Agniveer-02/2026',
    totalVacancies: 25000,
    salary: '₹30,000 - ₹40,000 (Plus Seva Nidhi Package)',
    ageLimit: '17.5 to 21 Years (Born between 01 Oct 2005 to 01 Apr 2009)',
    qualification: 'Class 8th / 10th / 12th pass depending on post',
    selectionProcess: 'Phase 1: Online Common Entrance Exam (CEE), Phase 2: Physical Fitness Test (PFT) & Medical Test',
    applicationFees: [
      { category: 'All Candidates', fee: '₹250' }
    ],
    applicationStartDate: '2026-02-15',
    applicationEndDate: '2026-03-31',
    examDate: '2026-05-20',
    admitCardDate: '2026-05-01',
    resultDate: '2026-06-15',
    state: 'All India',
    category: 'Admission',
    jobType: 'Central',
    location: 'Rally Venues Across States',
    experience: 'Fresher Only',
    applicationMode: 'Online',
    officialWebsite: 'https://joinindianarmy.nic.in',
    shortDescription: 'Indian Army invites online applications from eligible unmarried Indian male and female candidates for admission/enrollment under Agnipath Scheme.',
    detailedDescription: 'The Agnipath scheme provides an opportunity for patriotic and motivated youth to serve in the Armed Forces for a period of four years as Agniveers. Recruitment is done on merit basis through physical, medical and written tests.',
    eligibility: 'Unmarried male and female candidates matching the physical standards (Height, Chest, Weight) and educational prerequisites for respective state rallies.',
    vacancyDetailsTable: [
      { post: 'Agniveer General Duty (GD)', total: 15000, eligibility: 'Class 10th Metric pass with 45% marks' },
      { post: 'Agniveer Technical (All Arms)', total: 4000, eligibility: '10+2 / Intermediate Exam Pass in Science with PCM' },
      { post: 'Agniveer Clerk / Store Keeper Tech', total: 2000, eligibility: '10+2 pass with 60% marks in any stream' },
      { post: 'Agniveer Tradesmen 10th / 8th Pass', total: 4000, eligibility: 'Simple Pass in Class 10th / 8th' }
    ],
    documentsRequired: [
      'Admit Card (Printed on good quality paper)',
      'Twenty copies of unattested passport size color photographs on white background',
      'Education Certificates with original mark sheets',
      'Domicile (Nativity) Certificate issued by authorized Govt official',
      'Caste Certificate & Religion Certificate'
    ],
    howToApply: '1. Register at www.joinindianarmy.nic.in.\n2. Click on "Agnipath" and then "User Registration".\n3. Fill all fields, upload passport-sized photograph and signature.\n4. Check your eligibility state and post wise.\n5. Select your application category and proceed to pay the ₹250 application fee.\n6. Select 5 preferred exam cities for Phase I Online CEE.\n7. Print out the submission slip for records.',
    importantInstructions: 'Mobile phones and smart watches are barred. Candidates should strictly practice running and physical drills before coming for the Physical Fitness Test.',
    faqs: [
      { question: 'What is the minimum height required for Agniveer GD?', answer: 'Height standards vary by region (e.g., Western Himalayan requires 163 cm, Southern Plains requires 166 cm). Check regional notification.' },
      { question: 'Will I get permanent commission after 4 years?', answer: 'Up to 25% of Agniveers will be enrolled in regular cadre of Indian Army based on organizational requirements and performance evaluation.' }
    ],
    seoTitle: 'Indian Army Agniveer Recruitment Rally 2026 - Eligibility & Online Registration',
    seoKeywords: 'join indian army, agniveer rally 2026, agnipath scheme army, army gd eligibility',
    seoDescription: 'Join Indian Army through Agnipath Scheme. Detailed recruitment guidelines, qualifications, rally dates, and application guide for Agniveer entries.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Register Online', url: 'https://joinindianarmy.nic.in', variant: 'primary' },
      { label: 'Download Syllabus', url: 'https://joinindianarmy.nic.in', variant: 'outline' },
      { label: 'Eligibility Checker', url: 'https://joinindianarmy.nic.in', variant: 'secondary' }
    ],
    createdAt: '2026-02-16T11:00:00Z',
    views: 18900
  },
  {
    id: 'job-5',
    title: 'National Means Cum Merit Scholarship (NMMS) 2026',
    postName: 'NMMS Scholarship Class VIII Students',
    organization: 'Ministry of Education',
    department: 'Department of School Education & Literacy',
    advertisementNumber: 'MoE-NMMS-2026',
    totalVacancies: 100000,
    salary: '₹12,000 Per Annum (₹1,000 per month)',
    ageLimit: 'N/A',
    qualification: 'Studying in Class VIII, minimum 55% marks in Class VII',
    selectionProcess: 'Mental Ability Test (MAT) & Scholastic Aptitude Test (SAT)',
    applicationFees: [
      { category: 'All Categories', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-05-10',
    applicationEndDate: '2026-08-30',
    examDate: '2026-11-08',
    state: 'All States',
    category: 'Scholarship',
    jobType: 'Central',
    location: 'All Districts across India',
    experience: 'Students only',
    applicationMode: 'Online',
    officialWebsite: 'https://scholarships.gov.in',
    shortDescription: 'The National Means-cum-Merit Scholarship Scheme (NMMSS) aims to award scholarships to meritorious students of economically weaker sections to arrest their drop-out at class VIII.',
    detailedDescription: 'The scheme provides 1 lakh scholarships per year for talented students of Government, Government-Aided and Local body schools from Class IX till Class XII.',
    eligibility: 'Parental annual income should not be more than ₹3,50,000. Students must be studying as regular students in class VIII.',
    vacancyDetailsTable: [
      { post: 'NMMS Scholarship (Class IX to XII)', total: 100000, eligibility: 'Class VIII Student, Income < 3.5 Lakh' }
    ],
    documentsRequired: [
      'Class VII Marksheet showing at least 55% marks (50% for SC/ST)',
      'Income Certificate of Parents issued by competent Revenue authority',
      'Caste Certificate / Disability Certificate (if applicable)',
      'Aadhaar Card copy or Aadhaar Enrollment ID'
    ],
    howToApply: '1. Register on National Scholarship Portal (NSP) at www.scholarships.gov.in.\n2. Complete Aadhaar verification and get OTR.\n3. Search and select "National Means Cum Merit Scholarship Scheme".\n4. Upload income certificate and student verification form signed by School Head.\n5. Submit the form and verify status with School Nodal Officer (SNO).',
    importantInstructions: 'Candidates having Navodaya, Sainik School, or Private Board enrollment are not eligible for this scholarship scheme.',
    faqs: [
      { question: 'What is MAT and SAT test structure?', answer: 'Each test has 90 multiple-choice questions of 1 mark each. Duration is 90 minutes. MAT tests analytical skills, SAT tests Science, Social Studies, and Maths.' }
    ],
    seoTitle: 'NMMS Scholarship Scheme 2026 - Registration Open on NSP Portal',
    seoKeywords: 'nmms scholarship, national scholarship portal, scholarship for class 8, nsp register',
    seoDescription: 'Apply online for NMMS Scholarship Scheme 2026 worth 12k annually. Step-by-step application guidelines, eligibility criteria, exams dates, and exam syllabus.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Apply on NSP Portal', url: 'https://scholarships.gov.in', variant: 'primary' },
      { label: 'Download Guidelines PDF', url: 'https://scholarships.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-05-11T09:00:00Z',
    views: 8900
  },
  {
    id: 'job-6',
    title: 'CTET Jan 2026 Official Answer Key Released',
    postName: 'Primary Teachers (Class I-V) & Upper Primary (Class VI-VIII)',
    organization: 'Central Board of Secondary Education (CBSE)',
    department: 'Central Teacher Eligibility Test (CTET)',
    advertisementNumber: 'CBSE/CTET/JAN-2026',
    totalVacancies: 0,
    salary: 'Eligibility Certificate Only',
    ageLimit: 'No Age Limit',
    qualification: 'Senior Secondary / Graduate with B.Ed, D.El.Ed or equivalent teacher training',
    selectionProcess: 'Paper 1 (Class 1-5) -> Paper 2 (Class 6-8) Objective Multiple Choice Exams',
    applicationFees: [
      { category: 'Single Paper (Gen/OBC)', fee: '₹1000' },
      { category: 'Both Papers (Gen/OBC)', fee: '₹1200' },
      { category: 'SC / ST / Diff. Abled (Single/Both)', fee: '₹500 / ₹600' }
    ],
    applicationStartDate: '2025-10-15',
    applicationEndDate: '2025-11-23',
    examDate: '2026-01-18',
    admitCardDate: '2026-01-15',
    resultDate: '2026-03-05',
    state: 'All India',
    category: 'Answer Key',
    jobType: 'Central',
    location: 'Centers Nationwide',
    experience: 'N/A',
    applicationMode: 'Online',
    officialWebsite: 'https://ctet.nic.in',
    shortDescription: 'Central Board of Secondary Education (CBSE) has uploaded the scanned OMR Sheets and Official Answer Keys of CTET Jan 2026 examination.',
    detailedDescription: 'Candidates who appeared in the CTET January 2026 examination can login to view and challenge the provisional answer keys by paying a fee of ₹1,000 per question.',
    eligibility: 'Appeared in CTET January 2026 Paper-I or Paper-II examination.',
    vacancyDetailsTable: [
      { post: 'Teacher Eligibility Card Paper 1', total: 0, eligibility: 'D.El.Ed / Senior Secondary' },
      { post: 'Teacher Eligibility Card Paper 2', total: 0, eligibility: 'B.Ed / Graduation' }
    ],
    documentsRequired: [
      'Roll Number',
      'Date of Birth',
      'Registered Mobile Number / OTP'
    ],
    howToApply: '1. Visit official portal: ctet.nic.in.\n2. Click "View/Challenge Answer Key CTET Jan 2026".\n3. Input your Roll Number and Date of Birth.\n4. View official responses alongside your marked OMR sheet.\n5. Click on Challenge Answer Key if you want to contest any answer.\n6. Select desired options, upload supportive documents, pay ₹1,000 fee.',
    importantInstructions: 'Ensure that challenging files are in PDF format and reference standard textbook solutions to stand acceptable by CBSE subject experts.',
    faqs: [
      { question: 'Is the challenge fee of 1000 rupees refundable?', answer: 'Yes, if the challenge is accepted by the CBSE subject experts and the answer key is modified, the challenge fee will be refunded to the bank account.' }
    ],
    seoTitle: 'CTET Answer Key Jan 2026 Out - Download OMR Sheet & Raise Challenge',
    seoKeywords: 'ctet answer key 2026, ctet omr sheet download, challenge ctet keys, ctet official answer sheet',
    seoDescription: 'Download official CBSE CTET January 2026 Exam Answer keys and check OMR responses. Direct login links and key challenge procedure instructions.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Download Answer Key', url: 'https://ctet.nic.in', variant: 'primary' },
      { label: 'Submit Key Challenge', url: 'https://ctet.nic.in', variant: 'danger' },
      { label: 'Official Website', url: 'https://ctet.nic.in', variant: 'outline' }
    ],
    createdAt: '2026-02-05T08:00:00Z',
    views: 19800
  },
  {
    id: 'job-7',
    title: 'UPSC Civil Services Syllabus & Pattern 2026',
    postName: 'IAS / IPS / IFS Officers Selection',
    organization: 'Union Public Service Commission',
    department: 'Civil Services Department',
    advertisementNumber: 'CSE-Syllabus-2026',
    totalVacancies: 0,
    salary: 'Officer Level Scale',
    ageLimit: '21 to 32 Years',
    qualification: 'Graduate',
    selectionProcess: 'Prelims (CSAT + GS) -> Mains (9 Descriptive papers) -> Personality Test',
    applicationFees: [],
    applicationStartDate: 'N/A',
    applicationEndDate: 'N/A',
    state: 'All India',
    category: 'Syllabus',
    jobType: 'Central',
    location: 'India',
    experience: 'N/A',
    applicationMode: 'Online',
    officialWebsite: 'https://upsc.gov.in',
    shortDescription: 'Latest updated detailed syllabus and exam pattern for UPSC Civil Services Examination 2026 Prelims and Mains.',
    detailedDescription: 'Get the exact paper-by-paper syllabus of GS 1, GS 2 (CSAT), Mains Compulsory languages, GS Papers I, II, III, IV, and Optional paper listings in PDF.',
    eligibility: 'Graduate candidates desiring detailed curriculum structure.',
    vacancyDetailsTable: [],
    documentsRequired: [],
    howToApply: 'No Application Needed. Simply download the syllabus PDF directly using the links provided below.',
    importantInstructions: 'Read sections carefully. Pay close attention to current affairs and socio-economic policies as mandated by UPSC guidelines.',
    faqs: [
      { question: 'What is the qualifying marks in CSAT Paper?', answer: 'The CSAT (General Studies Paper-II) requires a minimum qualifying score of 33% (66 marks out of 200).' }
    ],
    seoTitle: 'UPSC Civil Services Exam Syllabus 2026 - Prelims & Mains Exam Pattern',
    seoKeywords: 'upsc syllabus pdf, ias exam pattern, upsc prelims syllabus, csat syllabus',
    seoDescription: 'Download UPSC Civil Services IAS/IPS Exam Detailed Syllabus PDF. Understand the examination pattern, subject-wise topics, optional subjects list, and marking scheme.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Download Syllabus PDF', url: 'https://upsc.gov.in/sites/default/files/Syllabus-CSE.pdf', variant: 'primary' },
      { label: 'UPSC Prep Strategy Guide', url: 'https://upsc.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-01-10T06:00:00Z',
    views: 14200
  },
  {
    id: 'job-8',
    title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY) 4.0 Scheme',
    postName: 'PMKVY Job Skills & Free Training Program',
    organization: 'Ministry of Skill Development & Entrepreneurship',
    department: 'National Skill Development Corporation (NSDC)',
    advertisementNumber: 'MSDE/PMKVY-4.0',
    totalVacancies: 500000,
    salary: 'Free Training + ₹8000 Reward on Certification',
    ageLimit: '15 to 45 Years',
    qualification: 'Class 5th / 8th / 10th / 12th or ITI pass (Sector dependent)',
    selectionProcess: 'Skill Assessment & Interview Counselling',
    applicationFees: [
      { category: 'All Trainees', fee: '₹0 (100% Free Training & Placement assistance)' }
    ],
    applicationStartDate: '2026-01-01',
    applicationEndDate: '2026-12-31',
    state: 'All India',
    category: 'Government Scheme',
    jobType: 'Central',
    location: 'Centers in All Districts',
    experience: 'Fresher / Youth wanting Skill enhancement',
    applicationMode: 'Online',
    officialWebsite: 'https://pmkvyofficial.org',
    shortDescription: 'Government scheme PMKVY 4.0 aims to mobilize a large number of Indian youth to take up industry-relevant skill training that will help them secure a better livelihood.',
    detailedDescription: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE) implemented by NSDC. Individuals with prior learning experience or skills will also be assessed and certified under Recognition of Prior Learning (RPL).',
    eligibility: 'Any unemployed youth or school/college dropouts having an Aadhaar card and active bank account.',
    vacancyDetailsTable: [
      { post: 'Digital Marketing Specialist', total: 50000, eligibility: 'Class 12th' },
      { post: 'Solar Panel Installation Technician', total: 30000, eligibility: 'Class 10th' },
      { post: 'Domestic Data Entry Operator', total: 100000, eligibility: 'Class 10th' },
      { post: 'CNC Operator / Machinist', total: 25000, eligibility: 'ITI / Class 10th' }
    ],
    documentsRequired: [
      'Aadhaar Card (Linked with active Mobile Number)',
      'Bank Account Passbook showing IFSC code (For DBT benefits)',
      'Education Certificate / School Leaving Certificate',
      'Two passport size photographs'
    ],
    howToApply: '1. Visit the PMKVY portal (www.pmkvyofficial.org) or NSDC Skill India Digital portal.\n2. Click "Register as a Candidate".\n3. Enter Aadhaar number and verify via OTP.\n4. Select your preferred Skill training sector and preferred center location.\n5. Submit application and visit the designated training partner center for counseling and class schedules.',
    importantInstructions: 'Ensure attendance is marked biometric-ally daily. 75% attendance is mandatory to sit in the certification exam and claim monetary awards.',
    faqs: [
      { question: 'Will I get a job after PMKVY training?', answer: 'Yes, NSDC conducts Rozgar Melas (Job Fairs) and partners with private sectors to offer placements to certified candidates.' }
    ],
    seoTitle: 'PMKVY 4.0 Registration 2026 - Apply for Free Govt Skill Training',
    seoKeywords: 'pmkvy 4.0 online apply, free skill development training, skill india digital scheme, govt computer courses',
    seoDescription: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0) Online Admissions 2026. Explore thousands of free training courses in all Indian districts with placement assistance.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Register as Candidate', url: 'https://skillindiadigital.gov.in', variant: 'primary' },
      { label: 'Find Training Center', url: 'https://pmkvyofficial.org', variant: 'success' },
      { label: 'Scheme Guidelines', url: 'https://pmkvyofficial.org', variant: 'outline' }
    ],
    createdAt: '2026-01-02T10:00:00Z',
    views: 22100
  },
  {
    id: 'job-9',
    title: 'DRDO Scientific Research Internship 2026',
    postName: 'Research Intern (Computer Science, Electronics, Mechanical)',
    organization: 'Defence Research and Development Organisation',
    department: 'DRDO Labs (DESIDOC, CAIR, DLRL)',
    advertisementNumber: 'DRDO/INTERN-A1/2026',
    totalVacancies: 120,
    salary: '₹15,000 Per Month Stipend',
    ageLimit: 'Maximum 28 Years',
    qualification: 'B.E / B.Tech / M.Sc pursuing/completed with 60% marks',
    selectionProcess: 'Shortlisting based on academic merit followed by online video interview',
    applicationFees: [
      { category: 'All Candidates', fee: '₹0' }
    ],
    applicationStartDate: '2026-06-15',
    applicationEndDate: '2026-07-30',
    state: 'Delhi / Bangalore / Hyderabad',
    category: 'Internship',
    jobType: 'Central',
    location: 'DRDO Laboratories',
    experience: 'Undergrad / Postgrad Students',
    applicationMode: 'Online',
    officialWebsite: 'https://drdo.gov.in',
    shortDescription: 'DRDO invites applications for its annual Technical and Scientific Internship program for enthusiastic students wanting exposure to advanced defense tech projects.',
    detailedDescription: 'The internship is designed to give young minds hands-on research training under senior scientists. Candidates will work on projects involving machine learning, embedded systems, radar signal processing, and cryptography.',
    eligibility: 'Must be an Indian citizen. Students in 3rd/4th year of engineering degree with consistent academic records.',
    vacancyDetailsTable: [
      { post: 'CAIR Bangalore Intern (AI/ML)', total: 40, eligibility: 'Pursuing B.Tech CSE/IT' },
      { post: 'DLRL Hyderabad Intern (RF/Microwave)', total: 30, eligibility: 'Pursuing B.Tech ECE' },
      { post: 'DESIDOC Delhi Intern (Science Communication)', total: 20, eligibility: 'Pursuing M.Sc / MCA' }
    ],
    documentsRequired: [
      'No Objection Certificate (NOC) from Head of College/Institution',
      'All semester marksheets in single PDF',
      'Resume/CV outlining technical projects',
      'Govt Photo ID Card'
    ],
    howToApply: '1. Draft a Cover Letter and obtain an NOC from your college principal/dean.\n2. Navigate to the DRDO recruitment portal RAC (rac.gov.in).\n3. Register and select "Internship Training Opportunities for Students".\n4. Select lab of choice, fill educational scores, and upload NOC with Resume.\n5. Submit online application. Shortlisted candidates will receive confirmation email.',
    importantInstructions: 'No accommodation or travel allowances will be provided by DRDO during the tenure of the internship.',
    faqs: [
      { question: 'What is the duration of DRDO Internship?', answer: 'The internship is typically for a minimum of 2 months and can extend up to 6 months based on project scope and college permissions.' }
    ],
    seoTitle: 'DRDO Scientific Internship 2026 - Apply Online for Research Trainee',
    seoKeywords: 'drdo internship 2026, defense lab internship, rac portal training, engineering intern stipend',
    seoDescription: 'Apply online for DRDO Internship 2026. DRDO labs offering stipend-based summer/winter scientific training. Get direct RAC application links and guidelines.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply on RAC Portal', url: 'https://rac.gov.in', variant: 'primary' },
      { label: 'Download NOC Template', url: 'https://drdo.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-06-16T08:00:00Z',
    views: 11200
  },
  {
    id: 'job-10',
    title: 'NITI Aayog Public Policy Fellowship 2026',
    postName: 'Fellow / Associate Fellow / Senior Fellow',
    organization: 'NITI Aayog',
    department: 'National Institution for Transforming India',
    advertisementNumber: 'NITI/FELLOW-01/2026',
    totalVacancies: 50,
    salary: '₹1,25,000 - ₹2,50,000 Per Month Consolidated',
    ageLimit: 'Below 40 Years (For Fellows)',
    qualification: 'Master\'s Degree in Economics, Development Studies, Public Policy, or MBA',
    selectionProcess: 'Curriculum Vitae review -> Written Case Assessment -> Expert Panel Interview',
    applicationFees: [
      { category: 'All Categories', fee: '₹0' }
    ],
    applicationStartDate: '2026-05-01',
    applicationEndDate: '2026-06-20',
    state: 'New Delhi',
    category: 'Fellowship',
    jobType: 'Central',
    location: 'NITI Aayog HQ, New Delhi',
    experience: 'Minimum 3 to 8 Years in policy research or consulting',
    applicationMode: 'Online',
    officialWebsite: 'https://niti.gov.in',
    shortDescription: 'NITI Aayog is seeking highly motivated policy professionals and researchers for the prestigious NITI Fellowship Scheme to work on national-level developmental reforms.',
    detailedDescription: 'The Fellows will act as primary intellectual resources inside NITI verticals (Health, Education, Agriculture, Infrastructure, Climate). They will assist in policy design, state cooperation, and data analytics.',
    eligibility: 'Exceptional academic pedigree with relevant research experience. Publication in peer-reviewed journals is highly desirable.',
    vacancyDetailsTable: [
      { post: 'Fellow (Health Policy & Economics)', total: 15, eligibility: 'Master\'s + 3 Yr Experience' },
      { post: 'Fellow (Agriculture Reforms)', total: 10, eligibility: 'Master\'s + 3 Yr Experience' },
      { post: 'Senior Fellow (Infrastructure & Energy)', total: 5, eligibility: 'Ph.D. + 8 Yr Experience' }
    ],
    documentsRequired: [
      'Updated Curriculum Vitae (ATS formatted)',
      'Two letters of recommendation (Academic/Professional)',
      'Writing sample (Published paper or executive summary, max 1000 words)',
      'Self-attested copies of PG degrees'
    ],
    howToApply: '1. Access the NITI recruitment webpage (niti.gov.in/work-at-niti/fellowships).\n2. Register with your professional email address.\n3. Complete the multi-tab application form outlining your research statements and achievements.\n4. Upload your professional writing sample and Recommendation letters.\n5. Click submit and track evaluation status.',
    importantInstructions: 'The fellowship is initially for 2 years, renewable up to 5 years based on performance outcomes.',
    faqs: [
      { question: 'Is this a regular permanent government post?', answer: 'No, this is a contractual fellowship position of high prestige. Fellows receive a consolidated monthly pay scale with zero permanent service claims.' }
    ],
    seoTitle: 'NITI Aayog Policy Fellowship 2026 - High Salary Govt Research Careers',
    seoKeywords: 'niti aayog recruitment, niti fellow 2026, public policy fellowships india, govt research jobs',
    seoDescription: 'Work at NITI Aayog. Fellowship openings for policy researchers, economists and consultants in New Delhi. Apply online for up to 2.5 Lakh stipend.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply Online Now', url: 'https://niti.gov.in/work-at-niti/fellowships', variant: 'primary' },
      { label: 'Official Brochure PDF', url: 'https://niti.gov.in', variant: 'outline' }
    ],
    createdAt: '2026-05-02T12:00:00Z',
    views: 7400
  },
  {
    id: 'job-11',
    title: 'Tata Consultancy Services (TCS) BPS National Qualifier 2026',
    postName: 'Business Process Services (BPS) Trainee',
    organization: 'Tata Consultancy Services (TCS)',
    department: 'BPS Delivery Center',
    advertisementNumber: 'TCS-BPS/NQT-2026',
    totalVacancies: 5000,
    salary: '₹2.8 LPA - ₹3.6 LPA',
    ageLimit: '18 to 28 Years',
    qualification: 'Arts, Commerce, or Science Graduates (B.Com, BA, B.Sc, BBA, BBM)',
    selectionProcess: 'TCS NQT Online Cognitive Test -> Technical Interview -> HR Round',
    applicationFees: [
      { category: 'Registration', fee: '₹0 (Free)' }
    ],
    applicationStartDate: '2026-06-10',
    applicationEndDate: '2026-07-28',
    examDate: '2026-08-10',
    state: 'All India',
    category: 'Private Job',
    jobType: 'Private',
    location: 'PAN India (TCS Offices)',
    experience: 'Freshers (2025/2026 passouts)',
    applicationMode: 'Online',
    officialWebsite: 'https://tcs.com',
    shortDescription: 'TCS is hiring fresh arts, science, and commerce graduates through the TCS BPS National Qualifier Test (NQT) for its Global Delivery Hubs.',
    detailedDescription: 'TCS BPS hiring is open for candidates who completed graduation in 2025 or pursuing in 2026. This test evaluates cognitive abilities, mathematical skills, verbal skills, and logical reasoning.',
    eligibility: 'Only full-time graduates are eligible. Maximum 1 active backlog permitted at the time of test registration.',
    vacancyDetailsTable: [
      { post: 'BPS Cognitive Analyst', total: 5000, eligibility: 'BA, B.Com, B.Sc, BBA, BBM (No BE/BTech)' }
    ],
    documentsRequired: [
      'NQT Registration ID Card',
      'All College Semester Consolidated Marksheets',
      'Government Photo ID proof (Aadhaar/PAN)',
      'TCS standard application resume PDF'
    ],
    howToApply: '1. Register on the TCS NextStep Portal (nextstep.tcs.com).\n2. Select "BPS" category.\n3. Fill out the application form completely and obtain DT reference number.\n4. Apply for "TCS BPS National Qualifier Test" drive.\n5. Click "Apply for Drive" and select your preferred test center.',
    importantInstructions: 'Duplicate profiles on NextStep portal will lead to instant application blocking. Ensure all academic marks match your original certificates.',
    faqs: [
      { question: 'Are B.Tech or MCA graduates eligible for TCS BPS drive?', answer: 'No, professional degree holders like BE, B.Tech, MCA, M.Tech are not eligible for BPS hiring. They should register under IT category.' }
    ],
    seoTitle: 'TCS BPS NQT Recruitment 2026 - Apply Online for Trainee Jobs',
    seoKeywords: 'tcs bps nqt, nextstep tcs bps drive, private jobs for freshers, tcs recruitment 2026',
    seoDescription: 'Apply for TCS BPS National Qualifier Test 2026 for arts, science, and commerce graduates. Get direct registration link, syllabus, and test pattern guidance.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Register on TCS NextStep', url: 'https://nextstep.tcs.com', variant: 'primary' },
      { label: 'TCS Sample Papers', url: 'https://tcs.com', variant: 'outline' }
    ],
    createdAt: '2026-06-11T09:00:00Z',
    views: 16500
  },
  {
    id: 'job-12',
    title: 'Goonj NGO Social Development Program Coordinator',
    postName: 'Area Program Coordinator (Urban/Rural)',
    organization: 'Goonj (Non-Governmental Organisation)',
    department: 'Disaster Relief & Rural Reconstruction Wing',
    advertisementNumber: 'GOONJ-PC/03-2026',
    totalVacancies: 15,
    salary: '₹35,000 - ₹50,000 Per Month Consolidated',
    ageLimit: '22 to 35 Years',
    qualification: 'Bachelor\'s in Social Work (BSW), Sociology, or Rural Development',
    selectionProcess: 'Resume screening -> Field immersion task -> Face-to-face interview',
    applicationFees: [
      { category: 'Application Processing', fee: '₹0' }
    ],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-15',
    state: 'Maharashtra / Bihar / Assam',
    category: 'NGO Job',
    jobType: 'NGO',
    location: 'Rural Development Blocks',
    experience: '1-2 Years in social volunteering or NGO operations',
    applicationMode: 'Online',
    officialWebsite: 'https://goonj.org',
    shortDescription: 'Goonj is seeking dedicated professionals willing to travel extensively and coordinate development campaigns under its popular "Cloth for Work" rural development schemes.',
    detailedDescription: 'The coordinator will lead localized resource collection, manage block-level volunteers, evaluate community requests for infrastructure restoration, and prepare post-project impact reports.',
    eligibility: 'Must speak local regional languages fluently. Physical stamina to work in disaster-prone or backward rural districts is mandatory.',
    vacancyDetailsTable: [
      { post: 'Bihar Block Coordinator (Patna/Saharsa)', total: 5, eligibility: 'BSW / MSW with Hindi fluency' },
      { post: 'Assam Flood Rehabilitation Coordinator', total: 5, eligibility: 'BSW / MSW with Assamese fluency' },
      { post: 'Maharashtra Rural Coordinator', total: 5, eligibility: 'Sociology graduate with Marathi fluency' }
    ],
    documentsRequired: [
      'Cover Letter detailing "Why I want to work in the social sector"',
      'Resume/CV showing community service history',
      'Two References from previous supervisors'
    ],
    howToApply: '1. Email your resume and a brief cover letter (max 300 words) to recruitment@goonj.org with subject "Application for Area Coordinator - [Your State]".\n2. Fill the optional applicant Google Form linked on their career page (goonj.org/careers).',
    importantInstructions: 'Candidates must be ready to join within 15 days of final selection. Intensive travel to tribal blocks is a major part of the job.',
    faqs: [
      { question: 'Is MSW degree mandatory?', answer: 'No, candidates from non-social work backgrounds who show strong past volunteering records and dedication to social work are warmly encouraged to apply.' }
    ],
    seoTitle: 'Goonj NGO Recruitment 2026 - Apply for Social Development Jobs',
    seoKeywords: 'ngo careers india, goonj careers 2026, social worker jobs, rural development vacancies',
    seoDescription: 'Become a Program Coordinator at Goonj. Explore high impact social work careers, block coordination profiles, salaries, and step-by-step application instructions.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Apply via Goonj Careers', url: 'https://goonj.org/join-goonj', variant: 'primary' },
      { label: 'Submit CV via Email', url: 'mailto:recruitment@goonj.org', variant: 'secondary' }
    ],
    createdAt: '2026-06-02T07:00:00Z',
    views: 4500
  },
  {
    id: 'job-13',
    title: 'BECIL UP Metro Rail Outsourcing Recruitment 2026',
    postName: 'Data Entry Operator, Customer Relation Assistant, Maintainer',
    organization: 'Broadcast Engineering Consultants India Limited (BECIL)',
    department: 'Uttar Pradesh Metro Rail Project (UPMRC)',
    advertisementNumber: 'BECIL/UP-METRO/OUTSOURCE/2026',
    totalVacancies: 340,
    salary: '₹18,500 - ₹32,000 Per Month (As per Govt Minimum Wages)',
    ageLimit: '18 to 35 Years',
    qualification: 'Diploma, ITI, or Graduate with 30 wpm Typing',
    selectionProcess: 'Skill / Typing Test followed by Interaction Interview',
    applicationFees: [
      { category: 'General / OBC', fee: '₹590' },
      { category: 'SC / ST / PH', fee: '₹295' }
    ],
    applicationStartDate: '2026-06-25',
    applicationEndDate: '2026-07-20',
    examDate: '2026-08-15',
    state: 'Uttar Pradesh',
    category: 'Outsourcing Job',
    jobType: 'Contract',
    location: 'Lucknow, Kanpur, Agra Metro Stations',
    experience: 'Fresher / Typist',
    applicationMode: 'Online',
    officialWebsite: 'https://becil.com',
    shortDescription: 'BECIL invites online applications for outsourcing deployment of various human resources for operation and maintenance of Uttar Pradesh Metro Rail Corporation.',
    detailedDescription: 'The positions are purely on a temporary, contractual outsourcing basis. Selected personnel will be placed on the payroll of BECIL and deployed across different UP Metro stations.',
    eligibility: 'Indian National meeting requisite educational, computer typing speeds, and physical medical guidelines for rail operations.',
    vacancyDetailsTable: [
      { post: 'Data Entry Operator (DEO)', total: 110, eligibility: 'Graduation + 35 wpm typing' },
      { post: 'Customer Relation Assistant (CRA)', total: 80, eligibility: 'Graduate with good communication' },
      { post: 'Maintainer (Electrical/S&T)', total: 150, eligibility: 'ITI in Electrician / Wireman' }
    ],
    documentsRequired: [
      'Class 10th Certificate for age verification',
      'Computer certificate / typing certificate',
      'ITI/Graduation Marksheet and Provisional Degree',
      'Aadhaar card and PAN card'
    ],
    howToApply: '1. Go to BECIL Registration Portal (becilregistration.com).\n2. Register and select Advertisement Number [UP-METRO/OUTSOURCE/2026].\n3. Fill out basic personal, educational details.\n4. Upload scanned photo, signature, caste certificate.\n5. Pay the application registration fee online.\n6. Save the final registered application copy.',
    importantInstructions: 'No TA/DA will be paid for attending the typing test or skill assessment.',
    faqs: [
      { question: 'Is this job permanent in UP Metro?', answer: 'No, these jobs are contractual outsourcing placements handled by BECIL. Permanent placement benefits do not apply.' }
    ],
    seoTitle: 'BECIL Metro Outsourcing Jobs 2026 - Apply for DEO & Maintainer Posts',
    seoKeywords: 'becil outsourcing 2026, up metro contract jobs, data entry operator vacancies, becil registration',
    seoDescription: 'Apply online for Uttar Pradesh Metro Rail Contractual Outsourcing placements. Broadcast Engineering Consultants India Limited announcements for 340 posts.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Register on BECIL Portal', url: 'https://becilregistration.com', variant: 'primary' },
      { label: 'Official Recruitment PDF', url: 'https://becil.com', variant: 'outline' }
    ],
    createdAt: '2026-06-26T10:00:00Z',
    views: 9200
  },
  {
    id: 'job-14',
    title: 'AIIMS New Delhi Senior Resident Walk-in Interviews 2026',
    postName: 'Senior Resident / Senior Demonstrator',
    organization: 'All India Institute of Medical Sciences (AIIMS)',
    department: 'Various Clinical & Non-Clinical Specialties',
    advertisementNumber: 'AIIMS/ND/SR-WALKIN-II/2026',
    totalVacancies: 185,
    salary: '₹67,700 - ₹2,08,700 (Pay Level 11 + NPA)',
    ageLimit: 'Maximum 45 Years (OBC 48, SC/ST 50)',
    qualification: 'MD / MS / DNB / DM / M.Ch or Ph.D. in respective medical fields',
    selectionProcess: 'Walk-in Interview & Document Verification on Spot',
    applicationFees: [
      { category: 'General / OBC / EWS', fee: '₹1500 (Payable via Demand Draft)' },
      { category: 'SC / ST / PWBD', fee: '₹0 (Exempted)' }
    ],
    applicationStartDate: '2026-07-01',
    applicationEndDate: '2026-07-24',
    state: 'Delhi',
    category: 'Walk-in Interview',
    jobType: 'Central',
    location: 'Dean\'s Committee Room, AIIMS, New Delhi',
    experience: 'Specialized Medical Degree',
    applicationMode: 'Offline',
    officialWebsite: 'https://aiims.edu',
    shortDescription: 'AIIMS New Delhi will conduct walk-in interviews on July 24-25, 2026, for recruiting Senior Residents / Senior Demonstrators on a tenure basis.',
    detailedDescription: 'Eligible candidates are invited to appear directly for interview in their respective departments along with filled bio-data forms, original credentials, and fees.',
    eligibility: 'Must possess postgraduate medical degree or equivalence registered under Medical Council of India (MCI) or State Council.',
    vacancyDetailsTable: [
      { post: 'Senior Resident (Anesthesiology)', total: 30, eligibility: 'MD/DNB Anesthesia' },
      { post: 'Senior Resident (Cardiology)', total: 12, eligibility: 'DM/DNB Cardiology' },
      { post: 'Senior Resident (General Surgery)', total: 25, eligibility: 'MS/DNB Surgery' },
      { post: 'Senior Resident (Pediatrics)', total: 15, eligibility: 'MD/DNB Pediatrics' }
    ],
    documentsRequired: [
      'Filled Bio-Data Form (Annexure A of Notification)',
      'Demand Draft of ₹1500 in favor of "Director AIIMS"',
      'MBBS & MD/MS Degree certificates',
      'MCI / Delhi Medical Council registration card',
      'No Objection Certificate if currently serving in State/Central Govt'
    ],
    howToApply: '1. Download the walk-in notification and print the application/bio-data annexure.\n2. Obtain a Demand Draft of ₹1,500 if applicable.\n3. Gather original educational and MBBS registrations and make one set of photocopies.\n4. Arrive at the Dean\'s Committee Room, AIIMS, New Delhi at 8:30 AM on designated date (based on specialty) for registration and document checking.\n5. Face the expert interview panel in the afternoon.',
    importantInstructions: 'No candidate will be allowed for registration after 10:00 AM on interview dates.',
    faqs: [
      { question: 'What is the tenure period of this residency?', answer: 'The residency is strictly on a contractual tenure basis for a maximum duration of 3 years.' }
    ],
    seoTitle: 'AIIMS Delhi Senior Resident Walk-in 2026 - MD MS Doctor Vacancies',
    seoKeywords: 'aiims delhi recruitment, senior resident walk-in, doctor jobs in delhi, medical recruitment 2026',
    seoDescription: 'Direct Walk-in interview for Senior Residents at AIIMS New Delhi. Check department-wise interview schedules, registration timings and vacancy counts.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Download Bio-Data Form', url: 'https://aiims.edu', variant: 'primary' },
      { label: 'Check Walk-in Schedule', url: 'https://aiims.edu', variant: 'success' },
      { label: 'Official Website', url: 'https://aiims.edu', variant: 'outline' }
    ],
    createdAt: '2026-07-02T08:00:00Z',
    views: 5900
  },
  {
    id: 'job-15',
    title: 'UPSC IAS Exam 2026 Civil Services Syllabus',
    postName: 'General Studies I, II & Optionals',
    organization: 'Union Public Service Commission',
    department: 'Examination Branch',
    advertisementNumber: 'CSE-Syllabus-2026',
    totalVacancies: 0,
    salary: 'N/A',
    ageLimit: 'N/A',
    qualification: 'Graduation',
    selectionProcess: 'Pre, Mains and Interview',
    applicationFees: [],
    applicationStartDate: '2026-06-01',
    applicationEndDate: '2026-07-25',
    state: 'All India',
    category: 'Syllabus',
    jobType: 'Central',
    location: 'Across India',
    experience: 'N/A',
    applicationMode: 'Online',
    officialWebsite: 'https://upsc.gov.in',
    shortDescription: 'Comprehensive Syllabus of GS 1, GS 2 (CSAT), Mains papers, and list of Optional subjects.',
    detailedDescription: 'Download the official syllabus including ancient history, geography, economy, polity, environment, and optional lists like History, Geography, PSIR, etc.',
    eligibility: 'N/A',
    vacancyDetailsTable: [],
    documentsRequired: [],
    howToApply: 'No registration. Access the download link below.',
    importantInstructions: 'Candidates should structure their studies in accordance with weights indicated in the syllabus file.',
    faqs: [],
    seoTitle: 'Official UPSC Syllabus 2026 Download PDF - Prelims and Mains Pattern',
    seoKeywords: 'upsc syllabus, ias syllabus, csat exam pattern',
    seoDescription: 'Download the official UPSC Civil Services exam syllabus and structure for GS Paper 1 and CSAT Prelims, along with GS 1-4 Mains.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Download Syllabus', url: 'https://upsc.gov.in', variant: 'primary' }
    ],
    createdAt: '2026-06-03T11:00:00Z',
    views: 4300
  },
  {
    id: 'job-16',
    title: 'Teach For India Fellowship Program 2026',
    postName: 'Teaching Fellow',
    organization: 'Teach For India',
    department: 'Educational Equity Division',
    advertisementNumber: 'TFI-FELLOW-2026',
    totalVacancies: 500,
    salary: '₹23,000 Per Month + Housing Allowance',
    ageLimit: '20 to 30 Years as of application date',
    qualification: 'Bachelor\'s Degree in any discipline from a recognized University',
    selectionProcess: 'Aptitude Test -> Phone Interview -> In-Person Group Discussion & Sample Teaching',
    applicationFees: [
      { category: 'General / OBC / SC / ST', fee: '₹0' }
    ],
    applicationStartDate: '2026-07-01',
    applicationEndDate: '2026-08-31',
    state: 'Delhi / Mumbai / Pune / Bengaluru',
    category: 'NGO Job',
    jobType: 'NGO',
    location: 'Under-resourced municipal schools',
    experience: 'Fresher / No experience, leadership potential is preferred',
    applicationMode: 'Online',
    officialWebsite: 'https://teachforindia.org',
    shortDescription: 'Teach For India is inviting young professionals and outstanding graduates for its prestigious two-year full-time fellowship to teach in low-income schools.',
    detailedDescription: 'The TFI Fellowship is a paid, highly competitive program designed to build young leaders who will eliminate educational inequity in India. Fellows serve as full-time teachers for 2 years in primary or secondary municipal classrooms.',
    eligibility: 'Must have excellent communication skills in English and high resilience to drive educational change.',
    vacancyDetailsTable: [
      { post: 'Teach For India Fellow (Pune)', total: 100, eligibility: 'Graduation in any stream' },
      { post: 'Teach For India Fellow (Delhi NCR)', total: 150, eligibility: 'Graduation in any stream' },
      { post: 'Teach For India Fellow (Mumbai)', total: 150, eligibility: 'Graduation in any stream' },
      { post: 'Teach For India Fellow (Bengaluru)', total: 100, eligibility: 'Graduation in any stream' }
    ],
    documentsRequired: [
      'Graduation Degree Certificate / Provisional',
      'Valid Government Identity Card',
      'Statement of Purpose Essay'
    ],
    howToApply: '1. Visit teachforindia.org/fellowship.\n2. Click on "Apply Now" and complete the registration form.\n3. Write your responses for the leadership essay questions.\n4. Complete the 30-minute online cognitive test.\n5. Submit the application for panel screening.',
    importantInstructions: 'This is a strict two-year commitment. Candidates are expected to teach for the entire academic years without early departures.',
    faqs: [
      { question: 'Is this a volunteer or paid program?', answer: 'It is a fully paid, full-time fellowship program. You receive a stipend of ₹23,000/month along with housing allowances depending on allocation.' }
    ],
    seoTitle: 'Teach For India Fellowship 2026 Apply Online - 500 Vacancies',
    seoKeywords: 'tfi fellowship 2026, teach for india apply, education ngo jobs, teaching jobs india',
    seoDescription: 'Applications open for Teach For India Fellowship 2026. Paid 2-year leadership program in municipal schools across major Indian cities. Stipend: ₹23,000/month.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Apply Online', url: 'https://teachforindia.org', variant: 'primary' },
      { label: 'Download Brochure', url: 'https://teachforindia.org', variant: 'outline' }
    ],
    createdAt: '2026-07-05T09:00:00Z',
    views: 8200
  },
  {
    id: 'job-17',
    title: 'TCS National Qualifier Test (NQT) Off-Campus Drive 2026',
    postName: 'Cognitive & Technical Assistant (Ninja/Digital Roles)',
    organization: 'Tata Consultancy Services (TCS)',
    department: 'Global Talent Acquisition',
    advertisementNumber: 'TCS-NQT/OFF-2026',
    totalVacancies: 12000,
    salary: '₹3.36 Lakhs - ₹7.0 Lakhs Per Annum',
    ageLimit: '18 to 28 Years',
    qualification: 'B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc from 2025/2026 Batches',
    selectionProcess: 'NQT Online Aptitude & Coding Test -> Technical Interview -> HR Round',
    applicationFees: [
      { category: 'All Applicants', fee: '₹0 (Free Off-Campus Registration)' }
    ],
    applicationStartDate: '2026-07-01',
    applicationEndDate: '2026-07-30',
    state: 'All India',
    category: 'Private Job',
    jobType: 'Private',
    location: 'Across TCS Development Centers',
    experience: 'Fresher',
    applicationMode: 'Online',
    officialWebsite: 'https://tcs.com',
    shortDescription: 'TCS is conducting the National Qualifier Test (NQT) for the 2025 and 2026 graduating batches to recruit thousands of engineers and IT professionals.',
    detailedDescription: 'The National Qualifier Test (NQT) evaluates cognitive skills, professional skills, and coding abilities. High-performing students are shortlisted for TCS Digital (higher pay packages) while standard performance awards TCS Ninja roles.',
    eligibility: 'Minimum 60% or 6.0 CGPA throughout 10th, 12th, and graduation without active backlogs.',
    vacancyDetailsTable: [
      { post: 'TCS Ninja Engineer', total: 9500, eligibility: 'B.Tech / MCA / M.Sc IT' },
      { post: 'TCS Digital Engineer', total: 2500, eligibility: 'Advanced coding in Python/Java/C++' }
    ],
    documentsRequired: [
      'TCS NextStep Application PDF',
      'All semester marksheet transcripts',
      'Updated Resume detailing final-year academic projects',
      'Government issued Identity card'
    ],
    howToApply: '1. Register on the TCS NextStep Portal (nextstep.tcs.com).\n2. Choose IT stream category.\n3. Fill out the massive Application Form completely and download the PDF.\n4. Click on "Apply For Drive" under status tabs.\n5. Download the Hall ticket once generated.',
    importantInstructions: 'Multiple profiles registered under the same candidate will lead to immediate disqualification.',
    faqs: [
      { question: 'What is the date of TCS NQT exam?', answer: 'The test is scheduled to be held from August 10, 2026 onwards at TCS iON Digital zones.' }
    ],
    seoTitle: 'TCS NQT 2026 Off-Campus Drive - Ninja Digital 12000 vacancies',
    seoKeywords: 'tcs nqt 2026, tcs nextstep apply, tcs ninja recruitment, tcs digital hiring',
    seoDescription: 'Apply Online for TCS National Qualifier Test (NQT) 2026. Over 12,000 engineering vacancies for IT, software developer, and cognitive roles. Free registration.',
    status: 'Published',
    isFeatured: true,
    buttons: [
      { label: 'Register on NextStep', url: 'https://nextstep.tcs.com', variant: 'primary' },
      { label: 'Practice Coding Questions', url: 'https://tcs.com', variant: 'outline' }
    ],
    createdAt: '2026-07-06T10:00:00Z',
    views: 14500
  },
  {
    id: 'job-18',
    title: 'CRY India NGO Child Development Program Executive',
    postName: 'Program Executive - Advocacy & Education',
    organization: 'Child Rights and You (CRY)',
    department: 'State Impact & Campaigning Desk',
    advertisementNumber: 'CRY-ADV-04-2026',
    totalVacancies: 18,
    salary: '₹40,000 - ₹55,000 Per Month',
    ageLimit: '21 to 40 Years',
    qualification: 'Postgraduate in Sociology, Social Work (MSW), or Public Policy',
    selectionProcess: 'Profile review -> Case analysis writing task -> HR & Leadership interviews',
    applicationFees: [
      { category: 'General / OBC / SC / ST', fee: '₹0' }
    ],
    applicationStartDate: '2026-06-15',
    applicationEndDate: '2026-07-28',
    state: 'Karnataka / Tamil Nadu / Delhi',
    category: 'NGO Job',
    jobType: 'NGO',
    location: 'District Headquarters / Metro Offices',
    experience: '1-3 Years experience in children advocacy, health, or policy research',
    applicationMode: 'Online',
    officialWebsite: 'https://cry.org',
    shortDescription: 'Child Rights and You (CRY) is hiring enthusiastic social sector professionals to lead child rights advocacy, community interventions, and impact evaluations.',
    detailedDescription: 'The Program Executive will coordinate with state educational departments, supervise block-level learning facilities, draft project reports, and manage field volunteer training programs.',
    eligibility: 'Must be willing to travel to project locations 50% of the time. Strong reporting and analytical writing skills are required.',
    vacancyDetailsTable: [
      { post: 'Delhi Regional Program Executive', total: 6, eligibility: 'MSW with 1 year experience' },
      { post: 'Bengaluru Child Welfare Officer', total: 6, eligibility: 'Sociology graduate with Kannada fluency' },
      { post: 'Chennai Advocacy Officer', total: 6, eligibility: 'Public Policy or MSW with Tamil fluency' }
    ],
    documentsRequired: [
      'Resume/CV with research/experience summary',
      'Two letters of reference',
      'Short writeup on "Child rights challenge in urban slums"'
    ],
    howToApply: '1. Open the CRY Careers page (cry.org/careers).\n2. Locate the "Program Executive" advertisement.\n3. Submit your resume and write-up through their application portal or email it to careers@crymail.org with post title in subject.',
    importantInstructions: 'No application fees of any kind are demanded by CRY. Guard against fake recruitment scams.',
    faqs: [
      { question: 'Is this a desk job?', answer: 'It is a hybrid role. 50% time is spent in metropolitan regional offices and 50% in rural/slum field locations evaluating educational centres.' }
    ],
    seoTitle: 'CRY India NGO Recruitment 2026 - Apply for Program Executive',
    seoKeywords: 'cry careers, child rights jobs, MSW careers, social service job opportunities',
    seoDescription: 'Child Rights and You (CRY) hiring Program Executives in Delhi, Bengaluru, and Chennai. High impact leadership role in social sector education and child advocacy.',
    status: 'Published',
    isFeatured: false,
    buttons: [
      { label: 'Apply on CRY Portal', url: 'https://cry.org', variant: 'primary' },
      { label: 'Read Advocacy Work', url: 'https://cry.org', variant: 'outline' }
    ],
    createdAt: '2026-07-01T09:00:00Z',
    views: 4800
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'How to Crack UPSC Civil Services Prelims in Your First Attempt',
    slug: 'crack-upsc-prelims-first-attempt',
    content: `## The Ultimate First-Attempt Guide to UPSC Prelims

The UPSC Civil Services Examination (CSE) is one of the most prestigious exams in India. Cracking the Prelims in the very first attempt is a dream of lakhs of aspirants. Here's a structured strategy designed by toppers:

### 1. Master the Exam Pattern & Syllabus
Before buying any books, print the official syllabus. Understand the division of topics:
*   **Paper-1 (General Studies):** Decides your qualification. Focused on History, Geography, Polity, Economy, Environment, Science & Tech, and Current Affairs.
*   **Paper-2 (CSAT):** Qualifying in nature (requires 33%). Tests basic math, reasoning, and reading comprehension.

### 2. Standard Resource List (Stick to One Book per Subject)
Over-reading multiple materials causes memory clutter. The ideal list is:
*   **History:** NCERTs (Class 6-12) + Spectrum Modern History.
*   **Polity:** M. Laxmikanth (The bible of Polity).
*   **Economy:** Ramesh Singh or Mrunal Sir notes + Budget & Economic Survey.
*   **Geography:** NCERTs Class 11 & 12 + GC Leong.
*   **Environment:** Shankar IAS Academy notes.

### 3. The Power of Mock Tests & PYQs
Solving at least 30 full-length mock tests and previous 10 years papers (PYQs) is non-negotiable. Mocks teach you the art of calculated guessing and time management.

### 4. Revision is the Key
Revise every topic at least three times before entering the exam hall. Create quick 1-page notes for volatile subjects like Art & Culture and International Schemes.`,
    category: 'Career Guidance',
    author: 'Dr. Suresh Kumar (Ex-IAS)',
    publishDate: '2026-07-02',
    featuredImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['UPSC', 'IAS Strategy', 'Civil Services', 'Study Tips'],
    readingTime: '5 min read',
    viewsCount: 1540,
    isTrending: true,
    isPopular: true,
    isRecent: true,
    comments: [
      { id: 'c1', author: 'Rohan Sharma', content: 'This is extremely helpful! Sticking to Laxmikanth and revision notes has boosted my mock scores.', date: '2026-07-03' },
      { id: 'c2', author: 'Ankita Verma', content: 'What Optional subject is recommended for humanities backgrounds?', date: '2026-07-05' }
    ],
    seoTitle: 'UPSC CSE Prelims First Attempt Strategy - Toppers Recommended Study Plan',
    seoDescription: 'Willing to crack UPSC Prelims in your first try? Check out standard booklist, study hours, PYQ secrets, and current affairs note-taking guide.',
    videoTutorialUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoTutorialTitle: 'UPSC Prelims First Attempt Strategy & Syllabus Breakdown Video',
    applyUrl: 'https://upsconline.nic.in'
  },
  {
    id: 'blog-2',
    title: 'Top 10 High-Paying Government Jobs in India After Graduation',
    slug: 'high-paying-government-jobs-india-graduation',
    content: `## Lucrative Careers in the Public Sector

Many graduates think government jobs offer high security but mediocre salaries. However, several central and state-level posts provide salaries and perks that easily match or exceed corporate tech jobs. Let's look at the top 10 choices:

### 1. IAS/IPS/IFS (UPSC Civil Services)
*   **Starting Salary:** ~₹56,100 basic + DA, HRA, Transport Allowance.
*   **Perks:** Official residence, vehicle, security guards, high social prestige, and immense power to drive public change.

### 2. RBI Grade B Officer
*   **Starting Gross Pay:** ~₹1,10,000 per month.
*   **Perks:** Flat inside prime Mumbai/Delhi locations, concessional loans, high-profile banking network exposure, and beautiful work-life balance.

### 3. ISRO / DRDO Scientists
*   **Eligibility:** B.E / B.Tech or M.Sc in relevant fields.
*   **Starting Scale:** Level 10 (Gazetted). Excellent choice for tech graduates desiring scientific discovery coupled with military/aerospace honor.

### 4. Public Sector Undertakings (PSUs) - ONGC, NTPC, IOCL
*   **Selection:** Usually via high GATE exam scores.
*   **Salary:** Annual package ranges from ₹12 Lakh to ₹20 Lakh starting, along with excellent medical coverage and company townships.

### 5. Bank Probationary Officers (SBI PO / IBPS PO)
*   **Starting Gross:** ₹65,000+ per month. Fast-track promotions and direct paths to leadership.`,
    category: 'Government Jobs',
    author: 'Vipin Singh',
    publishDate: '2026-07-05',
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    tags: ['Govt Jobs', 'RBI Grade B', 'High Salaries', 'Perks'],
    readingTime: '4 min read',
    viewsCount: 2310,
    isTrending: true,
    isPopular: true,
    isRecent: true,
    comments: [],
    seoTitle: 'Best High Paying Govt Jobs in India 2026 - UPSC, RBI, ISRO, PSU Salaries',
    seoDescription: 'Detailed list of top 10 highest paying government jobs in India. Compare starting base salaries, house rent allowances, luxury perks, and exam eligibility.'
  },
  {
    id: 'blog-3',
    title: 'Mastering the ATS Resume: 5 Secrets to Beat the Screeners',
    slug: 'mastering-ats-resume-secrets',
    content: `## How to Pass the Applicant Tracking System (ATS)

Over 90% of Fortune 500 companies and large government contractors use ATS software to filter out resumes before a human recruiter ever sees them. If your resume isn't formatted correctly, you're losing jobs you're qualified for.

### 1. Simple, Single-Column Formatting
Avoid complex two-column structures, graphs, sidebar progress ratings for skills, or tables. The ATS software reads from left to right, top to bottom. Multi-column templates often get scrambled and parsed as gibberish.

### 2. Use Standard, Clear Section Headings
Use recognizable titles:
*   Use "Work Experience" instead of "My Career Journey".
*   Use "Skills" instead of "Competencies" or "Strengths".
*   Use "Education" instead of "Academic Merits".

### 3. Match Job Keywords Naturally
Scan the target job description for recurring nouns and skill terms. For example, if a job requests "Data Entry Verification", include that exact phrase rather than just "Checking data sheets". Do not "keyword-stuff" in white text at the bottom—modern ATS systems flag this instantly.

### 4. File Format: PDF vs Word
Unless the application specifically requests a Word (.doc) file, a clean PDF is universally preferred. However, ensure it is a text-based PDF, not a scanned image of paper!`,
    category: 'Resume Tips',
    author: 'CVLoom Team',
    publishDate: '2026-07-06',
    featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
    tags: ['Resume Tips', 'ATS Checker', 'Job Search', 'Career Building'],
    readingTime: '3 min read',
    viewsCount: 940,
    isTrending: false,
    isPopular: true,
    isRecent: true,
    comments: [],
    seoTitle: 'How to Write ATS Friendly Resume - Format, Keywords & Layout Tips',
    seoDescription: 'Master the ATS resume writing guidelines. Learn to format tables, place industry keywords, write experience bullets, and score high on automatic parsing filters.'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    message: '🔥 UPSC Civil Services Examination (CSE) 2026: 1,056 IAS/IPS/IFS Vacancies Open - Apply Before 25 July!',
    link: '#job-detail/job-1',
    type: 'alert',
    isTicker: true,
    createdAt: '2026-07-08T00:00:00Z'
  },
  {
    id: 'notif-2',
    message: '⚡ SSC CGL Tier-1 2026 Admit Card & Exam Center Status Live: Download Regional Hall Tickets!',
    link: '#job-detail/job-2',
    type: 'update',
    isTicker: true,
    createdAt: '2026-07-07T12:00:00Z'
  },
  {
    id: 'notif-3',
    message: '🎓 National Means Cum Merit Scholarship (NMMS) 2026: ₹12,000 Annual Grant for Class 8+ Students!',
    link: '#job-detail/job-5',
    type: 'update',
    isTicker: true,
    createdAt: '2026-07-06T08:00:00Z'
  },
  {
    id: 'notif-4',
    message: '🌿 Goonj & UNICEF India Social Development & Humanitarian Associate Vacancies 2026 Open!',
    link: 'ngo-jobs',
    type: 'update',
    isTicker: true,
    createdAt: '2026-07-05T10:00:00Z'
  },
  {
    id: 'notif-5',
    message: '🏥 NHM State Health Society 4,800+ Samvida Community Health Officers & Staff Nurse Recruitment!',
    link: 'govt-samvida',
    type: 'alert',
    isTicker: true,
    createdAt: '2026-07-04T09:00:00Z'
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'GOVERNMENT VACANCIES 2026',
    title: 'Central & State Govt Jobs',
    subtitle: 'Access over 50,000+ verified government recruitments across UPSC, SSC, Railways, State PSCs, Police, and Judicial Services with instant official apply links.',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'Explore Govt Jobs',
    buttonLink: 'govt-jobs',
    isActive: true,
    order: 1
  },
  {
    id: 'slide-2',
    badge: 'SOCIAL IMPACT & UN SECTOR',
    title: 'NGO Jobs & Non-Profit Careers',
    subtitle: 'Drive meaningful social development. Explore vetted careers across premier NGOs, UN Agencies, and Corporate CSR Foundations nationwide.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'Browse NGO Jobs',
    buttonLink: 'ngo-jobs',
    isActive: true,
    order: 2
  },
  {
    id: 'slide-3',
    badge: 'STATE & NHM RECRUITMENT',
    title: 'Samvida & Contractual Jobs',
    subtitle: 'Fast-track recruitment notifications for National Health Mission (NHM), State Education Societies, Contractual Staff Nurses, and Project Engineers.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'View Samvida Jobs',
    buttonLink: 'govt-samvida',
    isActive: true,
    order: 3
  },
  {
    id: 'slide-4',
    badge: 'MERIT & CSR FINANCIAL AID',
    title: 'National & CSR Scholarships',
    subtitle: 'Unlock merit grants, post-matric financial assistance, and corporate CSR educational funding from Tata, Reliance, and the Ministry of Education.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'Find Scholarships',
    buttonLink: 'scholarships',
    isActive: true,
    order: 4
  },
  {
    id: 'slide-5',
    badge: 'PREMIER RESEARCH & POLICY',
    title: 'Fellowships & Internships',
    subtitle: 'Accelerate your career trajectory with Prime Minister Research Fellowship (PMRF), Gandhi Fellowship, NITI Aayog, and prestigious corporate internships.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    buttonText: 'Explore Fellowships',
    buttonLink: 'fellowships',
    isActive: true,
    order: 5
  }
];

export const INITIAL_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: 'home' },
  {
    id: 'govt-jobs',
    label: 'Govt Jobs',
    path: 'govt-jobs',
    categoryFilter: 'Govt Jobs',
    subnavs: [
      { id: 'state-govt', label: 'State Govt', filterCategory: 'Govt Jobs', filterSubCategory: 'State Govt', description: 'State Public Service Commissions, Police & Board jobs' },
      { id: 'central-govt', label: 'Central Govt', filterCategory: 'Govt Jobs', filterSubCategory: 'Central Govt', description: 'UPSC, SSC, Railways, Banking & Defence' },
      { id: 'govt-samvida', label: 'Govt Samvida', filterCategory: 'Govt Jobs', filterSubCategory: 'Govt Samvida', description: 'NHM, State Health Society & Contractual staff' },
      { id: 'contractual-base', label: 'Contractual Base', filterCategory: 'Govt Jobs', filterSubCategory: 'Contractual Base', description: 'Project Engineers, NITI Aayog & Autonomous councils' }
    ]
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    path: 'scholarships',
    categoryFilter: 'Scholarship',
    subnavs: [
      { id: 'govt-scholarship', label: 'Govt Scholarship', filterCategory: 'Scholarship', filterSubCategory: 'Govt Scholarship', description: 'NSP, Post-Matric, PM YASASVI' },
      { id: 'csr-scholarship', label: 'CSR Scholarship', filterCategory: 'Scholarship', filterSubCategory: 'CSR Scholarship', description: 'Tata Pankh, Reliance & HDFC CSR grants' },
      { id: 'ngo-scholarship', label: 'NGO Supported Scholarship', filterCategory: 'Scholarship', filterSubCategory: 'NGO Supported Scholarship', description: 'Smile Foundation & Vidyasaarathi NGO grants' },
      { id: 'other-scholarship', label: 'Other', filterCategory: 'Scholarship', filterSubCategory: 'Other', description: 'Merit-cum-means and private trusts' }
    ]
  },
  {
    id: 'ngo-jobs',
    label: 'NGO Jobs',
    path: 'ngo-jobs',
    categoryFilter: 'NGO Jobs',
    subnavs: [
      { id: 'non-profit', label: 'Non-profit', filterCategory: 'NGO Jobs', filterSubCategory: 'Non-Profit', description: 'Goonj, CRY, Teach For India, Pratham' },
      { id: 'csr-job', label: 'CSR Job', filterCategory: 'NGO Jobs', filterSubCategory: 'CSR Job', description: 'Corporate Social Responsibility Foundations' },
      { id: 'un-jobs', label: 'UN Jobs', filterCategory: 'NGO Jobs', filterSubCategory: 'UN Jobs', description: 'UNICEF, UNDP, WHO India & UN Women' }
    ]
  },
  {
    id: 'fellowships',
    label: 'Fellowships',
    path: 'fellowships',
    categoryFilter: 'Fellowship',
    subnavs: [
      { id: 'govt-fellowship', label: 'Govt Fellowship', filterCategory: 'Fellowship', filterSubCategory: 'Govt Fellowship', description: 'PMRF, NITI Aayog & LAMP Fellowship' },
      { id: 'ngo-fellowship', label: 'NGO Fellowship', filterCategory: 'Fellowship', filterSubCategory: 'NGO Fellowship', description: 'Gandhi Fellowship & Teach For India Fellowship' },
      { id: 'un-fellowship', label: 'UN Fellowship', filterCategory: 'Fellowship', filterSubCategory: 'UN Fellowship', description: 'UN Youth Volunteers & Policy Fellowships' },
      { id: 'other-fellowship', label: 'Other', filterCategory: 'Fellowship', filterSubCategory: 'Other', description: 'Academic and foundation research grants' }
    ]
  },
  {
    id: 'internship',
    label: 'Internship',
    path: 'internship',
    categoryFilter: 'Internship',
    subnavs: [
      { id: 'tech-internship', label: 'Tech & Corporate', filterCategory: 'Internship', filterSubCategory: 'Tech & Corporate', description: 'Software, AI, Data Science & Analytics' },
      { id: 'research-internship', label: 'Research & Policy', filterCategory: 'Internship', filterSubCategory: 'Research & Policy', description: 'Think tanks, Economic & Social Research' },
      { id: 'ngo-internship', label: 'NGO & Social', filterCategory: 'Internship', filterSubCategory: 'NGO & Social', description: 'Grassroots campaigns & community outreach' },
      { id: 'govt-internship', label: 'Govt Internship', filterCategory: 'Internship', filterSubCategory: 'Govt Internship', description: 'NITI Aayog, MEA & DPIIT Govt internships' }
    ]
  },
  {
    id: 'tools',
    label: 'Free Tools',
    path: 'tools',
    subnavs: [
      { id: 'image-resizer', label: '📸 Photo & Sign Resizer', description: 'Resize photo & sign in px, cm, inch & KB' },
      { id: 'pdf-converter', label: '📄 PDF & Image Converter', description: 'PDF to JPG, JPG to PDF & compressor' },
      { id: 'age-calculator', label: '🎂 Sarkari Age Calculator', description: 'Exact age relative to cut-off date' },
      { id: 'resume-builder', label: '💼 ATS Resume Builder', description: 'ATS score checker & resume maker' },
      { id: 'job-eligibility', label: '⚡ Job Eligibility Checker', description: 'Find matching govt & state openings' },
      { id: 'qr-generator', label: '📱 QR & Barcode Generator', description: 'Generate document barcodes & QR codes' },
      { id: 'gst-emi-calc', label: '🧾 GST & EMI Calculator', description: 'Loan EMIs and CGST/SGST breakdown' },
      { id: 'text-case-counter', label: '🔤 Word Counter & Case', description: 'Convert case & count words' }
    ]
  },
  { id: 'blogs', label: 'Blog', path: 'blogs' },
  { id: 'contact', label: 'Contact', path: 'contact' }
];

export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'CVLoom Premium AI Resume Builder',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=728&auto=format&fit=crop',
    targetUrl: 'https://cvloom.online',
    position: 'header',
    isActive: true,
    impressions: 4200,
    clicks: 180
  },
  {
    id: 'ad-2',
    title: 'Top Bank Prep Course - Testbook Partner Ad',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=350&auto=format&fit=crop',
    targetUrl: '#',
    position: 'sidebar',
    isActive: true,
    impressions: 2100,
    clicks: 95
  },
  {
    id: 'ad-3',
    title: 'Agniveer Rally Prep Test Pack - Adda247 Special Discount',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=728&auto=format&fit=crop',
    targetUrl: '#',
    position: 'homepage',
    isActive: true,
    impressions: 3800,
    clicks: 145
  },
  {
    id: 'ad-4',
    title: 'Download Sarkari Global Android App',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=728&auto=format&fit=crop',
    targetUrl: '#',
    position: 'footer',
    isActive: true,
    impressions: 6500,
    clicks: 520
  }
];
