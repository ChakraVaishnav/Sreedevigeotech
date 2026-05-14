import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { heroImages, projectsList } from '../utils/imageImports';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import { useInView } from 'react-intersection-observer';
import useCountUp from '../hooks/useCountUp';


const stats = [
  { label: 'Projects Delivered', value: 500, suffix: '+' },
  { label: 'Critical Sites', value: 120, suffix: '+' },
  { label: 'Clients Served', value: 200, suffix: '+' },
];

function formatProjectName(name) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


function StatCard({ value, label, suffix, inView }) {
  const count = useCountUp(value, inView);

  return (
    <div className="glass-card rounded-2xl px-6 py-6 text-center">
      <div className="font-display text-3xl text-gold">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
        {label}
      </p>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];

  useEffect(() => {
    setIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKey = (event) => {
      if (!images.length) return;
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
      if (event.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  if (!images.length) return null;

  const currentImage = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(27,35,51,0.55)] backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-[var(--bg-card)] rounded-3xl max-w-5xl w-[90%] p-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gold"
          aria-label="Close"
          data-cursor="link"
        >
          <X />
        </button>
        <h3 className="font-display text-2xl">{project.displayName}</h3>
        <div className="mt-4 relative">
          {currentImage ? (
            <img src={currentImage} alt={project.displayName} className="w-full h-[420px] object-cover rounded-2xl" />
          ) : null}
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-gold"
            data-cursor="link"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-gold"
            data-cursor="link"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={`h-20 w-28 rounded-lg overflow-hidden border ${
                imageIndex === index ? 'border-gold' : 'border-transparent'
              }`}
            >
              <img src={image} alt="Project thumbnail" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const projects = useMemo(
    () =>
      projectsList.map((project) => ({
        ...project,
        displayName: formatProjectName(project.name),
        category: 'Project',
      })),
    []
  );

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="relative min-h-[50vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: heroImages[2] ? `url(${heroImages[2]})` : 'none' }}
          />
          <div className="absolute inset-0 overlay-light" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl">Our Projects</h1>
            <p className="mt-4 text-[var(--text-secondary)]">
              Delivering precision across India's most demanding infrastructure projects.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="PROJECTS"
              title="Showcasing Impact Across India"
              subtitle="Explore our portfolio of geotechnical investigations, surveys, and foundation solutions."
            />
            <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <motion.div
                  key={project.name}
                  layout
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)]"
                >
                  <img
                    src={project.images[0]}
                    alt={project.displayName}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3 justify-between">
                    <div className="bg-white px-4 py-3 rounded-xl border border-black/5 shadow-sm">
                      <h3 className="font-display text-lg text-[var(--text-primary)]">{project.displayName}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                        {project.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-full text-xs border border-black/10 bg-white text-[var(--accent-gold)] shadow-sm"
                      data-cursor="link"
                    >
                      View Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div ref={statsRef} className="grid gap-6 md:grid-cols-3">
              {stats.map((stat) => (
                <StatCard
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

        <AnimatePresence>
          {selectedProject ? (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          ) : null}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
