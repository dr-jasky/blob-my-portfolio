import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, educationData } from '../data';
// CVLinkButton is no longer used directly on this page for the removed card.
// import { CVLinkButton } from '../components/CVLinkButton'; 
import { EducationItem as EducationItemType } from '../types';

const EducationItemCard: React.FC<{ item: EducationItemType, delay?: number }> = ({ item, delay = 0 }) => {
  const accentColor = 'var(--primary-color)'; // Using primary for education items
  
  return (
  <div 
    className="glass-card p-5 md:p-6 rounded-xl mb-6 publication-card-custom hover-card animate-fadeIn" // Theme cards
    style={{ animationDelay: `${delay}s`, borderLeftColor: accentColor } as React.CSSProperties}
  >
    <div className="flex items-start">
      <div className={`p-3.5 rounded-lg mr-4 sm:mr-5 shadow-lg flex-shrink-0 border`}
           style={{background: `rgba(from ${accentColor} r g b / 0.1)`, borderColor: `rgba(from ${accentColor} r g b / 0.3)`}}>
        <i className={`fas ${item.degree.toLowerCase().includes('postdoc') ? 'fa-user-tie' : 'fa-graduation-cap'} text-2xl`}
           style={{color: accentColor}}></i>
      </div>
      <div>
        <h4 className="text-lg md:text-xl font-bold mb-1 text-theme-light">{item.degree} {item.specialization && `(${item.specialization})`}</h4>
        <p className={`text-sm md:text-md font-medium`} style={{color: accentColor}}>{item.institution}</p>
        <p className="text-gray-500 text-xs mt-1.5">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-gray-400 italic mt-3 text-sm">"{item.thesisOrDissertation.replace(/Thesis:\s*|Dissertation:\s*/, '')}"</p>}
        {item.achievement && (
          <div className="mt-3.5">
             <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm border`}
                  style={{background: `rgba(from var(--accent-color) r g b / 0.15)`, // Using accent (green) for achievements
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
};


export const AboutPage: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 relative animate-fadeIn"> {/* Theme standard padding */}
        <div className="container mx-auto px-4">
            <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center accented no-underline">About Me</h2> {/* Theme title with no-underline */}
            
            {/* The grid now only contains the Professional Summary and Education section, making it effectively full-width */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start"> 
                <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}> {/* Adjusted animation delay */}
                    <div className="glass-card p-7 md:p-8 rounded-xl shadow-lg h-full"> {/* Theme card */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-theme-primary-light" style={{fontFamily: "'Playfair Display', serif"}}>Professional Summary</h3>
                      <div className="space-y-5 text-gray-300 leading-relaxed text-sm sm:text-base"> {/* Theme text colors */}
                        {personalInfoData.professionalSummary && personalInfoData.professionalSummary.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="pb-1.5">{paragraph}</p>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-7 text-theme-primary-light" style={{fontFamily: "'Playfair Display', serif"}}>Education</h3>
                      <div className="space-y-5">
                        {educationData.slice(0,3).map((edu, index) => ( // Show first 3, link to full page
                          <EducationItemCard 
                            key={edu.id} 
                            item={edu} 
                            delay={0.15 + index * 0.08} // Adjusted animation delay
                          />
                        ))}
                      </div>
                      <div className="text-center mt-9">
                         <Link 
                            to="/education"
                            className="btn-base btn-outline-primary !py-2.5 !px-6 text-sm" // Theme button
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
