import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  FlaskConical,
  Layers,
  Map,
  ScanSearch,
  Waves,
} from 'lucide-react';
import { heroImages, aboutImages } from '../utils/imageImports';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import AnimatedCard from '../components/AnimatedCard';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../hooks/useCountUp';

const services = [
  {
    id: 'geo-technical-investigation',
    title: 'Geo-technical Investigation',
    description:
      'Comprehensive subsurface exploration including soil sampling, borehole drilling, and in-situ testing for safe foundation design.',
    icon: Layers,
  },
  {
    id: 'laboratory-testing',
    title: 'Laboratory Testing',
    description:
      'Advanced soil and rock testing in our state-of-the-art laboratory to determine engineering properties and behavior.',
    icon: FlaskConical,
  },
  {
    id: 'topographical-contour',
    title: 'Topographical and Contour',
    description:
      'High-precision topographic surveys and contour mapping using modern GPS and total station equipment.',
    icon: Map,
  },
  {
    id: 'geo-physical-investigations',
    title: 'Geo-physical Investigations',
    description:
      'Non-invasive subsurface profiling using seismic, resistivity, and GPR methods for detailed ground characterization.',
    icon: ScanSearch,
  },
  {
    id: 'hydrographic-survey',
    title: 'Hydrographic Survey',
    description:
      'Precise underwater surveys of riverbeds, reservoirs, and coastal areas for bridge, dam, and port projects.',
    icon: Waves,
  },
  {
    id: 'pile-foundation',
    title: 'Pile Foundation',
    description:
      'Design and analysis of pile foundation systems ensuring safe load transfer for heavy structures and high-rise buildings.',
    icon: Building2,
  },
];

const clients = [
  'NHAI',
  'RRDC AP',
  'L&T Construction',
  'IRCON',
  'MEIL',
  'NCC Limited',
  'Shapoorji Pallonji',
  'Afcons Infrastructure',
  'Megha Engineering',
  'KMC Constructions',
];

const heroStats = [
  { label: 'Projects', value: 500, suffix: '+' },
  { label: 'Years', value: 15, suffix: '+' },
  { label: 'Clients', value: 200, suffix: '+' },
];

function StatItem({ value, label, suffix, inView }) {
  const count = useCountUp(value, inView);

  return (
    <div className="px-6 py-4 text-center">
      <div className="font-display text-2xl text-gold">
        {count}
        {suffix}
      </div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)] mt-1">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const heroImage = heroImages.length ? heroImages[current] : '';

  useEffect(() => {
    if (!heroImages.length) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [statsRef, statsInViewDesktop] = useInView({ triggerOnce: true, threshold: 0.4 });
  const [statsMobileRef, statsInViewMobile] = useInView({ triggerOnce: true, threshold: 0.4 });
  const statsInView = statsInViewDesktop || statsInViewMobile;
  const aboutLeft = useScrollAnimation({
    variants: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  });
  const aboutRight = useScrollAnimation({
    variants: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  });
  const clientsMotion = useScrollAnimation();
  const ctaMotion = useScrollAnimation();

  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="relative min-h-[60vh] sm:min-h-screen flex items-center pb-10 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 bg-top sm:bg-center bg-cover hero-image hero-slide"
              style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 hero-scrim" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-16 sm:py-28">
            <motion.div initial="hidden" animate="visible" variants={heroContainer} className="max-w-4xl">
              <motion.p
                variants={heroItem}
                className="font-condensed uppercase tracking-[0.28em] text-gold text-xs sm:text-sm"
              >
                TRUSTED SINCE 2008 - PRECISION ENGINEERING
              </motion.p>
              <motion.h1
                variants={heroItem}
                className="mt-4 font-display text-3xl sm:text-6xl lg:text-7xl leading-snug"
              >
                Building the Future
                <br />
                From the Ground Up
              </motion.h1>
              <motion.p variants={heroItem} className="mt-6 text-lg text-[var(--text-secondary)]">
                Expert geotechnical solutions for infrastructure, construction, and environmental projects.
              </motion.p>
              <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="btn-gold px-6 py-3 rounded-full font-semibold"
                  data-cursor="link"
                >
                  Explore Services
                </Link>
                <Link
                  to="/projects"
                  className="btn-outline px-6 py-3 rounded-full font-semibold"
                  data-cursor="link"
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold">
            <ChevronDown size={28} style={{ animation: 'chevron 1.6s ease-in-out infinite' }} />
          </div>
          {heroImages.length > 1 ? (
            <div className="absolute bottom-16 right-10 hidden lg:flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                {String(current + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={`hero-dot-${index}`}
                    type="button"
                    onClick={() => setCurrent(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === current ? 'w-10 bg-gold' : 'w-6 bg-black/20'
                    }`}
                    aria-label={`Show slide ${index + 1}`}
                    data-cursor="link"
                  />
                ))}
              </div>
            </div>
          ) : null}
          <div
            ref={statsRef}
            className="hidden md:block w-[92%] max-w-3xl mx-auto md:mt-0 md:absolute md:-bottom-12 md:left-1/2 md:-translate-x-1/2"
          >
            <div className="glass-card rounded-2xl flex flex-col md:flex-row justify-between">
              {heroStats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              ))}
            </div>
          </div>
        </section>

        <div ref={statsMobileRef} className="md:hidden px-6 pb-10">
          <div className="glass-card rounded-2xl flex flex-col gap-2">
            {heroStats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                inView={statsInView}
              />
            ))}
          </div>
        </div>

        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <motion.div
                ref={aboutLeft.ref}
                initial="hidden"
                animate={aboutLeft.controls}
                variants={aboutLeft.variants}
              >
                <SectionHeading
                  eyebrow="WHO WE ARE"
                  title="Precision Meets Innovation in Every Project"
                  subtitle="Sreedevigeotech is a leading geotechnical engineering firm with decades of expertise in subsurface investigation, laboratory testing, and specialized foundation solutions. We combine cutting-edge technology with deep engineering knowledge to deliver accurate, reliable data that drives safer, smarter infrastructure decisions across India."
                />
                <ul className="mt-6 grid gap-3 text-[var(--text-secondary)]">
                  {['ISO Certified', 'State-of-the-Art Equipment', 'Expert Engineers', 'Pan-India Operations'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-gold" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-8 btn-outline px-5 py-3 rounded-full"
                  data-cursor="link"
                >
                  Learn More About Us <ArrowUpRight size={18} />
                </Link>
              </motion.div>
              <motion.div
                ref={aboutRight.ref}
                initial="hidden"
                animate={aboutRight.controls}
                variants={aboutRight.variants}
                className="relative"
              >
                <div className="absolute -inset-4 border border-[rgba(31,111,120,0.25)] rounded-3xl" />
                <img
                  src={aboutImages[0] || heroImages[0]}
                  alt="Sreedevigeotech team on site"
                  className="relative rounded-3xl object-cover w-full h-[420px] shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="OUR EXPERTISE"
              title="Comprehensive Geotechnical Services"
              subtitle="From investigation to advanced testing, our multidisciplinary services cover the full lifecycle of geotechnical engineering and site intelligence."
              center
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <AnimatedCard key={service.id} delay={index * 0.08}>
                    <div className="flex items-center justify-between">
                      <Icon className="text-gold" />
                      <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)]">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl">{service.title}</h3>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">{service.description}</p>
                    <Link
                      to={`/services#${service.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-gold hover:text-gold-light"
                      data-cursor="link"
                    >
                      View More <ArrowUpRight size={16} />
                    </Link>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>

        <motion.section
          ref={clientsMotion.ref}
          initial="hidden"
          animate={clientsMotion.controls}
          variants={clientsMotion.variants}
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="TRUSTED BY INDUSTRY LEADERS"
              title="Collaborations That Build National Infrastructure"
              subtitle="Leading government agencies and construction giants rely on our precision data for critical decision making."
              center
            />
          </div>
          <div className="mt-10 space-y-6">
            {[0, 1].map((row) => (
              <div key={row} className={`marquee marquee-fade ${row === 1 ? 'reverse' : ''}`}>
                <div className="marquee-track">
                  {[...clients, ...clients].map((client, index) => (
                    <div
                      key={`${client}-${index}`}
                      className="flex flex-col items-center justify-center w-48 h-24 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-card)] shadow-sm"
                    >
                      <div className="w-16 h-8 bg-black/10 rounded" />
                      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                        {client}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={ctaMotion.ref}
          initial="hidden"
          animate={ctaMotion.controls}
          variants={ctaMotion.variants}
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--bg-card)] px-8 py-16 text-center">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div
                className="absolute top-10 left-10 h-24 w-24 border border-[rgba(31,111,120,0.45)] rounded-full"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
              <div
                className="absolute bottom-6 right-16 h-16 w-16 border border-[rgba(29,78,216,0.45)] rotate-12"
                style={{ animation: 'float 7s ease-in-out infinite' }}
              />
              <div className="relative">
                <h3 className="font-display text-3xl sm:text-4xl">Have a Project in Mind?</h3>
                <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Let's discuss how Sreedevigeotech can deliver precise geotechnical solutions for your next project.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="btn-gold px-6 py-3 rounded-full" data-cursor="link">
                    Get in Touch
                  </Link>
                  <Link to="/projects" className="btn-outline px-6 py-3 rounded-full" data-cursor="link">
                    View Our Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
