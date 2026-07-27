import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <>
      <Helmet>
        <title>Mentions légales — ED-VI Hair Barber</title>
      </Helmet>
      <main style={{ background: '#090909', minHeight: '100vh' }}>
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <h1 className="font-serif text-cream text-4xl mb-12">Mentions légales</h1>

          <div className="space-y-10 font-sans text-paper/70 text-sm leading-relaxed">
            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Éditeur du site</h2>
              <p>ED-VI Hair Barber<br />
              12 Rue de la Treille<br />
              63000 Clermont-Ferrand, France<br />
              Téléphone : 06 85 48 04 10</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Hébergement</h2>
              <p>Ce site est hébergé par GitHub Pages<br />
              GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Propriété intellectuelle</h2>
              <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive d'ED-VI Hair Barber. Toute reproduction, distribution ou utilisation est interdite sans autorisation préalable écrite.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Responsabilité</h2>
              <p>ED-VI Hair Barber s'efforce d'assurer l'exactitude des informations publiées sur ce site. Les horaires, tarifs et disponibilités peuvent être modifiés sans préavis. Pour toute information à jour, contactez directement le salon.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Cookies</h2>
              <p>Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie de traçage ou de publicité n'est utilisé sans votre consentement explicite.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Droit applicable</h2>
              <p>Ce site est soumis au droit français. Tout litige relatif à son utilisation sera soumis à la compétence des tribunaux de Clermont-Ferrand.</p>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
