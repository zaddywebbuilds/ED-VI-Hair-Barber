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
      style={{ background: '#1C0F0A', borderTop: '1px solid rgba(181,138,74,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Col 1: Logo + tagline */}
          <div>
            <EDVILogo variant="full" size={36} color="#D9CBB8" />
            <p className="font-sans text-sm mt-6 leading-relaxed max-w-xs" style={{ color: 'rgba(217,203,184,0.6)' }}>
              Le salon où l'on prend le temps de bien faire. Barbier et coiffeur homme à Clermont-Ferrand.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="font-condensed text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: '#B58A4A' }}>
              Navigation
            </p>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-sans text-sm transition-colors hover:opacity-100"
                  style={{ color: 'rgba(217,203,184,0.6)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Info */}
          <div>
            <p className="font-condensed text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: '#B58A4A' }}>
              Infos pratiques
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} style={{ color: '#B58A4A' }} className="mt-0.5 shrink-0" />
                <p className="font-sans text-sm" style={{ color: 'rgba(217,203,184,0.6)' }}>
                  {businessConfig.address.street}<br />
                  {businessConfig.address.postalCode} {businessConfig.address.city}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} style={{ color: '#B58A4A' }} className="shrink-0" />
                <a
                  href={businessConfig.phoneLink}
                  className="font-sans text-sm transition-colors hover:opacity-100"
                  style={{ color: 'rgba(217,203,184,0.6)' }}
                >
                  {businessConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={14} style={{ color: '#B58A4A' }} className="mt-0.5 shrink-0" />
                <div className="font-sans text-sm space-y-0.5" style={{ color: 'rgba(217,203,184,0.6)' }}>
                  <p>Mar, Ven : 10h – 18h30</p>
                  <p>Jeu : 10h – 16h30</p>
                  <p>Sam : 10h – 14h00</p>
                  <p style={{ opacity: 0.4 }}>Lun, Mer, Dim : Fermé</p>
                </div>
              </div>
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-condensed text-[11px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
                style={{ color: '#B58A4A' }}
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(217,203,184,0.1)' }}
        >
          <p className="font-sans text-xs" style={{ color: 'rgba(217,203,184,0.3)' }}>
            © {new Date().getFullYear()} ED-VI Hair Barber. Tous droits réservés. — Clermont-Ferrand, France
          </p>
          <div className="flex gap-6">
            <Link
              to="/mentions-legales"
              className="font-condensed text-[11px] tracking-wider uppercase hover:opacity-70 transition-opacity" style={{ color: 'rgba(217,203,184,0.3)' }}
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="font-condensed text-[11px] tracking-wider uppercase hover:opacity-70 transition-opacity" style={{ color: 'rgba(217,203,184,0.3)' }}
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
