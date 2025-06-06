
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, consultancyServicesData } from '../data';
import { Section } from '../components/Section';
import { ConsultancyService } from '../types';

const ConsultancyServiceCard: React.FC<{ service: ConsultancyService, colorClass: string, delay: number }> = ({ service, colorClass, delay }) => {
  const iconColorVar = `var(--${colorClass})`; 
  const neonGlowRgbVar = colorClass === 'neon-blue' ? 'var(--neon-blue-rgb)' : colorClass === 'neon-pink' ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)';


  return (
    <div 
        className={`glass-card p-6 md:p-7 rounded-xl shadow-lg transition-all duration-300 animate-fadeIn h-full flex flex-col hover-card publication-card-custom`}
        style={{
            animationDelay: `${delay}s`,
            borderLeftColor: iconColorVar,
            // @ts-ignore
            '--hover-glow-color': iconColorVar,
            '--hover-glow-rgb': neonGlowRgbVar 
        } as React.CSSProperties}
    >
      <div className="flex items-start mb-5">
        <div className="p-3.5 rounded-lg shadow-md mr-5 border" style={{background: `rgba(${neonGlowRgbVar},0.12)`, borderColor: `rgba(${neonGlowRgbVar},0.35)`}}>
            <i className={`${service.iconClass} text-2xl sm:text-3xl`} style={{color: iconColorVar}}></i>
        </div>
        <div>
          <h3 className={`text-xl sm:text-2xl font-bold`} style={{color: iconColorVar}}>{service.title}</h3>
          <p className="text-xs sm:text-sm text-text-muted font-medium mt-1">{service.targetAudience}</p>
        </div>
      </div>
      <p className="text-text-muted leading-relaxed mb-6 text-sm flex-grow">{service.description}</p>
      <Link 
          to="/#contact" 
          state={{ interestedService: service.title, subject: `Inquiry: ${service.title}` }}
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
              const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }}
          className={`mt-auto btn-base !text-xs sm:!text-sm !py-2.5 !px-4 w-full sm:w-auto focus-visible-outline`}
          style={{
            backgroundColor: 'transparent', 
            border: `2px solid ${iconColorVar}`, 
            color: iconColorVar,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = iconColorVar; e.currentTarget.style.color = 'var(--dark)';}}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = iconColorVar;}}
      >
          Inquire About This Service
      </Link>
    </div>
  );
};

export const ConsultancyPage: React.FC = () => {
  const colors = ['neon-blue', 'neon-pink', 'neon-green', 'primary']; // Added primary for variety
  const location = useLocation();

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Consultancy & Collaboration" 
        id="consultancy"
        subtitle={personalInfoData.consultancyOfferSummary || "Leveraging research expertise to drive impactful solutions and foster innovation across sectors."}
      >
        <div className="glass-card p-7 sm:p-9 rounded-xl shadow-lg mb-14 text-center animate-fadeIn hover-card" style={{animationDelay: '0.15s', '--hover-glow-color': 'var(--primary-light)'} as React.CSSProperties}>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-light mb-5 text-shadow-neon-blue">My Approach</h3>
            <p className="text-text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-md">
                I believe in a collaborative, data-driven approach to consultancy. My goal is to empower organizations and individuals with actionable insights derived from rigorous research and practical experience. Whether you're an NGO seeking to measure your impact, an academic institution looking for research collaboration, or a startup navigating the fintech landscape, I'm here to help you achieve your objectives.
            </p>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-light text-center mb-12 animate-fadeIn" style={{animationDelay: '0.25s'}}>Service Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-9">
          {consultancyServicesData.map((service, index) => (
            <ConsultancyServiceCard 
                key={service.id} 
                service={service} 
                colorClass={colors[index % colors.length]} 
                delay={0.3 + index * 0.08}
            />
          ))}
        </div>

        <div className="mt-16 text-center glass-card p-7 sm:p-9 rounded-xl shadow-lg animate-fadeIn hover-card" style={{animationDelay: '0.4s', '--hover-glow-color': 'var(--secondary)'} as React.CSSProperties}>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-5 text-shadow-neon-pink">Ready to Collaborate?</h3>
            <p className="text-text-muted max-w-xl mx-auto mb-7 text-sm sm:text-md">
                If you're interested in any of these services or have a specific project in mind, I'd love to hear from you. Let's discuss how we can work together.
            </p>
            <Link 
              to="/#contact" 
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="btn-base gradient-bg !text-md !py-3 !px-8"
            >
              Contact Me
            </Link>
        </div>
      </Section>
    </div>
  );
};
