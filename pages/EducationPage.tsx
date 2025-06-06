
import React from 'react';
import { educationData, certificationsData } from '../data';
import { EducationItem as EducationItemType, Certification as CertificationType } from '../types';
import { Section } from '../components/Section';

const EducationItemCard: React.FC<{ item: EducationItemType, delay:number, iconColorClass: string }> = ({ item, delay, iconColorClass }) => (
  <div 
    className="glass-card p-5 md:p-6 rounded-xl mb-6 animate-fadeIn publication-card-custom hover-card"
    style={{ 
        animationDelay: `${delay}s`, 
        // @ts-ignore
        '--hover-glow-color': iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
        '--hover-glow-rgb': iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)',
        borderLeftColor: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'
    } as React.CSSProperties }
  >
    <div className="flex items-start">
      <div className={`p-3.5 rounded-lg mr-5 shadow-md flex-shrink-0 transition-all duration-300 group-hover:scale-110 border`}
           style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.15)`,
                   borderColor: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.4)`}}>
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-user-tie' : 'fa-graduation-cap'} text-2xl`}
           style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}></i>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold mb-1 text-light">{item.degree} {item.specialization && `(${item.specialization})`}</h3>
        <p className={`text-sm md:text-md font-semibold`} style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}>{item.institution}</p>
        <p className="text-text-darker-muted text-xs mt-1.5">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-text-muted italic mt-3 text-sm">"{item.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}"</p>}
        {item.achievement && (
          <div className="mt-3.5">
             <span className={`inline-flex items-center px-3.5 py-2 rounded-full text-xs font-semibold shadow-sm border backdrop-blur-sm`}
                  style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.25)`,
                          color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
                          borderColor: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.45)`}}>
              <i className="fas fa-award mr-2"></i> {item.achievement}
            </span>
          </div>
        )}
        {item.verification && <p className="text-xs text-text-darker-muted/75 mt-3 opacity-75">{item.verification}</p>}
      </div>
    </div>
  </div>
);

const CertificationCard: React.FC<{ item: CertificationType, delay: number }> = ({ item, delay }) => (
   <div 
    className="glass-card p-5 sm:p-6 rounded-xl hover-card animate-fadeIn h-full flex flex-col text-center"
    style={{animationDelay: `${delay}s`, '--hover-glow-rgb': 'var(--neon-blue-rgb)'} as React.CSSProperties} // Standard glow for certs
    >
    <div className="mb-3.5 mt-0.5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neon-blue/15 border border-neon-blue/35 rounded-full flex items-center justify-center mx-auto shadow-md group-hover:shadow-neon-glow-blue transition-shadow duration-300">
            <i className="fas fa-certificate text-2xl sm:text-3xl text-neon-blue"></i>
        </div>
    </div>
    <h4 className="text-md sm:text-lg font-semibold text-neon-blue mb-1 flex-grow">{item.name}</h4>
    <p className="text-sm text-text-muted mb-0.5">{item.institution}</p>
    <p className="text-xs text-text-darker-muted mb-2.5">{item.year}</p>
    {item.link && (
      <a 
        href={item.link} target="_blank" rel="noopener noreferrer" 
        className="mt-auto btn-base btn-neon-outline !border-neon-blue !text-neon-blue hover:!bg-neon-blue hover:!text-dark !text-xs !py-1.5 !px-2.5 w-full"
      >
        View Certificate <i className="fas fa-external-link-alt ml-1"></i>
      </a>
    )}
  </div>
);


export const EducationPage: React.FC = () => {
  const educationIconColors = ['primary', 'secondary', 'accent', 'primary']; // Cycle through these

  return (
    <div className="animate-fadeIn">
      <Section title="Education" subtitle="Foundational learning and academic achievements that shape my expertise.">
        <div className="max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationItemCard 
                key={edu.id} 
                item={edu} 
                delay={0.15 + index * 0.08}
                iconColorClass={educationIconColors[index % educationIconColors.length]}
            />
          ))}
        </div>
      </Section>

      <Section title="Certifications & Professional Development" className="bg-dark-secondary/30 backdrop-blur-sm" subtitle="Continuous learning and skill enhancement in a dynamic world.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
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
