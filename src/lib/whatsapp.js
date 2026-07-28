// Numéro WhatsApp (format international, sans "+" ni espaces) — vérifie qu'il est exact.
export const WHATSAPP_NUMBER = "240222693223";

// Version lisible pour l'affichage (footer, etc.)
export const WHATSAPP_DISPLAY = "+240 222 693 223";

// Message générique par défaut
const DEFAULT_MESSAGE = "Bonjour Aeterna Empires, je souhaite bâtir mon empire.";

// Construit un lien wa.me avec un message personnalisé (pré-rempli).
export const whatsappUrl = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Lien par défaut (message générique)
export const WHATSAPP_URL = whatsappUrl();
