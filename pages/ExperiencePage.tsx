import React, {useEffect, useRef} from 'react';
import { experienceData, specializedSkillsData } from '../data'; 
import { Experience as ExperienceType, SkillValueItem as SkillItem, AcademicSkillListItem } from '../types'; 

const ExperienceItemCard: React.FC<{ item: ExperienceType, delay: number }> = ({ item, delay }) => {
  const accentColor = 'var(--primary-color)'; // Using primary color for experience timeline
  const accentRgb = 'var(--primary-rgb)'; // Assuming this is defined

  return (
  <div 
    className="flex relative animate-fadeIn" // Keep existing animation
    style={{ animationDelay: `${delay}s`}}
  > 
    <div className="flex-shrink-0 mr-5 sm:mr-6 relative"> {/* Added relative for z-index on timeline-item */}
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-theme-dark relative z-10 timeline-item shadow-md hover:brightness-125 transition-all duration-300`}
           style={{background: accentColor, boxShadow: `0 0 15px rgba(from ${accentColor} r g b / 0.6)`}} > {/* Use theme's timeline-item style */}
        <i className={`${item.icon || 'fas fa-briefcase'} text-xl sm:text-2xl`}></i>
      </div>
    </div>
    
    <div className="pb-8 sm:pb-10 w-full"> 
      <div className={`glass-card p-5 sm:p-6 rounded-xl shadow-lg publication-card-custom hover-card`} // Theme's cards
            style={{ 
                borderLeftColor: accentColor 
            } as React.CSSProperties }>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-theme-light">{item.role}</h3>
          <span className={`text-xs sm:text-[0.8rem] px-3 py-1 rounded-full mt-1 sm:mt-0 whitespace-nowrap font-semibold shadow-sm border`}
            style={{background: `rgba(from ${accentColor} r g b / 0.15)`, color: accentColor, borderColor: `rgba(from ${accentColor} r g b / 0.3)`}}>
            {item.period}
          </span>
        </div>
        <p className={`mt-0 text-sm sm:text-md font-semibold`} style={{color: accentColor}}>{item.organization}</p>
        <p className="text-xs text-gray-500 mb-3.5">{item.location}</p>
        <ul className="mt-4 space-y-2.5 text-gray-300 text-sm list-none pl-0">
          {item.descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start">
               <i className={`fas fa-check-circle mt-1 mr-2.5 flex-shrink-0`} style={{color: 'var(--accent-color)'}}></i> {/* Use theme's accent color (green) */}
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}
const SkillBar: React.FC<SkillItem & {delay: number}> = ({ name, percentage, delay }) => {
  const barRef = useRef<HTMLDivElement>(null);
  // Skill bars use primary to primary-light gradient from new theme's CSS
  // The JS animation logic remains the same.

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (barRef.current) {
              // Set data-width for the CSS animation to pick up if that's how it's designed in new theme
              // Or directly set style if new theme JS for skill bars is removed/flawed
              barRef.current.style.width = `${percentage}%`; 
            }
             observer.unobserve(entry.target.parentElement!.parentElement!); 
          }
        });
      },
      { threshold: 0.3 } 
    );

    const currentSkillBarDiv = barRef.current?.parentElement?.parentElement; 
    if (currentSkillBarDiv) {
      observer.observe(currentSkillBarDiv);
    }
    
    return () => {
      if (currentSkillBarDiv) {
        observer.unobserve(currentSkillBarDiv);
      }
    };
  }, [percentage]);

  return (
    <div className="animate-fadeIn" style={{ animationDelay: `${delay}s`}}>
      <div className="flex justify-between mb-1.5 text-xs sm:text-sm">
        <span className="text-theme-light font-medium">{name}</span>
        <span className={`font-semibold text-theme-primary-light`}>{percentage}%</span>
      </div>
      <div className="skill-bar"> {/* New theme's class */}
        <div ref={barRef} className={`skill-progress`} style={{ width: '0%' }} data-width={`${percentage}%`} aria-valuenow={percentage} role="progressbar"></div> {/* New theme's class, data-width for potential CSS animation */}
      </div>
    </div>
  );
};


export const ExperiencePage: React.FC = () => {
  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; 
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-flask"; // Keep specific icons if they make sense
    else if (exp.role.toLowerCase().includes("educator") || exp.role.toLowerCase().includes("professor")) icon = "fas fa-chalkboard-teacher"; 
    else if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate"; 
    return {...exp, icon };
  });


  return (
    <section id="experience" className="py-20 md:py-24 relative animate-fadeIn"> {/* Theme standard padding */}
        <div className="container mx-auto px-4">
            <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center text-theme-light accented">Professional Journey</h2> {/* Theme title */}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-12"> 
                <div className="lg:col-span-2">
                    <div className="relative space-y-0"> 
                         <div className="hidden sm:block absolute left-[8px] top-0 bottom-0 w-[3px] timeline-line rounded-full -z-10" style={{backgroundColor: 'rgba(var(--primary-rgb, 8, 145, 178), 0.3)'}}></div> {/* Theme timeline line */}
                        {enrichedExperienceData.map((exp, index) => (
                        <ExperienceItemCard 
                            key={exp.id} 
                            item={exp} 
                            delay={0.15 + index * 0.1}
                        />
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-1 animate-fadeIn" style={{animationDelay: '0.25s'}}>
                    <div className="glass-card p-6 sm:p-7 rounded-xl shadow-lg h-full sticky top-[calc(var(--header-height-scrolled-base-val)_+_1.25rem)] border-[var(--primary-color)]/30"> {/* Theme card and border */}
                        <h3 className="text-xl sm:text-2xl font-bold mb-8 text-theme-primary-light">Specialized Skills</h3>
                        
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="p-2.5 bg-theme-primary/10 rounded-lg border border-theme-primary/30 shadow-lg mr-3.5">
                                    <i className="fas fa-microscope text-lg text-theme-primary-light"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-theme-light">Research Methods</h4>
                            </div>
                            <div className="space-y-4">
                            {specializedSkillsData.researchMethods.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.35 + idx * 0.05} />)}
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="p-2.5 bg-theme-primary/10 rounded-lg border border-theme-primary/30 shadow-lg mr-3.5">
                                    <i className="fas fa-chart-pie text-lg text-theme-primary-light"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-theme-light">Statistical Tools</h4>
                            </div>
                            <div className="space-y-4">
                            {specializedSkillsData.statisticalTools.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.45 + idx * 0.05} />)}
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-4">
                                 <div className="p-2.5 bg-theme-primary/10 rounded-lg border border-theme-primary/30 shadow-lg mr-3.5">
                                    <i className="fas fa-graduation-cap text-lg text-theme-primary-light"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-theme-light">Academic Skills</h4>
                            </div>
                            <ul className="space-y-2 text-sm">
                            {specializedSkillsData.academicSkills.map((skill, idx) => (
                                <li key={skill.name} className="flex items-center text-gray-300 animate-fadeIn" style={{ animationDelay: `${0.55 + idx * 0.05}s`}}>
                                <i className={`${skill.icon || 'fas fa-check-circle text-theme-accent'} mr-2.5 w-4 text-center text-md`}></i> {/* Theme accent color */}
                                <span>{skill.name}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
