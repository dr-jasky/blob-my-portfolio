
import React, {useEffect, useRef} from 'react';
import { experienceData, specializedSkillsData } from '../data'; 
import { Experience as ExperienceType, SkillValueItem as SkillItem, AcademicSkillListItem } from '../types'; 

const ExperienceItemCard: React.FC<{ item: ExperienceType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="flex relative animate-fadeIn"
    style={{ animationDelay: `${delay}s`}}
  > 
    <div className="hidden sm:block absolute left-[29px] top-0 bottom-0 w-[4px] timeline-line rounded-full -z-10"></div> {/* Adjusted left for larger icon box */}
    
    <div className="flex-shrink-0 mr-8"> {/* Increased margin for icon box */}
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white relative z-10 timeline-item shadow-lg hover:brightness-130 transition-all duration-300`}
           style={{background: `linear-gradient(135deg, ${iconColorClass.replace('bg-','var(--').replace('-dark','-dark)')} 0%, ${iconColorClass.replace('bg-','var(--').replace('-dark',')')} 100%)`}} >
        <i className={`${item.icon || 'fas fa-briefcase'} text-2xl`}></i>
      </div>
    </div>
    
    <div className="pb-12 w-full"> 
      <div className={`glass-card p-6 md:p-7 rounded-xl shadow-xl hover-card publication-card-custom`}
            style={{ 
                // @ts-ignore
                '--card-border-color': iconColorClass.replace('bg-','var(--').replace('-dark','-light)') + ')',
                borderLeftColor: iconColorClass.replace('bg-','var(--').replace('-dark','-light)') + ')'
            } as React.CSSProperties }>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-light">{item.role}</h3>
          <span className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full mt-1 sm:mt-0 whitespace-nowrap font-semibold shadow-md backdrop-blur-sm border border-current/40`}
            style={{background: `rgba(${iconColorClass.replace('bg-','var(--').replace('-dark','-rgb)')}, 0.2)`, color: iconColorClass.replace('bg-','var(--').replace('-dark','-light)') + ')'}}>
            {item.period}
          </span>
        </div>
        <p className={`mt-0.5 text-sm font-semibold`} style={{color: iconColorClass.replace('bg-','var(--').replace('-dark','-300)') + ')'}}>{item.organization}</p>
        <p className="text-xs text-text-darker-muted mb-4">{item.location}</p>
        <ul className="mt-5 space-y-3.5 text-text-muted text-sm list-none pl-1">
          {item.descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start">
               <i className={`fas fa-chevron-circle-right mt-1 mr-3.5 flex-shrink-0`} style={{color: iconColorClass.replace('bg-','var(--').replace('-dark','-400)') + ')'}}></i>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const SkillBar: React.FC<SkillItem & {delay: number, barColorClass: string}> = ({ name, percentage, delay, barColorClass }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (barRef.current) {
              barRef.current.style.width = `${percentage}%`;
            }
             observer.unobserve(entry.target.parentElement!.parentElement!);
          }
        });
      },
      { threshold: 0.5 } 
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
      <div className="flex justify-between mb-2.5 text-sm">
        <span className="text-text-main font-medium">{name}</span>
        <span className={`font-semibold`} style={{color: `var(--${barColorClass.replace('bg-','')})`}}>{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div ref={barRef} className={`skill-progress ${barColorClass}`} style={{ width: '0%', background: `var(--${barColorClass.replace('bg-','')})` }} aria-valuenow={percentage} role="progressbar"></div>
      </div>
    </div>
  );
};


export const ExperiencePage: React.FC = () => {
  const experienceIconColors = ['bg-primary-dark', 'bg-secondary', 'bg-accent']; 
  const skillBarColors = {
    research: 'bg-primary',
    tools: 'bg-secondary',
  };


  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; 
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-flask-vial"; 
    else if (exp.role.toLowerCase().includes("educator") || exp.role.toLowerCase().includes("professor")) icon = "fas fa-chalkboard-user"; 
    else if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate"; 
    return {...exp, icon };
  });


  return (
    <section id="experience" className="py-20 relative animate-fadeIn">
        <div className="container mx-auto px-4">
            <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-20 text-center text-light">Professional Journey</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16"> 
                <div className="lg:col-span-8">
                    <div className="relative space-y-8">
                         <div className="hidden sm:block absolute left-[29px] top-0 bottom-0 w-[4px] timeline-line rounded-full -z-10"></div>
                        {enrichedExperienceData.map((exp, index) => (
                        <ExperienceItemCard 
                            key={exp.id} 
                            item={exp} 
                            iconColorClass={experienceIconColors[index % experienceIconColors.length]}
                            delay={0.2 + index * 0.12}
                        />
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                    <div className="glass-card p-8 rounded-2xl shadow-xl h-full sticky top-28 hover-card">
                        <h3 className="text-2xl font-bold mb-9 text-light text-shadow-neon-pink">Specialized Skills</h3>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-primary-dark/40 rounded-lg border border-primary-light/40 shadow-md mr-4">
                                    <i className="fas fa-microscope text-xl text-primary-light"></i>
                                </div>
                                <h4 className="text-lg font-semibold text-light">Research Methods</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.researchMethods.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.4 + idx * 0.06} barColorClass={skillBarColors.research} />)}
                            </div>
                        </div>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-secondary/40 rounded-lg border border-secondary/40 shadow-md mr-4">
                                    <i className="fas fa-chart-pie text-xl text-secondary"></i>
                                </div>
                                <h4 className="text-lg font-semibold text-light">Statistical Tools</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.statisticalTools.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.5 + idx * 0.06} barColorClass={skillBarColors.tools} />)}
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-6">
                                 <div className="p-3 bg-accent/40 rounded-lg border border-accent/40 shadow-md mr-4">
                                    <i className="fas fa-graduation-cap text-xl text-accent"></i>
                                </div>
                                <h4 className="text-lg font-semibold text-light">Academic Skills</h4>
                            </div>
                            <ul className="space-y-3 text-sm">
                            {specializedSkillsData.academicSkills.map((skill, idx) => (
                                <li key={skill.name} className="flex items-center text-text-muted animate-fadeIn" style={{ animationDelay: `${0.6 + idx * 0.06}s`}}>
                                <i className={`${skill.icon || 'fas fa-check-circle text-green-400'} mr-3.5 w-5 text-center text-lg`}></i>
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
