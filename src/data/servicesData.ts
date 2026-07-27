export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string | null; // null = non confirmé
  price: string | null;    // null = non confirmé, ne jamais inventer
  image: string;
  active: boolean;
  featured: boolean;
  confirmedByOwner: boolean;
  category: string;
}

export const services: Service[] = [
  {
    id: "coupe-homme",
    name: "Coupe homme",
    description: "Une coupe construite autour de votre visage, de votre implantation et de la façon dont vous vous coiffez réellement.",
    duration: null, // [À CONFIRMER]
    price: null,    // [À CONFIRMER]
    image: "/ED-VI-Hair-Barber/images/photo_06.jpg",
    active: true,
    featured: true,
    confirmedByOwner: true,
    category: "coupe",
  },
  {
    id: "taille-barbe",
    name: "Taille de barbe",
    description: "Longueur, structure, lignes et équilibre : la barbe est travaillée pour accompagner le visage.",
    duration: null,
    price: null,
    image: "/ED-VI-Hair-Barber/images/photo_10.jpg",
    active: true,
    featured: false,
    confirmedByOwner: true,
    category: "barbe",
  },
  {
    id: "coupe-barbe",
    name: "Coupe et barbe",
    description: "Un rendez-vous complet pour harmoniser la coupe, la barbe et les finitions.",
    duration: null,
    price: null,
    image: "/ED-VI-Hair-Barber/images/photo_07.jpg",
    active: true,
    featured: false,
    confirmedByOwner: true,
    category: "coupe",
  },
];
