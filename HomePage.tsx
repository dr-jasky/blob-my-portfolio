
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
  <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 md:py-28 relative overflow-hidden">
    {/* Removed SVG pattern div */}
    <div className="relative z-10 px-6 flex flex-col items-center max-w-3xl mx-auto">
      {/* Removed profile image img tag */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-light mb-4 animate-hero-text-line">
        {personalInfoData.name}
      </h1>
      <p className="text-xl sm:text-2xl text-accent-primary mb-6 animate-hero-text-line">
        {personalInfoData.tagline}
      </p>
      <p className="text-lg sm:text-xl text-text-medium max-w-xl mx-auto mb-10 animate-hero-text-line">
        {personalInfoData.professionalSummary ? personalInfoData.professionalSummary.substring(0, 180) + '...' : ''}
      </p>
      
      {/* Removed KeyMetrics component */}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-hero-button">
        <Link 
          to="/research"
          className="btn-primary-hero"
        >
          <i className="fas fa-atom mr-2"></i>Explore Research
        </Link>
        <Link 
          to="/consultancy"
          className="btn-secondary-hero"
        >
          <i className="fas fa-hands-helping mr-2"></i>Offer Consultancy
        </Link>
      </div>
    </div>
  </div>
);

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; colorClass: string; delay: number; }> = ({ title, linkTo, icon, description, colorClass, delay }) => {
  // Note: colorClass prop might be deprecated or simplified if all impact cards now use primary accent
  // For now, we'll keep the logic but map it only to accent-primary or a default
  const determinedAccentClass =
    colorClass === 'neon-pink' ? 'accent-secondary' : // Example if one still needs secondary
    colorClass === 'neon-green' ? 'accent-tertiary' : // Example if one still needs tertiary
    'accent-primary'; // Default to primary

  return (
    <Link 
      to={linkTo} 
      className="group block p-6 bg-[#1F1F1F] rounded-lg shadow-lg hover:bg-[#2A2A2A] hover:shadow-xl transition-all duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)] transform hover:-translate-y-1 animate-fadeIn"
      style={{ animationDelay: `${delay}s`}}
    >
      <div className="flex items-center mb-3">
        <i className={`${icon} text-3xl text-accent-primary p-3 bg-[rgba(var(--accent-primary-rgb),0.1)] rounded-full mr-4 transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)] group-hover:bg-[rgba(var(--accent-primary-rgb),0.2)]`}></i>
        <h3 className={`text-xl font-semibold text-text-light mb-2 group-hover:text-accent-primary transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)]`}>{title}</h3>
      </div>
      <p className="text-text-medium text-sm leading-relaxed mb-4">{description}</p>
      <span className={`inline-block text-sm font-medium text-accent-primary group-hover:underline`}>Learn More &rarr;</span>
    </Link>
  );
};


const PublicationPreviewCard: React.FC<{ pub: Publication }> = ({ pub }) => (
  <div className="p-6 bg-[#1F1F1F] rounded-lg shadow-lg hover:bg-[#2A2A2A] hover:shadow-xl transition-all duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)] border-l-4 border-accent-primary">
    <h4 className="text-lg font-semibold text-text-light mb-1 line-clamp-2" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-text-medium mb-1 italic truncate">{pub.authors}</p>
    <p className="text-xs text-text-medium mb-3 truncate">
      {pub.source}, {pub.year}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mt-2 mb-1">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name} className="inline-block text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded-full bg-[rgba(var(--accent-primary-rgb),0.1)] text-accent-primary">
           {metric.icon && <i className={`${metric.icon} mr-1`}></i>}{metric.name}: {metric.value}
          </span>
        ))}
      </div>
    )}
    <Link to={`/research#${pub.id}`} className="text-sm text-accent-primary hover:underline font-medium mt-3 block">View Details &rarr;</Link>
  </div>
);

const ResearchHighlightCard: React.FC<{ pub: Publication }> = ({ pub }) => (
   <div className="bg-[#1F1F1F] rounded-lg shadow-lg overflow-hidden group flex flex-col h-full hover:shadow-xl transition-all duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)] hover:scale-[1.03]">
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
        <div className="w-full h-48 bg-dark-primary flex items-center justify-center border-b border-gray-700">
            <i className="fas fa-atom text-5xl text-text-muted opacity-50"></i>
        </div>
    )}
    <div className="p-6 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-text-light mb-2 group-hover:text-accent-primary transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)]">{pub.title}</h4>
      <p className="text-sm text-text-medium mb-3 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-3">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name} className="inline-flex items-center text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full bg-[rgba(var(--accent-primary-rgb),0.1)] text-accent-primary">
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-primary hover:underline font-medium group-hover:text-accent-primary transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)]">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-primary hover:underline font-medium group-hover:text-accent-primary transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)]">
            View Source <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        ) : (
           <Link to={`/research#${pub.id}`} className="text-sm text-accent-primary hover:underline font-medium group-hover:text-accent-primary transition-colors duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)]">
            Learn More on Site <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="p-6 bg-[#1F1F1F] rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-[var(--transition-duration-medium)] ease-[var(--transition-timing-function)] hover:shadow-xl hover:scale-[1.03] border-t-4 border-accent-primary">
    {testimonial.avatarUrl && 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-20 h-20 rounded-full mx-auto mb-5 border-2 border-accent-primary object-cover"
      />
    }
    {!testimonial.avatarUrl && (
      <div className="w-20 h-20 rounded-full mx-auto mb-5 border-2 border-accent-primary bg-gray-700 flex items-center justify-center">
        <i className="fas fa-user-tie text-4xl text-accent-primary opacity-70"></i>
      </div>
    )}
    <blockquote className="mb-4 flex-grow">
      <p className="text-text-medium italic text-md leading-relaxed">
        {testimonial.quote}
      </p>
    </blockquote>
    <div className="mt-auto pt-4">
      <h4 className="font-semibold text-text-light text-lg mt-4">{testimonial.author}</h4>
      <p className="text-xs text-text-medium">{testimonial.authorTitle}</p>
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

      <Section title="My Impact Areas" id="impact-areas" subtitle="Leveraging expertise to drive meaningful change and foster innovation.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <ImpactCard title="Research & Publications" linkTo="/research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorClass="neon-blue" delay={0.2} />
          <ImpactCard title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorClass="neon-pink" delay={0.3}/>
          <ImpactCard title="Teaching & Mentorship" linkTo="/experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorClass="neon-green" delay={0.4}/>
          <ImpactCard title="Key Expertise Areas" linkTo="/skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorClass="neon-blue" delay={0.5}/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" subtitle="Highlights from my most impactful and recent contributions.">
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
        <Section title="Research Spotlights" id="research-highlights" subtitle="Key insights and takeaways from my impactful research.">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {researchHighlights.map(pub => (
              <ResearchHighlightCard key={`highlight-${pub.id}`} pub={pub} />
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" subtitle="Feedback from collaborators and partners.">
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