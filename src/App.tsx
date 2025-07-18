import React, { useEffect, useState, useRef } from 'react';
import { t, detectLanguage, Language } from './i18n';
import 'remixicon/fonts/remixicon.css';

// Transparent mask style generator
const getTransparentMaskStyle = (rect: {x: number, y: number, width: number, height: number} | null) => {
  if (!rect) return {};
  
  // Semi-transparent gradient for a softer effect
  const maskGradient = `radial-gradient(ellipse ${rect.width}px ${rect.height}px at ${rect.x + rect.width/2}px ${rect.y + rect.height/2}px, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) ${Math.max(rect.width/2, rect.height/2)}px, black ${Math.max(rect.width/2, rect.height/2) + 2}px)`;
  
  return {
    maskImage: maskGradient,
    WebkitMaskImage: maskGradient,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
  };
};

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [activeItemRect, setActiveItemRect] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [hoveredItemRect, setHoveredItemRect] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [hoveredLangRect, setHoveredLangRect] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<{[key: string]: HTMLAnchorElement | null}>({});
  const langItemRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLang(detectedLang);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'community', 'guidebook'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active item position for transparent mask effect
  useEffect(() => {
    if (activeSection && navItemRefs.current[activeSection] && navRef.current) {
      const activeItem = navItemRefs.current[activeSection];
      if (!activeItem) return;
      
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      
      setActiveItemRect({
        x: itemRect.left - navRect.left,
        y: itemRect.top - navRect.top,
        width: itemRect.width,
        height: itemRect.height
      });
    }
  }, [activeSection, lang]); // Include lang to update on language change

  // Track hovered item position for transparent mask effect
  useEffect(() => {
    if (hoveredSection && navItemRefs.current[hoveredSection] && navRef.current) {
      const hoveredItem = navItemRefs.current[hoveredSection];
      if (!hoveredItem) return;
      
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = hoveredItem.getBoundingClientRect();
      
      setHoveredItemRect({
        x: itemRect.left - navRect.left,
        y: itemRect.top - navRect.top,
        width: itemRect.width,
        height: itemRect.height
      });
    } else {
      setHoveredItemRect(null);
    }
  }, [hoveredSection, lang]);

  // Track hovered language item position
  useEffect(() => {
    if (hoveredLang && langItemRefs.current[hoveredLang] && langMenuRef.current) {
      const hoveredItem = langItemRefs.current[hoveredLang];
      if (!hoveredItem) return;
      
      const menuRect = langMenuRef.current.getBoundingClientRect();
      const itemRect = hoveredItem.getBoundingClientRect();
      
      setHoveredLangRect({
        x: itemRect.left - menuRect.left,
        y: itemRect.top - menuRect.top,
        width: itemRect.width,
        height: itemRect.height
      });
    } else {
      setHoveredLangRect(null);
    }
  }, [hoveredLang]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Frosted glass header */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Advanced navigation with true transparent active item */}
          <div className="relative" ref={navRef}>
            {/* Background frosted glass layer with dynamic mask */}
            <div 
              className="absolute inset-0 rounded-32 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg"
              style={getTransparentMaskStyle(hoveredItemRect || activeItemRect)}
            ></div>
            
            {/* Content layer */}
            <nav className="relative rounded-32 px-8 py-4 flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-firstlab-orange drop-shadow-sm z-10">{t('firstlab.title', lang)}</h1>
              <div className="flex space-x-6">
                <a 
                  ref={el => { navItemRefs.current['home'] = el; }}
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('home');
                  }}
                  onMouseEnter={() => setHoveredSection('home')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative rounded-32 px-4 py-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === 'home' 
                      ? 'text-firstlab-orange border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                      : 'text-black/80 hover:text-firstlab-orange hover:bg-white/15 hover:shadow-sm'
                  }`}
                >
                  {t('nav.home', lang)}
                </a>
                <a 
                  ref={el => { navItemRefs.current['features'] = el; }}
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('features');
                  }}
                  onMouseEnter={() => setHoveredSection('features')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative rounded-32 px-4 py-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === 'features' 
                      ? 'text-firstlab-orange border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                      : 'text-black/80 hover:text-firstlab-orange hover:bg-white/15 hover:shadow-sm'
                  }`}
                >
                  {t('nav.features', lang)}
                </a>
                <a 
                  ref={el => { navItemRefs.current['community'] = el; }}
                  href="#community" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('community');
                  }}
                  onMouseEnter={() => setHoveredSection('community')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative rounded-32 px-4 py-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === 'community' 
                      ? 'text-firstlab-orange border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                      : 'text-black/80 hover:text-firstlab-orange hover:bg-white/15 hover:shadow-sm'
                  }`}
                >
                  {t('nav.community', lang)}
                </a>
                <a 
                  ref={el => { navItemRefs.current['guidebook'] = el; }}
                  href="#guidebook" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('guidebook')?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('guidebook');
                  }}
                  onMouseEnter={() => setHoveredSection('guidebook')}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative rounded-32 px-4 py-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === 'guidebook' 
                      ? 'text-firstlab-orange border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                      : 'text-black/80 hover:text-firstlab-orange hover:bg-white/15 hover:shadow-sm'
                  }`}
                >
                  {t('nav.guidebook', lang)}
                </a>
              </div>
            </nav>
          </div>
          
          {/* Language selector matching header design */}
          <div 
            ref={langDropdownRef}
            className="relative rounded-32 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg cursor-pointer h-10 flex items-center justify-center min-w-[120px]"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <div className="flex items-center space-x-2">
              <i className="ri-global-fill text-firstlab-orange text-sm"></i>
              <span className="text-black/80 font-medium text-sm">
                {lang === 'zh' ? '中文' : lang === 'en' ? 'EN' : '日本語'}
              </span>
              <i className={`ri-arrow-down-s-line text-black/60 text-sm transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}></i>
            </div>
            
            {langDropdownOpen && (
              <div 
                ref={langMenuRef}
                className="absolute top-full right-0 mt-2 w-full min-w-[120px] rounded-32 overflow-hidden z-50"
              >
                {/* Background layer with mask for hover effect */}
                <div 
                  className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-32"
                  style={getTransparentMaskStyle(hoveredLangRect)}
                ></div>
                
                {/* Content layer */}
                <div className="relative">
                  <button
                    ref={el => { langItemRefs.current['zh'] = el; }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLang('zh');
                      setLangDropdownOpen(false);
                    }}
                    onMouseEnter={() => setHoveredLang('zh')}
                    onMouseLeave={() => setHoveredLang(null)}
                    className="w-full px-4 py-2 text-center text-black/80 hover:text-firstlab-orange transition-colors text-sm border-b border-white/20 last:border-b-0"
                  >
                    中文
                  </button>
                  <button
                    ref={el => { langItemRefs.current['en'] = el; }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLang('en');
                      setLangDropdownOpen(false);
                    }}
                    onMouseEnter={() => setHoveredLang('en')}
                    onMouseLeave={() => setHoveredLang(null)}
                    className="w-full px-4 py-2 text-center text-black/80 hover:text-firstlab-orange transition-colors text-sm border-b border-white/20 last:border-b-0"
                  >
                    EN
                  </button>
                  <button
                    ref={el => { langItemRefs.current['ja'] = el; }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLang('ja');
                      setLangDropdownOpen(false);
                    }}
                    onMouseEnter={() => setHoveredLang('ja')}
                    onMouseLeave={() => setHoveredLang(null)}
                    className="w-full px-4 py-2 text-center text-black/80 hover:text-firstlab-orange transition-colors text-sm border-b border-white/20 last:border-b-0"
                  >
                    日本語
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-firstlab-orange/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-firstlab-orange/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-firstlab-orange/5 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-4 leading-tight">
            {t('hero.welcome', lang)}
          </h2>
          <p className="text-2xl md:text-3xl text-firstlab-orange mb-6 font-medium">
            {t('hero.tagline', lang)}
          </p>
          <p className="text-lg md:text-xl text-black/70 max-w-4xl mx-auto mb-10 leading-relaxed">
            {t('firstlab.description', lang)}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={t('community.discord_url', lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-4 bg-firstlab-orange text-white rounded-32 font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-firstlab-orange/25"
            >
              <i className="ri-discord-fill mr-2 text-lg"></i>
              {t('community.join', lang)}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">
            {t('features.title', lang)}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group bg-white/70 backdrop-blur-md rounded-32 p-8 border border-black/5 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-18 h-18 bg-firstlab-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-firstlab-orange/20 transition-all duration-300">
                <i className="ri-translate-2 text-2xl text-firstlab-orange"></i>
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">{t('features.multilingual', lang)}</h4>
              <p className="text-black/70 leading-relaxed">{t('features.multilingual_desc', lang)}</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-md rounded-32 p-8 border border-black/5 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-18 h-18 bg-firstlab-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-firstlab-orange/20 transition-all duration-300">
                <i className="ri-open-source-fill text-2xl text-firstlab-orange"></i>
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">{t('features.opensource', lang)}</h4>
              <p className="text-black/70 leading-relaxed">{t('features.opensource_desc', lang)}</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-md rounded-32 p-8 border border-black/5 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-18 h-18 bg-firstlab-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-firstlab-orange/20 transition-all duration-300">
                <i className="ri-global-fill text-2xl text-firstlab-orange"></i>
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">{t('features.global', lang)}</h4>
              <p className="text-black/70 leading-relaxed">{t('features.global_desc', lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidebook Section */}
      <section id="guidebook" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-32 p-8 md:p-12 border border-black/5 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  {t('guidebook.title', lang)}
                </h3>
                <p className="text-black/70 mb-6">
                  {t('guidebook.description', lang)}
                </p>
                <a
                  href={t('guidebook.url', lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-firstlab-orange text-white rounded-32 font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                  <i className="ri-external-link-line mr-2"></i>
                  {t('guidebook.visit', lang)}
                </a>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-firstlab-orange/10 rounded-32 flex items-center justify-center">
                  <i className="ri-book-open-fill text-6xl text-firstlab-orange"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-black mb-12">
            {t('community.discord', lang)}
          </h3>
          
          <div className="bg-white/60 backdrop-blur-md rounded-32 p-12 border border-black/5 shadow-lg max-w-2xl mx-auto">
            <i className="ri-discord-fill text-6xl text-firstlab-orange mb-6"></i>
            <h4 className="text-2xl font-semibold text-black mb-4">
              {t('community.join', lang)}
            </h4>
            <p className="text-black/70 mb-8">
              {t('firstlab.description', lang)}
            </p>
            <a
              href={t('community.discord_url', lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-firstlab-orange text-white rounded-32 font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              <i className="ri-discord-fill mr-2"></i>
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-black/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-black/60">{t('footer.copyright', lang)}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;