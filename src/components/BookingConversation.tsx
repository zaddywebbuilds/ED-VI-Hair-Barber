import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';
import WhatsAppIcon from './WhatsAppIcon';
import { whatsappUrl, defaultWhatsAppMessage } from '../lib/whatsapp';

// ============================================================
// Illustration de la prise de rendez-vous.
// ------------------------------------------------------------
// Ce fil de discussion est une DÉMONSTRATION GRAPHIQUE : il n'y a
// ni chat en direct ni système de réservation connecté. La prise de
// rendez-vous se fait par téléphone ou WhatsApp, en attendant que le
// salon choisisse son outil de réservation.
// ============================================================

const messages = [
  { from: 'salon',  text: 'Bonjour, comment puis-je vous aider ?' },
  { from: 'client', text: 'Je voudrais prendre rendez-vous pour une coupe.' },
  { from: 'salon',  text: 'Quel jour vous conviendrait ?' },
  { from: 'client', text: 'Vendredi après-midi, si possible.' },
  { from: 'salon',  text: 'Je vérifie le planning et je vous confirme le créneau.' },
];

const INK = '#2A1F1A';
const MUTE = '#5C4A3F';
const BRASS = '#A8763C';

export default function BookingConversation() {
  return (
    <section className="py-14 md:py-20" style={{ background: '#FDF4E8' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Texte ── */}
          <div>
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
              className="display-md mb-6 text-balance"
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
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: MUTE }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
            >
              Un message ou un appel suffit. Dites-nous la prestation souhaitée et le
              moment qui vous arrange : le salon revient vers vous pour confirmer le créneau.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
            >
              <a
                href={whatsappUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ background: '#25D366', color: '#0B2E13', boxShadow: '0 12px 32px rgba(37,211,102,0.28)' }}
              >
                <WhatsAppIcon size={17} />
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>Écrire sur WhatsApp</span>
              </a>

              <a
                href={businessConfig.phoneLink}
                data-cursor="hover"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ background: '#FFFFFF', color: INK, boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
              >
                <Phone size={14} strokeWidth={1.9} style={{ color: BRASS }} />
                <span className="eyebrow" style={{ letterSpacing: '0.18em' }}>
                  {businessConfig.phoneDisplay}
                </span>
              </a>
            </motion.div>
          </div>

          {/* ── Fil de discussion (illustration) ── */}
          <div>
            <motion.div
              className="rounded-3xl p-6 md:p-8"
              style={{ background: '#FFFFFF', boxShadow: '0 12px 36px rgba(160,100,70,0.14)' }}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bandeau « exemple » */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A961' }} />
                <span className="eyebrow" style={{ color: '#8A7560', letterSpacing: '0.16em' }}>
                  Exemple d'échange
                </span>
              </div>

              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.16, duration: 0.45 }}
                  >
                    <div
                      className="max-w-[82%] px-4 py-3 font-sans text-sm leading-relaxed"
                      style={
                        msg.from === 'salon'
                          ? {
                              background: '#FDF4E8',
                              color: INK,
                              borderRadius: '16px 16px 16px 4px',
                            }
                          : {
                              background: INK,
                              color: '#FDF4E8',
                              borderRadius: '16px 16px 4px 16px',
                            }
                      }
                    >
                      {msg.from === 'salon' && (
                        <span
                          className="font-condensed text-[10px] tracking-[0.2em] uppercase block mb-1"
                          style={{ color: BRASS }}
                        >
                          ED-VI Hair Barber
                        </span>
                      )}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <p className="font-sans text-xs mt-4 px-2" style={{ color: '#8A7560' }}>
              Illustration : le salon n'a pas de messagerie en direct sur le site. Écrivez
              sur WhatsApp au {businessConfig.whatsappDisplay} ou appelez pour convenir d'un créneau.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
