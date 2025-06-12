import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, consultancyServicesData } from '../data';
import { Section } from '../components/Section';
import { ConsultancyService } from '../types';

const ConsultancyServiceCard: React.FC<{ service: ConsultancyService, delay: number, accentColor: string }> = 
  ({ service, delay, accentColor }) => {
  return (
    <div 
        className={`glass-card p-6 md:p-7 rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col publication-card-custom hover-card animate-fadeIn`} // Theme cards
        style={{
            animationDelay: `${delay}s`,
            borderLeftColor: accentColor, // For animated border from .publication-card-custom
        } as React.CSSProperties}
    >
      <div className="flex items-start mb-5">
        <div className="p-3.5 rounded-lg shadow-md mr-5 border" style={{background: `rgba(from ${accentColor} r g b / 0.12)`, borderColor: `rgba(from ${accentColor} r g b / 0.35)`, boxShadow: `0 0 10px rgba(from ${accentColor} r g b / 0.3)`}}>
            <i className={`${service.iconClass} text-2xl sm:text-3xl`} style={{color: accentColor}}></i>
        </div>
        <div>
          <h3 className={`text-xl sm:text-2xl font-bold`} style={{color: accentColor, fontFamily: "'Playfair Display', serif"}}>{service.title}</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">{service.targetAudience}</p>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-6 text-sm flex-grow">{service.description}</p>
      <Link 
          to="/#contact" 
          state={{ interestedService: service.title, subject: `Inquiry: ${service.title}` }}
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              const headerOffsetValue = getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled-base-val').trim();
              const headerOffset = parseFloat(headerOffsetValue.replace('rem',''))*16 || 80;
              const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }}
          className={`mt-auto btn-base !text-xs sm:!text-sm !py-2.5 !px-4 w-full sm:w-auto focus-visible-outline`}
          style={{borderColor: accentColor, color: accentColor}}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `rgba(from ${accentColor} r g b / 0.15)`;}}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent';}}
      >
          Inquire About This Service
      </Link>
    </div>
  );
};

export const ConsultancyPage: React.FC = () => {
  const location = useLocation();
  const serviceColors = [ // Use theme's color variables
    'var(--primary-color)',
    'var(--secondary-color)',
    'var(--accent-color)',
    'var(--primary-light-color)' 
  ];


  return (
    <div className="animate-fadeIn">
      <Section 
        title="Consultancy & Collaboration" 
        id="consultancy"
        subtitle={personalInfoData.consultancyOfferSummary || "Leveraging research expertise to drive impactful solutions and foster innovation across sectors."}
        titleClassName="accented"
      >
        <div className="glass-card p-7 sm:p-9 rounded-xl shadow-lg mb-12 sm:mb-14 text-center animate-fadeIn" style={{animationDelay: '0.15s', borderColor: 'rgba(from var(--primary-color) r g b / 0.3)'}}> {/* Theme card */}
            <h3 className="text-2xl md:text-3xl font-bold text-theme-primary-light mb-5" style={{fontFamily: "'Playfair Display', serif"}}>My Approach</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base"> {/* Theme text colors */}
                I believe in a collaborative, data-driven approach to consultancy. My goal is to empower organizations and individuals with actionable insights derived from rigorous research and practical experience. Whether you're an NGO seeking to measure your impact, an academic institution looking for research collaboration, or a startup navigating the fintech landscape, I'm here to help you achieve your objectives.
            </p>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-theme-light text-center mb-10 sm:mb-12 animate-fadeIn" style={{animationDelay: '0.25s', fontFamily: "'Playfair Display', serif"}}>Service Offerings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-8"> {/* Adjusted gap */}
          {consultancyServicesData.map((service, index) => (
            <ConsultancyServiceCard 
                key={service.id} 
                service={service} 
                delay={0.3 + index * 0.08}
                accentColor={serviceColors[index % serviceColors.length]}
            />
          ))}
        </div>

        <div className="mt-14 sm:mt-16 text-center glass-card p-7 sm:p-9 rounded-xl shadow-lg animate-fadeIn" style={{animationDelay: '0.4s', borderColor: 'rgba(from var(--secondary-color) r g b /0.3)'}}> {/* Theme card */}
            <h3 className="text-2xl md:text-3xl font-bold text-theme-secondary mb-5" style={{fontFamily: "'Playfair Display', serif"}}>Ready to Collaborate?</h3>
            <p className="text-gray-300 max-w-xl mx-auto mb-7 text-sm sm:text-base">
                If you're interested in any of these services or have a specific project in mind, I'd love to hear from you. Let's discuss how we can work together.
            </p>
            <Link 
              to="/#contact" 
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerOffsetValue = getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled-base-val').trim();
                  const headerOffset = parseFloat(headerOffsetValue.replace('rem',''))*16 || 80;
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="btn-base btn-gradient-primary !text-md !py-3 !px-8" // Theme button, primary to secondary gradient
              style={{background: `linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)`}} // Secondary to Accent gradient example
            >
              Contact Me
            </Link>
        </div>
      </Section>
    </div>
  );
};
