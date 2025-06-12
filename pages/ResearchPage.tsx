
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { publicationsData } from '../data';
import { Publication, PublicationType, ImpactMetric } from '../types';
import { generateAPA, generateBibTeX } from '../utils/citationGenerators'; 

const ImpactMetricTag: React.FC<{ metric: ImpactMetric }> = ({ metric }) => {
  let colorClasses = "bg-theme-primary/20 text-theme-primary border-theme-primary/30"; 
  const metricValueStr = metric.value.toString().toUpperCase();

  if (metricValueStr.includes("Q1")) colorClasses = "bg-theme-accent/20 text-theme-accent border-theme-accent/30"; 
  else if (metricValueStr.includes("Q2")) colorClasses = "bg-theme-primary-light/20 text-theme-primary-light border-theme-primary-light/30";
  else if (metricValueStr.includes("ABDC")) colorClasses = "bg-theme-secondary/20 text-theme-secondary border-theme-secondary/30";
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses} shadow-sm transition-all duration-300 hover:brightness-125 border`}>
      {metric.icon && <i className={`${metric.icon} mr-1.5 text-xs opacity-80`}></i>}
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

  const getTagColor = () => { 
    return "bg-white/5 text-gray-300 border-white/10";
  }

  return (
    <div 
      id={cardId}
      className="animate-fadeIn bg-slate-800 border border-slate-700 p-5 sm:p-6 rounded-xl shadow-xl flex flex-col min-h-[580px]"
      style={{ animationDelay: `${delay}s`}} 
      tabIndex={0} 
    >
        {/* Card Content (Previously Front + Back) */}
        <div className="flex justify-between items-start mb-3">
            <div className="flex flex-wrap gap-2">
            {pub.impactMetrics?.slice(0,2).map(metric => ( 
                <ImpactMetricTag key={metric.name+metric.value} metric={metric} />
            ))}
            </div>
            <span className="text-xs text-gray-400 font-semibold ml-2 flex-shrink-0 bg-dark-color/50 px-3 py-1 rounded-full border border-white/10 shadow-sm">
            {pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")}
            </span>
        </div>

        <div className="mb-3"> {/* Title, Authors, Source Container */}
            <h3 className="text-lg md:text-xl font-bold mb-1.5 text-theme-primary-light leading-snug line-clamp-3 hover:text-theme-accent transition-colors"
                title={pub.title}>
            {pub.title}
            </h3>
            <p className="text-sm text-gray-400 mb-1 line-clamp-2">
            {pub.authors}
            </p>
            <p className="text-sm text-gray-400 line-clamp-2">
            <span className="font-medium text-gray-300">Source:</span> {pub.source}
            </p>
            {pub.status && (
            <p className="text-sm text-theme-accent mt-1.5 font-semibold">
                <i className="fas fa-info-circle mr-1.5"></i>
                {pub.status}
            </p>
            )}
        </div>
        
        <div className="my-3 flex-grow"> {/* Abstract/Summary Container */}
            <h4 className="text-md font-semibold text-theme-primary-light mb-1.5 line-clamp-2">Abstract/Summary</h4>
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-6 overflow-y-auto max-h-[160px] scrollbar-thin scrollbar-thumb-theme-primary scrollbar-track-dark-color/50 pr-1">
                {pub.summary || pub.insightSnippet || "Detailed abstract not available."}
            </p>
        </div>


        {pub.tags && pub.tags.length > 0 && (
          <div className="pt-3 border-t border-white/10 mb-4">
              <div className="flex flex-wrap gap-1.5">
              {pub.tags.slice(0, 5).map((tag) => ( 
                  <span 
                  key={tag} 
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] font-medium shadow-sm ${getTagColor()} hover:brightness-120 border`}
                  >
                  {tag}
                  </span>
              ))}
              </div>
          </div>
        )}
        
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-2.5 pt-3 border-t border-white/10">
             <button 
                onClick={() => setShowDetailsModal(true)}
                className="btn-base btn-gradient-primary text-xs !py-2 !px-3 w-full sm:w-auto flex-1 sm:flex-none" 
                aria-label={`View full abstract and citation options for ${pub.title}`}
                >
                <i className="fas fa-book-open mr-1.5"></i> Full Details & Cite
            </button>
            {(pub.doiLink && pub.doiLink !== "#" && !pub.doiLink.startsWith('http://#')) && (
              <a 
                href={pub.doiLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-base btn-outline-primary !border-theme-accent !text-theme-accent hover:!bg-theme-accent/10 text-xs !py-2 !px-3 w-full sm:w-auto flex-1 sm:flex-none" 
                aria-label={`Read full paper of ${pub.title} via DOI`}
              >
                <i className="fas fa-external-link-alt mr-1.5"></i> DOI Link
              </a>
            )}
        </div>

      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-[rgba(15,23,42,0.85)] backdrop-blur-md flex items-center justify-center z-[100] p-3 sm:p-4 animate-fadeIn" 
          onClick={() => setShowDetailsModal(false)} role="dialog" aria-modal="true" aria-labelledby={`details-title-${pub.id}`}
        >
          <div 
            className="glass-card p-6 sm:p-7 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-[var(--primary-light-color)]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 flex-shrink-0">
              <h4 id={`details-title-${pub.id}`} className="text-lg sm:text-xl md:text-[1.3rem] font-bold text-theme-primary-light line-clamp-2" title={pub.title}>
                {pub.title}
              </h4>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-gray-400 hover:text-theme-light text-3xl leading-none focus-visible-outline rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0 ml-3" aria-label="Close details modal"
              >
                &times;
              </button>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-300 mb-1.5 flex-shrink-0">
              {pub.authors} ({pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")})
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mb-5 flex-shrink-0">
              <span className="font-medium">Source:</span> {pub.source} {pub.details ? `(${pub.details})` : ''}
            </p>

            <div className="overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-theme-primary scrollbar-track-dark-color/50 pr-2.5 flex-grow min-h-[120px] sm:min-h-[150px] bg-dark-color/30 p-4 rounded-lg border border-white/10 shadow-inner">
              <h5 className="text-md sm:text-lg font-semibold text-theme-primary-light mb-3">Abstract/Summary:</h5>
              <p className="text-gray-300 text-sm leading-relaxed">
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
                    className="btn-base btn-outline-primary !border-theme-accent !text-theme-accent hover:!bg-theme-accent/10 !py-2 !px-4 text-xs sm:text-sm"
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
                    className="btn-base btn-outline-primary !border-theme-accent !text-theme-accent hover:!bg-theme-accent/10 !py-2 !px-4 text-xs sm:text-sm"
                    aria-label={`View source for ${pub.title}`}
                  >
                    <i className="fas fa-link"></i> View Source
                  </a>
                )}
              </div>


              <div className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <label htmlFor={`apa-citation-${pub.id}`} className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                    APA Citation:
                  </label>
                  <textarea
                    id={`apa-citation-${pub.id}`}
                    readOnly 
                    value={apaCitation} 
                    rows={3} 
                    className="w-full contact-input !text-xs !py-2 !px-2.5 resize-none scrollbar-thin scrollbar-thumb-theme-primary scrollbar-track-dark-color/50"
                  />
                  <button 
                    onClick={() => handleCopy(apaCitation, 'APA')} 
                    className="mt-2 btn-base !border-theme-primary !text-theme-primary hover:!bg-theme-primary/10 !py-1.5 !px-3 !text-[0.7rem]"
                  >
                    <i className="fas fa-copy"></i> Copy APA
                  </button>
                </div>
                
                <div>
                  <label htmlFor={`bibtex-citation-${pub.id}`} className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                    BibTeX:
                  </label>
                  <textarea
                    id={`bibtex-citation-${pub.id}`}
                    readOnly 
                    value={bibtexCitation} 
                    rows={4} 
                    className="w-full contact-input !text-xs !py-2 !px-2.5 resize-none scrollbar-thin scrollbar-thumb-theme-primary scrollbar-track-dark-color/50"
                  />
                  <button 
                    onClick={() => handleCopy(bibtexCitation, 'BibTeX')} 
                    className="mt-2 btn-base !border-theme-primary !text-theme-primary hover:!bg-theme-primary/10 !py-1.5 !px-3 !text-[0.7rem]"
                  >
                     <i className="fas fa-copy"></i> Copy BibTeX
                  </button>
                </div>
              </div>
            </div>
            
            {copySuccess && (
              <p role="status" aria-live="polite" className="text-xs sm:text-sm text-theme-accent mt-4 text-center flex-shrink-0 font-semibold animate-pulse"> {/* Theme pulse on success */}
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
          let headerOffset = 80; 
          if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
            const rootStyle = getComputedStyle(document.documentElement);
            const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim(); 
            headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
          }
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          
          element.classList.add(
            '!border-theme-secondary', 'shadow-2xl', 'ring-2', 'ring-theme-secondary', 'ring-offset-2', 'ring-offset-slate-800'
          );
          element.style.boxShadow = `0 0 25px var(--secondary-color)`; // More prominent shadow
          
          setTimeout(() => { 
            element.classList.remove(
              '!border-theme-secondary', 'shadow-2xl', 'ring-2', 'ring-theme-secondary', 'ring-offset-2', 'ring-offset-slate-800'
            );
            element.style.boxShadow = ''; // Reset shadow
          }, 4000); 
        }, 300); 
      }
    }
  }, []);

  return (
    <section id="research" className="py-16 md:py-20 relative animate-fadeIn"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="section-title-custom text-3xl md:text-4xl font-bold text-theme-light accented"> {/* Theme title */}
            My Research Portfolio
          </h2>
          <p className="text-lg text-gray-400 mt-5 max-w-3xl mx-auto leading-relaxed"> {/* Theme text color */}
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
              <h3 className="text-2xl md:text-3xl font-bold text-theme-primary-light mb-8 md:mb-10 pb-3.5 border-b-2 border-[var(--primary-color)]/30 flex items-center"> {/* Theme colors */}
                <i className={`fas ${type === PublicationType.Journal ? 'fa-newspaper' : type === PublicationType.BookChapter ? 'fa-book-open' : type === PublicationType.Conference ? 'fa-bullhorn' : 'fa-lightbulb'} mr-4 text-2xl opacity-75`}></i>
                {type}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8"> {/* Adjusted gap */}
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
            className="btn-base btn-gradient-primary !px-9 !py-3.5 text-md" /* Theme button */
          >
            <i className="fas fa-stream"></i> 
            View All / Generate Citations
          </Link>
        </div>
      </div>
    </section>
  );
};
