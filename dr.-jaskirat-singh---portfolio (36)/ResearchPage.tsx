
import React, { useState, useEffect, useMemo } from 'react';
import { publicationsData } from './data';
import { Publication, PublicationType, ImpactMetric } from './types';
import { Section } from './components/Section';
import { generateAPA, generateBibTeX, getJournalParts as getJournalPartsUtil } from './utils/citationGenerators';

const ImpactMetricBadge: React.FC<{ metric: ImpactMetric }> = ({ metric }) => {
  let colorClass = 'bg-neon-blue/20 text-neon-blue';
  if (metric.value.toString().startsWith('Q1')) colorClass = 'bg-neon-green/20 text-neon-green';
  else if (metric.value.toString().startsWith('Q2')) colorClass = 'bg-neon-blue/30 text-neon-blue';
  else if (metric.name.toLowerCase().includes('abdc')) colorClass = 'bg-neon-pink/20 text-neon-pink';

  return (
    <span className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full ${colorClass} border border-current/50`}>
      {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}
      {metric.name && <span className="font-normal mr-1">{metric.name}:</span>} {metric.value}
    </span>
  );
};

const PublicationCard: React.FC<{ pub: Publication }> = ({ pub }) => {
  const [showCitations, setShowCitations] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const apaCitation = useMemo(() => generateAPA(pub), [pub]);
  const bibtexCitation = useMemo(() => generateBibTeX(pub), [pub]);

  const handleCopy = async (textToCopy: string, type: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error(`Failed to copy ${type}: `, err);
      setCopySuccess(`Failed to copy ${type}.`);
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };
  
  const scholarlyArticleData = useMemo(() => {
    const authorsArray = pub.authors.split(/,\s*(?:and|&)\s*|;\s*|,\s+/).map(name => name.trim()).filter(Boolean);
    const authorsSchema = authorsArray.map(name => ({
      "@type": "Person",
      "name": name
    }));

    const yearString = pub.year.toString();
    let publishedDate = yearString.match(/^\d{4}/)?.[0] || yearString; // Extract YYYY from "YYYY (Expected)" or "Communicated YYYY"
    if (yearString.toLowerCase().includes("expected") && publishedDate) {
        // For "2025 (Expected)", schema.org expects YYYY-MM-DD or YYYY. 
        // Let's just use the year for simplicity.
    }


    const data: any = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": pub.title,
      "author": authorsSchema.length > 1 ? authorsSchema : (authorsSchema[0] || { "@type": "Person", "name": pub.authors }),
      "datePublished": publishedDate,
      "abstract": pub.summary || pub.insightSnippet || undefined,
      "keywords": pub.tags?.join(', ') || undefined,
    };
    
    if (pub.doiLink) {
      data.url = pub.doiLink;
      data.sameAs = pub.doiLink;
      data.identifier = {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": pub.doiLink.replace("https://doi.org/", "")
      };
    } else if (pub.link) {
      data.url = pub.link;
    }


    if (pub.type === PublicationType.Journal) {
      const { volume, issue, pages } = getJournalPartsUtil(pub.details);
      data.isPartOf = {
        "@type": "PublicationIssue", // More specific than Periodical for journal articles
        "isPartOf": {
            "@type": "Periodical",
            "name": pub.source,
        },
        ...(volume && { "issueNumber": issue || "N/A" , "volumeNumber": volume}), // issueNumber is required for PublicationIssue
      };
      if (pages) data.pagination = pages;

    } else if (pub.type === PublicationType.BookChapter) {
      let bookTitle = pub.source;
      const inMatch = pub.source.match(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?(.*?)(?:\s+\(pp\. .*?\))?\.$/i);
      if (inMatch && inMatch[1]) bookTitle = inMatch[1].trim();
      else bookTitle = pub.source.replace(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?/i, '').replace(/\.$/, '').trim();
      
      let publisherName;
      let pages;
      if(pub.details) {
        const publisherMatch = pub.details.match(/^([^\[(.,]+)/);
        if(publisherMatch && !publisherMatch[1].toLowerCase().includes('isbn') && publisherMatch[1].trim().length > 1 ) publisherName = publisherMatch[1].trim();
        const pageMatch = pub.details.match(/pp\.\s*([\d\w-]+)/);
        if (pageMatch) pages = pageMatch[1];
      }

      data.isPartOf = {
        "@type": "Book",
        "name": bookTitle,
        ...(publisherName && { "publisher": { "@type": "Organization", "name": publisherName }}),
      };
      if (pages) data.pagination = pages;

    } else if (pub.type === PublicationType.Conference) {
        data.isPartOf = {
            "@type": "Event", // Conference proceeding is part of an Event
            "name": pub.source, 
        };
        if (pub.details) {
            const detailsCleaned = pub.details.replace('Poster Accepted. Presentation: ', '');
            const locationMatch = detailsCleaned.match(/,\s*([^,]+,\s*[^,]+)$/); // "City, Country"
            if(locationMatch && locationMatch[1]) data.locationCreated = { "@type": "Place", "name": locationMatch[1].trim()};
            else if (detailsCleaned.includes(',')) data.description = detailsCleaned; // Fallback for other details
        }
    } else if (pub.type === PublicationType.Report) {
        data.isPartOf = {
            "@type": "PublicationVolume", // Reports can be part of a series or standalone
            "name": pub.source, // Institution or series name
        };
        if(pub.details) data.description = pub.details;
    }
    
    // Clean up undefined properties recursively
    const removeUndefined = (obj: any) => {
      if (typeof obj !== 'object' || obj === null) return obj;
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined || obj[key] === null || (typeof obj[key] === 'string' && !obj[key].trim())) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          removeUndefined(obj[key]);
          if (Object.keys(obj[key]).length === 0 && !(obj[key] instanceof Array && obj[key].length > 0)) {
             delete obj[key]; // Delete empty objects unless it's a non-empty array
          }
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map((item: any) => removeUndefined(item)).filter((item: any) => item !== undefined && item !== null && (typeof item !== 'object' || Object.keys(item).length > 0));
            if(obj[key].length === 0) delete obj[key];
        }
      });
      return obj;
    };
    
    return removeUndefined(JSON.parse(JSON.stringify(data))); // Deep clone and clean
  }, [pub]);

  return (
    <div id={pub.id} className="bg-dark-secondary p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-6 border-l-4 border-neon-blue hover:border-neon-pink focus-within:ring-2 focus-within:ring-neon-pink focus-within:border-neon-pink transform hover:-translate-y-1.5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleData) }} />
      
      <h3 className="text-xl font-semibold text-neon-blue mb-2">{pub.title}</h3>
      <p className="text-sm text-light-secondary mb-1 italic">{pub.authors}</p>
      <p className="text-sm text-light-primary mb-1">
        <span className="font-medium">Source:</span> {pub.source}, <span className="font-medium">Year:</span> {pub.year}
      </p>
      {pub.details && <p className="text-sm text-light-secondary/80 mb-2">{pub.details}</p>}
      {pub.status && <p className="text-sm text-neon-green font-medium mb-2"><i className="fas fa-info-circle mr-1"></i>Status: {pub.status}</p>}
      
      {pub.summary && (
        <div className="my-3 p-4 bg-dark-primary/50 border-l-2 border-neon-blue/50 rounded-md text-sm text-light-secondary italic">
          {pub.summary}
        </div>
      )}

      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="my-3">
          {pub.impactMetrics.map(metric => <ImpactMetricBadge key={metric.name + metric.value} metric={metric} />)}
        </div>
      )}

      {pub.tags && pub.tags.length > 0 && (
        <div className="mt-3 mb-2">
          {pub.tags.map(tag => (
            <span key={tag} className="inline-block bg-dark-tertiary text-light-secondary/80 text-xs font-medium mr-2 mb-1 px-2 py-1 rounded-md border border-neon-blue/20">
              <i className="fas fa-tag mr-1 opacity-70"></i>{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-center">
        {pub.doiLink && (
          <a
            href={pub.doiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-pink hover:text-opacity-80 hover:underline text-sm font-medium transition-colors duration-300"
            aria-label={`Read full paper of ${pub.title} via DOI`}
          >
            <i className="fas fa-link mr-1"></i> DOI Link
          </a>
        )}
        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-pink hover:text-opacity-80 hover:underline text-sm font-medium transition-colors duration-300"
            aria-label={`View details for ${pub.title}`}
          >
            <i className="fas fa-external-link-alt mr-1"></i> View Source
          </a>
        )}
        <button 
          onClick={() => setShowCitations(!showCitations)}
          className="text-neon-green hover:text-opacity-80 hover:underline text-sm font-medium transition-colors duration-300 py-1 px-2 rounded bg-dark-primary/50 border border-neon-green/30 hover:border-neon-green"
          aria-expanded={showCitations}
          aria-controls={`citations-${pub.id}`}
        >
          <i className={`fas ${showCitations ? 'fa-minus-circle' : 'fa-quote-right'} mr-1`}></i> Cite
        </button>
      </div>

      {showCitations && (
        <div id={`citations-${pub.id}`} className="mt-4 p-4 bg-dark-primary/70 rounded-md border border-neon-blue/30 space-y-4 animate-fadeIn">
          <div>
            <h4 className="text-md font-semibold text-neon-blue mb-1">APA Citation:</h4>
            <div className="p-3 bg-dark-tertiary rounded text-sm text-light-secondary/90 whitespace-pre-wrap break-words" aria-label="APA Citation Text">
              {apaCitation}
            </div>
            <button 
              onClick={() => handleCopy(apaCitation, 'APA Citation')}
              className="mt-2 px-3 py-1 text-xs bg-neon-blue text-dark-primary rounded hover:bg-opacity-80 transition-colors"
              aria-label="Copy APA citation to clipboard"
            >
              <i className="fas fa-copy mr-1"></i> Copy APA
            </button>
          </div>
          <div>
            <h4 className="text-md font-semibold text-neon-blue mb-1">BibTeX:</h4>
            <pre className="p-3 bg-dark-tertiary rounded text-sm text-light-secondary/90 whitespace-pre-wrap break-words overflow-x-auto" aria-label="BibTeX Citation Text">
              {bibtexCitation}
            </pre>
            <button 
              onClick={() => handleCopy(bibtexCitation, 'BibTeX')}
              className="mt-2 px-3 py-1 text-xs bg-neon-blue text-dark-primary rounded hover:bg-opacity-80 transition-colors"
              aria-label="Copy BibTeX citation to clipboard"
            >
              <i className="fas fa-copy mr-1"></i> Copy BibTeX
            </button>
          </div>
          {copySuccess && <p role="status" aria-live="polite" className="text-xs text-neon-green mt-2 animate-pulseGlow [--tw-shadow-color:theme('colors.neon-green')]">{copySuccess}</p>}
        </div>
      )}
    </div>
  );
};

type SortOption = 'year-desc' | 'year-asc' | 'impact';

export const ResearchPage: React.FC = () => {
  const publicationTypes = Object.values(PublicationType);
  const [sortOption, setSortOption] = useState<SortOption>('year-desc');

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Wait for potential layout shifts before scrolling
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('!border-neon-pink', 'ring-2', 'ring-neon-pink', 'transition-all', 'duration-1000', 'ease-out', 'shadow-neon-glow-pink');
            setTimeout(() => {
                element.classList.remove('!border-neon-pink', 'ring-2', 'ring-neon-pink', 'shadow-neon-glow-pink');
            }, 3000);
        }, 100);
      }
    }
  }, []);

  const sortedPublications = useMemo(() => {
    return [...publicationsData].sort((a, b) => {
      const yearAString = a.year.toString().match(/^\d{4}/)?.[0] || '0';
      const yearBString = b.year.toString().match(/^\d{4}/)?.[0] || '0';
      const yearA = parseInt(yearAString);
      const yearB = parseInt(yearBString);

      const getImpactScore = (pub: Publication) => {
        if (pub.impactMetrics?.some(m => m.value === "Q1")) return 3;
        if (pub.impactMetrics?.some(m => m.value === "Q2")) return 2;
        if (pub.impactMetrics?.some(m => m.value === "Q3")) return 1;
        return 0;
      };

      if (sortOption === 'year-desc') {
        if (yearB !== yearA) return yearB - yearA;
        return getImpactScore(b) - getImpactScore(a); // Higher impact first for same year
      }
      if (sortOption === 'year-asc') {
         if (yearA !== yearB) return yearA - yearB;
         return getImpactScore(a) - getImpactScore(b); // Lower impact first for same year (or keep as is)
      }
      if (sortOption === 'impact') {
        const scoreB = getImpactScore(b);
        const scoreA = getImpactScore(a);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return yearB - yearA; // Secondary sort by year (newest) if impact is same
      }
      return 0;
    });
  }, [sortOption]);

  return (
    <div className="animate-fadeIn">
      <Section title="My Research Portfolio" subtitle="Explore a comprehensive collection of my academic contributions, from peer-reviewed articles to ongoing projects.">
        
        <div className="mb-8 p-4 bg-dark-secondary/50 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-light-primary font-medium">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {(['year-desc', 'year-asc', 'impact'] as SortOption[]).map(option => (
              <button
                key={option}
                onClick={() => setSortOption(option)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${sortOption === option 
                    ? 'bg-neon-blue text-dark-primary shadow-neon-glow-blue' 
                    : 'bg-dark-tertiary text-light-secondary hover:bg-neon-pink hover:text-dark-primary'}`}
                aria-pressed={sortOption === option}
              >
                {option === 'year-desc' && <><i className="fas fa-calendar-alt mr-1.5"></i>Year (Newest First)</>}
                {option === 'year-asc' && <><i className="fas fa-calendar-alt mr-1.5"></i>Year (Oldest First)</>}
                {option === 'impact' && <><i className="fas fa-star mr-1.5"></i>Impact (Q1/Q2 First)</>}
              </button>
            ))}
          </div>
        </div>

      {publicationTypes.map(type => {
        const filteredPublications = sortedPublications.filter(pub => pub.type === type);
        if (filteredPublications.length === 0) return null;

        return (
          <div key={type} className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-neon-pink mb-6 pb-3 border-b-2 border-neon-pink/40 flex items-center">
              <i className="fas fa-stream mr-3 opacity-80"></i>{type}
            </h3>
            <div className="space-y-6">
              {filteredPublications.map(pub => (
                <PublicationCard key={pub.id} pub={pub} />
              ))}
            </div>
          </div>
        );
      })}
      </Section>
    </div>
  );
};
