
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { publicationsData } from '../data';
import { Publication, PublicationType, ImpactMetric } from '../types';
import { generateAPA, generateBibTeX } from '../utils/citationGenerators'; 

const ImpactMetricTag: React.FC<{ metric: ImpactMetric }> = ({ metric }) => {
  let colorClasses = "bg-cyan-700/70 text-cyan-100 border-cyan-500/60"; 
  const metricValueStr = metric.value.toString().toUpperCase();

  if (metricValueStr.includes("Q1")) colorClasses = "bg-green-600/70 text-green-50 border-green-400/60"; 
  else if (metricValueStr.includes("Q2")) colorClasses = "bg-yellow-600/70 text-yellow-50 border-yellow-400/60"; 
  else if (metricValueStr.includes("ABDC: A")) colorClasses = "bg-red-600/70 text-red-50 border-red-400/60";
  else if (metricValueStr.includes("ABDC: B")) colorClasses = "bg-indigo-600/70 text-indigo-50 border-indigo-400/60";
  else if (metricValueStr.includes("ABDC: C")) colorClasses = "bg-purple-600/70 text-purple-50 border-purple-400/60";
  
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold ${colorClasses} shadow-sm transition-all duration-300 hover:brightness-125 border backdrop-blur-sm`}>
      {metric.icon && <i className={`${metric.icon} mr-2 text-xs opacity-80`}></i>}
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
      setTimeout(() => setCopySuccess(''), 2500); 
    } catch (err) {
      setCopySuccess(`Failed to copy ${type}.`);
      setTimeout(() => setCopySuccess(''), 2500);
    }
  };

  const cardId = `pub-${pub.id}`;

  const getTagColor = (index: number) => {
    const colors = [
      "bg-primary/15 text-primary-light border-primary/30",
      "bg-secondary/15 text-secondary border-secondary/30", 
      "bg-accent/15 text-accent border-accent/30", 
      "bg-teal-700/30 text-teal-200 border-teal-600/40",
    ];
    return colors[index % colors.length];
  }

  return (
    <div 
      id={cardId} 
      className="glass-card p-5 sm:p-6 rounded-xl shadow-lg hover-card min-h-[380px] sm:min-h-[400px] flex flex-col animate-fadeIn focus-visible-outline publication-card-custom"
      style={{ animationDelay: `${delay}s`}}
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowDetailsModal(true);}}}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2.5">
          {pub.impactMetrics?.slice(0,2).map(metric => ( 
            <ImpactMetricTag key={metric.name+metric.value} metric={metric} />
          ))}
        </div>
        <span className="text-xs text-text-darker-muted font-semibold ml-2 flex-shrink-0 bg-dark-tertiary/60 px-3 py-1 rounded-md border border-slate-600/60 backdrop-blur-sm shadow-sm">
          {pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")}
        </span>
      </div>

      <div className="flex-grow mb-5">
        <h3 className="text-lg md:text-[1.15rem] font-bold mb-2 text-light leading-snug line-clamp-3"
            title={pub.title}>
          {pub.title}
        </h3>
        <p className="text-xs text-text-muted mb-2.5 line-clamp-2">
          {pub.authors}
        </p>
        <p className="text-xs text-text-darker-muted line-clamp-2">
          <span className="font-medium text-text-muted">Source:</span> {pub.source}
        </p>
        {pub.status && (
          <p className="text-sm text-accent mt-2.5 font-semibold">
            <i className="fas fa-info-circle mr-2"></i>
            {pub.status}
          </p>
        )}
      </div>

      <div className="mt-auto">
        {pub.tags && pub.tags.length > 0 && (
          <div className="pt-3.5 border-t border-slate-700/50 mb-5">
            <div className="flex flex-wrap gap-2">
              {pub.tags.slice(0, 3).map((tag, index) => ( 
                <span 
                  key={tag} 
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium shadow-sm ${getTagColor(index)} hover:brightness-120 border backdrop-blur-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <button 
          onClick={() => setShowDetailsModal(true)}
          className="w-full btn-base gradient-bg !py-3 !px-4 text-sm"
          aria-label={`View abstract and citation for ${pub.title}`}
        >
          <i className="fas fa-book-open"></i> View Abstract & Cite
        </button>
      </div>

      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-dark/85 backdrop-blur-xl flex items-center justify-center z-[100] p-3 sm:p-4 animate-fadeIn"
          onClick={() => setShowDetailsModal(false)} role="dialog" aria-modal="true" aria-labelledby={`details-title-${pub.id}`}
        >
          <div 
            className="glass-card p-6 sm:p-7 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-primary-light/60" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 flex-shrink-0">
              <h4 id={`details-title-${pub.id}`} className="text-lg sm:text-xl md:text-[1.3rem] font-bold text-light line-clamp-2" title={pub.title}>
                {pub.title}
              </h4>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-text-muted hover:text-light text-3xl leading-none focus-visible-outline rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-700/60 transition-colors flex-shrink-0 ml-3" aria-label="Close details modal"
              >
                &times;
              </button>
            </div>
            
            <p className="text-xs sm:text-sm text-text-darker-muted mb-1.5 flex-shrink-0">
              {pub.authors} ({pub.year})
            </p>
            <p className="text-xs sm:text-sm text-text-darker-muted mb-5 flex-shrink-0">
              <span className="font-medium text-text-muted">Source:</span> {pub.source} {pub.details ? `(${pub.details})` : ''}
            </p>

            <div className="overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-dark-tertiary pr-2.5 flex-grow min-h-[150px] sm:min-h-[180px] bg-dark-tertiary/60 backdrop-blur-md p-4 rounded-lg border border-slate-500/50 shadow-inner">
              <h5 className="text-md sm:text-lg font-semibold text-primary-light mb-3">Abstract/Summary:</h5>
              <p className="text-text-muted text-sm leading-relaxed">
                {pub.summary || pub.insightSnippet || "Detailed abstract not available for this publication."}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="flex flex-wrap gap-3 mb-6">
                {(pub.doiLink && pub.doiLink !== "#" && !pub.doiLink.startsWith('http://#')) && (
                  <a 
                    href={pub.doiLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-base gradient-bg-alt !py-2.5 !px-5 text-xs sm:text-sm"
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
                    className="btn-base gradient-bg-alt !py-2.5 !px-5 text-xs sm:text-sm"
                    aria-label={`View source for ${pub.title}`}
                  >
                    <i className="fas fa-link"></i> View Source
                  </a>
                )}
              </div>

              <div className="space-y-5 border-t border-slate-700/60 pt-5">
                <div>
                  <label htmlFor={`apa-citation-${pub.id}`} className="block text-xs sm:text-sm font-medium text-text-muted mb-2">
                    APA Citation:
                  </label>
                  <textarea
                    id={`apa-citation-${pub.id}`}
                    readOnly 
                    value={apaCitation} 
                    rows={3} 
                    className="w-full premium-input !text-xs !py-2.5 !px-3 resize-none scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-dark/50"
                  />
                  <button 
                    onClick={() => handleCopy(apaCitation, 'APA')} 
                    className="mt-2.5 btn-base btn-neon-outline !border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-dark !py-1.5 !px-3 !text-[0.7rem]"
                  >
                    <i className="fas fa-copy"></i> Copy APA
                  </button>
                </div>
                
                <div>
                  <label htmlFor={`bibtex-citation-${pub.id}`} className="block text-xs sm:text-sm font-medium text-text-muted mb-2">
                    BibTeX:
                  </label>
                  <textarea
                    id={`bibtex-citation-${pub.id}`}
                    readOnly 
                    value={bibtexCitation} 
                    rows={4} 
                    className="w-full premium-input !text-xs !py-2.5 !px-3 resize-none scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-dark/50"
                  />
                  <button 
                    onClick={() => handleCopy(bibtexCitation, 'BibTeX')} 
                    className="mt-2.5 btn-base btn-neon-outline !border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-dark !py-1.5 !px-3 !text-[0.7rem]"
                  >
                     <i className="fas fa-copy"></i> Copy BibTeX
                  </button>
                </div>
              </div>
            </div>
            
            {copySuccess && (
              <p role="status" aria-live="polite" className="text-xs sm:text-sm text-accent mt-5 text-center flex-shrink-0 font-semibold animate-pulseGlow [--tw-shadow-color:var(--accent)]">
                <i className="fas fa-check-circle mr-2"></i>{copySuccess}
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
          const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          
          // Enhanced highlighting
          element.classList.add(
            '!border-accent', // Ensure important to override other borders
            'ring-4', 
            'ring-accent', 
            'ring-offset-4', 
            'ring-offset-dark', // Use main dark bg for offset
            'shadow-2xl', 'shadow-accent/70', // More prominent shadow
            'z-20', // Ensure it's above other cards if they overlap during scroll
            'relative', 
            'transition-all', 'duration-700', 'ease-out', 'transform', 'scale-105'
          );
          
          setTimeout(() => { // Remove highlight after some time
            element.classList.remove(
              '!border-accent', 
              'ring-4', 
              'ring-accent', 
              'ring-offset-4', 
              'ring-offset-dark',
              'shadow-2xl', 'shadow-accent/70',
              'z-20', 
              'relative', 'transform', 'scale-105'
            );
            element.classList.add('scale-100'); // Ensure it returns to normal scale
          }, 4000); // Keep highlight for 4 seconds
        }, 300); // Delay to allow page rendering
      }
    }
  }, []);

  return (
    <section id="research" className="py-16 md:py-20 relative animate-fadeIn"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold text-light">
            My Research Portfolio
          </h2>
          <p className="text-md md:text-lg text-text-muted mt-5 max-w-3xl mx-auto leading-relaxed">
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
            <div key={type} className="mb-14 md:mb-20 animate-fadeIn" 
                 style={{animationDelay: `${0.2 + typeIndex * 0.1}s`}}>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-light mb-8 md:mb-10 pb-3.5 border-b-2 border-primary/50 flex items-center text-shadow-neon-blue">
                <i className={`fas ${type === PublicationType.Journal ? 'fa-newspaper' : type === PublicationType.BookChapter ? 'fa-book-open' : type === PublicationType.Conference ? 'fa-bullhorn' : 'fa-lightbulb'} mr-4 text-2xl opacity-75`}></i>
                {type}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
                {filteredPublications.map((pub, pubIndex) => (
                  <PublicationStaticCard 
                    key={pub.id} 
                    pub={pub} 
                    delay={0.3 + typeIndex * 0.1 + pubIndex * 0.05} 
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-center mt-14 md:mt-16 animate-fadeIn" 
             style={{animationDelay: `${0.25 + publicationTypes.length * 0.1 + 0.2}s`}}>
          <Link 
            to="/citations" 
            className="btn-base gradient-bg !px-9 !py-3.5 text-md"
          >
            <i className="fas fa-stream"></i> 
            View All / Generate Citations
          </Link>
        </div>
      </div>
    </section>
  );
};
