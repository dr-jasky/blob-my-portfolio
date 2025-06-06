
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicationsData } from '../data';
import { Publication, PublicationType, CitationStyle } from '../types';
import { Section } from '../components/Section';
import { generateCitation } from '../utils/citationGenerators';

const CitationEntry: React.FC<{ pub: Publication; selectedStyle: CitationStyle, delay: number }> = ({ pub, selectedStyle, delay }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const citationText = useMemo(() => generateCitation(pub, selectedStyle), [pub, selectedStyle]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500); // Display success for 2.5 seconds
    } catch (err) {
      console.error(`Failed to copy ${selectedStyle} citation: `, err);
      alert(`Failed to copy ${selectedStyle} citation.`); // Simple fallback alert
    }
  };

  return (
    <div 
      className="glass-card p-5 sm:p-6 rounded-xl shadow-lg mb-5 border-l-4 border-primary-dark animate-fadeIn transition-all duration-300 hover-card publication-card-custom"
      style={{ animationDelay: `${delay}s`, borderLeftColor: 'var(--primary-light)'}} 
      id={`citation-${pub.id}`}
    >
      <p className="text-md font-semibold text-primary-light mb-1.5 line-clamp-2" title={pub.title}>{pub.title}</p>
      <p className="text-xs text-text-muted mb-3 italic">{pub.authors} ({pub.year})</p>
      <div 
        className="p-3.5 bg-dark/60 border border-slate-600/50 rounded-lg text-xs sm:text-[0.85rem] text-text-main whitespace-pre-line break-words mb-3.5 scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-dark/50 max-h-48 overflow-y-auto backdrop-blur-sm shadow-inner" 
        aria-label={`${selectedStyle} Citation Text`}
      >
        {citationText}
      </div>
      <button
        onClick={handleCopy}
        className="btn-base btn-neon-outline !border-secondary !text-secondary hover:!bg-secondary hover:!text-dark !py-1.5 !px-3.5 !text-[0.75rem]"
        aria-label={`Copy ${selectedStyle} citation for ${pub.title}`}
      >
        <i className="fas fa-copy"></i> Copy {selectedStyle}
      </button>
      {copySuccess && (
        <span role="status" aria-live="polite" className="ml-3 text-xs sm:text-sm font-semibold text-accent animate-pulseGlow [--tw-shadow-color:var(--accent)]">
          <i className="fas fa-check-circle mr-1"></i>Copied!
        </span>
      )}
    </div>
  );
};

export const CitationsPage: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<CitationStyle>('APA');
  const citationStyles: CitationStyle[] = ['APA', 'Chicago', 'Harvard', 'Vancouver', 'MLA'];
  const publicationTypesOrder = Object.values(PublicationType);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pubId = queryParams.get('pubId');
    if (pubId) {
      const element = document.getElementById(`citation-${pubId}`);
      if (element) {
        setTimeout(() => {
          const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          element.classList.add('!border-accent', 'ring-4', 'ring-accent', 'ring-offset-4', 'ring-offset-dark', 'shadow-2xl', 'shadow-accent/60', 'transform', 'scale-105', 'z-10', 'relative');
          setTimeout(() => {
            element.classList.remove('!border-accent', 'ring-4', 'ring-accent', 'ring-offset-4', 'ring-offset-dark', 'shadow-2xl', 'shadow-accent/60', 'transform', 'scale-105', 'z-10', 'relative');
             element.classList.add('scale-100');
          }, 3500);
        }, 250);
      }
    }
  }, [location]);


  const sortedPublicationsByType = useMemo(() => {
    const grouped: { [key in PublicationType]?: Publication[] } = {};
    publicationsData.forEach(pub => {
      if (!grouped[pub.type]) {
        grouped[pub.type] = [];
      }
      grouped[pub.type]!.push(pub);
    });

    for (const type in grouped) {
      grouped[type as PublicationType]!.sort((a, b) => {
        const yearA = parseInt(a.year.toString().match(/^\d{4}/)?.[0] || '0');
        const yearB = parseInt(b.year.toString().match(/^\d{4}/)?.[0] || '0');
        return yearB - yearA; 
      });
    }
    return grouped;
  }, []);

  return (
    <div className="animate-fadeIn">
      <Section 
        title="Publication Citations" 
        id="citations"
        subtitle="Generate citations for my work in various academic styles. Select a style below to update all entries."
      >
        
        <div className="mb-12 p-5 sm:p-6 glass-card rounded-xl flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 sticky top-[calc(var(--header-height-scrolled)_+_1rem)] z-30 shadow-xl border-primary-dark/40 backdrop-blur-md">
          <span className="text-light font-semibold mb-2 sm:mb-0 sm:mr-3 text-sm sm:text-md">Select Citation Style:</span>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {citationStyles.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`btn-base !text-xs sm:!text-[0.8rem] !py-2 !px-3 sm:!px-3.5 
                  ${selectedStyle === style 
                    ? 'gradient-bg text-white ring-2 ring-offset-2 ring-offset-dark-tertiary ring-white/70 shadow-lg' 
                    : 'bg-slate-700/70 text-text-muted hover:bg-slate-600/90 hover:text-light border border-slate-600/50 backdrop-blur-sm'}`}
                aria-pressed={selectedStyle === style}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {publicationTypesOrder.map((pubType, typeIndex) => {
          const publicationsOfType = sortedPublicationsByType[pubType];
          if (!publicationsOfType || publicationsOfType.length === 0) return null;

          return (
            <div key={pubType} className="mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-[1.6rem] font-bold text-secondary mb-6 sm:mb-7 pb-3 border-b-2 border-secondary/40 flex items-center text-shadow-neon-pink">
                 <i className={`fas ${pubType === PublicationType.Journal ? 'fa-newspaper' : pubType === PublicationType.BookChapter ? 'fa-book-open' : pubType === PublicationType.Conference ? 'fa-microphone-alt' : 'fa-flask'} mr-3 sm:mr-4 text-xl sm:text-2xl opacity-75`}></i>{pubType}
              </h3>
              <div className="space-y-5">
                {publicationsOfType.map((pub, pubIndex) => (
                  <CitationEntry 
                    key={pub.id} 
                    pub={pub} 
                    selectedStyle={selectedStyle} 
                    delay={0.1 + (typeIndex * 0.05) + (pubIndex * 0.02)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
};
