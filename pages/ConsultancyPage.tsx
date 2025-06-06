
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, consultancyServicesData } from '../data';
import { Section } from '../components/Section';
import { ConsultancyService } from '../types';

const ConsultancyServiceCard: React.FC<{ service: ConsultancyService, colorClass: string, delay: number }> = ({ service, colorClass, delay }) => {
  const iconColorVar = `var(--${colorClass})`; // e.g., var(--neon-blue)
  const borderColorVar = `var(--${colorClass})`;
  const hoverBgColorVar = `var(--${colorClass})`;
  const neonGlowRgbVar = colorClass === 'neon-blue' ? 'var(--neon-blue-rgb)' : colorClass === 'neon-pink' ? 'var(--neon-pink-rgb)' : 'var(--neon-green-rgb)';


  return (
    <div 
        className={`glass-card p-7 md:p-8 rounded-2xl shadow-xl transition-all duration-300 animate-fadeIn h-full flex flex-col hover-card publication-card-custom`}
        style={{
            animationDelay: `${delay}s`,
            borderLeftColor: borderColorVar,
            // @ts-ignore
            '--hover-glow-rgb': neonGlowRgbVar 
        } as React.CSSProperties}
    >
      <div className="flex items-start mb-6">
        <div className="p-4 rounded-xl shadow-lg mr-6 border" style={{background: `rgba(${neonGlowRgbVar},0.15)`, borderColor: `rgba(${neonGlowRgbVar},0.4)`}}>
            <i className={`${service.iconClass} text-3xl`} style={{color: iconColorVar}}></i>
        </div>
        <div>
          <h3 className={`text-2xl font-bold`} style={{color: iconColorVar}}>{service.title}</h3>
          <p className="text-sm text-text-muted font-medium mt-1.5">{service.targetAudience}</p>
        </div>
      </div>
      <p className="text-text-muted leading-relaxed mb-7 text-sm flex-grow">{service.description}</p>
      <Link 
          to="/#contact" 
          state={{ interestedService: service.title, subject: `Inquiry: ${service.title}` }}
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              const headerOffset = 100; // Adjusted from 90
              const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }}
          className={`mt-auto btn-base !text-xs sm:!text-sm !py-2.5 !px-5 w-full sm:w-auto`}
          style={{
            backgroundColor: 'transparent', 
            border: `2px solid ${borderColorVar}`, 
            color: iconColorVar,
            // @ts-ignore
            '--hover-bg-color': hoverBgColorVar,
            '--hover-text-color': 'var(--dark)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hoverBgColorVar; e.currentTarget.style.color = 'var(--dark)';}}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = iconColorVar;}}
      >
          Inquire About This Service
      </Link>
    </div>
  );
};

export const ConsultancyPage: React.FC = () => {
  const colors = ['neon-blue', 'neon-pink', 'neon-green', 'neon-blue']; 
  const location = useLocation();

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Consultancy & Collaboration" 
        id="consultancy"
        subtitle={personalInfoData.consultancyOfferSummary || "Leveraging research expertise to drive impactful solutions and foster innovation across sectors."}
      >
        <div className="glass-card p-8 sm:p-10 rounded-2xl shadow-xl mb-16 text-center animate-fadeIn hover-card" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-light mb-6 text-shadow-neon-blue">My Approach</h3>
            <p className="text-text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base">
                I believe in a collaborative, data-driven approach to consultancy. My goal is to empower organizations and individuals with actionable insights derived from rigorous research and practical experience. Whether you're an NGO seeking to measure your impact, an academic institution looking for research collaboration, or a startup navigating the fintech landscape, I'm here to help you achieve your objectives.
            </p>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-light text-center mb-14 animate-fadeIn" style={{animationDelay: '0.3s'}}>Service Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
          {consultancyServicesData.map((service, index) => (
            <ConsultancyServiceCard 
                key={service.id} 
                service={service} 
                colorClass={colors[index % colors.length]} 
                delay={0.4 + index * 0.1}
            />
          ))}
        </div>

        <div className="mt-20 text-center glass-card p-8 md:p-10 rounded-2xl shadow-xl animate-fadeIn hover-card" style={{animationDelay: '0.5s'}}>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6 text-shadow-neon-pink">Ready to Collaborate?</h3>
            <p className="text-text-muted max-w-xl mx-auto mb-8 text-sm sm:text-base">
                If you're interested in any of these services or have a specific project in mind, I'd love to hear from you. Let's discuss how we can work together.
            </p>
            <Link 
              to="/#contact" 
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerOffset = 100; // Adjusted
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="btn-base gradient-bg !text-lg !py-3.5 !px-10"
            >
              Contact Me
            </Link>
        </div>
      </Section>
    </div>
  );
};
