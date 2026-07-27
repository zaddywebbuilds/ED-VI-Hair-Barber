import { motion } from 'framer-motion';

const panels = [
  {
    num: '01',
    title: 'Le temps',
    body: 'Un rendez-vous organisé pour éviter les prestations expédiées et les longues attentes.',
    image: '/ED-VI-Hair-Barber/images/photo_06.jpg',
    imageAlt: 'Poste de travail du barbier, prêt pour le rendez-vous',
  },
  {
    num: '02',
    title: 'Le regard',
    body: 'Une coupe ou une barbe doit fonctionner avec votre visage, pas simplement suivre une photo.',
    image: '/ED-VI-Hair-Barber/images/photo_07.jpg',
    imageAlt: 'Miroir et fauteuil du salon ED-VI',
  },
  {
    num: '03',
    title: 'La précision',
    body: "Contours, proportions, transitions et finitions sont travaillés jusqu'au dernier détail.",
    image: '/ED-VI-Hair-Barber/images/photo_08.jpg',
    imageAlt: 'Outils de coupe et de finition du barbier',
  },
  {
    num: '04',
    title: "L'échange",
    body: 'Un salon de quartier où le conseil et la conversation font partie du rendez-vous.',
    image: '/ED-VI-Hair-Barber/images/photo_09.jpg',
    imageAlt: "Espace d'accueil du salon ED-VI Hair Barber",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-14 md:py-20" style={{ background: '#F4E5D0' }}>
      <div className="max-w-[1340px] mx-auto px-6 md:px-10">

        {/* En-tête */}
        <div className="max-w-2xl mb-14">
          <motion.p
            className="eyebrow mb-5"
            style={{ color: '#A8763C' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            La méthode
          </motion.p>
          <motion.h2
            className="display-md text-balance"
            style={{ color: '#2A1F1A' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Quatre principes qui{' '}
            <span className="italic" style={{ color: '#A8763C' }}>ne bougent pas.</span>
          </motion.h2>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {panels.map((panel, i) => (
            <motion.article
              key={panel.num}
              className="rounded-3xl overflow-hidden flex flex-col group"
              style={{ background: '#FFFFFF', boxShadow: '0 12px 36px rgba(160,100,70,0.14)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden">
                <img
                  src={panel.image}
                  alt={panel.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover img-zoom"
                  style={{ aspectRatio: '4 / 3' }}
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span
                  className="font-condensed text-[11px] tracking-[0.3em] mb-3"
                  style={{ color: '#C9A961' }}
                >
                  {panel.num}
                </span>
                <h3
                  className="font-serif mb-3"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', color: '#2A1F1A' }}
                >
                  {panel.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#5C4A3F' }}>
                  {panel.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
