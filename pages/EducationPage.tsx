
import React from 'react';
import { educationData, certificationsData } from '../data';
import { EducationItem as EducationItemType, Certification as CertificationType } from '../types';
import { Section } from '../components/Section';

const EducationItemCard: React.FC<{ item: EducationItemType, delay:number, iconColorClass: string }> = ({ item, delay, iconColorClass }) => (
  <div 
    className="glass-card p-6 md:p-7 rounded-xl mb-7 animate-fadeIn publication-card-custom hover-card"
    style={{ 
        animationDelay: `${delay}s`, 
        // @ts-ignore
        '--card-border-color': iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
        borderLeftColor: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'
    } as React.CSSProperties }
  >
    <div className="flex items-start">
      <div className={`p-4 rounded-lg mr-6 shadow-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
           style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.2)`,
                   border: `1px solid rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.4)`}}>
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-user-tie' : 'fa-graduation-cap'} text-3xl`}
           style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}></i>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1.5 text-light">{item.degree} {item.specialization && `(${item.specialization})`}</h3>
        <p className={`text-md font-semibold`} style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}>{item.institution}</p>
        <p className="text-text-darker-muted text-xs mt-2">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-text-muted italic mt-4 text-sm">"{item.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}"</p>}
        {item.achievement && (
          <div className="mt-4">
             <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold shadow-md border backdrop-blur-sm`}
                  style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.3)`,
                          color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
                          borderColor: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.5)`}}>
              <i className="fas fa-award mr-2.5"></i> {item.achievement}
            </span>
          </div>
        )}
        {item.verification && <p className="text-xs text-text-darker-muted/80 mt-3 opacity-80">{item.verification}</p>}
      </div>
    </div>
  </div>
);

const CertificationCard: React.FC<{ item: CertificationType, delay: number }> = ({ item, delay }) => (
   <div 
    className="glass-card p-6 rounded-xl hover-card animate-fadeIn h-full flex flex-col text-center"
    style={{animationDelay: `${delay}s`}}
    >
    <div className="mb-4 mt-1">
        <div className="w-16 h-16 bg-neon-blue/10 border border-neon-blue/30 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-neon-glow-blue transition-shadow duration-300">
            <i className="fas fa-certificate text-3xl text-neon-blue"></i>
        </div>
    </div>
    <h4 className="text-lg font-semibold text-neon-blue mb-1.5 flex-grow">{item.name}</h4>
    <p className="text-sm text-text-muted mb-1">{item.institution}</p>
    <p className="text-xs text-text-darker-muted mb-3">{item.year}</p>
    {item.link && (
      <a 
        href={item.link} target="_blank" rel="noopener noreferrer" 
        className="mt-auto btn-base btn-neon-outline !border-neon-blue !text-neon-blue hover:!bg-neon-blue hover:!text-dark !text-xs !py-2 !px-3 w-full"
      >
        View Certificate <i className="fas fa-external-link-alt ml-1.5"></i>
      </a>
    )}
  </div>
);


export const EducationPage: React.FC = () => {
  const educationIconColors = ['primary', 'secondary', 'accent', 'primary']; 

  return (
    <div className="animate-fadeIn">
      <Section title="Education" subtitle="Foundational learning and academic achievements that shape my expertise.">
        <div className="max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationItemCard 
                key={edu.id} 
                item={edu} 
                delay={0.2 + index * 0.1}
                iconColorClass={educationIconColors[index % educationIconColors.length]}
            />
          ))}
        </div>
      </Section>

      <Section title="Certifications & Professional Development" className="bg-dark-secondary/40 backdrop-blur-sm" subtitle="Continuous learning and skill enhancement in a dynamic world.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {certificationsData.map((cert, index) => (
            <CertificationCard 
                key={cert.id} 
                item={cert}
                delay={0.2 + index * 0.08}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
