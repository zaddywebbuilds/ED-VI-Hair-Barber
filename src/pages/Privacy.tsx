import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité — ED-VI Hair Barber</title>
      </Helmet>
      <main style={{ background: '#090909', minHeight: '100vh' }}>
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <h1 className="font-serif text-cream text-4xl mb-12">Politique de confidentialité</h1>

          <div className="space-y-10 font-sans text-paper/70 text-sm leading-relaxed">
            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Responsable du traitement</h2>
              <p>ED-VI Hair Barber — 12 Rue de la Treille, 63000 Clermont-Ferrand<br />
              Contact : 06 85 48 04 10</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Données collectées</h2>
              <p>Dans le cadre du formulaire de demande de rendez-vous, les données suivantes peuvent être collectées :</p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-paper/60">
                <li>Nom</li>
                <li>Numéro de téléphone</li>
                <li>Adresse email (optionnel)</li>
                <li>Prestation souhaitée</li>
                <li>Jour et créneau préféré</li>
                <li>Message libre (optionnel)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Finalité du traitement</h2>
              <p>Ces données sont collectées uniquement dans le but de vous recontacter afin de confirmer votre demande de rendez-vous. Elles ne sont utilisées à aucune autre fin (ni prospection, ni transmission à des tiers, ni analyse marketing).</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Durée de conservation</h2>
              <p>Vos données sont conservées jusqu'au traitement de votre demande de rendez-vous. Elles ne sont pas archivées au-delà du temps nécessaire à la confirmation du créneau.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Transmission des données</h2>
              <p>Le formulaire de contact utilise le service Formspree (formspree.io) pour la transmission des messages. Formspree agit en qualité de sous-traitant. Aucune autre transmission à des tiers n'est réalisée.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Vos droits (RGPD)</h2>
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-paper/60">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p className="mt-4">Pour exercer ces droits, contactez directement le salon par téléphone au 06 85 48 04 10.</p>
            </section>

            <section>
              <h2 className="font-condensed text-brass tracking-widest uppercase text-xs mb-4">Hébergement et sécurité</h2>
              <p>Ce site est hébergé sur GitHub Pages. Les données du formulaire sont transmises via HTTPS (protocole sécurisé).</p>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
