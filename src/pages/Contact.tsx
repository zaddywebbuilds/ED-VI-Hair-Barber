import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AppointmentForm from '../components/AppointmentForm';
import BookingConversation from '../components/BookingConversation';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import { businessConfig } from '../data/businessConfig';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — ED-VI Hair Barber | Rendez-vous à Clermont-Ferrand</title>
        <meta
          name="description"
          content="Prenez rendez-vous chez ED-VI Hair Barber à Clermont-Ferrand. Appelez le 06 85 48 04 10 ou envoyez votre demande par WhatsApp."
        />
      </Helmet>
      <main>
        {/* En-tête */}
        <section className="pt-32 pb-10 px-6 md:px-10" style={{ background: '#F4E5D0' }}>
          <div className="max-w-[1340px] mx-auto">
            <motion.p
              className="eyebrow mb-5"
              style={{ color: '#A8763C' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {businessConfig.name}
            </motion.p>
            <motion.h1
              className="display-lg"
              style={{ color: '#2A1F1A' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Contact
            </motion.h1>
          </div>
        </section>

        <BookingConversation />
        <AppointmentForm />
        <LocationSection />
        <Footer />
      </main>
    </>
  );
}
