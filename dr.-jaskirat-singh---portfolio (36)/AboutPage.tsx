
import React from 'react';
import { personalInfoData, educationData } from './data'; // Assuming education is part of about
import { Section } from './components/Section';
import { EducationItem as EducationItemType } from './types';

const EducationItemCard: React.FC<{ item: EducationItemType }> = ({ item }) => (
  <div className="mb-6 p-5 bg-dark-secondary rounded-lg shadow-lg border-l-4 border-neon-pink transition-all duration-300 hover:shadow-neon-glow-pink">
    <h3 className="text-xl font-semibold text-neon-blue">{item.degree} {item.specialization && `(${item.specialization})`}</h3>
    <p className="text-md font-medium text-light-primary">{item.institution}</p>
    <p className="text-sm text-light-secondary mb-1">{item.location} | {item.period}</p>
    {item.thesisOrDissertation && <p className="text-sm text-light-secondary italic my-1">Thesis/Dissertation: {item.thesisOrDissertation}</p>}
    {item.achievement && <p className="text-sm text-neon-pink font-medium my-1"><i className="fas fa-award mr-2"></i>{item.achievement}</p>}
    {item.verification && <p className="text-xs text-light-secondary/70 mt-1">{item.verification}</p>}
  </div>
);


export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <Section title="About Me" subtitle={personalInfoData.tagline}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12 bg-dark-secondary p-6 sm:p-10 rounded-xl shadow-xl">
          <div className="md:w-1/3 text-center flex-shrink-0">
            <img 
              src={personalInfoData.profileImageUrl} 
              alt={personalInfoData.name} 
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-full mx-auto mb-6 border-4 border-neon-blue shadow-neon-blue object-cover"
            />
            <h3 className="text-3xl font-semibold text-light-primary">{personalInfoData.name}</h3>
            <p className="text-neon-blue text-lg">{personalInfoData.title}</p>
            <p className="text-sm text-light-secondary">{personalInfoData.subtitle}</p>
            {personalInfoData.cvUrl && (
                 <div className="mt-8">
                    <a 
                        href={personalInfoData.cvUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-neon-blue hover:bg-opacity-80 text-dark-primary font-semibold py-3 px-6 rounded-lg shadow-neon-glow-blue transition-all duration-300 transform hover:scale-105"
                    >
                        <i className="fas fa-download mr-2"></i>
                        Download CV
                    </a>
                </div>
            )}
          </div>
          <div className="md:w-2/3">
            <h4 className="text-2xl font-semibold text-neon-pink mb-4">Professional Summary</h4>
            <p className="text-lg text-light-secondary leading-relaxed whitespace-pre-line">
              {personalInfoData.professionalSummary}
            </p>
          </div>
        </div>
      </Section>

      <Section title="Education" id="education-about" className="mt-0 pt-0 md:pt-0">
         <div className="max-w-3xl mx-auto">
          {educationData.map(edu => (
            <EducationItemCard key={edu.id} item={edu} />
          ))}
        </div>
      </Section>

      {/* Placeholder for an Infographic Section - Uncomment and customize if you have an infographic image */}
      {/*
      <Section title="Visualizing My Journey" id="infographic-journey" className="bg-dark-primary">
        <div className="text-center">
          <p className="text-light-secondary mb-6">An overview of my key milestones and impact areas.</p>
          <div className="bg-dark-secondary p-4 rounded-lg shadow-xl inline-block">
            <img 
              src="/path-to-your-infographic.png" // Replace with the actual path to your infographic image
              alt="Infographic summarizing Dr. Jaskirat Singh's journey and impact" 
              className="max-w-full h-auto rounded" 
            />
          </div>
          <p className="text-xs text-light-secondary mt-4">
            Infographic created using [Your Tool, e.g., Canva, Piktochart].
          </p>
        </div>
      </Section>
      */}

    </div>
  );
};