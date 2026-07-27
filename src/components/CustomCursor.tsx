import { useEffect, useRef, useState } from 'react';

// Curseur personnalisé — uniquement sur appareils à pointeur fin (souris).
// Désactivé sur tactile et si l'utilisateur préfère les animations réduites.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;
    setEnabled(true);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    // Le halo suit avec un léger retard (lerp) pour un rendu fluide
    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const interactive = 'a, button, [data-cursor="hover"], input, textarea, select, [role="button"]';
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest(interactive)) ringRef.current?.classList.add('is-hovering');
    };
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest(interactive)) ringRef.current?.classList.remove('is-hovering');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
