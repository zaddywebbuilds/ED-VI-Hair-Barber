export const galleryImages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/ED-VI-Hair-Barber/images/photo_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `ED-VI Hair Barber — Clermont-Ferrand — Photo ${i + 1}`,
  caption: '',
}));
