import { useEffect } from 'react';

// ============================================================
// Filet de sécurité pour les animations d'apparition.
// ------------------------------------------------------------
// Les sections arrivent en opacity:0 puis sont révélées par
// Framer Motion. Si ces animations ne démarrent pas — onglet en
// arrière-plan au chargement, requestAnimationFrame gelé,
// IntersectionObserver qui ne se déclenche pas, défilement très
// rapide — le contenu reste invisible : page blanche.
//
// Ce garde-fou force l'affichage de tout élément DÉJÀ visible à
// l'écran mais resté à opacity:0. Les éléments encore sous la ligne
// de flottaison ne sont pas touchés : leur animation d'apparition
// fonctionne normalement.
// ============================================================

const GRACE_MS = 1200; // laisse à Framer le temps de jouer l'animation
const INTERVAL_MS = 600;

export function useRevealWatchdog() {
  useEffect(() => {
    const startedAt = Date.now();

    const sweep = () => {
      // Pendant la période de grâce, on laisse Framer travailler.
      if (Date.now() - startedAt < GRACE_MS) return;

      const vh = window.innerHeight;

      document.querySelectorAll<HTMLElement>('[style*="opacity: 0"]').forEach((el) => {
        // Ignorer ce qui est délibérément masqué (bandeau d'avis, décor)
        if (el.closest('aside') || el.getAttribute('aria-hidden') === 'true') return;

        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;

        // Tout ce qui est à l'écran OU déjà dépassé doit être lisible.
        // Seul ce qui reste sous la ligne de flottaison garde son animation.
        if (r.top < vh * 0.92) {
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('transform', 'none', 'important');
        }
      });
    };

    const interval = window.setInterval(sweep, INTERVAL_MS);
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
    };
  }, []);
}
