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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  
  const getScrolledHeaderHeight = () => {
    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
      return parseFloat(scrolledHeight.replace('rem','')) * 16 || 64; 
    }
    return 64; 
  };

  useEffect(() => {
    setIsMobileMenuOpen(false); 
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // Adjust scroll threshold if needed
      if (headerRef.current) {
        if (isScrolled) {
          headerRef.current.classList.add('scrolled'); // Optional: for different styles on scroll
          document.documentElement.style.setProperty('--header-height', 'var(--header-height-scrolled-base-val)');
        } else {
          headerRef.current.classList.remove('scrolled');
          document.documentElement.style.setProperty('--header-height', 'var(--header-height-base-val)');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu click outside to close
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
          mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  const handleNavLinkClick = (path: string, e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const scrollOffset = getScrolledHeaderHeight();
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
      className="fixed w-full z-50 top-0 transition-all duration-300" // Removed py-2.5, handled by inner container
    >
      <div className="container mx-auto px-4 py-3 sm:py-4"> {/* Adjusted padding */}
        <div className="flex justify-between items-center glass-card py-3 px-5 sm:px-6 rounded-full"> {/* Theme's glass-card */}
          <Link 
            to="/#home" 
            onClick={(e) => handleNavLinkClick("/#home", e)} 
            className="text-xl lg:text-2xl font-bold flex items-center focus-visible-outline rounded-sm"
            aria-label="Homepage"
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            <span className="text-theme-light">Dr. Jaskirat</span>
            <span className="gradient-text ml-1.5">Singh</span> {/* Theme's gradient-text */}
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2"> {/* Adjusted spacing */}
            {mainNavLinks.map((link: NavLinkType) => (
              <RouterNavLink
                key={link.id}
                to={link.path}
                onClick={(e) => handleNavLinkClick(link.path, e)}
                className={({ isActive }) => {
                  // Keep existing active logic, adapt classes
                  let baseClass = 'nav-link-custom focus-visible-outline';
                  if (link.path === '/#home' && (location.pathname === '/' || location.pathname === '')) {
                    if (location.hash === '' || location.hash === '#home') return `${baseClass} active`;
                  }
                  return `${baseClass} ${isActive ? 'active' : ''}`;
                }}
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <CVLinkButton 
              className="btn-base btn-gradient-primary text-sm !py-2 !px-4 sm:!py-2.5 sm:!px-5" // New theme button style
              text="HTML CV"
              iconClass="fas fa-file-alt" // Keep icon
            />
            <button
              ref={mobileMenuButtonRef}
              id="mobile-menu-button" // For theme's JS if it were used, but React handles state
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden text-theme-light p-2.5 rounded-full focus-visible-outline hover:bg-white/10 active:bg-white/20 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-200 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Styled with theme's glass-card */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            ref={mobileMenuRef}
            className="lg:hidden glass-card mt-2 rounded-xl py-4 absolute w-[calc(100%-2rem)] left-1/2 transform -translate-x-1/2 shadow-2xl"
            role="menu"
          > 
            <div className="flex flex-col space-y-1 px-4"> {/* Adjusted spacing */}
              {mainNavLinks.map((link: NavLinkType) => (
                <RouterNavLink
                  key={`mobile-${link.id}`}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(link.path, e)}
                  className={({isActive}) => {
                    let baseClass = 'block py-2.5 nav-link-custom text-base text-center focus-visible-outline rounded-md w-full'; // Adjusted for mobile
                     if (link.path === '/#home' && (location.pathname === '/' || location.pathname === '')) {
                       if (location.hash === '' || location.hash === '#home') return `${baseClass} active`;
                    }
                    return `${baseClass} ${isActive ? 'active' : ''}`;
                  }}
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
  const getScrolledHeaderHeight = () => {
    // This logic might not be needed for footer links if they always scroll to top of section
    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const scrolledHeight = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim();
      return parseFloat(scrolledHeight.replace('rem','')) * 16 || 64;
    }
    return 64;
  };

  const handleFooterLinkClick = (path: string, e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    const scrollOffset = getScrolledHeaderHeight(); // Use a fixed offset or refined logic if needed
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
  <footer className="py-12 border-t border-gray-800"> {/* Theme's border color */}
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between mb-10 text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>{personalInfoData.name.split(",")[0]}</h2>
          <p className="text-gray-500 max-w-sm mx-auto md:mx-0">{personalInfoData.tagline}</p> 
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-primary-light">Navigation</h3>
            <ul className="space-y-2">
              {navLinksData.filter(l => !['/consultancy', '/citations', '/cv-html'].includes(l.path)).slice(0,5).map(link => (
                 <li key={`footer-nav-${link.id}`}>
                   <Link 
                     to={link.path} 
                     onClick={(e) => handleFooterLinkClick(link.path, e)}
                     className="text-gray-400 hover:text-theme-primary-light transition-colors focus-visible-outline rounded-sm"
                   >
                     {link.name}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-primary-light">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/#research" onClick={(e) => handleFooterLinkClick("/#research", e)} className="text-gray-400 hover:text-theme-primary-light transition">Publications</Link></li>
              <li><Link to="/cv-html" onClick={(e) => handleFooterLinkClick("/cv-html", e)} className="text-gray-400 hover:text-theme-primary-light transition">HTML CV</Link></li>
              <li><Link to="/consultancy" onClick={(e) => handleFooterLinkClick("/consultancy", e)} className="text-gray-400 hover:text-theme-primary-light transition">Consultancy</Link></li>
              <li><Link to="/citations" onClick={(e) => handleFooterLinkClick("/citations", e)} className="text-gray-400 hover:text-theme-primary-light transition">Citations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-primary-light">Connect</h3>
            <ul className="space-y-2">
              <li><a href={personalInfoData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-theme-primary-light transition">LinkedIn</a></li>
              <li><a href={personalInfoData.googleScholar} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-theme-primary-light transition">Google Scholar</a></li>
              <li><a href={`mailto:${personalInfoData.email}`} className="text-gray-400 hover:text-theme-primary-light transition">Email</a></li>
              <li><button onClick={(e) => handleFooterLinkClick("#contact", e)} className="text-gray-400 hover:text-theme-primary-light transition text-left">Contact Form</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      <hr className="border-gray-800 my-8"/>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {personalInfoData.name.split(",")[0]}. All rights reserved.</p>
        <div className="flex items-center mt-4 md:mt-0 text-sm">
          <span className="text-gray-500">Crafted with</span>
          <i className="fas fa-heart mx-1.5 text-red-500"></i> {/* Theme's heart color */}
          <span className="text-theme-primary-light ml-0.5 font-medium">& Innovation</span> {/* Theme's accent */}
        </div>
      </div>
    </div>
  </footer>
)};

// ScrollToTopButton is now handled by direct HTML and JS in index.html, so this component is not rendered.

const AppContent: React.FC = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  const getCurrentScrolledHeaderHeightForApp = () => {
    if (typeof window !== 'undefined' && typeof getComputedStyle !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        // Use the CSS variable defined for this purpose
        const scrolledHeightRem = rootStyle.getPropertyValue('--header-height-scrolled-base-val').trim() || '4rem';
        return parseFloat(scrolledHeightRem.replace('rem','')) * 16; 
    }
    return 64; // Fallback
  };


  useEffect(() => {
    const scrollOffset = getCurrentScrolledHeaderHeightForApp();
    if (location.hash && (location.pathname === '/' || location.pathname === '')) { 
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - scrollOffset;
        // Delay to allow layout to settle, especially after particles.js initialization
        setTimeout(() => window.scrollTo({ top: offsetPosition, behavior: 'smooth' }), 150); 
      }
    } else if (location.pathname !== '/' || (location.pathname === '/' && !location.hash)) {
      setTimeout(() => window.scrollTo(0, 0), 150); 
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const sectionsOnMainPage = navLinksData.filter(link => link.path.startsWith('/#')).map(link => link.path.substring(2));
    const navLinksNodeList = document.querySelectorAll<HTMLAnchorElement>('header nav a.nav-link-custom, #mobile-menu a.nav-link-custom');

    const updateActiveLinks = () => {
      const scrollOffset = getCurrentScrolledHeaderHeightForApp();
      let currentActiveSectionId: string | undefined = undefined;

      if (location.pathname === '/' || location.pathname === '') { // Only apply this logic for homepage sections
        for (let i = sectionsOnMainPage.length - 1; i >= 0; i--) {
          const sectionId = sectionsOnMainPage[i];
          const sectionEl = document.getElementById(sectionId);
          if (sectionEl) {
            // Adjust threshold for when a section is considered "active"
            const sectionTop = sectionEl.offsetTop - (scrollOffset + sectionEl.offsetHeight * 0.5); 
            if (window.pageYOffset >= sectionTop) {
              currentActiveSectionId = sectionId;
              break;
            }
          }
        }
        // If near top and no section found, default to home
        if (window.pageYOffset < ((document.getElementById(sectionsOnMainPage[0])?.offsetTop || 200) - (scrollOffset + 100)) && !currentActiveSectionId) {
            currentActiveSectionId = 'home';
        }
        // If scrolled to the very bottom, make 'contact' active
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100) { 
            const contactSection = sectionsOnMainPage.find(s => s === 'contact');
            if(contactSection) currentActiveSectionId = contactSection;
        }
      }
      
      navLinksNodeList.forEach(link => {
        const linkPath = link.getAttribute('href') || '';
        let isActive = false;

        if (linkPath.startsWith('/#') && (location.pathname === '/' || location.pathname === '')) {
          const linkHashId = linkPath.substring(2);
          isActive = linkHashId === currentActiveSectionId;
          // Special handling for the "Home" link when at the top or explicit #home hash
          if (linkHashId === 'home' && (currentActiveSectionId === 'home' || (!currentActiveSectionId && location.hash === ''))) {
             isActive = true;
          }
        } else if (!linkPath.startsWith('/#')) { // For non-hash paths like /consultancy
          isActive = location.pathname === linkPath;
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
    
    window.addEventListener('scroll', updateActiveLinks, { passive: true });
    const timeoutId = setTimeout(updateActiveLinks, 150); // Initial check after DOM renders

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updateActiveLinks);
    };
  }, [location.pathname, location.hash]);


  return (
    // Body styles are now global in index.html, App div can be simpler
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <main 
        ref={mainContentRef} 
        className="flex-grow"
        style={{ paddingTop: 'var(--header-height)' }} // Use CSS variable for dynamic header height
      >
        <Routes>
          <Route path="/" element={
            <> 
              {/* Ensure sections have IDs and use scroll-mt for fixed header offset */}
              <div id="home" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><HomePage /></div> 
              <div id="about" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><AboutPage /></div>
              <div id="research" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><ResearchPage /></div>
              <div id="experience" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><ExperiencePage /></div>
              <div id="skills" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><SkillsPage /></div>
              <div id="contact" className="scroll-mt-[var(--header-height-scrolled-base-val)]"><ContactPage /></div>
            </>
          }/>
          <Route path="/consultancy" element={<ConsultancyPage />} />
          <Route path="/cv-html" element={<HtmlCVPage />} />
          <Route path="/citations" element={<CitationsPage />} />
          <Route path="/education" element={<EducationPage />} /> 
        </Routes>
      </main>
      <Footer />
      {/* ScrollToTopButton is now directly in index.html */}
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
