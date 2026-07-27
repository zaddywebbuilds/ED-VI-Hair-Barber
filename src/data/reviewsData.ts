// ============================================================
// Avis Google réels — ED-VI Hair Barber
// ------------------------------------------------------------
// Source : fiche Google Maps du salon (145 avis, note 5,0).
// Traduits en français pour la cohérence du site.
// NE PAS inventer d'avis : tout ce qui figure ici doit
// correspondre à un avis réellement publié sur Google.
// Ordre : du plus récent au plus ancien.
// ============================================================

export interface Review {
  name: string;
  stars: number;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    name: 'Vincent F.',
    stars: 5,
    date: 'il y a 4 mois',
    text: "Je recommande vivement ce salon. L'accueil est fantastique et l'atmosphère est adorable. Le coiffeur prend le temps de bien faire les choses, et le résultat est impeccable. Mon dégradé est très propre, les contours sont nets et la coupe est exactement comme je le voulais.",
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
    name: 'Gaël C',
    stars: 5,
    date: 'il y a 1 an',
    text: "Service toujours au top et excellents conseils. Cela fait deux ans que j'y vais et je ne suis jamais déçu. Rendez-vous rapides et toujours à l'heure. Je recommande à 100 %. L'ambiance du salon et la tenue du propriétaire sont toujours impeccables :)",
  },
  {
    name: 'Robin V.',
    stars: 5,
    date: 'il y a 1 an',
    text: "Avant de rencontrer ce barbier, j'étais ordinaire. Après être allé chez Ed-Vi, je suis devenu un autre homme. Je recommande sans hésiter !",
  },
  {
    name: 'Sylvain',
    stars: 5,
    date: 'il y a 2 ans',
    text: "C'est le meilleur salon de coiffure pour homme de Clermont, sans hésitation ! Le salon est très agréable, et Eddy est un professionnel d'exception — élégant, raffiné et perfectionniste. Il est méticuleux dans tout ce qu'il fait.",
  },
  {
    name: 'Michel L.',
    stars: 5,
    date: 'il y a 2 ans',
    text: "Nous étions quatre — le marié et ses témoins — arrivés la veille d'un mariage pour une coupe et une barbe soignées. Quelle belle expérience chez ED-VI ! Outre la super ambiance, le travail était exceptionnel. Nous sommes tous ravis.",
  },
  {
    name: 'Geoffrey Vacher',
    stars: 5,
    date: 'il y a 2 ans',
    text: "Je ne laisse pas souvent des avis, mais celui-ci le mérite vraiment. EDVI est super sympa et de bon conseil. Même avec très peu de barbe, il a réussi à me créer un look vraiment stylé, et la coupe était aussi fantastique !",
  },
];

export const reviewStats = {
  average: '5,0',
  total: 145,
};
