
import React, {useEffect, useRef} from 'react';
import { experienceData, specializedSkillsData } from '../data'; 
import { Experience as ExperienceType, SkillValueItem as SkillItem, AcademicSkillListItem } from '../types'; 

const ExperienceItemCard: React.FC<{ item: ExperienceType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="flex relative animate-fadeIn"
    style={{ animationDelay: `${delay}s`}}
  > 
    {/* Timeline line moved to be drawn by the parent/container for better overall control if multiple items */}
    <div className="flex-shrink-0 mr-6 sm:mr-7"> {/* Icon container */}
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white relative z-10 timeline-item shadow-md hover:brightness-125 transition-all duration-300`}
           style={{background: `linear-gradient(135deg, var(--${iconColorClass.replace('bg-','')}-dark) 0%, var(--${iconColorClass.replace('bg-','')}) 100%)`}} >
        <i className={`${item.icon || 'fas fa-briefcase'} text-xl sm:text-2xl`}></i>
      </div>
    </div>
    
    <div className="pb-10 w-full"> {/* Card content */}
      <div className={`glass-card p-5 sm:p-6 rounded-xl shadow-lg hover-card publication-card-custom`}
            style={{ 
                // @ts-ignore
                '--hover-glow-color': `var(--${iconColorClass.replace('bg-','')})`,
                '--hover-glow-rgb': `var(--${iconColorClass.replace('bg-','').replace('-dark','')}-rgb)`,
                borderLeftColor: `var(--${iconColorClass.replace('bg-','')})`
            } as React.CSSProperties }>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-light">{item.role}</h3>
          <span className={`text-xs sm:text-[0.8rem] px-3 py-1 rounded-md mt-1 sm:mt-0 whitespace-nowrap font-semibold shadow-sm backdrop-blur-sm border border-current/30`}
            style={{background: `rgba(var(--${iconColorClass.replace('bg-','').replace('-dark','')}-rgb), 0.15)`, color: `var(--${iconColorClass.replace('bg-','')})`}}>
            {item.period}
          </span>
        </div>
        <p className={`mt-0 text-sm sm:text-md font-semibold`} style={{color: `var(--${iconColorClass.replace('bg-','').replace('-dark','')}-light)`}}>{item.organization}</p>
        <p className="text-xs text-text-darker-muted mb-3.5">{item.location}</p>
        <ul className="mt-4 space-y-3 text-text-muted text-sm list-none pl-0.5">
          {item.descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start">
               <i className={`fas fa-chevron-circle-right mt-0.5 mr-3 flex-shrink-0`} style={{color: `var(--${iconColorClass.replace('bg-','').replace('-dark','')}-light)`}}></i>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const SkillBar: React.FC<SkillItem & {delay: number, barColorVar: string}> = ({ name, percentage, delay, barColorVar }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (barRef.current) {
              barRef.current.style.width = `${percentage}%`;
            }
             observer.unobserve(entry.target.parentElement!.parentElement!); // Observe the container of the skill bar
          }
        });
      },
      { threshold: 0.3 } 
    );

    const currentSkillBarDiv = barRef.current?.parentElement?.parentElement; // The div that wraps skill name and bar
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
      <div className="flex justify-between mb-2 text-xs sm:text-sm">
        <span className="text-text-main font-medium">{name}</span>
        <span className={`font-semibold`} style={{color: `var(--${barColorVar})`}}>{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div ref={barRef} className={`skill-progress`} style={{ width: '0%', background: `var(--${barColorVar})` }} aria-valuenow={percentage} role="progressbar"></div>
      </div>
    </div>
  );
};


export const ExperiencePage: React.FC = () => {
  const experienceIconColors = ['primary', 'secondary', 'accent']; 
  const skillBarColors = {
    research: 'primary', // Will become var(--primary)
    tools: 'secondary',   // Will become var(--secondary)
  };

  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; 
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-flask-vial"; 
    else if (exp.role.toLowerCase().includes("educator") || exp.role.toLowerCase().includes("professor")) icon = "fas fa-chalkboard-user"; 
    else if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate"; 
    return {...exp, icon };
  });


  return (
    <section id="experience" className="py-20 md:py-24 relative animate-fadeIn">
        <div className="container mx-auto px-4">
            <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center text-light">Professional Journey</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14"> 
                <div className="lg:col-span-8">
                    <div className="relative space-y-0"> {/* Removed space-y-8 to let cards control their bottom margin */}
                         <div className="hidden sm:block absolute left-[29px] top-0 bottom-0 w-[3px] timeline-line rounded-full -z-10"></div>
                        {enrichedExperienceData.map((exp, index) => (
                        <ExperienceItemCard 
                            key={exp.id} 
                            item={exp} 
                            iconColorClass={experienceIconColors[index % experienceIconColors.length]}
                            delay={0.15 + index * 0.1}
                        />
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-4 animate-fadeIn" style={{animationDelay: '0.25s'}}>
                    <div className="glass-card p-6 sm:p-7 rounded-xl shadow-lg h-full sticky top-[calc(var(--header-height-scrolled)_+_1.25rem)] hover-card"> {/* Adjusted top for sticky */}
                        <h3 className="text-xl sm:text-2xl font-bold mb-8 text-light text-shadow-neon-pink">Specialized Skills</h3>
                        
                        <div className="mb-9">
                            <div className="flex items-center mb-5">
                                <div className="p-2.5 bg-primary/20 rounded-lg border border-primary-light/30 shadow-sm mr-3.5">
                                    <i className="fas fa-microscope text-lg text-primary-light"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-light">Research Methods</h4>
                            </div>
                            <div className="space-y-4">
                            {specializedSkillsData.researchMethods.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.35 + idx * 0.05} barColorVar={skillBarColors.research} />)}
                            </div>
                        </div>
                        
                        <div className="mb-9">
                            <div className="flex items-center mb-5">
                                <div className="p-2.5 bg-secondary/20 rounded-lg border border-secondary/30 shadow-sm mr-3.5">
                                    <i className="fas fa-chart-pie text-lg text-secondary"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-light">Statistical Tools</h4>
                            </div>
                            <div className="space-y-4">
                            {specializedSkillsData.statisticalTools.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.45 + idx * 0.05} barColorVar={skillBarColors.tools} />)}
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-5">
                                 <div className="p-2.5 bg-accent/20 rounded-lg border border-accent/30 shadow-sm mr-3.5">
                                    <i className="fas fa-graduation-cap text-lg text-accent"></i>
                                </div>
                                <h4 className="text-md sm:text-lg font-semibold text-light">Academic Skills</h4>
                            </div>
                            <ul className="space-y-2.5 text-sm">
                            {specializedSkillsData.academicSkills.map((skill, idx) => (
                                <li key={skill.name} className="flex items-center text-text-muted animate-fadeIn" style={{ animationDelay: `${0.55 + idx * 0.05}s`}}>
                                <i className={`${skill.icon || 'fas fa-check-circle text-green-400'} mr-3 w-4 text-center text-md`}></i>
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
