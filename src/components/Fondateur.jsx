import { Trans, useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import costume from "../assets/photo/costume.webp";

const Fondateur = () => {
  const { ready } = useTranslation();
  if (!ready) return null;

  return (
    <section
      id="fondateur"
      className="w-full scroll-mt-28 bg-noir text-ivoire px-4 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Photo */}
        <div className="bg-white rounded-3xl p-3 max-w-md w-full mx-auto md:mx-0">
          <img
            src={costume}
            alt="Daniel Avihoue"
            className="w-full h-auto rounded-2xl object-cover"
          />
          <p className="text-center text-noir font-bold tracking-wide text-sm py-4">
            <Trans i18nKey="fondateur.caption" />
          </p>
        </div>

        {/* Texte */}
        <div>
          <span className="inline-flex items-center gap-2 bg-ivoire/10 border border-ivoire/15 rounded-full px-4 py-1.5 text-xs font-semibold text-rouge">
            <span className="w-2 h-2 rounded-full bg-rouge" />
            <Trans i18nKey="fondateur.badge" />
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
            <Trans i18nKey="fondateur.titre" components={{ br: <br /> }} />
          </h2>

          <p className="text-ivoire/60 mt-6 leading-relaxed">
            <Trans
              i18nKey="fondateur.texte"
              components={{ b: <strong className="text-ivoire font-bold" /> }}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#"
              className="bg-ivoire text-noir rounded-full pl-6 pr-2 py-2 font-bold text-sm flex items-center gap-3 hover:bg-rouge hover:text-ivoire transition-colors w-fit"
            >
              <Trans i18nKey="fondateur.cta_portfolio" />
              <span className="bg-noir/10 rounded-full p-1.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#contact"
              className="border-2 border-ivoire/30 rounded-full px-6 py-2.5 font-bold text-sm hover:bg-ivoire hover:text-noir transition-colors w-fit"
            >
              <Trans i18nKey="fondateur.cta_contact" />
            </a>
          </div>

          <p className="mt-8 text-xs font-semibold tracking-wide text-ivoire/40">
            <Trans i18nKey="fondateur.lieu" />{" "}
            <span className="text-rouge">
              <Trans i18nKey="fondateur.dispo" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Fondateur;
