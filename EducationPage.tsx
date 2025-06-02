
import React from 'react';
import { educationData, certificationsData } from './data';
import { EducationItem as EducationItemType, Certification as CertificationType } from './types';
import { Section } from './components/Section';

const EducationItemCard: React.FC<{ item: EducationItemType }> = ({ item }) => (
  <div className="mb-6 p-6 bg-dark-secondary rounded-lg shadow-xl border-l-4 border-neon-pink transition-all duration-300 hover:shadow-neon-glow-pink transform hover:-translate-y-1">
    <div className="flex items-start">
      {/* Placeholder for institution logo - User can replace this div with an <img> tag */}
      <div className="w-16 h-16 bg-dark-primary rounded-md flex items-center justify-center mr-4 flex-shrink-0 border border-neon-pink/30">
        <i className="fas fa-university text-3xl text-neon-pink opacity-50"></i> 
        {/* <img src="/path-to-logo.png" alt={`${item.institution} logo`} className="w-full h-full object-contain rounded-md"/> */}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-neon-blue">{item.degree} {item.specialization && `(${item.specialization})`}</h3>
        <p className="text-md font-medium text-light-primary">{item.institution}</p>
        <p className="text-sm text-light-secondary mb-1">{item.location} | {item.period}</p>
        {item.thesisOrDissertation && <p className="text-sm text-light-secondary italic my-2">Thesis/Dissertation: {item.thesisOrDissertation}</p>}
        {item.achievement && <p className="text-sm text-neon-pink font-medium my-2"><i className="fas fa-award mr-2"></i>{item.achievement}</p>}
        {item.verification && <p className="text-xs text-light-secondary/70 mt-1">{item.verification}</p>}
      </div>
    </div>
  </div>
);

const CertificationCard: React.FC<{ item: CertificationType }> = ({ item }) => (
   <div className="p-6 bg-dark-secondary rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-neon-blue/30 hover:border-neon-blue transform hover:-translate-y-1">
    {/* Placeholder for certification logo/icon */}
    <div className="text-center mb-3">
        <i className="fas fa-certificate text-4xl text-neon-blue"></i>
        {/* <img src="/path-to-cert-logo.png" alt={`${item.name} logo`} className="w-12 h-12 mx-auto mb-2 object-contain"/> */}
    </div>
    <h4 className="text-lg font-semibold text-neon-blue text-center">{item.name}</h4>
    <p className="text-sm text-light-primary text-center">{item.institution}</p>
    <p className="text-xs text-light-secondary mb-2 text-center">{item.year}</p>
    {item.link && (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-pink hover:underline mt-1 inline-block font-medium w-full text-center">
        View Certificate <i className="fas fa-external-link-alt ml-1"></i>
      </a>
    )}
  </div>
);


export const EducationPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <Section title="Education" subtitle="Foundational learning and academic achievements that shape my expertise.">
        <div className="max-w-3xl mx-auto">
          {educationData.map(edu => (
            <EducationItemCard key={edu.id} item={edu} />
          ))}
        </div>
      </Section>

      <Section title="Certifications & Professional Development" className="mt-0 pt-0 md:pt-0" subtitle="Continuous learning and skill enhancement in a dynamic world.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map(cert => (
            <CertificationCard key={cert.id} item={cert} />
          ))}
        </div>
      </Section>
    </div>
  );
};
