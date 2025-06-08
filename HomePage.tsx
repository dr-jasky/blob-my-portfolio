
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from './data';
import { Section } from './components/Section';
import { KeyStat, Publication, Testimonial } from './types';

const KeyMetrics: React.FC<{ stats: KeyStat[] }> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="mt-10 mb-8 md:mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div 
            key={stat.id} 
            className="bg-dark-secondary/50 p-4 rounded-lg text-center shadow-lg border border-[rgba(var(--accent-primary-rgb),0.2)] transition-all duration-300 hover:border-accent-primary hover:shadow-accent-glow-primary animate-fadeIn"
            style={{ animationDelay: `${0.8 + index * 0.15}s`}}
          >
            {stat.icon && <i className={`${stat.icon} text-3xl text-accent-primary mb-2`}></i>}
            <div className="text-2xl sm:text-3xl font-bold text-light-primary">
              {stat.value}{stat.suffix && <span className="text-accent-primary">{stat.suffix}</span>}
            </div>
            <p className="text-xs sm:text-sm text-light-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const HeroSection: React.FC = () => (
  <div className="min-h-[calc(85vh-80px)] md:min-h-[calc(75vh-80px)] flex flex-col items-center justify-center text-center bg-dark-primary py-12 md:py-16 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02] z-0">
      {/* Subtle animated pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="heroPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(1) rotate(30)">
            <circle cx="30" cy="30" r="1" strokeWidth="0.5" stroke="rgba(0, 255, 255, 0.3)" fill="rgba(0, 255, 255, 0.1)">
              <animate attributeName="r" values="1;3;1" dur="5s" repeatCount="indefinite" />
            </circle>
            <path d="M30 0 L30 60 M0 30 L60 30" strokeWidth="0.3" stroke="rgba(0, 255, 255, 0.2)">
               <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="20s" repeatCount="indefinite"/>
            </path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroPattern)" />
      </svg>
    </div>

    <div className="relative z-10 px-4 flex flex-col items-center">
      <img 
        src={personalInfoData.profileImageUrl} 
        alt={personalInfoData.name} 
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto mb-6 border-4 border-accent-primary shadow-accent-glow-primary object-cover animate-fadeIn"
        style={{animationDelay: '0.1s'}}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-light-primary mb-3 animate-fadeIn" style={{animationDelay: '0.3s'}}>
        {personalInfoData.name}
      </h1>
      <p className="text-xl sm:text-2xl text-accent-primary mb-5 animate-fadeIn" style={{animationDelay: '0.5s'}}>
        {personalInfoData.tagline}
      </p>
      <p className="text-md sm:text-lg text-light-secondary max-w-2xl mx-auto mb-10 animate-fadeIn" style={{animationDelay: '0.7s'}}>
        {personalInfoData.professionalSummary ? personalInfoData.professionalSummary.substring(0, 180) + '...' : ''}
      </p>
      
      {personalInfoData.keyStats && <KeyMetrics stats={personalInfoData.keyStats} />}

      <div className="space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeIn" style={{animationDelay: '0.9s'}}>
        <Link 
          to="/research"
          className="inline-block bg-accent-primary hover:bg-opacity-80 text-dark-bg font-semibold py-3.5 px-10 rounded-lg shadow-accent-glow-primary transition-all duration-300 transform hover:scale-105 text-lg"
        >
          <i className="fas fa-atom mr-2"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="inline-block bg-transparent hover:bg-accent-secondary border-2 border-accent-secondary text-accent-secondary hover:text-dark-bg font-semibold py-3.5 px-10 rounded-lg shadow-accent-glow-secondary transition-all duration-300 transform hover:scale-105 text-lg"
        >
          <i className="fas fa-hands-helping mr-2"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay: number; }> = ({ title, linkTo, icon, description, colorClass, delay }) => {
  const accentColorClass =
    colorClass === 'neon-blue' ? 'accent-primary' :
    colorClass === 'neon-pink' ? 'accent-secondary' :
    'accent-tertiary'; // Assuming neon-green maps to accent-tertiary

  const hoverBorderColor = `hover:border-${accentColorClass}`;

  const glowShadowClass =
    colorClass === 'neon-blue' ? 'shadow-accent-glow-primary' :
    colorClass === 'neon-pink' ? 'shadow-accent-glow-secondary' :
    'shadow-accent-glow-tertiary';

  const hoverGlowShadow = `hover:${glowShadowClass}`;

  return (
    <Link 
      to={linkTo} 
      className={`group block p-6 bg-dark-secondary rounded-xl shadow-xl ${hoverGlowShadow} transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent ${hoverBorderColor} animate-fadeIn`}
      style={{ animationDelay: `${delay}s`}}
    >
      <div className={`flex items-center text-${accentColorClass} mb-5`}>
        <i className={`${icon} text-4xl mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] group-hover:${glowShadowClass} rounded-full p-2 bg-dark-primary`}></i>
        <h3 className={`text-2xl font-semibold text-light-primary group-hover:text-${accentColorClass} transition-colors`}>{title}</h3>
      </div>
      <p className="text-light-secondary text-sm leading-relaxed">{description}</p>
      <span className={`mt-4 inline-block text-sm font-medium text-${accentColorClass} group-hover:underline`}>Learn More &rarr;</span>
    </Link>
  );
};


const PublicationPreviewCard: React.FC<{ pub: Publication }> = ({ pub }) => (
  <div className="bg-dark-secondary p-5 rounded-lg shadow-lg hover:shadow-accent-glow-primary transition-all duration-300 border-l-4 border-accent-primary hover:border-accent-secondary transform hover:-translate-y-1">
    <h4 className="text-md font-semibold text-accent-primary mb-1 line-clamp-2" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-light-secondary mb-1 italic truncate">{pub.authors}</p>
    <p className="text-xs text-light-secondary mb-2 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mt-2 mb-1">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name} className={`inline-block text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-[rgba(var(--accent-tertiary-rgb),0.2)] text-accent-tertiary' : 'bg-[rgba(var(--accent-primary-rgb),0.2)] text-accent-primary'}`}>
           {metric.icon && <i className={`${metric.icon} mr-1`}></i>}{metric.name}: {metric.value}
          </span>
        ))}
      </div>
    )}
    <Link to={`/research#${pub.id}`} className="text-xs text-accent-secondary hover:underline">View Details &rarr;</Link>
  </div>
);

const ResearchHighlightCard: React.FC<{ pub: Publication }> = ({ pub }) => (
   <div className="bg-dark-secondary rounded-lg shadow-xl overflow-hidden group flex flex-col h-full hover:shadow-accent-glow-secondary transition-all duration-300 transform hover:scale-[1.02]">
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-48">
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual representation for ${pub.title}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    ) : ( 
        <div className="w-full h-48 bg-dark-primary flex items-center justify-center border-b border-[rgba(var(--accent-primary-rgb),0.3)]">
            <i className="fas fa-atom text-5xl text-accent-primary opacity-50 group-hover:animate-pulseGlow [--tw-shadow-color:rgba(var(--accent-primary-rgb))]"></i>
        </div>
    )}
    <div className="p-6 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-accent-primary mb-2 group-hover:text-accent-secondary transition-colors">{pub.title}</h4>
      <p className="text-sm text-light-secondary mb-3 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-3">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full ${metric.value.toString().startsWith('Q1') ? 'bg-[rgba(var(--accent-tertiary-rgb),0.8)] text-dark-bg' : 'bg-[rgba(var(--accent-primary-rgb),0.8)] text-dark-bg'}`}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-secondary hover:underline font-medium group-hover:text-accent-primary transition-colors">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-secondary hover:underline font-medium group-hover:text-accent-primary transition-colors">
            View Source <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : (
           <Link to={`/research#${pub.id}`} className="text-sm text-accent-secondary hover:underline font-medium group-hover:text-accent-primary transition-colors">
            Learn More on Site <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-dark-secondary p-6 rounded-lg shadow-xl border-t-4 border-[rgba(var(--accent-secondary-rgb),0.5)] flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-accent-glow-secondary">
    {testimonial.avatarUrl && 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-accent-secondary object-cover shadow-md"
      />
    }
    {!testimonial.avatarUrl && (
      <div className="w-24 h-24 rounded-full mx-auto mb-5 border-2 border-accent-secondary bg-dark-primary flex items-center justify-center shadow-md">
        <i className="fas fa-user-tie text-4xl text-accent-secondary opacity-70"></i>
      </div>
    )}
    <blockquote className="mb-4 flex-grow">
      <p className="text-light-secondary italic text-md leading-relaxed">
        <span className="text-3xl text-[rgba(var(--accent-secondary-rgb),0.7)] leading-none mr-1">&ldquo;</span>
        {testimonial.quote}
        <span className="text-3xl text-[rgba(var(--accent-secondary-rgb),0.7)] leading-none ml-1">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-4">
      <h4 className="font-semibold text-accent-primary text-lg">{testimonial.author}</h4>
      <p className="text-xs text-light-secondary">{testimonial.authorTitle}</p>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  const featuredPublications = [...publicationsData]
    .sort((a, b) => {
      const yearA = typeof a.year === 'string' ? parseInt(a.year) : a.year;
      const yearB = typeof b.year === 'string' ? parseInt(b.year) : b.year;
      if (yearB !== yearA) return yearB - yearA;
      // Secondary sort: Q1/Q2 papers first
      const aIsHighImpact = a.impactMetrics?.some(m => m.value === "Q1" || m.value === "Q2");
      const bIsHighImpact = b.impactMetrics?.some(m => m.value === "Q1" || m.value === "Q2");
      if (aIsHighImpact && !bIsHighImpact) return -1;
      if (!aIsHighImpact && bIsHighImpact) return 1;
      return 0;
    })
    .slice(0, 3);

  const researchHighlights = publicationsData
    .filter(pub => pub.insightSnippet && pub.featuredImageUrl)
    .sort((a,b) => (typeof b.year === 'string' ? parseInt(b.year) : b.year) - (typeof a.year === 'string' ? parseInt(a.year) : a.year) )
    .slice(0, 3);
    
  if (researchHighlights.length < 3 && featuredPublications.length > researchHighlights.length) {
    const otherFeatured = featuredPublications.filter(fp => !researchHighlights.some(rh => rh.id === fp.id));
    researchHighlights.push(...otherFeatured.slice(0, 3 - researchHighlights.length));
  }


  return (
    <div className="animate-fadeIn">
      <HeroSection />

      <Section title="My Impact Areas" id="impact-areas" className="bg-dark-primary/50" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <ImpactCard title="Research & Publications" linkTo="/research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="neon-blue" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="neon-pink" delay={0.3}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="neon-green" delay={0.4}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="neon-blue" delay={0.5}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" className="bg-dark-secondary" subtitle="Highlights from my most impactful and recent contributions.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPublications.map(pub => (
              <PublicationPreviewCard key={pub.id} pub={pub} />
            ))}
          </div>
          <div className="text-center mt-12">
              <Link 
                to="/research"
                className="inline-block bg-accent-primary hover:bg-opacity-80 text-dark-bg font-semibold py-3 px-8 rounded-lg shadow-accent-glow-primary transition-all duration-300 transform hover:scale-105 text-md"
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" className="bg-dark-primary/50" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {researchHighlights.map(pub => (
              <ResearchHighlightCard key={`highlight-${pub.id}`} pub={pub} />
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" className="bg-dark-secondary" subtitle="Feedback from collaborators and partners.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonialsData.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};