import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, contactLinksData } from '../data';
import { Section } from '../components/Section';
import { ContactLink as ContactLinkType } from '../types';
import { CVLinkButton } from '../components/CVLinkButton';


export const ContactPage: React.FC = () => {
  const formspreeEndpointId: string = "mvoezgjy"; 
  const accentColorPrimary = 'var(--primary-color)';
  const accentColorSecondary = 'var(--secondary-color)';


  return (
    <div className="animate-fadeIn">
      <Section title="Get In Touch" id="contact" subtitle="Open to collaborations, consultations, or just a friendly chat. Let's connect and explore possibilities." titleClassName="accented">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
          
          <div className="glass-card p-7 md:p-8 rounded-xl shadow-lg animate-fadeIn" style={{animationDelay: '0.15s', borderColor: `rgba(from ${accentColorSecondary} r g b / 0.3)`}}> {/* Theme card, secondary accent */}
            <h3 className="text-2xl md:text-[1.6rem] font-bold mb-7" style={{fontFamily: "'Playfair Display', serif", color: accentColorSecondary}}>Send a Message</h3>
            <form id="contact-form" action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-5 sm:mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-1.5 text-sm font-medium">Your Name</label>
                <input 
                    type="text" name="name" id="name" required 
                    className="w-full contact-input rounded-lg focus:outline-none" /* Theme input */
                    placeholder="e.g., Dr. Jane Doe"
                />
              </div>
              <div className="mb-5 sm:mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-1.5 text-sm font-medium">Your Email</label>
                <input 
                    type="email" name="email" id="email" required 
                    className="w-full contact-input rounded-lg focus:outline-none" /* Theme input */
                    placeholder="you@example.com"
                />
              </div>
              <div className="mb-5 sm:mb-6">
                <label htmlFor="subject" className="block text-gray-300 mb-1.5 text-sm font-medium">Subject</label>
                <input 
                    type="text" name="subject" id="subject" required 
                    className="w-full contact-input rounded-lg focus:outline-none" /* Theme input */
                    placeholder="Regarding collaboration on..."
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-1.5 text-sm font-medium">Message</label>
                <textarea 
                    name="message" id="message" rows={4} required 
                    className="w-full contact-input rounded-lg focus:outline-none min-h-[120px]" /* Theme input */
                    placeholder="Your detailed message..."
                ></textarea>
              </div>
              <button 
                  type="submit" 
                  className="btn-base btn-gradient-primary w-full !py-3 text-md" // Theme gradient button, primary to secondary
                  style={{background: `linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)`}} // Primary to Accent gradient from theme
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
               {formspreeEndpointId === "yourFormspreeID" && ( 
                <p className="text-xs mt-4 text-center" style={{color: `rgba(from ${accentColorSecondary} r g b / 0.7)`}}>
                  Note: Form submission is disabled. Please replace <code className="bg-dark-color/50 p-1 rounded-sm text-xs">yourFormspreeID</code> with your actual Formspree endpoint ID in <code className="bg-dark-color/50 p-1 rounded-sm text-xs">ContactPage.tsx</code>.
                </p>
              )}
            </form>
          </div>
          
          <div className="glass-card p-7 md:p-8 rounded-xl shadow-lg animate-fadeIn" style={{animationDelay: '0.3s', borderColor: `rgba(from ${accentColorPrimary} r g b / 0.3)`}}> {/* Theme card, primary accent */}
            <h3 className="text-2xl md:text-[1.6rem] font-bold mb-7" style={{fontFamily: "'Playfair Display', serif", color: accentColorPrimary}}>Contact Information</h3>
            <div className="space-y-6 sm:space-y-7">
              {[
                { icon: "fas fa-map-marker-alt", title: "Location", value: "Patiala, Punjab, India", subValue: "(Remote & global collaborations welcome)" },
                { icon: "fas fa-envelope", title: "Email", value: personalInfoData.email, href: `mailto:${personalInfoData.email}` },
                ...(personalInfoData.phone ? [{ icon: "fas fa-phone-alt", title: "Phone", value: personalInfoData.phone, href: `tel:${personalInfoData.phone.replace(/\s+/g, '')}` }] : []),
              ].map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 sm:mr-5 flex-shrink-0 border shadow-lg group-hover:shadow-[0_0_15px_var(--primary-color)] transition-all`}
                       style={{background: `rgba(from ${accentColorPrimary} r g b / 0.12)`, borderColor: `rgba(from ${accentColorPrimary} r g b / 0.35)`}}>
                    <i className={`${item.icon} text-lg sm:text-xl`} style={{color: accentColorPrimary}}></i>
                  </div>
                  <div>
                    <h4 className="text-md sm:text-lg font-semibold mb-0.5 text-theme-light">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-gray-300 hover:text-theme-primary-light transition-colors break-all focus-visible-outline rounded-sm text-sm sm:text-base">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm sm:text-base">{item.value}</p>
                    )}
                    {item.subValue && <p className="text-gray-500 text-xs mt-1">{item.subValue}</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-7 border-t border-white/10">
              <h3 className="text-lg sm:text-xl font-bold mb-6 text-theme-light">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {contactLinksData.filter(l => l.id !== 'cl1').map(link => ( 
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon-custom focus-visible-outline" // Theme's social icon class
                        aria-label={link.name}
                        title={link.name}
                    >
                        <i className={`${link.iconClass} text-lg sm:text-xl`}></i> {/* Color handled by .social-icon-custom */}
                    </a>
                ))}
              </div>
            </div>
             {personalInfoData.cvUrl && (
                 <div className="mt-10">
                    <CVLinkButton 
                        className="btn-base btn-outline-primary w-full sm:w-auto !py-3" // Theme button
                        text="Download My CV"
                        iconClass="fas fa-download"
                     />
                </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};
