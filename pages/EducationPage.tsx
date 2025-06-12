import React from 'react';
import { educationData, certificationsData } from '../data';
import { EducationItem as EducationItemType, Certification as CertificationType } from '../types';
import { Section } from '../components/Section';

const EducationItemCard: React.FC<{ item: EducationItemType, delay:number }> = ({ item, delay }) => {
  const accentColor = 'var(--primary-color)'; // Theme's primary color
  
  return (
  <div 
    className="glass-card p-5 md:p-6 rounded-xl mb-6 publication-card-custom hover-card animate-fadeIn" // Theme cards
    style={{ 
        animationDelay: `${delay}s`, 
        borderLeftColor: accentColor // Use theme's border highlight
    } as React.CSSProperties }
  >
    <div className="flex items-start">
      <div className={`p-3.5 rounded-lg mr-5 shadow-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110 border`}
           style={{background: `rgba(from ${accentColor} r g b / 0.1)`, borderColor: `rgba(from ${accentColor} r g b / 0.3)`}}>
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-user-tie' : 'fa-graduation-cap'} text-2xl`}
           style={{color: accentColor}}></i>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold mb-1 text-theme-light">{item.degree} {item.specialization && `(${item.specialization})`}</h3>
        <p className={`text-sm md:text-md font-medium`} style={{color: accentColor}}>{item.institution}</p>
        <p className="text-gray-500 text-xs mt-1.5">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-gray-400 italic mt-3 text-sm">"{item.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}"</p>}
        {item.achievement && (
          <div className="mt-3.5">
             <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm border`}
                  style={{background: `rgba(from var(--accent-color) r g b / 0.15)`, // Using theme's accent (green) for achievements
                          color: 'var(--accent-color)',
                          borderColor: `rgba(from var(--accent-color) r g b / 0.3)`}}>
              <i className="fas fa-award mr-2"></i> {item.achievement}
            </span>
          </div>
        )}
        {item.verification && <p className="text-xs text-gray-500/75 mt-3 opacity-75">{item.verification}</p>}
      </div>
    </div>
  </div>
);
}
const CertificationCard: React.FC<{ item: CertificationType, delay: number }> = ({ item, delay }) => {
  const accentColor = 'var(--secondary-color)'; // Theme's secondary color (purple) for certifications

  return (
   <div 
    className="glass-card p-5 sm:p-6 rounded-xl h-full flex flex-col text-center hover-card animate-fadeIn" // Theme cards
    style={{animationDelay: `${delay}s`, borderColor: `rgba(from ${accentColor} r g b / 0.3)`}}
    >
    <div className="mb-3.5 mt-0.5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-[0_0_15px_var(--secondary-color)] transition-shadow duration-300 border"
             style={{background: `rgba(from ${accentColor} r g b / 0.15)`, borderColor: `rgba(from ${accentColor} r g b / 0.35)`}} >
            <i className="fas fa-certificate text-2xl sm:text-3xl" style={{color: accentColor}}></i>
        </div>
    </div>
    <h4 className="text-md sm:text-lg font-semibold mb-1 flex-grow" style={{color: accentColor}}>{item.name}</h4>
    <p className="text-sm text-gray-300 mb-0.5">{item.institution}</p>
    <p className="text-xs text-gray-500 mb-2.5">{item.year}</p>
    {item.link && (
      <a 
        href={item.link} target="_blank" rel="noopener noreferrer" 
        className={`mt-auto btn-base !border-[var(--secondary-color)] !text-[var(--secondary-color)] hover:!bg-[rgba(from_var(--secondary-color)_r_g_b_/_0.15)] !text-xs !py-1.5 !px-2.5 w-full`} // Theme button style
      >
        View Certificate <i className="fas fa-external-link-alt ml-1"></i>
      </a>
    )}
  </div>
);
}

export const EducationPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <Section title="Education" subtitle="Foundational learning and academic achievements that shape my expertise." titleClassName="accented">
        <div className="max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationItemCard 
                key={edu.id} 
                item={edu} 
                delay={0.15 + index * 0.08}
            />
          ))}
        </div>
      </Section>

      <Section title="Certifications & Professional Development" subtitle="Continuous learning and skill enhancement in a dynamic world." titleClassName="accented"> {/* Removed section-bg-glass, relies on body bg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8"> {/* Adjusted gap */}
          {certificationsData.map((cert, index) => (
            <CertificationCard 
                key={cert.id} 
                item={cert}
                delay={0.2 + index * 0.06}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
