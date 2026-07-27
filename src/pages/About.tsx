import { Helmet } from 'react-helmet-async';
import OwnerStory from '../components/OwnerStory';
import SalonGallery from '../components/SalonGallery';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Le Salon — ED-VI Hair Barber | Barbier à Clermont-Ferrand</title>
        <meta name="description" content="Découvrez ED-VI Hair Barber, un salon de barbier et de coiffure homme au cœur de Clermont-Ferrand. Un seul client à la fois, le temps de bien faire." />
      </Helmet>
      <main>
        {/* Page header */}
        <section
          className="pt-32 pb-16 px-6"
          style={{ background: '#161514' }}
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
              Le salon
            </motion.h1>
          </div>
        </section>

        <OwnerStory />
        <SalonGallery />
        <LocationSection />
        <Footer />
      </main>
    </>
  );
}
