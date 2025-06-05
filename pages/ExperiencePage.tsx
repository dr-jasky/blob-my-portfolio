
import React, {useEffect, useRef} from 'react';
import { experienceData, specializedSkillsData } from '../data'; 
import { Experience as ExperienceType, SkillValueItem as SkillItem, AcademicSkillListItem } from '../types'; 

const ExperienceItemCard: React.FC<{ item: ExperienceType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="flex relative animate-fadeIn"
    style={{ animationDelay: `${delay}s`}}
  > 
    <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-[3px] bg-slate-700/50 -z-10 timeline-line rounded-full"></div>
    
    <div className="flex-shrink-0 mr-6">
      <div className={`w-12 h-12 rounded-full ${iconColorClass} flex items-center justify-center text-white relative z-10 timeline-item shadow-md hover:brightness-125 transition-all`}> {/* iconColorClass from props: e.g., bg-primary-dark */}
        <i className={`${item.icon || 'fas fa-briefcase'} text-xl`}></i>
      </div>
    </div>
    
    <div className="pb-10 w-full"> 
      <div className={`glass-card p-5 rounded-lg shadow-md border-l-4 ${iconColorClass.replace('bg-', 'border-').replace('-dark', '-light').replace('-700', '-500').replace('-secondary', '-secondary')} hover:shadow-lg hover:border-opacity-100 transition-all duration-300`}> {/* Refined border color logic */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-light">{item.role}</h3>
          <span className={`text-xs sm:text-sm ${iconColorClass.replace('bg-', 'bg-opacity-20 text-')} px-3 py-1 rounded-full mt-1 sm:mt-0 whitespace-nowrap font-medium shadow-sm border border-current`}> {/* Badge style for period */}
            {item.period}
          </span>
        </div>
        <p className={`${iconColorClass.replace('bg-','text-').replace('-dark','-light').replace('-700','-300')} mt-0.5 text-sm font-medium`}>{item.organization}</p>
        <p className="text-xs text-text-darker-muted mb-2">{item.location}</p>
        <ul className="mt-4 space-y-3 text-text-muted text-sm list-none pl-1">
          {item.descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start">
               <i className={`fas fa-check-circle ${iconColorClass.replace('bg-','text-').replace('-dark','-light').replace('-700','-400')} mt-1 mr-2.5 flex-shrink-0`}></i>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const SkillBar: React.FC<SkillItem & {delay: number}> = ({ name, percentage, delay }) => {
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
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-text-muted font-medium">{name}</span>
        <span className="text-primary-light font-semibold">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div ref={barRef} className="skill-progress" style={{ width: '0%' }} aria-valuenow={percentage} role="progressbar"></div>
      </div>
    </div>
  );
};


export const ExperiencePage: React.FC = () => {
  const experienceIconColors = ['bg-primary-dark', 'bg-secondary', 'bg-accent']; 

  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; 
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-flask"; 
    else if (exp.role.toLowerCase().includes("professor")) icon = "fas fa-chalkboard-teacher"; 
    else if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate"; 
    return {...exp, icon };
  });


  return (
    <section id="experience" className="py-20 relative animate-fadeIn"> {/* Section is transparent */}
        <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-16 text-center text-light">Professional Journey</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="relative space-y-10">
                        <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-[3px] bg-slate-700/50 -z-10 rounded-full"></div> {/* Timeline line */}
                        {enrichedExperienceData.map((exp, index) => (
                        <ExperienceItemCard 
                            key={exp.id} 
                            item={exp} 
                            iconColorClass={experienceIconColors[index % experienceIconColors.length]}
                            delay={0.2 + index * 0.1}
                        />
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-1 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                    <div className="glass-card p-8 rounded-xl shadow-xl h-full"> {/* Skills section is a glass card */}
                        <h3 className="text-2xl font-bold mb-8 text-light">Specialized Skills</h3>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-microscope text-primary text-xl mr-3"></i>
                                <h4 className="text-lg font-semibold text-light">Research Methods</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.researchMethods.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.4 + idx * 0.05} />)}
                            </div>
                        </div>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-chart-pie text-secondary text-xl mr-3"></i>
                                <h4 className="text-lg font-semibold text-light">Statistical Tools</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.statisticalTools.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.5 + idx * 0.05}/>)}
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-4">
                                <i className="fas fa-graduation-cap text-accent text-xl mr-3"></i>
                                <h4 className="text-lg font-semibold text-light">Academic Skills</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                            {specializedSkillsData.academicSkills.map((skill, idx) => (
                                <div key={skill.name} className="flex items-center text-text-muted animate-fadeIn" style={{ animationDelay: `${0.6 + idx * 0.05}s`}}>
                                <i className={`${skill.icon || 'fas fa-check-circle text-accent/80'} mr-2.5 w-4 text-center`}></i> {/* Use accent for default check */}
                                <span>{skill.name}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
