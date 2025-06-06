
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial, PublicationType } from '../types';

const HeroSection: React.FC = () => {
  const baseDelay = 0.1;
  const taglineDelay = baseDelay + 0.6; // Increased spacing
  const keywordsTitleDelay = taglineDelay + 0.4; 
  const keywordsContainerBaseDelay = keywordsTitleDelay + 0.25; 
  const numKeywords = personalInfoData.currentFocusKeywords?.length || 0;
  const keywordItemDelayIncrement = 0.08;
  const keywordsFinishTime = keywordsContainerBaseDelay + (numKeywords > 0 ? (numKeywords -1) * keywordItemDelayIncrement : 0) + 0.15; 

  const keyMetricsBaseDelay = keywordsFinishTime + 0.4; 
  const numStats = personalInfoData.keyStats?.length || 0;
  const keyMetricsContainerDelay = keyMetricsBaseDelay - 0.15; 
  const keyMetricsItemDelayIncrement = 0.13;
  const keyMetricsFinishTime = keyMetricsBaseDelay + (numStats > 0 ? (numStats -1) * keyMetricsItemDelayIncrement : 0) + 0.15;
  const actionButtonsDelay = keyMetricsFinishTime + 0.25;

  return (
  <div className="min-h-[calc(100vh-var(--header-height,5rem))] flex flex-col items-center justify-center text-center bg-transparent pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden"> {/* Added padding top/bottom */}
    <div className="relative z-10 px-4 flex flex-col items-center w-full">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto mb-6 border-4 border-neon-blue/80 shadow-neon-glow-blue object-cover animate-fadeIn"
        style={{animationDelay: `${baseDelay}s`, objectPosition: 'center 15%' }} 
      />
      <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-light mb-3 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.2}s`}}>
        Dr. Jaskirat <span className="gradient-text">Singh</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-2 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.35}s`}}>
        <span className="text-neon-blue text-shadow-neon-blue">Researcher</span>
        <span className="text-text-muted mx-2.5">&bull;</span>
        <span className="text-neon-pink text-shadow-neon-pink">Educator</span>
        <span className="text-text-muted mx-2.5">&bull;</span>
        <span className="text-neon-green text-shadow-neon-green">Innovator</span>
      </p>
      <p className="text-sm text-text-darker-muted mb-6 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.4}s`}}>
        {personalInfoData.subtitle} 
      </p>

      {/* Ensure tagline is not cut off */}
      <p className="text-lg sm:text-xl md:text-2xl text-neon-green text-shadow-neon-green mb-8 max-w-3xl px-2 animate-fadeIn" style={{animationDelay: `${taglineDelay}s`}}>
        {personalInfoData.tagline}
      </p>
      
      {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
        <div className="my-6 md:my-8 max-w-xl mx-auto w-full animate-fadeIn" style={{ animationDelay: `${keywordsTitleDelay}s` }}>
          <p className="text-sm text-neon-pink mb-3.5 font-semibold text-shadow-neon-pink">
            Key Focus Areas & Keywords
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {personalInfoData.currentFocusKeywords.map((keyword, index) => (
              <span
                key={keyword}
                className="px-3.5 py-2 glass-card !rounded-full text-xs sm:text-[0.8rem] font-medium transition-all duration-300 hover:border-neon-green/60 hover:shadow-neon-glow-green hover:scale-105 cursor-default animate-fadeIn text-neon-green"
                style={{ background: 'rgba(var(--neon-green-rgb), 0.1)', animationDelay: `${keywordsContainerBaseDelay + index * keywordItemDelayIncrement}s`, borderColor: 'rgba(var(--neon-green-rgb),0.3)' }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
        
      {personalInfoData.keyStats && (
         <div className="mt-8 mb-8 md:mb-10 animate-fadeIn w-full max-w-4xl" style={{ animationDelay: `${keyMetricsContainerDelay}s`}}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"> {/* Adjusted grid for better fit */}
            {personalInfoData.keyStats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="glass-card p-4 sm:p-5 text-center hover-card animate-fadeIn flex flex-col items-center justify-center" // Centering content
                style={{ animationDelay: `${keyMetricsBaseDelay + index * keyMetricsItemDelayIncrement}s`, '--hover-glow-rgb': 'var(--neon-blue-rgb)'} as React.CSSProperties}
              >
                {stat.icon && <i className={`${stat.icon} text-2xl sm:text-3xl text-neon-blue mb-2.5 text-shadow-neon-blue`}></i>}
                <div className="text-2xl sm:text-3xl font-bold text-light">
                  {stat.value}{stat.suffix && <span className="text-neon-blue text-lg sm:text-xl">{stat.suffix}</span>}
                </div>
                <p className="text-xs sm:text-sm text-text-muted mt-1.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeIn mt-4" style={{animationDelay: `${actionButtonsDelay}s`}}>
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
          className="btn-base gradient-bg-alt text-md !py-3 !px-9" // Adjusted padding & font size
        >
          <i className="fas fa-atom"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="btn-base btn-neon-outline text-md !py-3 !px-9" // Adjusted padding & font size
        >
          <i className="fas fa-hands-helping"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);
}

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay: number; }> = ({ title, linkTo, icon, description, colorClass, delay }) => {
  const neonColorVar = 
    colorClass === 'neon-blue' ? 'var(--neon-blue)' :
    colorClass === 'neon-pink' ? 'var(--neon-pink)' :
    'var(--neon-green)';
  
  const neonRgbVar = 
    colorClass === 'neon-blue' ? 'var(--neon-blue-rgb)' :
    colorClass === 'neon-pink' ? 'var(--neon-pink-rgb)' :
    'var(--neon-green-rgb)';

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
    // For external or full page links, default behavior is fine.
  };

  return (
    <Link 
      to={linkTo} 
      onClick={handleLinkClick}
      className={`group block glass-card p-6 md:p-7 hover-card animate-fadeIn h-full flex flex-col`}
      style={{ 
        animationDelay: `${delay}s`,
        // @ts-ignore
        '--hover-glow-color': neonColorVar,
        '--hover-glow-rgb': neonRgbVar,
      } as React.CSSProperties}
    >
      <div className={`flex items-center text-[${neonColorVar}] mb-5`}>
        <div className="p-3.5 rounded-lg mr-5 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] border-2" style={{background: `rgba(${neonRgbVar}, 0.12)`, borderColor: `rgba(${neonRgbVar},0.35)`}}>
            <i className={`${icon} text-2xl text-[${neonColorVar}]`}></i>
        </div>
        <h3 className={`text-xl font-semibold text-light group-hover:text-[${neonColorVar}] transition-colors`}>{title}</h3>
      </div>
      <p className="text-text-muted text-sm leading-relaxed flex-grow">{description}</p>
      <span className={`mt-6 inline-block text-sm font-medium text-[${neonColorVar}] group-hover:underline`}>Learn More <i className="fas fa-arrow-right text-xs ml-1.5"></i></span>
    </Link>
  );
};

const PublicationPreviewCard: React.FC<{ pub: Publication, delay: number }> = ({ pub, delay }) => (
  <div className="glass-card p-5 sm:p-6 hover-card h-full flex flex-col publication-card-custom animate-fadeIn" 
    style={{ 
      animationDelay: `${delay}s`,
      // @ts-ignore
      '--hover-glow-color': 'var(--neon-pink)', 
      '--hover-glow-rgb': 'var(--neon-pink-rgb)' 
    } as React.CSSProperties}
  >
    <h4 className="text-md font-semibold text-neon-blue mb-2 line-clamp-3 group-hover:text-neon-pink transition-colors duration-300" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-text-muted mb-1.5 italic truncate">{pub.authors}</p>
    <p className="text-xs text-text-darker-muted mb-3 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mb-4 pt-3 border-t border-slate-700/40">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2 mb-1 px-3 py-1.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/30 text-neon-green border-neon-green/50' : 'bg-neon-blue/30 text-neon-blue border-neon-blue/50'} border shadow-sm backdrop-blur-sm`}>
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
        } else { // Fallback if ID isn't found, scroll to research section
            const researchSection = document.getElementById('research');
            if (researchSection) {
                 const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                 const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                 const offsetPosition = elementPosition - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
      }} 
      className="text-sm text-neon-pink hover:underline focus-visible-outline rounded-sm mt-auto pt-2 font-semibold group-hover:text-neon-blue transition-colors duration-300"
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
  
  return "fas fa-atom"; // Default
};

const ResearchHighlightCard: React.FC<{ pub: Publication, delay: number }> = ({ pub, delay }) => (
   <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full hover-card publication-card-custom animate-fadeIn" 
    style={{ 
        animationDelay: `${delay}s`,
        // @ts-ignore
        '--hover-glow-color': 'var(--neon-blue)',
        '--hover-glow-rgb': 'var(--neon-blue-rgb)'
    } as React.CSSProperties}
   >
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-60 sm:h-64"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual for ${pub.title}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-60 sm:h-64 bg-dark-tertiary/60 flex items-center justify-center border-b border-[rgba(var(--neon-blue-rgb),0.3)]"> 
            <i className={`${getIconForPublication(pub)} text-7xl sm:text-8xl text-neon-blue opacity-60 group-hover:opacity-85 transition-opacity duration-300 group-hover:animate-pulseGlow [--tw-shadow-color:var(--neon-blue)]`}></i> 
        </div>
    )}
    <div className="p-5 md:p-6 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-neon-blue mb-2.5 group-hover:text-neon-pink transition-colors duration-300 line-clamp-3" title={pub.title}>{pub.title}</h4>
      <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-5">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-3.5 py-1.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/75 text-dark shadow-sm border border-neon-green/90' : 'bg-neon-blue/75 text-dark shadow-sm border border-neon-blue/90'} `}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm">
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
               } else { // Fallback
                  const researchSection = document.getElementById('research');
                  if(researchSection){
                    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 80;
                    const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
               }
             }} 
             className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, delay: number }> = ({ testimonial, delay }) => (
  <div className="glass-card p-6 md:p-7 hover-card flex flex-col items-center text-center h-full animate-fadeIn" 
    style={{ 
      animationDelay: `${delay}s`,
      // @ts-ignore
      '--hover-glow-color': 'var(--neon-pink)', 
      '--hover-glow-rgb': 'var(--neon-pink-rgb)' 
    } as React.CSSProperties}
  >
    {testimonial.avatarUrl ? 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-3 border-neon-pink/80 object-cover shadow-md group-hover:shadow-neon-glow-pink transition-all duration-300"
      />
    :
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-3 border-neon-pink/80 bg-dark-tertiary/70 flex items-center justify-center shadow-md group-hover:shadow-neon-glow-pink transition-all duration-300">
        <i className="fas fa-user-tie text-5xl sm:text-6xl text-neon-pink opacity-80"></i>
      </div>
    }
    <blockquote className="mb-6 flex-grow">
      <p className="text-text-muted italic text-md leading-relaxed">
        <span className="text-5xl text-neon-pink/70 leading-none mr-2 -mt-1.5 inline-block">&ldquo;</span>
        {testimonial.quote}
        <span className="text-5xl text-neon-pink/70 leading-none ml-1.5 -mt-1.5 inline-block">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-5 border-t border-slate-700/50 w-full">
      <h4 className="font-semibold text-neon-blue text-lg text-shadow-neon-blue">{testimonial.author}</h4>
      <p className="text-xs text-text-darker-muted">{testimonial.authorTitle}</p>
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
    <div className="animate-fadeIn"> 
      <HeroSection />

      <Section title="My Impact Areas" id="impact-areas" className="bg-dark-secondary/40 backdrop-blur-sm" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-9">
          <ImpactCard title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="neon-blue" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="neon-pink" delay={0.25}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="neon-green" delay={0.3}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="neon-blue" delay={0.35}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" className="bg-dark/50 backdrop-blur-sm" subtitle="Highlights from my most impactful and recent contributions.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
            {featuredPublications.map((pub,idx) => (
                <PublicationPreviewCard pub={pub} delay={0.2 + idx * 0.1} />
            ))}
          </div>
          <div className="text-center mt-14 animate-fadeIn" style={{animationDelay: `${0.2 + featuredPublications.length * 0.1}s`}}>
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
                className="btn-base gradient-bg text-md !py-3 !px-8"
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" className="bg-dark-secondary/40 backdrop-blur-sm" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-9">
            {researchHighlights.map((pub, idx) => (
                <ResearchHighlightCard pub={pub} delay={0.2 + idx * 0.1}/>
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" className="bg-dark/50 backdrop-blur-sm" subtitle="Feedback from collaborators and partners.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-9">
            {testimonialsData.map((testimonial, idx) => (
                <TestimonialCard testimonial={testimonial} delay={0.2 + idx * 0.1} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
