
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfoData, contactLinksData } from '../data';
import { Section } from '../components/Section';
import { ContactLink as ContactLinkType } from '../types';

export const ContactPage: React.FC = () => {
  // The formspree endpoint ID typically does not change if the email associated with the account changes.
  // User needs to ensure this ID 'mvoezgjy' is still correct for 'jasky786@gmail.com' or update it if they created a new form.
  const formspreeEndpointId: string = "mvoezgjy"; 

  return (
    <div className="animate-fadeIn">
      <Section title="Get In Touch" id="contact" subtitle="Open to collaborations, consultations, or just a friendly chat. Let's connect and explore possibilities.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form Column */}
          <div className="glass-card p-8 rounded-xl shadow-xl animate-fadeIn" style={{animationDelay: '0.2s'}}> {/* Uses general glass-card */}
            <h3 className="text-2xl font-bold mb-6 text-text-light-primary">Send a Message</h3>
            <form id="contact-form" action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-6">
                <label htmlFor="name" className="block text-text-light-secondary mb-2 text-sm">Your Name</label>
                <input 
                    type="text" name="name" id="name" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-text-light-primary placeholder-text-muted"
                    placeholder="e.g., Dr. Jane Doe"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-text-light-secondary mb-2 text-sm">Your Email</label>
                <input 
                    type="email" name="email" id="email" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-text-light-primary placeholder-text-muted"
                    placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-text-light-secondary mb-2 text-sm">Subject</label>
                <input 
                    type="text" name="subject" id="subject" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-text-light-primary placeholder-text-muted"
                    placeholder="Regarding collaboration on..."
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-text-light-secondary mb-2 text-sm">Message</label>
                <textarea 
                    name="message" id="message" rows={5} required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-text-light-primary placeholder-text-muted"
                    placeholder="Your detailed message..."
                ></textarea>
              </div>
              <button 
                  type="submit" 
                  className="gradient-bg text-dark-primary w-full py-3 rounded-lg font-medium hover:opacity-90 transition focus-visible-outline" // text-dark-primary for contrast
              >
                <i className="fas fa-paper-plane mr-2"></i> Send Message
              </button>
               {formspreeEndpointId === "yourFormspreeID" && ( 
                <p className="text-xs text-neon-pink/70 mt-4 text-center">
                  Note: Form submission is disabled. Please replace <code className="bg-dark-primary p-1 rounded">yourFormspreeID</code> with your actual Formspree endpoint ID in <code className="bg-dark-primary p-1 rounded">ContactPage.tsx</code>.
                </p>
              )}
            </form>
          </div>
          
          {/* Contact Information Column */}
          <div className="glass-card p-8 rounded-xl shadow-xl animate-fadeIn" style={{animationDelay: '0.4s'}}> {/* Uses general glass-card */}
            <h3 className="text-2xl font-bold mb-6 text-text-light-primary">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mr-4 flex-shrink-0 border border-neon-blue/50"> {/* Neon themed icon bg */}
                  <i className="fas fa-map-marker-alt text-neon-blue text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-text-light-primary">Location</h4>
                  <p className="text-text-light-secondary text-sm">Patiala, Punjab, India</p>
                  <p className="text-text-muted text-xs mt-1">(Also available for remote & global collaborations)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-neon-pink/20 flex items-center justify-center mr-4 flex-shrink-0 border border-neon-pink/50"> {/* Neon themed icon bg */}
                  <i className="fas fa-envelope text-neon-pink text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-text-light-primary">Email</h4>
                  <a href={`mailto:${personalInfoData.email}`} className="text-text-light-secondary hover:text-neon-pink transition-colors break-all focus-visible-outline rounded-sm text-sm">
                    {personalInfoData.email}
                  </a>
                </div>
              </div>
              
              {personalInfoData.phone && (
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center mr-4 flex-shrink-0 border border-neon-green/50"> {/* Neon themed icon bg */}
                    <i className="fas fa-phone text-neon-green text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-text-light-primary">Phone</h4>
                    <a href={`tel:${personalInfoData.phone.replace(/\s+/g, '')}`} className="text-text-light-secondary hover:text-neon-green transition-colors text-sm focus-visible-outline rounded-sm">
                        {personalInfoData.phone}
                    </a>
                  </div>
                </div>
              )}

              {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center mr-4 flex-shrink-0 border border-neon-purple/50"> {/* Neon themed icon bg */}
                    <i className="fas fa-brain text-neon-purple text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-light-primary">Current Focus & Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalInfoData.currentFocusKeywords.map(keyword => (
                        <span 
                          key={keyword} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neon-purple/25 text-neon-purple border border-neon-purple/50 shadow-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-text-light-primary">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {contactLinksData.filter(l => l.id !== 'cl1').map(link => ( 
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon w-12 h-12 rounded-full bg-dark-tertiary flex items-center justify-center hover:bg-neon-blue transition focus-visible-outline" // bg-dark-tertiary
                        aria-label={link.name}
                    >
                        <i className={`${link.iconClass} text-white text-lg`}></i>
                    </a>
                ))}
              </div>
            </div>
            
            <div className="mt-10">
              <Link 
                to={personalInfoData.cvUrl || "/cv-html"}
                className="gradient-bg text-dark-primary w-full py-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition focus-visible-outline" // text-dark-primary
              >
                <i className="fas fa-file-alt mr-2"></i> View HTML CV
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
