import { businessConfig } from '../data/businessConfig';

/** Lien wa.me vers le numéro du salon, avec message pré-rempli optionnel. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${businessConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Message par défaut proposé au visiteur qui ouvre WhatsApp. */
export const defaultWhatsAppMessage = `Bonjour ${businessConfig.name}, je souhaite prendre rendez-vous.`;
