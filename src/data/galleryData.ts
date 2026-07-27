// ============================================================
// Photos du salon — ED-VI Hair Barber
// ------------------------------------------------------------
// Répartition des 20 photos sur le site, sans doublon :
//   01–03  Hero                 04–05  Manifeste
//   06–09  BenefitsSection      10–12  Prestations (servicesData)
//   13–14  OwnerStory           15–18  Galerie (accueil)
//   19–20  FinalCTA
// La page /galerie affiche l'ensemble des 20 photos.
// ============================================================

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const src = (n: number) =>
  `/ED-VI-Hair-Barber/images/photo_${String(n).padStart(2, '0')}.jpg`;

/** Les 20 photos — utilisées sur la page /galerie. */
export const galleryImages: GalleryImage[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: src(i + 1),
  alt: `ED-VI Hair Barber, Clermont-Ferrand — photo ${i + 1}`,
  caption: '',
}));

/** Photos réservées à l'aperçu galerie de la page d'accueil (aucun doublon ailleurs). */
export const homeGalleryImages: GalleryImage[] = [15, 16, 17, 18].map((n) => ({
  id: n,
  src: src(n),
  alt: `ED-VI Hair Barber, Clermont-Ferrand — photo ${n}`,
  caption: '',
}));
