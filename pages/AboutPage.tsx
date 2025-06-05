
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, educationData } from '../data';
import { CVLinkButton } from '../components/CVLinkButton';
import { EducationItem as EducationItemType } from '../types';

const EducationItemCard: React.FC<{ item: EducationItemType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="publication-card-custom glass-card p-5 rounded-lg mb-6 animate-fadeIn" // Uses general glass-card
    style={{ animationDelay: `${delay}s`}}
  >
    <div className="flex items-start">
      <div className={`${iconColorClass} p-3 rounded-lg mr-4 shadow-md`}> {/* iconColorClass like 'bg-neon-blue' */}
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-graduation-cap' : 'fa-user-graduate'} text-xl text-white`}></i>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1 text-text-light-primary">{item.degree} {item.specialization && `(${item.specialization})`}</h4>
        <p className={`${iconColorClass.replace('bg-', 'text-')} text-sm`}>{item.institution}</p> {/* Text color derived from bg */}
        <p className="text-text-muted text-xs mt-1">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-text-light-secondary italic mt-3 text-sm">{item.thesisOrDissertation.replace("Thesis: ","").replace("Dissertation: ","")}</p>}
        {item.achievement && (
          <div className="mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${iconColorClass.replace('bg-', 'bg-').replace('-700', '-900')} ${iconColorClass.replace('bg-','text-').replace('-700','-200')} shadow-sm`}> {/* Darker bg, lighter text for tag */}
              <i className="fas fa-award mr-1.5"></i> {item.achievement}
            </span>
          </div>
        )}
         {item.verification && <p className="text-xs text-text-muted/80 mt-2">{item.verification}</p>}
      </div>
    </div>
  </div>
);


export const AboutPage: React.FC = () => {
  const educationIconColors = ['bg-neon-blue', 'bg-neon-pink', 'bg-neon-green']; 

  return (
    <section id="about" className="py-20 relative animate-fadeIn">
        <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-16 text-center text-text-light-primary">About Me</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start"> 
                {/* Left Column: Image and Basic Info Card */}
                <div className="lg:col-span-1 flex flex-col space-y-8 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                    <div className="glass-card rounded-xl overflow-hidden shadow-xl hover-card">
                       <img 
                        src={personalInfoData.profileImageUrl} 
                        alt={`Profile of ${personalInfoData.name.split(",")[0]}`} 
                        className="w-full h-auto object-cover border-2 border-neon-blue/50 shadow-neon-glow-blue" // Added neon border and shadow
                        />
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl shadow-xl hover-card">
                      <h3 className="text-xl font-bold mb-3 text-text-light-primary">{personalInfoData.name.split(",")[0]}</h3>
                      <p className="text-neon-blue mb-4 text-sm">{personalInfoData.title}</p> {/* Use neon color */}
                      <p className="text-text-light-secondary text-xs sm:text-sm mb-6">{personalInfoData.subtitle}</p>
                      <CVLinkButton 
                        className="gradient-bg text-dark-primary w-full py-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition text-sm focus-visible-outline"
                        text="View HTML CV"
                        iconClass="fas fa-file-alt mr-2"
                      />
                    </div>
                </div>
                
                {/* Right Column: Professional Summary and Education */}
                <div className="lg:col-span-2 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                    <div className="glass-card p-8 rounded-xl shadow-xl">
                      <h3 className="text-2xl font-bold mb-6 text-text-light-primary">Professional Summary</h3>
                      <div className="space-y-5 text-text-light-secondary leading-relaxed text-sm sm:text-base"> 
                        {personalInfoData.professionalSummary && personalInfoData.professionalSummary.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold my-8 text-text-light-primary">Education</h3>
                      <div className="space-y-6">
                        {educationData.slice(0,3).map((edu, index) => ( 
                          <EducationItemCard 
                            key={edu.id} 
                            item={edu} 
                            iconColorClass={educationIconColors[index % educationIconColors.length]} 
                            delay={0.5 + index * 0.1}
                          />
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
