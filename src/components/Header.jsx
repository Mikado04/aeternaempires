import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import logo_principal from "../assets/logo/logo_principal.svg";
import { GoArrowUpRight } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { WHATSAPP_URL } from "../lib/whatsapp";



const NAV_LINKS = [
  { href: "#services", key: "nav.services" },
  { href: "#offres", key: "nav.offres" },
  { href: "#realisations", key: "nav.realisations" },
  { href: "#contact", key: "nav.contact" },
];


const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header
      animate={{
        marginLeft: isScrolled ? 32 : 0,
        marginRight: isScrolled ? 32 : 0,
        marginTop: isScrolled ? 12 : 0,
        borderRadius: isScrolled ? 24 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:justify-around py-3 text-noir ${isScrolled
        ? "bg-ivoire/50 backdrop-blur-md shadow-lg"
        : "bg-ivoire/50 shadow-md"
        }`}
    >

      <img src={logo_principal} alt="Logo" className="h-10 relative z-10" />

      {/* Nav desktop */}
      <nav className="hidden md:flex justify-around">
        <ul className="flex gap-6 font-bold">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xl hover:text-rouge/80 duration-150 transition hover:border-b-2 hover:border-rouge"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA Whatsapp desktop */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 bg-rouge/90 border-2 border-rouge p-2 rounded-3xl hover:text-white hover:bg-rouge font-bold transition duration-300 text-white relative z-10"
      >
        <GoArrowUpRight className="text-xl" /> Whatsapp
      </a>
      <div className="hidden md:block">
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="bg-transparent text-noir font-bold cursor-pointer [&>option]:text-noir"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </div>

      {/* Burger mobile */}
      <button
        className="md:hidden relative z-10 text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 bg-ivoire/95 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden md:hidden"
          >
            <ul className="flex flex-col items-center gap-4 py-6 font-bold">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl hover:text-rouge/80 transition"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 bg-rouge/90 border-2 border-rouge px-4 py-2 rounded-3xl text-white hover:bg-rouge transition"
                >
                  <GoArrowUpRight className="text-xl" /> Whatsapp
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                {["fr", "en", "es"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => {
                      i18n.changeLanguage(lng);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-bold border transition ${
                      i18n.language === lng
                        ? "bg-rouge text-white border-rouge"
                        : "border-noir/20 text-noir hover:border-rouge"
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
