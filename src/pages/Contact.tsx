import { Helmet } from 'react-helmet-async';
import AppointmentForm from '../components/AppointmentForm';
import BookingConversation from '../components/BookingConversation';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — ED-VI Hair Barber | Rendez-vous à Clermont-Ferrand</title>
        <meta name="description" content="Prenez rendez-vous chez ED-VI Hair Barber à Clermont-Ferrand. Appelez le 06 85 48 04 10 ou envoyez votre demande en ligne." />
      </Helmet>
      <main style={{ background: '#090909' }}>
        {/* Header */}
        <section className="pt-32 pb-8 px-6" style={{ background: '#090909' }}>
          <div className="max-w-2xl mx-auto">
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
              Contact
            </motion.h1>
          </div>
        </section>

        <AppointmentForm />
        <BookingConversation />
        <LocationSection />
        <Footer />
      </main>
    </>
  );
}
