import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useTranslation } from "react-i18next";
import logo_blanc from "../assets/logo/logo_blanc.svg";

const HeroCard = () => {
  const { t } = useTranslation();

  // Position relative de la souris sur la carte (-0.5 → 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Inclinaison 3D, lissée par un ressort
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 15,
  });

  // Reflet/glow qui suit la souris (centre du dégradé = position du curseur)
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.35), transparent 55%)`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    // Wrapper : animation d'entrée + perspective pour le 3D
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="relative z-10 w-full max-w-lg mx-auto md:mx-0"
      style={{ perspective: 1000 }}
    >
      {/* Carte inclinable */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.03 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative"
      >
        {/* Ruban */}
        <span className="absolute -top-3 right-6 z-20 rotate-3 bg-rouge text-ivoire text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          {t("hero.carte_badge")}
        </span>

        {/* Carte blanche */}
        <div className="bg-white rounded-3xl p-4 shadow-2xl">
          {/* Carte de visite noire */}
          <div className="relative bg-noir rounded-2xl h-72 flex items-center justify-center overflow-hidden p-6">
            <img
              src={logo_blanc}
              alt="Aeterna Empires"
              className="h-24 md:h-28 opacity-90"
            />

            {/* Pastille domaine */}
            <span className="absolute bottom-4 left-4 bg-white/90 text-noir text-[0.65rem] font-bold tracking-wide rounded-full px-3 py-1">
              AETERNAEMPIRES.COM
            </span>

            {/* Avatar A */}
            <span className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-rouge text-ivoire flex items-center justify-center font-black text-sm">
              A
            </span>
          </div>

          {/* 3 tuiles stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-2xl border border-noir/10 p-3">
              <p className="text-noir/40 text-[0.6rem] font-bold tracking-wide">
                {t("hero.carte_conversion")}
              </p>
              <p className="text-noir font-black text-lg mt-1">+187%</p>
            </div>
            <div className="rounded-2xl bg-noir p-3">
              <p className="text-ivoire/40 text-[0.6rem] font-bold tracking-wide">
                {t("hero.carte_delai")}
              </p>
              <p className="text-ivoire font-black text-lg mt-1">72H</p>
            </div>
            <div className="rounded-2xl bg-rouge p-3">
              <p className="text-ivoire/60 text-[0.6rem] font-bold tracking-wide">
                {t("hero.carte_empires")}
              </p>
              <p className="text-ivoire font-black text-lg mt-1">12+</p>
            </div>
          </div>
        </div>

        {/* Reflet lumineux qui suit la souris */}
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroCard;
