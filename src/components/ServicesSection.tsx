import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/servicesData';

function ServiceCard({ service, featured }: { service: typeof services[number]; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.015, boxShadow: '0 12px 40px rgba(28,15,10,0.12)' }}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={`ED-VI Hair Barber — ${service.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className={`font-serif mb-3 ${featured ? 'text-4xl' : 'text-2xl'}`}
          style={{ color: '#1C0F0A' }}
        >
          {service.name}
        </h3>
        <p className="font-sans text-sm leading-relaxed flex-1 mb-6" style={{ color: '#5A4030' }}>
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(28,15,10,0.08)' }}>
          <span className="font-condensed text-[11px] tracking-widest uppercase" style={{ color: '#B58A4A' }}>
            Prix à confirmer
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2 rounded-full font-condensed text-[12px] tracking-wider uppercase text-white transition-all hover:opacity-80"
            style={{ background: '#1C0F0A' }}
          >
            Rendez-vous
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });
  const featured = services.find((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <section className="py-24 md:py-32" style={{ background: '#F5EDE0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ color: '#B58A4A' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Prestations
          </motion.p>
          <motion.h2
            className="font-serif mb-4"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#1C0F0A' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ce que l'on travaille ici
          </motion.h2>
          <motion.p
            className="font-sans text-lg max-w-xl"
            style={{ color: '#5A4030' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des prestations simples, réalisées avec attention et adaptées à votre style.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured && (
            <div className="lg:col-span-2">
              <ServiceCard service={featured} featured />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {others.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/prestations"
            className="inline-flex items-center gap-2 font-condensed text-sm tracking-[0.2em] uppercase text-white px-8 py-4 rounded-full transition-all hover:opacity-80"
            style={{ background: '#1C0F0A' }}
          >
            Voir toutes les prestations
          </Link>
        </div>
      </div>
    </section>
  );
}
