
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, NavLink as RouterNavLink, useLocation, Link } from 'react-router-dom';
import { personalInfoData, navLinksData } from './data'; 
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultancyPage } from './pages/ConsultancyPage';
import { HtmlCVPage } from './pages/HtmlCVPage';
import { CitationsPage } from './pages/CitationsPage';
import { EducationPage } from './pages/EducationPage'; 
import { NavLink as NavLinkType } from './types';
import { CVLinkButton } from './components/CVLinkButton';


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  
  const getScrollOffset = () => {
      if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        return parseFloat(rootStyle.getPropertyValue('--header-height-scrolled')) || 70; // Default if var not found
      }
      return 70;
  };

  useEffect(() => {
    setIsMobileMenuOpen(false); 
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 30) { // Threshold for scrolled state
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavLinkClick = (path: string, e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const scrollOffset = getScrollOffset();
    if (path.startsWith("/#")) {
      if(e) e.preventDefault(); 
      const id = path.substring(2); 
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
      }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
    setIsMobileMenuOpen(false); 
  };

  const mainNavLinks = navLinksData;

  return (
    <header 
      ref={headerRef} 
      className="fixed w-full z-50 top-0 transition-all duration-300 py-3" // Base padding, adjusted by scrolled state via CSS
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex justify-between items-center glass-card-header px-4 md:px-5 lg:px-6 rounded-full"> {/* Slightly adjusted padding */}
          <Link to="/#home" onClick={(e) => handleNavLinkClick("/#home", e)} className="text-xl lg:text-[1.3rem] font-bold flex items-center focus-visible-outline rounded-sm py-0.5" aria-label="Homepage"> {/* Adjusted font size */}
            <span className="text-white">Dr. Jaskirat</span>
            <span className="gradient-text ml-1.5">Singh</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5"> {/* Slightly reduced space */}
            {mainNavLinks.map((link: NavLinkType) => (
              <RouterNavLink
                key={link.id}
                to={link.path}
                onClick={(e) => handleNavLinkClick(link.path, e)}
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''} focus-visible-outline`}
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2.5 sm:space-x-3.5"> {/* Adjusted space */}
            <CVLinkButton 
              className="btn-base gradient-bg-alt !text-[0.75rem] sm:!text-xs !py-[0.5rem] sm:!py-[0.6rem] !px-3.5 sm:!px-4" 
              text="HTML CV"
              iconClass="fas fa-file-alt"
            />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden text-white p-2 rounded-full focus-visible-outline hover:bg-primary/20 active:bg-primary/30 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-button"
              aria-controls="mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-md transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="lg:hidden glass-card mt-3 rounded-xl py-3.5 absolute w-[calc(100%-2rem)] left-1/2 transform -translate-x-1/2 shadow-2xl border border-primary-light/25 backdrop-blur-md"
            role="menu"
          > 
            <div className="flex flex-col space-y-1.5 px-3.5">
              {mainNavLinks.map((link: NavLinkType) => (
                <RouterNavLink
                  key={`mobile-${link.id}`}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(link.path, e)}
                  className={({isActive}) => 
                      `block py-3 nav-link-custom text-[0.9rem] ${isActive ? 'active' : ''} focus-visible-outline rounded-lg w-full text-left`
                  }
                  role="menuitem"
                >
                  {link.name}
                </RouterNavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  const getScrollOffset = () => {
      if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        return parseFloat(rootStyle.getPropertyValue('--header-height-scrolled')) || 70;
      }
      return 70;
  };

  const handleFooterLinkClick = (path: string, e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    const scrollOffset = getScrollOffset();
    if (path.startsWith("/#") || path.startsWith("#")) {
        if(e) e.preventDefault();
        const id = path.includes("#") ? path.substring(path.indexOf("#")+1) : path;
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - scrollOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
  <footer className="py-12 md:py-14 border-t border-slate-700/50 bg-dark/85 backdrop-blur-sm mt-10 md:mt-14"> 
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 xl:gap-9 mb-9 md:mb-11 text-center md:text-left">
        <div className="lg:col-span-2"> 
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-light">{personalInfoData.name.split(",")[0]}</h2>
          <p className="text-text-muted text-sm md:text-[0.9rem] max-w-lg mx-auto md:mx-0 leading-relaxed">{personalInfoData.tagline}</p> 
        </div>
        
        <div>
          <h3 className="text-md md:text-lg font-semibold mb-3.5 text-primary-light">Quick Links</h3> 
          <ul className="space-y-2">
            {navLinksData.filter(l => !['/consultancy', '/citations', '/#contact'].includes(l.path)).slice(0,4).map(link => (
               <li key={`footer-nav-${link.id}`}>
                 <Link 
                   to={link.path} 
                   onClick={(e) => handleFooterLinkClick(link.path, e)}
                   className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm py-0.5"
                 >
                   {link.name}
                 </Link>
               </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md md:text-lg font-semibold mb-3.5 text-accent">Connect</h3>
          <ul className="space-y-2">
            <li><a href={personalInfoData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition text-sm focus-visible-outline rounded-sm py-0.5">LinkedIn</a></li>
            <li><a href={personalInfoData.googleScholar} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition text-sm focus-visible-outline rounded-sm py-0.5">Google Scholar</a></li>
            <li><a href={`mailto:${personalInfoData.email}`}className="text-text-muted hover:text-accent transition text-sm focus-visible-outline rounded-sm py-0.5">Email</a></li>
            <li><button onClick={(e) => handleFooterLinkClick("#contact", e)} className="text-text-muted hover:text-accent transition text-sm focus-visible-outline rounded-sm py-0.5 text-left">Contact Form</button></li>
          </ul>
        </div>
      </div>
      
      <hr className="border-slate-600/60 my-7 md:my-9" /> 
      
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-text-darker-muted text-xs sm:text-[0.8rem] mb-1.5 sm:mb-0">© {new Date().getFullYear()} {personalInfoData.name.split(",")[0]}. All rights reserved.</p> 
        <div className="flex items-center text-xs sm:text-[0.8rem]"> 
          <span className="text-text-darker-muted">Crafted with</span>
          <i className="fas fa-heart mx-1.5 text-red-500/70 animate-pulseGlow [--tw-shadow-color:theme('colors.red.500')]"></i> 
          <span className="gradient-text ml-0.5 font-medium">and Vision</span> 
        </div>
      </div>
    </div>
  </footer>
)};

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(window.pageYOffset > 250);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      id="back-to-top" 
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 md:p-3.5 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:opacity-90 transition-all duration-300 focus-visible-outline transform hover:scale-105 hover:shadow-neon-glow-blue ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-90'}`}
      aria-label="Scroll to top"
      style={{transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s cubic-bezier(0.25,0.1,0.25,1)'}}
    >
      <i className="fas fa-arrow-up text-md md:text-lg"></i>
    </button>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  const getCurrentScrollOffsetForApp = () => {
    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        return parseFloat(rootStyle.getPropertyValue('--header-height-scrolled')) || 70;
    }
    return 70;
  };


  useEffect(() => {
    const scrollOffset = getCurrentScrollOffsetForApp();
    if (location.hash && location.pathname === '/') {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - scrollOffset;
        setTimeout(() => window.scrollTo({ top: offsetPosition, behavior: 'smooth' }), 80); 
      }
    } else if (location.pathname !== '/' || (location.pathname === '/' && !location.hash)) {
      setTimeout(() => window.scrollTo(0, 0), 80); 
    }
  }, [location]);

  useEffect(() => {
    const sections = navLinksData.filter(link => link.path.startsWith('/#')).map(link => link.path.substring(2));
    const navLinksDesktop = document.querySelectorAll<HTMLAnchorElement>('header nav.hidden.lg\\:flex .nav-link-custom');
    const navLinksMobile = document.querySelectorAll<HTMLAnchorElement>('#mobile-menu .nav-link-custom');

    const updateActiveLinks = (linksNodeList: NodeListOf<HTMLAnchorElement>, currentSectionId?: string) => {
      linksNodeList.forEach(link => {
        const linkPath = link.getAttribute('href');
        let isActive = false;

        if (linkPath) {
          if (linkPath.startsWith('/#') && location.pathname === '/') { 
            const linkHash = linkPath.substring(1); 
            const isHomePageActive = linkHash === '#home' && !location.hash && (!currentSectionId || currentSectionId === 'home');
            isActive = (location.hash === linkHash) || (currentSectionId && linkPath === `/#${currentSectionId}`) || isHomePageActive;
          } else if (!linkPath.startsWith('/#')) { 
            isActive = location.pathname === linkPath || (location.pathname.startsWith(linkPath) && linkPath !== '/');
            if (linkPath === '/' && location.pathname !== '/') isActive = false; 
          }
        }
        
        if (isActive) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    };
    
    const handleScrollOrPathChange = () => {
      const scrollOffset = getCurrentScrollOffsetForApp();
      let currentSectionForMainPage: string | undefined = undefined;
      if (location.pathname === '/') {
        currentSectionForMainPage = 'home'; 
        let foundSection = false;
        for (let i = sections.length - 1; i >= 0; i--) {
            const sectionId = sections[i];
            const sectionEl = document.getElementById(sectionId);
            if (sectionEl) {
                const sectionTop = sectionEl.offsetTop - (scrollOffset + 70); 
                if (window.pageYOffset >= sectionTop) {
                    currentSectionForMainPage = sectionId;
                    foundSection = true;
                    break; 
                }
            }
        }
         if (window.pageYOffset < (document.getElementById(sections[0])?.offsetTop || 150) - (scrollOffset + 70) && !foundSection) {
            currentSectionForMainPage = 'home';
        }
      }
      updateActiveLinks(navLinksDesktop, currentSectionForMainPage);
      updateActiveLinks(navLinksMobile, currentSectionForMainPage);
    };
    
    window.addEventListener('scroll', handleScrollOrPathChange, { passive: true });
    handleScrollOrPathChange(); 

    return () => {
      window.removeEventListener('scroll', handleScrollOrPathChange);
    };
  }, [location.pathname, location.hash]); 


  return (
    <div className="flex flex-col min-h-screen bg-dark"> 
      <Header />
      <main 
        ref={mainContentRef} 
        className="flex-grow"
        style={{ paddingTop: 'var(--header-height)' }} // Use CSS variable for initial padding
      >
        <Routes>
          <Route path="/" element={
            <> 
              <div id="home" className="scroll-mt-[var(--header-height-scrolled)]"><HomePage /></div> 
              <div id="about" className="scroll-mt-[var(--header-height-scrolled)]"><AboutPage /></div>
              <div id="research" className="scroll-mt-[var(--header-height-scrolled)]"><ResearchPage /></div>
              <div id="experience" className="scroll-mt-[var(--header-height-scrolled)]"><ExperiencePage /></div>
              <div id="skills" className="scroll-mt-[var(--header-height-scrolled)]"><SkillsPage /></div>
              <div id="contact" className="scroll-mt-[var(--header-height-scrolled)]"><ContactPage /></div>
            </>
          }/>
          <Route path="/consultancy" element={<ConsultancyPage />} />
          <Route path="/cv-html" element={<HtmlCVPage />} />
          <Route path="/citations" element={<CitationsPage />} />
          <Route path="/education" element={<EducationPage />} /> 
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
