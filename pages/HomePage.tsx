
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial, PublicationType } from '../types';

const HeroSection: React.FC = () => {
  return (
  <div className="min-h-[calc(100vh-var(--header-height,5rem))] flex flex-col items-center justify-center text-center bg-transparent pt-12 pb-16 md:pt-16 md:pb-20 relative">
    <div className="relative z-10 px-4 flex flex-col items-center w-full">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto mb-6 border-4 border-accent-primary/70 object-cover"
        style={{ objectPosition: 'center 15%' }} 
      />
      <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-text-light mb-3">
        Dr. Jaskirat <span className="text-accent-primary">Singh</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-2">
        <span className="text-accent-primary">Researcher</span>
        <span className="text-text-medium mx-2.5">&bull;</span>
        <span className="text-accent-secondary">Educator</span>
        <span className="text-text-medium mx-2.5">&bull;</span>
        <span className="text-accent-tertiary">Innovator</span>
      </p>
      <p className="text-sm text-text-muted mb-6">
        {personalInfoData.subtitle} 
      </p>

      <p className="text-lg sm:text-xl md:text-2xl text-accent-tertiary mb-8 max-w-3xl px-2">
        {personalInfoData.tagline}
      </p>
      
      {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
        <div className="my-6 md:my-8 max-w-xl mx-auto w-full">
          <p className="text-sm text-accent-secondary mb-3.5 font-semibold">
            Key Focus Areas & Keywords
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {personalInfoData.currentFocusKeywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3.5 py-2 glass-card !rounded-full text-xs sm:text-[0.8rem] font-medium cursor-default text-accent-tertiary"
                style={{ background: 'rgba(var(--accent-tertiary-rgb), 0.08)', borderColor: 'rgba(var(--accent-tertiary-rgb),0.25)' }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
        
      {personalInfoData.keyStats && (
         <div className="mt-8 mb-8 md:mb-10 w-full max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {personalInfoData.keyStats.map((stat) => (
              <div 
                key={stat.id} 
                className="glass-card p-4 sm:p-5 text-center flex flex-col items-center justify-center"
                style={{ '--hover-glow-rgb': 'var(--accent-primary-rgb)'} as React.CSSProperties} // Kept for potential subtle border hover
              >
                {stat.icon && <i className={`${stat.icon} text-2xl sm:text-3xl text-accent-primary mb-2.5`}></i>}
                <div className="text-2xl sm:text-3xl font-bold text-text-light">
                  {stat.value}{stat.suffix && <span className="text-accent-primary text-lg sm:text-xl">{stat.suffix}</span>}
                </div>
                <p className="text-xs sm:text-sm text-text-medium mt-1.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4">
        <Link 
          to="/#research"
          onClick={(e) => { 
              e.preventDefault(); 
              const el = document.getElementById('research');
              if(el) {
                const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
          }}
          className="btn-base btn-solid-primary text-md !py-3 !px-9"
        >
          <i className="fas fa-atom"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="btn-base btn-outline-accent text-md !py-3 !px-9"
        >
          <i className="fas fa-hands-helping"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);
}

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay?: number; }> = ({ title, linkTo, icon, description, colorClass }) => {
  const accentColorVar = 
    colorClass === 'accent-primary' ? 'var(--accent-primary)' :
    colorClass === 'accent-secondary' ? 'var(--accent-secondary)' :
    'var(--accent-tertiary)';
  
  const accentRgbVar = 
    colorClass === 'accent-primary' ? 'var(--accent-primary-rgb)' :
    colorClass === 'accent-secondary' ? 'var(--accent-secondary-rgb)' :
    'var(--accent-tertiary-rgb)';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (linkTo.startsWith("/#")) {
        e.preventDefault();
        const id = linkTo.substring(2);
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
  };

  return (
    <Link 
      to={linkTo} 
      onClick={handleLinkClick}
      className={`group block glass-card p-6 md:p-7 h-full flex flex-col`}
      style={{ 
        // @ts-ignore
        '--hover-glow-color': accentColorVar, // Kept for potential future subtle use
        '--hover-glow-rgb': accentRgbVar,     // Kept for potential future subtle use
      } as React.CSSProperties}
    >
      <div className={`flex items-center text-[${accentColorVar}] mb-5`}>
        <div className="p-3.5 rounded-lg mr-5 shadow-sm border-2" style={{background: `rgba(${accentRgbVar}, 0.1)`, borderColor: `rgba(${accentRgbVar},0.3)`}}>
            <i className={`${icon} text-2xl`} style={{color: accentColorVar}}></i>
        </div>
        <h3 className={`text-xl font-semibold text-text-light group-hover:text-[${accentColorVar}] transition-colors duration-200`}>{title}</h3>
      </div>
      <p className="text-text-medium text-sm leading-relaxed flex-grow">{description}</p>
      <span className={`mt-6 inline-block text-sm font-medium text-[${accentColorVar}] group-hover:underline`}>Learn More <i className="fas fa-arrow-right text-xs ml-1.5"></i></span>
    </Link>
  );
};

const PublicationPreviewCard: React.FC<{ pub: Publication, delay?: number }> = ({ pub }) => (
  <div className="glass-card p-5 sm:p-6 h-full flex flex-col publication-card-custom" 
    style={{ 
      // @ts-ignore
      '--hover-glow-color': 'var(--accent-secondary)', 
      '--hover-glow-rgb': 'var(--accent-secondary-rgb)' 
    } as React.CSSProperties}
  >
    <h4 className="text-md font-semibold text-accent-primary mb-2 line-clamp-3 group-hover:text-accent-secondary transition-colors duration-200" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-text-medium mb-1.5 italic truncate">{pub.authors}</p>
    <p className="text-xs text-text-muted mb-3 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mb-4 pt-3 border-t border-[var(--glass-border)]">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2 mb-1 px-3 py-1.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-accent-tertiary/20 text-accent-tertiary border-accent-tertiary/40' : 'bg-accent-primary/20 text-accent-primary border-accent-primary/40'} border shadow-sm`}>
           {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.name && `${metric.name}: `}{metric.value}
          </span>
        ))}
      </div>
    )}
    <Link 
      to={`/#research`} 
      onClick={(e) => {
        e.preventDefault(); 
        const el = document.getElementById(`pub-${pub.id}`); 
        if(el) {
          const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else { 
            const researchSection = document.getElementById('research');
            if (researchSection) {
                 const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                 const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                 const offsetPosition = elementPosition - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
      }} 
      className="text-sm text-accent-secondary hover:underline focus-visible-outline rounded-sm mt-auto pt-2 font-semibold group-hover:text-accent-primary transition-colors duration-200"
    >
      View Details <i className="fas fa-arrow-right text-xs ml-1.5"></i>
    </Link>
  </div>
);

const getIconForPublication = (pub: Publication): string => {
  const tags = pub.tags?.map(tag => tag.toLowerCase()) || [];
  const title = pub.title.toLowerCase();

  if (tags.includes("fintech") || title.includes("fintech") || tags.includes("e-payment") || title.includes("e-payment")) return "fas fa-piggy-bank";
  if (tags.includes("blockchain") || title.includes("blockchain")) return "fas fa-link";
  if (tags.includes("ai") || tags.includes("artificial intelligence") || title.includes("ai") || title.includes("artificial intelligence")) return "fas fa-brain";
  if (tags.includes("urban poverty") || title.includes("urban poor") || tags.includes("slum") || title.includes("slum")) return "fas fa-city";
  if (tags.includes("social welfare") || title.includes("social welfare") || tags.includes("policy") || title.includes("policy")) return "fas fa-landmark";
  if (tags.includes("sustainability") || title.includes("sustainability") || tags.includes("green business") || title.includes("environmental")) return "fas fa-leaf";
  if (tags.includes("digital marketing") || title.includes("e-advertising")) return "fas fa-bullhorn";
  if (tags.includes("capability approach") || title.includes("capability")) return "fas fa-puzzle-piece";
  if (tags.includes("education") || title.includes("education")) return "fas fa-book-reader";
  if (tags.includes("gender") || title.includes("feminist")) return "fas fa-venus-mars";
  if (pub.type === PublicationType.BookChapter || pub.type === PublicationType.BookProposal) return "fas fa-book";
  if (pub.type === PublicationType.Conference) return "fas fa-chalkboard-teacher";
  
  return "fas fa-atom"; 
};

const ResearchHighlightCard: React.FC<{ pub: Publication, delay?: number }> = ({ pub }) => (
   <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full publication-card-custom" 
    style={{ 
        // @ts-ignore
        '--hover-glow-color': 'var(--accent-primary)', // Kept for potential subtle future use
        '--hover-glow-rgb': 'var(--accent-primary-rgb)'
    } as React.CSSProperties}
   >
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-60 sm:h-64"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual for ${pub.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--dark-bg-rgb),0.7)] via-[rgba(var(--dark-bg-rgb),0.4)] to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-60 sm:h-64 bg-[rgba(var(--glass-bg-rgb),0.5)] flex items-center justify-center border-b border-[var(--glass-border)]"> 
            <i className={`${getIconForPublication(pub)} text-7xl sm:text-8xl text-accent-primary opacity-70`}></i> 
        </div>
    )}
    <div className="p-5 md:p-6 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-accent-primary mb-2.5 group-hover:text-accent-secondary transition-colors duration-200 line-clamp-3" title={pub.title}>{pub.title}</h4>
      <p className="text-sm text-text-medium mb-4 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-5">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-3.5 py-1.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-accent-tertiary/80 text-dark-bg shadow-sm border border-accent-tertiary/90' : 'bg-accent-primary/80 text-dark-bg shadow-sm border border-accent-primary/90'} `}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent-secondary hover:underline group-hover:text-accent-primary transition-colors duration-200 focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent-secondary hover:underline group-hover:text-accent-primary transition-colors duration-200 focus-visible-outline rounded-sm">
            View Source <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
          </a>
        ) : (
           <Link 
             to={`/#research`} 
             onClick={(e) => {
               e.preventDefault(); 
               const el = document.getElementById(`pub-${pub.id}`); 
               if(el) {
                const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               } else { 
                  const researchSection = document.getElementById('research');
                  if(researchSection){
                    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                    const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
               }
             }} 
             className="text-sm font-semibold text-accent-secondary hover:underline group-hover:text-accent-primary transition-colors duration-200 focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, delay?: number }> = ({ testimonial }) => (
  <div className="glass-card p-6 md:p-7 flex flex-col items-center text-center h-full" 
    style={{ 
      // @ts-ignore
      '--hover-glow-color': 'var(--accent-secondary)', // Kept for potential subtle future use
      '--hover-glow-rgb': 'var(--accent-secondary-rgb)' 
    } as React.CSSProperties}
  >
    {testimonial.avatarUrl ? 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-3 border-accent-secondary/70 object-cover shadow-sm"
      />
    :
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-3 border-accent-secondary/70 bg-[rgba(var(--glass-bg-rgb),0.7)] flex items-center justify-center shadow-sm">
        <i className="fas fa-user-tie text-5xl sm:text-6xl text-accent-secondary opacity-80"></i>
      </div>
    }
    <blockquote className="mb-6 flex-grow">
      <p className="text-text-medium italic text-md leading-relaxed">
        <span className="text-5xl text-accent-secondary/70 leading-none mr-2 -mt-1.5 inline-block">&ldquo;</span>
        {testimonial.quote}
        <span className="text-5xl text-accent-secondary/70 leading-none ml-1.5 -mt-1.5 inline-block">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-5 border-t border-[var(--glass-border)] w-full">
      <h4 className="font-semibold text-accent-primary text-lg">{testimonial.author}</h4>
      <p className="text-xs text-text-muted">{testimonial.authorTitle}</p>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  const featuredPublications = [...publicationsData]
    .sort((a, b) => {
      const yearA = typeof a.year === 'string' ? parseInt(a.year.match(/\d{4}/)?.[0] || '0') : a.year as number;
      const yearB = typeof b.year === 'string' ? parseInt(b.year.match(/\d{4}/)?.[0] || '0') : b.year as number;
      if (yearB !== yearA) return yearB - yearA;
      const aIsHighImpact = a.impactMetrics?.some(m => m.value.toString().includes("Q1") || m.value.toString().includes("Q2"));
      const bIsHighImpact = b.impactMetrics?.some(m => m.value.toString().includes("Q1") || m.value.toString().includes("Q2"));
      if (aIsHighImpact && !bIsHighImpact) return -1;
      if (!aIsHighImpact && bIsHighImpact) return 1;
      return 0;
    })
    .slice(0, 3);

  const researchHighlights = publicationsData
    .filter(pub => pub.insightSnippet || pub.summary) 
    .sort((a,b) => (typeof b.year === 'string' ? parseInt(b.year.match(/\d{4}/)?.[0] || '0') : b.year as number) - (typeof a.year === 'string' ? parseInt(a.year.match(/\d{4}/)?.[0] || '0') : a.year as number) )
    .slice(0, 3);
    
  if (researchHighlights.length < 3) {
    const existingHighlightIds = new Set(researchHighlights.map(rh => rh.id));
    const otherFeatured = featuredPublications.filter(fp => !existingHighlightIds.has(fp.id));
    researchHighlights.push(...otherFeatured.slice(0, 3 - researchHighlights.length));
  }


  return (
    <div className="opacity-100"> {/* Removed animate-fadeIn wrapper */}
      <HeroSection />

      <Section title="My Impact Areas" id="impact-areas" className="bg-[rgba(var(--dark-bg-rgb),0.3)]" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-9">
          <ImpactCard title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="accent-primary" />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="accent-secondary" />
          <ImpactCard title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="accent-tertiary" />
          <ImpactCard title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="accent-primary" />
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" className="bg-[rgba(var(--glass-bg-rgb),0.2)]" subtitle="Highlights from my most impactful and recent contributions.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
            {featuredPublications.map((pub) => (
                <PublicationPreviewCard key={pub.id} pub={pub} />
            ))}
          </div>
          <div className="text-center mt-14">
              <Link 
                to="/#research"
                 onClick={(e) => { 
                    e.preventDefault(); 
                    const el = document.getElementById('research');
                    if(el) {
                        const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }}
                className="btn-base btn-solid-primary text-md !py-3 !px-8"
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" className="bg-[rgba(var(--dark-bg-rgb),0.3)]" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
            {researchHighlights.map((pub) => (
                <ResearchHighlightCard key={`highlight-${pub.id}`} pub={pub} />
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" className="bg-[rgba(var(--glass-bg-rgb),0.2)]" subtitle="Feedback from collaborators and partners.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-9">
            {testimonialsData.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
