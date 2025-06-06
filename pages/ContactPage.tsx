
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, contactLinksData } from '../data';
import { Section } from '../components/Section';
import { ContactLink as ContactLinkType } from '../types';

export const ContactPage: React.FC = () => {
  const formspreeEndpointId: string = "mvoezgjy"; 

  return (
    <div className="animate-fadeIn">
      <Section title="Get In Touch" id="contact" subtitle="Open to collaborations, consultations, or just a friendly chat. Let's connect and explore possibilities.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
          
          <div className="glass-card p-7 md:p-9 rounded-xl shadow-lg animate-fadeIn hover-card" style={{animationDelay: '0.15s'}}>
            <h3 className="text-2xl md:text-[1.6rem] font-bold mb-7 text-light text-shadow-neon-blue">Send a Message</h3>
            <form id="contact-form" action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-6">
                <label htmlFor="name" className="block text-text-muted mb-2 text-sm font-medium">Your Name</label>
                <input 
                    type="text" name="name" id="name" required 
                    className="w-full premium-input"
                    placeholder="e.g., Dr. Jane Doe"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-text-muted mb-2 text-sm font-medium">Your Email</label>
                <input 
                    type="email" name="email" id="email" required 
                    className="w-full premium-input"
                    placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-text-muted mb-2 text-sm font-medium">Subject</label>
                <input 
                    type="text" name="subject" id="subject" required 
                    className="w-full premium-input"
                    placeholder="Regarding collaboration on..."
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-text-muted mb-2 text-sm font-medium">Message</label>
                <textarea 
                    name="message" id="message" rows={4} required 
                    className="w-full premium-input min-h-[120px]"
                    placeholder="Your detailed message..."
                ></textarea>
              </div>
              <button 
                  type="submit" 
                  className="btn-base gradient-bg text-white w-full !py-3 text-md"
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
               {formspreeEndpointId === "yourFormspreeID" && ( 
                <p className="text-xs text-neon-pink/75 mt-4 text-center">
                  Note: Form submission is disabled. Please replace <code className="bg-dark-tertiary p-1 rounded-sm text-xs">yourFormspreeID</code> with your actual Formspree endpoint ID in <code className="bg-dark-tertiary p-1 rounded-sm text-xs">ContactPage.tsx</code>.
                </p>
              )}
            </form>
          </div>
          
          <div className="glass-card p-7 md:p-9 rounded-xl shadow-lg animate-fadeIn hover-card" style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl md:text-[1.6rem] font-bold mb-7 text-light text-shadow-neon-pink">Contact Information</h3>
            <div className="space-y-6">
              {[
                { icon: "fas fa-map-marker-alt", title: "Location", value: "Patiala, Punjab, India", subValue: "(Remote & global collaborations welcome)", color: "cyan" },
                { icon: "fas fa-envelope", title: "Email", value: personalInfoData.email, href: `mailto:${personalInfoData.email}`, color: "purple" },
                ...(personalInfoData.phone ? [{ icon: "fas fa-phone-alt", title: "Phone", value: personalInfoData.phone, href: `tel:${personalInfoData.phone.replace(/\s+/g, '')}`, color: "amber" }] : []),
                ...(personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 ? [{ icon: "fas fa-brain", title: "Current Focus", keywords: personalInfoData.currentFocusKeywords, color: "teal" }] : [])
              ].map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 border shadow-sm group-hover:shadow-neon-glow-${item.color === 'cyan' ? 'blue' : item.color === 'purple' ? 'pink' : item.color === 'teal' ? 'green' : item.color} transition-all`}
                       style={{background: `rgba(var(--${item.color}-rgb, var(--${item.color}-700-rgb)), 0.2)`, borderColor: `rgba(var(--${item.color}-rgb, var(--${item.color}-500-rgb)), 0.45)`}}>
                    <i className={`${item.icon} text-white text-lg sm:text-xl`} style={{color: `var(--${item.color})`}}></i>
                  </div>
                  <div>
                    <h4 className="text-md sm:text-lg font-semibold mb-1 text-light">{item.title}</h4>
                    {item.keywords ? (
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map(keyword => (
                          <span 
                            key={keyword} 
                            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm border backdrop-blur-sm"
                            style={{background: `rgba(var(--${item.color}-rgb, var(--${item.color}-800-rgb)), 0.4)`, color: `var(--${item.color}-100, var(--${item.color}))`, borderColor: `rgba(var(--${item.color}-rgb, var(--${item.color}-600-rgb)), 0.5)`}}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : item.href ? (
                      <a href={item.href} className="text-text-muted hover:text-primary-light transition-colors break-all focus-visible-outline rounded-sm text-sm sm:text-md">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm sm:text-md">{item.value}</p>
                    )}
                    {item.subValue && <p className="text-text-darker-muted text-xs mt-1">{item.subValue}</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-7 border-t border-slate-700/40">
              <h3 className="text-lg sm:text-xl font-bold mb-6 text-light">Connect Socially</h3>
              <div className="flex flex-wrap gap-4">
                {contactLinksData.filter(l => l.id !== 'cl1').map(link => ( 
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary/70 transition-all duration-300 focus-visible-outline transform hover:scale-110 hover:shadow-neon-glow-blue border border-slate-600/60 hover:border-primary-light"
                        aria-label={link.name}
                        title={link.name}
                    >
                        <i className={`${link.iconClass} text-white text-lg sm:text-xl`}></i>
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
