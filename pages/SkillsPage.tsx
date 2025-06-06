
import React from 'react';
import { areasOfExpertiseData, skillCategoriesData } from '../data'; 
import { ExpertiseAreaItem as ExpertiseArea, SkillCategory } from '../types'; 
import { Section } from '../components/Section';


const ExpertiseCard: React.FC<{ item: ExpertiseArea, delay: number }> = ({ item, delay }) => (
  <div 
    className="glass-card p-6 md:p-7 rounded-xl hover-card animate-fadeIn h-full flex flex-col" 
    style={{
        animationDelay: `${delay}s`,
        // @ts-ignore
        '--hover-glow-rgb': item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)',
        borderColor: `rgba(${item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)'}, 0.25)`
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-5">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mr-5 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] border-2`}
            style={{background: item.iconBgColor, borderColor: `rgba(${item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)'}, 0.4)`}}>
        <i className={`${item.icon} text-white text-xl sm:text-2xl`}></i>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-light">{item.title}</h3>
    </div>
    <p className="text-text-muted text-sm leading-relaxed mb-5 flex-grow">
      {item.description}
    </p>
    <div className="flex flex-wrap gap-2.5 mt-auto">
      {item.tags.map(tag => (
        <span key={tag} className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm hover:brightness-110 transition-all backdrop-blur-sm border`}
              style={{background: `${item.tagBgColor}A6`, color: item.tagTextColor, borderColor: `${item.tagTextColor}40`}}> 
          {tag}
        </span>
      ))}
    </div>
  </div>
);


const SkillBadge: React.FC<{ skill: string, colorVar: string }> = ({ skill, colorVar }) => (
  <span 
    className="inline-block border text-xs sm:text-sm font-medium mr-2.5 mb-2.5 px-3.5 py-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
    style={{
        background: `rgba(var(--${colorVar}-rgb), 0.12)`,
        borderColor: `rgba(var(--${colorVar}-rgb), 0.35)`,
        color: `var(--${colorVar})`,
        // @ts-ignore
        '--tw-shadow-color': `var(--${colorVar})`,
        textShadow: `0 0 4px rgba(var(--${colorVar}-rgb), 0.4)`
    }}
    onMouseEnter={(e) => e.currentTarget.classList.add('animate-pulseGlow')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('animate-pulseGlow')}
    >
    {skill}
  </span>
);

const SkillCategoryCard: React.FC<{ category: SkillCategory, delay: number, accentColor: string }> = ({ category, delay, accentColor }) => (
  <div 
    className="glass-card p-6 md:p-7 rounded-xl shadow-lg hover-card animate-fadeIn publication-card-custom"
    style={{ 
        animationDelay: `${delay}s`, 
        borderLeftColor: `var(--${accentColor})`,
        // @ts-ignore
        '--hover-glow-color': `var(--${accentColor})`,
        '--hover-glow-rgb': `var(--${accentColor}-rgb)`
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-6">
      {category.icon && 
        <div className="p-3.5 rounded-lg shadow-md mr-5 border" style={{background: `rgba(var(--${accentColor}-rgb),0.12)`, borderColor: `rgba(var(--${accentColor}-rgb),0.35)`}}>
            <i className={`${category.icon} text-2xl sm:text-3xl`} style={{color: `var(--${accentColor})`}}></i>
        </div>
      }
      <div>
        <h3 className="text-xl sm:text-[1.3rem] font-semibold text-light">{category.name}</h3>
        {category.description && <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{category.description}</p>}
      </div>
    </div>
    <div className="flex flex-wrap">
      {category.skills.map((skill, index) => (
        <SkillBadge 
          key={index} 
          skill={typeof skill === 'string' ? skill : skill.name} // Assuming SkillValueItem and AcademicSkillListItem have 'name'
          colorVar={accentColor}
        />
      ))}
    </div>
  </div>
);

export const SkillsPage: React.FC = () => {
  const categoryColors = ['neon-blue', 'neon-pink', 'neon-green', 'primary', 'secondary', 'accent']; // Added more variety
  return (
    <div className="animate-fadeIn">
      <section id="skills" className="py-20 md:py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center text-light">Areas of Expertise</h2>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
            {areasOfExpertiseData.map((item, index) => (
              <ExpertiseCard key={item.id} item={item} delay={0.15 + index * 0.07} />
            ))}
          </div>
        </div>
      </section>

      <Section title="Core Competencies & Skills" subtitle="A diverse toolkit of analytical, technical, and domain-specific expertise." className="bg-dark-secondary/30 backdrop-blur-sm">
        <div className="space-y-10"> {/* Increased space between category cards */}
          {skillCategoriesData.map((category: SkillCategory, index) => (
            <SkillCategoryCard 
                key={category.id} 
                category={category} 
                delay={0.25 + index * 0.1}
                accentColor={categoryColors[index % categoryColors.length]}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
