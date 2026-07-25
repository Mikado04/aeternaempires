// Numéro WhatsApp (format international, sans "+" ni espaces) — vérifie qu'il est exact.
export const WHATSAPP_NUMBER = "240222693223";

// Version lisible pour l'affichage (footer, etc.)
export const WHATSAPP_DISPLAY = "+240 222 693 223";

// Message pré-rempli (optionnel)
const WHATSAPP_MESSAGE = "Bonjour Aeterna Empires, je souhaite bâtir mon empire.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
