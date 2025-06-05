
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial, PublicationType } from '../types';

const HeroSection: React.FC = () => {
  const baseDelay = 0.1;
  const nameDelay = baseDelay + 0.2;
  const rolesDelay = nameDelay + 0.2;
  const subtitleDelay = rolesDelay + 0.15;
  const taglineDelay = subtitleDelay + 0.2;
  const keywordsTitleDelay = taglineDelay + 0.25;
  const keywordsContainerBaseDelay = keywordsTitleDelay + 0.1;
  const numKeywords = personalInfoData.currentFocusKeywords?.length || 0;
  const keywordItemDelayIncrement = 0.07;
  const keywordsFinishTime = keywordsContainerBaseDelay + (numKeywords > 0 ? (numKeywords -1) * keywordItemDelayIncrement : 0) + 0.1;
  const keyMetricsBaseDelay = keywordsFinishTime + 0.2;
  const numStats = personalInfoData.keyStats?.length || 0;
  const keyMetricsItemDelayIncrement = 0.1;
  const keyMetricsFinishTime = keyMetricsBaseDelay + (numStats > 0 ? (numStats -1) * keyMetricsItemDelayIncrement : 0) + 0.1;
  const actionButtonsDelay = keyMetricsFinishTime + 0.15;

  return (
  <div className="min-h-[calc(85vh-80px)] md:min-h-[calc(80vh-80px)] flex flex-col items-center justify-center text-center py-16 md:py-20 relative overflow-hidden"> {/* Removed bg-dark-primary */}
    {/* Subtle pattern or effect can go here if needed, but particles.js is global */}
    <div className="relative z-10 px-4 flex flex-col items-center">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto mb-6 border-4 border-primary shadow-lg object-cover animate-fadeIn" /* Changed border and shadow */
        style={{animationDelay: `${baseDelay}s`, objectPosition: 'center 10%' }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-light-primary mb-3 animate-fadeIn" style={{animationDelay: `${nameDelay}s`}}>
        Dr. Jaskirat <span className="gradient-text">Singh</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-2 animate-fadeIn" style={{animationDelay: `${rolesDelay}s`}}>
        <span className="gradient-text font-semibold">Researcher</span>,
        <span className="gradient-text font-semibold mx-1.5">Educator</span>,
        <span className="gradient-text font-semibold">Innovator</span>
      </p>
      <p className="text-md text-text-muted mb-5 animate-fadeIn" style={{animationDelay: `${subtitleDelay}s`}}>
        {personalInfoData.subtitle} 
      </p>

      <p className="text-lg sm:text-xl text-primary-light mb-6 animate-fadeIn" style={{animationDelay: `${taglineDelay}s`}}> {/* Changed color, removed text-shadow */}
        {personalInfoData.tagline}
      </p>
      
      {personalInfoData.currentFocusKeywords && personalInfoData.currentFocusKeywords.length > 0 && (
        <div className="my-6 md:my-8 max-w-3xl mx-auto w-full animate-fadeIn" style={{ animationDelay: `${keywordsTitleDelay}s` }}>
          <p className="text-md text-secondary mb-4 font-semibold"> {/* Changed color */}
            My Key Focus Areas & Keywords
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {personalInfoData.currentFocusKeywords.map((keyword, index) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-slate-700/50 border border-primary/40 text-primary-light rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:shadow-md cursor-default animate-fadeIn" /* Updated style */
                style={{ animationDelay: `${keywordsContainerBaseDelay + index * keywordItemDelayIncrement}s` }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
        
      {personalInfoData.keyStats && (
         <div className="mt-8 mb-8 md:mb-10 animate-fadeIn" style={{ animationDelay: `${keyMetricsBaseDelay - 0.1}s`}}> {/* Adjusted container delay slightly */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {personalInfoData.keyStats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="bg-dark-secondary/60 p-5 rounded-lg text-center shadow-lg border border-slate-700/60 transition-all duration-300 hover:border-primary hover:shadow-lg hover:bg-dark-tertiary/70 animate-fadeIn transform hover:scale-[1.04]" /* Updated style */
                style={{ animationDelay: `${keyMetricsBaseDelay + index * keyMetricsItemDelayIncrement}s`}}
              >
                {stat.icon && <i className={`${stat.icon} text-3xl sm:text-4xl text-primary-light mb-2.5`}></i>} {/* Changed icon color */}
                <div className="text-3xl sm:text-4xl font-bold text-light-primary">
                  {stat.value}{stat.suffix && <span className="text-primary-light">{stat.suffix}</span>}
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
          className="inline-block gradient-bg text-white font-semibold py-3.5 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90 text-lg focus-visible-outline" /* Changed to gradient-bg, removed neon glow */
        >
          <i className="fas fa-atom mr-2"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="inline-block bg-transparent hover:bg-primary border-2 border-primary text-primary hover:text-white font-semibold py-3.5 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-lg focus-visible-outline" /* Changed colors, removed neon glow */
        >
          <i className="fas fa-hands-helping mr-2"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);
}

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay: number; }> = ({ title, linkTo, icon, description, colorClass, delay }) => {
  // colorClass will now be 'primary', 'secondary', or 'accent'
  const themeColorClass = 
    colorClass === 'primary' ? 'primary' :
    colorClass === 'secondary' ? 'secondary' :
    'accent';
  
  const iconTextColor = `text-${themeColorClass}`;
  const borderColorClass = `border-${themeColorClass}`;
  const hoverBorderColorClass = `hover:border-${themeColorClass}`;
  const learnMoreTextColor = `text-${themeColorClass}`;
  const groupHoverTextColor = `group-hover:text-${themeColorClass}`;
  const shadowHoverClass = `hover:shadow-xl hover:shadow-${themeColorClass}/20`;


  return (
    <Link 
      to={linkTo} 
      className={`group block p-6 bg-dark-secondary/70 rounded-xl shadow-lg ${shadowHoverClass} transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent ${hoverBorderColorClass} animate-fadeIn focus-visible-outline h-full flex flex-col`}
      style={{ animationDelay: `${delay}s`}}
    >
      <div className={`flex items-center ${iconTextColor} mb-4`}>
        <i className={`${icon} text-4xl mr-4 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-[-6deg] rounded-full p-2.5 bg-dark-primary/70`}></i>
        <h3 className={`text-2xl font-semibold text-light-primary ${groupHoverTextColor} transition-colors`}>{title}</h3>
      </div>
      <p className="text-light-secondary text-sm leading-relaxed flex-grow">{description}</p>
      <span className={`mt-5 inline-block text-sm font-medium ${learnMoreTextColor} group-hover:underline`}>Learn More &rarr;</span>
    </Link>
  );
};


const PublicationPreviewCard: React.FC<{ pub: Publication }> = ({ pub }) => (
  <div className="bg-dark-secondary/70 p-5 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 border-l-4 border-primary hover:border-secondary transform hover:-translate-y-2 hover:scale-[1.025] focus-within:border-secondary focus-visible-outline h-full flex flex-col">
    <h4 className="text-md font-semibold text-primary-light mb-1 line-clamp-2 group-hover:text-secondary" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-text-muted mb-1 italic truncate">{pub.authors}</p>
    <p className="text-xs text-text-muted mb-2 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mt-2 mb-1 flex-grow">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-accent/25 text-accent' : 'bg-primary/25 text-primary'} border border-current/50`}>
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
      className="text-xs text-secondary hover:underline focus-visible-outline rounded-sm mt-auto pt-2"
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
  
  return "fas fa-atom"; 
};

const ResearchHighlightCard: React.FC<{ pub: Publication }> = ({ pub }) => (
   <div className="bg-dark-secondary/70 rounded-lg shadow-xl overflow-hidden group flex flex-col h-full hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 transform hover:scale-[1.035] focus-visible-outline">
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-56"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual representation for ${pub.title}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-56 bg-dark-primary/70 flex items-center justify-center border-b border-primary/40"> 
            <i className={`${getIconForPublication(pub)} text-6xl text-primary opacity-60 group-hover:animate-pulseGlow [--glow-color:rgba(var(--primary-rgb),0.7)] group-hover:opacity-90`}></i> 
        </div>
    )}
    <div className="p-5 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-primary-light mb-2 group-hover:text-secondary transition-colors">{pub.title}</h4>
      <p className="text-sm text-text-muted mb-3 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-3">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-accent/85 text-dark-primary' : 'bg-primary/85 text-dark-primary'} shadow-sm`}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline font-medium group-hover:text-primary transition-colors focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:underline font-medium group-hover:text-primary transition-colors focus-visible-outline rounded-sm">
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
             className="text-sm text-secondary hover:underline font-medium group-hover:text-primary transition-colors focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-dark-secondary/70 p-6 rounded-lg shadow-xl border-t-4 border-secondary/60 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/20 focus-visible-outline">
    {testimonial.avatarUrl && 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-secondary object-cover shadow-lg"
      />
    }
    {!testimonial.avatarUrl && (
      <div className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-secondary bg-dark-primary/70 flex items-center justify-center shadow-lg">
        <i className="fas fa-user-tie text-4xl text-secondary opacity-75"></i>
      </div>
    )}
    <blockquote className="mb-4 flex-grow">
      <p className="text-text-muted italic text-md leading-relaxed">
        <span className="text-3xl text-secondary/80 leading-none mr-1">&ldquo;</span>
        {testimonial.quote}
        <span className="text-3xl text-secondary/80 leading-none ml-1">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-4">
      <h4 className="font-semibold text-primary-light text-lg">{testimonial.author}</h4>
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
    <div className="animate-fadeIn"> 
      <HeroSection />

      <Section title="My Impact Areas" id="impact-areas" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImpactCard title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="primary" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="secondary" delay={0.3}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="accent" delay={0.4}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="primary" delay={0.5}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" subtitle="Highlights from my most impactful and recent contributions.">
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
        <Section title="Research Spotlights" id="research-highlights" subtitle="Key insights and takeaways from my impactful research.">
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
        <Section title="What Others Say" id="testimonials" subtitle="Feedback from collaborators and partners.">
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
