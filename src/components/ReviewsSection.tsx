import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { businessConfig } from '../data/businessConfig';
import { ExternalLink } from 'lucide-react';

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 16 16"
          fill={i < count ? '#B58A4A' : '#D9CBB8'}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

const reviews = [
  {
    name: 'Sylvain',
    stars: 5,
    date: 'il y a 2 ans',
    text: "C'est le meilleur salon de coiffure pour homme de Clermont, sans hésitation ! Le salon est très agréable, et Eddy est un professionnel d'exception — élégant, raffiné et perfectionniste. Il est méticuleux dans tout ce qu'il fait…",
  },
  {
    name: 'Michel L.',
    stars: 5,
    date: 'il y a 2 ans',
    text: "Nous étions quatre — le marié et ses témoins — arrivés la veille d'un mariage pour une coupe et une barbe soignées. Quelle belle expérience chez ED-VI ! Outre la super ambiance, le travail était exceptionnel. Nous sommes tous ravis…",
  },
  {
    name: 'Geoffrey Vacher',
    stars: 5,
    date: 'il y a 2 ans',
    text: "Je ne laisse pas souvent des avis, mais celui-ci le mérite vraiment. EDVI est super sympa et de bon conseil. Même avec très peu de barbe, il a réussi à me créer un look vraiment stylé, et la coupe était aussi fantastique !…",
  },
  {
    name: 'Gaël C',
    stars: 5,
    date: 'il y a 1 an',
    text: "Service toujours au top et excellents conseils. Cela fait deux ans que j'y vais et je ne suis jamais déçu. Rendez-vous rapides et toujours à l'heure. Je recommande à 100 %. L'ambiance du salon et la tenue du propriétaire sont toujours impeccables :)",
  },
  {
    name: 'Vincent F.',
    stars: 5,
    date: 'il y a 4 mois',
    text: "Je recommande vivement ce salon. L'accueil est fantastique et l'atmosphère est adorable. Le coiffeur prend le temps de bien faire les choses, et le résultat est impeccable. Mon dégradé est très propre, les contours sont nets et la coupe est exactement comme…",
  },
  {
    name: 'Thibaut Da Silva',
    stars: 5,
    date: 'il y a 4 mois',
    text: "Barbier au top, coupe parfaite et un super accueil. Je recommande vivement !",
  },
  {
    name: 'bar tabac63',
    stars: 5,
    date: 'il y a 9 mois',
    text: "Excellent salon ! ED-VI est accueillant et professionnel. Je suis reparti avec exactement la coupe que je voulais. Je le recommande vivement !",
  },
  {
    name: 'Robin V.',
    stars: 5,
    date: 'il y a 1 an',
    text: "Avant de rencontrer ce barbier, j'étais ordinaire. Après être allé chez Ed-Vi, je suis devenu un autre homme. Je recommande sans hésiter !",
  },
];

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="font-condensed text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ color: '#B58A4A' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Avis Google vérifiés
          </motion.p>
          <motion.h2
            className="font-serif mb-8"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#1C0F0A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Ils sont passés par le fauteuil
          </motion.h2>

          {/* Big rating display */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="font-serif font-light" style={{ fontSize: '72px', color: '#1C0F0A', lineHeight: 1 }}>5,0</div>
            <StarRow count={5} />
            <p className="font-condensed text-xs tracking-widest uppercase" style={{ color: '#5A4030' }}>
              145 avis sur Google Maps
            </p>
          </motion.div>
        </div>

        {/* Review cards grid — real Google reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: '#F5EDE0', border: '1px solid #D9CBB8' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <StarRow count={review.stars} />
              <p className="font-sans text-sm leading-relaxed flex-1" style={{ color: '#3A2A1E' }}>
                "{review.text}"
              </p>
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #D9CBB8' }}>
                <p className="font-sans font-semibold text-xs" style={{ color: '#1C0F0A' }}>{review.name}</p>
                <p className="font-condensed text-[10px] tracking-wider" style={{ color: '#B58A4A' }}>
                  {review.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="text-center">
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-condensed text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-80"
            style={{ background: '#1C0F0A' }}
          >
            <ExternalLink size={14} />
            Voir les 145 avis sur Google
          </a>
          <p className="font-condensed text-xs tracking-wider uppercase mt-4" style={{ color: '#858585' }}>
            Avis publiés et vérifiés par Google Maps.
          </p>
        </div>
      </div>
    </section>
  );
}
