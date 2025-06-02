
import { PersonalInfo, Publication, Experience, EducationItem, Certification, SkillCategory, ContactLink, NavLink, PublicationType, ConsultancyService, Testimonial, ExpertiseAreaItem, SkillValueItem, AcademicSkillListItem } from './types';

export const personalInfoData: PersonalInfo = {
  name: "Dr. Jaskirat Singh", 
  title: "Postdoc & Ph.D. | Researcher, Educator, Innovator", 
  subtitle: "(Former Postdoctoral Fellow, ICSSR, Ministry of Education, India)", 
  tagline: "Driving Socio-Economic Impact through Research, Technology, and Collaborative Innovation.", 
  professionalSummary: "Highly accomplished and results-oriented researcher, educator, and published author with over 10 years of experience specializing in finance, technology, and socio-economic development. Proven ability to secure prestigious fellowships (ICSSR Postdoctoral, UGC JRF/SRF) and lead impactful research projects from conception to publication in high-ranking Q1/Q2 Scopus and ABDC journals.\n\nExpertise spans quantitative (SPSS, R, SEM AMOS, STATA) and qualitative methodologies, grant acquisition, data analysis, and policy-related insight generation. Demonstrated success in postgraduate/doctoral teaching, curriculum design, thesis supervision, and peer review.\n\nPossesses exceptional administrative, project management, and cross-cultural communication skills, committed to driving international collaboration and positive social change. Passionate about leveraging research for practical solutions, especially for non-profit organizations and community development.",
  consultancyOfferSummary: "Offering pro-bono consultancy for NGOs and tailored research support for academics and organizations. Let's collaborate to make a difference.",
  email: "jasky786@gmail.com", 
  phone: "+91 9876624398",
  linkedIn: "https://www.linkedin.com/in/jasky786/", 
  googleScholar: "https://scholar.google.com/citations?user=d8Kd4ywAAAAJ&hl=en",
  orcid: "https://orcid.org/0000-0003-0337-7885",
  profileImageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQFtCAgc4PbKGg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1684786723981?e=1754524800&v=beta&t=rQgVORw-Y3NDyiACmG2sW95UjzuyFdP3g26nAojBZls", 
  ssrnProfileUrl: "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7349141", 
  researchGate: "https://www.researchgate.net/profile/Jaskirat-Singh-26?ev=hdr_xprf",
  academiaUrl: "https://icssr.academia.edu/JaskiratSingh",
  cvUrl: "/cv-html", 
  keyStats: [ 
    { id: "ks1", label: "Years Experience", value: "10+" },
    { id: "ks2", label: "Publications", value: "20+" },
    { id: "ks3", label: "Research Fellowships", value: "2" },
    { id: "ks4", label: "Scopus Indexed", value: "Q1/Q2" },
  ],
  currentFocusKeywords: [
    "Artificial Intelligence (AI)",
    "Blockchain Technology",
    "Fintech Innovation",
    "Financial Inclusion Strategies",
    "Socio-Economic Development",
    "Poverty Alleviation",
    "Impact Evaluation",
    "Sustainable Livelihoods",
    "Capability Approach",
    "Digital Transformation"
  ]
};

export const publicationsData: Publication[] = [ 
  // Peer-Reviewed Journal Articles from CV
  { 
    id: "prja1", 
    type: PublicationType.Journal, 
    authors: "Singh, J., & Singh, M.", 
    title: "Addressing unproductive credit consumption and beneficiary malpractices in social welfare programs for slum-dwellers: A study from India.", 
    source: "Cities", 
    year: 2024, 
    details: "145, 104729",
    doiLink: "https://doi.org/10.1016/j.cities.2023.104729",
    summary: "This study examines credit consumption patterns and beneficiary malpractices in social welfare programs targeting urban slum populations in India, proposing policy solutions.",
    insightSnippet: "Examines credit consumption in urban slums, proposing policy solutions for social welfare programs and addressing beneficiary malpractices.",
    featuredImageUrl: "https://images.pexels.com/photos/7551639/pexels-photo-7551639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    tags: ["Urban Poverty", "Social Welfare", "Credit Consumption"],
    impactMetrics: [{ name: "Impact", value: "Q1 Scopus | IF: 6.7", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja2", 
    type: PublicationType.Journal, 
    authors: "Singh, J., & Singh, M.", 
    title: "Alleviating urban poverty in India: The role of capabilities and entrepreneurship development.", 
    source: "International Journal of Social Economics", 
    year: 2024, 
    details: "51(10), 1314-1335",
    doiLink: "https://doi.org/10.1108/IJSE-10-2023-0752",
    summary: "Investigates the role of capability development and entrepreneurship in alleviating urban poverty in India.",
    insightSnippet: "Investigates the role of capability development and entrepreneurship in alleviating urban poverty in India.",
    tags: ["Urban Poverty", "Capability Approach", "Entrepreneurship"],
    impactMetrics: [{ name: "Impact", value: "Q2 Scopus | ABDC: B | IF: 1.9", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja3", 
    type: PublicationType.Journal, 
    authors: "Singh, J., & Singh, M.", 
    title: "Accelerating Financial Inclusion of the Urban Poor: Role of Innovative e-Payment Systems and JAM Trinity in Alleviating Poverty in India.", 
    source: "Global Business Review", 
    year: 2024, 
    details: "09721509231222609 (Online First)",
    status: "Online First",
    doiLink: "https://doi.org/10.1177/09721509231217600",
    summary: "Explores how innovative e-payment systems and JAM Trinity accelerate financial inclusion for India's urban poor.",
    insightSnippet: "Investigates how innovative e-payment systems and the JAM Trinity accelerate financial inclusion for India's urban poor, aiding poverty alleviation.",
    featuredImageUrl: "https://images.pexels.com/photos/7821937/pexels-photo-7821937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    tags: ["Financial Inclusion", "Fintech", "JAM Trinity", "Poverty Alleviation"],
    impactMetrics: [{ name: "Impact", value: "Q1 Scopus | ABDC: C | IF: 2.4", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja4",
    type: PublicationType.Journal, 
    authors: "Singh, V., & Singh, J.", 
    title: "Quantifying the relationship between e-advertising capabilities and marketing mix cost savings.", 
    source: "International Journal of Applied Management Science", 
    year: 2024, 
    details: "16(1), 44-67", 
    doiLink: "https://doi.org/10.1504/IJAMS.2024.136369",
    summary: "Quantifies how e-advertising capabilities contribute to marketing mix cost savings.",
    tags: ["E-Advertising", "Marketing Mix", "Cost Savings"],
    impactMetrics: [{ name: "Index", value: "Scopus", icon: "fas fa-database" }]
  },
  { 
    id: "prja5",
    type: PublicationType.Journal, 
    authors: "Singh, J., & Singh, M.", 
    title: "Fintech applications in social welfare schemes during Covid times: An extension of the classic TAM model in India.", 
    source: "International Social Science Journal", 
    year: 2023, 
    details: "73(250), 979–998", 
    doiLink: "https://doi.org/10.1111/issj.12406", 
    summary: "Extends the Technology Acceptance Model (TAM) to understand Fintech adoption in social welfare during COVID-19 in India.",
    tags: ["Fintech", "Social Welfare", "COVID-19", "TAM Model"],
    impactMetrics: [{ name: "Impact", value: "Q3 Scopus | ABDC: B", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja6",
    type: PublicationType.Journal, 
    authors: "Singh, J., & Singh, M.", 
    title: "Does financial inclusion impact socio-economic stability? A study of social safety net in Indian slums.", 
    source: "International Journal of Social Economics", 
    year: 2022, 
    details: "50(8), 1060-1084", 
    doiLink: "https://doi.org/10.1108/IJSE-05-2021-0302", 
    summary: "Studies the impact of financial inclusion on socio-economic stability and social safety nets in Indian slums.",
    tags: ["Financial Inclusion", "Socio-Economic Stability", "Indian Slums"],
    impactMetrics: [{ name: "Impact", value: "Q2 Scopus | ABDC: B", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja7",
    type: PublicationType.Journal, 
    authors: "Singh, J., Sharma, D., & Batra, G. S.", 
    title: "Does Credit Utilization Pattern Promote Poverty Alleviation? An Evidence from India.", 
    source: "Global Business Review", 
    year: 2023, 
    details: "24(6), 1227-1250", 
    doiLink: "https://doi.org/10.1177/0972150920966803", 
    summary: "Examines credit utilization patterns and their role in poverty alleviation in India.",
    tags: ["Credit Utilization", "Poverty Alleviation", "India"],
    impactMetrics: [{ name: "Impact", value: "Q1 Scopus | ABDC: C", icon: "fas fa-chart-line" }]
  },
  { 
    id: "prja8",
    type: PublicationType.Journal, 
    authors: "Singh, J., Batra, G. S., Sharma, D., & Singh, V.", 
    title: "Microcredit Usage Pattern and its Impact on Economic Activities of the Urban Deprived: A Study of Punjab State, India.", 
    source: "South Asian Journal of Management", 
    year: 2021, 
    details: "28(1), 128", 
    link: "https://www.sajm-amdisa.org/wp-content/uploads/2021/04/SAJM-28_1-Jan-Mar-2021-Microcredit-Usage-Pattern-and-its-Impact-on-Economic-Activities-of-the-Urban-Deprived.pdf", 
    summary: "Analyzes microcredit usage and its economic impact on the urban deprived in Punjab, India.",
    tags: ["Microcredit", "Urban Deprived", "Economic Impact", "Punjab"],
    impactMetrics: [{ name: "Impact", value: "ABDC: C", icon: "fas fa-chart-line" }]
  },

  // Book Chapters from CV
  {
    id: "bc1",
    type: PublicationType.BookChapter,
    authors: "Singh, J., & Sharma, D.",
    title: "Contemporary Challenges of Management Education in India: Review and Assessment.",
    source: "Chapter 9 in Interdisciplinary Approaches in Management Education. Apple Academic Press (CRC Press/Taylor & Francis Group).",
    year: 2024,
    details: "ISBN: 9781774916469",
    tags: ["Management Education", "India", "Higher Education"],
  },
  {
    id: "bc2",
    type: PublicationType.BookChapter,
    authors: "Singh, J.",
    title: "Integrating Microcredit, Fintech, and Social Safety Nets for Holistic Financial Inclusion: Empirical Insights from Urban Slums in India.",
    source: "In (Book Title TBD). River Publishers.",
    year: "2025 Expected",
    status: "Targeting Q1-Scopus, In Press",
    tags: ["Microcredit", "Fintech", "Social Safety Nets", "Financial Inclusion", "Urban Slums"],
  },
  {
    id: "bc3",
    type: PublicationType.BookChapter,
    authors: "Singh, J.",
    title: "Blockchain for Urban Welfare in the Global South: A Capability-Driven Framework for Digital Inclusion and Sustainable Impact.",
    source: "In (Book Title TBD). Wiley.",
    year: "2025 Expected",
    status: "Targeting Q1-Scopus, In Press",
    tags: ["Blockchain", "Urban Welfare", "Digital Inclusion", "Sustainable Impact", "Capability Approach"],
  },

  // Conference Papers from CV
  {
    id: "cp1",
    type: PublicationType.Conference,
    authors: "Singh, J.", 
    title: "Self-Help Groups (SHGs): A Tool for Developing Economies' Socio-Economic Development",
    source: "International Social Marketing Conference",
    year: 2025,
    details: "Poster Accepted. Presentation: 13-15 May 2025, QT Canberra, Australia.",
    status: "Poster Accepted",
    tags: ["Self-Help Groups", "Socio-Economic Development", "Developing Economies"],
  },

  // Communicated Research Papers & Other Work in Progress (as InProgress)
  {
    id: "wip1",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Blockchain's Role in Social Welfare, Financial Inclusion, and Public Sector Innovations in India: A Multi-Sector Analysis of Government-Led Initiatives.",
    source: "Cities",
    year: "Communicated 2024",
    status: "Targeting Q1-Scopus, ID: JCIT-D-24-04279, Review Completed",
    insightSnippet: "Analyzes Blockchain's transformative potential in social welfare, financial inclusion, and public sector innovations through government-led initiatives in India.",
    featuredImageUrl: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    tags: ["Blockchain", "Social Welfare", "Financial Inclusion", "Public Sector Innovation"],
  },
  {
    id: "wip2",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Harnessing Fintech for Poverty Alleviation: Enhancing Credit Utilization and Livelihoods in Urban Slums of North-western India through the Capability Approach and Sustainable Livelihoods Framework.",
    source: "Technological Forecasting & Social Change",
    year: "Communicated 2024",
    status: "Targeting Q1-Scopus/ABDC-A, ID: TFS-D-24-08167, Revision 1 Submitted",
    tags: ["Fintech", "Poverty Alleviation", "Credit Utilization", "Capability Approach", "Urban Slums"],
  },
  {
    id: "wip3",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Empowering India's Informal Workers Through AI and Blockchain: An ICT4D Framework for Skills, Trust, and Inclusive Growth.",
    source: "Information Technology for Development",
    year: "Communicated 2024",
    status: "Targeting Q1-Scopus/ABDC-A, ID: 246945216, Under Review",
    tags: ["AI", "Blockchain", "Informal Workers", "ICT4D", "Inclusive Growth"],
  },
  {
    id: "wip4",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Digital Capabilities for Urban Poverty Alleviation: Integrating E-Payment Awareness and Credit Utilization Patterns in Indian Slums.",
    source: "World Development",
    year: "Communicated 2025",
    status: "Targeting Q1-Scopus/ABDC-A, ID: WD-34919, With Editor",
    tags: ["Digital Capabilities", "Urban Poverty", "E-Payment", "Credit Utilization"],
  },
  {
    id: "wip5",
    type: PublicationType.InProgress, 
    authors: "Singh, J.",
    title: "The Capability Crisis: Rethinking Digital Financial Inclusion.",
    source: "Harvard Business Review / HBS Publishing",
    year: "Proposed Case Study 2024",
    status: "Targeting Scopus/ABDC (Proposed Case Study)",
    tags: ["Digital Financial Inclusion", "Capability Approach", "Case Study"],
  },
  {
    id: "wip6",
    type: PublicationType.InProgress,
    authors: "Singh, V. & Singh, J.",
    title: "The Contested Nexus: Gendered Techno-Ecological Incorporation and the Reconfiguration of Power in Rural India's Self-Help Groups.",
    source: "Feminist Economics",
    year: "Communicated 2025",
    status: "Targeting Q1-Scopus/ABDC-A, ID: RFEC-25-Apr-103, Under Review",
    tags: ["Gender", "Technology", "Self-Help Groups", "Feminist Economics", "Rural India"],
  },
  {
    id: "wip7", 
    type: PublicationType.InProgress,
    authors: "Dr. Gurdip Singh Batra; Dr. Sarvjeet Kaur Chatrath; Dr. Jaskirat Singh",
    title: "Reimagining Sikh Philanthropy (Dasvandh) through Fintech Innovations",
    source: "Guru Nanak Institute of Global Studies (GNI), Surrey, Canada",
    year: "Communicated 2024", 
    status: "Communicated",
    details: "Investigates integrating fintech (QR codes, mobile payments) into gurdwara donation processes to enhance transparency and trust, addressing opportunities and challenges (digital literacy, data privacy).",
    tags: ["Sikh Philanthropy", "Dasvandh", "Fintech", "Transparency", "Digital Literacy"],
  },

  // Book Proposals (As Editor) from CV
  {
    id: "bp1",
    type: PublicationType.BookProposal,
    authors: "Editors: Dr. Gurdip Singh Batra; Dr. Sarvjeet Kaur Chatrath; Dr. Jaskirat Singh",
    title: "Digital Marketing Strategies in the Global Economies",
    source: "Under consideration (targeting Q1/A publication globally)",
    year: "2025*",
    details: "Examines digital marketing's impacts on international business, consumer behavior, policy, and societal well-being amid global digital disruption.",
    tags: ["Digital Marketing", "Global Economies", "Consumer Behavior", "International Business"],
  },
  {
    id: "bp2",
    type: PublicationType.BookProposal,
    authors: "Editors: Dr. Sarvjeet Kaur Chatrath; Dr. Gurdip Singh Batra; Dr. Naomi Dale; Dr. Jaskirat Singh",
    title: "Navigating Consumer Behaviour and Environmental Sustainability: A Study Towards Developing a Green Business Model",
    source: "Under consideration (Springer Nature, Routledge, SAGE, or Wiley)",
    year: "2025*",
    details: "Explores sustainable consumer behaviour and green business model innovation through an interdisciplinary lens.",
    tags: ["Consumer Behavior", "Environmental Sustainability", "Green Business", "Interdisciplinary"],
  },
];


export const experienceData: Experience[] = [ 
  {
    id: "exp1",
    role: "Postdoctoral Research Fellow",
    organization: "Indian Council of Social Science Research (ICSSR), Ministry of Education, India",
    location: "New Delhi, India", 
    period: "2022 - 2024",
    descriptionPoints: [
      "Conducted groundbreaking research on innovative e-payment systems in social welfare schemes targeting urban poor households in India.",
      "Published high-impact research papers in Q1/Q2 Scopus-indexed journals, contributing to policy development in financial inclusion.",
      "Collaborated with international researchers on comparative studies of social welfare mechanisms."
    ],
    icon: "fas fa-flask" 
  },
   {
    id: "exp2",
    role: "Assistant Professor", 
    organization: "School of Management Studies, Punjabi University, Patiala, India", 
    location: "Patiala, India", 
    period: "2019 - 2021", 
    descriptionPoints: [
      "Delivered engaging postgraduate courses in Finance, Marketing, Economics, and Organizational Development, employing innovative teaching methods.", 
      "Successfully supervised numerous postgraduate theses, guiding students from initial proposal development through to final defense.", 
      "Secured research grants through competitive proposal writing and effectively facilitated student-led research projects.", 
      "Developed and delivered training modules on grant writing and research methodologies for students." 
    ],
    icon: "fas fa-chalkboard-teacher"
  },
  {
    id: "exp3",
    role: "Junior/Senior Research Fellow (JRF/SRF)", 
    organization: "School of Management Studies, Punjabi University, Patiala, India (Funded by UGC)", 
    location: "Patiala, India", 
    period: "2013 - 2018", 
    descriptionPoints: [
      "Conducted extensive interdisciplinary Ph.D. research on \"Credit Expansion Programmes for the Urban Poor,\" employing rigorous quantitative and qualitative methods.",
      "Analyzed large-scale datasets using SPSS, R, and advanced statistical techniques (e.g., SEM) to derive meaningful insights.",
      "Taught various post-graduate courses including Management, Finance, Marketing, Economics, and Organizational Development.",
      "Published significant research findings in peer-reviewed academic journals.",
      "Actively contributed to grant proposal preparation and provided essential project management support for departmental research initiatives."
    ],
    icon: "fas fa-user-graduate"
  }
];

export const educationData: EducationItem[] = [ 
  {
    id: "edu1",
    degree: "Postdoctoral Research (Management)",
    institution: "Indian Council of Social Science Research (ICSSR), Ministry of Education",
    location: "New Delhi, India",
    period: "2022 - 2024",
    thesisOrDissertation: "\"Innovative E-Payment Portal Systems in Social Welfare Schemes: An Empirical Study of Urban Poor Households in India\" [F.No. 3-36/2021-22/PDF/GEN]",
    achievement: "Awarded prestigious ICSSR Postdoctoral Fellowship (Top 100 out of 3000+ applicants nationwide). Only candidate in Punjab selected in Management (General Category) in 2022."
  },
  {
    id: "edu2",
    degree: "Ph.D. in Business Management",
    institution: "School of Management Studies, Punjabi University",
    location: "Patiala, India",
    period: "2013 - 2019",
    thesisOrDissertation: "\"Credit Expansion Programmes for the Urban Poor: An Empirical Study of Punjab and Chandigarh\"",
    achievement: "Awarded competitive Junior Research Fellowship (JRF) / Senior Research Fellowship (SRF) by UGC.",
    verification: "Degree verified by WES Canada. Canadian Equivalency: Earned doctorate. [WES Ref#: 4430345IMM]"
  },
  {
    id: "edu3",
    degree: "MBA in Global Business (Finance/Marketing)",
    specialization: "Finance & Marketing", 
    institution: "School of Management Studies, Punjabi University",
    location: "Patiala, India",
    period: "2010 - 2012",
    achievement: "Ranked #1 Program Topper; Awarded merit-based scholarship.",
    verification: "Degree verified by WES Canada. Canadian Equivalency: Postgraduate diploma (one year). [WES Ref#: 4430345IMM]"
  },
  {
    id: "edu4",
    degree: "Bachelor of Commerce (B. Com)",
    institution: "Govt. Bikram College of Commerce, Punjabi University",
    location: "Patiala, India",
    period: "2007 - 2010",
    verification: "Degree verified by WES Canada. Canadian Equivalency: Bachelor’s degree (four years). [WES Ref#: 4430345IMM]"
  }
];

export const specializedSkillsData: { 
  researchMethods: SkillValueItem[];
  statisticalTools: SkillValueItem[];
  academicSkills: AcademicSkillListItem[];
} = {
  researchMethods: [
    { name: "Quantitative Research", percentage: 95 },
    { name: "Qualitative Analysis", percentage: 85 },
    { name: "Mixed Methods", percentage: 90 },
    { name: "Econometrics (Basic)", percentage: 75 },
    { name: "Impact Evaluation", percentage: 80 },
  ],
  statisticalTools: [
    { name: "SPSS", percentage: 95 },
    { name: "R", percentage: 80 },
    { name: "STATA (Basic)", percentage: 70 },
    { name: "SEM AMOS", percentage: 90 },
    { name: "Advanced Excel", percentage: 85 },
  ],
  academicSkills: [ 
    { name: "Qualitative Research Design", icon: "fas fa-drafting-compass text-green-500" },
    { name: "Systematic Reviews", icon: "fas fa-book-reader text-green-500" },
    { name: "Bibliometrics", icon: "fas fa-chart-bar text-green-500" },
    { name: "High-Impact Journal Publication (Q1/Q2 Scopus, ABDC)", icon: "fas fa-file-alt text-green-500" },
    { name: "Peer Review (Journals)", icon: "fas fa-glasses text-green-500" },
    { name: "Thesis Assessment (PG/Ph.D.)", icon: "fas fa-user-check text-green-500" },
    { name: "Postgraduate & Ph.D. Level Teaching", icon: "fas fa-chalkboard-teacher text-green-500"},
    { name: "Curriculum Design", icon: "fas fa-sitemap text-green-500"},
    { name: "Student Mentoring & Guidance", icon: "fas fa-hands-helping text-green-500"},
    { name: "Postgraduate & Ph.D. Thesis Supervision", icon: "fas fa-user-graduate text-green-500"},
    { name: "Grant Writing", icon: "fas fa-award text-green-500" },
    { name: "Proposal Development Acquisition", icon: "fas fa-file-signature text-green-500" },
    { name: "Project Coordination, Reporting, Risk Management", icon: "fas fa-project-diagram text-green-500" },
    { name: "Stakeholder Management, Event Organization", icon: "fas fa-users-cog text-green-500" }
  ]
};

export const areasOfExpertiseData: ExpertiseAreaItem[] = [ 
  {
    id: "expArea1",
    icon: "fas fa-university", 
    title: "Finance/Fintech",
    description: "Specializing in Financial Inclusion, Microfinance, E-Payments, Blockchain, and AI (Conceptual). Focused on leveraging technology for financial innovation and accessibility.",
    tags: ["Financial Inclusion", "Microfinance", "E-Payments", "Blockchain", "AI (Conceptual)"],
    iconBgColor: "bg-cyan-700", 
    tagBgColor: "bg-cyan-900",
    tagTextColor: "text-cyan-200"
  },
  {
    id: "expArea2",
    icon: "fas fa-people-carry", 
    title: "Development Studies",
    description: "Expertise in Socio-Economic Development, Poverty Alleviation, Capability Approach, Gender Studies, and issues concerning Urban Poor/Slums.",
    tags: ["Socio-Economic Development", "Poverty Alleviation", "Capability Approach", "Gender Studies", "Urban Poor"],
    iconBgColor: "bg-purple-700",
    tagBgColor: "bg-purple-900",
    tagTextColor: "text-purple-200"
  },
  {
    id: "expArea3", 
    icon: "fas fa-chart-line",
    title: "Advanced Data Analysis",
    description: "Proficient in quantitative and qualitative research methodologies with expertise in statistical tools including SPSS, R, STATA and SEM AMOS for complex socio-economic data analysis.",
    tags: ["Quantitative Methods", "Qualitative Methods", "SPSS", "R", "SEM AMOS", "STATA"],
    iconBgColor: "bg-amber-700", 
    tagBgColor: "bg-amber-900",
    tagTextColor: "text-amber-200"
  },
   {
    id: "expArea4",
    icon: "fas fa-laptop-code", 
    title: "Technical & Communication Skills",
    description: "Software proficiency in MS Office Suite, Google IT Support Suite (Fundamentals). Digital skills in Digital Marketing (Fundamentals). Communication abilities including Effective Presentation and Cross-Cultural Collaboration.",
    tags: ["MS Office", "Google IT Support", "Digital Marketing", "Effective Presentation"],
    iconBgColor: "bg-teal-700",
    tagBgColor: "bg-teal-900",
    tagTextColor: "text-teal-200"
  },
];


export const contactLinksData: ContactLink[] = [ 
  { id: "cl1", name: "Email", url: `mailto:${personalInfoData.email}`, iconClass: "fas fa-envelope" }, 
  { id: "cl2", name: "LinkedIn", url: personalInfoData.linkedIn, iconClass: "fab fa-linkedin-in" },
  { id: "cl3", name: "Google Scholar", url: personalInfoData.googleScholar, iconClass: "fas fa-graduation-cap" }, 
  { id: "cl4", name: "ResearchGate", url: personalInfoData.researchGate || "#", iconClass: "fab fa-researchgate" },
  { id: "cl5", name: "ORCID", url: personalInfoData.orcid, iconClass: "fas fa-id-card" }, 
  { id: "cl6", name: "SSRN", url: personalInfoData.ssrnProfileUrl || "#", iconClass: "fas fa-file-alt" }, 
  { id: "cl7", name: "Academia.edu", url: personalInfoData.academiaUrl || "#", iconClass: "fas fa-university" }, 
];

export const navLinksData: NavLink[] = [
  { id: "nav1", name: "Home", path: "/#home" },
  { id: "nav2", name: "About", path: "/#about" },
  { id: "nav3", name: "Research", path: "/#research" },
  { id: "nav4", name: "Experience", path: "/#experience" },
  { id: "nav5", name: "Skills", path: "/#skills" },
  { id: "nav7", name: "Consultancy", path: "/consultancy" },
  { id: "nav8", name: "Citations", path: "/citations" },     
  { id: "nav6", name: "Contact", path: "/#contact" },
];

export const consultancyServicesData: ConsultancyService[] = [
  {
    id: "cs1",
    title: "Research Design & Methodology",
    description: "Expert guidance on quantitative, qualitative, and mixed-methods research design, survey development, and data collection strategies tailored to your project's needs.",
    targetAudience: "Academics, PhD Scholars, Research Institutions",
    iconClass: "fas fa-drafting-compass",
  },
  {
    id: "cs2",
    title: "Advanced Statistical Analysis",
    description: "Comprehensive data analysis services using SPSS, R, STATA, and SEM AMOS, including model building, hypothesis testing, and interpretation of results.",
    targetAudience: "Researchers, Businesses, NGOs",
    iconClass: "fas fa-chart-bar",
  },
  {
    id: "cs3",
    title: "Grant Proposal & Publication Support",
    description: "Assistance in developing compelling grant proposals, manuscript writing, journal selection, and navigating the peer-review process for high-impact publications.",
    targetAudience: "Academics, Non-Profits",
    iconClass: "fas fa-file-signature",
  },
  {
    id: "cs4",
    title: "Pro-Bono for NGOs: Impact Assessment",
    description: "Specialized pro-bono consultancy for non-profit organizations to design and implement impact assessment frameworks, helping to measure and showcase social value.",
    targetAudience: "Non-Governmental Organizations (NGOs)",
    iconClass: "fas fa-hands-helping",
  },
];

export const certificationsData: Certification[] = [ 
  { id: "cert1", name: "Canadian Securities Course (CSC)", institution: "Canadian Securities Institute", year: 2023, link: "https://www.credly.com/badges/ec70aa23-1f49-4bf6-990d-eb979e99a0d0/public_url"},
  { id: "cert2", name: "Data Science: Foundations using R Specialization (5 Courses)", institution: "Johns Hopkins University (Coursera)", year: 2020 },
  { id: "cert3", name: "Google I.T. Support Professional Certificate (5 Courses)", institution: "Google (Coursera)", year: 2020 },
  { id: "cert4", name: "Google Digital Unlocked: Fundamentals of Digital Marketing", institution: "Google", year: 2020 },
  { id: "cert5", name: "Understanding Research Methods", institution: "University of London (Coursera)", year: 2020 },
  { id: "cert6", name: "Learning Excel: Data Analysis", institution: "LinkedIn Learning", year: 2020 },
  { id: "cert7", name: "SPSS Statistics Essential Training", institution: "LinkedIn Learning", year: 2020 },
  { id: "cert8", name: "SPSS Masterclass: Learn SPSS From Scratch to Advanced", institution: "Udemy", year: 2022 },
];

export const skillCategoriesData: SkillCategory[] = [ 
  {
    id: "sc1",
    name: "Research & Quantitative Analysis",
    skills: [
      { name: "Quantitative Methods", percentage: 95 } as SkillValueItem,
      { name: "Mixed-Methods", percentage: 90 } as SkillValueItem,
      { name: "Econometrics (Basic)", percentage: 75 } as SkillValueItem,
      { name: "Impact Evaluation", percentage: 80 } as SkillValueItem,
      { name: "SPSS", percentage: 95 } as SkillValueItem,
      { name: "R", percentage: 80 } as SkillValueItem,
      { name: "STATA (Basic)", percentage: 70 } as SkillValueItem,
      { name: "SEM AMOS", percentage: 90 } as SkillValueItem,
      { name: "Advanced Excel", percentage: 85 } as SkillValueItem,
      "Data Interpretation",
      "Visualization"
    ],
    icon: "fas fa-calculator",
    description: "Expertise in quantitative methodologies and statistical software for robust data analysis."
  },
  {
    id: "sc2",
    name: "Qualitative Research & Academic Output",
    skills: [
      "Qualitative Research Design",
      "Systematic Reviews",
      "Bibliometrics",
      "High-Impact Journal Publication (Q1/Q2 Scopus, ABDC)",
      "Peer Review (Journals)",
      "Thesis Assessment (PG/Ph.D.)"
    ],
    icon: "fas fa-book-open",
    description: "Proficiency in qualitative research design and producing high-impact academic outputs."
  },
  {
    id: "sc3",
    name: "Teaching, Mentoring & Supervision",
    skills: [
      "Postgraduate & Ph.D. Level Teaching",
      "Curriculum Design",
      "Student Mentoring & Guidance",
      "Postgraduate & Ph.D. Thesis Supervision"
    ],
    icon: "fas fa-chalkboard-teacher",
    description: "Dedicated to fostering academic growth through effective teaching and guidance."
  },
  {
    id: "sc4",
    name: "Project Management & Funding",
    skills: [
      "Grant Writing",
      "Proposal Development Acquisition",
      "Project Coordination",
      "Reporting",
      "Risk Management",
      "Stakeholder Management",
      "Event Organization"
    ],
    icon: "fas fa-project-diagram",
    description: "Skilled in acquiring funding and managing research projects from conception to completion."
  },
  {
    id: "sc5",
    name: "Domain Expertise",
    skills: [
      "Finance/Fintech (Financial Inclusion, Microfinance, E-Payments, Blockchain, AI (Conceptual))",
      "Development Studies (Socio-Economic Development, Poverty Alleviation, Capability Approach, Gender Studies, Urban Poor/Slums)"
    ],
    icon: "fas fa-landmark",
    description: "Specialized knowledge in finance, technology, and socio-economic development."
  },
  {
    id: "sc6",
    name: "Technical & Communication Skills",
    skills: [
      "MS Office Suite",
      "Google IT Support Suite (Fundamentals)",
      "Digital Marketing (Fundamentals)",
      "Effective Presentation",
      "Cross-Cultural Collaboration"
    ],
    icon: "fas fa-laptop-code",
    description: "Proficient in essential software and communication for effective collaboration."
  }
];

export const testimonialsData: Testimonial[] = [];
