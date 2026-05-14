import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';
import { galleryItems } from '../utils/imageImports';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  const currentItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <PageTransition>
      <div className="bg-ink">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="GALLERY"
              title="Field Work, Labs, and Project Highlights"
              subtitle="A visual record of our investigations, surveys, and engineering support across India."
            />
            <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6">
              {galleryItems.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="mb-6 break-inside-avoid group relative w-full overflow-hidden rounded-2xl"
                  data-cursor="link"
                >
                  <img
                    src={item.src}
                    alt="Sreedevigeotech gallery"
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-gold/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={18} className="text-[var(--bg-primary)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {currentItem ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(27,35,51,0.55)] backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative max-w-5xl w-[90%]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
              >
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute right-0 -top-12 text-gold"
                  aria-label="Close"
                  data-cursor="link"
                >
                  <X />
                </button>
                <div className="relative">
                  <img src={currentItem.src} alt="Gallery" className="w-full max-h-[70vh] object-contain" />
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-gold"
                    data-cursor="link"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((prev) => (prev + 1) % galleryItems.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-gold"
                    data-cursor="link"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                  {lightboxIndex + 1} / {galleryItems.length}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
