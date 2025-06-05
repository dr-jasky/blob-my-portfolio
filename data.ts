import { PersonalInfo, Publication, Experience, EducationItem, Certification, SkillCategory, ContactLink, NavLink, PublicationType, ConsultancyService, Testimonial, ExpertiseAreaItem, SkillValueItem, AcademicSkillListItem } from './types';

// Reminder: For optimal performance and reliability, consider downloading the profileImageUrl 
// (https://files.catbox.moe/kdofh7.JPG) and serving it locally from your /public folder.
export const personalInfoData: PersonalInfo = {
  name: "Dr. Jaskirat Singh",
  title: "Researcher, Educator, Innovator",
  subtitle: "(Ph.D. & Former Postdoctoral Fellow, ICSSR, Ministry of Education, India)",
  tagline: "Driving Socio-Economic Impact through Research, Technology, and Collaborative Innovation.",
  professionalSummary: "Highly accomplished and results-oriented researcher, educator, and published author with over 10 years of experience specializing in finance, technology, and socio-economic development. Proven ability to secure prestigious fellowships (ICSSR Postdoctoral, UGC JRF/SRF) and lead impactful research projects from conception to publication in high-ranking Q1/Q2 Scopus and ABDC journals.\n\nExpertise spans quantitative (SPSS, R, SEM AMOS, STATA) and qualitative methodologies, grant acquisition, data analysis, and policy-related insight generation. Demonstrated success in postgraduate/doctoral teaching, curriculum design, thesis supervision, and peer review.\n\nPossesses exceptional administrative, project management, and cross-cultural communication skills, committed to driving international collaboration and positive social change. Passionate about leveraging research for practical solutions, especially for non-profit organizations and community development.",
  consultancyOfferSummary: "Leveraging research expertise to drive impactful solutions and foster innovation across sectors.",
  email: "jasky786@gmail.com",
  phone: "+919876624398",
  linkedIn: "https://www.linkedin.com/in/jasky786/",
  googleScholar: "https://scholar.google.com/citations?user=d8Kd4ywAAAAJ&hl=en",
  orcid: "https://orcid.org/0000-0003-0337-7885",
  profileImageUrl: "https://files.catbox.moe/kdofh7.JPG",
  ssrnProfileUrl: "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7349141",
  researchGate: "https://www.researchgate.net/profile/Jaskirat-Singh-26",
  academiaUrl: "https://icssr.academia.edu/JaskiratSingh",
  cvUrl: "/cv-html",
  keyStats: [
    { id: "ks1", label: "Years Experience", value: "10+" , icon: "fas fa-briefcase"},
    { id: "ks2", label: "Publications", value: "15+" , icon: "fas fa-book-open"},
    { id: "ks5", label: "Scopus Peer Reviews", value: "20+", icon: "fas fa-user-check" },
    { id: "ks3", label: "Research Fellowships", value: "2", icon: "fas fa-award" },
    { id: "ks4", label: "Scopus Indexed", value: "Q1/Q2", icon: "fas fa-file-signature" },
  ],
  currentFocusKeywords: [
    "AI in Social Welfare",
    "Blockchain for Urban Poverty",
    "Fintech & Financial Inclusion",
    "Sustainable Development Goals (SDGs)"
  ]
};

export const publicationsData: Publication[] = [
  // Peer-Reviewed Journal Articles
  {
    id: "prja1",
    type: PublicationType.Journal,
    authors: "Singh, J., & Singh, M.",
    title: "Addressing unproductive credit consumption and beneficiary malpractices in social welfare programs for slum-dwellers: A study from India.",
    source: "Cities",
    year: 2024,
    details: "Vol: 145, 104729",
    doiLink: "https://doi.org/10.1016/j.cities.2023.104729",
    summary: "This study examines credit consumption patterns and beneficiary malpractices in social welfare programs targeting urban slum populations in India. Our findings reveal significant challenges and propose policy solutions for more effective implementation.",
    tags: ["Urban Poverty", "Social Welfare", "Credit Consumption", "Slum Dwellers", "India"],
    insightSnippet: "Examines credit use & malpractices in welfare for slum-dwellers.",
    impactMetrics: [{ name: "Impact", value: "Q1 | IF: 6.7", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja2",
    type: PublicationType.Journal,
    authors: "Singh, J., & Singh, M.",
    title: "Accelerating Financial Inclusion of the Urban Poor: Role of Innovative e-Payment Systems and JAM Trinity in Alleviating Poverty in India.",
    source: "Global Business Review",
    year: 2024,
    details: "Vol: 097215092312760",
    status: "Online First",
    doiLink: "https://doi.org/10.1177/09721509231217600",
    summary: "This research explores how innovative e-payment systems and the JAM (Jan Dhan-Aadhaar-Mobile) Trinity are accelerating financial inclusion among India's urban poor, contributing significantly to poverty alleviation efforts.",
    tags: ["Financial Inclusion", "Fintech", "E-Payment", "JAM Trinity", "Poverty Alleviation"],
    insightSnippet: "Investigates e-payment systems & JAM Trinity for financial inclusion of urban poor.",
    impactMetrics: [{ name: "Impact", value: "Q1 | ABDC: C", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja3",
    type: PublicationType.Journal,
    authors: "Singh, J., & Singh, M.",
    title: "Alleviating urban poverty in India: The role of capabilities and entrepreneurship development.",
    source: "International Journal of Social Economics",
    year: 2024,
    details: "Vol: 51(10), 1414-1434",
    doiLink: "https://doi.org/10.1108/IJSE-10-2023-0752",
    summary: "This study investigates the critical role of capability development and entrepreneurship in alleviating urban poverty in India, presenting a sustainable framework for economic empowerment of marginalized communities.",
    tags: ["Urban Poverty", "Capability Approach", "Entrepreneurship Development", "Economic Empowerment"],
    insightSnippet: "Explores capability and entrepreneurship roles in urban poverty alleviation.",
    impactMetrics: [{ name: "Impact", value: "Q2 | ABDC: B", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja4",
    type: PublicationType.Journal,
    authors: "Singh, V., & Singh, J.",
    title: "Quantifying the relationship between e-advertising capabilities and marketing mix cost savings.",
    source: "International Journal of Applied Management Science",
    year: 2024,
    details: "Vol: 16(1), 44-67",
    doiLink: "https://doi.org/10.1504/IJAMS.2024.136369",
    summary: "This study quantifies the impact of e-advertising capabilities on achieving cost savings within the marketing mix framework, offering insights for optimizing digital marketing strategies.",
    tags: ["E-Advertising", "Marketing Mix", "Cost Savings", "Digital Marketing"],
    impactMetrics: [{ name: "Index", value: "Scopus", icon: "fas fa-database" }]
  },
  {
    id: "prja5",
    type: PublicationType.Journal,
    authors: "Singh, J., & Singh, M.",
    title: "Fintech applications in social welfare schemes during Covid times: An extension of the classic TAM model in India.",
    source: "International Social Science Journal",
    year: 2023,
    details: "Vol: 73(250), 979-998",
    doiLink: "https://doi.org/10.1111/issj.12406",
    summary: "The study extends the Technology Acceptance Model (TAM) to assess the adoption of Fintech applications within social welfare schemes in India, particularly focusing on their role and user acceptance during the COVID-19 pandemic.",
    tags: ["Fintech", "Social Welfare", "COVID-19", "TAM Model", "Technology Acceptance"],
    impactMetrics: [{ name: "Impact", value: "Q3 | ABDC: B", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja6",
    type: PublicationType.Journal,
    authors: "Singh, J., & Singh, M.",
    title: "Does financial inclusion impact socio-economic stability? A study of social safety net in Indian slums.",
    source: "International Journal of Social Economics",
    year: 2022,
    details: "Vol: 50(8), 1060-1084",
    doiLink: "https://doi.org/10.1108/IJSE-05-2021-0302",
    summary: "This research examines the effect of financial inclusion on socio-economic stability, focusing on the social safety nets available to residents of Indian slums. It provides insights into how financial services access correlates with stability indicators.",
    tags: ["Financial Inclusion", "Socio-Economic Stability", "Social Safety Net", "Indian Slums"],
    impactMetrics: [{ name: "Impact", value: "Q2 | ABDC: B", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja7",
    type: PublicationType.Journal,
    authors: "Singh, J., Sharma, D., & Batra, G. S.",
    title: "Does Credit Utilization Pattern Promote Poverty Alleviation? An Evidence from India.",
    source: "Global Business Review",
    year: 2023,
    details: "Vol: 24(6), 1227-1250",
    doiLink: "https://doi.org/10.1177/0972150920966803",
    summary: "The study provides empirical evidence from India on how patterns of credit utilization among the poor influence poverty alleviation efforts, highlighting productive versus unproductive uses of credit.",
    tags: ["Credit Utilization", "Poverty Alleviation", "India"],
    impactMetrics: [{ name: "Impact", value: "Q1 | ABDC: C", icon: "fas fa-chart-line" }]
  },
  {
    id: "prja8",
    type: PublicationType.Journal,
    authors: "Singh, J., Batra, G. S., Sharma, D., & Singh, V.",
    title: "Microcredit Usage Pattern and its Impact on Economic Activities of the Urban Deprived: A Study of Punjab State, India.",
    source: "South Asian Journal of Management",
    year: 2021,
    details: "Vol: 28(1), 128",
    link: "https://www.sajm-amdisa.org/wp-content/uploads/2021/04/SAJM-28_1-Jan-Mar-2021-Microcredit-Usage-Pattern-and-its-Impact-on-Economic-Activities-of-the-Urban-Deprived.pdf",
    summary: "This paper analyzes the patterns of microcredit usage among the urban deprived in Punjab, India, and assesses its impact on their economic activities and overall financial well-being.",
    tags: ["Microcredit", "Urban Deprived", "Economic Impact", "Punjab"],
    impactMetrics: [{ name: "Impact", value: "ABDC: C", icon: "fas fa-chart-line" }]
  },

  // Book Chapters
  {
    id: "bc1",
    type: PublicationType.BookChapter,
    authors: "Singh, J., & Sharma, D.",
    title: "Contemporary Challenges of Management Education in India: Review and Assessment.",
    source: "Chapter 9 in Interdisciplinary Approaches in Management Education. Apple Academic Press (CRC Press/Taylor & Francis Group).",
    year: 2024,
    details: "ISBN: 9781774916469",
    summary: "This chapter reviews and assesses the contemporary challenges facing management education in India, proposing interdisciplinary approaches to address them.",
    tags: ["Management Education", "India", "Higher Education", "Interdisciplinary"],
  },
  {
    id: "bc2",
    type: PublicationType.BookChapter,
    authors: "Singh, J.",
    title: "Integrating Microcredit, Fintech, and Social Safety Nets for Holistic Financial Inclusion: Empirical Insights from Urban Slums in India.",
    source: "In (Book Title TBD). River Publishers.",
    year: "2025 (Exp.)",
    status: "Targeting Q1-Scopus, In Press",
    summary: "This chapter presents empirical insights from urban slums in India on integrating microcredit, Fintech, and social safety nets to achieve holistic financial inclusion.",
    tags: ["Microcredit", "Fintech", "Social Safety Nets", "Financial Inclusion", "Urban Slums"],
  },
  {
    id: "bc3",
    type: PublicationType.BookChapter,
    authors: "Singh, J.",
    title: "Blockchain for Urban Welfare in the Global South: A Capability-Driven Framework for Digital Inclusion and Sustainable Impact.",
    source: "In (Book Title TBD). Wiley.",
    year: "2025 (Exp.)",
    status: "Targeting Q1-Scopus, In Press",
    summary: "Proposes a capability-driven framework for leveraging Blockchain technology to enhance urban welfare, digital inclusion, and sustainable impact in the Global South.",
    tags: ["Blockchain", "Urban Welfare", "Digital Inclusion", "Sustainable Impact", "Capability Approach"],
    insightSnippet: "Framework for Blockchain in urban welfare for Global South.",
  },

  // Conference Papers
  {
    id: "cp1",
    type: PublicationType.Conference,
    authors: "Singh, J.",
    title: "Self-Help Groups (SHGs): A Tool for Developing Economies' Socio-Economic Development",
    source: "International Social Marketing Conference",
    year: 2025,
    details: "Poster Accepted. Presentation: 13-15 May 2025, QT Canberra, Australia.",
    status: "Poster Accepted",
    summary: "This poster, accepted for the International Social Marketing Conference, discusses the role of Self-Help Groups (SHGs) as a vital tool for fostering socio-economic development in developing economies.",
    tags: ["Self-Help Groups", "Socio-Economic Development", "Developing Economies", "Social Marketing"],
  },

  // Communicated Research Papers & Other Work in Progress
  {
    id: "wip1",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Blockchain's Role in Social Welfare, Financial Inclusion, and Public Sector Innovations in India: A Multi-Sector Analysis of Government-Led Initiatives.",
    source: "Cities",
    year: "Comm. 2024",
    status: "Targeting Q1-Scopus, ID: JCIT-D-24-04279, Review Completed",
    summary: "This paper analyzes the transformative potential of Blockchain technology in social welfare, financial inclusion, and public sector innovations, focusing on government-led initiatives in India through a multi-sector analysis.",
    tags: ["Blockchain", "Social Welfare", "Financial Inclusion", "Public Sector Innovation", "India"],
    insightSnippet: "Analyzes Blockchain's role in Indian social welfare and public sector innovation.",
  },
  {
    id: "wip2",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Harnessing Fintech for Poverty Alleviation: Enhancing Credit Utilization and Livelihoods in Urban Slums of North-western India through the Capability Approach and Sustainable Livelihoods Framework.",
    source: "Technological Forecasting & Social Change",
    year: "Comm. 2024",
    status: "Targeting Q1-Scopus/ABDC-A, ID: TFS-D-24-08167, Revision 1 Submitted",
    summary: "This research explores how Fintech can be harnessed for poverty alleviation by enhancing credit utilization and livelihoods in urban slums of North-western India, utilizing the Capability Approach and Sustainable Livelihoods Framework.",
    tags: ["Fintech", "Poverty Alleviation", "Credit Utilization", "Capability Approach", "Sustainable Livelihoods", "Urban Slums"],
  },
  {
    id: "wip3",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Empowering India's Informal Workers Through AI and Blockchain: An ICT4D Framework for Skills, Trust, and Inclusive Growth.",
    source: "Information Technology for Development",
    year: "Comm. 2024",
    status: "Targeting Q1-Scopus/ABDC-A, ID: 246945216, Under Review",
    summary: "This study proposes an ICT4D (Information and Communication Technologies for Development) framework to empower India's informal workers through AI and Blockchain, focusing on skills development, trust-building, and fostering inclusive growth.",
    tags: ["AI", "Artificial Intelligence", "Blockchain", "Informal Workers", "ICT4D", "Inclusive Growth", "India"],
    insightSnippet: "ICT4D framework using AI & Blockchain for India's informal workers.",
  },
  {
    id: "wip4",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "Digital Capabilities for Urban Poverty Alleviation: Integrating E-Payment Awareness and Credit Utilization Patterns in Indian Slums.",
    source: "World Development",
    year: "Comm. 2025",
    status: "Targeting Q1-Scopus/ABDC-A, ID: WD-34919, With Editor",
    summary: "This paper investigates the role of digital capabilities in urban poverty alleviation, specifically by integrating e-payment awareness and analyzing credit utilization patterns within Indian slums.",
    tags: ["Digital Capabilities", "Urban Poverty", "E-Payment", "Credit Utilization", "Indian Slums"],
  },
  {
    id: "wip5",
    type: PublicationType.InProgress,
    authors: "Singh, J.",
    title: "The Capability Crisis: Rethinking Digital Financial Inclusion.",
    source: "Harvard Business Review / HBS Publishing",
    year: "Prop. 2024",
    status: "Targeting Scopus/ABDC (Proposed Case Study)",
    summary: "This proposed case study aims to rethink digital financial inclusion through the lens of the capability approach, addressing the 'capability crisis' that often hinders effective adoption and use of digital financial services.",
    tags: ["Digital Financial Inclusion", "Capability Approach", "Case Study", "Financial Services"],
  },
  {
    id: "wip6",
    type: PublicationType.InProgress,
    authors: "Singh, V. & Singh, J.",
    title: "The Contested Nexus: Gendered Techno-Ecological Incorporation and the Reconfiguration of Power in Rural India's Self-Help Groups.",
    source: "Feminist Economics",
    year: "Comm. 2025",
    status: "Targeting Q1-Scopus/ABDC-A, ID: RFEC-25-Apr-103, Under Review",
    summary: "This research examines the contested nexus of gendered techno-ecological incorporation and how it reconfigures power dynamics within Self-Help Groups in rural India, contributing to feminist economic discourse.",
    tags: ["Gender", "Technology", "Self-Help Groups", "Feminist Economics", "Rural India", "Power Dynamics"],
  },
  {
    id: "wip7",
    type: PublicationType.InProgress,
    authors: "Dr. Gurdip Singh Batra; Dr. Sarvjeet Kaur Chatrath; Dr. Jaskirat Singh",
    title: "Reimagining Sikh Philanthropy (Dasvandh) through Fintech Innovations",
    source: "Guru Nanak Institute of Global Studies (GNI), Surrey, Canada",
    year: "Comm. 2024",
    status: "Communicated",
    summary: "Investigates integrating fintech (QR codes, mobile payments) into gurdwara donation processes to enhance transparency and trust in Sikh philanthropy (Dasvandh), addressing opportunities and challenges like digital literacy and data privacy.",
    tags: ["Sikh Philanthropy", "Dasvandh", "Fintech", "Transparency", "Digital Literacy", "Religious Donations"],
  },

  // Book Proposals (As Editor)
  {
    id: "bp1",
    type: PublicationType.BookProposal,
    authors: "Editors: Dr. Gurdip Singh Batra; Dr. Sarvjeet Kaur Chatrath; Dr. Jaskirat Singh",
    title: "Digital Marketing Strategies in the Global Economies",
    source: "Under consideration (targeting Q1/A publication globally)",
    year: "2025*",
    status: "Proposal Submitted",
    summary: "This edited book proposal examines the multifaceted impacts of digital marketing strategies on international business, consumer behavior, policy frameworks, and societal well-being amidst ongoing global digital disruption.",
    tags: ["Digital Marketing", "Global Economies", "Consumer Behavior", "International Business", "Policy"],
  },
  {
    id: "bp2",
    type: PublicationType.BookProposal,
    authors: "Editors: Dr. Sarvjeet Kaur Chatrath; Dr. Gurdip Singh Batra; Dr. Naomi Dale; Dr. Jaskirat Singh",
    title: "Navigating Consumer Behaviour and Environmental Sustainability: A Study Towards Developing a Green Business Model",
    source: "Under consideration (Springer Nature, Routledge, SAGE, or Wiley)",
    year: "2025*",
    status: "Proposal Submitted",
    summary: "This edited book proposal explores the complex interplay between sustainable consumer behaviour and the innovation of green business models, adopting an interdisciplinary perspective to address environmental challenges.",
    tags: ["Consumer Behavior", "Environmental Sustainability", "Green Business", "Interdisciplinary", "Sustainable Development"],
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
    role: "Independent Educator & Freelance Researcher",
    organization: "Independent Consultancy & Research",
    location: "Patiala, Punjab, India & Remote",
    period: "2019 - Present",
    descriptionPoints: [
      "Fulfills a multifaceted role involving teaching, freelance research, and consultancy, focusing on career development and socio-economic research.",
      "Leads graduate/postgraduate courses (Finance, Economics, Research Methodology); develops innovative curricula and integrates cutting-edge research, earning high teaching evaluations.",
      "Authors and co-authors numerous research publications for high-impact journals; extensively involved in data collection, advanced statistical analysis (SPSS, R, AMOS), and interpretation.",
      "Continuously engages in learning and implementing new research tools, advanced analytical techniques, and pedagogical methods for academic and professional growth.",
      "Provides comprehensive thesis supervision and mentorship to 5+ Master's students and doctoral candidates, guiding them through their research lifecycle and career development.",
      "Undertakes independent research projects, manages data analysis workflows, and contributes to knowledge dissemination through academic publishing and presentations."
    ],
    icon: "fas fa-chalkboard-teacher"
  },
  {
    id: "exp3",
    role: "Research Fellow (SRF)",
    organization: "University Grants Commission (UGC), India (at Punjabi University, Patiala)",
    location: "Patiala, India",
    period: "2015 - 2018",
    descriptionPoints: [
      "Conducted doctoral research on credit expansion programs for urban poor, developing evidence-based policy recommendations.",
      "Employed mixed-methods approach combining advanced quantitative analysis (SEM, AMOS) with qualitative insights.",
      "Presented findings at 5+ national and international conferences, expanding academic network."
    ],
    icon: "fas fa-user-graduate"
  },
  {
    id: "exp4",
    role: "Research Fellow (JRF)",
    organization: "University Grants Commission (UGC), India (at Punjabi University, Patiala)",
    location: "Patiala, India",
    period: "2013 - 2015",
    descriptionPoints: [
      "Initiated Ph.D. research focusing on financial inclusion for urban deprived populations.",
      "Assisted in teaching undergraduate and postgraduate courses.",
      "Contributed to departmental research activities and data collection efforts."
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
    degree: "MBA in Global Business",
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

// Skills from "Experience" page sidebar
export const specializedSkillsData: {
  researchMethods: SkillValueItem[];
  statisticalTools: SkillValueItem[];
  academicSkills: AcademicSkillListItem[];
} = {
  researchMethods: [
    { name: "Quantitative Research", percentage: 95 },
    { name: "Qualitative Analysis", percentage: 85 },
    { name: "Mixed Methods", percentage: 90 },
  ],
  statisticalTools: [
    { name: "SPSS & STATA", percentage: 95 },
    { name: "R Programming", percentage: 80 },
    { name: "AMOS (SEM)", percentage: 90 },
  ],
  academicSkills: [
    { name: "Grant Writing", icon: "fas fa-check-circle text-green-500" },
    { name: "Curriculum Design", icon: "fas fa-check-circle text-green-500" },
    { name: "Academic Publishing", icon: "fas fa-check-circle text-green-500" },
    { name: "Thesis Supervision", icon: "fas fa-check-circle text-green-500" },
    { name: "Peer Review", icon: "fas fa-check-circle text-green-500" },
    { name: "Research Presentation", icon: "fas fa-check-circle text-green-500" }
  ]
};

// From "Skills" page (Areas of Expertise cards)
export const areasOfExpertiseData: ExpertiseAreaItem[] = [
  {
    id: "expArea1",
    icon: "fas fa-university",
    title: "Financial Inclusion",
    description: "Expert in assessing and developing strategies for financial inclusion, particularly for marginalized urban populations. Specialized in analyzing policy frameworks and their practical implementation.",
    tags: ["Banking Access", "Digital Finance", "Microfinance", "Policy Analysis"],
    iconBgColor: "bg-cyan-700",
    tagBgColor: "bg-cyan-900",
    tagTextColor: "text-cyan-200"
  },
  {
    id: "expArea2",
    icon: "fas fa-mobile-alt",
    title: "E-Payment Systems",
    description: "Specialist in innovative e-payment solutions for development, including JAM Trinity implementation in India. Research focuses on adoption barriers and policy solutions.",
    tags: ["Digital Transactions", "UPI Systems", "Fintech Adoption", "JAM Trinity"],
    iconBgColor: "bg-purple-700",
    tagBgColor: "bg-purple-900",
    tagTextColor: "text-purple-200"
  },
  {
    id: "expArea3",
    icon: "fas fa-home",
    title: "Urban Poverty",
    description: "Extensive research on urban poverty dynamics, with focus on credit access, welfare schemes, and capability development approaches to sustainable poverty alleviation.",
    tags: ["Slum Development", "Social Safety Nets", "Credit Access", "Welfare Schemes"],
    iconBgColor: "bg-amber-700",
    tagBgColor: "bg-amber-900",
    tagTextColor: "text-amber-200"
  },
  {
    id: "expArea4",
    icon: "fas fa-chart-line",
    title: "Advanced Data Analysis",
    description: "Proficient in quantitative and qualitative research methodologies with expertise in statistical tools including SPSS, R, and SEM AMOS for complex socio-economic data analysis.",
    tags: ["Statistical Modeling", "Survey Design", "SPSS", "R", "SEM AMOS"],
    iconBgColor: "bg-cyan-700",
    tagBgColor: "bg-cyan-900",
    tagTextColor: "text-cyan-200"
  },
  {
    id: "expArea5",
    icon: "fas fa-lightbulb",
    title: "Entrepreneurship Development",
    description: "Research on capability-building and entrepreneurial development as sustainable pathways out of poverty, with emphasis on microenterprise promotion in urban communities.",
    tags: ["Capability Approach", "Micro-enterprises", "Sustainable Livelihoods", "Economic Empowerment"],
    iconBgColor: "bg-purple-700",
    tagBgColor: "bg-purple-900",
    tagTextColor: "text-purple-200"
  },
  {
    id: "expArea6",
    icon: "fas fa-file-signature",
    title: "Policy Development",
    description: "Expertise in translating research into actionable policy recommendations, specializing in evidence-based approaches to financial inclusion and social welfare program design.",
    tags: ["Impact Evaluation", "Program Design", "Evidence-Based Policy", "Social Welfare"],
    iconBgColor: "bg-amber-700",
    tagBgColor: "bg-amber-900",
    tagTextColor: "text-amber-200"
  },
];

// From HTML CV "Core Competencies & Skills" section
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
  { id: "nav6", name: "Contact", path: "/#contact" },
  { id: "nav7", name: "Consultancy", path: "/consultancy" },
  { id: "nav8", name: "Citations", path: "/citations" },
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

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    quote: "Dr. Singh's research insights were invaluable to our project. His dedication and analytical skills are truly commendable, leading to significant advancements in our understanding.",
    author: "Dr. Emily Carter",
    authorTitle: "Lead Researcher, Global Development Institute",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  {
    id: "t2",
    quote: "Working with Jaskirat has been a pleasure. He brings a unique perspective and rigorous approach to complex socio-economic challenges, consistently delivering high-quality work.",
    author: "Prof. Alistair Finch",
    authorTitle: "Head of Economics, University of Advanced Studies",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  {
    id: "t3",
    quote: "His pro-bono consultancy for our NGO dramatically improved our impact assessment framework. Highly recommend his expertise and commitment to social good!",
    author: "Maria Gonzalez",
    authorTitle: "Director, Community Uplift Foundation",
    // No avatar for this one, to test fallback or absence
  }
];