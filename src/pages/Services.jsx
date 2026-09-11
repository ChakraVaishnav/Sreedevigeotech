import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { aboutImages, heroImages } from '../utils/imageImports';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import useScrollAnimation from '../hooks/useScrollAnimation';
import usePageMeta from '../hooks/usePageMeta';

const services = [
  {
    id: 'geo-technical-investigation',
    number: '01',
    title: 'Geo-technical Investigation',
    description: [
      'Comprehensive site investigation is the foundation of any successful construction project.',
      'Our geotechnical investigation services include borehole drilling, soil sampling, Standard Penetration Testing (SPT), Cone Penetration Testing (CPT), and plate load tests.',
      'We assess bearing capacity, settlement potential, liquefaction risk, and groundwater conditions to provide detailed geotechnical reports that guide foundation design.',
    ],
    aspects: [
      'Borehole Drilling',
      'SPT and CPT Testing',
      'Trial Pits',
      'Groundwater Assessment',
      'Geotechnical Report',
      'Site Characterization',
    ],
    methods: ['Drilling Rigs', 'SPT Equipment', 'CPT Units', 'In-situ Sensors', 'Logging Software'],
    imageIndex: 0,
  },
  {
    id: 'laboratory-testing',
    number: '02',
    title: 'Laboratory Testing',
    description: [
      'Our NABL-accredited laboratory performs a comprehensive range of soil and rock tests to determine the engineering properties required for safe design.',
      'From basic index property tests to advanced triaxial shear and consolidation tests, we deliver accurate data with fast turnaround times.',
      'Every sample is tracked, tested, and documented under strict quality standards to support confident foundation decisions.',
    ],
    aspects: [
      'Grain Size Analysis',
      'Atterberg Limits',
      'Proctor Compaction',
      'Triaxial Shear Test',
      'Consolidation Test',
      'CBR Testing',
      'Permeability Testing',
    ],
    methods: ['NABL Protocols', 'Triaxial Cells', 'Compaction Molds', 'Permeability Units'],
    imageIndex: 1,
  },
  {
    id: 'topographical-contour',
    number: '03',
    title: 'Topographical and Contour',
    description: [
      'We deliver high-accuracy topographic surveys using GPS, Total Stations, and drone-based photogrammetry.',
      'Our contour maps and 3D terrain models are essential for planning, design, and earthwork quantity estimation in roads, dams, irrigation, and urban development projects.',
      'Digital terrain models are prepared with precision to support planning, grading, and drainage design.',
    ],
    aspects: [
      'GPS Survey',
      'Total Station Survey',
      'Drone Photogrammetry',
      'DEM and DTM Generation',
      'Contour Mapping',
      'Earthwork Estimation',
    ],
    methods: ['DGPS Systems', 'Total Stations', 'UAV Mapping', 'CAD Deliverables'],
    imageIndex: 2,
  },
  {
    id: 'geo-physical-investigations',
    number: '04',
    title: 'Geo-physical Investigations',
    description: [
      'Non-invasive geophysical methods allow us to profile subsurface conditions over large areas cost-effectively.',
      'We use Seismic Refraction, Electrical Resistivity Tomography (ERT), and Ground Penetrating Radar (GPR) to detect bedrock depth, fault zones, cavities, and groundwater.',
      'These investigations complement drilling data to deliver a richer understanding of site conditions.',
    ],
    aspects: [
      'Seismic Refraction Survey',
      'Electrical Resistivity Tomography',
      'MASW Survey',
      'GPR Investigation',
      'Subsurface Profiling',
    ],
    methods: ['Seismic Sensors', 'ERT Arrays', 'GPR Units', 'Inversion Software'],
    imageIndex: 3,
  },
  {
    id: 'hydrographic-survey',
    number: '05',
    title: 'Hydrographic Survey',
    description: [
      'Our hydrographic survey team conducts precise underwater bathymetric surveys for rivers, lakes, reservoirs, and coastal regions.',
      'We provide accurate depth contours, sediment profiling, and cross-section data critical for bridge design, dam construction, dredging projects, and port planning.',
      'Dedicated crews ensure safe data capture even in complex hydraulic conditions.',
    ],
    aspects: [
      'Bathymetric Survey',
      'Echo Sounding',
      'Cross-Section Profiling',
      'Sediment Mapping',
      'Flood Plain Mapping',
    ],
    methods: ['Echo Sounders', 'RTK GPS', 'Boat Surveys', 'Hydro Software'],
    imageIndex: 4,
  },
  {
    id: 'pile-foundation',
    number: '06',
    title: 'Pile Foundation',
    description: [
      'We provide complete pile foundation investigation, design, and testing services.',
      'From soil investigation for pile design parameters to Static Load Tests and Dynamic Load Tests (HSDPT), we ensure your pile foundations are safe, economical, and code-compliant.',
      'Our team delivers clear recommendations for capacity, settlement, and construction sequencing.',
    ],
    aspects: [
      'Pile Load Testing',
      'Static Load Test',
      'Dynamic Load Test (HSDPT)',
      'Integrity Testing (PIT)',
      'Pile Design Parameters',
      'Lateral Load Analysis',
    ],
    methods: ['Load Test Systems', 'PIT Equipment', 'Pile Design Tools'],
    imageIndex: 5,
  },
];

function ServiceSection({ service, index }) {
  const { ref, controls, variants } = useScrollAnimation();

  const image = [...aboutImages, ...heroImages][service.imageIndex] || heroImages[0];

  return (
    <motion.section
      ref={ref}
      id={service.id}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="py-12"
    >
      <div
        className={`grid gap-10 items-center lg:grid-cols-[1.1fr_0.9fr] ${
          index % 2 === 1 ? 'lg:[&>div]:order-2' : ''
        }`}
      >
        <div className="relative">
          <span className="absolute -top-8 text-6xl font-display text-gold/10">{service.number}</span>
          <h2 className="font-display text-3xl sm:text-4xl">{service.title}</h2>
          <div className="section-divider mt-4" />
          <div className="mt-5 space-y-4 text-[var(--text-secondary)]">
            {service.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-condensed uppercase tracking-[0.2em] text-sm text-gold">Key Aspects</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-[var(--text-secondary)]">
              {service.aspects.map((aspect) => (
                <li key={aspect} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {aspect}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.methods.map((method) => (
              <span
                key={method}
                className="px-3 py-1 rounded-full border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-[var(--border-subtle)]">
          <img src={image} alt={service.title} className="w-full h-[360px] object-cover" />
        </div>
      </div>
    </motion.section>
  );
}

export default function Services() {
  usePageMeta({
    title: 'Geotechnical Services | Investigation, Soil Testing, Surveys — Sreedevigeotech',
    description:
      'Borehole drilling, SPT/CPT testing, soil & rock laboratory testing, topographic & contour surveys, geophysical investigations, hydrographic surveys and pile foundation design across India.',
  });

  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [location.hash]);

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="relative min-h-[50vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: heroImages[1] ? `url(${heroImages[1]})` : 'none' }}
          />
          <div className="absolute inset-0 overlay-light" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <p className="font-condensed uppercase tracking-[0.3em] text-gold text-sm">Home / Services</p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">Our Services</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="SERVICE PORTFOLIO"
              title="Geotechnical Solutions Tailored to Every Site"
              subtitle="Every service is supported by specialized equipment, experienced engineers, and clear reporting to keep your project on track."
            />
            {services.map((service, index) => (
              <ServiceSection key={service.id} service={service} index={index} />
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
