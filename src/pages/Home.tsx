import { Helmet } from 'react-helmet-async';
import { businessConfig } from '../data/businessConfig';
import Hero from '../components/Hero';
import ManifestoSection from '../components/ManifestoSection';
import BenefitsSection from '../components/BenefitsSection';
import ServicesSection from '../components/ServicesSection';
import StyleConsultation from '../components/StyleConsultation';
import OwnerStory from '../components/OwnerStory';
import SalonGallery from '../components/SalonGallery';
import BookingConversation from '../components/BookingConversation';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import LocationSection from '../components/LocationSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "ED-VI Hair Barber",
  "description": "Barbier et coiffeur homme à Clermont-Ferrand. Coupe homme, entretien de barbe, styling.",
  "url": "https://zaddywebbuilds.github.io/ED-VI-Hair-Barber/",
  "telephone": "+33685480410",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Rue de la Treille",
    "addressLocality": "Clermont-Ferrand",
    "postalCode": "63000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.7764168,
    "longitude": 3.0862761
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "10:00", "closes": "18:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "10:00", "closes": "16:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "10:00", "closes": "18:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "14:00" }
  ],
  "priceRange": "€€",
  "image": "https://zaddywebbuilds.github.io/ED-VI-Hair-Barber/images/photo_01.jpg"
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{businessConfig.name} | Barbier et Coiffeur Homme à Clermont-Ferrand</title>
        <meta name="description" content="ED-VI Hair Barber — Barbier et coiffeur homme au 12 Rue de la Treille à Clermont-Ferrand. Coupe homme, entretien de barbe. Sur rendez-vous. 06 85 48 04 10." />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>
      <main>
        <Hero />
        <ManifestoSection />
        <BenefitsSection />
        <ServicesSection />
        <StyleConsultation />
        <OwnerStory />
        <SalonGallery />
        <BookingConversation />
        <ReviewsSection />
        <FAQSection />
        <LocationSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
