
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { publicationsData } from '../data';
import { Publication, PublicationType, ImpactMetric } from '../types';
import { generateAPA, generateBibTeX } from '../utils/citationGenerators'; 

const ImpactMetricTag: React.FC<{ metric: ImpactMetric }> = ({ metric }) => {
  let colorClasses = "bg-neon-blue/30 text-neon-blue border-neon-blue/50"; 
  const metricValueStr = metric.value.toString().toUpperCase();

  if (metricValueStr.includes("Q1")) {
    colorClasses = "bg-neon-green/30 text-neon-green border-neon-green/50"; 
  } else if (metricValueStr.includes("Q2")) {
    colorClasses = "bg-neon-blue/40 text-neon-blue border-neon-blue/60"; 
  } else if (metricValueStr.includes("Q3")) {
    colorClasses = "bg-neon-purple/30 text-neon-purple border-neon-purple/50";
  } else if (metricValueStr.includes("ABDC: A*") || metricValueStr.includes("ABDC: A")) {
    colorClasses = "bg-neon-pink/40 text-neon-pink border-neon-pink/60";
  } else if (metricValueStr.includes("ABDC: B")) {
    colorClasses = "bg-indigo-700/40 text-indigo-300 border-indigo-500/60"; // Kept indigo for variety if needed
  } else if (metricValueStr.includes("ABDC: C")) { 
    colorClasses = "bg-purple-700/40 text-purple-300 border-purple-500/60"; // Kept purple for variety
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClasses} shadow-sm transition-all duration-300 hover:brightness-125 border`}>
      {metric.icon && <i className={`${metric.icon} mr-1 text-xs opacity-80`}></i>}
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
      "bg-neon-blue/20 text-neon-blue border-neon-blue/40",
      "bg-neon-pink/20 text-neon-pink border-neon-pink/40",
      "bg-neon-green/20 text-neon-green border-neon-green/40",
      "bg-neon-purple/20 text-neon-purple border-neon-purple/40",
    ];
    return colors[index % colors.length];
  }

  return (
    <div 
      id={cardId} 
      className="glass-card p-5 rounded-xl shadow-lg hover-card h-full min-h-[340px] sm:min-h-[360px] flex flex-col transition-all duration-300 animate-fadeIn focus-visible-outline border-2 border-transparent hover:border-neon-blue" // hover border to neon-blue
      style={{ animationDelay: `${delay}s`}}
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowDetailsModal(true);}}
    >
      {/* Top Section: Year & Metrics */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-1.5">
          {pub.impactMetrics?.map(metric => (
            <ImpactMetricTag key={metric.name+metric.value} metric={metric} />
          ))}
        </div>
        <span className="text-sm text-text-light-secondary font-semibold ml-2 flex-shrink-0">
          {pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")}
        </span>
      </div>

      {/* Middle Section: Core Info (Title, Authors, Source) */}
      <div className="flex-grow mb-3">
        <h3 className="text-lg font-semibold mb-1.5 text-text-light-primary leading-tight line-clamp-4"
            title={pub.title}>
          {pub.title}
        </h3>
        <p className="text-xs text-text-muted mb-1.5 line-clamp-2">
          {pub.authors}
        </p>
        <p className="text-xs text-text-darker-muted line-clamp-2">
          <span className="font-medium text-text-muted">Source:</span> {pub.source}
        </p>
        {pub.status && (
          <p className="text-xs text-neon-green mt-1.5"> {/* text-neon-green for status */}
            <i className="fas fa-info-circle mr-1"></i>
            {pub.status}
          </p>
        )}
      </div>

      {/* Bottom Section: Tags & Action Button */}
      <div className="mt-auto">
        {pub.tags && pub.tags.length > 0 && (
          <div className="pt-2 border-t border-dark-tertiary/50 mb-4"> {/* border-dark-tertiary */}
            <div className="flex flex-wrap gap-1.5">
              {pub.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={tag} 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-medium shadow-sm ${getTagColor(index)} hover:brightness-125 border`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <button 
          onClick={() => setShowDetailsModal(true)}
          className="w-full gradient-bg text-dark-primary py-2.5 px-3 rounded-lg text-center text-sm font-medium hover:opacity-90 transition transform hover:scale-[1.02] focus-visible-outline"
          aria-label={`View abstract and citation for ${pub.title}`}
        >
          <i className="fas fa-book-open mr-1.5"></i> View Abstract & Cite
        </button>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-[100] p-4 animate-fadeIn"
          onClick={() => setShowDetailsModal(false)} role="dialog" aria-modal="true" aria-labelledby={`details-title-${pub.id}`}
        >
          <div 
            className="bg-dark-secondary p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-neon-blue/30" // bg-dark-secondary, border-neon-blue
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h4 id={`details-title-${pub.id}`} className="text-xl font-bold text-text-light-primary line-clamp-2" title={pub.title}>
                {pub.title}
              </h4>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-text-muted hover:text-text-light-primary text-3xl leading-none focus-visible-outline rounded-full w-8 h-8 flex items-center justify-center hover:bg-dark-tertiary/50 transition-colors flex-shrink-0 ml-4" aria-label="Close details modal"
              >
                &times;
              </button>
            </div>
            
            <p className="text-xs text-text-darker-muted mb-1 flex-shrink-0">
              {pub.authors} ({pub.year})
            </p>
            <p className="text-xs text-text-darker-muted mb-4 flex-shrink-0">
              <span className="font-medium">Source:</span> {pub.source} {pub.details ? `(${pub.details})` : ''}
            </p>

            <div className="overflow-y-auto mb-5 scrollbar-thin scrollbar-thumb-neon-blue scrollbar-track-dark-tertiary pr-2 flex-grow min-h-[120px]">
              <h5 className="text-md font-semibold text-neon-blue mb-2">Abstract/Summary:</h5>
              <p className="text-text-muted text-sm leading-relaxed">
                {pub.summary || pub.insightSnippet || "Detailed abstract not available for this publication."}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="flex flex-wrap gap-3 mb-5">
                {(pub.doiLink && pub.doiLink !== "#" && !pub.doiLink.startsWith('http://#')) && (
                  <a 
                    href={pub.doiLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-neon-blue/80 text-dark-primary py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-neon-blue transition focus-visible-outline transform hover:scale-105"
                    aria-label={`Read full paper of ${pub.title} via DOI`}
                  >
                    <i className="fas fa-external-link-alt mr-1.5"></i> DOI Link
                  </a>
                )}
                {(!pub.doiLink || pub.doiLink === "#" || pub.doiLink.startsWith('http://#')) && pub.link && (
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-neon-blue/80 text-dark-primary py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-neon-blue transition focus-visible-outline transform hover:scale-105"
                    aria-label={`View source for ${pub.title}`}
                  >
                    <i className="fas fa-link mr-1.5"></i> View Source
                  </a>
                )}
              </div>

              <div className="space-y-3 border-t border-dark-tertiary/50 pt-4"> {/* border-dark-tertiary */}
                <div>
                  <label htmlFor={`apa-citation-${pub.id}`} className="block text-sm font-medium text-text-muted mb-1">
                    APA:
                  </label>
                  <textarea
                    id={`apa-citation-${pub.id}`}
                    readOnly 
                    value={apaCitation} 
                    rows={3} 
                    className="w-full p-2 text-xs bg-dark-primary/60 border border-dark-tertiary/70 rounded-md text-text-muted focus:outline-none focus:ring-1 focus:ring-neon-blue resize-none scrollbar-thin scrollbar-thumb-neon-blue/70 scrollbar-track-dark-primary/30" // bg-dark-primary
                  />
                  <button 
                    onClick={() => handleCopy(apaCitation, 'APA')} 
                    className="mt-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md transition-colors focus-visible-outline"
                  >
                    Copy APA
                  </button>
                </div>
                
                <div>
                  <label htmlFor={`bibtex-citation-${pub.id}`} className="block text-sm font-medium text-text-muted mb-1">
                    BibTeX:
                  </label>
                  <textarea
                    id={`bibtex-citation-${pub.id}`}
                    readOnly 
                    value={bibtexCitation} 
                    rows={4} 
                    className="w-full p-2 text-xs bg-dark-primary/60 border border-dark-tertiary/70 rounded-md text-text-muted focus:outline-none focus:ring-1 focus:ring-neon-blue resize-none scrollbar-thin scrollbar-thumb-neon-blue/70 scrollbar-track-dark-primary/30" // bg-dark-primary
                  />
                  <button 
                    onClick={() => handleCopy(bibtexCitation, 'BibTeX')} 
                    className="mt-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md transition-colors focus-visible-outline"
                  >
                    Copy BibTeX
                  </button>
                </div>
              </div>
            </div>
            
            {copySuccess && (
              <p role="status" aria-live="polite" className="text-sm text-neon-green mt-3 text-center flex-shrink-0 font-semibold">
                <i className="fas fa-check-circle mr-1.5"></i>{copySuccess}
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
          const headerOffset = 100; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          
          element.classList.add(
            'ring-4', 
            'ring-neon-pink', // Use a neon color for highlight
            'ring-offset-4', 
            'ring-offset-dark-secondary', 
            'rounded-xl',
            'shadow-2xl', 'shadow-neon-pink', // Neon shadow
            'z-10', 
            'relative', 
            'transition-all', 'duration-500', 'ease-out' 
          );
          
          setTimeout(() => {
            element.classList.remove(
              'ring-4', 
              'ring-neon-pink', 
              'ring-offset-4', 
              'ring-offset-dark-secondary',
              'shadow-2xl', 'shadow-neon-pink',
              'z-10',
              'relative'
            );
             element.classList.remove('transition-all', 'duration-500', 'ease-out');
          }, 4500); 
        }, 300); 
      }
    }
  }, []);

  return (
    <section id="research" className="py-16 md:py-20 relative animate-fadeIn"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold text-text-light-primary">
            My Research Portfolio
          </h2>
          <p className="text-lg md:text-xl text-text-muted mt-4 max-w-3xl mx-auto">
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
            <div key={type} className="mb-12 md:mb-16 animate-fadeIn" 
                 style={{animationDelay: `${0.2 + typeIndex * 0.1}s`}}>
              <h3 className="text-2xl md:text-3xl font-semibold text-neon-blue mb-6 md:mb-8 pb-2 border-b-2 border-neon-blue/30"> {/* text-neon-blue, border-neon-blue */}
                {type}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
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
        
        <div className="flex justify-center mt-12 animate-fadeIn" 
             style={{animationDelay: `${0.2 + publicationTypes.length * 0.1 + 0.2}s`}}>
          <Link 
            to="/citations" 
            className="gradient-bg text-dark-primary px-8 py-3.5 rounded-full font-semibold flex items-center hover:shadow-lg hover:shadow-neon-blue/40 transition-all duration-300 transform hover:scale-105 focus-visible-outline text-base" // text-dark-primary for contrast
          >
            <i className="fas fa-stream mr-2.5"></i> 
            View All Publications / Generate Citations
          </Link>
        </div>
      </div>
    </section>
  );
};
