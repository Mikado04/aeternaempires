import { Trans } from "react-i18next";
import ShineBorderDemo from "./shine-border";

const Offres = () => {
  return (
    <section id="offres" className="w-full scroll-mt-28 px-4 py-16 md:py-24 bg-ivoire">
      {/* Titre de section */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
        <p className="text-rouge font-semibold text-lg md:text-2xl">
          <Trans i18nKey="offres.niveau_1" />
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
          <Trans i18nKey="offres.niveau_2" />
        </h2>
        <p className="text-noir/50 text-base md:text-lg">
          <Trans i18nKey="offres.niveau_3" />
        </p>
      </div>

      {/* Grille des offres — mt-16 laisse la place au ruban de la carte vedette */}
      <div className="mt-16">
        <ShineBorderDemo />
      </div>
    </section>
  );
};

export default Offres;
