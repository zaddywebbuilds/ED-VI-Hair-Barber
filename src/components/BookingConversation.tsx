import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Check } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import WhatsAppIcon from './WhatsAppIcon';
import { whatsappUrl, defaultWhatsAppMessage } from '../lib/whatsapp';

// ============================================================
// Illustration de la prise de rendez-vous — DÉMONSTRATION.
// ------------------------------------------------------------
// Les deux cartes sont des maquettes animées : il n'y a ni chat en
// direct ni agenda connecté. Les jours et créneaux affichés reprennent
// les VRAIS horaires du salon pour ne rien laisser croire de faux.
// La prise de rendez-vous se fait par WhatsApp ou par téléphone.
//
// Les bulles occupent trois emplacements FIXES, toujours montés, dont
// on anime seulement l'opacité. On évite ainsi <AnimatePresence> : une
// sortie non résolue y laisse les bulles empilées à l'écran.
// ============================================================

const INK = '#2A1F1A';
const MUTE = '#5C4A3F';
const BRASS = '#A8763C';
const GOLD = '#C9A961';

// Jours réellement ouverts (cf. businessConfig.openingHours)
const DAYS = businessConfig.openingHours
  .filter((d) => d.open)
  .map((d) => d.day.slice(0, 3).toUpperCase()); // MAR JEU VEN SAM

const PICKED_DAY = 'VEN';
const SLOTS = ['10h00', '14h00', '16h30'];
const PICKED_SLOT = '14h00';

/**
 * Étapes : 0 dots#1 · 1 msg#1 · 2 dots#2 · 3 msg#2 · 4 dots#3 · 5 msg#3 · 6 pause
 * Durée de chaque étape, en ms.
 */
const SEQUENCE = [1000, 1500, 1000, 1700, 1000, 2800, 900];
const LAST_STEP = SEQUENCE.length - 1;

type SlotState = 'hidden' | 'typing' | 'shown';

/** État d'un des trois emplacements pour l'étape courante. */
function slotState(step: number, slot: number): SlotState {
  const typingAt = slot * 2;      // 0, 2, 4
  const shownFrom = typingAt + 1; // 1, 3, 5
  if (step === typingAt) return 'typing';
  if (step >= shownFrom) return 'shown';
  return 'hidden';
}

function Ticks() {
  return (
    <span className="inline-flex -space-x-1 ml-1 align-middle" aria-hidden="true">
      <Check size={11} strokeWidth={3} style={{ color: '#53BDEB' }} />
      <Check size={11} strokeWidth={3} style={{ color: '#53BDEB' }} />
    </span>
  );
}

// Animation en CSS pur : une boucle Framer Motion infinie perturberait
// la résolution des animations parentes.
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="En train d'écrire">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot rounded-full"
          style={{
            width: 5,
            height: 5,
            background: 'rgba(233,237,239,0.55)',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

interface BubbleProps {
  side: 'left' | 'right';
  state: SlotState;
  time: string;
  ticks?: boolean;
  children: ReactNode;
}

function Bubble({ side, state, time, ticks, children }: BubbleProps) {
  const left = side === 'left';
  return (
    <motion.div
      className={`flex ${left ? 'justify-start' : 'justify-end'}`}
      animate={{
        opacity: state === 'hidden' ? 0 : 1,
        y: state === 'hidden' ? 6 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={state === 'hidden'}
    >
      <span
        className="max-w-[85%] px-3 py-2 font-sans text-[13px] leading-snug"
        style={{
          background: left ? '#1F2C34' : '#005C4B',
          color: '#E9EDEF',
          borderRadius: left ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
        }}
      >
        {state === 'typing' ? (
          <TypingDots />
        ) : (
          <>
            {children}
            <span
              className="block text-[10px] mt-1 text-right"
              style={{ color: left ? 'rgba(233,237,239,0.45)' : 'rgba(233,237,239,0.55)' }}
            >
              {time}
              {ticks && <Ticks />}
            </span>
          </>
        )}
      </span>
    </motion.div>
  );
}

export default function BookingConversation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sans animation : on affiche directement l'état final.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(LAST_STEP);
      return;
    }
    const t = window.setTimeout(
      () => setStep((s) => (s + 1) % SEQUENCE.length),
      SEQUENCE[step]
    );
    return () => window.clearTimeout(t);
  }, [step]);

  const dayPicked = step >= 3;
  const slotPicked = step >= 4;

  return (
    <section className="py-14 md:py-20" style={{ background: '#FDF4E8' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">

        {/* En-tête */}
        <div className="max-w-2xl mb-10">
          <motion.p
            className="eyebrow mb-5"
            style={{ color: BRASS }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Prise de rendez-vous
          </motion.p>
          <motion.h2
            className="display-md mb-5 text-balance"
            style={{ color: INK }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Comment{' '}
            <span className="italic" style={{ color: BRASS }}>ça se passe.</span>
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: MUTE }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            Un message, un créneau, c'est réglé. Dites la prestation et le moment qui
            vous arrange : le salon confirme et le fauteuil est à vous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ═══ Carte 1 — WhatsApp ═══ */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{ background: '#FFFFFF', boxShadow: '0 12px 36px rgba(160,100,70,0.14)' }}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-5 md:p-6 flex-1">
              <div className="rounded-2xl overflow-hidden" style={{ background: '#0B141A' }}>
                {/* Barre de contact */}
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#1F2C34' }}>
                  <span
                    className="grid place-items-center w-9 h-9 rounded-full shrink-0 font-serif text-sm"
                    style={{ background: GOLD, color: INK }}
                    aria-hidden="true"
                  >
                    ED
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-[13px] font-semibold truncate" style={{ color: '#E9EDEF' }}>
                      {businessConfig.name}
                    </span>
                    <span className="block font-sans text-[11px]" style={{ color: '#25D366' }}>
                      en ligne
                    </span>
                  </span>
                  <Video size={16} strokeWidth={1.8} style={{ color: 'rgba(233,237,239,0.5)' }} />
                  <Phone size={15} strokeWidth={1.8} style={{ color: 'rgba(233,237,239,0.5)' }} />
                </div>

                {/* Fil — trois emplacements fixes */}
                <div className="px-4 py-4 space-y-2 min-h-[214px] flex flex-col justify-end">
                  <Bubble side="left" state={slotState(step, 0)} time="10:24">
                    Bonjour ! Quel jour vous conviendrait ?
                  </Bubble>
                  <Bubble side="right" state={slotState(step, 1)} time="10:25" ticks>
                    Vendredi 14h, coupe et barbe
                  </Bubble>
                  <Bubble side="left" state={slotState(step, 2)} time="10:25">
                    C'est noté, je vous confirme. À vendredi !
                  </Bubble>
                </div>

                {/* Champ de saisie */}
                <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#1F2C34' }}>
                  <span
                    className="flex-1 rounded-full px-3 py-2 font-sans text-[12px]"
                    style={{ background: '#2A3942', color: 'rgba(233,237,239,0.4)' }}
                  >
                    Message
                  </span>
                  <span
                    className="grid place-items-center w-8 h-8 rounded-full shrink-0"
                    style={{ background: '#25D366' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B141A" aria-hidden="true">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 md:px-6 pb-6">
              <a
                href={whatsappUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ background: '#25D366', color: '#0B2E13', boxShadow: '0 10px 28px rgba(37,211,102,0.26)' }}
              >
                <WhatsAppIcon size={17} />
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>Écrire sur WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* ═══ Carte 2 — Créneau ═══ */}
          <motion.div
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{ background: '#FFFFFF', boxShadow: '0 12px 36px rgba(160,100,70,0.14)' }}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-5 md:p-6 flex-1">
              <div className="rounded-2xl p-5 md:p-6 h-full" style={{ background: '#FDF4E8' }}>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  <span className="font-sans text-[15px] font-semibold" style={{ color: INK }}>
                    Choisir un créneau
                  </span>
                </div>

                {/* Jours d'ouverture */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {DAYS.map((d) => {
                    const on = dayPicked && d === PICKED_DAY;
                    return (
                      <motion.span
                        key={d}
                        className="grid place-items-center py-3 rounded-xl font-condensed text-[12px] tracking-[0.14em]"
                        animate={{
                          borderColor: on ? BRASS : '#EFE3D0',
                          color: on ? BRASS : '#8A7560',
                          scale: on ? 1.04 : 1,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: '#FFFFFF', borderWidth: 1.5, borderStyle: 'solid' }}
                      >
                        {d}
                      </motion.span>
                    );
                  })}
                </div>

                <p className="font-condensed text-[10px] tracking-[0.16em] uppercase mb-5" style={{ color: '#B0A08D' }}>
                  Jours d'ouverture du salon
                </p>

                {/* Créneaux */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {SLOTS.map((s) => {
                    const on = slotPicked && s === PICKED_SLOT;
                    return (
                      <motion.span
                        key={s}
                        className="grid place-items-center py-3 rounded-xl font-condensed text-[13px] tracking-[0.1em]"
                        animate={{
                          backgroundColor: on ? BRASS : '#FFFFFF',
                          color: on ? '#FDF4E8' : INK,
                          scale: on ? 1.04 : 1,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ borderWidth: 1.5, borderStyle: 'solid', borderColor: '#EFE3D0' }}
                      >
                        {s}
                      </motion.span>
                    );
                  })}
                </div>

                {/* Récapitulatif */}
                <div
                  className="rounded-xl px-4 py-3.5 flex items-center min-h-[52px]"
                  style={{ background: '#FFFFFF', border: '1.5px solid #EFE3D0' }}
                >
                  <motion.span
                    className="flex items-center gap-2.5"
                    animate={{ opacity: slotPicked ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: slotPicked ? 'flex' : 'none' }}
                  >
                    <span
                      className="grid place-items-center w-5 h-5 rounded-full shrink-0"
                      style={{ background: '#3E9A52' }}
                    >
                      <Check size={12} strokeWidth={3} style={{ color: '#FFFFFF' }} />
                    </span>
                    <span className="font-sans text-[13px]" style={{ color: INK }}>
                      Vendredi {PICKED_SLOT} — coupe et barbe
                    </span>
                  </motion.span>

                  <span
                    className="font-sans text-[13px]"
                    style={{ color: '#B0A08D', display: slotPicked ? 'none' : 'block' }}
                  >
                    Sélectionnez un jour et une heure…
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 md:px-6 pb-6">
              <a
                href={businessConfig.phoneLink}
                data-cursor="hover"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ background: INK, color: '#FDF4E8', boxShadow: '0 10px 28px rgba(120,70,50,0.2)' }}
              >
                <Phone size={15} strokeWidth={1.9} style={{ color: GOLD }} />
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>
                  Appeler le {businessConfig.phoneDisplay}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
