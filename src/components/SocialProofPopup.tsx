import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { reviews } from '../data/reviewsData';
import { businessConfig } from '../data/businessConfig';
import { useOpenStatus } from '../hooks/useOpenStatus';

// ============================================================
// Bandeau de preuve sociale
// ------------------------------------------------------------
// Affiche en rotation de VRAIS avis Google publiés sur la fiche
// du salon (nom, note et ancienneté réels).
// Aucune activité n'est simulée ou inventée.
//
// Ne s'affiche que pendant les heures d'ouverture : un visiteur
// qui consulte le site à 2 h du matin ne verra rien.
// ============================================================

const FIRST_DELAY = 4000;   // 4 s avant la première carte
const VISIBLE_FOR = 7000;   // 7 s à l'écran
const GAP_BETWEEN = 13000;  // 13 s entre deux cartes

/**
 * Mode aperçu : ajouter « ?apercu=avis » à l'URL force l'affichage même
 * quand le salon est fermé. Sert uniquement à contrôler le rendu ;
 * un visiteur normal reste soumis aux heures d'ouverture.
 */
function previewForced(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('apercu') === 'avis'
    || window.location.hash.includes('apercu=avis');
}

export default function SocialProofPopup() {
  const { isOpen } = useOpenStatus();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Silencieux hors des heures d'ouverture du salon,
    // ou si le visiteur a fermé la carte.
    if ((!isOpen && !previewForced()) || dismissed) {
      setVisible(false);
      return;
    }

    // Respecte la préférence système « animations réduites »
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !previewForced()) return;

    let cancelled = false;
    let timer: number;

    const showNext = () => {
      if (cancelled) return;
      setVisible(true);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        setIndex((i) => (i + 1) % reviews.length);
        timer = window.setTimeout(showNext, GAP_BETWEEN - VISIBLE_FOR);
      }, VISIBLE_FOR);
    };

    timer = window.setTimeout(showNext, FIRST_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isOpen, dismissed]);

  const review = reviews[index];

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.aside
          key={index}
          initial={{ opacity: 0, x: -28, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -28, y: 10 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-4 z-40 w-[min(340px,calc(100vw-2rem))] bottom-24 md:bottom-6"
          aria-live="polite"
        >
          <div
            className="relative rounded-2xl p-4 pr-9"
            style={{
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(14px)',
              border: '1px solid #E2D6C2',
              boxShadow: '0 18px 46px -12px rgba(28,15,10,0.28)',
            }}
          >
            <button
              onClick={() => setDismissed(true)}
              aria-label="Masquer les avis"
              className="absolute top-3 right-3 opacity-40 hover:opacity-90 transition-opacity"
            >
              <X size={14} style={{ color: '#1C0F0A' }} />
            </button>

            {/* En-tête : auteur + note */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="grid place-items-center w-8 h-8 rounded-full shrink-0 font-serif text-sm"
                style={{ background: '#1C0F0A', color: '#D4AF6F' }}
                aria-hidden="true"
              >
                {review.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-sans font-semibold text-[13px] leading-tight truncate" style={{ color: '#1C0F0A' }}>
                  {review.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-px">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg key={i} width="9" height="9" viewBox="0 0 16 16" fill="#B58A4A">
                        <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-condensed text-[10px] tracking-wider" style={{ color: '#8A7560' }}>
                    {review.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Extrait d'avis */}
            <p className="font-sans text-[12.5px] leading-snug mb-2.5" style={{ color: '#3A2A1E' }}>
              «&nbsp;{review.text.length > 116 ? `${review.text.slice(0, 116).trimEnd()}…` : review.text}&nbsp;»
            </p>

            {/* Pied : provenance réelle */}
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z"/>
              </svg>
              <span className="font-condensed text-[10px] tracking-[0.14em] uppercase" style={{ color: '#8A7560' }}>
                Avis vérifié · {businessConfig.address.city}
              </span>
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
