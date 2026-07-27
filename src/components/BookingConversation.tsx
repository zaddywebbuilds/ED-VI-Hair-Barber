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
    <section className="py-20 md:py-28" style={{ background: '#F4E5D0' }}>
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4 text-center" style={{ color: '#B58A4A' }}>
          Prise de rendez-vous
        </p>
        <h2 className="font-serif text-center mb-12" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1C0F0A' }}>
          Comment ça se passe
        </h2>

        {/* Chat bubbles */}
        <div
          className="rounded-2xl p-6 md:p-8 space-y-4 mb-8 shadow-md"
          style={{ background: '#FFFFFF' }}
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
                className="max-w-[80%] px-4 py-3 rounded-xl font-sans text-sm leading-relaxed"
                style={
                  msg.from === 'salon'
                    ? { background: '#F5EDE0', borderLeft: '2px solid #B58A4A', color: '#1C0F0A' }
                    : { background: '#681F2B', color: '#F1E8D8' }
                }
              >
                {msg.from === 'salon' && (
                  <span className="font-condensed text-[10px] tracking-widest uppercase block mb-1" style={{ color: '#B58A4A' }}>
                    ED-VI Hair Barber
                  </span>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-xs text-center mb-8" style={{ color: 'rgba(90,64,48,0.6)' }}>
          ED-VI vous recontactera pour confirmer le créneau. Il ne s'agit pas d'un chat en direct.
        </p>

        {/* Phone CTA */}
        <div className="text-center">
          <a
            href={businessConfig.phoneLink}
            className="inline-flex items-center gap-3 font-condensed tracking-[0.2em] uppercase text-white rounded-full px-8 py-4 transition-all hover:opacity-80"
            style={{ background: '#1C0F0A' }}
          >
            <Phone size={16} style={{ color: '#B58A4A' }} />
            Appeler le salon
          </a>
          <p className="mt-4 font-condensed text-[11px] tracking-widest uppercase" style={{ color: '#858585' }}>
            {businessConfig.phoneDisplay}
          </p>
        </div>
      </div>
    </section>
  );
}
