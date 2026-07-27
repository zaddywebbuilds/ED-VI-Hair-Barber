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
      className="group relative overflow-hidden flex flex-col"
      style={{ background: '#2B211B' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Image */}
      <div className={`overflow-hidden ${featured ? 'aspect-video' : 'aspect-video'}`}>
        <img
          src={service.image}
          alt={`ED-VI Hair Barber — ${service.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 to-transparent pointer-events-none" />
      </div>

      {/* Hover brass border */}
      <div
        className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderColor: '#B58A4A' }}
      />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-serif text-cream mb-3 ${featured ? 'text-4xl' : 'text-2xl'}`}>
          {service.name}
        </h3>
        <p className="font-sans text-paper/70 text-sm leading-relaxed flex-1 mb-4">
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream/10">
          <span className="font-condensed text-[11px] tracking-widest uppercase text-steel">
            Prix à confirmer
          </span>
          <Link
            to="/contact"
            className="font-condensed text-[12px] tracking-wider uppercase text-brass hover:text-cream transition-colors"
          >
            Rendez-vous →
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
    <section className="py-24 md:py-32" style={{ background: '#161514' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Prestations
          </motion.p>
          <motion.h2
            className="font-serif text-cream mb-4"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ce que l'on travaille ici
          </motion.h2>
          <motion.p
            className="font-sans text-paper/60 text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des prestations simples, réalisées avec attention et adaptées à votre style.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featured && (
            <div className="lg:col-span-2">
              <ServiceCard service={featured} featured />
            </div>
          )}
          <div className="flex flex-col gap-4">
            {others.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/prestations"
            className="inline-flex items-center gap-2 font-condensed text-sm tracking-[0.2em] uppercase text-cream border border-cream/20 px-8 py-4 hover:border-brass hover:text-brass transition-all"
          >
            Voir toutes les prestations
          </Link>
        </div>
      </div>
    </section>
  );
}
