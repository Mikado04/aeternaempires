import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "../lib/whatsapp";

const Contact = () => {
  const { t, ready } = useTranslation();
  const [open, setOpen] = useState(0); // 1re question ouverte par défaut

  if (!ready) return null;

  const faqData = t("contact.faq", { returnObjects: true });
  const faq = Array.isArray(faqData) ? faqData : [];

  return (
    <section id="contact" className="w-full scroll-mt-28 bg-ivoire px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Gauche : titre + carte d'aide */}
        <div>
          <p className="text-rouge font-semibold text-sm tracking-[0.2em]">
            <Trans i18nKey="contact.label" />
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-4 leading-tight">
            <Trans i18nKey="contact.titre" />
          </h2>

          <div className="mt-8 bg-white border border-noir/10 rounded-2xl p-6">
            <p className="font-bold text-sm tracking-wide">
              <Trans i18nKey="contact.aide_titre" />
            </p>
            <p className="text-noir/50 text-sm mt-2">
              <Trans i18nKey="contact.aide_texte" />
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm rounded-full py-3 transition-colors"
            >
              <FaWhatsapp className="text-lg" />
              <Trans i18nKey="contact.aide_cta" />
            </a>
          </div>
        </div>

        {/* Droite : accordéon FAQ */}
        <div className="flex flex-col gap-4">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-noir text-ivoire border-noir"
                    : "bg-white text-noir border-noir/10"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-bold">{item.q}</span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-ivoire text-noir" : "bg-noir text-ivoire"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 -mt-1 text-ivoire/60 text-sm leading-relaxed">
                    {item.r}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA final rouge */}
      <div className="max-w-6xl mx-auto mt-16 bg-rouge text-ivoire rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="inline-block bg-ivoire/20 rounded-full px-4 py-1 text-xs font-bold">
            <Trans i18nKey="contact.cta_badge" />
          </span>
          <h3 className="text-3xl md:text-4xl font-black mt-4 leading-tight">
            <Trans i18nKey="contact.cta_titre" />
          </h3>
          <p className="text-ivoire/80 mt-4 text-sm md:text-base">
            <Trans i18nKey="contact.cta_texte" />
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-start md:items-end gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ivoire text-rouge rounded-full px-6 py-4 font-black text-sm flex items-center gap-2 hover:bg-noir hover:text-ivoire transition-colors w-fit"
          >
            <Trans i18nKey="contact.cta_bouton" />
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-ivoire/70 text-xs font-semibold tracking-wide">
            <Trans i18nKey="contact.cta_note" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
