
import React from 'react';
import { areasOfExpertiseData, skillCategoriesData } from '../data'; 
import { ExpertiseAreaItem as ExpertiseArea, SkillCategory } from '../types'; 
import { Section } from '../components/Section';


const ExpertiseCard: React.FC<{ item: ExpertiseArea, delay: number }> = ({ item, delay }) => (
  <div 
    className="glass-card p-6 rounded-xl hover-card animate-fadeIn h-full flex flex-col" // Applied glass-card and hover-card
    style={{animationDelay: `${delay}s`}}
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-full ${item.iconBgColor} flex items-center justify-center mr-4 shadow-md transition-transform duration-300 group-hover:scale-110`}> {/* iconBgColor from data, e.g. bg-cyan-700 */}
        <i className={`${item.icon} text-white text-xl`}></i>
      </div>
      <h3 className="text-xl font-bold text-light">{item.title}</h3>
    </div>
    <p className="text-text-muted text-sm mb-4 leading-relaxed flex-grow">
      {item.description}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {item.tags.map(tag => (
        <span key={tag} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.tagBgColor} ${item.tagTextColor} shadow-sm hover:brightness-125 transition-all`}> {/* tagBgColor, tagTextColor from data */}
          {tag}
        </span>
      ))}
    </div>
  </div>
);


const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
  <span className="inline-block bg-dark-primary border border-primary/60 text-primary-light text-sm font-medium mr-2 mb-2 px-4 py-2 rounded-full shadow-sm hover:bg-primary/20 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default"> {/* Updated style */}
    {skill}
  </span>
);

const SkillCategoryCard: React.FC<{ category: SkillCategory, delay: number }> = ({ category, delay }) => (
  <div 
    className="p-6 md:p-8 bg-dark-secondary/70 rounded-xl shadow-xl border-l-4 border-secondary hover:shadow-xl hover:shadow-secondary/20 hover:border-secondary/70 transition-all duration-300 transform hover:-translate-y-1.5 animate-fadeIn" /* Updated style */
    style={{ animationDelay: `${delay}s`}}
  >
    <div className="flex items-center mb-5">
      {category.icon && <i className={`${category.icon} text-3xl sm:text-4xl text-secondary mr-4 p-3 bg-dark-primary rounded-full shadow-md`}></i>} {/* Changed icon color to secondary */}
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-light-primary">{category.name}</h3>
        {category.description && <p className="text-sm text-text-muted mt-1">{category.description}</p>}
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
      <section id="skills" className="py-20 relative"> {/* Section is transparent */}
        <div className="container mx-auto px-4">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-16 text-center text-light">Areas of Expertise</h2>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areasOfExpertiseData.map((item, index) => (
              <ExpertiseCard key={item.id} item={item} delay={0.2 + index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <Section title="Core Competencies & Skills" subtitle="A diverse toolkit of analytical, technical, and domain-specific expertise honed through years of research and practice."> {/* Section is transparent */}
        <div className="space-y-10"> {/* Content wrapper, not a glass card unless specifically needed */}
          {skillCategoriesData.map((category: SkillCategory, index) => (
            <SkillCategoryCard key={category.id} category={category} delay={0.3 + index * 0.15} />
          ))}
        </div>
      </Section>
    </div>
  );
};
