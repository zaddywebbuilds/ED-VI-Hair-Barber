import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { businessConfig } from '../data/businessConfig';
import { reviewStats } from '../data/reviewsData';

// Compteur animé (s'arrête net si « animations réduites » est activé)
function CountUp({ to, decimals = 0, start }: { to: number; decimals?: number; start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    const duration = 1400;
    const t0 = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(to * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, to]);

  return <>{value.toFixed(decimals).replace('.', ',')}</>;
}

const openDays = businessConfig.openingHours.filter((d) => d.open).length;

const stats = [
  { value: 5, decimals: 1, suffix: '', label: 'Note moyenne Google' },
  { value: reviewStats.total, decimals: 0, suffix: '', label: 'Avis clients vérifiés' },
  { value: openDays, decimals: 0, suffix: ' jours', label: "D'ouverture par semaine" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden grain" style={{ background: '#2B211B' }}>
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-left md:px-8 md:first:pl-0 md:last:pr-0"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(241,232,216,0.13)' : undefined,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="font-serif font-light leading-none mb-3"
                style={{ fontSize: 'clamp(48px, 6vw, 84px)', color: '#F1E8D8' }}
              >
                <CountUp to={stat.value} decimals={stat.decimals} start={inView} />
                <span style={{ color: '#B58A4A' }}>{stat.suffix}</span>
              </div>
              <p className="eyebrow" style={{ color: 'rgba(241,232,216,0.55)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Attribution honnête de la source */}
        <motion.p
          className="font-condensed text-[11px] tracking-[0.18em] uppercase mt-14 text-center md:text-left"
          style={{ color: 'rgba(241,232,216,0.32)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Chiffres issus de la fiche Google du salon — {businessConfig.address.city}
        </motion.p>
      </div>
    </section>
  );
}
