import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(241,232,216,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(181,138,74,0.2)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <EDVILogo variant="monogram" size={36} color="#1C0F0A" />
            <span className="font-condensed text-xs tracking-[0.3em] uppercase hidden sm:block" style={{ color: '#5A4030' }}>
              HAIR BARBER
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link font-condensed text-[13px] tracking-[0.15em] uppercase transition-colors ${
                    isActive ? 'text-brass active' : 'hover:text-brass'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? '#B58A4A' : '#1C0F0A' })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full font-condensed text-[12px] tracking-[0.2em] uppercase text-white transition-all hover:opacity-90"
              style={{ background: '#B58A4A' }}
            >
              Rendez-vous
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-1 hover:opacity-70 transition-opacity"
              style={{ color: '#1C0F0A' }}
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
