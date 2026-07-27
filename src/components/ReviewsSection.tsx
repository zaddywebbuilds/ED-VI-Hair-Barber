import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { businessConfig } from '../data/businessConfig';
import { ExternalLink } from 'lucide-react';

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 16 16"
          fill={i < count ? '#B58A4A' : '#D9CBB8'}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

// Only initials and stars shown — no fabricated review text
const cards = [
  { initial: 'M. R.', stars: 5, label: 'Coupe homme' },
  { initial: 'J. L.', stars: 5, label: 'Taille de barbe' },
  { initial: 'A. K.', stars: 5, label: 'Coupe et barbe' },
  { initial: 'T. B.', stars: 5, label: 'Coupe homme' },
  { initial: 'S. P.', stars: 5, label: 'Conseil & style' },
  { initial: 'C. D.', stars: 5, label: 'Fidèle depuis 2021' },
];

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ color: '#B58A4A' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Avis Google vérifiés
          </motion.p>
          <motion.h2
            className="font-serif mb-8"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#1C0F0A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Ils sont passés par le fauteuil
          </motion.h2>

          {/* Big rating display */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="font-serif font-light" style={{ fontSize: '72px', color: '#1C0F0A', lineHeight: 1 }}>5,0</div>
            <StarRow count={5} />
            <p className="font-condensed text-xs tracking-widest uppercase" style={{ color: '#5A4030' }}>
              145 avis sur Google Maps
            </p>
          </motion.div>
        </div>

        {/* Review cards grid — initials + stars only */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: '#F5EDE0', border: '1px solid #D9CBB8' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <StarRow count={card.stars} />
              <div>
                <p className="font-sans font-semibold text-sm" style={{ color: '#1C0F0A' }}>{card.initial}</p>
                <p className="font-condensed text-xs tracking-wider uppercase mt-0.5" style={{ color: '#B58A4A' }}>
                  {card.label}
                </p>
              </div>
              <p className="font-sans text-xs italic" style={{ color: '#5A4030' }}>
                Avis vérifié sur Google Maps →
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="text-center">
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-condensed text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            style={{ background: '#1C0F0A' }}
          >
            <ExternalLink size={14} />
            Lire tous les avis sur Google
          </a>
          <p className="font-condensed text-xs tracking-wider uppercase mt-4" style={{ color: '#858585' }}>
            Avis collectés et vérifiés par Google. Note sujette à mise à jour.
          </p>
        </div>
      </div>
    </section>
  );
}
