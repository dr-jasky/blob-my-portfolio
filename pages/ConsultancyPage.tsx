
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, consultancyServicesData } from '../data';
import { Section } from '../components/Section';
import { ConsultancyService } from '../types';

const ConsultancyServiceCard: React.FC<{ service: ConsultancyService, colorClass: string, delay: number }> = ({ service, colorClass, delay }) => {
  // colorClass will be 'primary', 'secondary', or 'accent'
  const iconTextColor = `text-${colorClass}`;
  const borderColorClass = `border-${colorClass}`;
  const hoverBgColor = `hover:bg-${colorClass}`;
  
  return (
    <div 
        className={`glass-card p-6 rounded-xl shadow-xl border-l-4 ${borderColorClass} transition-all duration-300 hover:shadow-lg hover:shadow-${colorClass}/20 hover:-translate-y-1.5 animate-fadeIn h-full flex flex-col`}
        style={{animationDelay: `${delay}s`}}
    >
      <div className="flex items-start mb-4">
        <i className={`${service.iconClass} text-3xl ${iconTextColor} mr-4 mt-1 p-2 bg-dark-tertiary/50 rounded-md shadow-sm`}></i>
        <div>
          <h3 className={`text-2xl font-bold ${iconTextColor}`}>{service.title}</h3>
          <p className="text-sm text-text-muted font-medium">{service.targetAudience}</p>
        </div>
      </div>
      <p className="text-text-muted leading-relaxed mb-5 text-sm flex-grow">{service.description}</p>
      <Link 
          to="/contact" 
          state={{ interestedService: service.title, subject: `Inquiry: ${service.title}` }}
          className={`mt-auto inline-block bg-transparent border-2 ${borderColorClass} ${iconTextColor} font-medium py-2.5 px-5 rounded-lg ${hoverBgColor} hover:text-white transition-all duration-300 text-sm focus-visible-outline w-full text-center sm:w-auto hover:scale-105 shadow-md hover:shadow-lg`}
      >
          Inquire About This Service
      </Link>
    </div>
  );
};

export const ConsultancyPage: React.FC = () => {
  const colors = ['primary', 'secondary', 'accent', 'primary']; 
  const location = useLocation();

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Consultancy & Collaboration" 
        id="consultancy"
        subtitle={personalInfoData.consultancyOfferSummary || "Leveraging research expertise to drive impactful solutions and foster innovation across sectors."}
      > {/* Section is transparent */}
        <div className="glass-card p-6 sm:p-8 rounded-xl shadow-xl mb-12 text-center animate-fadeIn" style={{animationDelay: '0.2s'}}> {/* Approach block is a glass-card */}
            <h3 className="text-2xl font-bold text-primary-light mb-4">My Approach</h3>
            <p className="text-text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base">
                I believe in a collaborative, data-driven approach to consultancy. My goal is to empower organizations and individuals with actionable insights derived from rigorous research and practical experience. Whether you're an NGO seeking to measure your impact, an academic institution looking for research collaboration, or a startup navigating the fintech landscape, I'm here to help you achieve your objectives.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-light text-center mb-10 animate-fadeIn" style={{animationDelay: '0.3s'}}>Service Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {consultancyServicesData.map((service, index) => (
            <ConsultancyServiceCard 
                key={service.id} 
                service={service} 
                colorClass={colors[index % colors.length]} 
                delay={0.4 + index * 0.1}
            />
          ))}
        </div>

        <div className="mt-16 text-center glass-card p-8 rounded-xl shadow-xl animate-fadeIn" style={{animationDelay: '0.5s'}}> {/* Collaboration block is a glass-card */}
            <h3 className="text-2xl font-bold text-secondary mb-4">Ready to Collaborate?</h3>
            <p className="text-text-muted max-w-xl mx-auto mb-6 text-sm sm:text-base">
                If you're interested in any of these services or have a specific project in mind, I'd love to hear from you. Let's discuss how we can work together.
            </p>
            <Link 
              to="/contact"
              className="gradient-bg text-white font-semibold py-3.5 px-10 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 text-lg transform hover:scale-105 focus-visible-outline"
            >
              Contact Me
            </Link>
        </div>
      </Section>
    </div>
  );
};
