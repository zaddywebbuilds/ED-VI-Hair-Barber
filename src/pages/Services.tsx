import { Helmet } from 'react-helmet-async';
import ServicesSection from '../components/ServicesSection';
import StyleConsultation from '../components/StyleConsultation';
import AppointmentForm from '../components/AppointmentForm';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Prestations — ED-VI Hair Barber | Coupe Homme, Barbe — Clermont-Ferrand</title>
        <meta name="description" content="Coupe homme, taille de barbe et coupe complète chez ED-VI Hair Barber à Clermont-Ferrand. Sur rendez-vous. 12 Rue de la Treille." />
      </Helmet>
      <main>
        {/* Page header */}
        <section
          className="pt-32 pb-16 px-6"
          style={{ background: '#090909' }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ED-VI Hair Barber
            </motion.p>
            <motion.h1
              className="font-serif text-cream"
              style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Nos prestations
            </motion.h1>
          </div>
        </section>

        <ServicesSection />
        <StyleConsultation />
        <AppointmentForm />
        <Footer />
      </main>
    </>
  );
}
