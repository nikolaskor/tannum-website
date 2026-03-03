# Tannum — Architectural Design & Digital Flagship

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer specializing in high-end interior design and architectural ecommerce. You build high-fidelity, cinematic "1:1 Pixel Perfect" digital showrooms. Every site you produce should feel like walking into a flagship design studio — every scroll intentional, every animation weighted, every image breathing quality. Eradicate all generic AI patterns. This must feel like it belongs next to the global sites of Vitra, Cassina, or Carl Hansen & Søn — not a generic webshop template.

## Language

**All user-facing copy must be in Norwegian (Bokmål).** Navigation, headings, CTAs, descriptions, footer — everything. The only exceptions are the brand name "Tannum", international brand names they carry, and specific design terms where English is industry standard (e.g., "Lounge Chair"). Tone should be knowledgeable, timeless, and uncompromising on quality.

## Agent Flow — MUST FOLLOW

When the user asks to build this site (or this file is loaded into a fresh project), ask **one question** using AskUserQuestion, then build the full site. Do not ask follow-ups. Do not over-discuss. Build.

### Question (single AskUserQuestion call)

1. **"Velg estetisk retning for Tannum"** — Single-select from Preset A or Preset B below. Each preset ships a full design system (palette, typography, image mood, identity label).

### Pre-filled Brand Inputs

These are fixed and should NOT be asked:

- **Brand name & tagline:** "Tannum — Tidløs design og interiørarkitektur siden 1938"
- **Location:** Stortingsgaten 28, 0161 Oslo
- **Brand positioning:** Norway's leading destination for curated interior design. A bridge between traditional craftsmanship and modern innovation, offering both iconic design pieces and comprehensive interior architecture services.
- **3 brand pillars:**
  1. Arv & Kunnskap — Ekspertise opparbeidet gjennom over 80 år i faget.
  2. Kuratering — Et kompromissløst utvalg av de fremste internasjonale og skandinaviske merkevarene.
  3. Interiørarkitektur — Helhetlige løsninger skreddersydd for private hjem og offentlige rom.
- **Primary CTA:** "Utforsk kolleksjonen"
- **Secondary CTA:** "Bestill veiledning"
- **Product categories:** Møbler, Belysning, Tekstil, Utemøbler, Interiør, Ikoner, Kampanjer.

---

## Aesthetic Presets

Each preset defines: `palette`, `typography`, `identity` (the overall feel), and `imageMood` (Unsplash search keywords for hero/architectural images).

### Preset A — "The Heritage Gallery" (Nordic Light & Craftsmanship)

- **Identity:** A sunlit, open gallery space. Focus on natural oak, linen, daylight, and tactile craftsmanship.
- **Palette:** Bone `#F9F7F2` (Background), Deep Forest `#1B2621` (Text/Primary), Oak `#A68966` (Accent), Soft Grey `#E5E5E5` (Surface), Warm White `#FFFFFF` (Light)
- **Typography:** Headings: "Inter" (tight tracking, uppercase for nav). Drama: "Cormorant Garamond" Light Italic. Body: `"Inter"` (regular weight).
- **Image Mood:** minimalist interior design, scandinavian furniture, natural oak wood grain, architectural shadows, bright showroom, daylight living room, linen textures.
- **Hero line pattern:** "[Establishment Year / Brand]" (Bold Sans uppercase) / "[Design Philosophy]." (Massive Serif Italic) — e.g., "SIDEN 1938" / "Form som varer."

### Preset B — "The Modernist Studio" (Architectural & Continental)

- **Identity:** Exclusive, continental, and architectural. Focus on dark leather, steel, glass, and dramatic lighting.
- **Palette:** Graphite `#121212` (Background), Off-white `#F2F2F2` (Text/Primary), Bronze `#8C7355` (Accent), Anthracite `#1F1F1F` (Surface), Soft Black `#0A0A0A` (Dark)
- **Typography:** Headings: "Inter" (medium weight, tight tracking). Drama: "Playfair Display" Italic. Body: `"Inter"` (light weight).
- **Image Mood:** luxury interior design dark, leather lounge chair detail, iconic lighting, modern architecture, mood lighting room, steel and glass furniture.
- **Hero line pattern:** "[Imperative verb]" (Bold Sans uppercase) / "[Architectural noun]." (Massive Serif Italic) — e.g., "OPPDAG" / "Ikonene."

---

## Fixed Design System (NEVER CHANGE)

These rules apply to ALL presets. They mirror the precision of high-end furniture design.

### Visual Texture

- Implement a global CSS noise overlay using an inline SVG `<feTurbulence>` filter at **0.02 opacity** (very subtle) to give a tactile, paper-like feel.
- Use sharp or very slightly rounded corners (`rounded-none` to `rounded-sm` or `rounded-md` max) to reflect architectural precision. No bubbly, large pill-shapes for product cards.

### Micro-Interactions

- Animations should feel **weighted and intentional**, like moving a solid piece of oak furniture. Use `cubic-bezier(0.25, 1, 0.5, 1)` for transitions.
- Hovering over an image slowly scales the image inside its container `scale(1.03)` over `0.8s`.
- "Legg i handlekurv" or "Forespør pris" buttons animate with a slow background fill.

### Animation Lifecycle

- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()`.
- Default easing: `power3.inOut` for morphs and reveals. Slower durations (e.g., `1.2s`) to convey luxury.
- Stagger value: `0.1` for text, `0.15` for product cards.
- Hero images and architectural shots use slow `clipPath` reveals.

### Image Treatment

- Furniture requires context and detail. Use `aspect-[4/5]` for product shots and `aspect-[16/9]` for wide architectural/room shots.
- On hover, product images cross-fade to a macro-detail shot (showing wood grain, stitching, or fabric texture) using CSS `opacity`.

---

## Component Architecture

### A. NAVBAR — "The Floating Plinth"

- **Morphing Logic:** Transparent at the top. Transitions to a solid, slightly blurred background (`bg-[background]/90 backdrop-blur-md`) with a 1px bottom border when scrolled.
- **Contains:** Logo ("TANNUM" in clean sans-serif), navigation links (Møbler, Belysning, Tekstil, Tjenester, Merker), icon group (Search, Cart/Inquiry).
- **Mobile:** Elegant full-screen overlay nav with staggered text reveal.

### B. HERO SECTION — "The Showroom Entry"

- `100dvh` height. Full-bleed architectural interior image with a gradient overlay to ensure text readability.
- **Layout:** Text centered or pushed to the bottom-left third.
- **Typography:** Follows preset hero line pattern.
- Two CTAs: Primary "Utforsk utvalget", Secondary "Våre tjenester" (ghost button).

### C. MARQUEE — "The Partners"

- Infinite-scroll marquee.
- Contains: "VITRA • CARL HANSEN & SØN • CASSINA • LOUIS POULSEN • ARTEK • FLOS • FREDERICIA • MONTANA • FRITZ HANSEN"
- Moves slowly. Sophisticated serif italic font.

### D. FEATURED SPACES — "Room by Room"

A curated grid showcasing furniture in its natural habitat (Living, Dining, Workspace).

- **Card 1 (Large, 2 rows):** "Stuen" — "Hjertet i hjemmet. Oppdag sofaer og loungestoler skapt for generasjoner."
- **Card 2:** "Spiseplassen" — "Der livet samles. Bord og stoler med overlegent håndverk."
- **Card 3:** "Hjemmekontoret" — "Arbeidsro. Ergonomi møter tidløs estetikk."
- All images are high-end interior photography. Small "Utforsk →" links.

### E. PRODUCT GRID — "The Icons"

A scrollable showroom floor.

- **Section header:** "Designklassikere" in large serif italic.
- **Filter bar:** Møbler, Belysning, Oppbevaring, Tilbehør.
- **Grid:** 4 columns desktop, 2 mobile. 8 products.
- **Product card anatomy:**
  - `aspect-[4/5]` image container. Clean grey or white background for products.
  - Brand name (small, uppercase), Product Name (Medium, bold), Designer name (Italic, muted). Price formatted as "Fra X XXX kr".
- **Product data (Use realistic names/prices):**
  1. Carl Hansen & Søn — "CH24 Y-stolen" — Hans J. Wegner — Fra 6 490 kr
  2. Vitra — "Eames Lounge Chair" — Charles & Ray Eames — Fra 84 900 kr
  3. Louis Poulsen — "PH 5 Pendel" — Poul Henningsen — 9 200 kr
  4. Fritz Hansen — "Svanen" — Arne Jacobsen — Fra 42 000 kr
  5. Montana — "Free Hyllesystem" — Jakob Wagner — Fra 5 800 kr
  6. Cassina — "LC2 Lenestol" — Le Corbusier — Fra 58 000 kr
  7. Flos — "Snoopy Bordlampe" — Achille Castiglioni — 11 500 kr
  8. Fredericia — "Den Spanske Stol" — Børge Mogensen — Fra 44 000 kr

### F. BRAND STORY — "The 1938 Manifesto"

- Full-width dark section.
- **Typography:** "En stol er ikke bare et møbel; det er et stykke historie, et håndverk, og en investering i livskvalitet."
- **Copy:** "Siden Per Tannum åpnet dørene i 1938, har vi veiledet våre kunder til valg som tåler tidens tann. Fra vårt ikoniske lokale i Stortingsgata kuraterer vi det ypperste av internasjonal og skandinavisk design."
- **Animation:** GSAP triggered word-by-word reveal.

### G. INTERIOR ARCHITECTURE — "The Project Archive"

3 full-screen editorial cards that stack on scroll, highlighting their interior architecture services.

- **Interaction:** GSAP ScrollTrigger with `pin: true`. Cards stack, scale down to `0.95`, and darken when a new one covers them.
- **Content:**
  1. "Privatbolig" / "Skreddersydde løsninger som reflekterer din personlighet og arkitekturens egenart."
  2. "Kontor & Næring" / "Representativt, funksjonelt og varig. Vi innreder morgendagens arbeidsplasser."
  3. "Book Konsultasjon" / "Våre interiørarkitekter hjelper deg fra konsept til ferdigstilt prosjekt."

### H. FOOTER

- Deep, sophisticated background color.
- **Top section:** "Tannum" + tagline "Tidløs design og interiørarkitektur siden 1938".
- **Grid layout:** 1. "Kategorier" — Møbler, Belysning, Tekstil, Utemøbler. 2. "Tjenester" — Interiørarkitekt, Møbeltapetsering, Levering og Montering. 3. "Om Tannum" — Vår historie, Kontakt oss, Stortingsgata 28. 4. "Nyhetsbrev" — Input field.
- **Bottom bar:** "© 2026 Tannum Møbler AS" + Personvern + Vilkår.

---

## Technical Requirements (NEVER CHANGE)

- **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (with ScrollTrigger), Lucide React.
- **Images:** Use real Unsplash URLs matching `imageMood`. Never use placeholder URLs.
- **File structure:** Single `App.jsx` (or split cleanly if needed). Single `index.css`.
- **Cart/Inquiry State:** Since many high-end items require configuration (fabric choices, wood treatments), the cart button for items over 20,000 NOK should say "Forespør pris" instead of "Legg i handlekurv". Implement a simple slide-out drawer for the inquiry list.
- **Execution Directive:** "Do not build a webshop; build a digital flagship showroom. Every scroll should feel like running your hand over oiled oak. Every product reveal should feel intentional. Eradicate all generic ecommerce patterns."
