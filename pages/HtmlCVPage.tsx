import React from 'react';
import { personalInfoData, experienceData, educationData, certificationsData, publicationsData, skillCategoriesData } from '../data';
import { PublicationType, Publication as PublicationItemType, SkillValueItem, AcademicSkillListItem } from '../types';

const CVSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`cv-section mb-6 ${className || ''}`}>
    <h2 className="cv-section-title text-xl font-bold border-b-2 border-gray-400 pb-1 mb-3 text-gray-800">{title}</h2>
    {children}
  </section>
);

const CVSubSection: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`cv-subsection mb-4 ${className || ''}`}>
    {title && <h3 className="cv-subsection-title text-lg font-semibold text-gray-700 mb-1">{title}</h3>}
    {children}
  </div>
);

export const HtmlCVPage: React.FC = () => {
  const handleDownloadHtml = () => {
    const cvContentElement = document.getElementById('cv-content-area');
    if (cvContentElement) {
      // Use existing CV HTML generation logic, it's about content structure
      const cvHtml = cvContentElement.innerHTML;
      
      // The styles for the downloaded HTML should remain traditional CV styles
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - ${personalInfoData.name}</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.4; margin: 0; padding: 0; color: #333; background-color: #fff; }
    .cv-container { max-width: 800px; margin: 20px auto; padding: 25px; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .cv-header { text-align: center; margin-bottom: 20px; padding-bottom:15px; border-bottom: 1px solid #eee; }
    .cv-header h1 { font-size: 26px; margin: 0 0 5px 0; color: #111; font-family: 'Times New Roman', Times, serif; } /* Ensure CV font */
    .cv-header p { font-size: 14px; margin: 2px 0; color: #555; }
    .cv-header .contact-info a { color: #0066cc; text-decoration: none; }
    .cv-header .contact-info a:hover { text-decoration: underline; }
    .cv-section-title { font-family: 'Times New Roman', Times, serif; font-size: 18px; font-weight: bold; border-bottom: 1.5px solid #ccc; padding-bottom: 4px; margin-bottom: 10px; color: #222; text-transform: uppercase; letter-spacing: 0.5px;}
    .cv-subsection-title { font-family: 'Times New Roman', Times, serif; font-size: 16px; font-weight: bold; color: #333; margin-bottom: 5px; }
    .cv-item { margin-bottom: 12px; }
    .cv-item p { margin: 2px 0; font-size: 14px; }
    .cv-item strong { font-weight: bold; color: #444; }
    .cv-item .role, .cv-item .degree { font-family: 'Times New Roman', Times, serif; font-size: 15px; font-weight: bold; color: #222; margin-bottom: 2px;}
    .cv-item .organization, .cv-item .institution { font-size: 14px; font-style: italic; color: #555; margin-bottom: 2px;}
    .cv-item .period { font-size: 13px; color: #777; }
    .cv-item ul { list-style-type: disc; margin-left: 20px; padding-left: 5px; font-size: 14px; }
    .cv-item ul li { margin-bottom: 4px; }
    .skills-list span { display: inline-block; background-color: #f0f0f0; color: #555; padding: 3px 8px; margin-right: 5px; margin-bottom: 5px; border-radius: 3px; font-size: 13px; }
    .publication-source { font-style: italic; }
    .publication-details { font-size: 0.9em; color: #666; }
  </style>
</head>
<body>
  <div class="cv-container">
    ${cvHtml}
  </div>
</body>
</html>`;
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `CV_${personalInfoData.name.replace(/[^a-z0-9]/gi, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  };

  const allPublicationTypes = Object.values(PublicationType);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Site wrapper styles - use new theme variables */
        .cv-page-container { background-color: transparent; padding: 20px 0; /* Body provides gradient */ }
        
        /* Action buttons container - use new theme's glass-card */
        .action-buttons-container { 
          text-align: center; margin: 25px auto; padding: 20px 25px; 
          position: sticky; top: calc(var(--header-height-scrolled-base-val) + 15px); z-index: 50;
          max-width: 450px; 
          /* Inherit .glass-card from global styles for background, blur, border */
        }
        .action-buttons-container p { 
            font-size: 13px; 
            color: var(--light-color); /* Use new theme's light text */
            opacity: 0.8;
            margin-top: 12px; 
            font-family: 'Inter', sans-serif; /* New theme's body font */
        }

        /* CV Content Area - Keep traditional styling, but fonts might be affected by global styles */
        .cv-print-area { 
          max-width: 920px; 
          margin: 20px auto; 
          padding: 35px 45px; 
          background-color: #ffffff; 
          color: #333; 
          font-family: 'Inter', Arial, sans-serif; /* Base font from new theme, can be overridden by more specific CV styles if needed */
          line-height: 1.6;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15); 
          border: 1px solid #ddd; 
          border-radius: 8px; 
        }
        .cv-print-area h1, .cv-print-area h2, .cv-print-area h3, .cv-print-area h4 { 
            font-family: 'Playfair Display', Georgia, serif; /* Heading font from new theme */
            color: #111; 
        }
        .cv-print-area a { color: #0056b3; text-decoration: none; } 
        .cv-print-area a:hover { text-decoration: underline; }

        .cv-header { text-align: center; margin-bottom: 30px; padding-bottom: 25px; border-bottom: 2px solid #666; }
        .cv-header h1 { font-size: 28px; margin: 0 0 8px 0; font-weight: 700; }
        .cv-header p { font-size: 15px; margin: 4px 0; color: #454545; }
        .cv-header .contact-info span { margin: 0 8px; } 

        .cv-section { margin-bottom: 25px; }
        .cv-section-title { font-size: 20px; font-weight: 700; color: #222; border-bottom: 1.5px solid #aaa; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;}
        .cv-subsection { margin-bottom: 18px; }
        .cv-subsection-title { font-size: 17px; font-weight: 700; color: #333; margin-bottom: 8px; }
        
        .cv-item { margin-bottom: 15px; page-break-inside: avoid; }
        .cv-item .role, .cv-item .degree { font-size: 16px; font-weight: 700; color: #282828; margin-bottom: 3px;}
        .cv-item .organization, .cv-item .institution { font-size: 15px; font-style: italic; color: #555; margin-bottom: 3px;}
        .cv-item .period, .cv-item .location { font-size: 14px; color: #666; margin-bottom: 4px; }
        .cv-item ul { list-style-position: outside; margin-left: 22px; padding-left: 6px; font-size: 14.5px; }
        .cv-item ul li { margin-bottom: 6px; line-height: 1.5; }
        .cv-item p { margin: 4px 0; font-size: 14.5px; }

        .skills-list { margin-top: 6px; }
        .skills-list-item { display: inline-block; background-color: #f0f0f0; color: #444; padding: 5px 12px; margin-right: 8px; margin-bottom: 8px; border-radius: 5px; font-size: 13.5px; border: 1px solid #e0e0e0; }
        
        .publication-item { margin-bottom: 12px; font-size: 14px; }
        .publication-item .authors { font-weight: normal; }
        .publication-item .title { font-weight: bold; }
        .publication-item .source { font-style: italic; }
        .publication-item .details, .publication-item .status { font-size: 0.9em; color: #555; }

        .cert-item .name { font-weight: bold; }
        .cert-item .institution-year { font-size: 0.95em; color: #555; }

        .additional-info dt { font-weight: bold; float: left; width: 160px; clear: left; }
        .additional-info dd { margin-left: 170px; margin-bottom: 6px; }

        .no-print { /* This class is added to elements not meant for printing */ }

        @media print {
          body { margin: 0; padding: 0; background-color: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-page-container { background-color: #fff !important; padding: 0 !important;}
          .cv-print-area { 
            max-width: 100% !important; 
            margin: 0 !important; 
            padding: 15mm 12mm !important; 
            box-shadow: none !important; 
            border: none !important; 
            font-size: 10pt !important;
            border-radius: 0 !important;
            font-family: 'Times New Roman', Times, serif !important; /* Force traditional font for print */
          }
           .cv-print-area h1, .cv-print-area h2, .cv-print-area h3, .cv-print-area h4,
           .cv-print-area .cv-header h1, .cv-print-area .cv-section-title, .cv-print-area .cv-subsection-title,
           .cv-print-area .cv-item .role, .cv-print-area .cv-item .degree {
             font-family: 'Times New Roman', Times, serif !important; 
             font-weight:bold !important; 
           }
          .cv-header h1 { font-size: 18pt !important; }
          .cv-header p { font-size: 9pt !important; }
          .cv-section-title { font-size: 12pt !important; }
          .cv-subsection-title { font-size: 11pt !important; }
          .cv-item .role, .cv-item .degree { font-size: 10pt !important; }
          .cv-item .organization, .cv-item .institution { font-size: 9.5pt !important; }
          .cv-item .period, .cv-item .location, .cv-item p, .cv-item ul li { font-size: 9.5pt !important; }
          .skills-list-item { font-size: 8.5pt !important; padding: 2px 6px !important; background-color: #eaeaea !important; color: #333 !important; border: 1px solid #d0d0d0 !important;}

          .no-print, .action-buttons-container { display: none !important; }
          a { color: #000 !important; text-decoration: none !important; } 
          .cv-section, .cv-item { page-break-inside: avoid !important; }
          h1, h2, h3, h4 { page-break-after: avoid !important; }
        }
      `}} />

      <div className="cv-page-container animate-fadeIn">
        <div className="action-buttons-container glass-card no-print shadow-lg"> {/* Applied glass-card to container */}
          <button onClick={handleDownloadHtml} className="btn-base btn-gradient-primary focus-visible-outline w-full"> {/* Theme button */}
            <i className="fas fa-download"></i>Download as HTML
          </button>
           <p>For PDF, use your browser's Print to PDF option (Ctrl/Cmd + P).</p>
        </div>

        <article id="cv-content-area" className="cv-print-area">
          {/* CV Content remains the same as previous version */}
          <header className="cv-header">
            <h1>{personalInfoData.name.replace(", Postdoc & Ph.D.", "").replace("Ph.D.", "Ph.D.")}</h1>
            <p>{personalInfoData.title}</p>
            {personalInfoData.subtitle && <p>{personalInfoData.subtitle}</p>}
            <p className="contact-info">
              <span><a href={`mailto:${personalInfoData.email}`}>{personalInfoData.email}</a></span> |
              <span><a href={personalInfoData.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></span> |
              <span><a href={personalInfoData.googleScholar} target="_blank" rel="noopener noreferrer">Google Scholar</a></span> |
              <span><a href={personalInfoData.orcid} target="_blank" rel="noopener noreferrer">ORCID</a></span>
              {personalInfoData.researchGate && <span> | <a href={personalInfoData.researchGate} target="_blank" rel="noopener noreferrer">ResearchGate</a></span>}
            </p>
             <p>Citizen of India | Permanent Resident of Canada</p>
          </header>

          <CVSection title="Professional Summary">
            <p className="text-justify">{personalInfoData.professionalSummary}</p>
          </CVSection>

          <CVSection title="Core Competencies & Skills">
            {skillCategoriesData.map(category => (
              <CVSubSection key={category.id} title={category.name} className="cv-item">
                <div className="skills-list">
                  {category.skills.map((skill, index) => (
                    <span key={index} className="skills-list-item">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </CVSubSection>
            ))}
          </CVSection>
          
          <CVSection title="Professional Experience">
            {experienceData.map(exp => (
              <div key={exp.id} className="cv-item">
                <h3 className="role">{exp.role}</h3>
                <p className="organization">{exp.organization}</p>
                <p className="period">{exp.location} | {exp.period}</p>
                <ul>
                  {exp.descriptionPoints.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
              </div>
            ))}
          </CVSection>

          <CVSection title="Awards & Recognition">
             <ul className="list-disc list-inside">
                <li><strong>ICSSR Postdoctoral Fellowship (2022):</strong> Among the top 100 selected from over 3,000 applicants. Only candidate in Punjab selected for this fellowship in Management (General Category) in 2022.</li>
                <li><strong>Junior Research Fellowship (JRF) in Management (2013):</strong> Granted by UGC to the top 1% of national applicants.</li>
                <li><strong>Cleared UGC-NET (Management) Thrice:</strong> Dec 2011, Dec 2012, Jun 2013.</li>
                <li><strong>Canadian Securities Course (CSC) (Completed 2023):</strong> Demonstrates proficiency in Canadian financial markets.</li>
                <li><strong>MBA Program Topper (2010-2012):</strong> Ranked #1 with merit scholarship, Punjabi University.</li>
                <li><strong>Peer Review Excellence:</strong> Contributed over 20+ peer reviews for Scopus-indexed (Q1/Q2) international journals.</li>
             </ul>
          </CVSection>

          <CVSection title="Education">
            {educationData.map(edu => (
              <div key={edu.id} className="cv-item">
                <h3 className="degree">{edu.degree} {edu.specialization && `(${edu.specialization})`}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="period">{edu.location} | {edu.period}</p>
                {edu.thesisOrDissertation && <p><strong>Thesis/Dissertation:</strong> {edu.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}</p>}
                {edu.achievement && <p><strong>Achievement:</strong> {edu.achievement}</p>}
                {edu.verification && <p className="text-xs text-gray-500">{edu.verification}</p>}
              </div>
            ))}
          </CVSection>

          <CVSection title="Certifications & Professional Development">
            {certificationsData.map(cert => (
              <p key={cert.id} className="cv-item cert-item">
                <span className="name">{cert.name}</span> | <span className="institution-year">{cert.institution} | {cert.year}</span>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm">[Verify]</a>}
              </p>
            ))}
          </CVSection>
          
          <CVSection title="Peer Review Activity">
              <ul className="list-disc list-inside">
                  <li>Active peer reviewer for <strong>6</strong> international journals (Scopus Q1-Q2 / ABDC / SSCI / Web of Science / PubMed).</li>
                  <li><strong>Total Reviews Completed:</strong> 20+</li>
                  <li><strong>Journals:</strong> <em>Quality & Quantity</em> (Springer), <em>Frontiers in Public Health</em>, <em>Global Business Review</em> (Sage), <em>International Journal of Social Economics</em> (Emerald), <em>Socio-Economic Planning Sciences</em> (Elsevier), <em>Qeios</em>.</li>
                  <li className="text-xs text-gray-500">(Activity verifiable via ORCID / Web of Science / EES)</li>
              </ul>
          </CVSection>

          <CVSection title="Thesis Evaluation & Supervision">
               <ul className="list-disc list-inside">
                  <li>Evaluated, guided, and peer-reviewed over <strong>30+ postgraduate & Ph.D. theses</strong> (Management, Finance, Economics, Org. Development).</li>
                  <li>Ensured rigorous research methodologies and high academic standards.</li>
              </ul>
          </CVSection>

          <CVSection title="Project Involvement">
              <CVSubSection title="1. Promoting Australia-India Tourism: Canberra-New Delhi Pairing">
                  <p><em>Grant Proposal Applied: Oct 2024</em> | <strong>Role:</strong> Proposed Project Manager</p>
                  <p><strong>Focus:</strong> Economic impact, cross-cultural strategies. | <strong>Applicants:</strong> Dr. Sarvjeet Kaur & Dr. Naomi Dale (Univ. of Canberra)</p>
              </CVSubSection>
              <CVSubSection title="2. ICSSR PVTG Major Project Application">
                   <p><strong>Role:</strong> Applied as Co-Director cum Research Associate | <strong>Director/PI:</strong> Dr. Gurdip Batra</p>
              </CVSubSection>
          </CVSection>
          
          <CVSection title="Additional Information">
            <dl className="additional-info">
                <dt>Languages:</dt><dd>English (Fluent), Punjabi (Native), Hindi (Fluent)</dd>
                <dt>Work Eligibility:</dt><dd>Citizen of India; Permanent Resident of Canada</dd>
                <dt>IELTS (General):</dt><dd>Overall Band 8.0 (L: 8.5, R: 9.0, W: _7.0, S: _7.0)</dd>
                <dt>Interests:</dt><dd>Gardening, Internet Research, Cricket, Badminton, Music, Cooking, Meditation, Yoga.</dd>
            </dl>
          </CVSection>

          <CVSection title="Publications">
            {allPublicationTypes.map(pubType => {
              const relevantPublications = publicationsData.filter(p => p.type === pubType);
              if (relevantPublications.length === 0) return null;
              return (
                <CVSubSection key={pubType} title={pubType} className="cv-item">
                  {relevantPublications.map((pub: PublicationItemType) => (
                    <div key={pub.id} className="publication-item mb-2">
                      <p>
                        <span className="authors">{pub.authors}</span> ({pub.year}).{' '}
                        <span className="title">{pub.title.replace(/[.?]$/, '')}.</span>{' '}
                        <span className="source">{pub.source.replace(/[.?]$/, '')}</span>
                        {pub.details && <span className="details">, {pub.details.replace(/[.?]$/, '')}</span>}.
                        {pub.status && <span className="status ml-1">[{pub.status.replace(/[\[\]]/g, '')}]</span>}
                        {pub.doiLink && <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="ml-1">[DOI]</a>}
                        {pub.link && !pub.doiLink && <a href={pub.link} target="_blank" rel="noopener noreferrer" className="ml-1">[Link]</a>}
                      </p>
                    </div>
                  ))}
                </CVSubSection>
              );
            })}
          </CVSection>
          
            <CVSection title="References">
                 <div className="cv-item">
                    <p><strong>Dr. Gurdip Singh Batra</strong>, Former Professor and Dean, School of Management Studies (SMS), Punjabi University, Patiala.</p>
                    <p>Mobile: +91 98550 28013 | Email: <a href="mailto:batra.gurdip@gmail.com">batra.gurdip@gmail.com</a></p>
                    <p className="text-xs text-gray-500">[Supervisor & HOD during JRF/SRF tenure]</p>
                 </div>
                 <div className="cv-item">
                    <p><strong>Dr. Sarvjeet Kaur Chatrath</strong>, Senior Lecturer, Canberra Business School, Faculty of BGL, University of Canberra, Australia.</p>
                    <p>Email: <a href="mailto:sarvjeetkaur.chatrath@canberra.edu.au">sarvjeetkaur.chatrath@canberra.edu.au</a></p>
                    <p className="text-xs text-gray-500">[Mentor; Co-Author; Co-applicant in Upcoming Research Projects]</p>
                 </div>
                 <div className="cv-item">
                    <p><strong>Dr. Manjit Singh</strong>, Professor, University School of Applied Management (USAM), Punjabi University, Patiala.</p>
                    <p>Mobile: +91 98558 24622 | Email: <a href="mailto:smanjitt@gmail.com">smanjitt@gmail.com</a></p>
                    <p className="text-xs text-gray-500">[Supervisor & HOD during Postdoc tenure]</p>
                 </div>
            </CVSection>

        </article>
      </div>
    </>
  );
};
