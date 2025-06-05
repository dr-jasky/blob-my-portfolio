import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial, PublicationType } from '../types';

const HeroSection: React.FC = () => {
  // Adjusted animation delays after removing summary and starting from tagline
  const taglineDelay = 0.6; // Tagline will use this directly
  const keywordsTitleDelay = taglineDelay + 0.2; 
  const keywordsContainerBaseDelay = keywordsTitleDelay + 0.1; 
  const numKeywords = personalInfoData.currentFocusKeywords?.length || 0;
  const keywordItemDelayIncrement = 0.05;
  const keywordsFinishTime = keywordsContainerBaseDelay + (numKeywords > 0 ? (numKeywords -1) * keywordItemDelayIncrement : 0) + 0.1; 

  const keyMetricsBaseDelay = keywordsFinishTime + 0.2; 
  const numStats = personalInfoData.keyStats?.length || 0;
  const keyMetricsContainerDelay = keyMetricsBaseDelay - 0.1; 
  const keyMetricsItemDelayIncrement = 0.1;
  const keyMetricsFinishTime = keyMetricsBaseDelay + (numStats > 0 ? (numStats -1) * keyMetricsItemDelayIncrement : 0) + 0.1;
  const actionButtonsDelay = keyMetricsFinishTime + 0.1;


  return (
  <div className="min-h-[calc(85vh-80px)] md:min-h-[calc(75vh-80px)] flex flex-col items-center justify-center text-center bg-dark-primary py-12 md:py-16 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="heroPattern" patternUnits="userSpaceOnUse" width="70" height="70" patternTransform="scale(1) rotate(30)">
            {/* Clean background, particle.js and blobs provide dynamic bg */}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroPattern)" />
      </svg>
    </div>

    <div className="relative z-10 px-4 flex flex-col items-center">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto mb-6 border-4 border-neon-blue shadow-neon-glow-blue object-cover animate-fadeIn"
        style={{animationDelay: '0.1s', objectPosition: 'center 10%' }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-light-primary mb-3 animate-fadeIn" style={{animationDelay: '0.3s'}}>
        Dr. Jaskirat <span className="gradient-text">Singh</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-1 animate-fadeIn" style={{animationDelay: '0.5s'}}>
        <span className="text-neon-blue text-shadow-neon-blue">Researcher</span>,
        <span className="text-neon-pink text-shadow-neon-pink mx-1.5">Educator</span>,
        <span className="text-neon-green text-shadow-neon-green">Innovator</span>
      </p>
      <p className="text-md text-text-muted mb-5 animate-fadeIn" style={{animationDelay: '0.55s'}}>
        {personalInfoData.subtitle} 
      </p>

      <p className="text-lg sm:text-xl text-neon-green text-shadow-neon-green mb-5 animate-fadeIn" style={{animationDelay: `${taglineDelay}s`}}>
        {personalInfoData.tagline}
      </p>
      
      {/* Detailed professional summary removed from here, tagline and keywords carry the weight now. */}
      
      {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
        <div className="my-6 md:my-8 max-w-3xl mx-auto w-full animate-fadeIn" style={{ animationDelay: `${keywordsTitleDelay}s` }}>
          <p className="text-md text-neon-pink mb-4 font-semibold">
            My Key Focus Areas & Keywords
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {personalInfoData.currentFocusKeywords.map((keyword, index) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-dark-secondary border border-neon-blue/50 text-neon-blue rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-neon-blue/30 hover:shadow-neon-glow-blue hover:scale-105 cursor-default animate-fadeIn"
                style={{ animationDelay: `${keywordsContainerBaseDelay + index * keywordItemDelayIncrement}s` }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
        
      {personalInfoData.keyStats && (
         <div className="mt-10 mb-8 md:mb-12 animate-fadeIn" style={{ animationDelay: `${keyMetricsContainerDelay}s`}}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {personalInfoData.keyStats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="bg-dark-secondary/80 p-5 rounded-lg text-center shadow-xl border border-neon-blue/40 transition-all duration-300 hover:border-neon-blue hover:shadow-neon-glow-blue hover:bg-dark-tertiary/80 animate-fadeIn transform hover:scale-[1.05]"
                style={{ animationDelay: `${keyMetricsBaseDelay + index * keyMetricsItemDelayIncrement}s`}}
              >
                {stat.icon && <i className={`${stat.icon} text-3xl sm:text-4xl text-neon-blue mb-2.5`}></i>}
                <div className="text-3xl sm:text-4xl font-bold text-light-primary">
                  {stat.value}{stat.suffix && <span className="text-neon-blue">{stat.suffix}</span>}
                </div>
                <p className="text-sm sm:text-base text-light-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeIn" style={{animationDelay: `${actionButtonsDelay}s`}}>
        <Link 
          to="/#research"
          onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior:'smooth', block:'start'});}}
          className="inline-block gradient-bg text-white font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg focus-visible-outline"
        >
          <i className="fas fa-atom mr-2"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="inline-block bg-transparent hover:bg-neon-pink border-2 border-neon-pink text-neon-pink hover:text-dark-primary font-semibold py-3.5 px-10 rounded-lg shadow-neon-glow-pink transition-all duration-300 transform hover:scale-105 text-lg focus-visible-outline"
        >
          <i className="fas fa-hands-helping mr-2"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);
}

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay: number; }> = ({ title, linkTo, icon, description, colorClass, delay }) => {
  const borderColorClass = 
    colorClass === 'neon-blue' ? 'border-neon-blue' :
    colorClass === 'neon-pink' ? 'border-neon-pink' :
    colorClass === 'neon-green' ? 'border-neon-green' : 'border-transparent';
  
  const textColorClass = 
    colorClass === 'neon-blue' ? 'text-neon-blue' :
    colorClass === 'neon-pink' ? 'text-neon-pink' :
    colorClass === 'neon-green' ? 'text-neon-green' : 'text-light-primary';

  const shadowHoverClass = 
    colorClass === 'neon-blue' ? 'hover:shadow-neon-glow-blue' :
    colorClass === 'neon-pink' ? 'hover:shadow-neon-glow-pink' :
    colorClass === 'neon-green' ? 'hover:shadow-neon-glow-green' : 'hover:shadow-xl';


  return (
    <Link 
      to={linkTo} 
      className={`group block p-6 bg-dark-secondary/80 rounded-xl shadow-xl ${shadowHoverClass} transition-all duration-300 transform hover:-translate-y-2.5 border-2 ${borderColorClass}/40 hover:${borderColorClass} animate-fadeIn focus-visible-outline h-full flex flex-col`}
      style={{ animationDelay: `${delay}s`}}
    >
      <div className={`flex items-center ${textColorClass} mb-4`}>
        <i className={`${icon} text-4xl mr-4 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-[-6deg] rounded-full p-2.5 bg-dark-primary/70`}></i>
        <h3 className={`text-2xl font-semibold text-light-primary group-hover:${textColorClass} transition-colors`}>{title}</h3>
      </div>
      <p className="text-light-secondary text-sm leading-relaxed flex-grow">{description}</p>
      <span className={`mt-5 inline-block text-sm font-medium ${textColorClass} group-hover:underline`}>Learn More &rarr;</span>
    </Link>
  );
};


const PublicationPreviewCard: React.FC<{ pub: Publication }> = ({ pub }) => (
  <div className="bg-dark-secondary/80 p-5 rounded-lg shadow-lg hover:shadow-neon-glow-blue transition-all duration-300 border-l-4 border-neon-blue hover:border-neon-pink transform hover:-translate-y-2 hover:scale-[1.025] focus-within:border-neon-pink focus-visible-outline h-full flex flex-col">
    <h4 className="text-md font-semibold text-neon-blue mb-1 line-clamp-2 group-hover:text-neon-pink" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-light-secondary mb-1 italic truncate">{pub.authors}</p>
    <p className="text-xs text-light-secondary mb-2 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mt-2 mb-1 flex-grow">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/25 text-neon-green' : 'bg-neon-blue/25 text-neon-blue'} border border-current/50`}>
           {metric.icon && <i className={`${metric.icon} mr-1`}></i>}{metric.name && `${metric.name}: `}{metric.value}
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
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }} 
      className="text-xs text-neon-pink hover:underline focus-visible-outline rounded-sm mt-auto pt-2"
    >
      View Details &rarr;
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
  
  return "fas fa-atom"; // Default icon
};

const ResearchHighlightCard: React.FC<{ pub: Publication }> = ({ pub }) => (
   <div className="bg-dark-secondary/80 rounded-lg shadow-xl overflow-hidden group flex flex-col h-full hover:shadow-neon-glow-pink transition-all duration-300 transform hover:scale-[1.035] focus-visible-outline">
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-56"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual representation for ${pub.title}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-56 bg-dark-primary/70 flex items-center justify-center border-b border-neon-blue/40"> 
            <i className={`${getIconForPublication(pub)} text-6xl text-neon-blue opacity-60 group-hover:animate-pulseGlow [--tw-shadow-color:theme('colors.neon-blue')] group-hover:opacity-90`}></i> 
        </div>
    )}
    <div className="p-5 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-neon-blue mb-2 group-hover:text-neon-pink transition-colors">{pub.title}</h4>
      <p className="text-sm text-light-secondary mb-3 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-3">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-neon-green/85 text-dark-primary' : 'bg-neon-blue/85 text-dark-primary'} shadow-sm`}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm text-neon-pink hover:underline font-medium group-hover:text-neon-blue transition-colors focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm text-neon-pink hover:underline font-medium group-hover:text-neon-blue transition-colors focus-visible-outline rounded-sm">
            View Source <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : (
           <Link 
             to={`/#research`} 
             onClick={(e) => {
               e.preventDefault(); 
               const el = document.getElementById(`pub-${pub.id}`); 
               if(el) {
                const headerOffset = 100;
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               }
             }} 
             className="text-sm text-neon-pink hover:underline font-medium group-hover:text-neon-blue transition-colors focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-dark-secondary/80 p-6 rounded-lg shadow-xl border-t-4 border-neon-pink/60 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-neon-glow-pink focus-visible-outline">
    {testimonial.avatarUrl && 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-neon-pink object-cover shadow-lg"
      />
    }
    {!testimonial.avatarUrl && (
      <div className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-neon-pink bg-dark-primary/70 flex items-center justify-center shadow-lg">
        <i className="fas fa-user-tie text-4xl text-neon-pink opacity-75"></i>
      </div>
    )}
    <blockquote className="mb-4 flex-grow">
      <p className="text-light-secondary italic text-md leading-relaxed">
        <span className="text-3xl text-neon-pink/80 leading-none mr-1">&ldquo;</span>
        {testimonial.quote}
        <span className="text-3xl text-neon-pink/80 leading-none ml-1">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-4">
      <h4 className="font-semibold text-neon-blue text-lg">{testimonial.author}</h4>
      <p className="text-xs text-light-secondary">{testimonial.authorTitle}</p>
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

      <Section title="My Impact Areas" id="impact-areas" className="bg-dark-primary/60" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImpactCard title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="neon-blue" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="neon-pink" delay={0.3}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="neon-green" delay={0.4}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="neon-blue" delay={0.5}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" className="bg-dark-secondary/80" subtitle="Highlights from my most impactful and recent contributions.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPublications.map((pub,idx) => (
              <div key={pub.id} className="animate-fadeIn h-full" style={{animationDelay: `${0.2 + idx * 0.1}s`}}> 
                <PublicationPreviewCard pub={pub} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-fadeIn" style={{animationDelay: `${0.2 + featuredPublications.length * 0.1}s`}}>
              <Link 
                to="/#research"
                onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior:'smooth', block:'start'});}}
                className="inline-block gradient-bg text-white font-semibold py-3.5 px-10 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-md focus-visible-outline"
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" className="bg-dark-primary/60" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchHighlights.map((pub, idx) => (
              <div key={`highlight-${pub.id}`} className="animate-fadeIn" style={{animationDelay: `${0.2 + idx * 0.1}s`}}>
                 <ResearchHighlightCard pub={pub} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" className="bg-dark-secondary/80" subtitle="Feedback from collaborators and partners.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((testimonial, idx) => (
              <div key={testimonial.id} className="animate-fadeIn" style={{animationDelay: `${0.2 + idx * 0.1}s`}}>
                 <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};