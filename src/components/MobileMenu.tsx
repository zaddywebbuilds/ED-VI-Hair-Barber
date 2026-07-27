import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useOpenStatus } from '../hooks/useOpenStatus';
import { businessConfig } from '../data/businessConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { num: '01', label: 'Accueil', to: '/' },
  { num: '02', label: 'Prestations', to: '/prestations' },
  { num: '03', label: 'Le salon', to: '/le-salon' },
  { num: '04', label: 'Galerie', to: '/galerie' },
  { num: '05', label: 'Contact', to: '/contact' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isOpen: salonOpen, todayHours, dayName } = useOpenStatus();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: '#090909' }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-cream/60 hover:text-cream transition-colors p-2"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="flex items-baseline gap-4 group py-2"
                >
                  <span className="font-condensed text-steel text-sm tracking-widest">{item.num}</span>
                  <span className="font-serif text-5xl text-cream group-hover:text-brass transition-colors leading-tight">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-8 pb-24 space-y-3 border-t border-cream/10 pt-6"
          >
            <p className="font-condensed text-xs tracking-widest text-steel uppercase">
              {businessConfig.address.street}, {businessConfig.address.city}
            </p>
            <a href={businessConfig.phoneLink} className="block font-condensed text-sm tracking-wider text-brass">
              {businessConfig.phoneDisplay}
            </a>
            {dayName && (
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: salonOpen ? '#4CAF50' : '#858585' }}
                />
                <span className="font-condensed text-xs tracking-wider text-steel uppercase">
                  {salonOpen ? `Ouvert — ${todayHours}` : 'Fermé'}
                </span>
              </div>
            )}
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-block mt-4 px-6 py-3 font-condensed text-sm tracking-widest uppercase text-cream"
              style={{ background: '#681F2B' }}
            >
              Demander un rendez-vous
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
