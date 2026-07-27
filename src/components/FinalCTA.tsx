import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: bgY }}
      >
        <img
          src="/ED-VI-Hair-Barber/images/photo_19.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(28,15,10,0.88) 0%, rgba(43,33,27,0.8) 50%, rgba(43,33,27,0.88) 100%)',
          }}
        />
      </motion.div>

      {/* Decorative circle (mirror reference) */}
      <div
        className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brass/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-brass/05 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          className="font-condensed text-[11px] tracking-[0.4em] uppercase text-brass mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Rendez-vous
        </motion.p>

        <motion.h2
          className="font-serif text-cream mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Votre prochain style commence ici.
        </motion.h2>

        <motion.p
          className="font-sans text-paper/70 text-base md:text-lg mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Appelez le salon ou envoyez votre demande de rendez-vous.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full font-condensed text-sm tracking-[0.2em] uppercase text-white hover:opacity-90 transition-all shadow-lg"
            style={{ background: '#B58A4A' }}
          >
            Demander un rendez-vous
          </Link>
          <a
            href={businessConfig.phoneLink}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-condensed text-sm tracking-[0.2em] uppercase transition-all hover:bg-cream/10"
            style={{ border: '2px solid #F1E8D8', color: '#F1E8D8' }}
          >
            <Phone size={14} />
            {businessConfig.phoneDisplay}
          </a>
        </motion.div>

        <motion.p
          className="font-condensed text-[11px] tracking-[0.3em] uppercase text-steel/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {businessConfig.address.street} • {businessConfig.address.city}
        </motion.p>
      </div>
    </section>
  );
}
