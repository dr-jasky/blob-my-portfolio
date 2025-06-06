
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial, PublicationType } from '../types';

const HeroSection: React.FC = () => {
  const baseDelay = 0.1;
  const taglineDelay = baseDelay + 0.5;
  const keywordsTitleDelay = taglineDelay + 0.3; 
  const keywordsContainerBaseDelay = keywordsTitleDelay + 0.2; 
  const numKeywords = personalInfoData.currentFocusKeywords?.length || 0;
  const keywordItemDelayIncrement = 0.07;
  const keywordsFinishTime = keywordsContainerBaseDelay + (numKeywords > 0 ? (numKeywords -1) * keywordItemDelayIncrement : 0) + 0.1; 

  const keyMetricsBaseDelay = keywordsFinishTime + 0.3; 
  const numStats = personalInfoData.keyStats?.length || 0;
  const keyMetricsContainerDelay = keyMetricsBaseDelay - 0.1; 
  const keyMetricsItemDelayIncrement = 0.12;
  const keyMetricsFinishTime = keyMetricsBaseDelay + (numStats > 0 ? (numStats -1) * keyMetricsItemDelayIncrement : 0) + 0.1;
  const actionButtonsDelay = keyMetricsFinishTime + 0.2;

  return (
  <div className="min-h-[calc(100vh-var(--header-height,8rem))] flex flex-col items-center justify-center text-center bg-transparent py-16 md:py-20 relative overflow-hidden">
    <div className="relative z-10 px-4 flex flex-col items-center">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full mx-auto mb-7 border-4 border-neon-blue/90 shadow-neon-glow-blue object-cover animate-fadeIn"
        style={{animationDelay: `${baseDelay}s`, objectPosition: 'center 15%' }} 
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-light mb-3.5 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.2}s`}}>
        Dr. Jaskirat <span className="gradient-text">Singh</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-2.5 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.4}s`}}>
        <span className="text-neon-blue text-shadow-neon-blue">Researcher</span>
        <span className="text-text-muted mx-2">&bull;</span>
        <span className="text-neon-pink text-shadow-neon-pink">Educator</span>
        <span className="text-text-muted mx-2">&bull;</span>
        <span className="text-neon-green text-shadow-neon-green">Innovator</span>
      </p>
      <p className="text-md text-text-darker-muted mb-7 animate-fadeIn" style={{animationDelay: `${baseDelay + 0.45}s`}}>
        {personalInfoData.subtitle} 
      </p>

      <p className="text-lg sm:text-xl md:text-2xl text-neon-green text-shadow-neon-green mb-9 max-w-3xl animate-fadeIn" style={{animationDelay: `${taglineDelay}s`}}>
        {personalInfoData.tagline}
      </p>
      
      {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
        <div className="my-7 md:my-9 max-w-3xl mx-auto w-full animate-fadeIn" style={{ animationDelay: `${keywordsTitleDelay}s` }}>
          <p className="text-md text-neon-pink mb-4 font-semibold text-shadow-neon-pink">
            Key Focus Areas & Keywords
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {personalInfoData.currentFocusKeywords.map((keyword, index) => (
              <span
                key={keyword}
                className="px-4 py-2.5 glass-card !rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:border-neon-green/70 hover:shadow-neon-glow-green hover:scale-105 cursor-default animate-fadeIn text-neon-green"
                style={{ background: 'rgba(var(--neon-green-rgb), 0.08)', animationDelay: `${keywordsContainerBaseDelay + index * keywordItemDelayIncrement}s`, borderColor: 'rgba(var(--neon-green-rgb),0.25)' }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
        
      {personalInfoData.keyStats && (
         <div className="mt-10 mb-10 md:mb-14 animate-fadeIn" style={{ animationDelay: `${keyMetricsContainerDelay}s`}}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-7 max-w-4xl mx-auto">
            {personalInfoData.keyStats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="glass-card p-5 text-center hover-card animate-fadeIn"
                style={{ animationDelay: `${keyMetricsBaseDelay + index * keyMetricsItemDelayIncrement}s`, '--hover-glow-rgb': 'var(--neon-blue-rgb)'} as React.CSSProperties}
              >
                {stat.icon && <i className={`${stat.icon} text-3xl sm:text-4xl text-neon-blue mb-3.5 text-shadow-neon-blue`}></i>}
                <div className="text-3xl sm:text-4xl font-bold text-light">
                  {stat.value}{stat.suffix && <span className="text-neon-blue">{stat.suffix}</span>}
                </div>
                <p className="text-sm sm:text-base text-text-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-7 animate-fadeIn" style={{animationDelay: `${actionButtonsDelay}s`}}>
        <Link 
          to="/#research"
          onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior:'smooth', block:'start'});}}
          className="btn-base gradient-bg-alt text-lg !py-4 !px-12"
        >
          <i className="fas fa-atom"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="btn-base btn-neon-outline text-lg !py-4 !px-12"
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

  return (
    <Link 
      to={linkTo} 
      // @ts-ignore
      className={`group block glass-card p-7 md:p-8 hover-card animate-fadeIn h-full flex flex-col`}
      style={{ 
        animationDelay: `${delay}s`,
        '--hover-glow-color': neonColorVar,
        '--hover-glow-rgb': neonRgbVar,
      } as React.CSSProperties}
    >
      <div className={`flex items-center text-[${neonColorVar}] mb-6`}>
        <div className="p-4 rounded-xl mr-6 shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:rotate-[-8deg] border-2" style={{background: `rgba(${neonRgbVar}, 0.15)`, borderColor: `rgba(${neonRgbVar},0.4)`}}>
            <i className={`${icon} text-3xl text-[${neonColorVar}]`}></i>
        </div>
        <h3 className={`text-2xl font-semibold text-light group-hover:text-[${neonColorVar}] transition-colors`}>{title}</h3>
      </div>
      <p className="text-text-muted text-sm md:text-base leading-relaxed flex-grow">{description}</p>
      <span className={`mt-7 inline-block text-sm font-medium text-[${neonColorVar}] group-hover:underline`}>Learn More <i className="fas fa-arrow-right text-xs ml-2"></i></span>
    </Link>
  );
};

const PublicationPreviewCard: React.FC<{ pub: Publication, delay: number }> = ({ pub, delay }) => (
  <div className="glass-card p-6 hover-card h-full flex flex-col publication-card-custom animate-fadeIn" 
    style={{ 
      animationDelay: `${delay}s`,
      // @ts-ignore
      '--hover-glow-color': 'var(--neon-pink)', 
      '--hover-glow-rgb': 'var(--neon-pink-rgb)' 
    } as React.CSSProperties}
  >
    <h4 className="text-md font-semibold text-neon-blue mb-2.5 line-clamp-3 group-hover:text-neon-pink transition-colors duration-300" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-text-muted mb-2 italic truncate">{pub.authors}</p>
    <p className="text-xs text-text-darker-muted mb-3.5 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mt-auto mb-5 pt-4 border-t border-slate-700/50">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2.5 mb-1.5 px-3.5 py-2 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/40 text-neon-green border-neon-green/60' : 'bg-neon-blue/40 text-neon-blue border-neon-blue/60'} border shadow-sm backdrop-blur-sm`}>
           {metric.icon && <i className={`${metric.icon} mr-2`}></i>}{metric.name && `${metric.name}: `}{metric.value}
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
          const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 120;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }} 
      className="text-sm text-neon-pink hover:underline focus-visible-outline rounded-sm mt-auto pt-2.5 font-semibold group-hover:text-neon-blue transition-colors duration-300"
    >
      View Details <i className="fas fa-arrow-right text-xs ml-2"></i>
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

const ResearchHighlightCard: React.FC<{ pub: Publication, delay: number }> = ({ pub, delay }) => (
   <div className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full hover-card publication-card-custom animate-fadeIn" 
    style={{ 
        animationDelay: `${delay}s`,
        // @ts-ignore
        '--hover-glow-color': 'var(--neon-blue)',
        '--hover-glow-rgb': 'var(--neon-blue-rgb)'
    } as React.CSSProperties}
   >
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-72"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual representation for ${pub.title}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-72 bg-dark-primary/80 flex items-center justify-center border-b border-[rgba(var(--neon-blue-rgb),0.35)]"> 
            <i className={`${getIconForPublication(pub)} text-9xl text-neon-blue opacity-65 group-hover:opacity-95 transition-opacity duration-300 group-hover:animate-pulseGlow [--tw-shadow-color:var(--neon-blue)]`}></i> 
        </div>
    )}
    <div className="p-6 md:p-7 flex-grow flex flex-col">
      <h4 className="text-lg md:text-xl font-semibold text-neon-blue mb-3.5 group-hover:text-neon-pink transition-colors duration-300">{pub.title}</h4>
      <p className="text-sm md:text-base text-text-muted mb-5 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-6">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2.5 mb-1.5 px-4 py-2 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/85 text-dark shadow-md border border-neon-green' : 'bg-neon-blue/85 text-dark shadow-md border border-neon-blue'} `}>
              {metric.icon && <i className={`${metric.icon} mr-2`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm">
            View Source <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </a>
        ) : (
           <Link 
             to={`/#research`} 
             onClick={(e) => {
               e.preventDefault(); 
               const el = document.getElementById(`pub-${pub.id}`); 
               if(el) {
                const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-scrolled')) || 120;
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               }
             }} 
             className="text-sm font-semibold text-neon-pink hover:underline group-hover:text-neon-blue transition-colors duration-300 focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-2 text-xs"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, delay: number }> = ({ testimonial, delay }) => (
  <div className="glass-card p-7 md:p-8 hover-card flex flex-col items-center text-center h-full animate-fadeIn" 
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
        className="w-36 h-36 rounded-full mx-auto mb-8 border-4 border-neon-pink/90 object-cover shadow-lg group-hover:shadow-neon-glow-pink transition-all duration-300"
      />
    :
      <div className="w-36 h-36 rounded-full mx-auto mb-8 border-4 border-neon-pink/90 bg-dark-primary/85 flex items-center justify-center shadow-lg group-hover:shadow-neon-glow-pink transition-all duration-300">
        <i className="fas fa-user-tie text-7xl text-neon-pink opacity-85"></i>
      </div>
    }
    <blockquote className="mb-7 flex-grow">
      <p className="text-text-muted italic text-md md:text-lg leading-relaxed">
        <span className="text-6xl text-neon-pink/80 leading-none mr-2.5 -mt-2 inline-block">&ldquo;</span>
        {testimonial.quote}
        <span className="text-6xl text-neon-pink/80 leading-none ml-2.5 -mt-2 inline-block">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-6 border-t border-slate-700/60 w-full">
      <h4 className="font-semibold text-neon-blue text-lg md:text-xl text-shadow-neon-blue">{testimonial.author}</h4>
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

      <Section title="My Impact Areas" id="impact-areas" className="bg-dark-secondary/50 backdrop-blur-md" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
          <ImpactCard title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="neon-blue" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="neon-pink" delay={0.3}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="neon-green" delay={0.4}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="neon-blue" delay={0.5}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" className="bg-dark/60 backdrop-blur-md" subtitle="Highlights from my most impactful and recent contributions.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {featuredPublications.map((pub,idx) => (
                <PublicationPreviewCard pub={pub} delay={0.2 + idx * 0.12} />
            ))}
          </div>
          <div className="text-center mt-16 animate-fadeIn" style={{animationDelay: `${0.2 + featuredPublications.length * 0.12}s`}}>
              <Link 
                to="/#research"
                onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior:'smooth', block:'start'});}}
                className="btn-base gradient-bg text-md !py-3.5 !px-9"
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" className="bg-dark-secondary/50 backdrop-blur-md" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {researchHighlights.map((pub, idx) => (
                <ResearchHighlightCard pub={pub} delay={0.2 + idx * 0.12}/>
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" className="bg-dark/60 backdrop-blur-md" subtitle="Feedback from collaborators and partners.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
            {testimonialsData.map((testimonial, idx) => (
                <TestimonialCard testimonial={testimonial} delay={0.2 + idx * 0.12} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
