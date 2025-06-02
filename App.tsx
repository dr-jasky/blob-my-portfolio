
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, NavLink as RouterNavLink, useLocation, Link } from 'react-router-dom';
import { personalInfoData, navLinksData, contactLinksData } from './data'; 
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultancyPage } from './pages/ConsultancyPage';
import { HtmlCVPage } from './pages/HtmlCVPage';
import { CitationsPage } from './pages/CitationsPage';
import { NavLink as NavLinkType } from './types';
import { CVLinkButton } from './components/CVLinkButton';


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on location change
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 60) { // Slightly increased threshold
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavLinkClick = (path: string, e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (path.startsWith("/#")) {
      if(e) e.preventDefault(); 
      const id = path.substring(2); 
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; // Standard header offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
      }
    }
    // For direct links (like /consultancy, /citations), react-router-dom handles navigation.
    setIsMobileMenuOpen(false); 
  };

  return (
    <header ref={headerRef} className="fixed w-full z-50 top-0 transition-all duration-300 py-2.5"> {/* Adjusted padding */}
      <style> 
        {`
          header.scrolled .glass-card-header {
            background: rgba(15, 23, 42, 0.9); /* Darker, more blur on scroll */
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.25); /* Enhanced shadow */
          }
        `}
      </style>
      <div className="container mx-auto px-4"> 
        <div className="flex justify-between items-center glass-card glass-card-header py-3 px-6 rounded-full transition-all duration-300">
          <Link to="/#home" onClick={(e) => handleNavLinkClick("/#home", e)} className="text-xl font-bold flex items-center focus-visible-outline rounded-sm" aria-label="Homepage">
            <span className="text-white">Dr. Jaskirat</span>
            <span className="gradient-text ml-1.5">Singh</span>
          </Link>
          
          <nav className="hidden lg:flex space-x-6 xl:space-x-7">
            {navLinksData.map((link: NavLinkType) => {
              const isHashLink = link.path.startsWith('/#');
              const isActive = isHashLink 
                ? location.hash === link.path.substring(1) && location.pathname === '/'
                : location.pathname === link.path;

              return (
                <RouterNavLink
                  key={link.id}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(link.path, e)}
                  className={`nav-link-custom text-sm font-medium ${isActive ? 'active text-white' : 'text-gray-300'} focus-visible-outline`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </RouterNavLink>
              );
            })}
          </nav>
          
          <div className="flex items-center space-x-3">
            <CVLinkButton 
              className="gradient-bg text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition focus-visible-outline"
              text="HTML CV"
              iconClass="fas fa-file-lines mr-1.5"
            />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden text-white p-2 rounded-md focus-visible-outline"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-button"
              aria-controls="mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="lg:hidden glass-card mt-2.5 rounded-xl py-4 absolute w-[calc(100%-2rem)] left-1/2 transform -translate-x-1/2 shadow-xl"
            role="menu"
          > 
            <div className="flex flex-col space-y-3 px-6">
              {navLinksData.map((link: NavLinkType) => {
                 const isHashLink = link.path.startsWith('/#');
                 const isActive = isHashLink 
                   ? location.hash === link.path.substring(1) && location.pathname === '/'
                   : location.pathname === link.path;
                return (
                  <RouterNavLink
                    key={`mobile-${link.id}`}
                    to={link.path}
                    onClick={(e) => handleNavLinkClick(link.path, e)}
                    className={`block py-2 nav-link-custom text-base ${isActive ? 'active text-white' : 'text-gray-300'} focus-visible-outline rounded-md`}
                    aria-current={isActive ? "page" : undefined}
                    role="menuitem"
                  >
                    {link.name}
                  </RouterNavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 border-t border-gray-800/70 bg-dark/50"> 
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="mb-8 md:mb-0 text-center md:text-left md:w-1/3"> 
          <h2 className="text-2xl font-bold mb-4 text-light">{personalInfoData.name.split(",")[0]}</h2>
          <p className="text-text-muted text-sm max-w-sm mx-auto md:mx-0">{personalInfoData.tagline}</p> 
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center md:text-left md:w-2/3"> 
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light">Navigation</h3> 
            <ul className="space-y-2.5">
              {navLinksData.filter(l => l.id !== 'nav6').slice(0,5).map(link => ( // Show more links if available
                 <li key={`footer-nav-${link.id}`}>
                   <Link 
                     to={link.path} 
                     onClick={(e) => { 
                       if(link.path.includes("#")) { 
                         e.preventDefault(); 
                         const id=link.path.substring(2); 
                         const element = document.getElementById(id);
                         if (element) {
                            const headerOffset = 80;
                            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                         }
                       } else {
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       }
                     }} 
                     className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm"
                   >
                     {link.name}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/#research" onClick={(e)=>{e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior:'smooth', block:'start'})}} className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">Publications</Link></li>
              <li><CVLinkButton text="HTML CV" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm" iconClass="fas fa-file-lines mr-1.5 text-xs" /></li>
              <li><Link to="/consultancy" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">Consultancy</Link></li>
              <li><Link to="/citations" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">Citations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light">Connect</h3>
            <ul className="space-y-2.5">
              <li><a href={personalInfoData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">LinkedIn</a></li>
              <li><a href={personalInfoData.googleScholar} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">Google Scholar</a></li>
              <li><a href={personalInfoData.researchGate || "#"} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">ResearchGate</a></li>
              <li><Link to="/#contact" onClick={(e) => {e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}} className="text-text-muted hover:text-primary-light transition text-sm focus-visible-outline rounded-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <hr className="border-gray-800/50 my-8" /> 
      
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-text-darker-muted text-xs sm:text-sm">© {new Date().getFullYear()} {personalInfoData.name.split(",")[0]}. All rights reserved.</p> 
        <div className="flex items-center mt-4 md:mt-0 text-xs sm:text-sm"> 
          <span className="text-text-darker-muted">Designed with</span>
          <i className="fas fa-heart mx-1.5 text-red-500/80"></i> 
          <span className="text-primary-light ml-1">& Innovation</span> 
        </div>
      </div>
    </div>
  </footer>
);

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 350) { // Increased threshold
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      id="back-to-top" 
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3.5 rounded-full bg-primary text-white shadow-xl hover:bg-primary-dark transition-all duration-300 focus-visible-outline transform hover:scale-105 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      aria-label="Scroll to top"
      style={{transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease'}}
    >
      <i className="fas fa-chevron-up text-lg"></i>
    </button>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Effect for scrolling to sections or top of page
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        // Delay scroll slightly to allow page layout to settle
        setTimeout(() => window.scrollTo({ top: offsetPosition, behavior: 'smooth' }), 50);
      }
    } else if (location.pathname !== '/' || (location.pathname === '/' && !location.hash)) {
      // Scroll to top for new pages or home page without hash
      setTimeout(() => window.scrollTo(0, 0), 50); // Slight delay
    }
  }, [location]);

  // Effect for updating active navigation link based on scroll position or pathname
  useEffect(() => {
    const sections = navLinksData.filter(link => link.path.startsWith('/#')).map(link => link.path.substring(2));
    const navLinksDesktop = document.querySelectorAll<HTMLAnchorElement>('header nav.hidden.lg\\:flex .nav-link-custom');
    const navLinksMobile = document.querySelectorAll<HTMLAnchorElement>('#mobile-menu .nav-link-custom');

    const updateActiveLinks = (linksNodeList: NodeListOf<HTMLAnchorElement>, currentSectionId?: string) => {
      linksNodeList.forEach(link => {
        const linkPath = link.getAttribute('href');
        let isActive = false;

        if (linkPath) {
          if (linkPath.startsWith('/#')) { // Hash links on main page
            isActive = linkPath.substring(1) === location.hash && location.pathname === '/';
            if (currentSectionId && location.pathname ==='/') { // Scroll-based active state for main page
              isActive = linkPath === `/#${currentSectionId}`;
            }
          } else { // Direct page links
            isActive = location.pathname === linkPath;
          }
        }
        
        if (isActive) {
          link.classList.add('active', 'text-white');
          link.classList.remove('text-gray-300');
        } else {
          link.classList.remove('active', 'text-white');
          link.classList.add('text-gray-300');
        }
      });
    };
    
    const handleScrollOrPathChange = () => {
      if (location.pathname === '/') { // Main page with sections
        let currentSection = 'home'; 
        for (const sectionId of sections) {
          const sectionEl = document.getElementById(sectionId);
          if (sectionEl) {
            const sectionTop = sectionEl.offsetTop - 160; // Adjust offset for earlier activation
            if (window.pageYOffset >= sectionTop) {
              currentSection = sectionId;
            }
          }
        }
        updateActiveLinks(navLinksDesktop, currentSection);
        updateActiveLinks(navLinksMobile, currentSection);
      } else { // Other distinct pages
        updateActiveLinks(navLinksDesktop);
        updateActiveLinks(navLinksMobile);
      }
    };
    
    window.addEventListener('scroll', handleScrollOrPathChange);
    handleScrollOrPathChange(); // Initial check on load/route change

    return () => {
      window.removeEventListener('scroll', handleScrollOrPathChange);
    };
  }, [location.pathname, location.hash]); // Re-run on path or hash change


  return (
    <div className="flex flex-col min-h-screen bg-dark"> 
      <Header />
      <main ref={mainContentRef} className="flex-grow pt-24 md:pt-28"> {/* Adjusted pt for fixed header */}
        <Routes>
          <Route path="/" element={
            <> 
              <div id="home"><HomePage /></div>
              <div id="about"><AboutPage /></div>
              <div id="research"><ResearchPage /></div>
              <div id="experience"><ExperiencePage /></div>
              <div id="skills"><SkillsPage /></div>
              <div id="contact"><ContactPage /></div>
            </>
          }/>
          <Route path="/consultancy" element={<ConsultancyPage />} />
          <Route path="/cv-html" element={<HtmlCVPage />} />
          <Route path="/citations" element={<CitationsPage />} />
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
