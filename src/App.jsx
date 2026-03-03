import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingBag, Menu, X, ArrowRight, ArrowLeft, Send, ChevronDown, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */

const MEGA_MENU = {
  Møbler: {
    columns: [
      { heading: 'Sittemøbler', links: ['Sofaer', 'Lenestoler', 'Loungestoler', 'Spisestoler', 'Barkrakker'] },
      { heading: 'Bord & Oppbevaring', links: ['Spisebord', 'Salongbord', 'Sidebord', 'Hyller', 'Sideboards'] },
      { heading: 'Soverom', links: ['Senger', 'Nattbord', 'Kommoder', 'Garderobeløsninger'] },
    ],
    brands: ['Fritz Hansen', 'Vitra', 'Carl Hansen & Søn', 'Cassina', 'Fredericia'],
    featured: { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', label: 'Nytt inn', title: 'CH07 Skallstolen', cta: 'Utforsk nyheter' },
  },
  Belysning: {
    columns: [
      { heading: 'Type', links: ['Pendler', 'Bordlamper', 'Gulvlamper', 'Vegglamper', 'Taklamper'] },
      { heading: 'Rom', links: ['Stue', 'Spiseplass', 'Soverom', 'Kontor', 'Utendørs'] },
    ],
    brands: ['Louis Poulsen', 'Flos', 'Artek', 'Santa & Cole', 'Le Klint'],
    featured: { img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80', label: 'Ikonisk', title: 'PH 5 Pendel', cta: 'Se belysning' },
  },
  Tekstil: {
    columns: [
      { heading: 'Kategorier', links: ['Tepper', 'Puter', 'Pledd', 'Gardiner', 'Sengetøy'] },
      { heading: 'Materiale', links: ['Ull', 'Lin', 'Bomull', 'Silke', 'Skinn'] },
    ],
    brands: ['Kvadrat', 'Hay', 'Muuto', 'Marimekko'],
    featured: { img: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=80', label: 'Sesong', title: 'Vårens tekstiler', cta: 'Utforsk tekstil' },
  },
  Utemøbler: {
    columns: [
      { heading: 'Utendørs', links: ['Hagestoler', 'Hagebord', 'Loungemøbler', 'Solsenger', 'Parasoller'] },
      { heading: 'Tilbehør', links: ['Uteputer', 'Utebelysning', 'Plantekrukker', 'Utetekstiler'] },
    ],
    brands: ['Skagerak', 'Kettal', 'Tribu', 'Dedon'],
    featured: { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', label: 'Nyhet', title: 'Terrassen 2026', cta: 'Se utemøbler' },
  },
  Tjenester: {
    columns: [
      { heading: 'Interiørarkitektur', links: ['Privatbolig', 'Kontor & Næring', 'Konsultasjon', 'Prosjektledelse'] },
      { heading: 'Verksted', links: ['Møbeltapetsering', 'Restaurering', 'Skreddersøm', 'Levering & Montering'] },
    ],
    brands: [],
    featured: { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', label: 'Tjeneste', title: 'Book en konsultasjon', cta: 'Kom i gang' },
  },
  Merker: {
    columns: [
      { heading: 'Skandinavia', links: ['Fritz Hansen', 'Carl Hansen & Søn', 'Fredericia', 'Montana', 'Muuto'] },
      { heading: 'Italia', links: ['Cassina', 'Flos', 'B&B Italia', 'Poltrona Frau'] },
      { heading: 'Internasjonalt', links: ['Vitra', 'Artek', 'Louis Poulsen', 'Knoll', 'Herman Miller'] },
    ],
    brands: [],
    featured: { img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80', label: 'Merke', title: 'Vitra — siden 1950', cta: 'Alle merker' },
  },
};

const NAV_KEYS = Object.keys(MEGA_MENU);

const BRANDS = 'VITRA • CARL HANSEN & SØN • CASSINA • LOUIS POULSEN • ARTEK • FLOS • FREDERICIA • MONTANA • FRITZ HANSEN';

const SPACES = [
  {
    title: 'Stuen',
    desc: 'Hjertet i hjemmet. Oppdag sofaer og loungestoler skapt for generasjoner.',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
    large: true,
  },
  {
    title: 'Spiseplassen',
    desc: 'Der livet samles. Bord og stoler med overlegent håndverk.',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
  },
  {
    title: 'Hjemmekontoret',
    desc: 'Arbeidsro. Ergonomi møter tidløs estetikk.',
    img: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80',
  },
];

const PRODUCTS = [
  {
    id: 'ch24', brand: 'Carl Hansen & Søn', name: 'CH24 Y-stolen', designer: 'Hans J. Wegner', price: 'Fra 6 490 kr',
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
    ],
    description: 'Y-stolen, designet i 1950, er Hans J. Wegners mest ikoniske stol. Med sin karakteristiske Y-formede rygg og håndflettet papirsnorsete kombinerer den organisk form med eksepsjonelt håndverk. En tidløs klassiker som passer like godt ved spisebordet som ved skrivebordet.',
    specs: { 'Høyde': '76 cm', 'Bredde': '55 cm', 'Dybde': '51 cm', 'Materiale': 'Massiv eik, papirsnor', 'Designår': '1950', 'Opprinnelse': 'Danmark' },
  },
  {
    id: 'eames-lounge', brand: 'Vitra', name: 'Eames Lounge Chair', designer: 'Charles & Ray Eames', price: 'Fra 84 900 kr',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    inquiry: true,
    gallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    description: 'Eames Lounge Chair er et udiskutabelt designikon fra 1956. Charles og Ray Eames skapte stolen som en moderne tolkning av den klassiske engelske klubbstolen — med formpresset kryssfiner, førsteklasses lær og tidløse proporsjoner som definerer luksus og komfort.',
    specs: { 'Høyde': '84 cm', 'Bredde': '84 cm', 'Dybde': '85 cm', 'Materiale': 'Valnøtt, premium lær', 'Designår': '1956', 'Opprinnelse': 'USA / Tyskland' },
  },
  {
    id: 'ph5', brand: 'Louis Poulsen', name: 'PH 5 Pendel', designer: 'Poul Henningsen', price: '9 200 kr',
    img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=1200&q=80',
    ],
    description: 'PH 5 er Poul Henningsens mesterverk fra 1958 — en pendel som gir perfekt, blendfritt lys i alle retninger. De matematisk beregnede skjermene dirigerer lyset både ned og ut til sidene, og skaper en varm, innbydende atmosfære over ethvert bord.',
    specs: { 'Diameter': '50 cm', 'Høyde': '27 cm', 'Fatning': 'E27', 'Materiale': 'Aluminium, messing', 'Designår': '1958', 'Opprinnelse': 'Danmark' },
  },
  {
    id: 'svanen', brand: 'Fritz Hansen', name: 'Svanen', designer: 'Arne Jacobsen', price: 'Fra 42 000 kr',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    inquiry: true,
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
    ],
    description: 'Svanen ble opprinnelig designet til SAS Royal Hotel i København i 1958. Med sin skulpturelle form og omsluttende silhuett er den like mye et kunstverk som en sittemøbel. Håndpolstret med premium lær eller tekstil over en indre skallkonstruksjon.',
    specs: { 'Høyde': '77 cm', 'Bredde': '68 cm', 'Dybde': '65 cm', 'Materiale': 'Skumformet skall, premium lær', 'Designår': '1958', 'Opprinnelse': 'Danmark' },
  },
  {
    id: 'free', brand: 'Montana', name: 'Free Hyllesystem', designer: 'Jakob Wagner', price: 'Fra 5 800 kr',
    img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    description: 'Free-serien fra Montana er et modulært hyllesystem som kombinerer funksjonalitet med dansk designtradisjon. Systemet kan tilpasses ethvert rom og behov — fra bokhylle til mediamøbel. Tilgjengelig i Montanas fulle fargepalett med over 40 farger.',
    specs: { 'Høyde': '211 cm', 'Bredde': '34,8 cm per modul', 'Dybde': '38 cm', 'Materiale': 'Lakk MDF, stål', 'Designår': '2005', 'Opprinnelse': 'Danmark' },
  },
  {
    id: 'lc2', brand: 'Cassina', name: 'LC2 Lenestol', designer: 'Le Corbusier', price: 'Fra 58 000 kr',
    img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    inquiry: true,
    gallery: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
    ],
    description: 'LC2 fra 1928 er Le Corbusiers revolusjonære tolkning av den polstrede lenestolen. Den eksponerte stålrammen bærer løse, fyldige puter — en radikal separasjon av struktur og komfort som definerte modernismens møbelspråk.',
    specs: { 'Høyde': '67 cm', 'Bredde': '76 cm', 'Dybde': '70 cm', 'Materiale': 'Krom stålrør, premium lær', 'Designår': '1928', 'Opprinnelse': 'Italia' },
  },
  {
    id: 'snoopy', brand: 'Flos', name: 'Snoopy Bordlampe', designer: 'Achille Castiglioni', price: '11 500 kr',
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=1200&q=80',
    ],
    description: 'Snoopy bordlampe fra 1967 er en leken og skulpturell lampe fra den italienske mesteren Achille Castiglioni. Med sin tunge marmorfot og elegante emaljerte metallskjerm balanserer den perfekt mellom funksjon og kunstnerisk uttrykk.',
    specs: { 'Høyde': '36,9 cm', 'Diameter skjerm': '39,4 cm', 'Fatning': 'E27', 'Materiale': 'Carrara-marmor, lakk metall', 'Designår': '1967', 'Opprinnelse': 'Italia' },
  },
  {
    id: 'spanske', brand: 'Fredericia', name: 'Den Spanske Stol', designer: 'Børge Mogensen', price: 'Fra 44 000 kr',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    detail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    inquiry: true,
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80',
    ],
    description: 'Den Spanske Stol fra 1958 er inspirert av spanske og nordafrikanske møbeltradisjoner. Børge Mogensen skapte en stol med enestående sittekomfort, der den brede skinnseteputen hviler i en massiv eikeramme — et mesterverk i skandinavisk funksjonalisme.',
    specs: { 'Høyde': '67 cm', 'Bredde': '82 cm', 'Dybde': '80 cm', 'Materiale': 'Massiv eik, sadellær', 'Designår': '1958', 'Opprinnelse': 'Danmark' },
  },
];

const FILTERS = ['Alle', 'Møbler', 'Belysning', 'Oppbevaring', 'Tilbehør'];

const PROJECTS = [
  { title: 'Privatbolig', desc: 'Skreddersydde løsninger som reflekterer din personlighet og arkitekturens egenart.', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80' },
  { title: 'Kontor & Næring', desc: 'Representativt, funksjonelt og varig. Vi innreder morgendagens arbeidsplasser.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
  { title: 'Book Konsultasjon', desc: 'Våre interiørarkitekter hjelper deg fra konsept til ferdigstilt prosjekt.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80' },
];

/* ─── Navbar ─── */

function Navbar({ inquiryCount, onCartClick, forceScrolled }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleEnter = useCallback((key) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const menuOpen = activeMenu !== null;
  const forceLight = menuOpen || scrolled || forceScrolled;

  return (
    <>
      <nav
        onMouseLeave={handleLeave}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          forceLight
            ? 'bg-bone border-b border-deep-forest/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <a href="#" className={`font-sans font-semibold tracking-[0.25em] text-sm transition-colors duration-700 ${forceLight ? 'text-deep-forest' : 'text-white'}`}>
            TANNUM
          </a>

          <div className="hidden lg:flex items-center gap-9">
            {NAV_KEYS.map((key) => (
              <button
                key={key}
                onMouseEnter={() => handleEnter(key)}
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                className={`group flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-500 bg-transparent border-none cursor-pointer ${
                  activeMenu === key
                    ? 'text-deep-forest'
                    : forceLight
                      ? 'text-deep-forest/60 hover:text-deep-forest'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {key}
                <ChevronDown
                  size={12}
                  
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${activeMenu === key ? 'rotate-180' : ''}`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button aria-label="Søk" className={`transition-colors duration-500 ${forceLight ? 'text-deep-forest/60 hover:text-deep-forest' : 'text-white/70 hover:text-white'}`}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Handlekurv"
              onClick={onCartClick}
              className={`relative transition-colors duration-500 ${forceLight ? 'text-deep-forest/60 hover:text-deep-forest' : 'text-white/70 hover:text-white'}`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {inquiryCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-oak text-[10px] text-white rounded-full flex items-center justify-center font-medium">
                  {inquiryCount}
                </span>
              )}
            </button>
            <button
              aria-label="Meny"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden transition-colors duration-500 ${forceLight ? 'text-deep-forest/60 hover:text-deep-forest' : 'text-white/70 hover:text-white'}`}
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ── Mega Menu Panel (Desktop) ── */}
        <div
          ref={megaRef}
          onMouseEnter={() => clearTimeout(closeTimer.current)}
          onMouseLeave={handleLeave}
          className={`hidden lg:block absolute left-0 right-0 top-full bg-bone overflow-hidden transition-all duration-600 ease-luxury ${
            menuOpen
              ? 'max-h-[600px] opacity-100 shadow-[0_20px_60px_-15px_rgba(27,38,33,0.08)]'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {/* Subtle top border accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-deep-forest/10 to-transparent" />

          {activeMenu && MEGA_MENU[activeMenu] && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
              <div className="grid grid-cols-12 gap-8">

                {/* Left: Category heading + "Se alle" link */}
                <div className="col-span-2 border-r border-deep-forest/6 pr-8">
                  <h3 className="font-display italic text-2xl text-deep-forest mb-3">
                    {activeMenu}
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-oak text-[11px] font-medium tracking-[0.15em] uppercase hover:gap-2.5 transition-all duration-500"
                  >
                    Se alle <ArrowRight size={11} strokeWidth={1.5} />
                  </a>
                </div>

                {/* Center: Subcategory columns */}
                <div className="col-span-6 flex gap-12">
                  {MEGA_MENU[activeMenu].columns.map((col) => (
                    <div key={col.heading} className="min-w-[130px]">
                      <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-deep-forest/35 mb-6 pb-3 border-b border-deep-forest/6">
                        {col.heading}
                      </h4>
                      <ul className="space-y-3.5">
                        {col.links.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="group/link flex items-center text-[13px] text-deep-forest/60 hover:text-deep-forest transition-all duration-300 font-light"
                            >
                              <span className="w-0 group-hover/link:w-4 overflow-hidden transition-all duration-300 ease-luxury">
                                <ChevronRight size={10} strokeWidth={2} className="text-oak" />
                              </span>
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right: Featured image — editorial card */}
                <div className="col-span-4 pl-8 border-l border-deep-forest/6">
                  <a href="#" className="group block relative overflow-hidden rounded-sm h-full min-h-[320px]">
                    <img
                      src={MEGA_MENU[activeMenu].featured.img}
                      alt={MEGA_MENU[activeMenu].featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-deep-forest/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <span className="inline-block text-[9px] font-semibold tracking-[0.3em] uppercase text-oak/90 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                        {MEGA_MENU[activeMenu].featured.label}
                      </span>
                      <h5 className="text-white font-display italic text-xl leading-snug mb-2">
                        {MEGA_MENU[activeMenu].featured.title}
                      </h5>
                      <span className="inline-flex items-center gap-1.5 text-white/70 text-[11px] font-medium tracking-[0.12em] uppercase group-hover:text-white group-hover:gap-2.5 transition-all duration-500">
                        {MEGA_MENU[activeMenu].featured.cta} <ArrowRight size={12} strokeWidth={1.5} />
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Brand row */}
              {MEGA_MENU[activeMenu].brands.length > 0 && (
                <div className="mt-10 pt-6 border-t border-deep-forest/6">
                  <div className="flex items-center gap-6 flex-wrap">
                    <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-deep-forest/25">
                      Utvalgte merker
                    </span>
                    <div className="w-px h-3 bg-deep-forest/10" />
                    {MEGA_MENU[activeMenu].brands.map((brand, idx) => (
                      <a
                        key={brand}
                        href="#"
                        className="text-[12px] text-deep-forest/40 hover:text-deep-forest transition-colors duration-300 tracking-wide"
                      >
                        {brand}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`mobile-nav-overlay fixed inset-0 z-40 bg-bone overflow-y-auto pt-24 pb-10 px-6 lg:hidden ${
          mobileOpen ? 'open' : ''
        }`}
      >
        {NAV_KEYS.map((key, i) => {
          const data = MEGA_MENU[key];
          const isExpanded = mobileExpanded === key;
          return (
            <div
              key={key}
              className="border-b border-deep-forest/8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                onClick={() => setMobileExpanded(isExpanded ? null : key)}
                className="w-full flex items-center justify-between py-5 bg-transparent border-none"
              >
                <span className="text-deep-forest text-lg font-light tracking-[0.15em] uppercase">
                  {key}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`text-deep-forest/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-luxury ${
                  isExpanded ? 'max-h-[600px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                {data.columns.map((col) => (
                  <div key={col.heading} className="mb-5">
                    <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-deep-forest/35 mb-3 pl-1">
                      {col.heading}
                    </h4>
                    <div className="flex flex-col gap-2.5 pl-1">
                      {col.links.map((link) => (
                        <a
                          key={link}
                          href="#"
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-deep-forest/65 font-light"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                {data.brands.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pl-1 pt-2 border-t border-deep-forest/6">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-deep-forest/30 w-full mb-1">
                      Merker
                    </span>
                    {data.brands.map((brand) => (
                      <a key={brand} href="#" onClick={() => setMobileOpen(false)} className="text-xs text-deep-forest/50 font-light">
                        {brand}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ─── Hero ─── */

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-img',
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power3.inOut' }
      );
      gsap.fromTo(
        '.hero-tag',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-headline',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.4, stagger: 0.15, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden">
      <div className="hero-img absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
          alt="Arkitektonisk interiør"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-deep-forest/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <p className="hero-tag text-oak text-xs font-medium tracking-[0.3em] uppercase mb-4">
          Stortingsgaten 28, Oslo
        </p>
        <div className="mb-8">
          <h1 className="hero-tag font-sans font-bold text-white text-sm tracking-[0.3em] uppercase mb-3">
            SIDEN 1938
          </h1>
          <p className="hero-headline font-display italic text-white text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.95] font-light">
            Form som varer.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="#produkter" className="hero-cta btn-fill bg-oak text-white px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase inline-block">
            Utforsk utvalget
          </a>
          <a href="#tjenester" className="hero-cta btn-ghost text-white px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase inline-block border-white">
            Våre tjenester
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */

function Marquee() {
  const text = `${BRANDS} — ${BRANDS} — `;

  return (
    <section className="py-8 border-y border-deep-forest/10 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        <span className="font-display italic text-deep-forest/25 text-lg tracking-[0.1em] px-4">
          {text}
        </span>
        <span className="font-display italic text-deep-forest/25 text-lg tracking-[0.1em] px-4" aria-hidden="true">
          {text}
        </span>
      </div>
    </section>
  );
}

/* ─── Featured Spaces ─── */

function FeaturedSpaces() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.space-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
      <h2 className="font-display italic text-4xl lg:text-5xl text-deep-forest mb-16">
        Rom for rom
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        {SPACES.map((space) => (
          <div
            key={space.title}
            className={`space-card group relative overflow-hidden rounded-sm ${
              space.large ? 'md:row-span-2' : ''
            }`}
          >
            <div className={`relative w-full ${space.large ? 'h-full min-h-[600px]' : 'aspect-[4/5]'}`}>
              <img
                src={space.img}
                alt={space.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-luxury group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <h3 className="text-white font-sans font-medium text-sm tracking-[0.2em] uppercase mb-2">
                {space.title}
              </h3>
              <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm mb-4">
                {space.desc}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-oak text-xs font-medium tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-500"
              >
                Utforsk <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Product Grid ─── */

function ProductGrid({ onAddInquiry, onSelectProduct }) {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="produkter" ref={sectionRef} className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
      <h2 className="font-display italic text-4xl lg:text-5xl text-deep-forest mb-4">
        Designklassikere
      </h2>
      <p className="text-deep-forest/40 text-sm font-light mb-12 max-w-lg">
        Et kompromissløst utvalg av de fremste internasjonale og skandinaviske ikonene.
      </p>

      <div className="flex gap-6 mb-12 overflow-x-auto pb-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-500 pb-1 ${
              activeFilter === f
                ? 'text-deep-forest border-b border-oak'
                : 'text-deep-forest/35 hover:text-deep-forest/60'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.name} className="product-card group cursor-pointer" onClick={() => onSelectProduct(product)}>
            <div className="relative aspect-[4/5] bg-soft-grey rounded-sm overflow-hidden mb-4">
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                className="product-main absolute inset-0 w-full h-full object-cover"
              />
              <img
                src={product.detail}
                alt={`${product.name} detalj`}
                loading="lazy"
                className="product-detail absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-deep-forest/40 text-[10px] font-medium tracking-[0.2em] uppercase mb-1">
              {product.brand}
            </p>
            <h3 className="text-deep-forest text-sm font-medium mb-0.5">{product.name}</h3>
            <p className="text-deep-forest/40 font-display italic text-xs mb-2">{product.designer}</p>
            <div className="flex items-center justify-between">
              <span className="text-deep-forest/60 text-xs font-light">{product.price}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onAddInquiry(product); }}
                className="text-oak text-[10px] font-medium tracking-[0.1em] uppercase hover:text-deep-forest transition-colors duration-500"
              >
                {product.inquiry ? 'Forespør pris' : 'Legg i kurv'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Brand Story ─── */

function BrandStory() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quoteWords = quoteRef.current?.querySelectorAll('.word-reveal');
      const bodyWords = bodyRef.current?.querySelectorAll('.word-reveal');

      if (quoteWords?.length) {
        gsap.fromTo(
          quoteWords,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true },
          }
        );
      }

      if (bodyWords?.length) {
        gsap.fromTo(
          bodyWords,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power3.out',
            scrollTrigger: { trigger: bodyRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const quote = 'En stol er ikke bare et møbel; det er et stykke historie, et håndverk, og en investering i livskvalitet.';
  const body = 'Siden Per Tannum åpnet dørene i 1938, har vi veiledet våre kunder til valg som tåler tidens tann. Fra vårt ikoniske lokale i Stortingsgata kuraterer vi det ypperste av internasjonal og skandinavisk design.';

  return (
    <section ref={sectionRef} className="bg-deep-forest py-28 lg:py-40">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        <p className="text-oak text-xs font-medium tracking-[0.3em] uppercase mb-10">Siden 1938</p>
        <blockquote ref={quoteRef} className="font-display italic text-bone text-2xl sm:text-3xl lg:text-4xl leading-snug mb-12">
          {quote.split(' ').map((word, i) => (
            <span key={i} className="word-reveal inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </blockquote>
        <p ref={bodyRef} className="text-bone/50 text-base font-light leading-relaxed max-w-2xl">
          {body.split(' ').map((word, i) => (
            <span key={i} className="word-reveal inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ─── Interior Architecture (Stacking Cards) ─── */

function InteriorArchitecture() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.arch-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const overlay = card.querySelector('.arch-card-overlay');
          const scale = 1 - (cards.length - 1 - i) * 0.02;
          gsap.set(card, { scale, force3D: true });

          ScrollTrigger.create({
            trigger: card,
            start: 'top 10%',
            endTrigger: cards[cards.length - 1],
            end: 'top 10%',
            pin: true,
            pinSpacing: false,
          });

          gsap.fromTo(
            overlay,
            { opacity: 0 },
            {
              opacity: 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 10%',
                endTrigger: cards[cards.length - 1],
                end: 'top 10%',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tjenester" ref={sectionRef} className="py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16">
        <h2 className="font-display italic text-4xl lg:text-5xl text-deep-forest mb-4">
          Interiørarkitektur
        </h2>
        <p className="text-deep-forest/40 text-sm font-light max-w-lg">
          Helhetlige løsninger skreddersydd for private hjem og offentlige rom.
        </p>
      </div>

      {PROJECTS.map((project, i) => (
        <div
          key={project.title}
          className="arch-card relative h-[80vh] w-screen left-1/2 -translate-x-1/2 overflow-hidden"
        >
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-deep-forest/20 to-transparent" />
          <div className="arch-card-overlay absolute inset-0 bg-deep-forest pointer-events-none" style={{ opacity: 0 }} />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <span className="text-oak text-xs font-medium tracking-[0.3em] uppercase mb-3 block">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-white font-sans font-medium text-2xl lg:text-4xl tracking-tight mb-3">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
              {project.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-deep-forest border-t border-deep-forest/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="mb-16">
          <p className="font-sans font-semibold text-bone tracking-[0.25em] text-sm mb-2">TANNUM</p>
          <p className="text-bone/40 text-sm font-light">
            Tidløs design og interiørarkitektur siden 1938
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <div>
            <h4 className="text-bone text-xs font-medium tracking-[0.2em] uppercase mb-5">Kategorier</h4>
            {['Møbler', 'Belysning', 'Tekstil', 'Utemøbler'].map((link) => (
              <a key={link} href="#" className="block text-bone/40 text-sm font-light hover:text-bone transition-colors duration-500 mb-2.5">
                {link}
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-bone text-xs font-medium tracking-[0.2em] uppercase mb-5">Tjenester</h4>
            {['Interiørarkitekt', 'Møbeltapetsering', 'Levering og Montering'].map((link) => (
              <a key={link} href="#" className="block text-bone/40 text-sm font-light hover:text-bone transition-colors duration-500 mb-2.5">
                {link}
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-bone text-xs font-medium tracking-[0.2em] uppercase mb-5">Om Tannum</h4>
            {['Vår historie', 'Kontakt oss', 'Stortingsgata 28, Oslo'].map((link) => (
              <a key={link} href="#" className="block text-bone/40 text-sm font-light hover:text-bone transition-colors duration-500 mb-2.5">
                {link}
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-bone text-xs font-medium tracking-[0.2em] uppercase mb-5">Nyhetsbrev</h4>
            <p className="text-bone/40 text-sm font-light mb-4">
              Motta nyheter om nye kolleksjoner og eksklusive tilbud.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex border-b border-bone/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-post"
                className="flex-1 bg-transparent text-bone text-sm font-light py-3 outline-none placeholder:text-bone/20"
              />
              <button aria-label="Meld deg på" className="text-oak hover:text-bone transition-colors duration-500 pl-3">
                <Send size={16} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-bone/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bone/30 text-xs font-light">
            &copy; 2026 Tannum Møbler AS
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-bone/30 text-xs font-light hover:text-bone/60 transition-colors duration-500">
              Personvern
            </a>
            <a href="#" className="text-bone/30 text-xs font-light hover:text-bone/60 transition-colors duration-500">
              Vilkår
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Inquiry Drawer ─── */

function InquiryDrawer({ open, onClose, items, onRemove }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-50 transition-opacity duration-500"
          onClick={onClose}
        />
      )}
      <div className={`inquiry-drawer fixed top-0 right-0 h-full w-full max-w-md bg-bone z-50 flex flex-col shadow-2xl ${open ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-6 border-b border-deep-forest/10">
          <h3 className="text-deep-forest text-xs font-medium tracking-[0.2em] uppercase">
            Forespørsler ({items.length})
          </h3>
          <button onClick={onClose} className="text-deep-forest/40 hover:text-deep-forest transition-colors duration-500">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-deep-forest/30 text-sm font-light text-center mt-20">
              Ingen produkter lagt til ennå.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 border-b border-deep-forest/10 pb-4">
                  <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-sm" />
                  <div className="flex-1">
                    <p className="text-deep-forest/40 text-[10px] font-medium tracking-[0.15em] uppercase">{item.brand}</p>
                    <p className="text-deep-forest text-sm font-medium">{item.name}</p>
                    <p className="text-deep-forest/40 text-xs font-light">{item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemove(i)}
                    className="text-deep-forest/25 hover:text-deep-forest transition-colors duration-500 self-start"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-deep-forest/10">
            <button className="btn-fill bg-oak text-white w-full py-3.5 text-xs font-medium tracking-[0.2em] uppercase">
              Send forespørsel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Product Page ─── */

function ProductPage({ product, onBack, onAddInquiry, onSelectProduct }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = product.gallery || [product.img];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.id]);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="pt-28 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-medium tracking-[0.15em] uppercase text-deep-forest/35">
          <button onClick={onBack} className="hover:text-deep-forest transition-colors duration-500">Hjem</button>
          <span>/</span>
          <span>Møbler</span>
          <span>/</span>
          <span className="text-deep-forest/50">{product.brand}</span>
          <span>/</span>
          <span className="text-deep-forest/70">{product.name}</span>
        </nav>
      </div>

      {/* Two-column hero */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image gallery */}
          <div>
            <div className="relative aspect-[4/5] bg-soft-grey rounded-sm overflow-hidden mb-4">
              <img
                src={images[activeImage]}
                alt={`${product.name} — bilde ${activeImage + 1}`}
                className="gallery-main-image absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-24 rounded-sm overflow-hidden transition-all duration-500 ${
                    activeImage === i ? 'gallery-thumb-active ring-2 ring-oak' : 'ring-1 ring-deep-forest/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt={`Miniatyrbilde ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="lg:pt-4">
            <p className="text-deep-forest/40 text-[10px] font-medium tracking-[0.25em] uppercase mb-2">
              {product.brand}
            </p>
            <h1 className="font-display italic text-4xl lg:text-5xl text-deep-forest mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-deep-forest/40 font-display italic text-base mb-6">
              Design av {product.designer}
            </p>
            <p className="text-deep-forest text-lg font-light mb-8">
              {product.price}
            </p>
            <p className="text-deep-forest/60 text-sm font-light leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Specs table */}
            {product.specs && (
              <div className="border-t border-deep-forest/10 mb-10">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-baseline justify-between py-3 border-b border-deep-forest/6">
                    <span className="text-deep-forest/40 text-xs font-medium tracking-[0.1em] uppercase">{key}</span>
                    <span className="text-deep-forest text-sm font-light">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onAddInquiry(product)}
                className="btn-fill bg-oak text-white px-10 py-3.5 text-xs font-medium tracking-[0.2em] uppercase"
              >
                {product.inquiry ? 'Forespør pris' : 'Legg i handlekurv'}
              </button>
              <button
                onClick={onBack}
                className="btn-ghost text-deep-forest px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase inline-flex items-center gap-2"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
                Tilbake
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-24 lg:mt-36">
        <h2 className="font-display italic text-3xl lg:text-4xl text-deep-forest mb-12">
          Du vil kanskje også like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {related.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => onSelectProduct(p)}>
              <div className="relative aspect-[4/5] bg-soft-grey rounded-sm overflow-hidden mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-luxury group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-deep-forest/40 text-[10px] font-medium tracking-[0.2em] uppercase mb-1">{p.brand}</p>
              <h3 className="text-deep-forest text-sm font-medium mb-0.5">{p.name}</h3>
              <p className="text-deep-forest/40 text-xs font-light">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ─── App ─── */

export default function App() {
  const [inquiryItems, setInquiryItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddInquiry = useCallback((product) => {
    setInquiryItems((prev) => [...prev, product]);
  }, []);

  const handleRemoveInquiry = useCallback((index) => {
    setInquiryItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleGoBack = useCallback(() => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Navbar
        inquiryCount={inquiryItems.length}
        onCartClick={() => setDrawerOpen(true)}
        forceScrolled={!!selectedProduct}
      />
      {selectedProduct ? (
        <ProductPage
          product={selectedProduct}
          onBack={handleGoBack}
          onAddInquiry={handleAddInquiry}
          onSelectProduct={handleSelectProduct}
        />
      ) : (
        <main>
          <Hero />
          <Marquee />
          <ProductGrid onAddInquiry={handleAddInquiry} onSelectProduct={handleSelectProduct} />
          <FeaturedSpaces />
          <BrandStory />
          <InteriorArchitecture />
        </main>
      )}
      <Footer />
      <InquiryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={inquiryItems}
        onRemove={handleRemoveInquiry}
      />
    </>
  );
}
