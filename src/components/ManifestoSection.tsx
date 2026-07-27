import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ManifestoSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: '#FDF4E8' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Images ── */}
          <div className="grid grid-cols-2 gap-4">
            <motion.figure
              className="overflow-hidden group"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.22)' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_04.jpg"
                alt="Le fauteuil de barbier du salon ED-VI"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </motion.figure>

            <motion.figure
              className="overflow-hidden group mt-10"
              style={{ borderRadius: 26, boxShadow: '0 24px 60px rgba(180,110,80,0.22)' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.12}
            >
              <img
                src="/ED-VI-Hair-Barber/images/photo_05.jpg"
                alt="Coin d'attente et décoration du salon"
                loading="lazy"
                className="w-full h-full object-cover img-zoom"
                style={{ aspectRatio: '3 / 4' }}
              />
            </motion.figure>
          </div>

          {/* ── Texte ── */}
          <div>
            <motion.p
              className="eyebrow mb-6"
              style={{ color: '#A8763C' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.05}
            >
              Pas une usine à coupes
            </motion.p>

            <motion.h2
              className="display-md mb-8 text-balance"
              style={{ color: '#2A1F1A' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.12}
            >
              Un fauteuil. Un client.
              <br />
              <span className="italic" style={{ color: '#A8763C' }}>Le temps de bien faire.</span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg leading-relaxed mb-9 max-w-lg"
              style={{ color: '#5C4A3F' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.2}
            >
              Chez ED-VI, le rendez-vous n'est pas une course contre la montre. La coupe,
              la barbe et les finitions sont travaillées en fonction de votre visage, de
              votre style et de ce que vous porterez réellement au quotidien.
            </motion.p>

            {/* Points clés */}
            <motion.ul
              className="space-y-3 max-w-md"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.28}
            >
              {[
                'Un seul rendez-vous à la fois, sans file d\'attente',
                'Une coupe pensée pour votre visage, pas pour une photo',
                'Contours et finitions travaillés au détail près',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl px-5 py-4"
                  style={{ background: '#FFFFFF', boxShadow: '0 8px 24px rgba(120,70,50,0.08)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{ background: '#C9A961' }}
                  />
                  <span className="font-sans text-sm leading-relaxed" style={{ color: '#5C4A3F' }}>
                    {point}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
