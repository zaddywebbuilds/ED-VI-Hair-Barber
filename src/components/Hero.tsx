import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { businessConfig } from '../data/businessConfig';
import FloatingLabels from './FloatingLabels';

const BarberScene3D = lazy(() => import('./BarberScene3D'));

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: (delay = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.7, delay, ease: 'easeOut' } }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: '#090909' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(104,31,43,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left: Typography */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <motion.p
              className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Barbier • Coiffeur Homme • Clermont-Ferrand
            </motion.p>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-serif text-cream leading-none"
                style={{ fontSize: 'clamp(52px, 7vw, 92px)' }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
              >
                Votre style ne se
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.div
                className="font-serif text-cream leading-none"
                style={{ fontSize: 'clamp(52px, 7vw, 92px)' }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
              >
                travaille pas
              </motion.div>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.div
                className="font-serif italic text-brass leading-none text-shadow-brass"
                style={{ fontSize: 'clamp(52px, 7vw, 92px)' }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
              >
                à la chaîne.
              </motion.div>
            </div>

            {/* Body */}
            <motion.p
              className="font-sans text-paper text-base md:text-lg max-w-md mb-10 leading-relaxed"
              style={{ fontWeight: 400 }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              Un salon calme au cœur de Clermont-Ferrand, pensé pour prendre le temps de comprendre votre style et soigner chaque finition.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3.5 font-condensed text-sm tracking-[0.2em] uppercase text-cream transition-all hover:brightness-110"
                style={{ background: '#681F2B' }}
              >
                Demander un rendez-vous
              </Link>
              <Link
                to="/le-salon"
                className="inline-flex items-center px-7 py-3.5 font-condensed text-sm tracking-[0.2em] uppercase text-cream border transition-all hover:bg-cream/5"
                style={{ borderColor: 'rgba(241,232,216,0.25)' }}
              >
                Découvrir le salon
              </Link>
            </motion.div>

            {/* Info row */}
            <motion.div
              className="space-y-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
            >
              <p className="font-condensed text-[11px] tracking-[0.25em] uppercase text-steel">
                Sur rendez-vous • {businessConfig.address.street}
              </p>
              <a
                href={businessConfig.phoneLink}
                className="block font-condensed text-base tracking-wider text-brass hover:text-cream transition-colors"
              >
                {businessConfig.phoneDisplay}
              </a>
            </motion.div>

            {/* Pills */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.8}
            >
              {['Précision', 'Conseil', 'Finitions'].map((pill) => (
                <span
                  key={pill}
                  className="font-condensed text-[11px] tracking-widest uppercase text-steel border border-steel/30 px-3 py-1"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Image + 3D */}
          <motion.div
            className="relative h-[500px] lg:h-[700px] hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Burgundy glow behind */}
            <div
              className="absolute"
              style={{
                inset: '10%',
                background: 'radial-gradient(ellipse, rgba(104,31,43,0.35) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />

            {/* Hero image in irregular mask */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                zIndex: 1,
              }}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_01.jpg"
                alt="ED-VI Hair Barber — salon de coiffure homme à Clermont-Ferrand"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85) contrast(1.05)' }}
              />
              {/* Dark overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(9,9,9,0.3) 0%, transparent 50%, rgba(9,9,9,0.2) 100%)',
                }}
              />
            </div>

            {/* Floating labels */}
            <div className="absolute inset-0 z-10">
              <FloatingLabels />
            </div>

            {/* 3D scene overlay - subtle, right corner */}
            <div className="absolute bottom-0 right-0 w-48 h-48 z-20 opacity-0 lg:opacity-100">
              <Suspense fallback={null}>
                <BarberScene3D className="w-full h-full" />
              </Suspense>
            </div>
          </motion.div>

          {/* Mobile: simplified image */}
          <motion.div
            className="relative h-72 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="w-full h-full overflow-hidden"
              style={{ clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)' }}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_01.jpg"
                alt="ED-VI Hair Barber — Clermont-Ferrand"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.8)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} className="text-brass/60" />
      </motion.div>
    </section>
  );
}
