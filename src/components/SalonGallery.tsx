import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeGalleryImages } from '../data/galleryData';

interface LightboxProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ index, onClose, onPrev, onNext }: LightboxProps) {
  const img = homeGalleryImages[index];

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
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(42,31,26,0.94)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos"
    >
      <motion.img
        key={index}
        src={img.src}
        alt={img.alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        style={{ borderRadius: 18 }}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 p-2 transition-opacity hover:opacity-100 opacity-60"
        style={{ color: '#FDF4E8' }}
        aria-label="Fermer"
      >
        <X size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 transition-opacity hover:opacity-100 opacity-60"
        style={{ color: '#FDF4E8' }}
        aria-label="Photo précédente"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 transition-opacity hover:opacity-100 opacity-60"
        style={{ color: '#FDF4E8' }}
        aria-label="Photo suivante"
      >
        <ChevronRight size={32} />
      </button>

      <span
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-condensed text-xs tracking-widest"
        style={{ color: 'rgba(253,244,232,0.6)' }}
      >
        {index + 1} / {homeGalleryImages.length}
      </span>
    </motion.div>
  );
}

export default function SalonGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + homeGalleryImages.length) % homeGalleryImages.length : null
    );
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % homeGalleryImages.length : null));
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ background: '#F4E5D0' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">

        {/* En-tête */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <motion.p
              className="eyebrow mb-5"
              style={{ color: '#A8763C' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Galerie
            </motion.p>
            <motion.h2
              className="display-md text-balance"
              style={{ color: '#2A1F1A' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Un salon avec{' '}
              <span className="italic" style={{ color: '#A8763C' }}>du caractère.</span>
            </motion.h2>
          </div>

          <motion.a
            href="#/galerie"
            data-cursor="hover"
            className="group inline-flex items-center gap-2.5 font-condensed text-[12px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: '#A8763C' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Voir toute la galerie
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {homeGalleryImages.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              data-cursor="hover"
              className="overflow-hidden group block w-full text-left"
              style={{ borderRadius: 24, boxShadow: '0 12px 36px rgba(160,100,70,0.16)' }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              aria-label={`Agrandir la photo ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </motion.button>
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
    </section>
  );
}
