import { useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/galleryData';

// Assign varied aspect ratios for visual interest
const aspectRatios = [
  'aspect-square', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-square',
  'aspect-[16/9]', 'aspect-square', 'aspect-[4/3]', 'aspect-square',
  'aspect-square', 'aspect-[4/3]', 'aspect-square', 'aspect-[16/9]',
  'aspect-[4/3]', 'aspect-square', 'aspect-square', 'aspect-[4/3]',
  'aspect-square', 'aspect-[16/9]', 'aspect-[4/3]', 'aspect-square',
];

interface LightboxProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ index, onClose, onPrev, onNext }: LightboxProps) {
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
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(28,15,10,0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos"
    >
      {/* Image */}
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

      {/* Controls */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-cream/60 hover:text-cream p-2"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream p-2"
        aria-label="Photo précédente"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream p-2"
        aria-label="Photo suivante"
      >
        <ChevronRight size={32} />
      </button>

      {/* Counter */}
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-condensed text-xs tracking-widest text-steel">
        {index + 1} / {galleryImages.length}
      </span>
    </motion.div>
  );
}

export default function SalonGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  }, []);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: '#1C0F0A' }}>
      {/* Heading */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: '#B58A4A' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Galerie
        </motion.p>
        <motion.h2
          className="font-serif"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#F1E8D8' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Un salon avec du caractère
        </motion.h2>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="gallery-scroll flex gap-4 overflow-x-auto px-6 pb-4"
        style={{ scrollbarWidth: 'thin', cursor: 'grab' }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={img.id}
            className={`shrink-0 overflow-hidden cursor-pointer group relative ${aspectRatios[i] || 'aspect-square'}`}
            style={{ width: i % 5 === 0 ? '360px' : '280px' }}
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            {/* Hover brass border */}
            <div
              className="absolute inset-0 border border-brass opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="max-w-7xl mx-auto px-6 mt-10 text-right">
        <a
          href="#/galerie"
          className="font-condensed text-[12px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
          style={{ color: '#B58A4A' }}
        >
          Voir toute la galerie →
        </a>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
