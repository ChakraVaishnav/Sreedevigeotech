# Sreedevigeotech — Full Website Build Prompt

## Project Overview

Build a **stunning, FAANG-level static React website** for **Sreedevigeotech**, a professional Geotechnical engineering company. The site must feel world-class — refined, authoritative, technically impressive, with extraordinary animations that would make a Fortune 500 company proud. This is the **most critical aspect**: the UI must be extraordinary.

---

## Tech Stack

- **Vite + React** (latest)
- **React Router DOM v6** (for multi-page routing)
- **Framer Motion** (for all animations — page transitions, scroll reveals, hero effects)
- **Tailwind CSS** (utility-first styling)
- **GSAP** (for heavy scroll-based animations, parallax, text reveals if needed)
- **Lucide React** (icons)
- **React Intersection Observer** (`react-intersection-observer`) — for triggering scroll animations

---

## Aesthetic Direction — CRITICAL

**Theme**: Dark, authoritative, technical luxury. Think deep navy/slate backgrounds with sharp golden/amber accents. The feel should be: *precision engineering meets architectural elegance*.

**Color Palette (CSS variables):**
```css
--bg-primary: #0A0E1A       /* Deep navy black */
--bg-secondary: #0F1628     /* Slightly lighter navy */
--bg-card: #141C30          /* Card backgrounds */
--accent-gold: #C9A84C      /* Primary golden accent */
--accent-gold-light: #E2C074
--accent-blue: #3B82F6      /* Secondary accent for CTAs */
--text-primary: #F0F4FF
--text-secondary: #8892A4
--border-subtle: #1E2A42
```

**Typography:**
- Display/Hero headings: `Playfair Display` (Google Fonts) — authoritative and elegant
- Subheadings: `Barlow Condensed` (semibold, wide-tracked uppercase)
- Body: `DM Sans` — clean and modern
- Import all three from Google Fonts in `index.css`

**Animations Philosophy:**
- Page load: staggered fade+slide up of hero elements (Framer Motion `variants`)
- Scroll: every section animates in with `useInView` from `react-intersection-observer` triggering Framer Motion variants
- Hover states on every interactive element: cards lift with subtle shadow, buttons have shimmer/glow effects
- Smooth page transitions between routes (Framer Motion `AnimatePresence`)
- Numbers/stats should count up when they enter viewport
- Cursor: custom cursor (dot + ring that follows mouse)

---

## Folder Structure

```
src/
  assets/
    images/ (Vite import all images from here)
  components/
    Navbar.jsx
    Footer.jsx
    CustomCursor.jsx
    PageTransition.jsx
    SectionHeading.jsx        (reusable animated section title)
    AnimatedCard.jsx
  pages/
    Home.jsx
    About.jsx
    Services.jsx
    Projects.jsx
    Gallery.jsx
    Contact.jsx
  hooks/
    useScrollAnimation.js
    useCountUp.js
  utils/
    imageImports.js            (centralize all image imports)
  App.jsx
  main.jsx
  index.css
```

---

## Image Handling

In `src/utils/imageImports.js`, import all images using Vite's `import.meta.glob`:

```js
// Hero images (slideshow)
export const heroImages = Object.values(import.meta.glob('../assets/images/HeroSec/*', { eager: true, as: 'url' }));

// About images
export const aboutImages = Object.values(import.meta.glob('../assets/images/About/*', { eager: true, as: 'url' }));

// Projects — grouped by subfolder
export const projectImages = import.meta.glob('../assets/images/projects/**/*', { eager: true, as: 'url' });
// Then group them by subfolder name in the same file

// Gallery — combine all images or specify a gallery folder
export const galleryImages = [...heroImages, ...aboutImages, ...Object.values(projectImages)];
```

For the projects, parse the path to group by subfolder (project name):
```js
export const projectGroups = {};
Object.entries(projectImages).forEach(([path, url]) => {
  const parts = path.split('/');
  const projectName = parts[parts.length - 2]; // subfolder name
  if (!projectGroups[projectName]) projectGroups[projectName] = { name: projectName, images: [] };
  projectGroups[projectName].images.push(url);
});
export const projectsList = Object.values(projectGroups);
```

---

## Component Specs

### `Navbar.jsx`
- Fixed top, transparent on hero → solid dark background on scroll (`useEffect` + `scrollY`)
- Logo: "SREEDELTA" or "SREEDEVIGEOTECH" in Playfair Display with a thin gold underline accent
- Nav links: Home, About, Services, Projects, Gallery, Contact
- Active link highlighted with gold underline animation
- Mobile: hamburger → full-screen overlay menu with staggered link animations
- Smooth scroll to section if anchor, React Router Link if page

### `CustomCursor.jsx`
- Small dot (4px) + larger ring (32px) that follows mouse with `useEffect` + `requestAnimationFrame`
- Ring has slight lag (lerp interpolation) for smooth trailing effect
- On hover over links/buttons: ring expands + changes color to gold
- Hide default cursor with `cursor: none` on `body`

### `Footer.jsx`
- Dark footer with company logo, nav links, services quick list
- Contact info (phone, email, address)
- Copyright line
- Thin gold top border
- Subtle animated particles or geometric lines in background (CSS only)

---

## Pages — Detailed Specs

---

### `Home.jsx`

#### 1. Hero Section
- **Full viewport height** (`100vh`)
- **Background**: Slideshow of images from `HeroSec/` folder
  - Auto-advance every 5 seconds
  - Framer Motion `AnimatePresence` for crossfade transitions between images
  - Dark overlay (`rgba(10,14,26,0.65)`) on top of images
  - Subtle Ken Burns zoom effect on each image (CSS animation: `scale(1) → scale(1.08)` over 5s)
- **Content** (centered, staggered Framer Motion fade-up on load):
  - Eyebrow text: `TRUSTED SINCE [YEAR] · PRECISION ENGINEERING` in Barlow Condensed, gold color, letter-spaced
  - H1: `Building the Future` (line 1) `From the Ground Up` (line 2) — Playfair Display, large (~80px desktop), white
  - Subtext: `Expert Geotechnical Solutions for Infrastructure, Construction & Environmental Projects`
  - Two CTA buttons: `Explore Services` (filled gold) + `View Projects` (outlined)
- **Scroll indicator**: animated bouncing chevron at bottom center
- **Stats bar** at bottom of hero (overlapping slightly): 3 stats like `500+ Projects`, `15+ Years`, `200+ Clients` — dark glassmorphism card bar

#### 2. About Overview Section
- Two-column layout: left text, right image (one from About folder, cropped nicely)
- Eyebrow: `WHO WE ARE`
- Heading: `Precision Meets Innovation in Every Project`
- Body text (write something like this):
  > Sreedevigeotech is a leading geotechnical engineering firm with decades of expertise in subsurface investigation, laboratory testing, and specialized foundation solutions. We combine cutting-edge technology with deep engineering knowledge to deliver accurate, reliable data that drives safer, smarter infrastructure decisions across India.
- Bullet points (with gold checkmarks): `ISO Certified`, `State-of-the-Art Equipment`, `Expert Engineers`, `Pan-India Operations`
- CTA button: `Learn More About Us` → links to `/about`
- Scroll-in animation: text slides from left, image slides from right

#### 3. Services Overview Section
- Section heading: `OUR EXPERTISE`
- H2: `Comprehensive Geotechnical Services`
- **6 service cards** in a responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Each card:
  - Dark card background (`--bg-card`)
  - A relevant icon (Lucide or custom SVG — suggestions below)
  - Service name (bold, white)
  - 2-line description
  - `View More →` button (gold, underline style)
  - On hover: card lifts (translateY -8px), gold left border appears, subtle glow shadow
  - `View More` links to `/services#geo-technical-investigation` (anchor to that service section)

**Services & suggested icons:**
| Service | Icon |
|---|---|
| Geo-technical Investigation | `Layers` |
| Laboratory Testing | `FlaskConical` |
| Topographical & Contour | `Map` |
| Geo-physical Investigations | `ScanSearch` |
| Hydrographic Survey | `Waves` |
| Pile Foundation | `Building2` |

**Service descriptions (write these):**
- Geo-technical Investigation: "Comprehensive subsurface exploration including soil sampling, borehole drilling, and in-situ testing for safe foundation design."
- Laboratory Testing: "Advanced soil and rock testing in our state-of-the-art laboratory to determine engineering properties and behavior."
- Topographical & Contour: "High-precision topographic surveys and contour mapping using modern GPS and total station equipment."
- Geo-physical Investigations: "Non-invasive subsurface profiling using seismic, resistivity, and GPR methods for detailed ground characterization."
- Hydrographic Survey: "Precise underwater surveys of riverbeds, reservoirs, and coastal areas for bridge, dam, and port projects."
- Pile Foundation: "Design and analysis of pile foundation systems ensuring safe load transfer for heavy structures and high-rise buildings."

Cards animate in with staggered delay using `useInView`

#### 4. Our Clients Section
- Section heading: `TRUSTED BY INDUSTRY LEADERS`
- **Marquee / infinite scroll strip** (two rows, opposite directions for visual richness)
- Each client item: a placeholder logo area (white/grey box) + company name below
- **Implementation**: CSS-only infinite scroll animation using `@keyframes` `translateX`
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  ```
- Duplicate the list so it loops seamlessly
- On hover over the strip: pause animation
- Client names (use these as placeholders — client can replace logos later):
  `NHAI`, `RRDC AP`, `L&T Construction`, `IRCON`, `MEIL`, `NCC Limited`, `Shapoorji Pallonji`, `Afcons Infrastructure`, `Megha Engineering`, `KMC Constructions`

#### 5. Contact CTA Section
- Full-width dark section with a subtle background texture or gradient
- Bold centered text: `Have a Project in Mind?`
- Subtext: `Let's discuss how Sreedevigeotech can deliver precise geotechnical solutions for your next project.`
- Two buttons: `Get in Touch` → `/contact`, `View Our Projects` → `/projects`
- Animated background: floating geometric shapes (triangles/dots) using CSS keyframes

#### 6. Footer
- As described in components above

---

### `About.jsx`

**Full detailed About page.**

#### Section 1 — Hero Banner
- Page hero with a background image from `About/` folder + dark overlay
- Breadcrumb: `Home > About`
- H1: `About Sreedevigeotech`

#### Section 2 — Our Story
- Two column: large body text on left, image grid (2x2 mosaic from About images) on right
- Story text:
  > Founded with a vision to transform how geotechnical intelligence drives construction in India, Sreedevigeotech has grown from a specialized investigation firm into a full-service geotechnical partner for infrastructure projects across the nation. Our team of certified engineers, geologists, and surveyors bring decades of hands-on experience to every soil, every stratum, and every structure.
- Values: grid of 4 value cards with icon + title + one-line description

#### Section 3 — Why Choose Us
- Alternating left-right layout with image + text for 3 key differentiators:
  1. `Advanced Equipment & Technology` — use one of the about images
  2. `Expert Multi-disciplinary Team`
  3. `End-to-End Project Support`

#### Section 4 — Stats Counter
- 4 animated counters (count up on scroll into view):
  - `500+` Projects Completed
  - `15+` Years of Experience
  - `200+` Happy Clients
  - `50+` Expert Engineers
- Gold numbers, white labels, dark glassmorphism card background
- Implement with `useCountUp` hook using `useInView`

#### Section 5 — Team Section (optional, if client provides names)
- Placeholder cards for key team members

---

### `Services.jsx`

**Full services page with anchor navigation.**

#### Page Hero
- Background from HeroSec images, dark overlay
- H1: `Our Services`
- Breadcrumb: `Home > Services`

#### Services Anchor Nav
- Sticky horizontal nav bar just below hero (desktop): pill buttons for each service name
- Clicking scrolls smoothly to that service's section (`Element.scrollIntoView({ behavior: 'smooth' })`)
- Active section highlighted (use `IntersectionObserver`)

#### Each Service Section (6 total)
Each section has an `id` matching its slug (e.g., `id="geo-technical-investigation"`):

**Layout alternates** left-right between image and text:

```
Section Structure:
- Large section number (e.g., "01") in faint gold behind the heading (decorative)
- Service Name heading (Playfair Display, H2)
- Divider line (gold, 60px wide)
- Detailed description (3-4 paragraphs)
- Key aspects list (bullet points with gold markers, e.g., Borehole Drilling, SPT Testing, etc.)
- Equipment/methods used (small tags/chips)
- Relevant image on alternate side
```

**Detailed content per service:**

1. **Geo-technical Investigation** (`id="geo-technical-investigation"`)
   - Description: Comprehensive site investigation is the foundation of any successful construction project. Our geotechnical investigation services include borehole drilling, soil sampling, Standard Penetration Testing (SPT), Cone Penetration Testing (CPT), and plate load tests. We assess bearing capacity, settlement potential, liquefaction risk, and groundwater conditions to provide detailed geotechnical reports that guide foundation design.
   - Key aspects: Borehole Drilling, SPT & CPT Testing, Trial Pits, Groundwater Assessment, Geotechnical Report, Site Characterization

2. **Laboratory Testing** (`id="laboratory-testing"`)
   - Description: Our NABL-accredited laboratory performs a comprehensive range of soil and rock tests to determine the engineering properties required for safe design. From basic index property tests to advanced triaxial shear and consolidation tests, we deliver accurate data with fast turnaround times.
   - Key aspects: Grain Size Analysis, Atterberg Limits, Proctor Compaction, Triaxial Shear Test, Consolidation Test, CBR Testing, Permeability Testing

3. **Topographical & Contour** (`id="topographical-contour"`)
   - Description: We deliver high-accuracy topographic surveys using GPS, Total Stations, and drone-based photogrammetry. Our contour maps and 3D terrain models are essential for planning, design, and earthwork quantity estimation in roads, dams, irrigation, and urban development projects.
   - Key aspects: GPS Survey, Total Station Survey, Drone Photogrammetry, DEM & DTM Generation, Contour Mapping, Earthwork Estimation

4. **Geo-physical Investigations** (`id="geo-physical-investigations"`)
   - Description: Non-invasive geophysical methods allow us to profile subsurface conditions over large areas cost-effectively. We use Seismic Refraction, Electrical Resistivity Tomography (ERT), and Ground Penetrating Radar (GPR) to detect bedrock depth, fault zones, cavities, and groundwater.
   - Key aspects: Seismic Refraction Survey, Electrical Resistivity Tomography, MASW Survey, GPR Investigation, Subsurface Profiling

5. **Hydrographic Survey** (`id="hydrographic-survey"`)
   - Description: Our hydrographic survey team conducts precise underwater bathymetric surveys for rivers, lakes, reservoirs, and coastal regions. We provide accurate depth contours, sediment profiling, and cross-section data critical for bridge design, dam construction, dredging projects, and port planning.
   - Key aspects: Bathymetric Survey, Echo Sounding, Cross-Section Profiling, Sediment Mapping, Flood Plain Mapping

6. **Pile Foundation** (`id="pile-foundation"`)
   - Description: We provide complete pile foundation investigation, design, and testing services. From soil investigation for pile design parameters to Static Load Tests and Dynamic Load Tests (HSDPT), we ensure your pile foundations are safe, economical, and code-compliant.
   - Key aspects: Pile Load Testing, Static Load Test, Dynamic Load Test (HSDPT), Integrity Testing (PIT), Pile Design Parameters, Lateral Load Analysis

---

### `Projects.jsx`

**Projects showcase page.**

#### Page Hero
- H1: `Our Projects`
- Subtext: `Delivering precision across India's most demanding infrastructure projects`

#### Projects Filter Bar
- Filter buttons by service type (All, Geo-technical, Laboratory, Survey, etc.)
- Animated filter transition (Framer Motion `layout` prop for smooth reordering)

#### Projects Grid
- Display each subfolder from `projects/` as a project card
- Each card:
  - First image from that subfolder as thumbnail (with `object-fit: cover`)
  - Project name (formatted from folder name — replace hyphens/underscores with spaces, title case)
  - On hover: overlay with "View Project" CTA + image zooms in (CSS scale transform)
  - Click → opens a **Project Detail Modal** (Framer Motion animated modal)
- **Project Detail Modal:**
  - All images from that project displayed in a mini gallery / lightbox
  - Project name as heading
  - Close button (top right)
  - Arrow navigation between images
  - Backdrop blur overlay (`backdrop-filter: blur(12px)`)

#### Stats Row (below grid)
- Animated counter stats (reuse from About page)

---

### `Gallery.jsx`

**Photo gallery — masonry or grid layout.**

- Import all images using `galleryImages` from imageImports.js
- **Masonry grid layout** (CSS columns or a masonry library)
- Each image on hover: slight scale + dark overlay with a zoom icon
- Click → opens **Lightbox** (full-screen image viewer):
  - Previous / Next navigation
  - Image counter (`3 / 28`)
  - Close button
  - Keyboard support (arrow keys, Escape)
  - Framer Motion slide animation between images
- Filter bar at top: `All`, `Projects`, `Site Work`, `Laboratory`, `Equipment` (filter by category based on source folder)
- Lazy loading images (`loading="lazy"` attribute)

---

### `Contact.jsx`

**Full contact page.**

#### Layout: Two-column

**Left Column:**
- Heading: `Let's Start a Conversation`
- Subtext about getting in touch for project discussions
- Contact info cards (icon + text):
  - 📍 Address
  - 📞 Phone number
  - 📧 Email
  - 🕐 Working hours
- Social links (if applicable)

**Right Column:**
- Contact form:
  - Fields: Name, Company, Email, Phone, Service (dropdown — all 6 services), Project Location, Message
  - Styled inputs (dark background, gold focus border glow)
  - Submit button with loading state
  - Form uses `useState` for controlled inputs
  - On submit: show a success message (no backend needed — just UI feedback)

#### Map Section (optional)
- Embed Google Maps iframe for company location

#### Background
- Subtle animated gradient background or geometric pattern

---

## Routing — `App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Wrap all routes in AnimatePresence for smooth page transitions
// Each page component wraps its content in a Framer Motion div:
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: -20 }}
//   transition={{ duration: 0.4 }}
```

Routes:
- `/` → `Home`
- `/about` → `About`
- `/services` → `Services` (with hash anchors for each service)
- `/projects` → `Projects`
- `/gallery` → `Gallery`
- `/contact` → `Contact`

The `View More` buttons on Home page service cards link to:
`/services#geo-technical-investigation` etc.

On `Services.jsx` load, check `window.location.hash` in a `useEffect` and scroll to that section.

---

## Reusable Components

### `SectionHeading.jsx`
```jsx
// Props: eyebrow (string), title (string), subtitle (string), center (bool)
// Animated with Framer Motion on scroll (useInView)
// Eyebrow: gold, uppercase, letter-spaced, Barlow Condensed
// Title: Playfair Display, large
// Animated underline: thin gold bar that expands from left on entry
```

### `PageTransition.jsx`
```jsx
// Wrap each page's root div with this
// Framer Motion variants for enter/exit
```

### `AnimatedCard.jsx`
```jsx
// Reusable card with hover lift + glow effects
// Props: children, delay (for stagger)
```

---

## Global CSS (`index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --bg-primary: #0A0E1A;
  --bg-secondary: #0F1628;
  --bg-card: #141C30;
  --accent-gold: #C9A84C;
  --accent-gold-light: #E2C074;
  --accent-blue: #3B82F6;
  --text-primary: #F0F4FF;
  --text-secondary: #8892A4;
  --border-subtle: #1E2A42;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'DM Sans', sans-serif;
  cursor: none; /* for custom cursor */
  overflow-x: hidden;
}

html { scroll-behavior: smooth; }

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--accent-gold); border-radius: 3px; }
```

---

## Packages to Install

```bash
npm create vite@latest sreedevigeotech -- --template react
cd sreedevigeotech
npm install react-router-dom framer-motion gsap tailwindcss postcss autoprefixer lucide-react react-intersection-observer
npx tailwindcss init -p
```

Tailwind config — add the font families to `tailwind.config.js`:
```js
theme: {
  extend: {
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      condensed: ['Barlow Condensed', 'sans-serif'],
      body: ['DM Sans', 'sans-serif'],
    },
    colors: {
      'gold': '#C9A84C',
      'gold-light': '#E2C074',
      'navy': '#0A0E1A',
      'navy-light': '#141C30',
    }
  }
}
```

---

## Final Quality Checklist

Before finishing:
- [ ] All images load correctly from subfolders using `import.meta.glob`
- [ ] All 6 service `View More` buttons link to correct anchor on Services page
- [ ] Smooth scroll to anchor works on Services page on direct URL visit
- [ ] Hero slideshow auto-advances with smooth crossfade
- [ ] Marquee client section loops infinitely and pauses on hover
- [ ] Project modal opens/closes with animation, images are navigable
- [ ] Gallery lightbox works with keyboard navigation
- [ ] Custom cursor appears and reacts to hover states
- [ ] Page transitions animate smoothly (no flash)
- [ ] Navbar becomes solid on scroll
- [ ] All scroll-reveal animations trigger correctly
- [ ] Counter animations trigger once on scroll into view
- [ ] Mobile responsive: hamburger menu, stacked layouts, touch-friendly
- [ ] No console errors, all imports resolve

---

## Notes for the Agent

- Place all client images in `src/assets/images/` maintaining the subfolder structure: `HeroSec/`, `About/`, `projects/[project-name]/`
- Do NOT use placeholder images from the internet — use the actual imported paths from `imageImports.js`
- Keep all components clean and well-commented
- Use `framer-motion`'s `variants` pattern consistently for all animations
- Avoid any purple gradients, generic Inter font, or cookie-cutter layouts
- The gold + deep navy palette must be consistent everywhere
- Every section must have a scroll-reveal animation — nothing should be static on load
