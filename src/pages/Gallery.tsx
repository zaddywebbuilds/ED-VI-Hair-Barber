import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/galleryData';
import Footer from '../components/Footer';

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = galleryImages[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(9,9,9,0.95)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.img
        key={index}
        src={img.src}
        alt={img.alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-6 right-6 text-cream/60 hover:text-cream p-2" aria-label="Fermer">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream p-2" aria-label="Précédent">
        <ChevronLeft size={32} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream p-2" aria-label="Suivant">
        <ChevronRight size={32} />
      </button>
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-condensed text-xs tracking-widest text-steel">
        {index + 1} / {galleryImages.length}
      </span>
    </div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  }, []);

  return (
    <>
      <Helmet>
        <title>Galerie — ED-VI Hair Barber | Photos du salon à Clermont-Ferrand</title>
        <meta name="description" content="Découvrez les photos du salon ED-VI Hair Barber à Clermont-Ferrand. Coupes hommes, ambiance vintage et travail de précision." />
      </Helmet>
      <main style={{ background: '#090909', minHeight: '100vh' }}>
        {/* Header */}
        <section className="pt-32 pb-12 px-6" style={{ background: '#090909' }}>
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ED-VI Hair Barber
            </motion.p>
            <motion.h1
              className="font-serif text-cream"
              style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Galerie
            </motion.h1>
          </div>
        </section>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Mosaïque : chaque photo garde ses proportions d'origine */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                className="break-inside-avoid mb-3 overflow-hidden cursor-pointer group rounded-2xl"
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}

        <Footer />
      </main>
    </>
  );
}
