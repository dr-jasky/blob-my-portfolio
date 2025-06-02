
import React from 'react';
import { skillCategoriesData } from './data';
import { SkillCategory, SkillValueItem, AcademicSkillListItem } from './types';
import { Section } from './components/Section';

const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
  <span className="inline-block bg-dark-primary border border-neon-blue/50 text-neon-blue text-sm font-medium mr-2 mb-2 px-4 py-2 rounded-full shadow-sm hover:bg-neon-blue/20 hover:shadow-neon-glow-blue transition-all duration-300 cursor-default transform hover:scale-105">
    {skill}
  </span>
);

const SkillCategoryCard: React.FC<{ category: SkillCategory }> = ({ category }) => (
  <div className="p-6 md:p-8 bg-dark-secondary rounded-xl shadow-xl border-l-4 border-neon-pink hover:shadow-neon-glow-pink transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center mb-5">
      {category.icon && <i className={`${category.icon} text-3xl sm:text-4xl text-neon-pink mr-4 p-3 bg-dark-primary rounded-full shadow-md`}></i>}
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-light-primary">{category.name}</h3>
        {category.description && <p className="text-sm text-light-secondary mt-1">{category.description}</p>}
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

export const SkillsPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <Section title="Core Competencies & Skills" subtitle="A diverse toolkit of analytical, technical, and domain-specific expertise honed through years of research and practice.">
        <div className="space-y-10">
          {skillCategoriesData.map((category: SkillCategory) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Section>
    </div>
  );
};