import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const lines = [
  { text: 'Un fauteuil.', italic: false },
  { text: 'Un client.', italic: false },
  { text: 'Le temps de bien faire.', italic: true },
];

function ManifestoLine({ text, italic, delay }: { text: string; italic: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={`font-serif text-cream leading-tight ${italic ? 'italic' : ''}`}
        style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
        initial={{ y: 80, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function ManifestoSection() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' });

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: '#090909' }}
    >
      {/* Background decoration photos */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/ED-VI-Hair-Barber/images/photo_08.jpg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 h-80 object-cover opacity-[0.06]"
        />
        <img
          src="/ED-VI-Hair-Barber/images/photo_13.jpg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 h-64 object-cover opacity-[0.06]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Main content */}
          <div>
            {/* Thin brass line */}
            <div className="w-12 h-px bg-brass mb-12" />

            <div className="space-y-2 mb-16">
              {lines.map((line, i) => (
                <ManifestoLine key={line.text} text={line.text} italic={line.italic} delay={i * 0.15} />
              ))}
            </div>

            {/* Body text */}
            <motion.p
              ref={bodyRef}
              className="font-sans text-paper text-base md:text-lg max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chez ED-VI, le rendez-vous n'est pas une course contre la montre. La coupe, la barbe et les finitions sont travaillées en fonction de votre visage, de votre style et de ce que vous porterez réellement au quotidien.
            </motion.p>
          </div>

          {/* Vertical text */}
          <div className="hidden lg:flex items-start justify-end pt-4">
            <span
              className="font-condensed text-steel/40 text-base tracking-[0.4em] uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              PAS UNE USINE À COUPES
            </span>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center gap-6">
          <div className="h-px bg-brass/30 flex-1" />
          <span className="font-condensed text-[11px] tracking-[0.3em] uppercase text-brass/60">
            Clermont-Ferrand
          </span>
          <div className="h-px bg-brass/30 flex-1" />
        </div>
      </div>
    </section>
  );
}
