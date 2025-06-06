
import React from 'react';
import { areasOfExpertiseData, skillCategoriesData } from '../data'; 
import { ExpertiseAreaItem as ExpertiseArea, SkillCategory } from '../types'; 
import { Section } from '../components/Section';


const ExpertiseCard: React.FC<{ item: ExpertiseArea, delay: number }> = ({ item, delay }) => (
  <div 
    className="glass-card p-7 rounded-2xl hover-card animate-fadeIn h-full flex flex-col" 
    style={{
        animationDelay: `${delay}s`,
        // @ts-ignore
        '--hover-glow-rgb': item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)',
        borderColor: `rgba(${item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)'}, 0.3)`
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-6">
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-6 shadow-lg transition-transform duration-300 group-hover:scale-115 group-hover:rotate-[-6deg] border-2`}
            style={{background: item.iconBgColor, borderColor: `rgba(${item.iconBgColor.includes('cyan') ? 'var(--neon-blue-rgb)' : item.iconBgColor.includes('purple') ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)'}, 0.5)`}}>
        <i className={`${item.icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold text-light">{item.title}</h3>
    </div>
    <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">
      {item.description}
    </p>
    <div className="flex flex-wrap gap-3 mt-auto">
      {item.tags.map(tag => (
        <span key={tag} className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold shadow-md hover:brightness-130 transition-all backdrop-blur-sm border`}
              style={{background: `${item.tagBgColor}B3`, color: item.tagTextColor, borderColor: `${item.tagTextColor}50`}}> {/* Added opacity to bg */}
          {tag}
        </span>
      ))}
    </div>
  </div>
);


const SkillBadge: React.FC<{ skill: string, colorVar: string }> = ({ skill, colorVar }) => (
  <span 
    className="inline-block border text-sm font-medium mr-3 mb-3 px-4 py-2.5 rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
    style={{
        background: `rgba(var(--${colorVar}-rgb), 0.15)`,
        borderColor: `rgba(var(--${colorVar}-rgb), 0.4)`,
        color: `var(--${colorVar})`,
        // @ts-ignore
        '--tw-shadow-color': `var(--${colorVar})`,
        textShadow: `0 0 5px rgba(var(--${colorVar}-rgb), 0.5)`
    }}
    onMouseEnter={(e) => e.currentTarget.classList.add('animate-pulseGlow')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('animate-pulseGlow')}
    >
    {skill}
  </span>
);

const SkillCategoryCard: React.FC<{ category: SkillCategory, delay: number, accentColor: string }> = ({ category, delay, accentColor }) => (
  <div 
    className="glass-card p-7 md:p-8 rounded-2xl shadow-xl hover-card animate-fadeIn publication-card-custom"
    style={{ 
        animationDelay: `${delay}s`, 
        borderLeftColor: `var(--${accentColor})`,
        // @ts-ignore
        '--hover-glow-rgb': accentColor === 'neon-blue' ? 'var(--neon-blue-rgb)' : accentColor === 'neon-pink' ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)'
    } as React.CSSProperties}
  >
    <div className="flex items-center mb-7">
      {category.icon && 
        <div className="p-4 rounded-xl shadow-lg mr-6 border" style={{background: `rgba(var(--${accentColor}-rgb),0.15)`, borderColor: `rgba(var(--${accentColor}-rgb),0.4)`}}>
            <i className={`${category.icon} text-3xl sm:text-4xl`} style={{color: `var(--${accentColor})`}}></i>
        </div>
      }
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-light">{category.name}</h3>
        {category.description && <p className="text-sm text-text-muted mt-2">{category.description}</p>}
      </div>
    </div>
    <div className="flex flex-wrap">
      {category.skills.map((skill, index) => (
        <SkillBadge 
          key={index} 
          skill={typeof skill === 'string' ? skill : skill.name}
          colorVar={accentColor}
        />
      ))}
    </div>
  </div>
);

export const SkillsPage: React.FC = () => {
  const categoryColors = ['neon-blue', 'neon-pink', 'neon-green', 'neon-blue', 'neon-pink', 'neon-green'];
  return (
    <div className="animate-fadeIn">
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold mb-20 text-center text-light">Areas of Expertise</h2>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {areasOfExpertiseData.map((item, index) => (
              <ExpertiseCard key={item.id} item={item} delay={0.2 + index * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <Section title="Core Competencies & Skills" subtitle="A diverse toolkit of analytical, technical, and domain-specific expertise." className="bg-dark-secondary/40 backdrop-blur-sm">
        <div className="space-y-12">
          {skillCategoriesData.map((category: SkillCategory, index) => (
            <SkillCategoryCard 
                key={category.id} 
                category={category} 
                delay={0.3 + index * 0.12}
                accentColor={categoryColors[index % categoryColors.length]}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
