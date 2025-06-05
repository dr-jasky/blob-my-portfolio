
import React, {useEffect, useRef} from 'react';
import { experienceData, specializedSkillsData } from '../data'; 
import { Experience as ExperienceType, SkillValueItem as SkillItem, AcademicSkillListItem } from '../types'; 

const ExperienceItemCard: React.FC<{ item: ExperienceType, iconColorClass: string, delay: number }> = ({ item, iconColorClass, delay }) => (
  <div 
    className="flex relative animate-fadeIn"
    style={{ animationDelay: `${delay}s`}}
  > 
    <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-[3px] bg-dark-tertiary/70 -z-10 timeline-line rounded-full"></div> {/* bg-dark-tertiary */}
    
    <div className="flex-shrink-0 mr-6">
      <div className={`w-12 h-12 rounded-full ${iconColorClass} flex items-center justify-center text-white relative z-10 timeline-item shadow-md hover:brightness-125 transition-all`}> {/* iconColorClass like 'bg-neon-blue' */}
        <i className={`${item.icon || 'fas fa-briefcase'} text-xl`}></i>
      </div>
    </div>
    
    <div className="pb-10 w-full"> 
      <div className={`glass-card p-5 rounded-lg shadow-md border-l-4 ${iconColorClass.replace('bg-', 'border-')} hover:shadow-lg hover:border-opacity-100 transition-all duration-300`}> {/* General glass-card, border derived from iconColorClass */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-text-light-primary">{item.role}</h3>
          <span className={`text-xs sm:text-sm ${iconColorClass.replace('bg-', 'bg-').replace(/-\d+$/, '-800')} ${iconColorClass.replace('bg-', 'text-').replace(/-\d+$/, '-100')} px-3 py-1 rounded-full mt-1 sm:mt-0 whitespace-nowrap font-medium shadow-sm`}> {/* Darker bg, lighter text for tag */}
            {item.period}
          </span>
        </div>
        <p className={`${iconColorClass.replace('bg-', 'text-')} mt-0.5 text-sm font-medium`}>{item.organization}</p> {/* Text color derived from iconColorClass */}
        <p className="text-xs text-text-muted mb-2">{item.location}</p>
        <ul className="mt-4 space-y-3 text-text-muted text-sm list-none pl-1"> 
          {item.descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start">
               <i className={`fas fa-check-circle ${iconColorClass.replace('bg-','text-')} mt-1 mr-2.5 flex-shrink-0`}></i> {/* Check icon color from iconColorClass */}
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
        <span className="text-neon-blue font-semibold">{percentage}%</span> {/* text-neon-blue */}
      </div>
      <div className="skill-bar"> {/* Uses global .skill-bar with neon gradient progress */}
        <div ref={barRef} className="skill-progress" style={{ width: '0%' }} aria-valuenow={percentage} role="progressbar"></div>
      </div>
    </div>
  );
};


export const ExperiencePage: React.FC = () => {
  const experienceIconColors = ['bg-neon-blue', 'bg-neon-pink', 'bg-neon-green']; 

  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; 
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-flask"; 
    else if (exp.role.toLowerCase().includes("professor")) icon = "fas fa-chalkboard-teacher"; 
    else if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate"; 
    return {...exp, icon };
  });


  return (
    <section id="experience" className="py-20 relative animate-fadeIn">
        <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-16 text-center text-text-light-primary">Professional Journey</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12"> 
                {/* Left Column: Experience Timeline */}
                <div className="lg:col-span-2">
                    <div className="relative space-y-10">
                        <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-[3px] bg-dark-tertiary/70 -z-10 rounded-full"></div> {/* bg-dark-tertiary */}
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
                
                {/* Right Column: Specialized Skills */}
                <div className="lg:col-span-1 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                    <div className="glass-card p-8 rounded-xl shadow-xl h-full"> {/* Uses general glass-card */}
                        <h3 className="text-2xl font-bold mb-8 text-text-light-primary">Specialized Skills</h3>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-microscope text-neon-blue text-xl mr-3"></i> {/* text-neon-blue */}
                                <h4 className="text-lg font-semibold text-text-light-primary">Research Methods</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.researchMethods.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.4 + idx * 0.05} />)}
                            </div>
                        </div>
                        
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-chart-pie text-neon-pink text-xl mr-3"></i> {/* text-neon-pink */}
                                <h4 className="text-lg font-semibold text-text-light-primary">Statistical Tools</h4>
                            </div>
                            <div className="space-y-5">
                            {specializedSkillsData.statisticalTools.map((skill, idx) => <SkillBar key={skill.name} {...skill} delay={0.5 + idx * 0.05}/>)}
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center mb-4">
                                <i className="fas fa-graduation-cap text-neon-green text-xl mr-3"></i> {/* text-neon-green */}
                                <h4 className="text-lg font-semibold text-text-light-primary">Academic Skills</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                            {specializedSkillsData.academicSkills.map((skill, idx) => (
                                <div key={skill.name} className="flex items-center text-text-muted animate-fadeIn" style={{ animationDelay: `${0.6 + idx * 0.05}s`}}>
                                <i className={`${skill.icon || 'fas fa-check-circle text-neon-green'} mr-2.5 w-4 text-center`}></i> {/* Default to neon-green if icon specified */}
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
