
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
        return parseFloat(rootStyle.getPropertyValue('--header-height-scrolled')) || 120;
      }
      return 120;
  };


  useEffect(() => {
    setIsMobileMenuOpen(false); 
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 40) { 
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
      className="fixed w-full z-50 top-0 transition-all duration-300"
      style={{paddingTop: 'var(--header-padding-top, 0.875rem)', paddingBottom: 'var(--header-padding-bottom, 0.875rem)' }}
    > {/* py-3.5 md:py-4 replaced with style for CSS variable control */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
        <div className="flex justify-between items-center glass-card-header px-4 sm:px-5 lg:px-6 rounded-full">
          <Link to="/#home" onClick={(e) => handleNavLinkClick("/#home", e)} className="text-xl lg:text-2xl font-bold flex items-center focus-visible-outline rounded-sm" aria-label="Homepage">
            <span className="text-white text-[1.05rem] sm:text-[1.1rem] lg:text-[1.15rem]">Dr. Jaskirat</span>
            <span className="gradient-text ml-1 sm:ml-1.5 lg:ml-1.5">Singh</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-3 lg:space-x-3.5 xl:space-x-4">
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
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <CVLinkButton 
              className="btn-base gradient-bg-alt !text-xs sm:!text-sm !py-[0.6rem] sm:!py-[0.7rem] !px-5 sm:!px-5" 
              text="HTML CV"
              iconClass="fas fa-file-alt"
            />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden text-white p-3 rounded-full focus-visible-outline hover:bg-primary/30 transition-colors active:bg-primary/40"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-button"
              aria-controls="mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="lg:hidden glass-card mt-4 rounded-xl py-5 absolute w-[calc(100%-2rem)] left-1/2 transform -translate-x-1/2 shadow-2xl border-2 border-primary-light/40"
            role="menu"
          > 
            <div className="flex flex-col space-y-2.5 px-5">
              {mainNavLinks.map((link: NavLinkType) => (
                <RouterNavLink
                  key={`mobile-${link.id}`}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(link.path, e)}
                  className={({isActive}) => 
                      `block py-4 nav-link-custom text-base ${isActive ? 'active' : ''} focus-visible-outline rounded-lg w-full text-left`
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
        return parseFloat(rootStyle.getPropertyValue('--header-height-scrolled')) || 120;
      }
      return 120;
  };

  return (
  <footer className="py-16 md:py-20 border-t border-slate-800/70 bg-dark/85 backdrop-blur-lg mt-16"> 
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12 mb-12 md:mb-16 text-center md:text-left">
        <div className="lg:col-span-2"> 
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light">{personalInfoData.name.split(",")[0]}</h2>
          <p className="text-text-muted text-sm md:text-base max-w-md mx-auto md:mx-0">{personalInfoData.tagline}</p> 
        </div>
        
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-5 text-primary-light">Quick Links</h3> 
          <ul className="space-y-3">
            {navLinksData.filter(l => !['/consultancy', '/citations', '/#contact'].includes(l.path)).slice(0,4).map(link => (
               <li key={`footer-nav-${link.id}`}>
                 <Link 
                   to={link.path} 
                   onClick={(e) => { 
                     const scrollOffset = getScrollOffset();
                     if(link.path.includes("#")) { 
                       e.preventDefault(); 
                       const id=link.path.substring(2); 
                       const element = document.getElementById(id);
                       if (element) {
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - scrollOffset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                       }
                     } else {
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                     }
                   }} 
                   className="text-text-muted hover:text-primary-light transition text-sm md:text-base focus-visible-outline rounded-sm"
                 >
                   {link.name}
                 </Link>
               </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-5 text-accent">Connect</h3>
          <ul className="space-y-3">
            <li><a href={personalInfoData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition text-sm md:text-base focus-visible-outline rounded-sm">LinkedIn</a></li>
            <li><a href={personalInfoData.googleScholar} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition text-sm md:text-base focus-visible-outline rounded-sm">Google Scholar</a></li>
            <li><a href={`mailto:${personalInfoData.email}`}className="text-text-muted hover:text-accent transition text-sm md:text-base focus-visible-outline rounded-sm">Email</a></li>
            <li><Link to="/#contact" onClick={(e) => {e.preventDefault(); const el = document.getElementById('contact'); if (el) { const scrollOffset = getScrollOffset(); const pos = el.getBoundingClientRect().top + window.pageYOffset - scrollOffset; window.scrollTo({top: pos, behavior: 'smooth'}); }}} className="text-text-muted hover:text-accent transition text-sm md:text-base focus-visible-outline rounded-sm">Contact Form</Link></li>
          </ul>
        </div>
      </div>
      
      <hr className="border-slate-700/80 my-10 md:my-12" /> 
      
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-text-darker-muted text-xs sm:text-sm mb-3 sm:mb-0">© {new Date().getFullYear()} {personalInfoData.name.split(",")[0]}. All rights reserved.</p> 
        <div className="flex items-center text-xs sm:text-sm"> 
          <span className="text-text-darker-muted">Crafted with</span>
          <i className="fas fa-heart mx-1.5 text-red-500/90 animate-pulseGlow [--tw-shadow-color:theme('colors.red.500')]"></i> 
          <span className="gradient-text ml-1 font-medium">and Vision</span> 
        </div>
      </div>
    </div>
  </footer>
)};

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(window.pageYOffset > 400);

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
      className={`fixed bottom-10 right-10 p-4 md:p-5 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl hover:opacity-90 transition-all duration-400 focus-visible-outline transform hover:scale-115 hover:shadow-neon-glow-blue ${isVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-90'}`}
      aria-label="Scroll to top"
      style={{transition: 'opacity 0.4s ease, visibility 0.4s ease, transform 0.4s cubic-bezier(0.25,0.1,0.25,1)'}}
    >
      <i className="fas fa-arrow-up text-xl md:text-2xl"></i>
    </button>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  const getCurrentScrollOffset = () => {
    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const isScrolled = document.body.scrollTop > 40 || document.documentElement.scrollTop > 40;
      return parseFloat(rootStyle.getPropertyValue(isScrolled ? '--header-height-scrolled' : '--header-height')) || 120;
    }
    return 120;
  };


  useEffect(() => {
    const scrollOffset = getCurrentScrollOffset();
    if (location.hash && location.pathname === '/') {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - scrollOffset;
        setTimeout(() => window.scrollTo({ top: offsetPosition, behavior: 'smooth' }), 150);
      }
    } else if (location.pathname !== '/' || (location.pathname === '/' && !location.hash)) {
      setTimeout(() => window.scrollTo(0, 0), 150); 
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
      const scrollOffset = getCurrentScrollOffset();
      let currentSectionForMainPage: string | undefined = undefined;
      if (location.pathname === '/') {
        currentSectionForMainPage = 'home'; 
        let foundSection = false;
        for (const sectionId of sections) { 
          const sectionEl = document.getElementById(sectionId);
          if (sectionEl) {
            const sectionTop = sectionEl.offsetTop - (scrollOffset + 70); 
            if (window.pageYOffset >= sectionTop) {
              currentSectionForMainPage = sectionId;
              foundSection = true; 
            } else if (foundSection) { 
              break; 
            }
          }
        }
        if (window.pageYOffset < scrollOffset + 70 && !foundSection) {
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
        style={{ paddingTop: 'var(--header-height)' }}
      > {/* pt-36 md:pt-40 xl:pt-44 replaced with CSS variable */}
        <Routes>
          <Route path="/" element={
            <> 
              <div id="home" className="pt-3 -mt-3"><HomePage /></div> 
              <div id="about" className="pt-3 -mt-3"><AboutPage /></div>
              <div id="research" className="pt-3 -mt-3"><ResearchPage /></div>
              <div id="experience" className="pt-3 -mt-3"><ExperiencePage /></div>
              <div id="skills" className="pt-3 -mt-3"><SkillsPage /></div>
              <div id="contact" className="pt-3 -mt-3"><ContactPage /></div>
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
