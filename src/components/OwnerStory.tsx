import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { businessConfig } from '../data/businessConfig';

export default function OwnerStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden" style={{ background: '#161514' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Left: Photo */}
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
          <img
            src="/ED-VI-Hair-Barber/images/photo_07.jpg"
            alt="ED-VI Hair Barber — intérieur du salon"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.25) brightness(0.75) contrast(1.1)' }}
            loading="lazy"
          />
          {/* Vintage frame overlay */}
          <div
            className="absolute inset-4 border pointer-events-none"
            style={{ borderColor: 'rgba(181,138,74,0.2)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent 60%, #161514 100%)' }}
          />
        </div>

        {/* Right: Text */}
        <motion.div
          ref={ref}
          className="flex flex-col justify-center px-8 md:px-16 py-16"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-6">
            Le salon
          </p>

          <h2 className="font-serif text-cream mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Derrière le fauteuil
          </h2>

          <div className="w-8 h-px bg-brass mb-8" />

          <div className="space-y-5 font-sans text-paper/70 text-base leading-relaxed">
            <p>Un artisan du quartier, pas un prestataire de service.</p>
            <p>
              ED-VI Hair Barber a été créé pour exercer autrement : sans pression, sans travail à la chaîne
              et avec le temps nécessaire pour s'occuper de chaque client.
            </p>
            {businessConfig.historicalDetails.oneClientAtATime && (
              <p>
                Un seul client à la fois. Chaque rendez-vous est dédié entièrement à vous.
              </p>
            )}
          </div>

          {/* Quote */}
          <blockquote
            className="mt-8 border-l-2 pl-6 font-serif italic text-cream/80"
            style={{ borderColor: '#B58A4A', fontSize: '1.25rem' }}
          >
            "Chaque visage est différent. Chaque coupe doit l'être aussi."
          </blockquote>

          <div className="mt-10">
            <a
              href="#/le-salon"
              className="font-condensed text-[12px] tracking-[0.2em] uppercase text-brass hover:text-cream transition-colors"
            >
              Découvrir le salon →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
