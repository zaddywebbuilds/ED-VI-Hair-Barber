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
    <section className="overflow-hidden" style={{ background: '#FDF4E8' }}>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Left: Info */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 py-16"
          style={{ background: '#FDF4E8' }}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-6" style={{ color: '#B58A4A' }}>
            Trouver le salon
          </p>
          <h2 className="font-serif mb-8" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1C0F0A' }}>
            Au cœur de Clermont-Ferrand
          </h2>

          {/* Address */}
          <div className="flex items-start gap-3 mb-6">
            <MapPin size={16} style={{ color: '#B58A4A' }} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-sans text-sm" style={{ color: '#1C0F0A' }}>{businessConfig.name}</p>
              <p className="font-sans text-sm" style={{ color: '#5A4030' }}>{businessConfig.address.street}</p>
              <p className="font-sans text-sm" style={{ color: '#5A4030' }}>
                {businessConfig.address.postalCode} {businessConfig.address.city}
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 mt-2 font-condensed text-[10px] tracking-widest uppercase hover:opacity-70 transition-opacity"
                style={{ color: '#B58A4A' }}
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copié !' : "Copier l'adresse"}
              </button>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3 mb-6">
            <Clock size={16} style={{ color: '#B58A4A' }} className="mt-0.5 shrink-0" />
            <div className="space-y-1">
              {businessConfig.openingHours.map((h) => (
                <div key={h.day} className="flex gap-4">
                  <span className="font-condensed text-xs w-20 tracking-wider" style={{ color: '#5A4030' }}>{h.day}</span>
                  <span className="font-condensed text-xs tracking-wider" style={{ color: h.open ? '#1C0F0A' : '#858585' }}>
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
              <span className="font-condensed text-xs tracking-wider uppercase" style={{ color: '#5A4030' }}>
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
              className="inline-flex items-center gap-2 font-condensed text-sm tracking-wider uppercase text-white rounded-full px-5 py-3 transition-all hover:opacity-80 w-fit"
              style={{ background: '#1C0F0A' }}
            >
              <Navigation size={14} />
              Obtenir l'itinéraire
            </a>
            <a
              href={businessConfig.phoneLink}
              className="inline-flex items-center gap-2 font-condensed text-sm tracking-wider uppercase text-white rounded-full px-5 py-3 transition-all hover:opacity-80 w-fit"
              style={{ background: '#1C0F0A' }}
            >
              <Phone size={14} />
              Appeler le salon
            </a>
          </div>
        </motion.div>

        {/* Right: Map */}
        <motion.div
          className="min-h-[400px] lg:min-h-0 flex items-center p-4"
          style={{ background: '#FDF4E8' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2782.739194064054!2d3.0862761!3d45.7764168!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71b8a0eb632dd%3A0x6237a0a4da468ecc!2sED-VI%20Hair%20Barber!5e0!3m2!1sen!2sng!4v1785136811931!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="ED-VI Hair Barber — Google Maps"
            className="w-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
