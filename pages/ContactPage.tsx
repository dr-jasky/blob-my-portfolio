
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, contactLinksData } from '../data';
import { Section } from '../components/Section';
import { ContactLink as ContactLinkType } from '../types';

export const ContactPage: React.FC = () => {
  const formspreeEndpointId: string = "mvoezgjy"; // Replace with your actual Formspree ID

  return (
    <div className="animate-fadeIn">
      <Section title="Get In Touch" id="contact" subtitle="Open to collaborations, consultations, or just a friendly chat. Let's connect and explore possibilities.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
          
          <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl animate-fadeIn hover-card" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-light text-shadow-neon-blue">Send a Message</h3>
            <form id="contact-form" action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-7">
                <label htmlFor="name" className="block text-text-muted mb-2.5 text-sm font-medium">Your Name</label>
                <input 
                    type="text" name="name" id="name" required 
                    className="w-full premium-input"
                    placeholder="e.g., Dr. Jane Doe"
                />
              </div>
              <div className="mb-7">
                <label htmlFor="email" className="block text-text-muted mb-2.5 text-sm font-medium">Your Email</label>
                <input 
                    type="email" name="email" id="email" required 
                    className="w-full premium-input"
                    placeholder="you@example.com"
                />
              </div>
              <div className="mb-7">
                <label htmlFor="subject" className="block text-text-muted mb-2.5 text-sm font-medium">Subject</label>
                <input 
                    type="text" name="subject" id="subject" required 
                    className="w-full premium-input"
                    placeholder="Regarding collaboration on..."
                />
              </div>
              <div className="mb-7">
                <label htmlFor="message" className="block text-text-muted mb-2.5 text-sm font-medium">Message</label>
                <textarea 
                    name="message" id="message" rows={5} required 
                    className="w-full premium-input min-h-[140px]"
                    placeholder="Your detailed message..."
                ></textarea>
              </div>
              <button 
                  type="submit" 
                  className="btn-base gradient-bg text-white w-full !py-3.5 text-md"
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
               {formspreeEndpointId === "yourFormspreeID" && ( 
                <p className="text-xs text-neon-pink/80 mt-5 text-center">
                  Note: Form submission is disabled. Please replace <code className="bg-dark-primary p-1.5 rounded-sm text-xs">yourFormspreeID</code> with your actual Formspree endpoint ID in <code className="bg-dark-primary p-1.5 rounded-sm text-xs">ContactPage.tsx</code>.
                </p>
              )}
            </form>
          </div>
          
          <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl animate-fadeIn hover-card" style={{animationDelay: '0.4s'}}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-light text-shadow-neon-pink">Contact Information</h3>
            <div className="space-y-7">
              {[
                { icon: "fas fa-map-marker-alt", title: "Location", value: "Patiala, Punjab, India", subValue: "(Remote & global collaborations welcome)", color: "cyan" },
                { icon: "fas fa-envelope", title: "Email", value: personalInfoData.email, href: `mailto:${personalInfoData.email}`, color: "purple" },
                ...(personalInfoData.phone ? [{ icon: "fas fa-phone", title: "Phone", value: personalInfoData.phone, href: `tel:${personalInfoData.phone.replace(/\s+/g, '')}`, color: "amber" }] : []),
                ...(personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 ? [{ icon: "fas fa-brain", title: "Current Focus", keywords: personalInfoData.currentFocusKeywords, color: "teal" }] : [])
              ].map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 border shadow-md group-hover:shadow-neon-glow-${item.color === 'cyan' ? 'blue' : item.color === 'purple' ? 'pink' : item.color} transition-all`}
                       style={{background: `rgba(var(--${item.color}-700-rgb, var(--${item.color}-rgb)), 0.25)`, borderColor: `rgba(var(--${item.color}-500-rgb, var(--${item.color}-rgb)), 0.5)`}}>
                    <i className={`${item.icon} text-white text-xl`} style={{color: `var(--${item.color})`}}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1.5 text-light">{item.title}</h4>
                    {item.keywords ? (
                      <div className="flex flex-wrap gap-2.5">
                        {item.keywords.map(keyword => (
                          <span 
                            key={keyword} 
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border backdrop-blur-sm"
                            style={{background: `rgba(var(--${item.color}-800-rgb, var(--${item.color}-rgb)), 0.5)`, color: `var(--${item.color}-200, var(--${item.color}))`, borderColor: `rgba(var(--${item.color}-600-rgb, var(--${item.color}-rgb)), 0.6)`}}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : item.href ? (
                      <a href={item.href} className="text-text-muted hover:text-primary-light transition-colors break-all focus-visible-outline rounded-sm text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm">{item.value}</p>
                    )}
                    {item.subValue && <p className="text-text-darker-muted text-xs mt-1.5">{item.subValue}</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-bold mb-7 text-light">Connect Socially</h3>
              <div className="flex flex-wrap gap-5">
                {contactLinksData.filter(l => l.id !== 'cl1').map(link => ( 
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-14 h-14 rounded-full bg-slate-700/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-all duration-300 focus-visible-outline transform hover:scale-110 hover:shadow-neon-glow-blue border border-slate-600/70 hover:border-primary-light"
                        aria-label={link.name}
                        title={link.name}
                    >
                        <i className={`${link.iconClass} text-white text-xl`}></i>
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
