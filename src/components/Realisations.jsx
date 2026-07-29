import { Trans, useTranslation } from "react-i18next";
import { Star, Play, ArrowRight } from "lucide-react";

const Realisations = () => {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const data = t("realisations.avis", { returnObjects: true });
  const avis = Array.isArray(data) ? data : [];

  return (
    <section
      id="realisations"
      className="w-full scroll-mt-28 bg-noir text-ivoire px-4 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête : titre à gauche, note à droite */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-rouge font-semibold text-sm tracking-[0.2em]">
              <Trans i18nKey="realisations.label" />
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-4 leading-tight">
              <Trans i18nKey="realisations.titre" />
            </h2>
          </div>
          <p className="text-ivoire/50 text-sm max-w-sm">
            <Trans i18nKey="realisations.note" />
          </p>
        </div>

        {/* Cartes témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {avis.map((a, i) => (
            <div
              key={i}
              className="bg-anthracite/60 border border-ivoire/10 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-1 text-rouge">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-rouge text-rouge" />
                ))}
              </div>

              <p className="mt-4 text-ivoire/90 flex-1">“{a.texte}”</p>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-rouge text-ivoire flex items-center justify-center font-bold shrink-0">
                    {a.nom?.[0]}
                  </span>
                  <div>
                    <p className="font-bold text-sm">{a.nom}</p>
                    <p className="text-ivoire/50 text-xs">{a.role}</p>
                  </div>
                </div>
                <button
                  aria-label="Aperçu vidéo"
                  className="w-9 h-9 rounded-full bg-ivoire/10 hover:bg-rouge transition-colors flex items-center justify-center shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-ivoire/10 bg-noir/40 py-8 text-center text-ivoire/30 text-xs tracking-wide">
                <Trans i18nKey="realisations.apercu" />
              </div>
            </div>
          ))}
        </div>

        {/* Barre du bas */}
        <div className="mt-10 bg-ivoire text-noir rounded-3xl md:rounded-full px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-sm text-center md:text-left">
            <Trans i18nKey="realisations.footer_stat" />
          </p>
          <a
            href="#"
            className="bg-noir text-ivoire rounded-full px-6 py-3 font-bold text-sm hover:bg-anthracite transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Trans i18nKey="realisations.cta_portfolio" />
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Realisations;
