import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const panels = [
  {
    num: '01',
    title: 'Le temps',
    body: 'Un rendez-vous organisé pour éviter les prestations expédiées et les longues attentes.',
    image: '/ED-VI-Hair-Barber/images/photo_02.jpg',
    imageAlt: 'ED-VI Hair Barber — ambiance salon',
  },
  {
    num: '02',
    title: 'Le regard',
    body: 'Une coupe ou une barbe doit fonctionner avec votre visage, pas simplement suivre une photo.',
    image: '/ED-VI-Hair-Barber/images/photo_03.jpg',
    imageAlt: 'ED-VI Hair Barber — conseil coupe',
  },
  {
    num: '03',
    title: 'La précision',
    body: 'Contours, proportions, transitions et finitions sont travaillés jusqu\'au dernier détail.',
    image: '/ED-VI-Hair-Barber/images/photo_04.jpg',
    imageAlt: 'ED-VI Hair Barber — finitions précision',
  },
  {
    num: '04',
    title: 'L\'échange',
    body: 'Un salon de quartier où le conseil et la conversation font partie du rendez-vous.',
    image: '/ED-VI-Hair-Barber/images/photo_05.jpg',
    imageAlt: 'ED-VI Hair Barber — salon de quartier',
  },
];

interface PanelProps {
  panel: typeof panels[number];
  reverse: boolean;
  index: number;
}

function Panel({ panel, reverse, index }: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 items-stretch`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className="md:w-1/2 aspect-square overflow-hidden">
        <img
          src={panel.image}
          alt={panel.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div
        className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12"
        style={{ background: index % 2 === 0 ? '#F1E8D8' : '#D9CBB8' }}
      >
        {/* Big number */}
        <span
          className="font-condensed font-bold leading-none mb-6 select-none"
          style={{
            fontSize: 'clamp(72px, 10vw, 120px)',
            color: 'transparent',
            WebkitTextStroke: '1px #B58A4A',
            opacity: 0.35,
          }}
        >
          {panel.num}
        </span>

        <h3 className="font-serif text-walnut mb-4" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
          {panel.title}
        </h3>
        <p className="font-sans text-walnut/70 text-base leading-relaxed">
          {panel.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function BenefitsSection() {
  return (
    <section>
      {panels.map((panel, i) => (
        <Panel key={panel.num} panel={panel} reverse={i % 2 !== 0} index={i} />
      ))}
    </section>
  );
}
