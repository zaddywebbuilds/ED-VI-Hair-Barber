import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';

export default function FinalCTA() {
  const { isOpen, todayHours } = useOpenStatus();

  return (
    <section className="py-14 md:py-20" style={{ background: '#FDF4E8' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Images ── */}
          <motion.div
            className="grid grid-cols-2 gap-4 order-2 lg:order-1"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <figure
              className="overflow-hidden group"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.24)' }}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_19.jpg"
                alt="Fauteuil de barbier prêt pour le prochain rendez-vous"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </figure>
            <figure
              className="overflow-hidden group mt-8"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.24)' }}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_20.jpg"
                alt="Ambiance du salon ED-VI Hair Barber"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </figure>
          </motion.div>

          {/* ── Texte ── */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-5" style={{ color: '#A8763C' }}>
              Rendez-vous
            </p>

            <h2 className="display-md mb-6 text-balance" style={{ color: '#2A1F1A' }}>
              Votre prochain style{' '}
              <span className="italic" style={{ color: '#A8763C' }}>commence ici.</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-md" style={{ color: '#5C4A3F' }}>
              Appelez le salon ou envoyez votre demande de rendez-vous. Chaque créneau est
              réservé à un seul client.
            </p>

            {/* Statut + adresse sur fond blanc */}
            <div
              className="rounded-2xl p-5 mb-8 max-w-md"
              style={{ background: '#FFFFFF', boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: isOpen ? '#5BBE72' : '#B9A794' }}
                />
                <span className="eyebrow" style={{ color: '#5C4A3F', letterSpacing: '0.16em' }}>
                  {isOpen && todayHours ? `Ouvert aujourd'hui · ${todayHours}` : 'Fermé actuellement'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} strokeWidth={1.8} style={{ color: '#A8763C' }} className="mt-0.5 shrink-0" />
                <p className="font-sans text-sm" style={{ color: '#5C4A3F' }}>
                  {businessConfig.address.street}, {businessConfig.address.postalCode}{' '}
                  {businessConfig.address.city}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full transition-all duration-300 hover:gap-5"
                style={{ background: '#2A1F1A', color: '#FDF4E8', boxShadow: '0 12px 32px rgba(120,70,50,0.22)' }}
              >
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>Demander un rendez-vous</span>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
