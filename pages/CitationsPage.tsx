
import React, { useState, useMemo } from 'react';
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

  return (
    <div 
      className="glass-card p-5 rounded-lg shadow-lg mb-4 border-l-4 border-primary animate-fadeIn transition-all duration-300 hover:border-primary-light hover:shadow-xl"
      style={{ animationDelay: `${delay}s`}}
      id={pub.id} // Added ID for potential deep linking from research page
    >
      <p className="text-sm font-semibold text-primary-light mb-1">{pub.title}</p>
      <p className="text-xs text-text-muted mb-2 italic">{pub.authors} ({pub.year})</p>
      <div 
        className="p-3 bg-dark/60 border border-gray-700/60 rounded text-xs sm:text-sm text-text-muted whitespace-pre-line break-words mb-3 scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-dark/30 max-h-40 overflow-y-auto" 
        aria-label={`${selectedStyle} Citation Text`}
      >
        {citationText}
      </div>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 text-xs bg-secondary/80 text-white rounded hover:bg-secondary transition-colors focus-visible-outline transform hover:scale-105"
        aria-label={`Copy ${selectedStyle} citation for ${pub.title}`}
      >
        <i className="fas fa-copy mr-1.5"></i> Copy {selectedStyle}
      </button>
      {copySuccess && (
        <span role="status" aria-live="polite" className="ml-3 text-sm font-semibold text-accent animate-pulseGlow [--tw-shadow-color:theme('colors.accent')]">
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
        
        <div className="mb-10 p-4 glass-card rounded-lg flex flex-col sm:flex-row justify-center items-center gap-3 sticky top-24 z-30 shadow-xl border border-primary-dark/30">
          <span className="text-light font-medium mb-2 sm:mb-0 sm:mr-3">Select Citation Style:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {citationStyles.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 focus-visible-outline
                  ${selectedStyle === style 
                    ? 'gradient-bg text-white shadow-md ring-2 ring-offset-2 ring-offset-dark-secondary ring-white/70' 
                    : 'bg-slate-700/60 text-text-muted hover:bg-slate-600/80 hover:text-light'}`}
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
            <div key={pubType} className="mb-10">
              <h3 className="text-2xl font-semibold text-secondary mb-5 pb-2 border-b-2 border-secondary/30 flex items-center">
                 <i className="fas fa-bookmark mr-3 opacity-80"></i>{pubType}
              </h3>
              <div className="space-y-4">
                {publicationsOfType.map((pub, pubIndex) => (
                  <CitationEntry 
                    key={pub.id} 
                    pub={pub} 
                    selectedStyle={selectedStyle} 
                    delay={0.1 + (typeIndex * 0.05) + (pubIndex * 0.02)} // Staggered animation
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
