// ============================================================
// ED-VI Hair Barber — Configuration centrale
// ============================================================
// ATTENTION AU PROPRIÉTAIRE : Vérifiez et confirmez tous les
// champs marqués [À CONFIRMER] avant la mise en ligne.
// ============================================================

export const businessConfig = {
  name: "ED-VI Hair Barber",
  category: "Barbier et coiffeur homme",
  phoneDisplay: "06 85 48 04 10",
  phoneLink: "tel:+33685480410",
  address: {
    street: "12 Rue de la Treille",
    postalCode: "63000",
    city: "Clermont-Ferrand",
    country: "France",
    coordinates: {
      latitude: 45.7764168,
      longitude: 3.0862761,
    },
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/ED-VI+Hair+Barber/@45.7764168,3.0862761,17z/data=!4m6!3m5!1s0x47f71b8a0eb632dd:0x6237a0a4da468ecc!8m2!3d45.7764168!4d3.0862761!16s%2Fg%2F11j320r_8p?entry=ttu",
  email: "", // [À CONFIRMER]
  bookingUrl: "", // [À CONFIRMER] URL de plateforme de réservation si disponible
  formspreeId: "REPLACE_WITH_YOUR_FORMSPREE_ID", // [OBLIGATOIRE] Créez un compte sur formspree.io
  socialMedia: {
    instagram: "", // [À CONFIRMER]
    facebook: "", // [À CONFIRMER]
    tiktok: "", // [À CONFIRMER]
  },
  // [À CONFIRMER] Vérifiez les horaires avant la mise en ligne
  openingHoursVerified: false,
  openingHours: [
    { day: "Lundi", open: false, hours: null },
    { day: "Mardi", open: true, hours: "10h00 – 18h30" },
    { day: "Mercredi", open: false, hours: null },
    { day: "Jeudi", open: true, hours: "10h00 – 16h30" },
    { day: "Vendredi", open: true, hours: "10h00 – 18h30" },
    { day: "Samedi", open: true, hours: "10h00 – 14h00" },
    { day: "Dimanche", open: false, hours: null },
  ],
  // Informations historiques — affichées uniquement si verifiedByOwner: true
  historicalDetails: {
    verifiedByOwner: false, // [À CONFIRMER] Passez à true après vérification
    founderName: "Eddy Viannet",
    careerStartYear: 1991,
    salonOpeningYear: 2017,
    oneClientAtATime: true,
    welcomesShortHairWomen: true, // [À CONFIRMER]
    vintageDecor: true,
    superheroDecor: true, // [À CONFIRMER] Le décor superhéros est-il encore en place ?
  },
} as const;
