
import React from 'react';
import { experienceData } from './data';
import { Experience } from './types';
import { Section } from './components/Section';

const ExperienceItem: React.FC<{ item: Experience }> = ({ item }) => (
  <div className="mb-8 p-6 bg-dark-secondary rounded-lg shadow-xl border-l-4 border-neon-green transition-all duration-300 hover:shadow-neon-glow-blue hover:border-neon-blue transform hover:-translate-y-1">
    <div className="flex items-start mb-3">
      {item.icon && <i className={`${item.icon} text-3xl text-neon-blue mr-4 mt-1`}></i>}
      <div>
        <h3 className="text-2xl font-semibold text-neon-blue">{item.role}</h3>
        <p className="text-lg font-medium text-light-primary">{item.organization}</p>
        <p className="text-sm text-light-secondary">{item.location} | {item.period}</p>
      </div>
    </div>
    <ul className="list-disc list-inside text-light-secondary space-y-2 pl-4">
      {item.descriptionPoints.map((point, index) => (
        <li key={index} className="leading-relaxed">{point}</li>
      ))}
    </ul>
  </div>
);

export const ExperiencePage: React.FC = () => {
  // Assign icons to specific roles or a default one
  const enrichedExperienceData = experienceData.map(exp => {
    let icon = "fas fa-briefcase"; // Default icon
    if (exp.role.toLowerCase().includes("postdoctoral")) icon = "fas fa-microscope";
    if (exp.role.toLowerCase().includes("fellow")) icon = "fas fa-user-graduate";
    if (exp.role.toLowerCase().includes("consultant") || exp.role.toLowerCase().includes("mentor")) icon = "fas fa-hands-helping";
    return {...exp, icon };
  });

  return (
    <div className="animate-fadeIn">
      <Section title="Professional Journey" subtitle="A timeline of growth, leadership, and impactful contributions across academia, research, and consultancy.">
        <div className="max-w-3xl mx-auto">
          {enrichedExperienceData.map(exp => (
            <ExperienceItem key={exp.id} item={exp} />
          ))}
        </div>
      </Section>
    </div>
  );
};
