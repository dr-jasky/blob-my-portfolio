
import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfoData, publicationsData, testimonialsData } from '../data';
import { Section } from '../components/Section';
import { KeyStat, Publication, Testimonial } from '../types';

const KeyMetrics: React.FC<{ stats: KeyStat[] }> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div 
            key={stat.id} 
            className="glass-card p-5 sm:p-6 rounded-xl text-center hover-card animate-fadeIn" // Theme's glass-card and hover-card
            style={{ animationDelay: `${0.8 + index * 0.1}s`}}
          >
            {stat.icon && <i className={`${stat.icon} text-3xl mb-3 text-theme-primary-light`}></i>}
            <div className="text-3xl font-bold mb-1 gradient-text">{stat.value}{stat.suffix}</div> {/* Theme's gradient-text */}
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
  );
};


const HeroSection: React.FC = () => {
    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      let headerOffset = 80; 
      if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
          const rootStyle = getComputedStyle(document.documentElement);
          const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
          headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
      }
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const nameParts = personalInfoData.name.split(' ');
  const lastName = nameParts.pop() || '';
  const firstNameAndTitle = nameParts.join(' ');
  
  return (
  <section id="home-hero-section" className="min-h-screen flex items-center pt-24 md:pt-28 pb-16 relative overflow-hidden"> {/* Changed id to avoid conflict with App.tsx mapping */}
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-theme-light">
            {firstNameAndTitle} <span className="gradient-text">{lastName}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-theme-primary-light mb-2">
            {personalInfoData.title}
          </h2>
          <p className="text-gray-400 text-base mb-6 sm:mb-8">
            {personalInfoData.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
            {personalInfoData.tagline}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
            <Link 
              to="/#contact"
              onClick={(e) => handleScrollToSection(e, 'contact')}
              className="btn-base btn-gradient-primary text-md !py-3 !px-7" /* Theme button */
            >
              <i className="fas fa-envelope"></i> Contact Me
            </Link>
            <Link 
              to="/#research"
              onClick={(e) => handleScrollToSection(e, 'research')}
              className="btn-base btn-outline-primary text-md !py-3 !px-7" /* Theme button */
            >
              <i className="fas fa-microscope"></i> View Research
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center relative animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <div className="relative floating"> {/* Theme's floating animation */}
            <div className="absolute inset-0 bg-theme-primary opacity-20 blur-3xl animate-pulse"></div> {/* Theme's primary color for pulse */}
            <div className="profile-img-container"> {/* Theme's profile image container */}
              <div className="profile-glow"></div> {/* Theme's profile glow */}
              <img 
                src={personalInfoData.profileImageUrl} 
                alt={personalInfoData.name} 
                className="profile-img" /* Theme's profile image class */
                style={{ objectPosition: 'center 10%'}} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {personalInfoData.keyStats && <KeyMetrics stats={personalInfoData.keyStats} />}
    </div>
  </section>
  );
};

const ImpactCard: React.FC<{ title: string; linkTo: string; icon: string; description: string; delay?: number; colorVarName?: string; }> = 
  ({ title, linkTo, icon, description, delay = 0, colorVarName = '--primary-color' }) => {
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (linkTo.startsWith("/#")) {
        e.preventDefault();
        const id = linkTo.substring(2);
        const element = document.getElementById(id);
        if (element) {
            let headerOffset = 80;
             if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
                const rootStyle = getComputedStyle(document.documentElement);
                const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
                headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
            }
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    } 
  };

  const dynamicColor = `var(${colorVarName})`;

  return (
    <Link 
      to={linkTo} 
      onClick={handleLinkClick}
      className={`group block glass-card p-6 md:p-7 h-full flex flex-col hover-card animate-fadeIn`} // Theme's cards
      style={{ animationDelay: `${delay}s`, borderColor: `rgba(from ${dynamicColor} r g b / 0.3)` } as React.CSSProperties}
    >
      <div className={`flex items-center mb-4 sm:mb-5`}>
        <div className="p-3.5 rounded-lg mr-4 shadow-sm border-2" style={{backgroundColor: `rgba(from ${dynamicColor} r g b / 0.1)`, borderColor: `rgba(from ${dynamicColor} r g b / 0.25)`}}>
            <i className={`${icon} text-2xl`} style={{color: dynamicColor}}></i>
        </div>
        <h3 className={`text-xl font-semibold text-theme-light group-hover:text-[${dynamicColor}] transition-colors duration-200`}>{title}</h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-grow">{description}</p>
      <span className={`mt-5 sm:mt-6 inline-block text-sm font-medium group-hover:underline`} style={{color: dynamicColor}}>
        Learn More <i className="fas fa-arrow-right text-xs ml-1.5 transition-transform duration-200 group-hover:translate-x-1"></i>
      </span>
    </Link>
  );
};

const PublicationPreviewCard: React.FC<{ pub: Publication, delay?: number }> = ({ pub, delay = 0 }) => (
  <div className="glass-card p-5 sm:p-6 h-full flex flex-col publication-card-custom hover-card animate-fadeIn" style={{animationDelay: `${delay}s`}}> {/* Theme's cards */}
    <h4 className="text-md font-semibold text-theme-primary-light mb-2 line-clamp-3 group-hover:text-theme-accent transition-colors duration-200" title={pub.title}>{pub.title}</h4>
    <p className="text-xs text-gray-400 mb-1.5 italic truncate">{pub.authors}</p>
    <p className="text-xs text-gray-500 mb-3 truncate">
      {pub.source}, {pub.year.toString().replace("Expected","Exp.").replace("Communicated", "Comm.")}
    </p>
    {pub.impactMetrics && pub.impactMetrics.length > 0 && (
      <div className="mb-4 pt-3 border-t border-white/10">
        {pub.impactMetrics.slice(0, 2).map(metric => (
          <span key={metric.name+metric.value} className={`inline-block text-xs font-medium mr-2 mb-1 px-3 py-1.5 rounded-full shadow-sm border
            ${metric.value.toString().startsWith('Q1') ? 'bg-theme-accent/20 text-theme-accent border-theme-accent/30' 
            : 'bg-theme-primary/20 text-theme-primary border-theme-primary/30'}`}>
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
          let headerOffset = 80;
          if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
              const rootStyle = getComputedStyle(document.documentElement);
              const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
              headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
          }
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else { 
            const researchSection = document.getElementById('research');
            if (researchSection) {
                 let headerOffset = 80;
                 if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
                    const rootStyle = getComputedStyle(document.documentElement);
                    const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
                    headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
                  }
                 const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                 const offsetPosition = elementPosition - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
      }} 
      className="text-sm text-theme-secondary hover:underline focus-visible-outline rounded-sm mt-auto pt-2 font-semibold transition-colors duration-200"
    >
      View Details <i className="fas fa-arrow-right text-xs ml-1.5"></i>
    </Link>
  </div>
);


const ResearchHighlightCard: React.FC<{ pub: Publication, delay?: number }> = ({ pub, delay = 0 }) => (
   <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full hover-card publication-card-custom animate-fadeIn" style={{animationDelay: `${delay}s`}}> {/* Theme's cards */}
    {pub.featuredImageUrl ? (
      <div className="relative overflow-hidden h-52 sm:h-56"> 
        <img 
          src={pub.featuredImageUrl} 
          alt={`Visual for ${pub.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.85)] via-[rgba(15,23,42,0.4)] to-transparent"></div> {/* Dark overlay from theme */}
      </div>
    ) : ( 
        <div className="w-full h-52 sm:h-56 bg-white/5 flex items-center justify-center border-b border-white/10"> 
            <i className={`fas fa-atom text-6xl sm:text-7xl text-theme-primary opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse`}></i> 
        </div>
    )}
    <div className="p-5 md:p-6 flex-grow flex flex-col">
      <h4 className="text-lg font-semibold text-theme-primary-light mb-2.5 group-hover:text-theme-accent transition-colors duration-200 line-clamp-3" title={pub.title}>{pub.title}</h4>
      <p className="text-sm text-gray-300 mb-4 line-clamp-3 flex-grow">{pub.insightSnippet || pub.summary || "Click to read more about this research."}</p>
      {pub.impactMetrics && pub.impactMetrics.length > 0 && (
        <div className="mb-5">
          {pub.impactMetrics.map(metric => (
            <span key={metric.name+metric.value} className={`inline-flex items-center text-xs font-semibold mr-2 mb-1 px-3 py-1.5 rounded-full shadow-sm
            ${metric.value.toString().startsWith('Q1') ? 'bg-theme-accent/80 text-theme-dark' 
            : 'bg-theme-primary/80 text-theme-dark'}`}>
              {metric.icon && <i className={`${metric.icon} mr-1.5`}></i>}{metric.value}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        {pub.doiLink ? (
          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-theme-secondary hover:underline transition-colors duration-200 focus-visible-outline rounded-sm">
            Read Full Paper (DOI) <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
          </a>
        ) : pub.link ? (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-theme-secondary hover:underline transition-colors duration-200 focus-visible-outline rounded-sm">
            View Source <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
          </a>
        ) : (
           <Link 
             to={`/#research`} 
             onClick={(e) => {
               e.preventDefault(); 
               const el = document.getElementById(`pub-${pub.id}`); 
               if(el) {
                let headerOffset = 80;
                if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
                  const rootStyle = getComputedStyle(document.documentElement);
                  const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
                  headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
                }
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               } else { 
                  const researchSection = document.getElementById('research');
                  if(researchSection){
                    let headerOffset = 80;
                    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
                      const rootStyle = getComputedStyle(document.documentElement);
                      const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
                      headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
                    }
                    const elementPosition = researchSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
               }
             }} 
             className="text-sm font-semibold text-theme-secondary hover:underline transition-colors duration-200 focus-visible-outline rounded-sm"
            >
            Learn More on Site <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, delay?: number }> = ({ testimonial, delay = 0 }) => (
  <div className="glass-card p-6 md:p-7 flex flex-col items-center text-center h-full hover-card animate-fadeIn" style={{animationDelay: `${delay}s`, borderColor: 'rgba(from var(--secondary-color) r g b / 0.3)'}}> {/* Theme card, purple accent */}
    {testimonial.avatarUrl ? 
      <img 
        src={testimonial.avatarUrl} 
        alt={testimonial.author} 
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 border-3 border-[var(--secondary-color)] object-cover shadow-lg"
        style={{boxShadow: `0 0 15px var(--secondary-color)`}}
      />
    :
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 border-3 border-[var(--secondary-color)] bg-white/5 flex items-center justify-center shadow-sm">
        <i className="fas fa-user-tie text-4xl sm:text-5xl text-theme-secondary opacity-70"></i>
      </div>
    }
    <blockquote className="mb-6 flex-grow">
      <p className="text-gray-300 italic text-md leading-relaxed">
        <span className="text-4xl text-theme-secondary/70 leading-none mr-2 -mt-1 inline-block">&ldquo;</span>
        {testimonial.quote}
        <span className="text-4xl text-theme-secondary/70 leading-none ml-1.5 -mt-1 inline-block">&rdquo;</span>
      </p>
    </blockquote>
    <div className="mt-auto pt-5 border-t border-white/10 w-full">
      <h4 className="font-semibold text-theme-primary-light text-lg">{testimonial.author}</h4>
      <p className="text-xs text-gray-500">{testimonial.authorTitle}</p>
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

      <Section title="My Impact Areas" id="impact-areas" subtitle="Leveraging expertise to drive meaningful change and foster innovation." titleClassName="accented">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-8">
          <ImpactCard delay={0.1} title="Research & Publications" linkTo="/#research" icon="fas fa-atom" description="Pioneering research in finance, technology, and socio-economic development. Explore peer-reviewed articles, book chapters, and ongoing work." colorVarName="--primary-color"/>
          <ImpactCard delay={0.15} title="Consultancy Services" linkTo="/consultancy" icon="fas fa-hands-helping" description="Offering expert consultancy, with a special focus on pro-bono support for NGOs, to translate research into actionable strategies and amplify social impact." colorVarName="--secondary-color"/>
          <ImpactCard delay={0.2} title="Teaching & Mentorship" linkTo="/#experience" icon="fas fa-chalkboard-teacher" description="Dedicated to fostering the next generation of thinkers and leaders through engaging teaching, curriculum design, and dedicated mentorship." colorVarName="--accent-color"/>
          <ImpactCard delay={0.25} title="Key Expertise Areas" linkTo="/#skills" icon="fas fa-cogs" description="Deep expertise spanning quantitative/qualitative analysis, fintech, financial inclusion, project management, and cross-cultural communication." colorVarName="--primary-light-color"/>
        </div>
      </Section>
      
      {featuredPublications.length > 0 && (
        <Section title="Recent Publications" id="featured-publications" subtitle="Highlights from my most impactful and recent contributions." titleClassName="accented">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8">
            {featuredPublications.map((pub, index) => (
                <PublicationPreviewCard key={pub.id} pub={pub} delay={0.1 + index*0.07} />
            ))}
          </div>
          <div className="text-center mt-12 md:mt-14 animate-fadeIn" style={{animationDelay: '0.4s'}}>
              <Link 
                to="/#research"
                 onClick={(e) => { 
                    e.preventDefault(); 
                    const el = document.getElementById('research');
                    if(el) {
                        let headerOffset = 80;
                        if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
                            const rootStyle = getComputedStyle(document.documentElement);
                            const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
                            headerOffset = parseFloat(scrolledHeight.replace('rem','')) * 16 || 80;
                        }
                        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }}
                className="btn-base btn-gradient-primary text-md !py-3 !px-8" /* Theme button */
              >
                View All Publications
              </Link>
          </div>
        </Section>
      )}


      {researchHighlights.length > 0 && (
        <Section title="Research Spotlights" id="research-highlights" subtitle="Key insights and takeaways from my impactful research." titleClassName="accented">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8">
            {researchHighlights.map((pub, index) => (
                <ResearchHighlightCard key={`highlight-${pub.id}`} pub={pub} delay={0.15 + index*0.07} />
            ))}
          </div>
        </Section>
      )}

      {testimonialsData.length > 0 && (
        <Section title="What Others Say" id="testimonials" subtitle="Feedback from collaborators and partners." titleClassName="accented">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:gap-8">
            {testimonialsData.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={0.2 + index*0.1} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
