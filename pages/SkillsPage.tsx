import React from 'react';
import { areasOfExpertiseData, skillCategoriesData } from '../data'; 
import { ExpertiseAreaItem as ExpertiseArea, SkillCategory } from '../types'; 
import { Section } from '../components/Section';


const ExpertiseCard: React.FC<{ item: ExpertiseArea, delay: number }> = ({ item, delay }) => {
    // Map existing bgcolor logic to new theme colors or use a simpler cycling logic
    const colorCycle = ['--primary-color', '--secondary-color', '--accent-color'];
    const accentColor = `var(${colorCycle[parseInt(item.id.replace('expArea','')) % colorCycle.length]})`;
    
    return (
  <div 
    className="glass-card p-6 md:p-7 rounded-xl h-full flex flex-col hover-card animate-fadeIn" // Theme cards
    style={{
        animationDelay: `${delay}s`,
        borderColor: `rgba(from ${accentColor} r g b / 0.35)`
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-5">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mr-5 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] border-2`}
            style={{background: `rgba(from ${accentColor} r g b / 0.1)`, borderColor: `rgba(from ${accentColor} r g b / 0.4)`, boxShadow: `0 0 10px rgba(from ${accentColor} r g b / 0.3)`}}>
        <i className={`${item.icon} text-xl sm:text-2xl`} style={{color: accentColor}}></i>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-theme-light">{item.title}</h3>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow"> {/* Theme text color */}
      {item.description}
    </p>
    <div className="flex flex-wrap gap-2.5 mt-auto">
      {item.tags.map(tag => (
        <span key={tag} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm hover:brightness-110 transition-all border`} // Tailwind rounded-md -> rounded-full
              style={{background: `rgba(from ${accentColor} r g b / 0.07)`, color: `color-mix(in srgb, ${accentColor} 80%, var(--light-color))`, borderColor: `rgba(from ${accentColor} r g b / 0.25)`}}> 
          {tag}
        </span>
      ))}
    </div>
  </div>
);
}

const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
  <span 
    className="inline-block border text-xs sm:text-sm font-medium mr-2.5 mb-2.5 px-3.5 py-2 rounded-full shadow-sm hover:scale-105 transition-all duration-300 cursor-default" // Tailwind rounded-lg -> rounded-full
    style={{ // Style from new theme's skill badge example or adapt
        background: `rgba(from var(--primary-color) r g b / 0.1)`,
        borderColor: `rgba(from var(--primary-color) r g b / 0.30)`,
        color: `var(--primary-color)`,
        textShadow: `0 0 4px rgba(from var(--primary-color) r g b / 0.3)`
    }}
    >
    {skill}
  </span>
);

const SkillCategoryCard: React.FC<{ category: SkillCategory, delay: number }> = ({ category, delay }) => {
    const accentColor = 'var(--secondary-color)'; // Using secondary (purple) for skill categories as an example
    return (
  <div 
    className="glass-card p-6 md:p-7 rounded-xl shadow-lg publication-card-custom hover-card animate-fadeIn" // Theme cards
    style={{ 
        animationDelay: `${delay}s`, 
        borderLeftColor: accentColor, // Theme's animated border effect will apply
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-6">
      {category.icon && 
        <div className="p-3.5 rounded-lg shadow-lg mr-5 border" style={{background: `rgba(from ${accentColor} r g b / 0.12)`, borderColor: `rgba(from ${accentColor} r g b / 0.35)`, boxShadow: `0 0 10px rgba(from ${accentColor} r g b /0.4)`}}>
            <i className={`${category.icon} text-2xl sm:text-3xl`} style={{color: accentColor}}></i>
        </div>
      }
      <div>
        <h3 className="text-xl sm:text-[1.3rem] font-semibold text-theme-light">{category.name}</h3>
        {category.description && <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{category.description}</p>}
      </div>
    </div>
    <div className="flex flex-wrap">
      {category.skills.map((skill, index) => (
        <SkillBadge 
          key={index} 
          skill={typeof skill === 'string' ? skill : skill.name} 
        />
      ))}
    </div>
  </div>
);
}
export const SkillsPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <section id="skills" className="py-20 md:py-24 relative"> {/* Theme standard padding */}
        <div className="container mx-auto px-4">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center text-theme-light accented">Areas of Expertise</h2> {/* Theme title */}
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8"> {/* Adjusted gap */}
            {areasOfExpertiseData.map((item, index) => (
              <ExpertiseCard key={item.id} item={item} delay={0.15 + index * 0.07} />
            ))}
          </div>
        </div>
      </section>

      <Section title="Core Competencies & Skills" subtitle="A diverse toolkit of analytical, technical, and domain-specific expertise." titleClassName="accented"> {/* Removed section-bg-glass */}
        <div className="space-y-10"> 
          {skillCategoriesData.map((category: SkillCategory, index) => (
            <SkillCategoryCard 
                key={category.id} 
                category={category} 
                delay={0.25 + index * 0.1}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
