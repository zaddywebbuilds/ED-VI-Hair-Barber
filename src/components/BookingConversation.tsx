import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { businessConfig } from '../data/businessConfig';

const messages = [
  { from: 'salon', text: 'Bonjour, comment puis-je vous aider ?' },
  { from: 'client', text: 'Je voudrais prendre rendez-vous pour une coupe.' },
  { from: 'salon', text: 'Quel jour vous conviendrait ?' },
  { from: 'client', text: 'Vendredi après-midi, si possible.' },
  { from: 'salon', text: 'Je vérifie le planning et je vous confirme le créneau.' },
];

export default function BookingConversation() {
  return (
    <section className="py-20 md:py-28" style={{ background: '#090909' }}>
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-condensed text-[11px] tracking-[0.35em] uppercase text-brass mb-4 text-center">
          Prise de rendez-vous
        </p>
        <h2 className="font-serif text-cream text-center mb-12" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
          Comment ça se passe
        </h2>

        {/* Chat bubbles */}
        <div
          className="rounded-sm p-6 md:p-8 space-y-4 mb-8"
          style={{ background: '#161514' }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
            >
              <div
                className="max-w-[80%] px-4 py-3 font-sans text-sm leading-relaxed"
                style={
                  msg.from === 'salon'
                    ? { background: '#2B211B', borderLeft: '2px solid #B58A4A', color: '#F1E8D8' }
                    : { background: '#681F2B', color: '#F1E8D8' }
                }
              >
                {msg.from === 'salon' && (
                  <span className="font-condensed text-[10px] tracking-widest uppercase text-brass block mb-1">
                    ED-VI Hair Barber
                  </span>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-steel/60 text-xs text-center mb-8">
          ED-VI vous recontactera pour confirmer le créneau. Il ne s'agit pas d'un chat en direct.
        </p>

        {/* Phone CTA */}
        <div className="text-center">
          <a
            href={businessConfig.phoneLink}
            className="inline-flex items-center gap-3 font-condensed tracking-[0.2em] uppercase text-cream border border-brass/40 px-8 py-4 hover:border-brass hover:bg-brass/5 transition-all"
          >
            <Phone size={16} className="text-brass" />
            Appeler le salon
          </a>
          <p className="mt-4 font-condensed text-[11px] tracking-widest uppercase text-steel">
            {businessConfig.phoneDisplay}
          </p>
        </div>
      </div>
    </section>
  );
}
