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
      setTimeout(() => setCopySuccess(false), 2500); 
    } catch (err) {
      console.error(`Failed to copy ${selectedStyle} citation: `, err);
      alert(`Failed to copy ${selectedStyle} citation.`); 
    }
  };
  
  const accentColor = 'var(--primary-color)'; // Or cycle through theme colors

  return (
    <div 
      className="glass-card p-5 sm:p-6 rounded-xl shadow-lg mb-5 border-l-4 publication-card-custom hover-card animate-fadeIn" // Theme cards
      style={{ animationDelay: `${delay}s`, borderLeftColor: accentColor}} 
      id={`citation-${pub.id}`}
    >
      <p className="text-md font-semibold text-theme-primary-light mb-1.5 line-clamp-2" title={pub.title}>{pub.title}</p>
      <p className="text-xs text-gray-400 mb-3 italic">{pub.authors} ({pub.year})</p>
      <div 
        className="p-3.5 bg-dark-color/30 border border-white/10 rounded-lg text-xs sm:text-[0.85rem] text-gray-300 whitespace-pre-line break-words mb-3.5 scrollbar-thin scrollbar-thumb-theme-primary scrollbar-track-dark-color/50 max-h-48 overflow-y-auto shadow-inner" 
        aria-label={`${selectedStyle} Citation Text`}
      >
        {citationText}
      </div>
      <button
        onClick={handleCopy}
        className="btn-base !border-[var(--primary-color)] !text-[var(--primary-color)] hover:!bg-[rgba(from_var(--primary-color)_r_g_b_/_0.1)] !py-1.5 !px-3.5 !text-[0.75rem]" // Theme button style
        aria-label={`Copy ${selectedStyle} citation for ${pub.title}`}
      >
        <i className="fas fa-copy"></i> Copy {selectedStyle}
      </button>
      {copySuccess && (
        <span role="status" aria-live="polite" className="ml-3 text-xs sm:text-sm font-semibold text-theme-accent animate-pulse"> {/* Theme accent and pulse */}
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
          const headerOffsetValue = getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled-base-val').trim();
          const headerOffset = parseFloat(headerOffsetValue.replace('rem',''))*16 || 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          // Enhanced focus style from new theme
          element.classList.add('!border-theme-secondary', 'shadow-lg'); 
          element.style.boxShadow = `0 0 20px var(--secondary-color)`;
          setTimeout(() => {
            element.classList.remove('!border-theme-secondary', 'shadow-lg');
            element.style.boxShadow = '';
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
        titleClassName="accented"
      >
        
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 glass-card rounded-xl flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 sticky top-[calc(var(--header-height-scrolled-base-val)_+_1rem)] z-30 shadow-xl border-[var(--primary-color)]/20"> {/* Theme card */}
          <span className="text-theme-light font-semibold mb-2 sm:mb-0 sm:mr-3 text-sm sm:text-md">Select Citation Style:</span>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {citationStyles.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`btn-base !text-xs sm:!text-[0.8rem] !py-2 !px-3 sm:!px-3.5 
                  ${selectedStyle === style 
                    ? 'btn-gradient-primary text-theme-dark ring-2 ring-offset-2 ring-offset-dark-color ring-white/70 shadow-lg' // Theme gradient button for active
                    : 'bg-dark-color/50 text-gray-300 hover:bg-dark-color/70 hover:text-theme-light border border-white/10'}`} // Theme style for inactive
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
              <h3 className="text-xl sm:text-2xl md:text-[1.6rem] font-bold text-theme-secondary mb-6 sm:mb-7 pb-3 border-b-2 border-[var(--secondary-color)]/30 flex items-center"> {/* Theme secondary color */}
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
