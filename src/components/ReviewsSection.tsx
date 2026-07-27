import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { reviews, reviewStats } from '../data/reviewsData';

function StarRow({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill={i < count ? '#B58A4A' : '#DDD0BC'}
          aria-hidden="true"
        >
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36" style={{ background: '#F4E5D0' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12" ref={ref}>

        {/* ── Header : titre à gauche, note à droite ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <motion.p
              className="eyebrow mb-6"
              style={{ color: '#B58A4A' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Avis Google vérifiés
            </motion.p>
            <motion.h2
              className="display-lg text-balance"
              style={{ color: '#1C0F0A' }}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Ils sont passés
              <br />
              <span className="italic" style={{ color: '#B58A4A' }}>par le fauteuil.</span>
            </motion.h2>
          </div>

          {/* Bloc note */}
          <motion.div
            className="lg:col-span-5 flex items-center gap-6 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="font-serif font-light leading-none"
              style={{ fontSize: 'clamp(64px, 8vw, 104px)', color: '#1C0F0A' }}
            >
              {reviewStats.average}
            </div>
            <div className="pb-2">
              <StarRow count={5} size={17} />
              <p className="eyebrow mt-2.5" style={{ color: '#5A4030', letterSpacing: '0.2em' }}>
                {reviewStats.total} avis Google
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Grille d'avis (masonry) ── */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 mb-14">
          {reviews.map((review, i) => (
            <motion.figure
              key={review.name}
              className="break-inside-avoid mb-5 rounded-2xl p-7 transition-shadow duration-500 hover:shadow-[0_20px_48px_-16px_rgba(28,15,10,0.18)]"
              style={{ background: '#FFFFFF', border: '1px solid #E8DCC8' }}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <StarRow count={review.stars} />

              <blockquote
                className="font-sans text-[14.5px] leading-relaxed mt-4 mb-6"
                style={{ color: '#3A2A1E' }}
              >
                «&nbsp;{review.text}&nbsp;»
              </blockquote>

              <figcaption
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: '1px solid #EFE5D4' }}
              >
                <span
                  className="grid place-items-center w-9 h-9 rounded-full shrink-0 font-serif text-base"
                  style={{ background: '#1C0F0A', color: '#D4AF6F' }}
                  aria-hidden="true"
                >
                  {review.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block font-sans font-semibold text-[13px] truncate" style={{ color: '#1C0F0A' }}>
                    {review.name}
                  </span>
                  <span
                    className="block font-condensed text-[11px] tracking-[0.14em] uppercase mt-0.5"
                    style={{ color: '#8A7560' }}
                  >
                    {review.date}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:gap-5"
            style={{ background: '#1C0F0A', color: '#F1E8D8' }}
          >
            <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>
              Voir les {reviewStats.total} avis sur Google
            </span>
            <span
              className="grid place-items-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:rotate-45"
              style={{ background: '#B58A4A' }}
            >
              <ArrowUpRight size={15} strokeWidth={2} style={{ color: '#1C0F0A' }} />
            </span>
          </a>
          <p className="font-condensed text-[11px] tracking-[0.18em] uppercase" style={{ color: '#9C8B7A' }}>
            Avis publiés et vérifiés par Google Maps
          </p>
        </motion.div>
      </div>
    </section>
  );
}
