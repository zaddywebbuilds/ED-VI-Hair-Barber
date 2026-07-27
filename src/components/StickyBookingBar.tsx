import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';
import WhatsAppIcon from './WhatsAppIcon';
import { whatsappUrl } from '../lib/whatsapp';

// Barre de réservation persistante — apparaît après le hero.
// Le téléphone reste accessible en un geste sur mobile.
export default function StickyBookingBar() {
  const [show, setShow] = useState(false);
  const { isOpen, todayHours } = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 z-40"
        >
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-full"
            style={{
              background: 'rgba(28,15,10,0.93)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(241,232,216,0.12)',
              boxShadow: '0 12px 40px -10px rgba(0,0,0,0.45)',
            }}
          >
            {/* Statut live */}
            <div className="flex items-center gap-2 pl-2 pr-1">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: isOpen ? '#5BBE72' : '#9C8B7A' }}
              />
              <span className="eyebrow whitespace-nowrap" style={{ color: 'rgba(241,232,216,0.62)', letterSpacing: '0.16em' }}>
                {isOpen && todayHours ? `Ouvert · ${todayHours}` : 'Fermé actuellement'}
              </span>
            </div>

            <a
              href={businessConfig.phoneLink}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full transition-colors"
              style={{ border: '1px solid rgba(241,232,216,0.22)', color: '#F1E8D8' }}
            >
              <Phone size={13} strokeWidth={1.9} />
              <span className="eyebrow whitespace-nowrap" style={{ letterSpacing: '0.16em' }}>Appeler</span>
            </a>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#25D366', color: '#0B2E13' }}
            >
              <WhatsAppIcon size={14} />
              <span className="eyebrow whitespace-nowrap" style={{ letterSpacing: '0.16em' }}>WhatsApp</span>
            </a>

            <Link
              to="/contact"
              data-cursor="hover"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#F1E8D8', color: '#1C0F0A' }}
            >
              <span className="eyebrow whitespace-nowrap" style={{ letterSpacing: '0.16em' }}>
                Prendre RDV
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
