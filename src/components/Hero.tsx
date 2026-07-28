import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const { isOpen, todayHours } = useOpenStatus();

  return (
    <section className="relative overflow-hidden" style={{ background: '#F4E5D0' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Colonne texte ── */}
          <div className="order-2 lg:order-1">
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-8"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.05}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full pl-3 pr-4 py-1.5"
                style={{ background: '#FFFFFF', boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isOpen ? '#5BBE72' : '#B9A794' }}
                />
                <span className="eyebrow" style={{ color: '#5C4A3F', letterSpacing: '0.18em' }}>
                  {isOpen && todayHours ? `Ouvert · ${todayHours}` : 'Sur rendez-vous'}
                </span>
              </span>

              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ background: '#FFFFFF', boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 16 16" fill="#C9A961">
                      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
                    </svg>
                  ))}
                </span>
                <span className="eyebrow" style={{ color: '#5C4A3F', letterSpacing: '0.18em' }}>
                  5,0 · 145 avis
                </span>
              </span>
            </motion.div>

            <motion.p
              className="eyebrow mb-5"
              style={{ color: '#A8763C' }}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.12}
            >
              Barbier · Coiffeur homme · Clermont-Ferrand
            </motion.p>

            <motion.h1
              className="display-lg mb-7 text-balance"
              style={{ color: '#2A1F1A' }}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.18}
            >
              Votre style ne se travaille pas{' '}
              <span className="italic" style={{ color: '#A8763C' }}>à la chaîne.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg leading-relaxed mb-9 max-w-lg"
              style={{ color: '#5C4A3F' }}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.26}
            >
              Un salon calme au cœur de Clermont-Ferrand. Un client à la fois, le temps
              de comprendre votre style et de soigner chaque finition.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.34}
            >
              <Link
                to="/contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full transition-all duration-300 hover:gap-5"
                style={{ background: '#2A1F1A', color: '#FDF4E8', boxShadow: '0 12px 32px rgba(120,70,50,0.22)' }}
              >
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>Prendre rendez-vous</span>
                <span
                  className="grid place-items-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:rotate-[-45deg]"
                  style={{ background: '#C9A961' }}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#2A1F1A" strokeWidth="1.7">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>

              <a
                href={businessConfig.phoneLink}
                data-cursor="hover"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full transition-all duration-300"
                style={{ background: '#FFFFFF', color: '#2A1F1A', boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
              >
                <Phone size={14} strokeWidth={1.9} style={{ color: '#A8763C' }} />
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>
                  {businessConfig.phoneDisplay}
                </span>
              </a>
            </motion.div>

            <motion.p
              className="eyebrow mt-9"
              style={{ color: '#8A7560', letterSpacing: '0.22em' }}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0.42}
            >
              {businessConfig.address.street} — {businessConfig.address.postalCode} {businessConfig.address.city}
            </motion.p>
          </div>

          {/* ── Colonne images ── */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Grande image */}
              <motion.figure
                className="col-span-2 overflow-hidden group"
                style={{ borderRadius: 32, boxShadow: '0 30px 80px rgba(180,110,80,0.28)' }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/ED-VI-Hair-Barber/images/photo_01.jpg"
                  alt="La salle de coupe du salon ED-VI Hair Barber à Clermont-Ferrand"
                  className="w-full h-auto img-zoom"
                />
              </motion.figure>

              {/* Deux vignettes */}
              <motion.figure
                className="overflow-hidden group"
                style={{ borderRadius: 22, boxShadow: '0 12px 36px rgba(160,100,70,0.18)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/ED-VI-Hair-Barber/images/photo_02.jpg"
                  alt="Poste de coiffage et miroir du salon"
                  className="w-full h-auto img-zoom"
                />
              </motion.figure>

              <motion.figure
                className="overflow-hidden group"
                style={{ borderRadius: 22, boxShadow: '0 12px 36px rgba(160,100,70,0.18)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/ED-VI-Hair-Barber/images/photo_03.jpg"
                  alt="Détail du matériel de barbier"
                  className="w-full h-auto img-zoom"
                />
              </motion.figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
