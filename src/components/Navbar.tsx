import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import EDVILogo from './EDVILogo';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Prestations', to: '/prestations' },
  { label: 'Le salon', to: '/le-salon' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useLocation(); // re-render à chaque changement de route

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Le site est clair de bout en bout : le texte reste sombre.
  const fg = '#2A1F1A';
  const fgMuted = '#5C4A3F';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? 'rgba(253,244,232,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(14px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(201,169,97,0.22)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 8px 24px rgba(120,70,50,0.07)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link to="/" data-cursor="hover" className="flex items-center gap-2.5 shrink-0">
            <EDVILogo variant="monogram" size={34} color={fg} />
            <span
              className="font-condensed text-[11px] tracking-[0.3em] uppercase hidden sm:block transition-colors duration-500"
              style={{ color: fgMuted }}
            >
              HAIR BARBER
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                data-cursor="hover"
                className={({ isActive }) =>
                  `nav-link font-condensed text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    isActive ? 'active' : ''
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? '#A8763C' : fg })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              data-cursor="hover"
              className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full font-condensed text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
              style={{
                background: '#2A1F1A',
                color: '#FDF4E8',
                boxShadow: '0 8px 22px rgba(120,70,50,0.18)',
              }}
            >
              Rendez-vous
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-1 hover:opacity-70 transition-opacity"
              style={{ color: fg }}
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
