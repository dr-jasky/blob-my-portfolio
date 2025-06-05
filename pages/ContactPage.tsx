
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
          <div className="glass-card p-8 rounded-xl shadow-xl animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-bold mb-6 text-light">Send a Message</h3>
            <form id="contact-form" action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Your Name</label>
                <input 
                    type="text" name="name" id="name" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-light placeholder-text-darker-muted"
                    placeholder="e.g., Dr. Jane Doe"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Your Email</label>
                <input 
                    type="email" name="email" id="email" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-light placeholder-text-darker-muted"
                    placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">Subject</label>
                <input 
                    type="text" name="subject" id="subject" required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-light placeholder-text-darker-muted"
                    placeholder="Regarding collaboration on..."
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Message</label>
                <textarea 
                    name="message" id="message" rows={5} required 
                    className="w-full px-4 py-3 contact-input rounded-lg focus:outline-none text-light placeholder-text-darker-muted"
                    placeholder="Your detailed message..."
                ></textarea>
              </div>
              <button 
                  type="submit" 
                  className="gradient-bg text-white w-full py-3 rounded-lg font-medium hover:opacity-90 transition focus-visible-outline"
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
          <div className="glass-card p-8 rounded-xl shadow-xl animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <h3 className="text-2xl font-bold mb-6 text-light">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-cyan-700 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-light">Location</h4>
                  <p className="text-gray-400 text-sm">Patiala, Punjab, India</p>
                  <p className="text-gray-500 text-xs mt-1">(Also available for remote & global collaborations)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-light">Email</h4>
                  <a href={`mailto:${personalInfoData.email}`} className="text-gray-400 hover:text-primary transition-colors break-all focus-visible-outline rounded-sm text-sm">
                    {personalInfoData.email}
                  </a>
                </div>
              </div>
              
              {personalInfoData.phone && (
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-phone text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-light">Phone</h4>
                    <a href={`tel:${personalInfoData.phone.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-primary transition-colors text-sm focus-visible-outline rounded-sm">
                        {personalInfoData.phone}
                    </a>
                  </div>
                </div>
              )}

              {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-brain text-white text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-light">Current Focus & Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalInfoData.currentFocusKeywords.map(keyword => (
                        <span 
                          key={keyword} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900 text-teal-200 shadow-sm"
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
              <h3 className="text-xl font-bold mb-6 text-light">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {contactLinksData.filter(l => l.id !== 'cl1').map(link => ( 
                    <a 
                        key={link.id}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-700 transition focus-visible-outline"
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
                className="gradient-bg text-white w-full py-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition focus-visible-outline"
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