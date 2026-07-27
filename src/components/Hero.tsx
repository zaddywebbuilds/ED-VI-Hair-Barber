import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
};

const petals = [
  'COUPE HOMME',
  'BARBE',
  'CONSEIL',
  'PRÉCISION',
  'FINITIONS',
  'SUR RDV',
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{ background: '#F1E8D8' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16">

        {/* TOP ROW: Photo left | Service petals right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 items-start">

          {/* Left: hero photo in rounded card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="rounded-2xl shadow-2xl overflow-hidden aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
              <img
                src="/ED-VI-Hair-Barber/images/photo_01.jpg"
                alt="ED-VI Hair Barber — salon de coiffure homme à Clermont-Ferrand"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.95) contrast(1.05)' }}
              />
            </div>

            {/* Floating badge on the photo */}
            <motion.div
              className="absolute bottom-6 left-6 px-4 py-3 rounded-xl shadow-lg"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-condensed text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B58A4A' }}>
                Sur rendez-vous
              </p>
              <p className="font-sans text-sm font-medium mt-0.5" style={{ color: '#1C0F0A' }}>
                {businessConfig.address.street}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Service petal grid */}
          <div className="flex flex-col justify-start pt-4">
            <motion.p
              className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-6"
              style={{ color: '#B58A4A' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Barbier • Coiffeur Homme • Clermont-Ferrand
            </motion.p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {petals.map((petal, i) => (
                <motion.div
                  key={petal}
                  className="rounded-2xl px-5 py-4 flex items-center gap-3"
                  style={{ background: '#1C0F0A' }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <span style={{ color: '#B58A4A', fontSize: '6px' }}>●</span>
                  <span className="font-condensed text-[13px] tracking-[0.15em] uppercase" style={{ color: '#F1E8D8' }}>
                    {petal}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Phone */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href={businessConfig.phoneLink}
                className="font-condensed text-base tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: '#B58A4A' }}
              >
                {businessConfig.phoneDisplay}
              </a>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: Headline + CTA centered */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Divider line */}
          <motion.div
            className="h-px mb-10 mx-auto"
            style={{ background: 'rgba(28,15,10,0.15)', width: '120px' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-serif leading-tight"
              style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', color: '#1C0F0A' }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              Votre style ne se travaille pas
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.div
              className="font-serif italic text-shadow-brass"
              style={{ fontSize: 'clamp(44px, 6.5vw, 88px)', color: '#B58A4A' }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.62}
            >
              à la chaîne.
            </motion.div>
          </div>

          <motion.p
            className="font-sans text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#5A4030' }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.72}
          >
            Un salon calme au cœur de Clermont-Ferrand, pensé pour prendre le temps de comprendre votre style et soigner chaque finition.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.82}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3.5 rounded-full font-condensed text-sm tracking-[0.15em] uppercase text-white transition-all hover:opacity-90 shadow-lg"
              style={{ background: '#1C0F0A' }}
            >
              Demander un rendez-vous
            </Link>
            <Link
              to="/le-salon"
              className="inline-flex items-center px-8 py-3.5 rounded-full font-condensed text-sm tracking-[0.15em] uppercase transition-all hover:bg-[#1C0F0A] hover:text-white border-2"
              style={{ borderColor: '#1C0F0A', color: '#1C0F0A' }}
            >
              Découvrir le salon
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} style={{ color: '#B58A4A', opacity: 0.6 }} />
      </motion.div>
    </section>
  );
}
