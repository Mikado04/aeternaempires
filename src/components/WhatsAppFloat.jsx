import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "../lib/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
    >
      <FaWhatsapp className="text-3xl" />
      {/* pastille de pulsation discrète */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping -z-10" />
    </a>
  );
};

export default WhatsAppFloat;
