
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, consultancyServicesData } from './data';
import { Section } from './components/Section';
import { ConsultancyService } from './types';

const ConsultancyServiceCard: React.FC<{ service: ConsultancyService, colorClass: string }> = ({ service, colorClass }) => (
  <div className={`bg-dark-secondary p-6 rounded-xl shadow-xl border-l-4 border-${colorClass} transition-all duration-300 hover:shadow-neon-glow-${colorClass === 'neon-blue' ? 'blue' : 'pink'} transform hover:-translate-y-1`}>
    <div className="flex items-start mb-4">
      <i className={`${service.iconClass} text-3xl text-${colorClass} mr-4 mt-1`}></i>
      <div>
        <h3 className={`text-2xl font-semibold text-${colorClass}`}>{service.title}</h3>
        <p className="text-sm text-light-secondary font-medium">{service.targetAudience}</p>
      </div>
    </div>
    <p className="text-light-secondary leading-relaxed mb-4">{service.description}</p>
    <Link 
        to="/contact" // Or a specific contact link: `/contact?service=${service.title}`
        state={{ interestedService: service.title }} // Pass state to contact page
        className={`inline-block bg-transparent border-2 border-${colorClass} text-${colorClass} font-semibold py-2 px-5 rounded-lg hover:bg-${colorClass} hover:text-dark-primary transition-all duration-300`}
    >
        Inquire About This Service
    </Link>
  </div>
);

export const ConsultancyPage: React.FC = () => {
  const colors = ['neon-blue', 'neon-pink', 'neon-green', 'neon-blue']; // Cycle through colors

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Consultancy & Collaboration" 
        subtitle={personalInfoData.consultancyOfferSummary || "Leveraging research expertise to drive impactful solutions and foster innovation across sectors."}
      >
        <div className="bg-dark-secondary p-6 sm:p-8 rounded-xl shadow-xl mb-12 text-center">
            <h3 className="text-2xl font-semibold text-neon-blue mb-4">My Approach</h3>
            <p className="text-light-secondary leading-relaxed max-w-3xl mx-auto">
                I believe in a collaborative, data-driven approach to consultancy. My goal is to empower organizations and individuals with actionable insights derived from rigorous research and practical experience. Whether you're an NGO seeking to measure your impact, an academic institution looking for research collaboration, or a startup navigating the fintech landscape, I'm here to help you achieve your objectives.
            </p>
        </div>

        <h3 className="text-3xl font-semibold text-light-primary text-center mb-10">Service Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {consultancyServicesData.map((service, index) => (
            <ConsultancyServiceCard key={service.id} service={service} colorClass={colors[index % colors.length]} />
          ))}
        </div>

        <div className="mt-16 text-center bg-dark-secondary p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold text-neon-pink mb-4">Ready to Collaborate?</h3>
            <p className="text-light-secondary max-w-xl mx-auto mb-6">
                If you're interested in any of these services or have a specific project in mind, I'd love to hear from you. Let's discuss how we can work together.
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-neon-pink hover:bg-opacity-80 text-dark-primary font-semibold py-3 px-8 rounded-lg shadow-neon-glow-pink transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Contact Me
            </Link>
        </div>
      </Section>
    </div>
  );
};
