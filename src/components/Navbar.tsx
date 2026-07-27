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
  const { pathname } = useLocation();

  // Seule la page d'accueil ouvre sur un hero sombre plein écran.
  const overHero = pathname === '/' && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inversion du contraste selon le fond survolé
  const fg = overHero ? '#F1E8D8' : '#1C0F0A';
  const fgMuted = overHero ? 'rgba(241,232,216,0.66)' : '#5A4030';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: overHero ? 'transparent' : 'rgba(241,232,216,0.90)',
          backdropFilter: overHero ? 'none' : 'blur(14px)',
          borderBottom: overHero ? '1px solid transparent' : '1px solid rgba(181,138,74,0.18)',
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
                style={({ isActive }) => ({ color: isActive ? '#B58A4A' : fg })}
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
              style={
                overHero
                  ? { background: 'rgba(241,232,216,0.12)', color: '#F1E8D8', border: '1px solid rgba(241,232,216,0.28)', backdropFilter: 'blur(10px)' }
                  : { background: '#1C0F0A', color: '#F1E8D8', border: '1px solid #1C0F0A' }
              }
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
