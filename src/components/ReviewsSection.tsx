import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { businessConfig } from '../data/businessConfig';

function StarRow() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#B58A4A" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

const reviewCards = [
  { initial: 'M.' },
  { initial: 'J.' },
  { initial: 'A.' },
];

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32" style={{ background: '#F1E8D8' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div ref={ref}>
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase text-copper mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Avis clients
          </motion.p>
          <motion.h2
            className="font-serif text-walnut mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Ils sont passés par le fauteuil
          </motion.h2>

          {/* Stars + rating */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <StarRow />
            <span className="font-condensed text-walnut text-lg tracking-wider">5,0</span>
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed text-sm tracking-wider text-copper hover:text-walnut transition-colors"
            >
              sur Google
            </a>
          </motion.div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {reviewCards.map((card, i) => (
              <motion.div
                key={i}
                className="p-6 border"
                style={{
                  background: '#EDE4D4',
                  borderColor: 'rgba(43,33,27,0.12)',
                  borderRadius: 0,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <StarRow />
                <div className="mt-4 mb-3">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full font-condensed text-sm font-bold text-cream"
                    style={{ background: '#2B211B' }}
                  >
                    {card.initial}
                  </span>
                </div>
                <p className="font-condensed text-[10px] tracking-widest uppercase text-steel/60">
                  Avis Google vérifié
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-condensed text-sm tracking-[0.2em] uppercase text-cream transition-all hover:brightness-110"
              style={{ background: '#2B211B' }}
            >
              {/* Google icon inline */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9 8.16c0-.5-.04-1-.12-1.5H8v2.83h3.87c-.17.9-.67 1.65-1.4 2.15v1.8h2.27c1.32-1.22 2.16-3.02 2.16-5.28z" fill="#4285F4"/>
                <path d="M8 15c1.94 0 3.56-.64 4.74-1.74l-2.27-1.8c-.64.43-1.46.68-2.47.68-1.9 0-3.5-1.28-4.07-3H1.57v1.85C2.74 13.35 5.18 15 8 15z" fill="#34A853"/>
                <path d="M3.93 9.14c-.15-.43-.23-.88-.23-1.35s.09-.93.23-1.35V4.59H1.57A7.04 7.04 0 0 0 1 7.79c0 1.14.27 2.22.57 3.2l2.36-1.85z" fill="#FBBC04"/>
                <path d="M8 3.58c1.07 0 2.03.37 2.79 1.1l2.09-2.09C11.56.84 9.94.14 8 .14A7 7 0 0 0 1.57 4.6l2.36 1.84C4.5 4.86 6.1 3.58 8 3.58z" fill="#EA4335"/>
              </svg>
              Lire tous les avis sur Google
            </a>
            <p className="mt-4 font-sans text-steel/50 text-xs">
              Avis collectés et vérifiés par Google. Note basée sur les avis de clients réels.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
