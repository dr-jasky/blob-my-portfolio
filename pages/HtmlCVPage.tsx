
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
      const cvClone = cvContentElement.cloneNode(true) as HTMLElement;
      // Remove the action buttons container from the clone if it's part of cv-content-area (it's not in this setup)
      // const buttonInClone = cvClone.querySelector('.no-print-in-download'); // This class is on the button container itself
      // if (buttonInClone) {
      //   buttonInClone.remove(); // This would remove the button if it was inside cv-content-area
      // }
      const cvHtml = cvContentElement.innerHTML;
      
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
    .cv-header h1 { font-size: 26px; margin: 0 0 5px 0; color: #111; }
    .cv-header p { font-size: 14px; margin: 2px 0; color: #555; }
    .cv-header .contact-info a { color: #0066cc; text-decoration: none; }
    .cv-header .contact-info a:hover { text-decoration: underline; }
    .cv-section-title { font-size: 18px; font-weight: bold; border-bottom: 1.5px solid #ccc; padding-bottom: 4px; margin-bottom: 10px; color: #222; text-transform: uppercase; letter-spacing: 0.5px;}
    .cv-subsection-title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 5px; }
    .cv-item { margin-bottom: 12px; }
    .cv-item p { margin: 2px 0; font-size: 14px; }
    .cv-item strong { font-weight: bold; color: #444; }
    .cv-item .role, .cv-item .degree { font-size: 15px; font-weight: bold; color: #222; margin-bottom: 2px;}
    .cv-item .organization, .cv-item .institution { font-size: 14px; font-style: italic; color: #555; margin-bottom: 2px;}
    .cv-item .period { font-size: 13px; color: #777; }
    .cv-item ul { list-style-type: disc; margin-left: 20px; padding-left: 5px; font-size: 14px; }
    .cv-item ul li { margin-bottom: 4px; }
    .skills-list span { display: inline-block; background-color: #f0f0f0; color: #555; padding: 3px 8px; margin-right: 5px; margin-bottom: 5px; border-radius: 3px; font-size: 13px; }
    .publication-source { font-style: italic; }
    .publication-details { font-size: 0.9em; color: #666; }
    /* .no-print-in-download { display: none !important; } */ /* This class is on the container, not needed for inner HTML */
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
        @import url('https://fonts.googleapis.com/css2?family=Georgia&family=Helvetica+Neue&family=Arial&display=swap');
        
        .cv-page-container { background-color: var(--dark); padding: 20px 0; }
        .cv-print-area { 
          max-width: 920px; 
          margin: 20px auto; 
          padding: 35px 45px; 
          background-color: #ffffff; 
          color: #2d2d2d;
          font-family: 'Georgia', 'Times New Roman', Times, serif; 
          line-height: 1.55;
          box-shadow: 0 8px 30px rgba(var(--dark-rgb),0.25); 
          border: 1px solid #ccc;
          border-radius: 12px; 
        }
        .cv-print-area h1, .cv-print-area h2, .cv-print-area h3, .cv-print-area h4 { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; }
        .cv-print-area a { color: #0055aa; text-decoration: none; } /* Slightly darker blue for better contrast */
        .cv-print-area a:hover { text-decoration: underline; }

        .cv-header { text-align: center; margin-bottom: 30px; padding-bottom: 25px; border-bottom: 2px solid #555; }
        .cv-header h1 { font-size: 30px; margin: 0 0 8px 0; font-weight: bold; }
        .cv-header p { font-size: 15px; margin: 4px 0; color: #4a4a4a; }
        .cv-header .contact-info span { margin: 0 8px; } 

        .cv-section { margin-bottom: 25px; }
        .cv-section-title { font-size: 22px; font-weight: bold; color: #2c2c2c; border-bottom: 1.5px solid #999; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1.2px;}
        .cv-subsection { margin-bottom: 18px; }
        .cv-subsection-title { font-size: 18px; font-weight: bold; color: #3a3a3a; margin-bottom: 8px; }
        
        .cv-item { margin-bottom: 15px; page-break-inside: avoid; }
        .cv-item .role, .cv-item .degree { font-size: 17px; font-weight: bold; color: #2a2a2a; margin-bottom: 3px;}
        .cv-item .organization, .cv-item .institution { font-size: 16px; font-style: italic; color: #505050; margin-bottom: 3px;}
        .cv-item .period, .cv-item .location { font-size: 14px; color: #6a6a6a; margin-bottom: 4px; }
        .cv-item ul { list-style-position: outside; margin-left: 22px; padding-left: 6px; font-size: 15px; }
        .cv-item ul li { margin-bottom: 6px; line-height: 1.45; }
        .cv-item p { margin: 4px 0; font-size: 15px; }

        .skills-list { margin-top: 6px; }
        .skills-list-item { display: inline-block; background-color: #e8e8e8; color: #383838; padding: 5px 12px; margin-right: 8px; margin-bottom: 8px; border-radius: 5px; font-size: 14px; border: 1px solid #dcdcdc; }
        
        .publication-item { margin-bottom: 12px; font-size: 14.5px; }
        .publication-item .authors { font-weight: normal; }
        .publication-item .title { font-weight: bold; }
        .publication-item .source { font-style: italic; }
        .publication-item .details, .publication-item .status { font-size: 0.92em; color: #5a5a5a; }

        .cert-item .name { font-weight: bold; }
        .cert-item .institution-year { font-size: 0.95em; color: #505050; }

        .additional-info dt { font-weight: bold; float: left; width: 160px; clear: left; }
        .additional-info dd { margin-left: 170px; margin-bottom: 6px; }

        .action-buttons-container { 
          text-align: center; margin: 25px auto; padding: 20px 25px; 
          position: sticky; top: calc(var(--header-height, 90px) + 15px); z-index: 50;
          max-width: 450px; /* Limit width of this container */
        }
        .action-buttons-container.glass-card { /* Applied dynamically via className */
            /* Styles from global .glass-card will apply */
        }
        .action-buttons-container button { /* Styles for button inside the container */
          /* Using .btn-base and .gradient-bg or .btn-neon-outline applied via className */
        }
        .action-buttons-container p { font-size: 13px; color: var(--text-muted); margin-top: 12px; font-family: 'Inter', sans-serif; }


        @media print {
          body { margin: 0; padding: 0; background-color: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-page-container { background-color: #fff; padding: 0;}
          .cv-print-area { 
            max-width: 100%; 
            margin: 0; 
            padding: 15mm 12mm; 
            box-shadow: none; 
            border: none; 
            font-size: 10.5pt; 
            border-radius: 0;
          }
          .cv-header h1 { font-size: 20pt; }
          .cv-header p { font-size: 9.5pt; }
          .cv-section-title { font-size: 13pt; }
          .cv-subsection-title { font-size: 11.5pt; }
          .cv-item .role, .cv-item .degree { font-size: 10.5pt; }
          .cv-item .organization, .cv-item .institution { font-size: 10pt; }
          .cv-item .period, .cv-item .location, .cv-item p, .cv-item ul li { font-size: 10pt; }
          .skills-list-item { font-size: 9pt; padding: 3px 7px; background-color: #eaeaea !important; color: #333 !important; border: 1px solid #d0d0d0;}

          .no-print, .action-buttons-container { display: none !important; }
          a { color: #000 !important; text-decoration: none !important; } 
          .cv-section, .cv-item { page-break-inside: avoid; }
          h1, h2, h3, h4 { page-break-after: avoid; }
        }
      `}} />

      <div className="cv-page-container">
        <div className="action-buttons-container glass-card no-print"> {/* Added glass-card for on-screen premium look */}
          <button onClick={handleDownloadHtml} className="btn-base gradient-bg focus-visible-outline w-full">
            <i className="fas fa-download"></i>Download as HTML
          </button>
           <p>For PDF, use your browser's Print to PDF option (Ctrl/Cmd + P).</p>
        </div>

        <article id="cv-content-area" className="cv-print-area">
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
                <dt>IELTS (General):</dt><dd>Overall Band 8.0 (L: 8.5, R: 9.0, W: 7.0, S: 7.0)</dd>
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
