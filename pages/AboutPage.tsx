
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, educationData } from '../data';
import { CVLinkButton } from '../components/CVLinkButton';
import { EducationItem as EducationItemType } from '../types';

const EducationItemCard: React.FC<{ item: EducationItemType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="glass-card p-6 md:p-7 rounded-2xl mb-8 animate-fadeIn publication-card-custom hover-card"
    style={{ 
        animationDelay: `${delay}s`, 
        // @ts-ignore
        '--hover-glow-color': iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
        '--hover-glow-rgb': iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)',
        borderLeftColor: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'
    } as React.CSSProperties }
  >
    <div className="flex items-start">
      <div className={`p-4 rounded-xl mr-7 shadow-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110 border-2`}
           style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.2)`,
                   borderColor: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.45)`}}>
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-user-tie' : 'fa-graduation-cap'} text-3xl`}
           style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}></i>
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-bold mb-2 text-light">{item.degree} {item.specialization && `(${item.specialization})`}</h4>
        <p className={`text-md font-semibold`} style={{color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)'}}>{item.institution}</p>
        <p className="text-text-darker-muted text-sm mt-2.5">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-text-muted italic mt-4 text-sm md:text-base">"{item.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}"</p>}
        {item.achievement && (
          <div className="mt-5">
            <span className={`inline-flex items-center px-4 py-2.5 rounded-full text-xs font-semibold shadow-md border backdrop-blur-sm`}
                  style={{background: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'}, 0.35)`,
                          color: iconColorClass.includes('primary') ? 'var(--primary-light)' : iconColorClass.includes('secondary') ? 'var(--secondary)' : 'var(--accent)',
                          borderColor: `rgba(${iconColorClass.includes('primary') ? 'var(--primary-rgb)' : iconColorClass.includes('secondary') ? 'var(--secondary-rgb)' : 'var(--accent-rgb)'},0.55)`}}>
              <i className="fas fa-award mr-3"></i> {item.achievement}
            </span>
          </div>
        )}
         {item.verification && <p className="text-xs text-text-darker-muted/80 mt-3.5 opacity-85">{item.verification}</p>}
      </div>
    </div>
  </div>
);


export const AboutPage: React.FC = () => {
  const educationIconColors = ['primary', 'secondary', 'accent']; 

  return (
    <section id="about" className="py-20 relative animate-fadeIn">
        <div className="container mx-auto px-4">
            <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-24 text-center text-light">About Me</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
                <div className="lg:col-span-4 flex flex-col space-y-9 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl hover-card">
                       <img 
                        src={personalInfoData.profileImageUrl} 
                        alt={`Profile of ${personalInfoData.name.split(",")[0]}`} 
                        className="w-full h-auto object-cover aspect-[4/5]" 
                        style={{objectPosition: 'center 15%'}}
                        />
                    </div>
                    
                    <div className="glass-card p-7 md:p-8 rounded-2xl shadow-xl hover-card text-center">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-light">{personalInfoData.name.split(",")[0]}</h3>
                      <p className="text-primary-light mb-4 text-md font-medium">{personalInfoData.title}</p>
                      <p className="text-text-muted text-sm mb-8">{personalInfoData.subtitle}</p>
                      <CVLinkButton 
                        className="btn-base gradient-bg w-full !py-3.5 text-sm"
                        text="View HTML CV"
                        iconClass="fas fa-file-alt"
                      />
                    </div>
                </div>
                
                <div className="lg:col-span-8 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                    <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl h-full">
                      <h3 className="text-3xl md:text-4xl font-bold mb-8 text-light text-shadow-neon-blue">Professional Summary</h3>
                      <div className="space-y-6 text-text-muted leading-relaxed text-sm sm:text-base">
                        {personalInfoData.professionalSummary && personalInfoData.professionalSummary.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="pb-3">{paragraph}</p>
                        ))}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mt-14 mb-10 text-light text-shadow-neon-pink">Education</h3>
                      <div className="space-y-8">
                        {educationData.slice(0,3).map((edu, index) => (
                          <EducationItemCard 
                            key={edu.id} 
                            item={edu} 
                            iconColorClass={educationIconColors[index % educationIconColors.length]} 
                            delay={0.5 + index * 0.15}
                          />
                        ))}
                      </div>
                      <div className="text-center mt-12">
                         <Link 
                            to="/education"
                            className="btn-base btn-neon-outline !border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-dark text-sm !py-3 !px-7"
                          >
                            View All Education & Certifications
                          </Link>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
