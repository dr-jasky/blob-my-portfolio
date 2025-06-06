
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { publicationsData } from '../data';
import { Publication, PublicationType, ImpactMetric } from '../types';
import { generateAPA, generateBibTeX } from '../utils/citationGenerators'; 

const ImpactMetricTag: React.FC<{ metric: ImpactMetric }> = ({ metric }) => {
  let colorClasses = "bg-cyan-800/80 text-cyan-100 border-cyan-600/70"; 
  const metricValueStr = metric.value.toString().toUpperCase();

  if (metricValueStr.includes("Q1")) colorClasses = "bg-green-700/80 text-green-100 border-green-500/70"; 
  else if (metricValueStr.includes("Q2")) colorClasses = "bg-yellow-700/80 text-yellow-100 border-yellow-500/70"; 
  else if (metricValueStr.includes("ABDC: A")) colorClasses = "bg-red-700/80 text-red-100 border-red-500/70";
  else if (metricValueStr.includes("ABDC: B")) colorClasses = "bg-indigo-700/80 text-indigo-100 border-indigo-500/70";
  else if (metricValueStr.includes("ABDC: C")) colorClasses = "bg-purple-700/80 text-purple-100 border-purple-500/70";
  
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold ${colorClasses} shadow-md transition-all duration-300 hover:brightness-140 border backdrop-blur-sm`}>
      {metric.icon && <i className={`${metric.icon} mr-2.5 text-sm opacity-90`}></i>}
      {metric.value}
    </span>
  );
};

const PublicationStaticCard: React.FC<{ pub: Publication; delay: number }> = ({ pub, delay }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  
  const apaCitation = useMemo(() => generateAPA(pub), [pub]);
  const bibtexCitation = useMemo(() => generateBibTeX(pub), [pub]);

  const handleCopy = async (textToCopy: string, type: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 3000); 
    } catch (err) {
      setCopySuccess(`Failed to copy ${type}.`);
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const cardId = `pub-${pub.id}`;

  const getTagColor = (index: number) => {
    const colors = [
      "bg-primary/20 text-primary-light border-primary/40",
      "bg-secondary/20 text-secondary border-secondary/40", // Violet for secondary
      "bg-accent/20 text-accent border-accent/40", // Emerald for accent
      "bg-teal-700/40 text-teal-200 border-teal-600/50",
    ];
    return colors[index % colors.length];
  }

  return (
    <div 
      id={cardId} 
      className="glass-card p-6 md:p-7 rounded-2xl shadow-xl hover-card h-full min-h-[400px] sm:min-h-[420px] flex flex-col animate-fadeIn focus-visible-outline publication-card-custom"
      style={{ animationDelay: `${delay}s`}}
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowDetailsModal(true);}}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-wrap gap-3">
          {pub.impactMetrics?.slice(0,2).map(metric => ( 
            <ImpactMetricTag key={metric.name+metric.value} metric={metric} />
          ))}
        </div>
        <span className="text-sm text-text-darker-muted font-semibold ml-2 flex-shrink-0 bg-dark-tertiary/70 px-3.5 py-1.5 rounded-lg border border-slate-600/70 backdrop-blur-sm shadow-sm">
          {pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")}
        </span>
      </div>

      <div className="flex-grow mb-6">
        <h3 className="text-lg md:text-xl font-bold mb-3 text-light leading-tight line-clamp-3"
            title={pub.title}>
          {pub.title}
        </h3>
        <p className="text-xs text-text-muted mb-3 line-clamp-2">
          {pub.authors}
        </p>
        <p className="text-xs text-text-darker-muted line-clamp-2">
          <span className="font-medium text-text-muted">Source:</span> {pub.source}
        </p>
        {pub.status && (
          <p className="text-sm text-accent mt-3 font-semibold">
            <i className="fas fa-info-circle mr-2.5"></i>
            {pub.status}
          </p>
        )}
      </div>

      <div className="mt-auto">
        {pub.tags && pub.tags.length > 0 && (
          <div className="pt-4 border-t border-slate-700/60 mb-6">
            <div className="flex flex-wrap gap-2.5">
              {pub.tags.slice(0, 3).map((tag, index) => ( 
                <span 
                  key={tag} 
                  className={`inline-flex items-center px-3.5 py-2 rounded-full text-xs font-medium shadow-sm ${getTagColor(index)} hover:brightness-140 border backdrop-blur-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <button 
          onClick={() => setShowDetailsModal(true)}
          className="w-full btn-base gradient-bg !py-3.5 !px-5 text-sm"
          aria-label={`View abstract and citation for ${pub.title}`}
        >
          <i className="fas fa-book-open"></i> View Abstract & Cite
        </button>
      </div>

      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-dark/90 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 animate-fadeIn"
          onClick={() => setShowDetailsModal(false)} role="dialog" aria-modal="true" aria-labelledby={`details-title-${pub.id}`}
        >
          <div 
            className="glass-card p-7 md:p-9 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border-2 border-primary-light/70" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <h4 id={`details-title-${pub.id}`} className="text-xl md:text-2xl font-bold text-light line-clamp-2" title={pub.title}>
                {pub.title}
              </h4>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-text-muted hover:text-light text-4xl leading-none focus-visible-outline rounded-full w-12 h-12 flex items-center justify-center hover:bg-slate-700/70 transition-colors flex-shrink-0 ml-4" aria-label="Close details modal"
              >
                &times;
              </button>
            </div>
            
            <p className="text-sm text-text-darker-muted mb-2 flex-shrink-0">
              {pub.authors} ({pub.year})
            </p>
            <p className="text-sm text-text-darker-muted mb-7 flex-shrink-0">
              <span className="font-medium text-text-muted">Source:</span> {pub.source} {pub.details ? `(${pub.details})` : ''}
            </p>

            <div className="overflow-y-auto mb-8 scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-dark-tertiary pr-3.5 flex-grow min-h-[200px] bg-dark-tertiary/70 backdrop-blur-lg p-5 rounded-xl border border-slate-500/60 shadow-inner">
              <h5 className="text-lg font-semibold text-primary-light mb-3.5">Abstract/Summary:</h5>
              <p className="text-text-muted text-sm md:text-base leading-relaxed">
                {pub.summary || pub.insightSnippet || "Detailed abstract not available for this publication."}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="flex flex-wrap gap-4 mb-8">
                {(pub.doiLink && pub.doiLink !== "#" && !pub.doiLink.startsWith('http://#')) && (
                  <a 
                    href={pub.doiLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-base gradient-bg-alt !py-3 !px-6 text-sm"
                    aria-label={`Read full paper of ${pub.title} via DOI`}
                  >
                    <i className="fas fa-external-link-alt"></i> DOI Link
                  </a>
                )}
                {(!pub.doiLink || pub.doiLink === "#" || pub.doiLink.startsWith('http://#')) && pub.link && (
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-base gradient-bg-alt !py-3 !px-6 text-sm"
                    aria-label={`View source for ${pub.title}`}
                  >
                    <i className="fas fa-link"></i> View Source
                  </a>
                )}
              </div>

              <div className="space-y-6 border-t border-slate-700/70 pt-7">
                <div>
                  <label htmlFor={`apa-citation-${pub.id}`} className="block text-sm font-medium text-text-muted mb-2.5">
                    APA Citation:
                  </label>
                  <textarea
                    id={`apa-citation-${pub.id}`}
                    readOnly 
                    value={apaCitation} 
                    rows={3} 
                    className="w-full premium-input !text-sm !py-3 !px-4 resize-none scrollbar-thin scrollbar-thumb-primary/80 scrollbar-track-dark/60"
                  />
                  <button 
                    onClick={() => handleCopy(apaCitation, 'APA')} 
                    className="mt-3 btn-base btn-neon-outline !border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-dark !py-2 !px-4 !text-xs"
                  >
                    <i className="fas fa-copy"></i> Copy APA
                  </button>
                </div>
                
                <div>
                  <label htmlFor={`bibtex-citation-${pub.id}`} className="block text-sm font-medium text-text-muted mb-2.5">
                    BibTeX:
                  </label>
                  <textarea
                    id={`bibtex-citation-${pub.id}`}
                    readOnly 
                    value={bibtexCitation} 
                    rows={4} 
                    className="w-full premium-input !text-sm !py-3 !px-4 resize-none scrollbar-thin scrollbar-thumb-primary/80 scrollbar-track-dark/60"
                  />
                  <button 
                    onClick={() => handleCopy(bibtexCitation, 'BibTeX')} 
                    className="mt-3 btn-base btn-neon-outline !border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-dark !py-2 !px-4 !text-xs"
                  >
                     <i className="fas fa-copy"></i> Copy BibTeX
                  </button>
                </div>
              </div>
            </div>
            
            {copySuccess && (
              <p role="status" aria-live="polite" className="text-sm text-accent mt-6 text-center flex-shrink-0 font-semibold animate-pulseGlow [--tw-shadow-color:var(--accent)]">
                <i className="fas fa-check-circle mr-2.5"></i>{copySuccess}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const ResearchPage: React.FC = () => {
  const publicationTypes = Object.values(PublicationType); 
  
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('pub-')) { 
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 130; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          
          element.classList.add(
            '!border-accent', 
            'ring-4', 
            'ring-accent', 
            'ring-offset-4', 
            'ring-offset-dark-secondary', 
            'shadow-2xl', 'shadow-accent/60', 
            'z-10', 
            'relative', 
            'transition-all', 'duration-700', 'ease-out', 'transform', 'scale-105'
          );
          
          setTimeout(() => {
            element.classList.remove(
              '!border-accent', 
              'ring-4', 
              'ring-accent', 
              'ring-offset-4', 
              'ring-offset-dark-secondary',
              'shadow-2xl', 'shadow-accent/60',
              'z-10',
              'relative', 'transform', 'scale-105'
            );
            element.classList.add('scale-100'); 
          }, 4500); 
        }, 400); 
      }
    }
  }, []);

  return (
    <section id="research" className="py-16 md:py-20 relative animate-fadeIn"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold text-light">
            My Research Portfolio
          </h2>
          <p className="text-lg md:text-xl text-text-muted mt-5 max-w-3xl mx-auto">
            Explore a comprehensive collection of my academic contributions, from peer-reviewed articles to ongoing projects and book chapters.
          </p>
        </div>
            
        {publicationTypes.map((type, typeIndex) => {
          const filteredPublications = publicationsData
            .filter(pub => pub.type === type)
            .sort((a, b) => {
                const yearA = parseInt(a.year.toString().match(/\d{4}/)?.[0] || '0');
                const yearB = parseInt(b.year.toString().match(/\d{4}/)?.[0] || '0');
                return yearB - yearA; 
            });

          if (filteredPublications.length === 0) return null;

          return (
            <div key={type} className="mb-16 md:mb-24 animate-fadeIn" 
                 style={{animationDelay: `${0.25 + typeIndex * 0.12}s`}}>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-light mb-10 md:mb-12 pb-4 border-b-2 border-primary/60 flex items-center text-shadow-neon-blue">
                <i className={`fas ${type === PublicationType.Journal ? 'fa-newspaper' : type === PublicationType.BookChapter ? 'fa-book-open' : type === PublicationType.Conference ? 'fa-bullhorn' : 'fa-lightbulb'} mr-5 text-3xl opacity-85`}></i>
                {type}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {filteredPublications.map((pub, pubIndex) => (
                  <PublicationStaticCard 
                    key={pub.id} 
                    pub={pub} 
                    delay={0.35 + typeIndex * 0.12 + pubIndex * 0.06} 
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-center mt-16 md:mt-20 animate-fadeIn" 
             style={{animationDelay: `${0.3 + publicationTypes.length * 0.12 + 0.25}s`}}>
          <Link 
            to="/citations" 
            className="btn-base gradient-bg !px-10 !py-4 text-base"
          >
            <i className="fas fa-stream"></i> 
            View All / Generate Citations
          </Link>
        </div>
      </div>
    </section>
  );
};
