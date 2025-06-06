
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
      setTimeout(() => setCopySuccess(false), 2800);
    } catch (err) {
      console.error(`Failed to copy ${selectedStyle} citation: `, err);
      alert(`Failed to copy ${selectedStyle} citation.`);
    }
  };

  return (
    <div 
      className="glass-card p-6 md:p-7 rounded-xl shadow-xl mb-6 border-l-4 border-primary-dark animate-fadeIn transition-all duration-300 hover-card publication-card-custom"
      style={{ animationDelay: `${delay}s`, borderLeftColor: 'var(--primary-light)'}} // Standardized left border
      id={`citation-${pub.id}`}
    >
      <p className="text-md font-semibold text-primary-light mb-2 line-clamp-2" title={pub.title}>{pub.title}</p>
      <p className="text-xs text-text-muted mb-3.5 italic">{pub.authors} ({pub.year})</p>
      <div 
        className="p-4 bg-dark/75 border border-slate-600/60 rounded-lg text-xs sm:text-sm text-text-main whitespace-pre-line break-words mb-4 scrollbar-thin scrollbar-thumb-primary/80 scrollbar-track-dark/60 max-h-52 overflow-y-auto backdrop-blur-sm shadow-inner" 
        aria-label={`${selectedStyle} Citation Text`}
      >
        {citationText}
      </div>
      <button
        onClick={handleCopy}
        className="btn-base btn-neon-outline !border-secondary !text-secondary hover:!bg-secondary hover:!text-dark !py-2 !px-4 !text-xs"
        aria-label={`Copy ${selectedStyle} citation for ${pub.title}`}
      >
        <i className="fas fa-copy"></i> Copy {selectedStyle}
      </button>
      {copySuccess && (
        <span role="status" aria-live="polite" className="ml-4 text-sm font-semibold text-accent animate-pulseGlow [--tw-shadow-color:var(--accent)]">
          <i className="fas fa-check-circle mr-1.5"></i>Copied!
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
          const headerOffset = 120; 
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          element.classList.add('!border-accent', 'ring-4', 'ring-accent', 'ring-offset-4', 'ring-offset-dark-secondary', 'shadow-2xl', 'shadow-accent/50', 'transform', 'scale-105');
          setTimeout(() => {
            element.classList.remove('!border-accent', 'ring-4', 'ring-accent', 'ring-offset-4', 'ring-offset-dark-secondary', 'shadow-2xl', 'shadow-accent/50', 'transform', 'scale-105');
             element.classList.add('scale-100');
          }, 4000);
        }, 300);
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
        
        <div className="mb-14 p-6 glass-card rounded-xl flex flex-col sm:flex-row justify-center items-center gap-5 sticky top-[calc(var(--header-height,90px)_+_10px)] z-30 shadow-2xl border-primary-dark/50 backdrop-blur-md">
          <span className="text-light font-semibold mb-2 sm:mb-0 sm:mr-4 text-md">Select Citation Style:</span>
          <div className="flex flex-wrap justify-center gap-3">
            {citationStyles.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`btn-base !text-xs sm:!text-sm !py-2 !px-4 
                  ${selectedStyle === style 
                    ? 'gradient-bg text-white ring-2 ring-offset-2 ring-offset-dark-tertiary ring-white/80' 
                    : 'bg-slate-700/80 text-text-muted hover:bg-slate-600/95 hover:text-light border border-slate-600/60 backdrop-blur-sm'}`}
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
            <div key={pubType} className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-7 pb-3.5 border-b-2 border-secondary/50 flex items-center text-shadow-neon-pink">
                 <i className={`fas ${pubType === PublicationType.Journal ? 'fa-newspaper' : pubType === PublicationType.BookChapter ? 'fa-book-open' : pubType === PublicationType.Conference ? 'fa-microphone-alt' : 'fa-flask'} mr-4 text-2xl opacity-80`}></i>{pubType}
              </h3>
              <div className="space-y-6">
                {publicationsOfType.map((pub, pubIndex) => (
                  <CitationEntry 
                    key={pub.id} 
                    pub={pub} 
                    selectedStyle={selectedStyle} 
                    delay={0.1 + (typeIndex * 0.06) + (pubIndex * 0.025)}
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
