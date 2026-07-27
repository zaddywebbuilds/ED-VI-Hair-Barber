import { motion } from 'framer-motion';
import { businessConfig } from '../data/businessConfig';

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function OwnerStory() {
  return (
    <section className="py-14 md:py-20" style={{ background: '#FDF4E8' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Texte ── */}
          <div>
            <motion.p
              className="eyebrow mb-5"
              style={{ color: '#A8763C' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
            >
              Le salon
            </motion.p>

            <motion.h2
              className="display-md mb-7 text-balance"
              style={{ color: '#2A1F1A' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.08}
            >
              Derrière{' '}
              <span className="italic" style={{ color: '#A8763C' }}>le fauteuil.</span>
            </motion.h2>

            <motion.div
              className="space-y-4 font-sans text-base leading-relaxed max-w-lg mb-8"
              style={{ color: '#5C4A3F' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.16}
            >
              <p>Un artisan du quartier, pas un prestataire de service.</p>
              <p>
                ED-VI Hair Barber a été créé pour exercer autrement : sans pression, sans
                travail à la chaîne et avec le temps nécessaire pour s'occuper de chaque client.
              </p>
              {businessConfig.historicalDetails.oneClientAtATime && (
                <p>Un seul client à la fois. Chaque rendez-vous est dédié entièrement à vous.</p>
              )}
            </motion.div>

            {/* Phrase d'accroche */}
            <motion.div
              className="rounded-2xl px-6 py-5 mb-8 max-w-lg"
              style={{ background: '#FFFFFF', boxShadow: '0 8px 24px rgba(120,70,50,0.10)' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.24}
            >
              <p className="font-serif italic" style={{ color: '#A8763C', fontSize: '1.2rem', lineHeight: 1.45 }}>
                Chaque visage est différent. Chaque coupe doit l'être aussi.
              </p>
            </motion.div>

            <motion.a
              href="#/le-salon"
              data-cursor="hover"
              className="group inline-flex items-center gap-2.5 font-condensed text-[12px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
              style={{ color: '#A8763C' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.3}
            >
              Découvrir le salon
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </div>

          {/* ── Images ── */}
          <div className="grid grid-cols-2 gap-4">
            <motion.figure
              className="overflow-hidden group mt-10"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.22)' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_13.jpg"
                alt="Intérieur du salon ED-VI Hair Barber"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </motion.figure>

            <motion.figure
              className="overflow-hidden group"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.22)' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.18}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_14.jpg"
                alt="Décoration vintage du salon"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
