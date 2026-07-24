import { Trans, useTranslation } from "react-i18next";
import ServicesCartes from "../hooks/ServicesCartes";


const Services = () => {
const {t} = useTranslation();

  return (
    <section id="services" className="mt-24 scroll-mt-28 px-4">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
  <p className="text-rouge font-semibold text-lg md:text-2xl"><Trans i18nKey="services.niveau_1"/></p>
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
    <Trans i18nKey="services.niveau_2" />
  </h1>
  <p className="text-noir/50 text-base md:text-lg">
        <Trans i18nKey="services.niveau_3" />

  </p>
</div>

      <div className="flex justify-center items-center">
        <ServicesCartes />

      </div>
    </section>
  );
};

export default Services;
