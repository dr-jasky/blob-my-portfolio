import React, { useState } from 'react';
import { personalInfoData, experienceData, educationData, publicationsData, skillCategoriesData, certificationsData } from '../data';
import { Section } from '../components/Section';
import { Publication, PublicationType, Experience, EducationItem, SkillCategory, Certification } from '../types';

// Example: A more interactive card for experience or education
const InteractiveCard: React.FC<{item: Experience | EducationItem, type: 'experience' | 'education', delay: number}> = ({ item, type, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let title, subtitle1, subtitle2, detailsArray;

  if (type === 'experience') {
    const exp = item as Experience;
    title = exp.role;
    subtitle1 = exp.organization;
    subtitle2 = `${exp.location} | ${exp.period}`;
    detailsArray = exp.descriptionPoints;
  } else {
    const edu = item as EducationItem;
    title = edu.degree;
    subtitle1 = edu.institution;
    subtitle2 = `${edu.location} | ${edu.period}`;
    detailsArray = [];
    if(edu.thesisOrDissertation) detailsArray.push(`Thesis/Dissertation: ${edu.thesisOrDissertation}`);
    if(edu.achievement) detailsArray.push(`Achievement: ${edu.achievement}`);
    if(edu.verification) detailsArray.push(edu.verification);
  }

  return (
    <div 
        className="glass-card p-5 md:p-6 rounded-xl shadow-lg mb-6 transition-all duration-300 hover:shadow-neon-glow-blue border-2 border-transparent hover:border-neon-blue animate-fadeIn"
        style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-neon-blue">{title}</h3>
          <p className="text-md text-light-primary font-medium">{subtitle1}</p>
          <p className="text-sm text-light-secondary mb-2">{subtitle2}</p>
        </div>
        {detailsArray && detailsArray.length > 0 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-neon-blue hover:text-neon-pink transition-colors p-2 focus-visible-outline rounded-md"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `Collapse details for ${title}` : `Expand details for ${title}`}
          >
            <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} transition-transform duration-300`}></i>
          </button>
        )}
      </div>
      {isExpanded && detailsArray && detailsArray.length > 0 && (
        <div className="mt-4 pl-2 border-l-2 border-neon-blue/30 animate-fadeIn">
          <ul className="list-none space-y-2 text-light-secondary text-sm">
            {detailsArray.map((detail, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-angle-right text-neon-blue mt-1 mr-2 flex-shrink-0"></i>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PublicationTeaserCard: React.FC<{pub: Publication, delay:number}> = ({pub, delay}) => {
    // Simplified version for an interactive CV, focusing on key info and link
    return (
        <div 
            className="glass-card p-4 rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-neon-glow-pink border-2 border-transparent hover:border-neon-pink animate-fadeIn"
            style={{ animationDelay: `${delay}s` }}
        >
            <h4 className="text-lg font-semibold text-neon-pink mb-1 line-clamp-2" title={pub.title}>{pub.title}</h4>
            <p className="text-xs text-light-secondary mb-1 italic">{pub.authors} ({pub.year})</p>
            <p className="text-xs text-light-secondary truncate"><span className="font-medium">In:</span> {pub.source}</p>
            {pub.doiLink ? (
                 <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-blue hover:underline mt-2 inline-block">
                    View Publication (DOI) <i className="fas fa-external-link-alt ml-0.5"></i>
                </a>
            ) : pub.link ? (
                 <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-blue hover:underline mt-2 inline-block">
                    View Publication <i className="fas fa-external-link-alt ml-0.5"></i>
                </a>
            ) : null}
        </div>
    );
}


export const InteractiveCVPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills' | 'publications' | 'certifications'>('experience');
  
  const tabButtonStyle = (isActive: boolean) => 
    `px-4 py-2.5 rounded-lg font-medium transition-all duration-300 focus-visible-outline text-sm sm:text-base
     ${isActive 
        ? 'gradient-bg text-white shadow-lg scale-105' 
        : 'bg-dark-secondary text-text-muted hover:bg-slate-700 hover:text-light'
     }`;

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Interactive Curriculum Vitae"
        subtitle={`Dr. Jaskirat Singh - ${personalInfoData.title}`}
      >
        <div className="glass-card p-4 sm:p-6 rounded-xl shadow-xl mb-8">
            <div className="flex justify-center items-center mb-4">
                 <img 
                    src={personalInfoData.profileImageUrl} 
                    alt={personalInfoData.name} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-neon-blue shadow-neon-glow-blue object-cover mr-4"
                />
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-light">{personalInfoData.name}</h2>
                    <p className="text-neon-blue sm:text-lg">{personalInfoData.title}</p>
                    <p className="text-xs text-text-muted">{personalInfoData.subtitle}</p>
                </div>
            </div>
            <p className="text-text-muted text-sm sm:text-base text-center leading-relaxed">
                {personalInfoData.professionalSummary?.split('\n\n')[0]}
            </p>
        </div>

        <div className="sticky top-[70px] md:top-[80px] z-40 py-3 bg-dark/80 backdrop-blur-md rounded-lg shadow-lg mb-8 flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            <button onClick={() => setActiveTab('experience')} className={tabButtonStyle(activeTab === 'experience')}><i className="fas fa-briefcase sm:mr-2"></i><span className="hidden sm:inline">Experience</span></button>
            <button onClick={() => setActiveTab('education')} className={tabButtonStyle(activeTab === 'education')}><i className="fas fa-graduation-cap sm:mr-2"></i><span className="hidden sm:inline">Education</span></button>
            <button onClick={() => setActiveTab('skills')} className={tabButtonStyle(activeTab === 'skills')}><i className="fas fa-cogs sm:mr-2"></i><span className="hidden sm:inline">Skills</span></button>
            <button onClick={() => setActiveTab('publications')} className={tabButtonStyle(activeTab === 'publications')}><i className="fas fa-book-open sm:mr-2"></i><span className="hidden sm:inline">Publications</span></button>
            <button onClick={() => setActiveTab('certifications')} className={tabButtonStyle(activeTab === 'certifications')}><i className="fas fa-certificate sm:mr-2"></i><span className="hidden sm:inline">Certs</span></button>
        </div>

        <div className="min-h-[400px]"> {/* Ensure content area has min height */}
          {activeTab === 'experience' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-semibold text-light mb-6">Professional Experience</h3>
              {experienceData.map((exp, idx) => <InteractiveCard key={exp.id} item={exp} type="experience" delay={idx * 0.05}/>)}
            </div>
          )}
          {activeTab === 'education' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-semibold text-light mb-6">Education & Qualifications</h3>
              {educationData.map((edu, idx) => <InteractiveCard key={edu.id} item={edu} type="education" delay={idx * 0.05}/>)}
            </div>
          )}
          {activeTab === 'skills' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-semibold text-light mb-6">Core Competencies & Skills</h3>
              {skillCategoriesData.map((category, catIdx) => (
                <div key={category.id} className="glass-card p-4 md:p-6 rounded-xl shadow-lg mb-6 animate-fadeIn" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                  <div className="flex items-center mb-3">
                    {category.icon && <i className={`${category.icon} text-2xl text-neon-pink mr-3`}></i>}
                    <h4 className="text-xl font-semibold text-neon-pink">{category.name}</h4>
                  </div>
                  {category.description && <p className="text-sm text-light-secondary mb-3">{category.description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span 
                        key={skillIdx} 
                        className="bg-dark-tertiary text-neon-blue text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-neon-blue/40 shadow-sm hover:bg-neon-blue/20 transition-all cursor-default"
                      >
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'publications' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-semibold text-light mb-6">Selected Publications</h3>
              <p className="text-text-muted mb-4 text-sm">A brief overview. For full details and citations, please visit the <a href="/#/citations" className="text-neon-blue hover:underline">Citations Page</a> or <a href="/#/research" className="text-neon-blue hover:underline">Research Page</a>.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicationsData
                    .sort((a, b) => (typeof b.year === 'string' ? parseInt(b.year.match(/\d{4}/)?.[0] || '0') : b.year as number) - (typeof a.year === 'string' ? parseInt(a.year.match(/\d{4}/)?.[0] || '0') : a.year as number)) // Sort newest first
                    .slice(0, 10) // Show top 10 for brevity here
                    .map((pub, idx) => <PublicationTeaserCard key={pub.id} pub={pub} delay={idx * 0.05} />)
                }
              </div>
            </div>
          )}
           {activeTab === 'certifications' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-semibold text-light mb-6">Certifications & Professional Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificationsData.map((cert, idx) => (
                  <div 
                    key={cert.id} 
                    className="glass-card p-5 rounded-xl shadow-md hover:shadow-neon-glow-green border-2 border-transparent hover:border-neon-green animate-fadeIn flex flex-col items-center text-center"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <i className="fas fa-certificate text-4xl text-neon-green mb-3"></i>
                    <h4 className="text-md font-semibold text-light-primary flex-grow">{cert.name}</h4>
                    <p className="text-sm text-neon-green/80">{cert.institution}</p>
                    <p className="text-xs text-light-secondary mb-2">{cert.year}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-blue hover:underline mt-auto pt-1">
                        Verify <i className="fas fa-external-link-alt ml-0.5"></i>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
