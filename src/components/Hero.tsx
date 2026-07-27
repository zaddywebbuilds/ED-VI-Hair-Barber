import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, ArrowDown } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';

const rise = {
  hidden: { y: '110%' },
  show: (d = 0) => ({
    y: '0%',
    transition: { duration: 1.05, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const { isOpen, todayHours } = useOpenStatus();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden grain flex flex-col">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ED-VI-Hair-Barber/images/photo_03.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover ken-burns"
        />
        {/* Scrims: vertical depth + left-side legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,12,8,0.72) 0%, rgba(18,12,8,0.34) 35%, rgba(18,12,8,0.62) 72%, rgba(18,12,8,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(18,12,8,0.80) 0%, rgba(18,12,8,0.30) 46%, rgba(18,12,8,0) 72%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-28 pb-12">

        {/* Live status + rating */}
        <motion.div
          className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-9"
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0.15}
        >
          <div
            className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-1.5"
            style={{
              background: 'rgba(241,232,216,0.10)',
              border: '1px solid rgba(241,232,216,0.20)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              {isOpen && (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-70"
                  style={{ background: '#5BBE72', animation: 'hero-ping 2s cubic-bezier(0,0,0.2,1) infinite' }}
                />
              )}
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: isOpen ? '#5BBE72' : '#9C8B7A' }}
              />
            </span>
            <span className="eyebrow" style={{ color: '#F1E8D8', letterSpacing: '0.22em' }}>
              {isOpen ? `Ouvert · ${todayHours}` : 'Sur rendez-vous'}
            </span>
          </div>

          <div className="inline-flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill="#D4AF6F">
                  <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
                </svg>
              ))}
            </div>
            <span className="eyebrow" style={{ color: 'rgba(241,232,216,0.72)', letterSpacing: '0.2em' }}>
              5,0 — 145 avis Google
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[15ch] mb-8">
          <span className="mask-line">
            <motion.span
              className="display-xl block"
              style={{ color: '#F1E8D8' }}
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.2}
            >
              Votre style
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              className="display-xl block"
              style={{ color: '#F1E8D8' }}
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.32}
            >
              ne se travaille
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              className="display-xl italic block"
              style={{ color: '#D4AF6F' }}
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.44}
            >
              pas à la chaîne.
            </motion.span>
          </span>
        </h1>

        {/* Sub + rule */}
        <motion.div
          className="flex items-start gap-6 max-w-2xl mb-11"
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0.7}
        >
          <span className="hidden md:block mt-3 h-px w-16 shrink-0" style={{ background: '#B58A4A' }} />
          <p
            className="text-base md:text-lg leading-relaxed text-balance"
            style={{ color: 'rgba(241,232,216,0.80)' }}
          >
            Un salon calme au cœur de Clermont-Ferrand. Un client à la fois, le temps
            de comprendre votre style et de soigner chaque finition.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-3"
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0.82}
        >
          <Link
            to="/contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full transition-all duration-300 hover:gap-5"
            style={{ background: '#F1E8D8', color: '#1C0F0A' }}
          >
            <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>Prendre rendez-vous</span>
            <span
              className="grid place-items-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:rotate-[-45deg]"
              style={{ background: '#1C0F0A' }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#F1E8D8" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <a
            href={businessConfig.phoneLink}
            data-cursor="hover"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full transition-colors duration-300"
            style={{
              border: '1px solid rgba(241,232,216,0.28)',
              color: '#F1E8D8',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#B58A4A')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(241,232,216,0.28)')}
          >
            <Phone size={14} strokeWidth={1.8} />
            <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>
              {businessConfig.phoneDisplay}
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-8"
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(241,232,216,0.14)' }}
        >
          <div className="flex items-center gap-2.5">
            <ArrowDown size={13} style={{ color: '#B58A4A' }} className="animate-bounce" />
            <span className="eyebrow" style={{ color: 'rgba(241,232,216,0.55)', letterSpacing: '0.24em' }}>
              Découvrir le salon
            </span>
          </div>
          <span className="eyebrow" style={{ color: 'rgba(241,232,216,0.55)', letterSpacing: '0.24em' }}>
            {businessConfig.address.street} — {businessConfig.address.city}
          </span>
        </div>
      </motion.div>

      <style>{`
        @keyframes hero-ping {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
