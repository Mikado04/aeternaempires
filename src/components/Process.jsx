import { Trans, useTranslation } from "react-i18next";
import logo_noir from "../assets/logo/logo_noir.svg";

const Process = () => {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const data = t("offr_rea.etapes", { returnObjects: true });
  const etapes = Array.isArray(data) ? data : [];

  return (
    <section id="process" className="w-full scroll-mt-28 px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* ===== Colonne gauche — STICKY ===== */}
        <div className="md:sticky md:top-28 self-start">
          <p className="text-rouge font-semibold text-sm tracking-[0.2em]">
            <Trans i18nKey="offr_rea.label" />
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 leading-tight">
            <Trans i18nKey="offr_rea.titre" />
          </h2>

          <p className="mt-6">
            <span className="bg-rouge text-ivoire font-semibold px-2 py-1 leading-relaxed [box-decoration-break:clone]">
              <Trans i18nKey="offr_rea.sous_titre" />
            </span>
          </p>

          <div className="flex items-center gap-4 mt-8 text-noir/40">
            <img src={logo_noir} alt="" className="h-6" />
            <span className="h-px w-16 bg-noir/20" />
            <span className="text-xs font-semibold tracking-[0.15em]">
              <Trans i18nKey="offr_rea.methode" />
            </span>
          </div>
        </div>

        {/* ===== Colonne droite — cartes qui défilent ===== */}
        <div className="flex flex-col gap-6">
          {etapes.map((etape, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-[2px] bg-noir/10 overflow-hidden transition-colors duration-300"
            >
              {/* Lumière rouge qui circule au survol */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin bg-conic from-transparent via-rouge to-transparent [animation-duration:3s]"
              />

              {/* Contenu de la carte (recouvre le centre → la lumière ne reste qu'en bordure) */}
              <div className="relative rounded-[22px] bg-white p-6 md:p-8">
                <div className="flex items-start gap-5">
                  {/* Numéro : noir → rouge au survol */}
                  <span className="shrink-0 w-12 h-12 rounded-full bg-noir text-ivoire group-hover:bg-rouge transition-colors duration-300 flex items-center justify-center font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg md:text-xl font-black">{etape.titre}</h3>
                      {etape.badge && (
                        <span className="text-[0.7rem] font-bold bg-noir/5 text-noir/60 rounded-full px-2 py-1">
                          {etape.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-noir/50 text-sm mt-3 leading-relaxed">{etape.texte}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
