import { Link } from 'react-router-dom';
import EDVILogo from './EDVILogo';
import { businessConfig } from '../data/businessConfig';
import { MapPin, Phone, Clock } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Prestations', to: '/prestations' },
  { label: 'Le salon', to: '/le-salon' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: '#090909', borderTop: '1px solid rgba(181,138,74,0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Col 1: Logo + tagline */}
          <div>
            <EDVILogo variant="full" size={36} />
            <p className="font-sans text-steel/60 text-sm mt-6 leading-relaxed max-w-xs">
              Le salon où l'on prend le temps de bien faire. Barbier et coiffeur homme à Clermont-Ferrand.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="font-condensed text-[11px] tracking-[0.3em] uppercase text-brass mb-6">
              Navigation
            </p>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-sans text-sm text-steel/70 hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Info */}
          <div>
            <p className="font-condensed text-[11px] tracking-[0.3em] uppercase text-brass mb-6">
              Infos pratiques
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brass mt-0.5 shrink-0" />
                <p className="font-sans text-sm text-steel/70">
                  {businessConfig.address.street}<br />
                  {businessConfig.address.postalCode} {businessConfig.address.city}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-brass shrink-0" />
                <a
                  href={businessConfig.phoneLink}
                  className="font-sans text-sm text-steel/70 hover:text-cream transition-colors"
                >
                  {businessConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={14} className="text-brass mt-0.5 shrink-0" />
                <div className="font-sans text-sm text-steel/70 space-y-0.5">
                  <p>Mar, Ven : 10h – 18h30</p>
                  <p>Jeu : 10h – 16h30</p>
                  <p>Sam : 10h – 14h00</p>
                  <p className="text-steel/40">Lun, Mer, Dim : Fermé</p>
                </div>
              </div>
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-condensed text-[11px] tracking-[0.2em] uppercase text-brass hover:text-cream transition-colors"
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(241,232,216,0.06)' }}
        >
          <p className="font-sans text-steel/40 text-xs">
            © {new Date().getFullYear()} ED-VI Hair Barber. Tous droits réservés. — Clermont-Ferrand, France
          </p>
          <div className="flex gap-6">
            <Link
              to="/mentions-legales"
              className="font-condensed text-[11px] tracking-wider uppercase text-steel/40 hover:text-steel/70 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="font-condensed text-[11px] tracking-wider uppercase text-steel/40 hover:text-steel/70 transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
