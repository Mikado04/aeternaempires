import { Trans, useTranslation } from "react-i18next";
import logo_blanc from "../assets/logo/logo_blanc.svg";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "../lib/whatsapp";

const NAV_HREFS = ["#services", "#offres", "#realisations", "#"];

const Footer = () => {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const tags = t("footer.tags", { returnObjects: true });
  const tagList = Array.isArray(tags) ? tags : [];
  const nav = t("footer.nav", { returnObjects: true });
  const navList = Array.isArray(nav) ? nav : [];

  return (
    <footer className="w-full bg-noir text-ivoire px-4 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Marque */}
          <div className="md:col-span-2">
            <img src={logo_blanc} alt="Aeterna Empires" className="h-10" />
            <p className="font-black tracking-wide mt-6">
              <Trans i18nKey="footer.slogan" />
            </p>
            <p className="text-ivoire/50 text-sm mt-4 max-w-md leading-relaxed">
              <Trans i18nKey="footer.description" />
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {tagList.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-bold rounded-full px-4 py-1.5 ${
                    i === tagList.length - 1
                      ? "bg-rouge text-ivoire"
                      : "bg-ivoire/10 text-ivoire"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-ivoire/60">
              <Trans i18nKey="footer.contact_titre" />
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-bold mt-5 hover:text-rouge transition-colors"
            >
              <Trans i18nKey="footer.whatsapp_label" /> {WHATSAPP_DISPLAY}
            </a>
            <a
              href={`mailto:${t("footer.email")}`}
              className="block text-ivoire/70 text-sm mt-4 hover:text-ivoire transition-colors"
            >
              <Trans i18nKey="footer.email" />
            </a>
            <p className="text-ivoire/40 text-sm mt-5">
              <Trans i18nKey="footer.lieu" />
            </p>
            <p className="text-ivoire/40 text-sm">
              <Trans i18nKey="footer.horaires" />
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-ivoire/60">
              <Trans i18nKey="footer.nav_titre" />
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {navList.map((label, i) => (
                <li key={i}>
                  <a
                    href={NAV_HREFS[i] ?? "#"}
                    className="text-ivoire/70 text-sm hover:text-rouge transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-ivoire/40 text-xs mt-6">
              <Trans i18nKey="footer.domaine_label" />
            </p>
            <p className="font-bold text-sm">
              <Trans i18nKey="footer.domaine" />
            </p>
          </div>
        </div>

        {/* Barre légale */}
        <div className="border-t border-ivoire/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivoire/40 text-xs text-center md:text-left">
            <Trans i18nKey="footer.copyright" />
          </p>
          <p className="flex items-center gap-2 text-ivoire/60 text-xs font-semibold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-rouge animate-pulse" />
            <Trans i18nKey="footer.statut" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
