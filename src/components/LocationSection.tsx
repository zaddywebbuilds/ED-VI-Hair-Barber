import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isOpen, todayHours, dayName } = useOpenStatus();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('12 Rue de la Treille, 63000 Clermont-Ferrand').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="overflow-hidden" style={{ background: '#090909' }}>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Left: Info */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 py-16"
          style={{ background: '#161514' }}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-6">
            Trouver le salon
          </p>
          <h2 className="font-serif text-cream mb-8" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Au cœur de Clermont-Ferrand
          </h2>

          {/* Address */}
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={16} className="text-brass mt-0.5 shrink-0" />
            <div>
              <p className="font-sans text-cream text-sm">{businessConfig.name}</p>
              <p className="font-sans text-paper/60 text-sm">{businessConfig.address.street}</p>
              <p className="font-sans text-paper/60 text-sm">
                {businessConfig.address.postalCode} {businessConfig.address.city}
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 mt-2 font-condensed text-[10px] tracking-widest uppercase text-brass hover:text-cream transition-colors"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copié !' : 'Copier l\'adresse'}
              </button>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3 mb-6">
            <Clock size={16} className="text-brass mt-0.5 shrink-0" />
            <div className="space-y-1">
              {businessConfig.openingHours.map((h) => (
                <div key={h.day} className="flex gap-4">
                  <span className="font-condensed text-xs w-20 tracking-wider text-cream/70">{h.day}</span>
                  <span className="font-condensed text-xs tracking-wider text-paper/50">
                    {h.open && h.hours ? h.hours : 'Fermé'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Open status */}
          {dayName && (
            <div className="flex items-center gap-2 mb-8">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: isOpen ? '#4CAF50' : '#858585' }}
              />
              <span className="font-condensed text-xs tracking-wider uppercase text-steel">
                {isOpen ? `Ouvert aujourd'hui — ${todayHours}` : 'Fermé actuellement'}
              </span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-condensed text-sm tracking-wider uppercase text-cream border border-cream/20 px-5 py-3 hover:border-brass hover:text-brass transition-all w-fit"
            >
              <Navigation size={14} />
              Obtenir l'itinéraire
            </a>
            <a
              href={businessConfig.phoneLink}
              className="inline-flex items-center gap-2 font-condensed text-sm tracking-wider uppercase text-cream border border-cream/20 px-5 py-3 hover:border-brass hover:text-brass transition-all w-fit"
            >
              <Phone size={14} />
              Appeler le salon
            </a>
          </div>
        </motion.div>

        {/* Right: Map */}
        <motion.div
          className="min-h-[400px] lg:min-h-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.0!2d3.0862761!3d45.7764168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71b8a0eb632dd%3A0x6237a0a4da468ecc!2sED-VI%20Hair%20Barber!5e0!3m2!1sfr!2sfr!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.3) brightness(0.85)', minHeight: '400px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ED-VI Hair Barber sur Google Maps"
          />
        </motion.div>
      </div>
    </section>
  );
}
