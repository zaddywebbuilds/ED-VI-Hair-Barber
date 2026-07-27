import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const styles = [
  {
    id: 'court-net',
    label: 'Court et net',
    description: 'Coupe courte et soignée. Contours précis, finitions impeccables. Facile à entretenir au quotidien.',
    maintenance: 'Entretien toutes les 3–4 semaines recommandé.',
  },
  {
    id: 'degrade',
    label: 'Dégradé',
    description: 'Transition progressive du plus court au plus long. Peut être combinée avec une texture sur le dessus.',
    maintenance: 'Entretien toutes les 3–5 semaines selon la longueur.',
  },
  {
    id: 'classique',
    label: 'Classique',
    description: 'Coupe structurée avec raie ou volume travaillé. Intemporelle et adaptée à la plupart des morphologies.',
    maintenance: 'Entretien toutes les 4–6 semaines.',
  },
  {
    id: 'texture',
    label: 'Texturé',
    description: 'Longueur sur le dessus avec déstructuration et mouvement. Adapté aux cheveux ondulés ou épais.',
    maintenance: 'Entretien toutes les 4–6 semaines.',
  },
  {
    id: 'barbe-courte',
    label: 'Barbe courte',
    description: 'Barbe taillée courte, lignes nettes. Accompagne le visage sans le dominer.',
    maintenance: 'Entretien toutes les 2–3 semaines.',
  },
  {
    id: 'barbe-structuree',
    label: 'Barbe structurée',
    description: 'Barbe de longueur moyenne ou longue, sculptée et équilibrée en fonction du visage.',
    maintenance: 'Entretien toutes les 3–4 semaines.',
  },
  {
    id: 'naturel',
    label: 'Look naturel',
    description: 'Coupe qui suit le naturel du cheveu sans forcer la structure. Résultat soigné mais décontracté.',
    maintenance: 'Entretien toutes les 5–7 semaines.',
  },
];

// Simple SVG head silhouettes
function StyleSilhouette({ styleId }: { styleId: string }) {
  const getPath = () => {
    switch (styleId) {
      case 'court-net':
        return <rect x="30" y="10" width="40" height="30" rx="4" fill="#B58A4A" opacity="0.7" />;
      case 'degrade':
        return <path d="M30 10 Q50 8 70 15 L70 40 Q50 42 30 40 Z" fill="#B58A4A" opacity="0.7" />;
      case 'classique':
        return <path d="M28 8 Q50 6 72 12 L68 42 Q50 45 32 42 Z" fill="#B58A4A" opacity="0.7" />;
      default:
        return <ellipse cx="50" cy="25" rx="22" ry="18" fill="#B58A4A" opacity="0.7" />;
    }
  };

  return (
    <svg viewBox="0 0 100 80" width="120" height="96" xmlns="http://www.w3.org/2000/svg">
      {/* Head oval */}
      <ellipse cx="50" cy="45" rx="25" ry="30" fill="#2B211B" stroke="#B58A4A" strokeWidth="1" />
      {/* Hair */}
      {getPath()}
      {/* Face details */}
      <ellipse cx="43" cy="42" rx="2.5" ry="3" fill="#B58A4A" opacity="0.4" />
      <ellipse cx="57" cy="42" rx="2.5" ry="3" fill="#B58A4A" opacity="0.4" />
      <path d="M44 52 Q50 56 56 52" stroke="#B58A4A" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function StyleConsultation() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedStyle = styles.find((s) => s.id === selected);

  return (
    <section className="py-24 md:py-32" style={{ background: '#2B211B' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <p className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4">
            Conseil
          </p>
          <h2 className="font-serif text-cream mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Pas sûr de ce qui vous va ?
          </h2>
          <p className="font-sans text-paper/60 text-base">
            Sélectionnez un style pour en savoir plus. Le choix final se fait toujours ensemble.
          </p>
        </div>

        {/* Style buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelected(selected === style.id ? null : style.id)}
              className="font-condensed text-sm tracking-wider uppercase px-5 py-2.5 border transition-all"
              style={{
                borderColor: selected === style.id ? '#B58A4A' : 'rgba(241,232,216,0.2)',
                background: selected === style.id ? 'rgba(181,138,74,0.15)' : 'transparent',
                color: selected === style.id ? '#B58A4A' : 'rgba(241,232,216,0.6)',
              }}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selectedStyle && (
            <motion.div
              key={selectedStyle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col md:flex-row gap-8 items-start p-8 border border-brass/20"
              style={{ background: 'rgba(9,9,9,0.5)' }}
            >
              <div className="shrink-0">
                <StyleSilhouette styleId={selectedStyle.id} />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-cream text-2xl mb-3">{selectedStyle.label}</h3>
                <p className="font-sans text-paper/70 text-base leading-relaxed mb-4">
                  {selectedStyle.description}
                </p>
                <p className="font-condensed text-[11px] tracking-widest uppercase text-steel mb-6">
                  {selectedStyle.maintenance}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center font-condensed text-sm tracking-wider uppercase text-cream border border-cream/20 px-5 py-2.5 hover:border-brass hover:text-brass transition-all"
                >
                  En parler lors de mon rendez-vous
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="font-sans text-steel/50 text-xs mt-8 max-w-xl">
          Ces inspirations sont indicatives. Le style final est décidé ensemble, en tenant compte de votre visage et de vos cheveux.
        </p>
      </div>
    </section>
  );
}
