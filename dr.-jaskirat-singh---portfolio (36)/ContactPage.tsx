
import React from 'react';
import { personalInfoData, contactLinksData } from './data';
import { Section } from './components/Section';
import { ContactLink } from './types';

export const ContactPage: React.FC = () => {
  const formspreeEndpointId = "yourFormspreeID"; // IMPORTANT: Replace with your actual Formspree endpoint ID

  return (
    <div className="animate-fadeIn">
      <Section title="Get In Touch" subtitle="Open to collaborations, consultations, or just a friendly chat. Let's connect and explore possibilities.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          
          <div className="bg-dark-secondary p-6 sm:p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold text-neon-blue mb-6">Contact Information</h3>
            <p className="text-light-secondary mb-6 leading-relaxed">
              I'm always open to discussing new research projects, collaborations, or consultation opportunities, especially for NGOs and social impact initiatives. Please feel free to reach out.
            </p>
            <div className="space-y-5">
              <div className="flex items-center group">
                <i className="fas fa-envelope text-neon-blue text-2xl mr-4 w-6 text-center group-hover:animate-pulseGlow [--tw-shadow-color:theme('colors.neon-blue')]"></i>
                <a href={`mailto:${personalInfoData.email}`} className="text-light-primary hover:text-neon-blue transition-colors break-all">
                  {personalInfoData.email}
                </a>
              </div>
              {contactLinksData.filter(link => link.id !== 'cl1').map((link: ContactLink) => (
                <div key={link.id} className="flex items-center group">
                  <i className={`${link.iconClass} text-neon-blue text-2xl mr-4 w-6 text-center group-hover:animate-pulseGlow [--tw-shadow-color:theme('colors.neon-blue')]`}></i>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-light-primary hover:text-neon-blue transition-colors">
                    {link.name} Profile
                  </a>
                </div>
              ))}
            </div>
             {personalInfoData.cvUrl && (
                 <div className="mt-10">
                    <a 
                        href={personalInfoData.cvUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-transparent border-2 border-neon-blue text-neon-blue font-semibold py-3 px-6 rounded-lg shadow-neon-glow-blue hover:bg-neon-blue hover:text-dark-primary transition-all duration-300 transform hover:scale-105"
                    >
                        <i className="fas fa-download mr-2"></i>
                        Download My CV
                    </a>
                </div>
            )}
          </div>
          
          <div className="bg-dark-secondary p-6 sm:p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold text-neon-pink mb-6">Send a Message</h3>
            <form action={`https://formspree.io/f/${formspreeEndpointId}`} method="POST">
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-light-secondary mb-1">Full Name</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-dark-primary border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-light-primary shadow-sm transition-colors" />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-light-secondary mb-1">Email Address</label>
                <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-dark-primary border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-light-primary shadow-sm transition-colors" />
              </div>
              <div className="mb-5">
                <label htmlFor="subject" className="block text-sm font-medium text-light-secondary mb-1">Subject</label>
                <input type="text" name="subject" id="subject" required className="w-full px-4 py-3 bg-dark-primary border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-light-primary shadow-sm transition-colors" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-light-secondary mb-1">Message</label>
                <textarea name="message" id="message" rows={5} required className="w-full px-4 py-3 bg-dark-primary border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink text-light-primary shadow-sm transition-colors"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-neon-pink hover:bg-opacity-80 text-dark-primary font-semibold py-3 px-6 rounded-lg shadow-neon-glow-pink transition-all duration-300 transform hover:scale-105">
                  Send Message <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
              {formspreeEndpointId === "yourFormspreeID" && (
                <p className="text-xs text-neon-pink/70 mt-4 text-center">
                  Note: Form submission is disabled. Please replace <code className="bg-dark-primary p-1 rounded">yourFormspreeID</code> with your actual Formspree endpoint ID in <code className="bg-dark-primary p-1 rounded">ContactPage.tsx</code>.
                </p>
              )}
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};
